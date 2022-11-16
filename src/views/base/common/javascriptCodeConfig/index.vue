<template>
  <el-dialog
    title="javascript代码配置"
    :visible.sync="visible"
    append-to-body
    @close="closeDialog"
    width="300"
    height="200"
  >
    <div style="padding-bottom: 40px;">
        <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入代码块"
            v-model="textarea">
        </el-input>
    </div>
  </el-dialog>
</template>

<script>
import { getGroupFacilitiesByVideo } from '@/api/rs_facilities'
import colorUtil from '@/utils/colorUtil'
export default {
  data () {
    return {
      visible: false,
      javascript_code:''
    }
  },
  computed: {

  },
  created () {
  },
  methods: {
    showDialog(javascript_code){
        this.javascript_code = javascript_code;
        this.visible = true;
    },
    closeDialog () {
        this.javascript_code = '';
        this.visible = false;
    },
    getJavascriptCode(){
        return this.javascript_code;
    }
  }
}
</script>

<style lang="stylus" scoped></style>
