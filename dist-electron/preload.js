const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  openMainWindow: () => {
    ipcRenderer.send('open-main-window');
  },
  openHelpWindow: () => {
    ipcRenderer.send('open-help-window');
  },
  generatePDF: (html) => ipcRenderer.send('generate-pdf', html)
});

// "use strict";
// const electron = require("electron");
// electron.contextBridge.exposeInMainWorld("ipcRenderer", {
//   on(...args) {
//     const [channel, listener] = args;
//     return electron.ipcRenderer.on(channel, (event, ...args2) => listener(event, ...args2));
//   },
//   off(...args) {
//     const [channel, ...omit] = args;
//     return electron.ipcRenderer.off(channel, ...omit);
//   },
//   send(...args) {
//     const [channel, ...omit] = args;
//     return electron.ipcRenderer.send(channel, ...omit);
//   },
//   invoke(...args) {
//     const [channel, ...omit] = args;
//     return electron.ipcRenderer.invoke(channel, ...omit);
//   }
//   // You can expose other APTs you need here.
//   // ...
// });
