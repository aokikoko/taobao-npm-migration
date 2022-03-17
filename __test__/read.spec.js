const db = require('./db.js') // 要测试的db.js
const fs = require('fs')
jest.mock('fs') // 将node的fs模块换成自己__mock__中的fs
describe('这是单元测试', () => {
    it('should read..', async () => {
        const data = []
        fs.setMock('./xxx', null, JSON.stringify(data))
        const list = await db.read('./xxx')
        // console.log(list)
        // expect(list).toStrictEqual(data)
    })
})
