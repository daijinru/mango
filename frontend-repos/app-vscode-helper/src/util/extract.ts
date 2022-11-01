import StreamZip from "node-stream-zip"
import vscode, {Uri} from 'vscode'
import {resolve} from 'path'

export async function extract(microappTemplateName: string, zipPath: string, extractedRelativePath?: string) {
  if (!zipPath) return Promise.resolve(null)
  const trusted = vscode.workspace.isTrusted
  if (!trusted) return Promise.resolve(vscode.window.showInformationMessage('已取消初始化流程：workspace 不被信任'))

  const /*编辑器当前打开的文档目录*/workspaceFolders = vscode.workspace.workspaceFolders
  const /*当前项目的根路径*/rootPath = (workspaceFolders && workspaceFolders[0])?.uri
  let /*临时解压路径*/extracted
  let /*目标路径*/target: vscode.Uri
  if (rootPath) extracted = Uri.joinPath(rootPath, './extracted')
  if (extracted && rootPath) {
      await vscode.workspace.fs.createDirectory(extracted)
      const zip = new StreamZip.async({ file: resolve(rootPath.fsPath, zipPath) })
      await zip.extract(null, extracted.fsPath)
      await zip.close()

      target = Uri.joinPath(rootPath, extractedRelativePath || './')
      await vscode.workspace.fs.createDirectory(target)
      const templateUri = Uri.joinPath(extracted, './' + microappTemplateName)
      const files = await vscode.workspace.fs.readDirectory(templateUri)

      await Promise.all(files.map(async file => {
        const fileUri = Uri.joinPath(templateUri, file[0])
        const targetUri = Uri.joinPath(target, './' + file[0])
        await vscode.workspace.fs.copy(fileUri, targetUri, {overwrite: true})
        return Promise.resolve(true)
      }))
      await vscode.workspace.fs.delete(extracted, {recursive: true})
      return Promise.resolve(true)
  }
}
