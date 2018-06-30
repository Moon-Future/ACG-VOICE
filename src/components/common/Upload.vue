<template>
  <div class="upload-file">
    <div class="upload-tabs">
      <el-tabs>
        <el-tab-pane label="上传图片">
          <input type="file" multiple @change="imgPreview">
          <span>已上传 {{ imgSuccess }} 张，还剩 {{ imgRest }} 张</span>
          <button @click="uploadAllImages">全部上传</button>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="upload-area">
      <el-row :gutter="20">
        <el-col :span="4" v-for="(img, i) in images" :key="i">
          <el-card class="upload-card" :body-style="{padding:'0px'}">
            <div class="upload-card-tools">
              <button type="primary">点击上传</button>
              <i class="el-icon-close"></i><i class="el-icon-check"></i></div>
            <img :src="img.src" alt="上传图片预览">
            <div class="upload-card-msg">
              <p>{{ img.name }}</p>
              <p v-if="img.link">链接：<a :href="img.link" target="_blank">{{ img.link }}</a></p>
              <el-progress :text-inside="true" :stroke-width="12" :percentage="img.loadPercent" :status="img.loadStatus ? 'success' : ''"></el-progress>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import * as qiniu from 'qiniu-js'
import { callbackify } from 'util';
import { resolve } from 'url';
export default {
  name: 'Upload',
  data() {
    return {
      images: [],
      imgLen: 0,
      imgSuccess: 0,
      imgRest: 0,
      uploadOptions: {
        putExtra: { fname: "", params: {}, mimeType: [] || null },
        config: { useCdnDomain: true },
      },
      imgLinkDomain: 'http://paxr4fk3y.bkt.clouddn.com/'
    }
  },
  methods: {
    getValue() {
      this.$http.get('/api/upload/image')
        .then((res) => {
          console.log('res', res)
        })
    },
    imgPreview(e) {
      let fileDom = e.target
      let files = fileDom.files
      let that = this
      this.imgLen = files.length
      this.imgRest = files.length
      Array.prototype.forEach.call(files, file => {
        let reader = new FileReader()
        let obj = {}
        reader.readAsDataURL(file)
        reader.onload = function(e) {
          obj = {
            src: reader.result,
            name: file.name,
          }
          that.images.splice(that.images.length, 1, obj)
        }
      })      
    },
    uploadImage({token, image, index = 1, callback}) {
      if (image.loadStatus === true) {
        return
      }
      let that = this
      let blob = this.dataURItoBlob(image.src)
      let observable = qiniu.upload(blob, image.name, token, this.uploadOptions.putExtra, this.uploadOptions.config)
      let subscription = observable.subscribe({ 
        next(res) {
          that.images.splice(index, 1, image)
        },
        error(err) { 
          console.log('error:' + err)
        }, 
        complete(res) {
          that.imgSuccess += 1
          that.imgRest = that.imgLen - that.imgSuccess
          image.loadPercent = 100
          image.loadStatus = true
          image.link = that.imgLinkDomain + res.key
          callback ? callback(res) : false
          that.images.splice(index, 1, image)
        }
      });
    },
    uploadAllImages() {
      if (this.images.length === 0) {
        return;
      }
      let that = this, token, fileLinkData = {};
      (async () => {
        token = await new Promise((resolve) => {
          that.$http.get('/api/upload/getUploadToken')
            .then((res) => {
              resolve(res.data)
            })
        })
        for (let i = 0, len = that.images.length; i < len; i++) {
          await new Promise((resolve) => {
            that.uploadImage({
              token, 
              image: that.images[i],
              index: i, 
              callback: (uploadRes) => {
                fileLinkData[uploadRes.hash] = {
                  name: uploadRes.key,
                  link: that.imgLinkDomain + uploadRes.key,
                  bucket: uploadRes.bucket,
                  fsize: (uploadRes.fsize / 1024).toFixed('2') + ' KB',
                  hash: uploadRes.hash,
                  mimeType: uploadRes.mimeType,
                  lastUpd: new Date().getTime()
                }
                resolve()
              }
            })
          })
        }
        that.$http.post('/api/upload/fileData', {
          data: fileLinkData
        }).then((res) => {
          // console.log(res.dara.msg)
        })
      })()
    },
    dataURItoBlob(dataURI) {
      var byteString = atob(dataURI.split(',')[1])
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
      var ab = new ArrayBuffer(byteString.length)
      var ia = new Uint8Array(ab)
      for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i)
      }
      return new Blob([ab], {type: mimeString})
    }
  }
}
</script>

<style lang="scss" scoped>
  .upload-file {
    width: 80%;
    padding: 0 50px;
    font-size: 16px;
  }
  .upload-card {
    margin-bottom: 20px;
    font-size: 12px;
    text-align: left;
    .upload-card-tools {
      cursor: pointer;
      .el-icon-check {
        color: #fff;
        background: #66c23a;
        border-radius: 50%;
      }
    }
    img {
      width: 100%;
    }
    .upload-card-msg {
      padding: 3px;
    }
  }
</style>
