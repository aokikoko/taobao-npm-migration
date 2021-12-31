// 获取参数 检查出现次数并替换
const program = require("commander");
const fs = require("fs");
const path = require("path");

const pathArr = [];

// 搜索文件获取绝对路径
function searchFile(filePath) {

  if (filePath.includes("node_modules")) return;
  const files = fs.readdirSync(filePath);

  for (const filename of files) {
    const filedir = path.join(filePath, filename);

    const stat = fs.statSync(filedir);

    const isFile = stat.isFile();
    const isDir = stat.isDirectory();

    if (isFile) {
      const targetName = path.basename(filedir);
      if (targetName === "package-lock.json" || targetName === ".npmrc") {
        pathArr.push(filedir);
      }
    }

    if (isDir) {
      searchFile(filedir)
    }
  }
}

searchFile(process.cwd())

const changeStr = async () => {
  const { from, to, includePackageLock, includeNpmrc, includeNlark, dryRun } =
    program.opts();

  const fileArr = [];

  // 路径实现搜索全目录找到绝对路径
  if (includePackageLock) {
    pathArr.forEach(item => {
      if (path.basename(item) === 'package-lock.json') {
        fileArr.push(item);  
      }
    })
  }
  if (includeNpmrc) {
    pathArr.forEach(item => {
      if (path.basename(item) === '.npmrc') {
        fileArr.push(item)
      }
    })
  }

  const keywords = [from];

  if (includeNlark) keywords.push("nlark.com");

  fileArr.forEach((file) => {
    fs.readFile(file, "utf8", (err, data) => {
      if (err) {
        if (err.code === "ENOENT") {
          console.log(`不存在${err.path}文件`);
        }
        return;
      }
      let strData = data.toString();
      for (const word of keywords) {
        const reg = new RegExp(word, "g");
        if (reg.test(strData)) {
          const count = strData.match(reg).length;
          console.log(`${path.basename(file)} 中 ${word} 共计 ${count} 条替换`);
          if (!dryRun) {
            strData = strData.replace(reg, to);
            fs.writeFile(file, strData, (err, data) => {
              if (err) {
                throw err;
              } else {
                console.log("\x1b[1;35mCongratulations!!🎉🎉 \x1b[32m更新完毕!\x1b[0m");
              }
            });
          }
        } else {
          console.log(`${path.basename(file)} 中 ${word} 无需替换`);
        }
      }
    });
  });
};

module.exports = changeStr;
