/* eslint-disable no-undef */
// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('node:path')

/**
 * Boolean indicating if the app is running in production mode.
 * Set based on the NODE_ENV environment variable.
*/
// eslint-disable-next-line no-unused-vars
const isProd = process.env.NODE_ENV === 'production'

/**
 * Creates the main browser window for the application.
 * Configures the window size, properties, web preferences etc.
 * Also handles logic for opening dev tools and loading the index.html.
 */
function createWindow() {
  /**
   * Creates the main browser window for the application.
   * Configures the window size, properties, web preferences etc.
   */
  const mainWindow = new BrowserWindow({
    width: 400,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    autoHideMenuBar: true
  })

  // open developer console in dev mode
  // isProd ? null : mainWindow.webContents.openDevTools()

  /** Path to the index.html file that will be loaded into the main browser window. */
  const indexPath = path.join(__dirname, 'pages', 'index.html')

  // and load the index.html of the app.
  mainWindow.loadFile(indexPath)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.