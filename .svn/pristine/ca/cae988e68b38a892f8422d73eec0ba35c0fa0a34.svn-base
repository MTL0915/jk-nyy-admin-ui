<template>
  <div>
    <el-form>
      <el-form-item label="名称">
        <el-input
          size="mini"
          style="width:300px;"
          v-model="form.name"
        ></el-input>
      </el-form-item>
      <el-form-item label="数值">
        <el-input
          size="mini"
          style="width:300px;"
          v-model="form.value"
        ></el-input>
      </el-form-item>
      <el-form-item label="单位">
        <el-input
          size="mini"
          style="width:300px;"
          v-model="form.unit"
        ></el-input>
      </el-form-item>
      <el-form-item label="说明">
        <el-input
          size="mini"
          style="width:300px;"
          v-model="form.description"
        ></el-input>
      </el-form-item>
    </el-form>

    <div style="text-align:right;">
      <el-button
        size="mini"
        type="primary"
        @click="onSubmit"
      >确定</el-button>
    </div>
  </div>
</template>
<script>
import { getAttributeById, addOrUpdateAttribute } from '@/api/hd_factory_device_attribute'

export default {
  props: {
    formId: {
      type: Number,
      default: null
    },
    hd_factory_device_id: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      form: {
        id: null,
        hd_factory_device_id: null,
        name: null,
        value: null,
        unit: null,
        description: null
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      if (this.formId) {
        getAttributeById({ id: this.formId }).then(res => {
          this.form = res.data
        })
      } else if (this.hd_factory_device_id) {
        this.form.hd_factory_device_id = this.hd_factory_device_id
      } else {
        this.$message.error('参数错误!')
      }
    },
    onSubmit () {
      if (this.form.name === null || this.form.name === '') {
        this.$message.error('名称不能为空!')
        return
      }
      const formD = new FormData()
      for (var i in this.form) {
        if (this.form[i] !== null) {
          formD.append(i, this.form[i])
        }
      }
      addOrUpdateAttribute(formD).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg)
          this.$parent.$parent.init()
          this.$parent.$parent.factoryDeviceAttributeFormDialogVisible = false
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>