const qiniu = require('qiniu')
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

module.exports = {
  getUploadToken
}