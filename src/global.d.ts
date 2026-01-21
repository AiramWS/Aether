declare global {
    interface Window {
        electronAPI?: {
            openMainWindow: () => void;
            openHelpWindow: () => void;
        };
    }
}

export {};