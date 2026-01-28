import { app, BrowserWindow, ipcMain, shell } from 'electron'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import fs from 'fs'
import path from 'node:path'

const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

process.env.APP_ROOT = path.join(__dirname, '..')

export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let loginWindow: BrowserWindow | null
let mainWindow: BrowserWindow | null
let helpWindow: BrowserWindow | null

// Handler para generar PDF
ipcMain.on('generate-pdf', async (event, html: string) => {
  try {
    console.log('Generando PDF...')
    
    // Crear ventana oculta
    const win = new BrowserWindow({ 
      show: false,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true
      }
    })
    
    // Cargar el HTML en data URL
    await win.loadURL(`data:text/html;charset=UTF-8,${encodeURIComponent(html)}`)
    
    // Esperar a que se cargue el contenido
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Generar PDF
    const pdfBuffer = await win.webContents.printToPDF({
      printBackground: true,
      landscape: false,
      pageSize: 'A4'
    })
    
    // Guardar archivo
    const desktopPath = app.getPath('desktop')
    const fileName = `informe_usuario_${Date.now()}.pdf`
    const filePath = path.join(desktopPath, fileName)
    
    fs.writeFileSync(filePath, pdfBuffer)
    
    console.log('PDF guardado en:', filePath)
    
    // Abrir el archivo
    shell.openPath(filePath)
    
    // Cerrar ventana temporal
    win.close()
    
    // Notificar al renderer que se completó
    event.reply('pdf-generated', { success: true, filePath })
    
  } catch (error) {
    console.error('Error generando PDF:', error)
  }
})

// Resto de tu código de ventanas...
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
      preload: path.join(__dirname, 'preload.js'), // Asegúrate que apunte al compilado
      contextIsolation: true,
      nodeIntegration: false
    },
  })

  mainWindow.maximize()

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
  if (helpWindow && !helpWindow.isDestroyed()) {
    helpWindow.focus()
    return
  }

  if (helpWindow && helpWindow.isDestroyed()) {
    helpWindow = null
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
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  })
  
  if (VITE_DEV_SERVER_URL) {
    helpWindow.loadURL(VITE_DEV_SERVER_URL + '#/help')
  } else {
    helpWindow.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

ipcMain.on('open-main-window', () => {
  createMainWindow()
})

ipcMain.on('open-help-window', () => {
  createHelpWindow()
})

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
      contextIsolation: true,
      nodeIntegration: false
    },
  })

  loginWindow.webContents.on('did-finish-load', () => {
    loginWindow?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    loginWindow.loadURL(VITE_DEV_SERVER_URL)
  } else {
    loginWindow.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    loginWindow = null
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createLoginWindow()
  }
})

app.whenReady().then(createLoginWindow)