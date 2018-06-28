<template>
  <div class="upload-file">
    <input type="file">
    <table>
      <td align="left" id="bannerTd">
        <button id="uploadBanner" style="width: 160px;"  class="btn btn-info" >选择文件</button>
      </td>
    </table>
    <button @click="getValue">KOA</button>
  </div>
</template>

<script>
export default {
  name: 'Upload',
  data() {
    return {

    }
  },
  methods: {
    getValue() {
      this.$http.get('/api')
        .then((res) => {
          console.log('res', res);
        })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
