<!-- 添加海康云眸出厂设备 -->
<template>
  <div>
    <div>
      <el-table :data="storeList">
        <el-table-column
          prop="storeName"
          label="门店名称"
        >
        </el-table-column>
        <el-table-column
          prop="storeDetailAddress"
          label="门店地址"
        >
        </el-table-column>
        <el-table-column
          prop="storeLng"
          label="经度"
        >
        </el-table-column>
        <el-table-column
          prop="storeLat"
          label="纬度"
        >
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click="chooseStore(scope.row.storeId)"
              type="primary"
              size="mini"
            >选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <el-pagination
          background
          layout="total,prev, pager, next"
          :current-page="storeListPage + 1"
          :page-size="storeListSize"
          @current-change="storeListPageChange"
          :total="storeListTotal"
        >
        </el-pagination>
      </div>
    </div>
    <el-dialog
      append-to-body
      title="设备通道列表"
      :visible.sync="cameraListDialogVisible"
      v-if="cameraListDialogVisible"
    >
      <el-table :data="cameraList">

        <el-table-column
          prop="deviceName"
          label="设备名称"
        >
        </el-table-column>
        <!-- <el-table-column
          prop="deviceModel"
          label="设备型号"
        > 
        </el-table-column>-->
        <el-table-column
          prop="deviceSerial"
          label="设备序列号"
        >
        </el-table-column>
        <el-table-column
          prop="channelName"
          label="通道名"
        >
        </el-table-column>
        <el-table-column
          prop="channelNo"
          label="通道号"
        >
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag
              v-if="scope.row.channelStatus === 1"
              type="success"
            >在线</el-tag>
            <el-tag
              v-else
              type="danger"
            >离线</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image
              v-if="scope.row.channelPicUrl"
              style="width: 100px; height: 100px"
              :src="scope.row.channelPicUrl"
              fit="contain"
            ></el-image>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click="chooseDevice(scope.row)"
              type="primary"
              size="mini"
            >选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <el-pagination
          background
          layout="total,prev, pager, next"
          :current-page="cameraListPage + 1"
          :page-size="cameraListSize"
          @current-change="cameraListPageChange"
          :total="cameraListTotal"
        >
        </el-pagination>
      </div>
    </el-dialog>
    <el-dialog
      append-to-body
      title="添加设备"
      :visible.sync="addDeviceDialogVisible"
      v-if="addDeviceDialogVisible"
    >
      <div style="text-align:center">
        <div>
          设备名称:
          <el-input
            v-model="name"
            size="mini"
            clearable
            style="width:180px;"
          />
        </div>

        <div style="margin-top:15px">
          设备验证码:
          <el-input
            v-model="verification_code"
            size="mini"
            clearable
            style="width:180px;"
          />
        </div>

        <div style="margin-top:15px">
          摄像头设备验证码:
          <el-input
            v-model="hikcloudValidateCode"
            size="mini"
            clearable
            style="width:180px;"
          />
        </div>
      </div>
      <div style="text-align:right;margin-top:15px">
        <el-button
          type="primary"
          size="mini"
          @click="addDevice()"
        >确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { hikcloudStoreInfo, hikcloudCameraList, hikcloudAddFactoryDevice } from '@/api/sxt'

export default {
  data () {
    return {
      storeListPage: 0,
      storeListSize: 10,
      storeListTotal: 0,
      storeList: [],//门店列表
      cameraListPage: 0,
      cameraListSize: 10,
      cameraListTotal: 0,
      cameraList: [],//设备列表
      cameraListDialogVisible: false,
      storeId: null,//选择门店id
      addDeviceDialogVisible: false,
      name: '海康云眸摄像头',
      verification_code: 'A12345',
      hikcloudDeviceId: null,
      hikcloudDeviceName: null,
      hikcloudDeviceModel: null,
      hikcloudDeviceSerial: null,
      hikcloudValidateCode: null,
      hikcloudChannelId: null,
      hikcloudChannelName: null,
      hikcloudChannelNo: null,
      hikcloudChannelStatus: null,
      hikcloudChannelPicUrl: null,
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    //初始化
    init () {
      this.storeListPage = 0
      this.getStoreList()
    },
    //获取门店列表
    getStoreList () {
      hikcloudStoreInfo({
        page: this.storeListPage,
        size: this.storeListSize
      }).then(res => {
        if (res.code === 200) {
          this.storeListTotal = res.data.total
          this.storeList = res.data.rows
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    //门店列表翻页
    storeListPageChange (e) {
      this.storeListPage = e - 1;
      this.getStoreList()
    },
    //选择门店
    chooseStore (storeId) {
      this.storeId = storeId
      this.cameraListPage = 0
      this.getCameraList()
    },
    //获取门店下设备列表
    getCameraList () {
      hikcloudCameraList({
        storeId: this.storeId,
        page: this.cameraListPage,
        size: this.cameraListSize
      }).then(res => {
        if (res.code === 200) {
          this.cameraListDialogVisible = true
          this.cameraList = res.data.rows
          this.cameraListTotal = res.data.total
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    //设备列表翻页
    cameraListPageChange (e) {
      this.cameraListPage = e - 1
      this.getCameraList()
    },
    //选择设备
    chooseDevice (row) {
      this.name = row.deviceName
      this.verification_code = 'A12345'
      this.hikcloudDeviceId = row.deviceId
      this.hikcloudDeviceName = row.deviceName
      this.hikcloudDeviceModel = row.deviceModel
      this.hikcloudDeviceSerial = row.deviceSerial
      this.hikcloudChannelId = row.channelId
      this.hikcloudChannelName = row.channelName
      this.hikcloudChannelNo = row.channelNo
      this.hikcloudChannelStatus = row.channelStatus
      this.hikcloudChannelPicUrl = row.channelPicUrl
      this.addDeviceDialogVisible = true
    },
    //添加设备
    addDevice () {
      if (!this.name) {
        this.$message.error('请输入设备名称')
        return
      }
      if (!this.verification_code) {
        this.$message.error('请输入设备验证码')
        return
      }
      if (!this.hikcloudValidateCode) {
        this.$message.error('请输入摄像头验证码')
        return
      }
      hikcloudAddFactoryDevice({
        name: this.name,
        verification_code: this.verification_code,
        hikcloudDeviceId: this.hikcloudDeviceId,
        hikcloudDeviceName: this.hikcloudDeviceName,
        hikcloudDeviceModel: this.hikcloudDeviceModel,
        hikcloudDeviceSerial: this.hikcloudDeviceSerial,
        hikcloudValidateCode: this.hikcloudValidateCode,
        hikcloudChannelId: this.hikcloudChannelId,
        hikcloudChannelName: this.hikcloudChannelName,
        hikcloudChannelNo: this.hikcloudChannelNo,
        hikcloudChannelStatus: this.hikcloudChannelStatus,
        hikcloudChannelPicUrl: this.hikcloudChannelPicUrl
      }).then(res => {
        if (res.code === 200) {
          this.$message.success('添加成功,设备序列号:' + res.data)
          this.addDeviceDialogVisible = false
        } else {
          this.$message.error(res.msg)
        }
      })
    },
  }
}
</script>
