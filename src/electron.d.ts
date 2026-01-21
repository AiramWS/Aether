
export interface ElectronAPI {
  resizeToMainWindow: () => void;
}

declare global {
  interface Window {
    electronAPI?: ElectronAPI;
  }
}

export {};