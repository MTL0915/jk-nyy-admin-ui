<template>
  <div>
    <el-form class="demo-form-inline" label-width="120px">
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="基地">
            <el-input v-model="fromData.bs_base_name" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="地块">
            <el-input v-model="fromData.rs_facilities_name" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="登记人(电话)">
            <el-input v-model="fromData.register_name_phone" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="设备名称">
            <el-input v-model="fromData.name" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="设备序列号">
            <el-input v-model="fromData.device_id" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="登记时间">
            <el-input v-model="fromData.register_time" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="描述">
            <el-input
              type="textarea"
              :autosize="{ minRows: 6, maxRows: 6}"
              placeholder="请输入内容"
              readonly
              v-model="fromData.des">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="检修结果">
            <el-input
              type="textarea"
              :autosize="{ minRows: 6, maxRows: 6}"
              placeholder="请输入内容"
              :readonly="fromData.status === 1?true:fase"
              v-model="fromData.result">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="图片">
            <el-image 
              v-for="(img, index) in fromData.images"
              :key="index"
              style="width: 50px; height: 50px;margin:5px"
              :src="img.url"
              :preview-src-list="[img.url]">
            </el-image>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10" v-show="fromData.status === 1">
        <el-col :span="8">
          <el-form-item label="检修人(电话)">
            <el-input v-model="fromData.check_name_phone" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="检修时间">
            <el-input v-model="fromData.check_time" readonly></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div style="text-align:right" v-show="fromData.status === 0">
      <el-button @click="$parent.$parent.dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="save">保存</el-button>
    </div>
  </div>
</template>
<script>
import { getDetailAndImage, handlerInfo } from "@/api/equip_repair"
import { getById } from "@/api/user"
import { formatDate } from "@/utils/date"
export default {
  data() {
    return {
      fromData: {
        bs_base_name: "",
        rs_facilities_name: "",
        register_name_phone: "",
        name: "",
        id: "",
        device_id: "",
        register_time: "",
        des: "",
        status: "",
        result: "",
        images: [],
        check_name_phone: "",
        check_time: ""
      },
      baseUrl: process.env.IMG_URL
    }
  },
  methods: {
    // 根据用户id查询用户
    getUserName(id) {
      return new Promise(resolve => {
        const data = {
          id: id
        };
        getById(data).then(res => {
          if (res.code === 200) {
            resolve(res.data.name);
          }
        });
      });
    },
    // 保存检修结果
    save() {
      if (!this.fromData.result) {
        this.$message({
          message: "检修结果不能为空！",
          type: "warning"
        })
        return;
      }
      const data = {
        id: this.fromData.id,
        result: this.fromData.result
      }
      handlerInfo(data).then(res => {
        if (res.code === 200) {
          this.$message({
            message: res.msg,
            type: "success"
          })
          this.$parent.$parent.dialogVisible = false
          this.$parent.$parent.$parent.getRepairListInfo()
        }
      })
    },
    // 获取检修详情
    getDetail(id) {
      const data = {
        id: id
      }
      getDetailAndImage(data).then(res => {
        if (res.code === 200) {
          this.fromData.bs_base_name = res.data.bs_base_name;
          this.fromData.name = res.data.name;
          this.fromData.rs_facilities_name = res.data.rs_facilities_name
          this.getUserName(res.data.register_id).then(result => {
            this.fromData.register_name_phone = result + `(${res.data.register_phone})`
          })
          this.fromData.device_id = res.data.device_id
          this.fromData.register_time = formatDate(new Date(res.data.register_time), "yyyy-MM-dd")
          this.fromData.des = res.data.des
          this.fromData.status = res.data.status
          if (res.data.images.length > 0) {
            for (let i = 0; i < res.data.images.length; i++) {
              res.data.images[i].url = this.baseUrl +　res.data.images[i].image_path
            }
          }
          this.fromData.id = res.data.id
          this.fromData.images = res.data.images
          this.fromData.result = res.data.result
          if (res.data.check_id) {
            this.getUserName(res.data.check_id).then(result => {
              this.fromData.check_name_phone = result + `(${res.data.check_phone})`
            })
          }
          this.fromData.check_time = formatDate(new Date(res.data.check_time), "yyyy-MM-dd")
        }
      })
    }
  }
}
</script>