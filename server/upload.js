const qiniu = require('qiniu')
const fs = require('fs')
const path = require('path')
const { accessKey, secretKey, bucket } = require('./secret.config')
const imagesPath = path.join(__dirname, './spider/files/images/LOL')
const mgLinkDomain = 'http://paxr4fk3y.bkt.clouddn.com/'

const options = {
  scope: bucket,
  returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","mimeType":"$(mimeType)"}'
}
const formConfig = new qiniu.conf.Config()
formConfig.zone = qiniu.zone.Zone_z2

function getUploadToken() {
  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
  const putPolicy = new qiniu.rs.PutPolicy(options)
  const uploadToken = putPolicy.uploadToken(mac)
  return uploadToken
}

function writeToFile(ctx) {
  let data = ctx.request.body.data
  fs.writeFileSync(path.join(__dirname, `./imageLink-${new Date().getTime()}.json`), JSON.stringify(data), 'utf-8')
  ctx.body = {msg: '图片链接文件写入完成'}
}

function uploadImage(filePath, fileName, callback) {
  let formUploader = new qiniu.form_up.FormUploader(formConfig)
  let putExtra = new qiniu.form_up.PutExtra()
  let uploadToken
  (async () => {
    uploadToken = await getUploadToken()
    formUploader.putFile(uploadToken, fileName, filePath, putExtra, (respErr, respBody, respInfo) => {
      if (respErr) {
        throw respErr
      }
      if (respInfo.statusCode === 200) {
        // console.log(respBody)
        callback ? callback(respBody) : false
      } else {
        console.log(respInfo.statusCode)
        console.log(respBody)
      }
    })
  })()
}

function nodeUpload() {
  let fileList = fs.readdirSync(imagesPath);
  let dataObj = {};
  (async () => {
    for (let i = 0, len = fileList.length; i < len; i ++) {
      let fileName = fileList[i]
      let filePath = path.join(imagesPath, fileName)
      await new Promise((resolve) => {
        uploadImage(filePath, fileName, function(res) {
          dataObj[res.hash] = {
            name: res.key,
            link: mgLinkDomain + res.key,
            bucket: res.bucket,
            fsize: (res.fsize / 1024).toFixed('2') + ' KB',
            hash: res.hash,
            mimeType: res.mimeType,
            lastUpd: new Date().getTime()
          }
          console.log(`一共 ${len} 张图片，已上传 ${i + 1} 张，还剩 ${len - i - 1} 张`)
          resolve()
        })
      })
    }
    fs.writeFileSync(path.join(__dirname, `./imageLink-node-${new Date().getTime()}.json`), JSON.stringify(dataObj), 'utf-8')
  })()
}

// nodeUpload()

module.exports = {
  getUploadToken,
  writeToFile
}