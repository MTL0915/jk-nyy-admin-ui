<template>
    <div>
        <div class="model_name">{{ hd_device_type_code == 'JK-ZS' ? '识别结果' : '相册' }}</div>

        <div style="position: absolute;right: 10px;top:10px;"> 
            <template v-if="hd_device_type_code == 'JK-ZS'">
                <el-button
                    style="cursor: pointer;float: left;padding: 0 15px;margin-left:5px;"
                    type="text"
                    size="mini"
                    @click="loadAllCameraStatus()"
                >识别列表</el-button>
            </template>

            <div @click="loadAllPicture" style="cursor: pointer;float: left;padding-left: 15px;">
                <i class="el-icon-full-screen fullScreen"></i>
            </div>
        </div>
        <DevicePictureCard ref="devicePictureCard" style="padding-top:15px" />

        <!-- 相册 -->
        <el-dialog v-if="photoDialogVisible" :visible.sync="photoDialogVisible" append-to-body title="相册" >
            <CameraPhoto ref="cameraPhoto" :hd_device_id="hd_device_id" />
        </el-dialog>

         <!-- 智慧摄像头识别列表 -->
        <el-dialog v-if="listCameraStatusDialogVisible" :visible.sync="listCameraStatusDialogVisible" append-to-body title="识别列表" >
            <listCameraStatus :hd_device_id="hd_device_id" />
        </el-dialog>
    </div>
</template>

<script>

import CameraPhoto from '@/views/base/video/module/CameraPhoto';
import DevicePictureCard from '@/views/base/equip/module/DevicePictureCard';

export default {
  name: 'imageList',
  components: { DevicePictureCard,CameraPhoto },
  mixins: [], //混入
  props:{
      hd_device_id: {
          type:String,
          default:""
      },
      hd_device_type_code: {
          type:String,
          default:""
      },
  },
  data() {
    return {
        listCameraStatusDialogVisible:false,
        photoDialogVisible:false,
    }
  },
  computed: {
    data() {
      return null
    }
  },
  watch: {
    hd_device_id:function(val) {
      this.$refs.devicePictureCard.show(this.hd_device_id, this.hd_device_type_code);
    }
  },
  created() {
    // dom载入后触发
    this.$nextTick(() => {

    })
  },
  methods: {
      //查看所有照片
    loadAllPicture () {
      this.photoDialogVisible = true
    },
    //查看智慧摄像头识别列表
    loadAllCameraStatus () {
      this.listCameraStatusDialogVisible = true
    }
  }
}
</script>

<style lang="stylus" scoped>


</style>