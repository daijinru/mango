import Downloader from "nodejs-file-downloader";
import fs from 'fs-extra'
import vscode from 'vscode'
import {resolve} from 'path'

export async function download(url: string, directory: string, filename: string) {
  const /*编辑器当前打开的文档目录*/workspaceFolders = vscode.workspace.workspaceFolders
  const /*当前项目的根路径*/rootPath = (workspaceFolders && workspaceFolders[0])?.uri
  if (!rootPath) return Promise.resolve(false)
  const result = fs.pathExistsSync(resolve(rootPath?.fsPath, filename))
  if (!result) {
    console.info(url, directory, filename)
    const downloader = new Downloader({
      url,
      directory: resolve(rootPath.fsPath, './'),
      fileName: filename
    });
    try {
      const disposable = vscode.window.setStatusBarMessage('正在下载资源包')
      await downloader.download()
      disposable.dispose()
      return Promise.resolve(true)
    } catch (err) {
      vscode.window.setStatusBarMessage(err as string)
    }
  } else {
    return Promise.resolve(true)
  }
}