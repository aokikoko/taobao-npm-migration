//__mocks__下的fs.js

const fs = jest.genMockFromModule('fs')// jest的fs mock模块
const _fs = jest.requireActual('fs')// 实际的fs 引用真正的模块
Object.assign(fs, _fs)

const mocks = {}

fs.setMock = (path, error, data) => {// 设置将来接受的路径和数据
    mocks[path] = [error, data]// 储存数据
}

// 模拟readFile
fs.readFile = (path, options, callback) => {// 如果
    console.log('模拟api')
    if (callback === undefined) {
        callback = options
    }
    if (path in mocks) {
        callback(...mocks[path])
    } else {
        _fs.readFile(path, options, callback)
    }

}
module.exports = fs
