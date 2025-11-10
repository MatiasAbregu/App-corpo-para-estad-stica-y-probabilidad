import { app, BrowserWindow } from 'electron'

function createWindow () {
  const win = new BrowserWindow({
    minWidth: 750,
    minHeight: 600,
    autoHideMenuBar: true,
    title: "App corpo probabilidad y estadística"
  });

  win.loadURL('http://localhost:5173/')
}

app.whenReady().then(() => {
  createWindow()
});