<template>
  <el-dialog
    :append-to-body="true"
    :visible.sync="dialog"
    :title="isAdd ? '新增' : '编辑'"
    width="800px"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      size="small"
      label-width="80px"
    >
      <el-row>
        <el-col span="12">
          <el-form-item
            label="猪场"
            prop="pigfarmid"
          >
            <el-select
              v-model="form.pigfarmid"
              placeholder="请选择"
              style="width:300px"
            >
              <el-option
                v-for="item in pigfarmList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item
            label="名称"
            prop="name"
          >
            <el-input
              v-model="form.name"
              style="width:300px"
            />
          </el-form-item>
        </el-col>

        <el-col span="12">
          <el-form-item
            label="IP"
            prop="ip"
          >
            <el-input
              v-model="form.ip"
              style="width:300px"
            />
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item
            label="播放端口"
            prop="port"
          >
            <el-input
              v-model="form.port"
              style="width:300px"
            />
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item
            label="控制端口"
            prop="port"
          >
            <el-input
              v-model="form.gbId"
              style="width:300px"
            />
          </el-form-item>
        </el-col>
        <el-form-item label="设备类型">
          <el-input
            v-model="form.type"
            style="width: 300px;"
          />
        </el-form-item>
        <el-col span="12">
          <el-form-item label="设备编码">
            <el-input
              v-model="form.code"
              style="width:300px"
            />
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="平板端口">
            <el-input
              v-model="form.pbport"
              style="width:300px"
            />
          </el-form-item>
        </el-col>

        <el-col span="12">
          <el-form-item label="排序">
            <el-input
              v-model="form.order"
              type="number"
              style="width:300px"
            />
          </el-form-item>
        </el-col>
        <el-col span="24">
          <el-form-item label="备注">
            <el-input
              v-model="form.info"
              type="textarea"
            />
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item label="状态">
            <el-radio
              v-for="item in radioList"
              :key="item.key"
              v-model="form.status"
              :label="item.key"
            >{{ item.lable }}</el-radio>
          </el-form-item>
        </el-col>

      </el-row>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="cancel">取消</el-button>
      <el-button
        :loading="loading"
        type="primary"
        @click="doSubmit"
      >确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from "@/api/wlwZdszVideo";
// import { findPigFarmAll } from "@/api/pigFarm";

export default {
  props: {
    isAdd: {
      type: Boolean,
      required: true,
    },
    sup_this: {
      type: Object,
      default: null,
    },
  },
  data () {
    return {
      loading: false,
      dialog: false,
      pigfarmList: [],
      radioList: [
        { key: 1, lable: "正常" },
        { key: 0, lable: "暂停" },
      ],
      form: {
        id: "",
        name: "",
        type: "hksp",
        code: "",
        ip: "",
        port: "",
        gbId: "",
        status: 1,
        info: "",
        order: "",
        btjk: "",
        wsjk: "",
        pbspjkUrl: "",
        user: "",
        password: "",
        admintoken: "",
        by1: "",
        by2: "",
        systemuser: "",
        systemusertime: "",
        systemupdateuser: "",
        systemupdateusertime: "",
        pbport: "",
        qjkz: "",
        isqj: "",
      },
      rules: {
        name: [{ required: true, message: "请输入设备名称", trigger: "blur" }],
        ip: [{ required: true, message: "请输入设备IP地址", trigger: "blur" }],
        port: [{ required: true, message: "请输入设备播放端口号", trigger: "blur" },],
        gbId: [{ required: true, message: "请输入设备控制端口号", trigger: "blur" },],
      },
    };
  },
  created () {
    this.getPigFarmList();
  },
  methods: {
    cancel () {
      this.resetForm();
    },

    doSubmit () {
      this.loading = true;
      if (this.isAdd) {
        this.doAdd();
      } else this.doEdit();
    },
    getPigFarmList () {

      findPigFarmAll()
        .then((res) => {
          this.pigfarmList = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    doAdd () {
      add(this.form)
        .then((res) => {
          this.resetForm();
          this.$notify({
            title: "添加成功",
            type: "success",
            duration: 2500,
          });
          this.loading = false;
          this.$parent.$parent.init();
        })
        .catch((err) => {
          this.loading = false;
          console.log(err.response.data.message);
        });
    },
    doEdit () {
      edit(this.form)
        .then((res) => {
          this.resetForm();
          this.$notify({
            title: "修改成功",
            type: "success",
            duration: 2500,
          });
          this.loading = false;
          this.sup_this.init();
        })
        .catch((err) => {
          this.loading = false;
          console.log(err.response.data.message);
        });
    },
    resetForm () {
      this.dialog = false;
      this.$refs["form"].resetFields();
      this.form = {
        id: "",
        name: "",
        type: "hksp",
        code: "",
        ip: "",
        port: "",
        gbId: "",
        info: "",
        pbport: "",
        btjk: "",
        wsjk: "",
        pbspjkUrl: "",
        user: "",
        password: "",
        admintoken: "",
        status: 1,
        order: "",
        by1: "",
        by2: "",
        systemuser: "",
        systemusertime: "",
        systemupdateuser: "",
        systemupdateusertime: "",
        qjkz: "",
        isqj: "",
      };
    },
  },
};
</script>

<style scoped>
</style>
