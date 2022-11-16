<template>
  <div>
    <el-form
      class="demo-form-inline"
      label-width="100px"
    >
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="基地">
            <el-select
              filterable
              v-model="bs_base_id"
              placeholder="请选择"
              @change="baseChange"
              :disabled="edit?true:false"
            >
              <el-option
                v-for="item in baseList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="地块">
            <el-select
              filterable
              v-model="rs_facilities_id"
              placeholder="请选择"
              @change="areaChange"
              :disabled="edit?true:false"
            >
              <el-option
                v-for="item in areaList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="故障设备">
            <el-select
              filterable
              v-model="hd_device_id"
              placeholder="请选择"
              @change="equipChange"
              :disabled="edit?true:false"
            >
              <el-option
                v-for="item in equipList"
                :key="item.id"
                :label="item.name + `(${item.device_id})`"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="故障描述">
            <el-input
              type="textarea"
              :autosize="{ minRows: 5, maxRows: 5}"
              placeholder="请输入内容"
              :readonly="status === 1?true:false"
              v-model="des"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item
            label="照片"
            style="font-size:0"
          >
            <div style="display:flex">
              <el-upload
                :show-file-list="false"
                action="' '"
                list-type="picture-card"
                style="display:inline-block;margin-right:10px"
                :before-upload="beforeUpload"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <div style="flex:1">
                <div
                  v-for="(img, index) in images_path"
                  :key="index"
                  style="display:inline-block;margin-right:10px;position:relative"
                >
                  <img
                    :src="img.src"
                    style="width:60px;height:60px;"
                    @click.stop="imgPreview(img)"
                  >
                  <i
                    class="el-icon-delete del_icon"
                    @click.stop="delIcon(img,index)"
                    v-show="status !== 1"
                  ></i>
                </div>
              </div>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row
        :gutter="10"
        v-show="status === 1"
      >
        <el-col :span="8">
          <el-form-item label="检修结果">
            <el-input
              type="textarea"
              :autosize="{ minRows: 6, maxRows: 6}"
              placeholder="请输入内容"
              readonly
              v-model="result"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="检修人(电话)">
            <el-input
              v-model="check_name_phone"
              readonly
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="检修时间">
            <el-input
              v-model="check_time"
              readonly
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div style="text-align:right">
      <el-button @click="back">取消</el-button>
      <el-button
        type="primary"
        @click="submit"
        v-show="status !== 1"
      >保存</el-button>
    </div>
    <el-dialog
      :visible.sync="imgShow"
      append-to-body
    >
      <img
        width="100%"
        :src="currentImgagePath"
      >
    </el-dialog>
  </div>
