<template>
  <div>
    <eHeader
      ref="eHeader"
      :schedul_query="schedul_query"
      :plan_query="plan_query"
      :sup_this="sup_this"
    />
    <schedul
      v-show="vstate"
      ref="schedul"
      :sup_this="sup_this"
    />
    <plan
      v-show="!vstate"
      ref="plan"
      :sup_this="sup_this"
    />

    <el-dialog
      :visible.sync="dialogVisible"
      :title="dialogTitle"
      width="750px"
      append-to-body
    >
      <apsAddEdit
        ref="apsAddEdit"
        :sup_this="sup_this"
        :closeAps="closeAps"
      />
    </el-dialog>
  </div>
</template>
<script>
import plan from './module/plan'
import schedul from './module/schedul'
import eHeader from './module/header'
import apsAddEdit from './module/apsAddEdit'
export default {
  components: {
    eHeader,
    plan,
    schedul,
    apsAddEdit
  },
  props: {

  },
  data () {
    return {
      dialogTitle: '',
      dialogVisible: false,
      vstate: true,
      sup_this: this,
      schedul_query: {},
      plan_query: {}
    }
  },
  created () {
  },
  methods: {
    closeAps () {
      this.dialogVisible = false
    }
  }
}
</script>
