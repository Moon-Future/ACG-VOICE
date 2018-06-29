<template>
  <div class="upload-file">
    <div class="upload-tabs">
      <el-tabs>
        <el-tab-pane label="上传图片">
          <input type="file" multiple @change="imgPreview">
          <button @click="uploadFile">全部上传</button>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="upload-area">
      <el-row :gutter="20">
        <el-col :span="4" v-for="(img, i) in imgs" :key="i">
          <el-card class="upload-card" :body-style="{padding:'0px'}">
            <div class="upload-card-tools">
              <button type="primary">点击上传</button>
              <i class="el-icon-close"></i><i class="el-icon-check"></i></div>
            <img :src="img.src" alt="上传图片预览">
            <div class="upload-card-msg">
              <p>{{ img.name }}</p>
              <p v-if="img.link">链接：{{ img.link }}</p>
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
export default {
  name: 'Upload',
  data() {
    return {
      imgs: [],
      putExtra: { fname: "", params: {}, mimeType: [] || null },
      config: { useCdnDomain: true },
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
      Array.prototype.forEach.call(files, file => {
        let reader = new FileReader()
        let obj = {}
        reader.readAsDataURL(file)
        reader.onload = function(e) {
          obj = {
            src: reader.result,
            name: file.name,
          }
          that.imgs.splice(that.imgs.length, 1, obj)
        }
      })      
    },
    uploadFile() {
      if (this.imgs.length === 0) {
        return;
      }
      let that = this, token, fileLinkData = {};
      this.$http.get('/api/upload/getUploadToken')
        .then((res) => {
          console.log('res', res)
          token = res.data;
          // that.imgs.forEach((img, index) => {
          //   let blob = that.dataURItoBlob(img.src)
          //   let observable = qiniu.upload(blob, img.name, token, that.putExtra, that.config);
          //   let subscription = observable.subscribe({ 
          //     next(res) { 
          //       console.log('next:' + JSON.stringify(res));
          //       img.loadPercent = Math.floor(res.total.percent)
          //       that.imgs.splice(index, 1, img)
          //     }, 
          //     error(err) { 
          //       console.log('error:' + err); 
          //     }, 
          //     complete(res) {
          //       console.log('complete' + JSON.stringify(res));
          //       fileLinkData[res.hash] = {
          //         name: res.key,
          //         link: that.imgLinkDomain + res.key
          //       }
          //       img.loadPercent = 100
          //       img.loadStatus = true
          //       that.imgs.splice(index, 1, img)
          //       console.log(fileLinkData)
          //     }
          //   });
          // })
        })
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
