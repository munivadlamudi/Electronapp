const { app, BrowserWindow, ipcMain } = require('electron');
const Tesseract = require('tesseract.js'); // Load Tesseract.js here
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('scan-license', (event, filePath) => {
  // Your existing code for scanning license data
  // ...

  // Notify the renderer process about the completion
  mainWindow.webContents.send('scan-result', 'License data extracted successfully.');
});

ipcMain.on('extract-text', (event, filePath) => {
  // OCR logic using Tesseract.js
  Tesseract.recognize(
    filePath,
    'eng'
  ).then(({ data: { text } }) => {
    mainWindow.webContents.send('display-extracted-text', text);
  }).catch((error) => {
    console.error('Error during text extraction:', error);
  });
});
