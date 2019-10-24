import util from 'util';
import childprocess from 'child_process';

const exec = util.promisify(childprocess.exec);

const execShellCommand = async (command: string) => {
  const { stdout, stderr } = await exec(command);

  if (stderr) {
    throw stderr;
  }
  return stdout;
};

export { execShellCommand }
