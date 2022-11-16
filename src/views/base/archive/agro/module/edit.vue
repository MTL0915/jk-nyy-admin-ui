<template>
  <div>
    <el-button size="mini" type="primary" icon="el-icon-edit" @click="to"/>
    <eForm ref="form" :sup_this="sup_this" :is-add="false"/>
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
    to() {
      const _this = this.$refs.form
      _this.form = {
        id: this.data.id,
        p_id: this.data.p_id,
        code: this.data.code,
        name: this.data.name,
        alias: this.data.alias,
        enName: this.data.enName,
        useCode: this.data.useCode,
        description: this.data.description,
        imagePath: this.data.imagePath
      }
      _this.showDialog();

    }
  }
}
</script>

<style scoped>
  div{
    display: inline-block;
    margin-right: 3px;
  }
</style>
