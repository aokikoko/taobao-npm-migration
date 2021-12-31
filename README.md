# taobao-npm-migration
taobao-npm-migration是一个替换taobao源或自定义源的替换工具

# 背景
随着新的域名已经正式启用，老 http://npm.taobao.org 和 http://registry.npm.taobao.org 域名将于 2022 年 05 月 31 日零时起停止服务。（望周知，转给你的前端小伙伴）

由于项目, 模块众多, 手动搜索更改存量文件较为繁琐. 
所以制作此小工具提升效率与准确性.

# 执行形式

例:

项目根目录下执行
npx taobao-npm-migration -p -i -n

输出:

 package-lock.json 中 npm.taobao.org 共计 xx 条替换

 package-lock.json 中 registry.nlark.com 共计 xx 条替换

 .npmrc 中 npm.taobao.org 无需替换

 .npmrc 中 registry.nlark.com 共计 xx 条可替换

 替换完成

-------

例:

项目根目录下执行
npx taobao-npm-migration -p -i -n -d

增加 -d 参数仅输出查询结果, 不进行实际替换


-------

例:
 执行 npx taobao-npm-migration -r  
 可实现切换 nrm 源, 切换前可执行 nrm ls 查看您当前 taobao 源的地址
 
 成功执行输出:
   stdout: nrm 设置成功 https://registry.npmmirror.com/, 请使用 nrm ls 再次确认

-------
例:
 执行 npx taobao-npm-migration -f "希望被替换掉的自定义字符串" -t "目标字符串"

 可实现任意字符串替换

# 参数解释

| 缩写形式 | 全称                   | 参数    | 默认值         | 备注                             |
| -------- | ---------------------- | ------- | -------------- | -------------------------------- |
| -f       | --from                 | string  | npm.taobao.org | 被替换的域名字符串               |
| -t       | --to                   | string  | npmmirror.com  | 替换成的域名                     |
| -p       | --include-package-lock | boolean | false          | 是否包含 package-lock.json 文件  |
| -i       | --include-nlark        | boolean | false          | 是否处理 registry.nlark.com 域名 |
| -n       | --include-npmrc        | boolean | false          | 是否包含 npmrc                   |
| -r       | --include-nrm          | boolean | false          | 是否包含 nrm registry 列表       |
| -d       | --dry-run              | boolean | false          | 只检测, 不执行. 显示检测结果     |
| -h       | --help                 |         |                | 查看帮助信息                     |



