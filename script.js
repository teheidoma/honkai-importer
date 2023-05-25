const fs = require('fs');
const regedit = require('regedit')
const axios = require('axios');
const host = 'http://teheidoma.com:8085'

const registryKey = 'HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Star Rail';
let baseDir = ''
regedit.list(registryKey, (err, keys) => {
  if (err == null) {
    baseDir = keys[registryKey].values['InstallPath'].value;
  } else {
    console.log(err)
  }
  let path = baseDir + '\\Games\\StarRail_Data\\webCaches\\Cache\\Cache_Data\\data_2'
  fs.createReadStream(path).pipe(fs.createWriteStream("data.temp", {flags: 'a'}));
  axios.post(host + '/parse', {
    file: fs.createReadStream(path, {flags: 'r'})
  }, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
});
