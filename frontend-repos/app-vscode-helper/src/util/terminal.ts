import * as vscode from 'vscode';

const TERMINAL_NAME = 'Mango Terminal';
export const START_TERMINAL_NAME = 'Mango Dev Terminal';

class Terminal {
  private _terminal?: vscode.Terminal;
  private options?: vscode.TerminalOptions;
  private cwd?: string;

  constructor(cwd?: string, options?: vscode.TerminalOptions) {
    this.cwd = cwd;
    this.options = options;

    vscode.window.onDidCloseTerminal((t) => {
      if (
        (this._terminal?.name === TERMINAL_NAME && t.name === TERMINAL_NAME) ||
        (this._terminal?.name === START_TERMINAL_NAME && t.name === START_TERMINAL_NAME)
      ) {
        this._terminal = undefined;
      }
    });
  }

  get terminal() {
    if (this._terminal && this._terminal.exitStatus?.code === undefined) return this._terminal;
    this._terminal = vscode.window.terminals.find((terminal) => terminal.name === TERMINAL_NAME);
    if (this._terminal) return this._terminal;
    this._terminal = vscode.window.createTerminal({
      name: TERMINAL_NAME,
      ...this.options,
      cwd: this.cwd,
    });
    return this._terminal;
  }

  sendText(...args: string[]) {
    this.terminal.sendText(args.filter(Boolean).join(' '));
  }

  show() {
    this.terminal.show();
  }

  hide() {
    this.terminal.hide();
  }

  dispose() {
    this.terminal.dispose();
    this._terminal = undefined;
  }

  exec(...args: string[]) {
    this.show();
    this.sendText(...args);
  }
}

export default Terminal;
