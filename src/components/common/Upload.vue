<template>
  <div class="upload-file">
    <div class="upload-tabs">
      <el-tabs>
        <el-tab-pane label="上传图片"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="upload-area">
      <el-row :gutter="20">
        <el-col :span="4" v-for="(img, i) in imgs" :key="i">
          <el-card class="upload-card">
            <img src="" alt="上传图片预览">
            <div class="upload-card-msg">
              图片信息
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <input type="file" multiple>
    <button @click="getValue">KOA</button>
  </div>
</template>

<script>
export default {
  name: 'Upload',
  data() {
    return {
      imgs: [
        {},
        {},
        {},
        {},
        {},
        {},
        {}
      ]
    }
  },
  methods: {
    getValue() {
      this.$http.get('/api/upload/image')
        .then((res) => {
          console.log('res', res);
        })
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
  }
</style>
