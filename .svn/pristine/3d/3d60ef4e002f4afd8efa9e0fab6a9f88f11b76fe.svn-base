<template>
  <div>
    <el-dialog
      :append-to-body="true"
      :visible.sync="dialog"
      :title="isAdd ? '新增' : '编辑'"
      width="500px"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        size="small"
        label-width="80px"
      >
        <el-form-item label="所属全景项目">
          <el-select
            v-model="form.rsPanorId"
            name='rsPanorId'
            placeholder="请选择活动区域"
          >
            <el-option
              v-for='(it,i) in panorList'
              :key='i'
              :label="it.name"
              :value="it.id"
            ></el-option>
          </el-select>
          <el-button @click.prevent="createQJ"> 创建全景 </el-button>
        </el-form-item>
        <el-form-item label="场景名称">
          <el-input
            v-model="form.name"
            name='name'
            style="width: 370px;"
          />
        </el-form-item>
        <el-form-item label="场景图片路径">
          <input
            type='file'
            ref='file'
          />
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
    <!-- 创建全景 -->
    <el-dialog
      :append-to-body="true"
      :visible.sync="dialogQJ"
      :title="isAdd ? '新增' : '编辑'"
      width="500px"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        size="small"
        label-width="80px"
      >
        <el-form-item label="名称">
          <el-input
            v-model="panor.name"
            style="width: 370px;"
          />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          :loading="loading"
          type="primary"
          @click="saveQJ"
        >确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { add, edit } from '@/api/rsPanorScene'
// import { get } from '@/api/rsPanor'
import * as rsPanor from '@/api/rsPanor'
export default {
  props: {
    isAdd: {
      type: Boolean,
      required: true
    },
    sup_this: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      loading: false, dialog: false,
      form: {
        id: '',
        rsPanorId: this.sup_this.panor_id || "",
        name: '',
        imagePath: '',
      },
      dialogQJ: false,
      panor: {
        name: "",
      },
      rules: {
      },
      panorList: [],
    }
  },
  mounted () {
    this.getPanorList();
  },
  methods: {

    updateImage () {

    },

    // 获取全景列表
    getPanorList () {
      get().then((e) => {
        this.panorList = e.data.content;
      })
    },
    show (json, isAdd) {
      for (var i in json) {
        typeof this.form[i] !== 'undefined' && (this.form[i] = json[i] || null);
      }
      this.dialog = true;
      typeof isAdd === 'boolean' && (this.isAdd = isAdd);
    },
    cancel () {
      this.resetForm()
    },
    doSubmit () {
      this.loading = true;
      if (this.isAdd) {
        this.doAdd()
      } else this.doEdit()
    },
    doAdd () {
      add({
        rsPanorId: this.form.rsPanorId || this.sup_this.panor_id,
        name: this.form.name,
        image: this.$refs.file.files[0],

      }).then(res => {

        this.resetForm()
        this.$notify({
          title: '添加成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.sup_this.init();
      }).catch(err => {

        this.loading = false
        console.log(err.response.data.message)
      })
    },
    doEdit () {
      edit(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '修改成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.sup_this.init()
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    },
    resetForm () {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = {
        id: '',
        rsPanorId: '',
        name: '',
        imagePath: '',
        ord: '',
        sta: '',
        createUser: '',
        createDate: ''
      }
    },
    // 创建全景
    createQJ () {
      this.dialogQJ = true;
    },

    saveQJ () {
      rsPanor.add({
        name: this.panor.name,
        bs_base_id: this.$store.state.baseinfo.cur_base_id,
      }).then(res => {
        this.dialogQJ = false
        this.panor.name = "新建全景";
      }).catch(err => {
        this.panor.name = "新建全景";
        this.dialogQJ = false
      })
    }
  }
}
</script>

<style scoped>
</style>
