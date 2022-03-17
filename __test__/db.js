//要测试的db.js
const homedir = require('os').homedir()
const home = process.env.HOME || homedir
const p = require('path')
const fs = require('fs')
const dbPath = p.join(home, '.todo')

const db = {
  read(path = dbPath) {
      return new Promise((resolve, reject) => {
          fs.readFile(path, { flag: 'a+' }, (error, data) => {//这里将来会调用，jest 的f s，而不是node自身的fs
              if (error) return reject(error)
              let list
              try {
                  list = JSON.parse(data.toString())
              } catch (error2) {
                  list = []
              }
              resolve(list)
          })
      })
  }
}
module.exports = db

