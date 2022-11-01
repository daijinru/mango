import vscode, {Uri} from 'vscode'
import { CustomTreeType } from './mangoHelper'
import Terminal, { START_TERMINAL_NAME } from './util/terminal'
import { extract } from './util/extract'
import { download } from './util/download'

const terminal = new Terminal('');
const startTerminal = new Terminal('', { name: START_TERMINAL_NAME });

export const install = () => {
  terminal.exec('pnpm install');
};

export const init = async () => {
  const MANGO_MICROAPP_TEMPLATE = 'mango-microapp-template'
  const ZIP_NAME = MANGO_MICROAPP_TEMPLATE + '.zip'
  const extractedRelativePath = await vscode.window.showInputBox({
    value: '',
    placeHolder: '请输入解压后路径（相对当前文件夹）',
    prompt: '如果没有输入则默认当前路径',
  });
  const r = await download(
    '模板地址',
    './',
    ZIP_NAME,
  )
  if (!r) return vscode.window.setStatusBarMessage('下载失败', 5000)
  await extract(MANGO_MICROAPP_TEMPLATE, './' + ZIP_NAME, extractedRelativePath)

  const /*编辑器当前打开的文档目录*/workspaceFolders = vscode.workspace.workspaceFolders
  const /*当前项目的根路径*/rootPath = (workspaceFolders && workspaceFolders[0])?.uri
  let /*临时 zip 路径*/zipPath
  if (rootPath) zipPath = Uri.joinPath(rootPath, './' + ZIP_NAME)
  if (zipPath) await vscode.workspace.fs.delete(zipPath)
  vscode.window.setStatusBarMessage('Neubla App 初始化完成', 3000)
}

export const start = async () => {
  startTerminal.exec('npx cross-env NODE_ENV=development node mango/bin/index.js run --mode development')
};

export const build = async () => {
  let env = await vscode.window.showQuickPick(['daily', 'production', '自定义'], {
    canPickMany: false,
    placeHolder: '请选择环境参数，如果没有请选择 custom 然后输入自定义参数',
  })
  if (env === '自定义') {
    env = await vscode.window.showInputBox({
      value: '',
      prompt: '请输入自定义环境参数',
    })
  }
  if (!env) {
    return vscode.window.showInformationMessage('已取消构建流程：请输入环境参数')
  }

  terminal.exec(`npx cross-env NODE_ENV=${env} node mango/bin/index.js build --mode ${env}`)
}

export const pnpmAdd = async () => {
  const pnpmAddParams = [
    ['-D', '开发依赖'],
    ['', '运行依赖'],
    ['-O', '可选依赖']
  ]
  let param = await vscode.window.showQuickPick(
    pnpmAddParams.map(p => p[1]),
    {
      canPickMany: false,
      placeHolder: '请选择您要安装依赖的参数，默认选用运行依赖',
    }
  )
  if (!param) param = ''
  else {
    const result = pnpmAddParams.find(p => p[1] === param)
    if (result) param = result[0]
  }
  const packageName = await vscode.window.showInputBox({
    value: '',
    placeHolder: '请输入...',
    prompt: '请输入您要安装的包名，多个包可用空格分开',
    validateInput(value) {
      value = value.trim();
      if (value.length === 0) return '包名不能为空';
      if (/[\\:\*\?\"\'<>|]/.test(value)) return '含有不合法字符';
      return null;
    }, 
  });
  if (!packageName) return vscode.window.showInformationMessage('没有输入包名，已取消流程')

  terminal.exec(`pnpm add ${param} ${packageName.trim()}`);
};

export const open = (item: CustomTreeType) => {
  if (!item.proxyURL) return;
  vscode.env.openExternal(vscode.Uri.parse(item.proxyURL));
};
