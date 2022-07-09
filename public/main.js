const { app, BrowserWindow } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

function createWindow() {
  /*
   * 넓이 1920에 높이 1080의 FHD 풀스크린 앱을 실행시킵니다.
   * */
  const win = new BrowserWindow({
    width: 800,
    height: 628,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  /*
   * startUrl에 배정되는 url을 맨 위에서 생성한 BrowserWindow에서 실행시킵니다.
   * */
  win.loadURL(
    isDev
      ? "http://127.0.0.1:3000"
      : `file://${path.resolve(__dirname)}/build/index.html`
  );
  if (isDev) {
    win.webContents.openDevTools({ mode: "detach" });
  }
}

app.on("ready", createWindow);
