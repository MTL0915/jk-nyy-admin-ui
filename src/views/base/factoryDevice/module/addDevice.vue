<template>
  <!-- 编辑弹出框 -->
  <el-dialog
    :title="dialogTitle"
    :visible.sync="editVisible"
    append-to-body
    width="60%"
  >
    <el-form
      ref="form"
      :rules="rules"
      :model="form"
      label-width="100px"
    >

      <el-form-item
        label="设备名称"
        prop="name"
      >
        <el-input v-model="form.name" />
      </el-form-item>

      <el-form-item label="设备类型">
        <el-cascader
          v-model="typeVersion"
          :options="typeVersionOptions"
          clearable
          @change="changeTypeVersion"
        />
        <!--:props="{ checkStrictly: true }"-->
      </el-form-item>
      <!--<el-form-item label="设备类型" prop="hd_device_type_id">
          <el-select v-model="form.hd_device_type_id" placeholder="请选择">
            <el-option
              v-for="item in deviceTypeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>-->
      <el-form-item
        label="设备序列号"
        prop="device_id"
      >
        <el-input v-model="form.device_id">
          <template slot="prepend">{{ deviceHeader }}</template>
        </el-input>
      </el-form-item>

      <el-form-item
        label="验证码"
        prop="verification_code"
      >
        <el-input v-model="form.verification_code" />
      </el-form-item>
      <!-- <el-form-item
        label="软件版本号"
        prop="version"
      >
        <el-input v-model="form.version" />
      </el-form-item> -->
      <el-form-item
        label="设备详细信息"
        prop="detail_json"
      >
        <el-input v-model="form.detail_json" />
      </el-form-item>
      <el-form-item
        label="通信地址"
        prop="communication"
      >
        <el-input v-model="form.communication" />
      </el-form-item>
      <el-form-item
        label="描述"
        prop="describe"
      >
        <el-input v-model="form.describe" />
      </el-form-item>

    </el-form>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="hide">取 消</el-button>
      <el-button
        type="primary"
        @click="saveEdit"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { getList, getTypeHardware } from '@/api/equiptype'
import { find, add, update, deleteById, batchDelete } from '@/api/factorydevice'
export default {
  data () {
    return {
      fileRaw: "",
      deviceHeader: "",
      dialogTitle: "",
      editVisible: false,
      typeVersion: "",
      form: this.initForm(),
    }
  },
  computed: {},
  created () {
    // 加载设备数据
    this.getTypeVersionOptions();
  },
  methods: {

    initForm () {
      this.form = {
        hd_factory_device_id: '',
        name: '',
        device_id: '',
        verification_code: 'A12345',
        version: 'V1.0',
        hd_device_type_id: '',
        hd_hardware_version_id: '',
        production_date: '',
        describe: '',
        communication: '',
        detail_json: ''
      }
      return this.form;
    },

    open: function (json) {
      this.initForm();
      // 渲染form配置函数
      for (var i in this.form) {
        this.form[i] = json.form[i] || null;
      }
      // 标题名
      this.dialogTitle = json.title;
      // 当前设备得类型
      this.typeVersion = json.typeVersion;
      // 显示编辑框
      this.show();
    },

    show: function () {
      this.editVisible = true;
    },

    hide: function () {
      this.editVisible = false;
    },

    getTypeVersionOptions () {
      getTypeHardware().then(res => {
        this.typeVersionOptions = res.data
      })
    },
    // 选择设备变化
    changeTypeVersion (data) {
      // 填充选择得设备类型id
      this.form.hd_device_type_id = data[0]
      // 填充选择得设备序列号
      this.form.hd_hardware_version_id = data[1]
      const _this = this
      // 遍历类型参数
      this.typeVersionOptions.forEach(function (data1, index1) {
        // 每个数据得值等于当前选中得设备类型id时
        if (data1.value === _this.form.hd_device_type_id) {
          data1.children.forEach(function (data2, index2) {
            if (data2.value === _this.form.hd_hardware_version_id) {
              var code = data1.code
              var version = _this.prefixIntrger(data2.label, 2)
              var functionCode = data1.functionCode

              // _this.form.device_id
              _this.deviceHeader = code.substring(3, code.length) + version + functionCode + '-'
            }
          })
        }
      })
    },
    prefixIntrger (num, length) {
      return (Array(length).join('0') + num).slice(-length)
    },
    // 保存编辑
    saveEdit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          const form = this.form
          if (this.fileRaw) {
            form.image_path = this.fileRaw
          }
          form.device_id = this.deviceHeader + form.device_id
          if (this.dialogTitle === '添加') {
            add(form).then(res => {
              if (res.code === 200) {
                this.hide()
                if (this.fileRaw) {
                  this.fileRaw = null
                }
                this.getData()
              } else {
                this.$message.error(res.msg)
              }
            })
          } else {
            update(form).then(res => {
              if (res.code === 200) {
                this.hide()
                this.getData()
              } else {
                this.$message.error(res.msg)
              }
            })
          }
        } else {
          this.valid = false
          console.log('valid fail, return')
        }
      })
    },
  }
}
</script>

