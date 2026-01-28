"use strict";
const electron = require("electron");
const electronAPI = {
  generatePDF: (html) => electron.ipcRenderer.send("generate-pdf", html),
  openMainWindow: () => electron.ipcRenderer.send("open-main-window"),
  openHelpWindow: () => electron.ipcRenderer.send("open-help-window")
};
electron.contextBridge.exposeInMainWorld("electron", electronAPI);
electron.contextBridge.exposeInMainWorld("electronAPI", electronAPI);
