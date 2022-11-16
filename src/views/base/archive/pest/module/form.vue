<template>
  <el-dialog
    :append-to-body="true"
    :visible.sync="dialog"
    :open="openDialog"
    :title="isAdd ? '新增' : '编辑'"
    width="500px"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      size="small"
      label-width="100px"
    >
      <el-form-item label="生命周期">
        <el-select
          v-model="form.agroProductCycle"
          placeholder="请选择"
          :collapse-tags="true"
          style="width:250px"
        >
          <el-option
            v-for="item in agroProductCycleList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="关联病虫害">
        <el-cascader
          v-model="form.bs_pest_idsModel"
          :props="{ multiple: true}"
          :collapse-tags="true"
          :options="options"
          filterable
          style="width:250px"
          @change="handleChange"
        ></el-cascader>
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
import { getPestCascader } from '@/api/bs_pest'
import { addOrEdit } from '@/api/agroProductPest'
import { find as findAgroProductCycle } from '@/api/agroProductCycle'
export default {
  props: {
    isAdd: {
      type: Boolean,
      required: true
    },
    sup_this: {
      type: Object,
      default: null
    }
  },
  mounted () {
    this.refresh();
  },
  data () {
    return {
      loading: false,
      dialog: false,
      options: [],
      agroProductCycleList: [],
      form: {
        agroProductClassification: '',
        agroProductCycle: '',
        bs_pest_ids: [],
        bs_pest_idsModel: []
      },
    }
  },
  methods: {
    showDialog (agroProductClassification) {
      this.form.agroProductClassification = agroProductClassification;
      var params = { page: 0, agroProductClassification: agroProductClassification, size: 1000, sort: 'ord,asc' };
      findAgroProductCycle(params).then(res => {
        this.agroProductCycleList = res.data.content;
      }).then(() => {
        this.dialog = true;
      });

    },
    refresh () {
      return getPestCascader().then(res => {
        if (res.code == 200) {
          this.options = res.data;
          // this.initValue();
        }
      });
    },
    initValue () {
      if (this.form.p_id && this.form.code) {
        getParentLevel(this.form.code).then(res => {
          if (res.code == 200) {
            var initValue = [];
            var data = res.data;

            while (data && data.length > 0 && data[0].value != this.form.id) {
              initValue.push(data[0].value);
              data = data[0].children;
            }
            this.value = initValue;
          }
        });
      }
    },
    cancel () {
      this.resetForm()
    },
    doSubmit () {
      if (!this.form.bs_pest_idsModel) {
        this.$message.error("请选择关联病虫害!");
        return;
      }
      for (var i = 0, len = this.form.bs_pest_idsModel.length; i < len; i++) {
        this.form.bs_pest_ids.push(this.form.bs_pest_idsModel[i][2]);
      }
      if (this.form.bs_pest_ids.length <= 0) {
        this.$message.error("请选择关联病虫害!");
        return;
      }

      if (!this.form.agroProductCycle) {
        this.$message.error("请选择生长周期!");
        return;
      }
      this.loading = true

      addOrEdit(this.form).then(res => {
        this.loading = false
        this.dialog = false;
        if (res.code == 200) {
          this.sup_this.init();
        }
      });
    },
    resetForm () {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = {
        id: '',
        name: '',
        description: '',
        imagePath: ''
      }
    }
  }
}
</script>

<style scoped>
</style>
