const fs = require('fs')
const path = require('path')
const Router = require('koa-router')
const router = new Router()
const Character = require('../database/schema/character')

router.get('/insertCharacterByJson', async (ctx) => {
  const characterData = fs.readdirSync(path.join(__dirname, '../jsonData/characterData'), 'utf-8')
})

module.exports = router