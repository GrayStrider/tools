import { execShellCommand as exec } from 'C:/tools/execShellCommand';
import util from 'util';
import childprocess from 'child_process';

const exec2 = util.promisify(childprocess.exec);

const MASTER = 'master';
const UPSTREAM = 'upstream/master';

const main = async () => {
  let res = await exec(`git branch --contains ${MASTER}`);
  let branches = res
    .match(/\S+/g)!
    .filter(branch => !(branch === '*' || branch === MASTER));

  console.log(branches)
  await exec(`git checkout ${MASTER} && git merge ${UPSTREAM}`)
    .then(console.log);
  console.log('here2')
  for (let branch of branches) {
    await exec(`git rebase master ${branch}`);
  }
  console.log('here')

};

main()
.catch(err => {
	console.error(err)
	throw err 
});
