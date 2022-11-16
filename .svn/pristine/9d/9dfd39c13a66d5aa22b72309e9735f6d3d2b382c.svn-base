<template>
  <div>
    <!-- 设备版本文件管理 -->
    <el-dialog
      v-loading="versionUpdateLoading"
      :append-to-body="true"
      :visible.sync="versionUpdateDialog"
      title="设备版本管理"
      width="1000px"
    >
      <div id="loading-div">
        <span style="color:red">当前版本号：</span>{{ version }}

        <div v-show="cancelUpgradeShow" >
          <span style="color:red">更新版本：</span>{{ upgradeVersion }}
          <div style="width:80%;margin-top:10px;margin-bottom:10px;">
            <el-progress :percentage="progress" :stroke-width="20"/>
          </div>
          <el-button size="mini" type="primary" @click="confirmCancelUpgrade">取消升级</el-button>
        </div>

        <el-table
          v-show="cancelUpgradeShow === false"
          :data="versionUpdateData"
          style="width: 100%;margin-top:10px"
          border
          class="table">

          <el-table-column label="固件版本号" width="180" prop="version" align="center"/>
          <el-table-column :formatter="formatInsertTime" prop="insert_time" label="上传时间" width="180" align="center"/>
          <el-table-column label="文件大小（KB）" align="center" width="180" prop="size"/>

          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="confirmUpgrade(scope.row)" >更新固件版本</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>

    <!-- 升级确认框 -->
    <el-dialog :visible.sync="upgradeVisible" append-to-body title="提示" width="300px" center>
      <div class="del-dialog-cnt">您确定进行设备固件升级吗？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="upgradeVisible = false">取 消</el-button>
        <el-button type="primary" @click="upgradeToVersion">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 取消升级确认框 -->
    <el-dialog :visible.sync="canelUpgradeVisible" append-to-body title="提示" width="300px" center>
      <div class="del-dialog-cnt">您确定取消设备固件升级吗？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="canelUpgradeVisible = false">取 消</el-button>
        <el-button type="primary" @click="cancelUpgrade">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { upgrade, cancelUpgrade } from '@/utils/websocket_util'
import { Loading } from 'element-ui'
import { formatDate } from '@/utils/date'
import { queryByHd_hardware_version_id } from '@/api/hd_device_upgrade_file'
export default {
  data() {
    return {
      device_id: '',
      hd_hardware_version_id: '',
      version: '',

      upgradeVisible: false,
      upgradeDevice_id: '',
      upgradeVersion: '',
      canelUpgradeVisible: false,
      cancelUpgradeShow: false,
      versionUpdateDialog: false,
      versionUpdateLoading: false,
      progress: 0, // 升级进度
      versionUpdateData: []
    }
  },
  computed: {},
  created() {
    var _this = this
    this.$ws.upgradeUpload = function(data) {
      if (data.device_id === _this.device_id) {
        _this.cancelUpgradeShow = true
        _this.upgradeVersion = data.version
        _this.progress = data.progress
      }

      if (data.complete === 2) {
        _this.$message.success('设备' + data.device_id + '固件升级成功！')
      }
    }
  },
  methods: {
    formatInsertTime(row, column, cellValue) {
      return formatDate(new Date(cellValue), 'yyyy-MM-dd hh:mm')
    },
    closeLoadInstance() {
      this.loadingInstance && this.loadingInstance.close()
    },
    versionUpdateDialogOpen(device_id, hd_hardware_version_id, version) {
      this.device_id = device_id
      this.hd_hardware_version_id = hd_hardware_version_id
      this.version = version

      this.closeLoadInstance()
      this.versionUpdateDialog = true
      this.cancelUpgradeShow = false
      queryByHd_hardware_version_id(this.hd_hardware_version_id).then(res => {
        this.$data.versionUpdateData = res.data
        this.$data.versionUpdateLoading = false
      }).catch(err => {
        this.$data.versionUpdateLoading = false
        console.error(err.response.data.message)
      })
    },
    confirmUpgrade(data) {
      this.upgradeDevice_id = this.device_id
      this.upgradeVersion = data.version
      this.upgradeVisible = true
    },
    upgradeToVersion() {
      this.upgradeVisible = false

      this.loadingInstance = Loading.service({ 'target': '#loading-div', text: '正在请求更新设备，请等待！' })
      upgrade(this.upgradeDevice_id, this.upgradeVersion, this.$ws).then(res => {
        this.$message.success(res.msg)
        this.cancelUpgradeShow = true
        this.closeLoadInstance()
      }).catch(err => {
        this.$message.error(err.msg)
        this.closeLoadInstance()
      })
    },
    confirmCancelUpgrade() {
      this.upgradeDevice_id = this.device_id
      this.canelUpgradeVisible = true
    },
    cancelUpgrade() {
      this.canelUpgradeVisible = false

      cancelUpgrade(this.upgradeDevice_id, this.$ws).then((res) => {
        if (res.code === 200) {
          // this.$message.success(res.msg)
          this.cancelUpgradeShow = false
          this.progress = 0
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        this.$message.error(err.msg)
      })
    }
  }
}
</script>

