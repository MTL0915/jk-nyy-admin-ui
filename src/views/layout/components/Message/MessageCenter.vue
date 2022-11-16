<template>
  <div class="mesg-ct">
    <el-badge
      :hidden="messageBadgeNum<1"
      :value="messageBadgeNum"
      :max="99"
      class="item"
      style="cursor:pointer"
      @click.native="openRightDialog"
    >
      消息
    </el-badge>

    <el-dialog
      v-loading="loading"
      :center="true"
      :top="'10vh'"
      :append-to-body="true"
      :visible.sync="dialog"
      :width="'70%'"
    >
      <span slot="title"> 消息中心</span>
      <div style="height:500px;">
        <div style="position: absolute;right: 50px;z-index: 20;">
          <el-button
            size="mini"
            v-show="messageBadgeNum > 0 ? true : false"
            plain
            @click="markAll"
          >全部标为已读</el-button>

          <el-select
            v-model="stat"
            placeholder="请选择"
            size="mini"
            style="width:100px"
            @change="statChange"
          >
            <el-option
              v-for="item in statOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>

        <el-tabs
          :stretch="false"
          @tab-click="typeChange"
        >
          <!-- <el-tab-pane label="全部" /> -->
          <el-tab-pane
            v-for="type in types"
            :label="type.name"
            :tcode="type.code"
            :key="type.id"
          />

          <MessageItem
            ref="mitem"
            :spuer_="this"
            :data="data.content"
            @conditionChange="conditionChange"
          />
        </el-tabs>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-pagination
          :total="pageParam.total"
          background
          layout="total, sizes,prev, pager, next"
          @size-change="sizeChange"
          @current-change="pageChange"
        />
      </span>
    </el-dialog>

    <div class="container-push" />

    <!-- 右侧消息栏 -->
    <el-drawer
      :visible.sync="rightDrawerShow"
      :modal="false"
      :modal-append-to-body="false"
      title="未读消息"
      size="320px"
      direction="rtl"
    >
      <div class="inmessage"><a @click="openMessageCenter">进入消息中心</a></div>

      <div class="demo-drawer__content">

        <el-collapse>

          <div
            v-for="msg in rightContent"
            :id="'item-block'+msg.id"
            :key="msg.id"
            class="item-block"
            @mouseover="showReadBtn($event,true)"
            @mouseleave="showReadBtn($event,false)"
          >
            <div class="left type">[ {{ msg.title }} ]</div>
            <div class="right date">{{ msg.createDate }}</div>
            <div class="right btn"><button @click="markReadedOut(msg)">设为已读</button></div>
            <div
              v-if="msg.userMessageTypeCode==='approval_invite' || msg.userMessageTypeCode==='approval_invite'"
              class="content"
            >
              {{ msg.content }}
              <p style="padding-top:5px"><a
                  href="#"
                  style="color:green;font-size:13px"
                  @click="passApply(msg)"
                >√通过</a>&nbsp;&nbsp;&nbsp;&nbsp;
                <a
                  href="#"
                  style="color:red;font-size:13px"
                  @click="rejectApply(msg)"
                >×拒绝</a></p>
            </div>
            <div
              v-else
              class="content"
              @click="skip(msg)"
            >
              {{ msg.content }}

            </div>

          </div>
        </el-collapse>

      </div>
    </el-drawer>
    <EquipRolePermission ref="equipRP" />
    <CameraPhotoDetails ref="CameraPhotoDetails" />
  </div>
</template>

<script>
import MessageItem from './MessageItem'
import { formatDate } from '@/utils/date'
import { getMatedata, getMessage, markReaded, markAll } from '@/api/userMessage'
import { disposeInvite } from '@/api/baseInfo'
import EquipRolePermission from '../../../base/equip/module/RolePermission'
import CameraPhotoDetails from '@/views/base/video/module/CameraPhotoDetails'

