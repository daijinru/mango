import * as vscode from 'vscode';
import {
  pnpmAdd,
  install,
  open,
  start,
  build,
  init,
} from './commands';

export const MangoTreeItemKey = {
  init: /*初始化微应用项目*/'init',
  add: /*添加依赖*/'add',
  install: /*安装依赖*/'install',
  start: /*启动开发服务*/'start',
  open: /*打开代理服务*/'open',
  build: /*启动构建服务*/'build'
} as const;

export const treeItems: CustomTreeType[] = [
  {
    label: '初始化',
    description: '初始化 Mango 微应用',
    key: MangoTreeItemKey.init,
    contextValue: 'run',
    icon: 'add',
    children: [],
  },
  {
    label: '新增依赖',
    description: 'pnpm add <package>',
    key: MangoTreeItemKey.add,
    contextValue: 'run',
    icon: 'add',
    children: [],
  },
  {
    label: '安装依赖',
    description: 'pnpm i',
    key: MangoTreeItemKey.install,
    contextValue: 'run',
    icon: 'inbox',
    children: [],
  },
  {
    label: '运行调试',
    description: 'yarn start',
    key: MangoTreeItemKey.start,
    contextValue: 'run',
    icon: 'play',
    children: [],
  },
  {
    label: '构建打包',
    description: 'yarn build',
    key: MangoTreeItemKey.build,
    contextValue: 'run',
    icon: 'inbox',
    children: [],
  },
];

export interface CustomTreeType {
  label: string;
  description: string;
  key: keyof typeof MangoTreeItemKey;
  icon: string;
  proxyURL?: string;
  children?: CustomTreeType[];
  contextValue?: string;
}

export class MangoHelper implements vscode.TreeDataProvider<CustomTreeType> {
  constructor(context: vscode.ExtensionContext) {
  	vscode.window.setStatusBarMessage('欢迎使用 mango-vscode-helper', 5000);
    context.subscriptions.push(
      vscode.commands.registerCommand('mango-vscode-helper.refresh', this.refresh),
      vscode.commands.registerCommand('mango-vscode-helper.run', this.onCommand),
    );
  }

  private _onDidChangeTreeData: vscode.EventEmitter<CustomTreeType | undefined | null | void> =
    new vscode.EventEmitter<CustomTreeType | undefined | null | void>();
  readonly onDidChangeTreeData: vscode.Event<CustomTreeType | undefined | null | void> =
    this._onDidChangeTreeData.event;

  refresh = () => {
    this._onDidChangeTreeData.fire()
  }

  getTreeItem(element: CustomTreeType): vscode.TreeItem {
    return new TreeItem(
      element.label,
      element.key,
      element.children && element.children.length > 0
        ? vscode.TreeItemCollapsibleState.Expanded
        : vscode.TreeItemCollapsibleState.None,
      {
        description: element.description,
        tooltip: `${element.label} - ${element.description}`,
        contextValue: element.contextValue || '',
        iconPath:
          typeof element.icon === 'string' ? new vscode.ThemeIcon(element.icon) : element.icon,
      },
    );
  }

  async getChildren(element?: CustomTreeType): Promise<CustomTreeType[]> {
    if (element) {
      return element.children || [];
    }
    return treeItems;
  }

  onCommand = (item: CustomTreeType) => {
    switch (item.key) {
      case MangoTreeItemKey.init:
        init()
        break
      case MangoTreeItemKey.add:
        pnpmAdd()
        break
      case MangoTreeItemKey.install:
        install()
        break
      case MangoTreeItemKey.start:
        start()
        break
      case MangoTreeItemKey.open:
        open(item)
        break
      case MangoTreeItemKey.build:
        build()
        break
    }
  };
}

class TreeItem extends vscode.TreeItem {
  constructor(
    label: string | vscode.TreeItemLabel,
    public key: keyof typeof MangoTreeItemKey,
    collapsibleState?: vscode.TreeItemCollapsibleState,
    options?: {
      iconPath?: string | vscode.ThemeIcon;
      description?: string | boolean;
      tooltip?: string | vscode.MarkdownString | undefined;
      command?: vscode.Command;
      contextValue?: string;
    },
  ) {
    super(label, collapsibleState);
    if (options) {
      Object.assign(this, { ...options });
    }
  }
}
