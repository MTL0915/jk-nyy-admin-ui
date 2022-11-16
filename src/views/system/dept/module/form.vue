<template>
  <el-dialog
    :append-to-body="true"
    :visible.sync="dialog"
    :title="isAdd ? '添加组织' : '编辑组织'"
    width="500px"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      size="small"
      label-width="100px"
    >
      <el-form-item
        label="名称"
        prop="name"
      >
        <el-input
          v-if="checkClick()"
          v-model="form.name"
          style="width: 370px;"
        />
        <div v-else>
          {{form.name}}
        </div>
      </el-form-item>
      <!-- <el-form-item
        v-if="form.pid !== 0"
        label="状态"
        prop="enabled"
      >
        <el-radio
          v-for="item in dicts"
          :key="item.id"
          v-model="form.enabled"
          :label="item.value"
        >{{ item.label }}</el-radio>
      </el-form-item> -->
      <el-form-item
        v-if="canEdit"
        label="上级组织"
      >
        <treeselect
          v-model="form.pid"
          :options="depts"
          style="width: 370px;"
          placeholder="选择上级组织"
          @input="deptChange"
        />
      </el-form-item>
      <el-form-item
        v-if="form.pid !== 0 && form.pid !== 1"
        label="上级组织空间"
      >
        <div style="text-align: center;font-size: 20px;">
          <el-progress
            :text-inside="true"
            :stroke-width="20"
            :percentage="pPercent"
            :status="pPercent<80?'success':'exception'"
          />
          {{pHint}}
        </div>
      </el-form-item>
      <div v-if="checkClick()">
        <el-form-item
          v-if="form.pid !== 0 && form.id"
          label="本级组织空间"
        >
          <div style="text-align: center;font-size: 20px;">
            <el-progress
              :text-inside="true"
              :stroke-width="20"
              :percentage="zPercent"
              :status="zPercent<80?'success':'exception'"
            />
            {{zHint}}
          </div>
        </el-form-item>
        <el-form-item
          v-if="form.pid !== 0"
          label="分配内存"
        >
          <div style="width:400px;display: flex;">
            <el-slider
              style="width:350px;"
              :disabled="distributableMemory===0"
              :max="distributableMemory"
              v-model="zTotalMemory"
              :show-tooltip="false"
              @input="memoryChange"
            />
            <!-- {{'　'+zTotalMemoryStr}} -->
          </div>
          <div style="display: flex;justify-content: space-between;">
            <div>
              <el-input
                v-model="zTotalMemoryGb"
                style="width:80px;"
                type="number"
                @input="inputMemoryChange"
              /> GB
            </div>
            <div>
              <el-input
                v-model="zTotalMemoryMb"
                style="width:80px;"
                type="number"
                @input="inputMemoryChange"
              /> MB
            </div>
            <div>
              <el-input
                v-model="zTotalMemoryKb"
                style="width:80px;"
                type="number"
                @input="inputMemoryChange"
              /> KB
            </div>
          </div>
        </el-form-item>
      </div>

      <el-form-item label="内存自动覆盖">
        <el-radio
          v-model="overwrite"
          :label="true"
        >启用</el-radio>
        <el-radio
          v-model="overwrite"
          :label="false"
        >禁用</el-radio>
      </el-form-item>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        type="text"
        @click="cancel"
      >取消</el-button>
      <el-button
        :loading="loading"
        type="primary"
        @click="doSubmit"
      >确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit, getDepts, getDiskSize } from '@/api/dept'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  components: { Treeselect },
  props: {
    isAdd: {
      type: Boolean,
      required: true
    },
    sup_this: {
      type: Object,
      default: null
    },
    dicts: {
      type: Array,
      required: true
    },
    data: {
      type: Object,
      required: true
    },
  },
  data () {
    return {
      loading: false, dialog: false, depts: [], canEdit: true,
      form: {
        id: '',
        name: '',
        pid: null,
        enabled: 'true',
        type: true,
        config_json: null,
      },
      zUsedMemory: 0,//子使用内存
      zTotalMemory: 0,//子总内存
      zTotalMemoryGb: 0,//子总内存GB
      zTotalMemoryMb: 0,//子总内存MB
      zTotalMemoryKb: 0,//子总内存KB
      zOldTotalMemory: 0,//子旧总内存
      zTotalMemoryStr: '',
      zFreeMemory: 0,
      zOldFreeMemory: 0,
      zHint: '',//子组织提示
      zPercent: 0,//使用百分比
      distributableMemory: 0,//可分配内存
      pUsedMemory: 0,
      pTotalMemory: 0,
      pOldTotalMemory: 0,
      pFreeMemory: 0,
      pOldFreeMemory: 0,
      pHint: '',//父组织提示
      pPercent: 0,//使用百分比
      overwrite: true,//重写覆盖
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ]
      },
      systemMemory: 0,
      getSystemMemoryFlag: false,
    }
  },
  created () {
    if (!this.getSystemMemoryFlag) {
      this.getSystemMemoryFlag = true//防止多次访问此接口
      getDiskSize().then(res => {
        if (res.code === 200) {
          this.systemMemory = res.data * 1024
        } else {
          this.systemMemory = 10737418240  //查询失败系统最大为10
        }
      })
    }
  },
  methods: {
    checkClick () {
      if (this.sup_this.userLevel === 1) {
        return true
      } else if (this.sup_this.user.orgCode === 'jk-000') {
        if (this.data.code === 'jk' || this.data.code === 'jk-000') {
          return false
        } else {
          return true
        }
      } else if (this.sup_this.userLevel === 2 && (!this.data || this.sup_this.user.orgId !== this.data.id)) {
        return true
      }
      return false
    },
    refreshMemory () {
      if (this.form.id) {
        this.zHint = this.conver(this.zFreeMemory) + '可用，共' + this.conver(this.zTotalMemory)
        this.zPercent = Math.floor(this.zUsedMemory / this.zTotalMemory * 100)
      }
      this.pHint = this.conver(this.pFreeMemory) + '可用，共' + this.conver(this.pTotalMemory)
      this.pPercent = Math.floor(this.pUsedMemory / this.pTotalMemory * 100)
      this.$forceUpdate()
    },
    inputMemoryChange () {
      if (this.zTotalMemoryGb < 0) {
        this.zTotalMemoryGb = 0
      }
      if (this.zTotalMemoryMb < 0) {
        this.zTotalMemoryMb = 0
      }
      if (this.zTotalMemoryKb < 0) {
        this.zTotalMemoryKb = 0
      }
      let val = this.zTotalMemoryGb * (1024 * 1024 * 1024) + this.zTotalMemoryMb * (1024 * 1024) + this.zTotalMemoryKb * 1024
      this.memoryChange(val)
    },
    memoryChange (val) {
      if (val > this.distributableMemory) {
        val = this.distributableMemory
      }
      if (this.zUsedMemory > val) {
        val = this.zUsedMemory
      }

      this.zPercent = Math.floor(this.zUsedMemory / val * 100)
      // this.zTotalMemoryStr = this.conver(this.zTotalMemory)
      this.zTotalMemoryGb = Math.floor(val / (1024 * 1024 * 1024))
      this.zTotalMemoryMb = Math.floor((val % (1024 * 1024 * 1024)) / (1024 * 1024))
      this.zTotalMemoryKb = Math.floor((val % (1024 * 1024)) / (1024))
      this.zTotalMemory = val

      this.pTotalMemory = this.pOldTotalMemory - this.zTotalMemory + this.zOldTotalMemory
      this.pFreeMemory = this.pOldFreeMemory - this.zTotalMemory + this.zOldTotalMemory
      this.zFreeMemory = this.zOldFreeMemory - this.zOldTotalMemory + this.zTotalMemory

      this.refreshMemory()
      this.$forceUpdate()
    },
    deptChange () {
      getDepts({ ids: this.form.pid }).then(res => {
        if (res.code === 200) {
          let pDept = res.data.content[0]
          let c = pDept.config_json
          if (c) {
            this.zTotalMemory = this.zOldTotalMemory
            let pConfig_json = JSON.parse(c)
            this.pUsedMemory = pConfig_json.memoryConfig.usedMemory
            this.pTotalMemory = pConfig_json.memoryConfig.totalMemory
            this.pOldTotalMemory = pConfig_json.memoryConfig.totalMemory
            this.pFreeMemory = pConfig_json.memoryConfig.freeMemory
            this.pOldFreeMemory = pConfig_json.memoryConfig.freeMemory
            let nc = 0
            if (pDept.code === 'jk') {//上层是系统
              nc = this.systemMemory
            } else {
              nc = this.pFreeMemory
            }
            // if (this.pFreeMemory > 10737418240) {//上级组织内存大于10G
            //   nc = 10737418240
            // } else {
            //   nc = this.pFreeMemory
            // }
            if (this.form.id) {//编辑
              this.distributableMemory = this.zTotalMemory + nc
            } else {//新增
              this.distributableMemory = nc
              //默认分配内存  父组织内存大于1G时分配1G，不足时分配一半内存
              if (this.distributableMemory > 1073741824) {
                this.zTotalMemory = 1073741824
              } else {
                this.zTotalMemory = Math.floor(this.distributableMemory / 2)
              }
            }
            this.refreshMemory()
          }
        }
      })
    },
    conver (limit) {

      var size = "";
      if (limit < 0.1 * 1024) { //如果小于0.1KB转化成B  
        size = limit.toFixed(2) + "B";
      } else if (limit < 0.1 * 1024 * 1024) {//如果小于0.1MB转化成KB  
        size = (limit / 1024).toFixed(2) + "KB";
      } else if (limit < 0.1 * 1024 * 1024 * 1024) { //如果小于0.1GB转化成MB  
        size = (limit / (1024 * 1024)).toFixed(2) + "MB";
      } else { //其他转化成GB  
        size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB";
      }

      var sizestr = size + "";
      var len = sizestr.indexOf("\.");
      var dec = sizestr.substr(len + 1, 2);
      if (dec == "00") {//当小数点后为00时 去掉小数部分  
        return sizestr.substring(0, len) + sizestr.substr(len + 3, 2);
      }
      return sizestr;
    },
    cancel () {

      this.resetForm()
    },
    doSubmit () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.form.pid !== undefined) {
            this.loading = true
            if (this.isAdd) {
              this.doAdd()
            } else this.doEdit()
          } else {
            this.$message.warning('上级组织不能为空')
          }
        }
      })
    },
    doAdd () {
      this.form.memory = this.zTotalMemory
      add(this.form).then(res => {
        if (res.code === 200) {
          this.$message.success('添加成功')
          this.$parent.$parent.init()
        } else {
          this.$message.error(res.msg)
        }
        this.resetForm()
        this.loading = false
      })
    },
    doEdit () {

      if (this.form.config_json) {
        let j = JSON.parse(this.form.config_json)
        j.memoryConfig.totalMemory = this.zTotalMemory
        j.memoryConfig.overwrite = this.overwrite
        this.form.config_json = JSON.stringify(j)
      }
      edit(this.form).then(res => {
        if (res.code === 200) {
          this.$message.success('修改成功')
          this.sup_this.init()
        } else {
          this.$message.error(res.msg)
        }
        this.resetForm()
        this.loading = false
      })
    },
    resetForm () {

      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = {
        id: '',
        name: '',
        pid: null,
        enabled: 'true'
      }
    },
    getDepts () {
      getDepts({ enabled: true }).then(res => {
        this.depts = res.data.content
      })
    }
  }
}
</script>

<style scoped>
</style>