export default {
  components: { MessageItem, EquipRolePermission, CameraPhotoDetails },
  props: {
  },
  lastMessageNotify: [],
  data () {
    return {
      statOptions: [{
        value: -1,
        label: '全部'
      }, {
        value: 1,
        label: '已读'
      }, {
        value: 0,
        label: '未读'
      }
      ],
      stat: -1,
      loading: false,
      dialog: false,
      messageBadgeNum: 0,
      types: [],
      rightDrawerShow: false,
      sign_btn: false,
      dataIndex: -1,
      curMsg: {},
      data: { 'content': [] },
      rightContent: [],
      pageParam: {
        page: 0,
        size: 10,
        total: 0,
        likeCode: null,
        sort: 'id,desc'
      }
    }
  },
  computed: {
    unreadMesgGroupByType () {
      const ret = {}
      const data = this.data.content
      for (let index = 0; index < data.length; index++) {
        const element = data[index]
        if (element.stat == 0) {
          const tcode = element.userMessageTypeCode
          if (!ret[tcode]) {
            ret[tcode] = []
          }
          ret[tcode].push(element)
        }
      }
      return ret
    }
  },
  created () {
    getMatedata().then(res => {
      this.$data.types = res.data.types
      const allUnread = res.data.allUnread
      this.$data.messageBadgeNum = allUnread
      if (allUnread > 0) {
        //this.newMessageNotify('消息中心', '<a >你有' + allUnread + '条尚未处理的消息[点击打开]</a>')
      }
    })
    this.initWebSocket()
  },
  methods: {
    skip (msg) {
      let type = msg.userMessageTypeCode
      if (msg.data_json) {
        let data_json = JSON.parse(msg.data_json)
        //打开该照片放大页面
        if (type === 'warn_humanoid_recognition') {
          this.$refs.CameraPhotoDetails.getData(data_json.hd_device_camera_upload_id)
        }
        //跳转到设备详情页面
        else if (type === 'warn_sensor_fault' || type === 'warn_sensor_exception' || type === 'warn_device_fault') {
          // this.$router.push({ path: '/deviceInfo', query: { id: data_json.hd_device_id, breadcrumb: 'hide' } })
        }
      }

    },
    initWebSocket () {
      var self = this
      var it = setTimeout(function () {
        const WS = self.$ws
        if (WS) {
          WS.addListener(self.wewWebsocketMessage, 210)
          clearTimeout(it)
          it = null
          console.log('webcket 添加消息监听成功')
        } else {
          console.log('webcket 添加消息监听失败')
        }
      }, 5000)
    },
    statChange () {
      this.requestData();
    },
    requestData (spectialParam, finish) {
      this.loading = true
      if (!this.pageParam.likeCode) {
        this.pageParam.likeCode = this.types[0].code
      }
      const params = JSON.parse(JSON.stringify(this.pageParam))

      if (this.$refs.mitem) {
        const addParam = this.$refs.mitem.getAddParam()
        params[addParam.name] = addParam.value
      }

      if (spectialParam && spectialParam.stat != undefined) {
        params.stat = spectialParam.stat;
      }
      if ((this.stat == 1 || this.stat == 0) && (params == undefined || params.stat == undefined)) {
        params.stat = this.stat
      }

      getMessage(params).then(res => {
        const data = res.data
        data.content.forEach(element => {
          element.createDate = formatDate(new Date(element.createDate), 'yyyy-MM-dd hh:mm')
        })
        this.$data.data = res.data
        this.loading = false

        this.pageParam.total = data.totalElements
        finish && finish()
      })
    },
    conditionChange () {
      this.pageParam.page = 0
      this.requestData()
    },
    pageChange (e) {
      this.pageParam.page = e - 1
      this.requestData()
    },
    sizeChange (e) {
      this.pageParam.page = 0
      this.pageParam.size = e
      this.requestData()
    },
    typeChange (comp) {
      this.pageParam.likeCode = comp.$attrs.tcode
      this.pageParam.page = 0

      // 清除查询附加参数
      this.$refs.mitem.claenAddParam()

      this.requestData()
    },
    openRightDialog (spect) {
      this.rightDrawerShow = true
      var params = {}
      params.stat = 0;
      params.isNotUserMessageTypeCode = 'device';
      getMessage(params).then(res => {
        const data = res.data
        data.content.forEach(element => {
          element.createDate = formatDate(new Date(element.createDate), 'yyyy-MM-dd hh:mm')
        })
        this.rightContent = data.content
      })
    },
    openMessageCenter () {
      var self = this
      // 隐藏右侧未读栏
      this.rightDrawerShow = false

      // 打开消息栏
      self.$data.dialog = true

      this.requestData()
    },
    wewWebsocketMessage (message) {
      var self = this
      if (!message) {
        return
      }
      var result = message.result;
      if (result == null) {
        result = message.content;
      }
      this.$data.messageBadgeNum += 1
      self.newMessageNotify(message.title, result)
    },
    newMessageNotify (title, text, time) {
      var self = this;
      (!time) && (time = 2500)
      this.$options.lastMessageNotify.push(
        this.$notify({          title: title, message: text,
          dangerouslyUseHTMLString: true,
          duration: time,
          onClick: function () {
            self.$options.lastMessageNotify.forEach(element => {
              element.close()
            })
            self.$options.lastMessageNotify = []
            self.openRightDialog()
          }
        })
      )
    },
    markAll () {
      var cur = this.$data.data.content
      markAll().then(res => {
        cur.forEach(element => {
          element.stat = 1
        })
      })
      this.$data.messageBadgeNum = 0
    },
    markReadedOut (msg) {
      var self = this;
      this.markReaded(msg, function () {
        self.removeItemBlock(msg.id);
      })
    },
    // 移除未读项
    removeItemBlock (msg_id) {
      $('#item-block' + msg_id).animate({ right: '-350px' }, 600, function () {
        $(this).remove()
      })
    },
    // 标记为已读
    markReaded (msg, callback) {
      if (msg == null) {
        msg = this.curMsg
      }
      markReaded(msg.id).then((res) => {
        this.$data.messageBadgeNum -= 1
        msg.stat == 1
        callback && callback()
      })
    },
    showReadBtn (obj, flag) {
      if (flag) {
        $(obj.target).find('.date').hide()
        $(obj.target).find('.btn').show()
      } else {
        $(obj.target).find('.date').show()
        $(obj.target).find('.btn').hide()
      }
    },

    // 管理员处理 用户申请加入基地
    processApply (msg, isPass) {
      if (msg.data_json == null || msg.data_json === '') {
        this.$message.error('未知异常!')
        return
      }
      this.curMsg = msg
      var bs_base_apply_sta = isPass ? 1 : 2
      var data_json = $.parseJSON(msg.data_json)
      this.$refs.equipRP.show(data_json.bs_base_apply_id, data_json.bs_base_id, bs_base_apply_sta, msg.id)
    },

    // 同意邀请
    passInvite (msg) {
      if (msg.data_json == null || msg.data_json === '') {
        this.$message.error('未知异常!')
        return
      }
      const data_json = JSON.parse(msg.data_json)
      var bs_base_invite_sta = 1
      disposeInvite({ id: data_json.bs_base_invite_id, sta: bs_base_invite_sta, msg_id: msg.id }).then(res => {
        if (res.code === 200) {
          this.markReaded(msg)
          this.$message.success('加入成功')

          this.removeItemBlock(msg.id);
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 拒绝邀请
    rejectInvite (msg) {
      if (msg.data_json == null || msg.data_json === '') {
        this.$message.error('未知异常!')
        return
      }
      const data_json = JSON.parse(msg.data_json)
      var bs_base_invite_sta = -1
      disposeInvite({ id: data_json.bs_base_invite_id, sta: bs_base_invite_sta, msg_id: msg.id }).then(res => {
        if (res.code === 200) {
          this.markReaded(msg)
          this.$message.success('已拒绝加入该基地')
          this.requestData();

          this.removeItemBlock(msg.id);
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    passApply (msg) {
      if (msg.userMessageTypeCode === 'approval_apply') {
        this.processApply(msg, true)
      } else if (msg.userMessageTypeCode === 'approval_invite') {
        this.passInvite(msg)
      }
    },
    rejectApply (msg) {
      if (msg.userMessageTypeCode === 'approval_apply') {
        this.processApply(msg, false)
      } else if (msg.userMessageTypeCode === 'approval_invite') {
        this.rejectInvite(msg)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.mesg-ct .el-badge__content.is-fixed {
  position: absolute;
  top: 13px;
  right: 10px;
  -webkit-transform: translateY(-50%) translateX(100%);
  transform: translateY(-50%) translateX(100%);
  // z-index: 99;
  z-index: 0;
}
.el-drawer.ltr,
.el-drawer.rtl {
  top: 50px !important;
  height: calc(100% - 50px);
}
.el-drawer__header {
  margin: 0px !important;
  padding: 0px !important;
  border-bottom: 1px solid #e2e5ec !important;
  line-height: 50px;
  font-size: 14px;
  padding-left: 15px !important;
}
.inmessage {
  position: absolute;
  top: 12px;
  left: 120px;
  line-height: 24px;
  a {
    line-height: 24px;
    color: #333;
    border: 1px solid #eceff8;
    margin-left: 20px;
    padding: 0 10px;
    font-size: 12px;
    display: inline-block;
    &:hover {
      color: #108cee;
    }
  }
}
.item-block {
  width: 320px;
  padding: 5px 0;
  padding-left: 20px;
  padding-right: 20px;
  border-bottom: 1px solid #e8ebee;
  position: relative;
  .type {
    color: #666;
    height: 20px;
    line-height: 20px;
  }
  .date {
    color: #999;
    height: 20px;
  }
  .btn {
    display: none;
    height: 20px;
    button {
      float: right;
      color: #666;
      cursor: pointer;
      border: 1px solid #999;
      border-radius: 10px;
      outline: none;
      padding: 3px 8px 3px 8px;
      &:hover {
        border-color: #108cee;
        color: #108cee;
      }
    }
  }
  .content {
    clear: both;
    color: #333;
    line-height: 20px;
    padding-top: 7px;
  }
}
.left {
  float: left;
}
.right {
  float: right;
}
.demo-drawer__content {
  position: absolute !important;
  height: calc(100% - 50px);
  overflow: hidden auto;
}
</style>
