const {app, BrowserWindow, ipcMain, ipcRenderer, Tray, Menu} = require('electron');
const url = require('url');
const path = require('path');
const fs = require("fs");
const regedit = require('regedit')
const axios = require('axios');
const exec = require('child_process').exec;
require('update-electron-app')()
if(require('electron-squirrel-startup')) return;


const registryKey = 'HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Star Rail';

const apiUrl = 'http://localhost:8080'
let isQuiting = false
let tray;
let win;


function onReady() {
  win = new BrowserWindow({
    width: 1440, height: 1024, webPreferences: {
      preload: path.join(__dirname, 'preload.js'), backgroundThrottling: false
    }, frame: false, transparent: true,
  })

  win.loadURL(url.format({
    pathname: path.join(
      __dirname,
      'dist/honkai-importer/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  ipcMain.on('import', event => {
    importData(event)
  })

  win.on('minimize',function(event){
    event.preventDefault();
    win.hide();
  });


  win.on('close', function (event) {
    if(!isQuiting){
      event.preventDefault();
      win.hide();
      event.returnValue = false;
    }

    tray = new Tray(path.join(__dirname, 'icon.ico'));

    tray.setContextMenu(Menu.buildFromTemplate([
      {
        label: 'Show App', click: function () {
          win.show();
        }
      },
      {
        label: 'Quit', click: function () {
          isQuiting = true;
          app.quit();
        }
      }
    ]));

    return false;
  });

  setInterval(() => {
    exec('tasklist', (error, stdout, stderr) => {
      console.log(stdout.includes('StarRail.exe'));
    });
  }, 10000)
}

app.on('ready', onReady);

app.on('before-quit', function () {
  isQuiting = true;
});


function importData(event) {
  console.log("importing data")
  let baseDir = ''
  regedit.list(registryKey, (err, keys) => {
    if (err == null) {
      baseDir = keys[registryKey].values['InstallPath'].value;
    } else {
      console.log(err)
    }
    let path = baseDir + '\\Games\\StarRail_Data\\webCaches\\Cache\\Cache_Data\\data_2'
    fs.createReadStream(path).pipe(fs.createWriteStream("data.temp", {flags: 'a'}));
    axios.post(apiUrl + '/parse', {
      file: fs.createReadStream(path, {flags: 'r'})
    }, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((response) => {
      event.sender.send('parse', JSON.stringify(response.data))
    });
  });
}