</template>
<script>
import { baseListInfo, areaListInfo, add, getDetailAndImage, deleteImage, update } from "@/api/equip_repair"
import { findByBs_base_id } from '@/api/rs_facilities'
import { getById } from "@/api/user"
import { formatDate } from "@/utils/date"
export default {
  data () {
    return {
      id: "",
      bs_base_id: "",
      baseList: [],
      rs_facilities_id: "",
      areaList: [],
      hd_device_id: "",
      equipList: [],
      images: [],
      images_path: [],
      des: "",
      imgShow: false,
      currentImgagePath: "",
      check_name: "",
      check_phone: "",
      check_time: "",
      check_name_phone: "",
      status: 0,
      result: "",
      edit: false,
      baseUrl: process.env.IMG_URL
    }
  },
  methods: {
    back () {
      this.$parent.$parent.dialogVisible = false
    },
    // 保存
    submit () {
      if (!this.hd_device_id) {
        this.$message({
          message: "请选择故障设备！",
          type: "warning"
        })
        return
      }
      if (!this.des) {
        this.$message({
          message: "故障描述不能为空！",
          type: "warning"
        })
        return
      }
      const postData = new FormData();
      postData.append("hd_device_id", this.hd_device_id);
      postData.append("des", this.des);
      for (let i = 0; i < this.images.length; i++) {
        postData.append("images", this.images[i]);
      }
      if (this.id === "") {
        add(postData).then(res => {
          if (res.code === 200) {
            this.$message({
              message: res.msg,
              type: "warning"
            })
            this.back();
            this.$parent.$parent.getRepairListInfo();
          }
        });
      } else {
        postData.append("id", this.id)
        update(postData).then(res => {
          if (res.code === 200) {
            this.$message({
              message: res.msg,
              type: "warning"
            })
            this.back();
            this.$parent.$parent.$parent.getRepairListInfo();
          }
        });
      }
    },
    imgPreview (img) {
      this.imgShow = true;
      this.currentImgagePath = img.src
    },
    delIcon (img, index) {
      if (img.id) {
        const data = new FormData()
        data.append("hd_fault_repair_image_id", img.id)
        deleteImage(data).then(res => {
          if (res.code === 200) {
            this.images.splice(index, 1)
            this.images_path.splice(index, 1)
          }
        })
      } else {
        this.images.splice(index, 1)
        this.images_path.splice(index, 1)
      }

    },
    beforeUpload (file) {
      this.images.push(file)
      this.images_path.push({ src: URL.createObjectURL(file) })
      return false
    },
    equipChange (e) { },
    areaChange (e) {
      this.hd_device_id = "";
      this.equipList = [];
      this.getDeviceList()
    },
    baseChange (e) {
      this.rs_facilities_id = "";
      this.areaList = [];
      this.hd_device_id = "";
      this.equipList = [];
      this.getFacilities()
    },
    // 基地列表
    getBaseList () {
      baseListInfo().then(res => {
        if (res.code === 200) {
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].code === "AAAAAA") {
              res.data.splice(i, 1);
            }
          }
          this.baseList = res.data;
        }
      });
    },
    // 获取当前基地地块
    getFacilities () {
      const data = {
        bs_base_id: this.bs_base_id
      };
      findByBs_base_id(data).then(res => {
        if (res.code === 200) {
          this.areaList = res.data;
        }
      });
    },
    // 根据地块id获取设备列表
    getDeviceList () {
      const data = {
        rs_facilities_id: this.rs_facilities_id
      };
      areaListInfo(data).then(res => {
        if (res.code === 200) {
          this.equipList = res.data;
          console.log(this.equipList);
        }
      });
    },
    // 根据用户id查询用户
    getUserName (id) {
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
    // 获取故障详情
    getDetail (id) {
      const data = {
        id: id
      }
      getDetailAndImage(data).then(res => {
        if (res.code === 200) {
          this.id = res.data.id
          this.bs_base_id = res.data.bs_base_id
          this.rs_facilities_id = res.data.rs_facilities_id
          this.hd_device_id = res.data.hd_device_id
          if (res.data.images && res.data.images.length > 0) {
            for (let i = 0; i < res.data.images.length; i++) {
              res.data.images[i].src = this.baseUrl + res.data.images[i].image_path
            }
            this.images = res.data.images
            this.images_path = res.data.images
          }
          this.des = res.data.des
          if (res.data.check_id) {
            this.check_phone = res.data.check_phone
            this.check_time = formatDate(new Date(res.data.check_time), "yyyy-MM-dd")
            this.getUserName(res.data.check_id).then(res => {
              this.check_name = res
              this.check_name_phone = `${this.check_name}(${this.check_phone})`
            })
          }
          this.status = res.data.status
          this.result = res.data.result
          this.edit = true
          this.getBaseList()
          this.getFacilities()
          this.getDeviceList()
        }
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
>>>.el-upload--picture-card
  width 60px
  height 60px
  line-height 66px

.del_icon
  position absolute
  top -5px
  right 0
  background rgba(0, 0, 0, .5)
  color #fff
  padding 2px
  border-radius 50%
  cursor pointer
</style>