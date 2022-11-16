<template>
  <el-dialog
    :visible.sync="dialogVisible"
    title="设备详情"
    append-to-body
    fullscreen
  >
    <!-- <div class="container">
      <div
        style="height:300px"
        class="deviceTypeBoxModel xs_2 ms_3 mx_2"
      ></div>
      <div
        style="height:400px"
        class="deviceTypeBoxModel xs_10 ms_9 mx_10"
      ></div>
      <div
        style="height:500px"
        class="deviceTypeBoxModel xs_2 ms_3 mx_2"
      ></div>
      <div
        style="height:400px"
        class="deviceTypeBoxModel xs_10 ms_9 mx_10"
      ></div>
    </div> -->
    <div style="display:flex;">
      <div style="width:15%;">
        <div
          class="model"
          :style="'height:'+(dialogHeight*0.5)+'px;'"
        >
          <!-- 设备图片 -->
          <img
            style="width:100%;padding:15px;"
            :src="form.http_image_path"
          />
          <!-- 基础信息 -->
          <div>
            <span style="font-size:25px;margin-left:15px;"><b>{{form.name}}</b></span>
            <div style="color:#09C13E;margin-top:7px;margin-right:15px;float:right;">
              ● 　正常
            </div>
            <div style="clear:both;" />
          </div>
          <div style="margin-top:5px;">
            <span style="margin-left:15px;">({{form.device_id}})</span>
            <div style="    display: flex;float: right;margin-right:15px;">
              <div style="border-radius: 20px;border: 3px solid rgb(90, 168, 168);width: 35px;height: 16px;margin-right:5px;">
                <div style="background: #00ffff;width: 50%;height: 100%;" />
              </div>
              <div style="float:right;">50%</div>
            </div>
            <div style="clear:both;" />
          </div>
          <div style="margin-top:15px;margin-left:15px;">
            <span><i class="el-icon-location" />{{'  '+form.area_name}}</span>
          </div>
          <div style="margin-top:5px;margin-left:15px;">
            <span><i class="el-icon-price-tag" />{{'  '+form.hd_device_type_name}}</span>
          </div>
          <div style="margin-top:5px;margin-left:15px;">
            <span><i class="el-icon-s-grid" />{{'  '+form.rs_facilities_name}}</span>
          </div>
          <div style="text-align: center;margin-top: 15px;">
            <el-button
              size="small"
              type="primary"
            ><i class="el-icon-edit-outline" />编辑</el-button>
          </div>
        </div>

        <div
          class="model"
          :style="'height:'+(dialogHeight*0.5)+'px;'"
        >

        </div>
      </div>
      <div style="width:calc(85% - 20px);margin-left: 10px;">
        <div
          :style="'height:'+(dialogHeight*0.6)+'px;'"
          class="model"
        />
        <div
          :style="'height:'+(dialogHeight*0.4)+'px;'"
          class="model"
        />
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { getDetailById } from '@/api/equip'

