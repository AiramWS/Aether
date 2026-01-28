interface ElectronAPI {
  generatePDF: (html: string) => void;
  openMainWindow: () => void;
  openHelpWindow: () => void;
}

declare global {
  interface Window {
    electron: ElectronAPI;
    electronAPI: ElectronAPI;
  }
}

export {};