<template>
  <div>
    <el-button
      size="mini"
      type="primary"
      icon="el-icon-edit"
      @click="to"
    />
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

      this.$refs.form.getPigFarmList()

      _this.form = {
        id: this.data.id,
        pigfarmid: this.data.pigfarmid,
        pigfarmname: this.data.pigfarmname,
        name: this.data.name,
        type: this.data.type,
        code: this.data.code,
        ip: this.data.ip,
        port: this.data.port,
        gbId: this.data.gbId,
        pbport: this.data.pbport,
        btjk: this.data.btjk,
        wsjk: this.data.wsjk,
        pbspjkUrl: this.data.pbspjkUrl,
        user: this.data.user,
        password: this.data.password,
        admintoken: this.data.admintoken,
        status: this.data.status,
        info: this.data.info,
        order: this.data.order,
        by1: this.data.by1,
        by2: this.data.by2,
        systemuser: this.data.systemuser,
        systemusertime: this.data.systemusertime,
        systemupdateuser: this.data.systemupdateuser,
        systemupdateusertime: this.data.systemupdateusertime,
        qjkz: this.data.qjkz,
        isqj: this.data.isqj,
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
