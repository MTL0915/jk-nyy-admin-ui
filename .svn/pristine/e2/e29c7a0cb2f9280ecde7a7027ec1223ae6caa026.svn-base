<template>
  <div class='monitoringAndData'>
      <div class='title'>
          <span>实施农业专家控制与数据展示系统</span>
      </div>
      <div class='btnArray'>
          <div class='tab'>
              <div :class='videoSelect == 1 ? "active" : ""' @click='videoSelectClick("SX01A-1900015",1)'>育苗地块1</div>
              <div :class='videoSelect == 2 ? "active" : ""' @click='videoSelectClick("SX01A-2000043",2)'>育苗地块2</div>
              <div :class='videoSelect == 3 ? "active" : ""' @click='videoSelectClick("SX01A-2000044",3)'>育苗地块3</div>
          </div>
      </div>
      <div class='content'>
          <div class='interface'>
              <!-- 视频 -->
            <div class='box video'>
                <video-box ref='video' class='lines' />
            </div>
            
            <div class='box irrigation'>
                <!-- 灌溉只能设备 -->
                <div class='' style='height: 60%;'>
                    <irrigation class='lines' />
                </div>
                <!-- 气象站 -->
                <div style='height: calc(40% - 10px);margin-top: 10px;'>
                    <weather class='lines' style='height:100%;' />
                </div>
            </div>
            <div class='box moisturize'>
                <!-- 墒情检测数据 -->
                <moisturize class='lines' />
            </div>
            <div class='box earlyWarne'>
                <!-- 预警信息 -->
                <earlywarne class='lines' />
            </div>
          </div>
      </div>

        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="50%">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="温度设置">
                   <el-slider  v-model="value" range :marks="marks" :max='50'> </el-slider>
                </el-form-item>
                <el-form-item label="湿度设置">
                   <el-slider  v-model="value1" range :marks="marks1" :max='100'> </el-slider>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>

  </div>
</template>

<script>
import videoBox from './video.vue'
import irrigation from './irrigation.vue'
import weather from './weather.vue'
import moisturize from './moisturize.vue'
import earlywarne from './earlywarne.vue'

export default {
    components : {
        videoBox,
        irrigation,
        weather,
        moisturize,
        earlywarne
    },
    methods : {
        videoSelectClick (url,i){
            this.videoSelect = i;
            this.$refs.video.set(url);
        }
    },
    data (){
        return { 
            value: [10, 20],
            marks: {
                0: '0°C',
                10: '10°C',
                20: '20°C',
                40: '40°C',
            },
            value1: [40, 50],
            marks1: {
                0: '0%',
                40: '40%',
                50: '50%',
                70: '70%',
            },
            dialogVisible : false,
            videoSelect : 1
        }
    }
}
</script>

<style>

    .monitoringAndData { padding: 8px; height: 100%;background: #ededed; }
    .monitoringAndData .title { font-size: 14px;font-weight: 800;color: #878787; }
    .monitoringAndData .tab { display: flex;float: left;margin-top: 14px;border-radius: 6px; overflow: hidden; }
    .monitoringAndData .tab>div.active { color:blue; }
    .monitoringAndData .tab>div { padding: 12px; background: #ffffff; cursor: pointer;}    
    .monitoringAndData .btnArray { overflow: hidden; }
    .monitoringAndData .content { height: 100%; }
    .monitoringAndData .interface { height: 100%; }
    .monitoringAndData .box { border: #ffffff 0px solid; float: left;padding: 8px; }
    .monitoringAndData .box.video { width: 60%; height: 50%; }
    .monitoringAndData .box.irrigation { width: 40%; height: 50%;}
    .monitoringAndData .box.moisturize { width: 60%; height: calc(50% - 60px);}
    .monitoringAndData .box.earlyWarne { width: 40%; height: calc(50% - 60px);}
    .monitoringAndData .lines { box-shadow: 0px 0px 6px #000; border-radius: 4px; }
</style>