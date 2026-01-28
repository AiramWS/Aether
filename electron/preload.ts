import { ipcRenderer, contextBridge } from 'electron'

const electronAPI = {
  generatePDF: (html: string) => ipcRenderer.send('generate-pdf', html),
  openMainWindow: () => ipcRenderer.send('open-main-window'),
  openHelpWindow: () => ipcRenderer.send('open-help-window')
};

// Exponer ambas para compatibilidad
contextBridge.exposeInMainWorld('electron', electronAPI);
contextBridge.exposeInMainWorld('electronAPI', electronAPI);