// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import { MangoHelper } from './mangoHelper';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	/**
	 * mango vscode helper 已在 package.json 定义
	 * 通过 registerTreeDataProvider 实现
	 */
	context.subscriptions.push(
    vscode.window.registerTreeDataProvider('mangoHelper', new MangoHelper(context)),
	)

	vscode.commands.executeCommand('setContext', 'mango.enable', true);
}

// this method is called when your extension is deactivated
export function deactivate() {}
