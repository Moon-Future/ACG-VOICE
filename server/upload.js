const qiniu = require('qiniu')
const fs = require('fs')
const path = require('path')
const { accessKey, secretKey, bucket } = require('./secret.config')

const options = {
  scope: bucket
}

function getUploadToken() {
  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
  const putPolicy = new qiniu.rs.PutPolicy(options)
  const uploadToken = putPolicy.uploadToken(mac)
  return uploadToken
}

function writeToFile(ctx) {
  let data = ctx.request.body.data
  fs.writeFileSync(path.join(__dirname, './imageLink.js'), JSON.stringify(data), 'utf-8')
  ctx.body = {msg: '图片链接文件写入完成'}
}

module.exports = {
  getUploadToken,
  writeToFile
}