// 更改nrm taobao registry源
const util = require("util");
const exec = util.promisify(require('child_process').exec);

async function changeNrm() {
  try {
    const res = await exec('nrm add taobao https://registry.npmmirror.com/');
    console.log('stdout:  nrm设置成功为https://registry.npmmirror.com/, 请使用nrm ls确认', res.stdout);
  } catch(stderr) {
    if (stderr.code === 1) {
      console.error('未安装nrm')
    } else {
      console.error('stderr:', stderr);
    }
  }
}

module.exports = changeNrm