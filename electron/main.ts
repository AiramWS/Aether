import { app, BrowserWindow } from 'electron'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { ipcMain } from 'electron';
import path from 'node:path'

const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let loginWindow: BrowserWindow | null
let mainWindow: BrowserWindow | null
let helpWindow: BrowserWindow | null

function createMainWindow() {
  mainWindow = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
      width: 1200,
      height: 800,
    minWidth: 1000,
    minHeight: 700,
    resizable: true,
    minimizable: true,
    maximizable: true,
    fullscreenable: true,
    titleBarStyle: 'default',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

    mainWindow.maximize();

  if (VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(VITE_DEV_SERVER_URL + '#/homepage')
  } else {
    mainWindow.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }

  mainWindow.once('ready-to-show', () => {
    if (loginWindow && !loginWindow.isDestroyed()) {
      loginWindow.close()
      loginWindow = null
    }
  })
}

function createHelpWindow() {
  if (helpWindow) {
    helpWindow.focus();
    return;
  }

  helpWindow = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
      width: 1200,
      height: 800,
    minWidth: 1000,
    minHeight: 700,
    resizable: true,
    minimizable: true,
    maximizable: true,
    fullscreenable: true,
    titleBarStyle: 'default',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
    if (VITE_DEV_SERVER_URL) {
      helpWindow.loadURL(VITE_DEV_SERVER_URL + '#/help')
    } else {
      helpWindow.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

ipcMain.on('open-main-window', () => {
  createMainWindow();
});

ipcMain.on('open-help-window', () => {
  createHelpWindow();
});

function createLoginWindow() {
  loginWindow = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    width: 835,
    height: 600,
    resizable: false,
    minimizable: true,
    maximizable: false,
    fullscreenable: false,
    titleBarStyle: 'hidden',
    hasShadow: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  // loginWindow.webContents.openDevTools();
  // Test active push message to Renderer-process.
  loginWindow.webContents.on('did-finish-load', () => {
    loginWindow?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    loginWindow.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    loginWindow.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    loginWindow = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createLoginWindow()
  }
})

app.whenReady().then(createLoginWindow)