export default {
  components: {

  },
  props: {

  },
  data () {
    return {
      dialogHeight: 900,
      dialogVisible: false,
      form: {

      }
    }
  },
  created () {
    this.getDetailById('ff8080817209852b017217ba3c6501bf')
  },
  methods: {
    //根据设备ID获取详情
    getDetailById (hd_device_id) {
      getDetailById({
        hd_device_id: hd_device_id
      }).then(res => {
        if (res.code === 200) {
          res.data.http_image_path = process.env.IMG_URL + res.data.image_path
          this.form = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>
<style>
.container {
  overflow: hidden;
  background: #ffffff;
}

@media screen and (max-width: 1099px) {
  .container .mx_0 {
    width: calc(4.166% - 16px);
    margin: 8px;
  }
  .container .mx_1 {
    width: calc(8.333% - 16px);
    margin: 8px;
  }
  .container .mx_2 {
    width: calc(16.666% - 16px);
    margin: 8px;
  }
  .container .mx_3 {
    width: calc(25% - 16px);
    margin: 8px;
  }
  .container .mx_4 {
    width: calc(33.333% - 16px);
    margin: 8px;
  }
  .container .mx_5 {
    width: calc(41.666% - 16px);
    margin: 8px;
  }
  .container .mx_6 {
    width: calc(50% - 16px);
    margin: 8px;
  }
  .container .mx_7 {
    width: calc(58.333% - 16px);
    margin: 8px;
  }
  .container .mx_8 {
    width: calc(66.666% - 16px);
    margin: 8px;
  }
  .container .mx_9 {
    width: calc(75% - 16px);
    margin: 8px;
  }
  .container .mx_10 {
    width: calc(83.333% - 16px);
    margin: 8px;
  }
  .container .mx_11 {
    width: calc(91.666% - 16px);
    margin: 8px;
  }
  .container .mx_12 {
    width: calc(100% - 16px);
    margin: 8px;
  }
}

@media (min-width: 1100px) and (max-width: 1600px) {
  .container .ms_0 {
    width: calc(4.166% - 16px);
    margin: 8px;
  }
  .container .ms_1 {
    width: calc(8.333% - 16px);
    margin: 8px;
  }
  .container .ms_2 {
    width: calc(16.666% - 16px);
    margin: 8px;
  }
  .container .ms_3 {
    width: calc(25% - 16px);
    margin: 8px;
  }
  .container .ms_4 {
    width: calc(33.333% - 16px);
    margin: 8px;
  }
  .container .ms_5 {
    width: calc(41.666% - 16px);
    margin: 8px;
  }
  .container .ms_6 {
    width: calc(50% - 16px);
    margin: 8px;
  }
  .container .ms_7 {
    width: calc(58.333% - 16px);
    margin: 8px;
  }
  .container .ms_8 {
    width: calc(66.666% - 16px);
    margin: 8px;
  }
  .container .ms_9 {
    width: calc(75% - 16px);
    margin: 8px;
  }
  .container .ms_10 {
    width: calc(83.333% - 16px);
    margin: 8px;
  }
  .container .ms_11 {
    width: calc(91.666% - 16px);
    margin: 8px;
  }
  .container .ms_12 {
    width: calc(100% - 16px);
    margin: 8px;
  }
}

@media screen and (min-width: 1600px) {
  .container .xs_0 {
    width: calc(4.166% - 16px);
    margin: 8px;
  }
  .container .xs_1 {
    width: calc(8.333% - 16px);
    margin: 8px;
  }
  .container .xs_2 {
    width: calc(16.666% - 16px);
    margin: 8px;
  }
  .container .xs_3 {
    width: calc(25% - 16px);
    margin: 8px;
  }
  .container .xs_4 {
    width: calc(33.333% - 16px);
    margin: 8px;
  }
  .container .xs_5 {
    width: calc(41.666% - 16px);
    margin: 8px;
  }
  .container .xs_6 {
    width: calc(50% - 16px);
    margin: 8px;
  }
  .container .xs_7 {
    width: calc(58.333% - 16px);
    margin: 8px;
  }
  .container .xs_8 {
    width: calc(66.666% - 16px);
    margin: 8px;
  }
  .container .xs_9 {
    width: calc(75% - 16px);
    margin: 8px;
  }
  .container .xs_10 {
    width: calc(83.333% - 16px);
    margin: 8px;
  }
  .container .xs_11 {
    width: calc(91.666% - 16px);
    margin: 8px;
  }
  .container .xs_12 {
    width: calc(100% - 16px);
    margin: 8px;
  }
}

</style>
<style lang="stylus" scoped>
.history_dialog_header1 >>> .el-dialog__header
  padding-top 10px

.history_dialog_header1 >>> .el-dialog__headerbtn
  top 13px

.history_dialog_header1 >>> .el-dialog__body
  padding 10px 20px

.history_dialog_header1 >>> .el-button
  padding 10px 25px

.history_dialog_header1 >>> .button-is-selected
  background #1890ff
  border-color #1890ff
  color #FFFFFF

.history_dialog_header1 >>> .button-is-not-selected
  color #1890ff
  background #e8f4ff
  border-color #a3d3ff
</style>