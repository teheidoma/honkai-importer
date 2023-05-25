const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  import: () => ipcRenderer.send('import'),
  onParse: (callback) => ipcRenderer.on('parse', callback),
  onAlert: (callback) => ipcRenderer.on('alert', callback)
})
