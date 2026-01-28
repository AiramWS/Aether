import { ipcMain, BrowserWindow, app, shell } from "electron";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import fs from "fs";
import path from "node:path";
createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let loginWindow;
let mainWindow;
let helpWindow;
ipcMain.on("generate-pdf", async (event, html) => {
  try {
    console.log("Generando PDF...");
    const win = new BrowserWindow({
      show: false,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true
      }
    });
    await win.loadURL(`data:text/html;charset=UTF-8,${encodeURIComponent(html)}`);
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    const pdfBuffer = await win.webContents.printToPDF({
      printBackground: true,
      landscape: false,
      pageSize: "A4"
    });
    const desktopPath = app.getPath("desktop");
    const fileName = `informe_usuario_${Date.now()}.pdf`;
    const filePath = path.join(desktopPath, fileName);
    fs.writeFileSync(filePath, pdfBuffer);
    console.log("PDF guardado en:", filePath);
    shell.openPath(filePath);
    win.close();
    event.reply("pdf-generated", { success: true, filePath });
  } catch (error) {
    console.error("Error generando PDF:", error);
  }
});
function createMainWindow() {
  mainWindow = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    width: 1200,
    height: 800,
    minWidth: 1e3,
    minHeight: 700,
    resizable: true,
    minimizable: true,
    maximizable: true,
    fullscreenable: true,
    titleBarStyle: "default",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      // Asegúrate que apunte al compilado
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  mainWindow.maximize();
  if (VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(VITE_DEV_SERVER_URL + "#/homepage");
  } else {
    mainWindow.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
  mainWindow.once("ready-to-show", () => {
    if (loginWindow && !loginWindow.isDestroyed()) {
      loginWindow.close();
      loginWindow = null;
    }
  });
}
function createHelpWindow() {
  if (helpWindow && !helpWindow.isDestroyed()) {
    helpWindow.focus();
    return;
  }
  if (helpWindow && helpWindow.isDestroyed()) {
    helpWindow = null;
  }
  helpWindow = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    width: 1200,
    height: 800,
    minWidth: 1e3,
    minHeight: 700,
    resizable: true,
    minimizable: true,
    maximizable: true,
    fullscreenable: true,
    titleBarStyle: "default",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  if (VITE_DEV_SERVER_URL) {
    helpWindow.loadURL(VITE_DEV_SERVER_URL + "#/help");
  } else {
    helpWindow.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}
ipcMain.on("open-main-window", () => {
  createMainWindow();
});
ipcMain.on("open-help-window", () => {
  createHelpWindow();
});
function createLoginWindow() {
  loginWindow = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    width: 835,
    height: 600,
    resizable: false,
    minimizable: true,
    maximizable: false,
    fullscreenable: false,
    titleBarStyle: "hidden",
    hasShadow: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  loginWindow.webContents.on("did-finish-load", () => {
    loginWindow == null ? void 0 : loginWindow.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  if (VITE_DEV_SERVER_URL) {
    loginWindow.loadURL(VITE_DEV_SERVER_URL);
  } else {
    loginWindow.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    loginWindow = null;
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createLoginWindow();
  }
});
app.whenReady().then(createLoginWindow);
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
