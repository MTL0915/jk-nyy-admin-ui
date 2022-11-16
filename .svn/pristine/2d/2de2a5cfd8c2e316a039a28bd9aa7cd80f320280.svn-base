<template>
  <div>
    <el-button
      size="mini"
      type="primary"
      icon="el-icon-edit"
      style="padding: 0px;" title="修改名称"
      @click="to"
    ></el-button>
    <eForm
      ref="form"
      :sup_this="sup_this"
      :is-add="false"
    />
  </div>
</template>
<script>
import eForm from './form'
export default {
  components: { eForm },
  props: {
    data: {
      type: Object,
      required: true
    },
    sup_this: {
      type: Object, 
      required: true
    }
  },
  methods: {
    to () {
      const _this = this.$refs.form
      _this.form = {
        id: this.data.id,
        name: this.data.name,
        code: this.data.code,
        imagePath: this.data.imagePath,
        rqcodeImagePath: this.data.rqcodeImagePath,
        sta: this.data.sta,
        viewCount: this.data.viewCount,
        createUser: this.data.createUser,
        createDate: this.data.createDate,
        url: this.data.url
      }
      if (this.data.imagePath) {
        _this.form.http_image_path = process.env.IMG_URL + this.data.imagePath
      }
      if (_this.form.url) {
        _this.qjType = '2'
      } else {
        _this.qjType = '1'
      }
      _this.dialog = true
    }
  }
}
</script>

<style scoped>
div {
  display: inline-block;
  margin-right: 3px;
}
</style>
