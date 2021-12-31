#!/usr/bin/env node

const program = require("commander");
const changeNrm = require('./lib/change-nrm')
const changeStr = require('./lib/change-file')

  // 传入参数设置
program
  .option("-f, --from [string]", "被替换的域名", "npm.taobao.org")
  .option("-t, --to [string]", "替换成的域名", "npmmirror.com")
  .option("-p, --include-package-lock", "是否包含 package-lock.json")
  .option("-i, --include-nlark", "是否处理 registry.nlark.com")
  .option("-n, --include-npmrc", "是否包含 npmrc")
  .option("-r, --include-nrm", "是否包含 nrm registry 列表", changeNrm)
  .option("-d, --dry-run", "只检测，不执行。显示检测结果")
  // 默认支持搜索根目录下所有文件和文件夹
  // .option("-a, --include-all-file", "是否包含当前目录下所有文件和文件夹")
  .action((options) => {
    changeStr();
  });

  // 帮助信息
program.on("--help", function () {
  console.log("");
  console.log("\033[35m Examples: \033[0m");
  console.log("\033[35m 执行: taobao-npm-mrgration -d -p -i -n \033[0m");
  console.log("\033[35m 输出: package-lock.json 中 npm.taobao.org 共计 xx 条可替换 \033[0m")
  console.log("\033[35m 输出: package-lock.json 中 registry.nlark.com 共计 xx 条可替换 \033[0m")
  console.log("\033[35m 输出: .npmrc 中 npm.taobao.org 无需替换 \033[0m")
  console.log("\033[35m 输出: .npmrc 中 registry.nlark.com 共计 xx 条已替换 \033[0m")
});

program.parse(process.argv);

const options = program.opts();