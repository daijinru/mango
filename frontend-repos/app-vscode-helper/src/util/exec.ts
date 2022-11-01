import { exec as NodeExec, ExecSyncOptions } from 'child_process';
import { promisify } from 'util';

const execPromisify = promisify(NodeExec);

export type ExecArg = string | false | undefined;

function getCwdOption(cwd?: string): Pick<ExecSyncOptions, 'stdio' | 'cwd'> {
  return cwd ? { stdio: 'pipe', cwd } : { stdio: 'pipe' };
}

export function exec(app: string, ...args: ExecArg[]) {
  async function runWithCwd(cwd?: string) {
    const command = [app, ...args.filter(Boolean).map((a) => (a || '').trim())].join(' ');
    return await execPromisify(command, getCwdOption(cwd));
  }
  runWithCwd.run = runWithCwd;
  return runWithCwd;
}
