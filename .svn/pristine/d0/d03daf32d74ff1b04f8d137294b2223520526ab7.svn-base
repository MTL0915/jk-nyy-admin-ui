<template>
  <div>
    <el-dialog :visible.sync="dialogVisible" title="设备版本添加" append-to-body width="800px">
      <el-form ref="form" :rules="rules" :model="form" :inline="true" label-width="120px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="硬件版本号" prop="hardware_version">
              <!-- <el-input v-model="form.hardware_version" width="200px" style="width:200px" /> -->
              <el-input-number v-model="form.hardware_version" :min="1" :max="99" controls-position="right" style="width:120px"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="通信方式" prop="communication_type">
              <el-radio-group v-model="form.communication_type">
                <el-radio-button
                  v-for="item in $parent.$parent.communication_typeDicts"
                  :label="item.value"
                  :key="item.value"
                >{{ item.label }}</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="信号通道方式" prop="signal_channel">
              <el-radio-group v-model="form.signal_channel">
                <el-radio-button
                  v-for="item in $parent.$parent.signal_channelDicts"
                  :label="item.value"
                  :key="item.value"
                >{{ item.label }}</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="注释" prop="description">
              <el-input
                v-model="form.description"
                :rows="6"
                resize="none"
                style="width:330px;"
                maxlength="1000"
                type="textarea"
                show-word-limit
                placeholder="注释"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>

import { add } from '@/api/hd_hardware_version'
export default {
  name: 'Basetable',
  data() {
    return {
      dialogVisible: false,
      form: {
        hd_device_type_id: '',
        hardware_version: '01',
        communication_type: '',
        signal_channel: '',
        description: ''
      },
      rules: {
        hardware_version: [{ required: true, message: '请输入硬件版本号', trigger: 'blur' }],
        communication_type: [
          { required: true, message: '请选择设备通讯方式', trigger: 'blur' }
        ],
        signal_channel: [
          { required: true, message: '请选择信号通道方式', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {

  },
  created() {
  },
  methods: {
    // 保存编辑
    saveEdit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const form = this.form

          add(form).then(res => {
            if (res.code === 200) {
              this.$message.success('添加设备版本成功！')
              this.dialogVisible = false
              this.$parent.getData()
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
    show(hd_device_type_id) {
      this.form = {
        hd_device_type_id: hd_device_type_id,
        hardware_version: '',
        communication_type: '',
        signal_channel: '',
        description: ''
      }
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="stylus" scoped>
   .el-dialog__wrapper >>> .el-dialog__body{
    padding-top: 10px;
    padding-bottom: 10px;
  }
</style>
