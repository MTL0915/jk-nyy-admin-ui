<template>
  <div style="background: #ffffff;">
    <div style="display:flex;">
      <div class="width1 title"><b>消息类型</b></div>
      <div class="width2 title"><b>联系方式</b></div>
      <div class="width3 title"><b>接收人</b></div>
      <div class="width4 title"><b>状态</b></div>
      <div class="width5 title"><b>操作</b></div>
    </div>
    <div
      v-for="(item,index) in details"
      :key="index"
      style="display:flex;margin-top:5px;"
    >
      <div class="width1">{{item.name}}
        <el-tooltip
          class="item"
          :content="item.info"
          placement="right"
          effect="light"
          v-if="item.info"
        >
          <i
            style="color:#168FFF;"
            class="el-icon-question"
          />
        </el-tooltip>
      </div>
      <div class="width2">
        <div v-if="item.noteSta === 1 || item.phoneSta === 1 || item.officialSta === 1">
          <el-tag v-if="item.noteSta === 1">短信</el-tag>
          <el-tag v-if="item.phoneSta === 1">电话</el-tag>
          <el-tag v-if="item.officialSta === 1">公众号</el-tag>
        </div>
        <div v-else>
          \
        </div>
      </div>
      <div class="width3">
        <div v-if="item.receiveUser">
          <div
            v-for="(item3,index3) in item.receiveUser.split('|')"
            :key="index3"
          >
            <el-tag>
              {{item3}}
            </el-tag>
          </div>
        </div>
        <div v-else>
          \
        </div>
      </div>
      <div class="width4">
        <el-tag
          v-if="item.sta === 1"
          type="success"
        >开启</el-tag>
        <el-tag
          v-else
          type="danger"
        >关闭</el-tag>
      </div>
      <div class="width5">
        <el-button
          type="text"
          size="mini"
          @click="changeSetting(item)"
        >配置</el-button>
      </div>
    </div>

    <el-dialog
      v-if="changeSettingDialogVisible"
      :visible.sync="changeSettingDialogVisible"
      append-to-body
      title="更改配置"
      width="500px"
    >
      <div style="display:flex;margin:15px;">
        <div class="center">{{sysWarnConfigDetails.prefix}}</div>
        <div class="center">
          <el-input
            v-model="sysWarnConfigDetails.value"
            size="mini"
            style="width:100px"
          />
        </div>
        <div class="center">{{sysWarnConfigDetails.suffix}}</div>
        <div class="center">
          <el-switch
            v-model="sysWarnConfigDetails.sta"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
            style="margin-left: 15px;"
          >
          </el-switch>
        </div>
      </div>
      <div style="display:flex;margin:15px;">
        <div>
          通知方式：
        </div>
        <div>
          <el-checkbox
            v-model="sysWarnConfigDetails.noteSta"
            :true-label="1"
            :false-label="0"
          >短信</el-checkbox>
          <el-checkbox
            v-model="sysWarnConfigDetails.phoneSta"
            :true-label="1"
            :false-label="0"
          >电话</el-checkbox>
          <el-checkbox
            v-model="sysWarnConfigDetails.officialSta"
            :true-label="1"
            :false-label="0"
          >公众号</el-checkbox>
        </div>
      </div>
      <div style="text-align:right;">
        <el-button
          type="primary"
          size="mini"
          @click="saveSetting()"
        >保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { listSimSysWarnConfigDetails, updateSimSysWarnConfigDetails } from '@/api/hd_device_sim'

export default {
  data () {
    return {
      details: [],
      changeSettingDialogVisible: false,//更改配置弹窗
      sysWarnConfigDetails: null,//预警配置详情
    }
  },
  props: {
    hd_device_sim_id: {
      type: String,
      default: null
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    //初始化
    init () {
      this.listSimSysWarnConfigDetails()
    },
    //获取预警配置详情列表
    listSimSysWarnConfigDetails () {
      listSimSysWarnConfigDetails({
        id: this.hd_device_sim_id
      }).then(res => {
        if (res.code === 200) {
          this.details = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    //保存配置
    saveSetting () {
      this.sysWarnConfigDetails.hd_device_sim_id = this.hd_device_sim_id
      console.log(this.hd_device_sim_id)
      updateSimSysWarnConfigDetails(
        this.sysWarnConfigDetails
      ).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg)
          this.updateList(res.data)
          this.changeSettingDialogVisible = false
        } else {
          this.$message.error(res.msg)
          this.changeSettingDialogVisible = false
        }
      })
    },
    //点击更改设置
    changeSetting (item) {
      this.sysWarnConfigDetails = JSON.parse(JSON.stringify(item))
      this.changeSettingDialogVisible = true
    },
    //更改成功刷新列表
    updateList (data) {
      for (let j = 0; j < this.details.length; j++) {
        if (this.details[j].code === data.code) {
          this.details[j] = data
        }
      }
      this.$forceUpdate()
    },
  }
}
</script>
<style scoped>
.width1 {
  width: 25%;
  align-items: center;
  display: flex;
  justify-content: center;
}
.width2 {
  width: 25%;
  align-items: center;
  display: flex;
  justify-content: center;
}
.width3 {
  width: 25%;
  align-items: center;
  display: flex;
  justify-content: center;
}
.width4 {
  width: 25%;
  align-items: center;
  display: flex;
  justify-content: center;
}
.width5 {
  width: 25%;
  align-items: center;
  display: flex;
  justify-content: center;
}
.title {
  font-size: 22px;
  padding: 15px;
  background: #fafafa;
}

.title2 {
  font-size: 18px;
  padding: 15px;
}

.line {
  width: 100%;
  height: 1px;
  background: rgb(203 207 211);
}

.center {
  align-items: center;
  display: flex;
  justify-content: center;
}
</style>