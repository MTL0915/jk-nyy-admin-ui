<template>
    <!-- 参数配置 -->
    <div class='configEdit'>
        <div class='config_form'>
            <!-- 头部 -->
            <div class='addTaskHead'>
                <img @click='back' style='cursor:pointer;' :src='require("@/assets/img/Plan/drawLineMap/qp/jtz.png")' />
                <span style='font-size:14px;'>参数配置</span>
            </div>
            <el-form v-show='form.length > 0' class='' ref="form" :model="form" label-width="120px">
                <el-form-item class='formRow' :label="it.description" v-for='( it , i ) in form' :key='i' >
                    <el-input size='mini' v-model="it.value"></el-input>
                    <el-button v-show='it.name == "positionCorrection"' plain @click='jiaozheng(it)' size="small">矫正</el-button>
                </el-form-item>
                <div style="margin:0 auto;text-align:center;margin-bottom: 10px;">
                    <el-button type="primary" @click='addOrUpdateAttribute' size="small">保存</el-button>
                    <el-button plain @click='back' size="small">取消</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import { getAttributeByDevice , addOrUpdateAttribute } from '@/api/map3d/drawMap'
export default {
    props: {
        
    },
    data (){
        return {
            form: []
        } 
    },
    mounted (){
        this.getDeviceConfig();
    },
    methods: {
        getDeviceConfig (){
            // 获取设备配置信息
            getAttributeByDevice(param.device_id).then((res)=>{
                var data = res.data
                // 获取有几种类型
                this.form = data;
                
                this.$parent.deviceConfig = data;
                // 将结果传回父级
                this.$parent.configForm = data;
                // 获取视频流地址
                var url = data.find((e)=>{ return e.name === 'video_url'; });
                if( url && url.value != "" && url.value ){
                    // 如果存在视频流地址
                    this.$parent.$refs.video.playVideo(url.value);
                }
                var positionCorrection = data.find((e)=>{ return e.name === 'positionCorrection'; });
                if( positionCorrection && positionCorrection.value != "" && positionCorrection.value ){
                    // 如果存在矫正地址
                    this.$parent.positionCorrection = positionCorrection.value;
                }
            })
        },

        addOrUpdateAttribute (){
            var il = this.form.length
            for( var i in this.form ){
                addOrUpdateAttribute(this.form[i]).then((e)=>{
                    if( --il <= 0 ) {
                        this.$message({
                            showClose: true,
                            message: "成功修改",
                            type: "success"
                        })
                        var positionCorrection = this.form.find((e)=>{ return e.name === 'positionCorrection'; });
                        if( positionCorrection && positionCorrection.value != "" && positionCorrection.value ){
                            // 如果存在矫正地址
                            this.$parent.positionCorrection = positionCorrection.value;
                        }
                        this.back();
                    }
                })
            }
        },

        back (){
            this.$parent.showConfigEdit = false;
        },

        jiaozheng (it){
            // 首先隐藏页面上所有的文件
            var headActive = this.$parent.headActive
            this.$parent.headActive = 0;
            // 隐藏自己
            this.$parent.showConfigEdit = false;

            // 提示点击地图
            this.$notify({
                title: '操作提示',
                message: this.$createElement('i', { style: 'color: #ff0000'}, '请点击地图上设备实际位置。')
            });
            
            // 等待地图被选中点击
            var key = view.on("click",(event)=>{
                // 显示自己
                this.$parent.showConfigEdit = true;
                // 点击地图后恢复到状态3
                this.$parent.headActive = headActive;
                // 获得点击的坐标点
                var point = [event.mapPoint.longitude,event.mapPoint.latitude];
                // 获得上传的坐标点
                var location = this.$parent.property_values.location;
                // 计算坐标点误差 上传经纬度是反的
                var x = point[0] - location[1];
                var y = point[1] - location[0];
                // 将误差放上去
                it.value = x+","+y;
                this.$parent.positionCorrection = it.value;
                key.remove();
            })
        }
    }
}
</script>

<style>
    
</style>

<style scoped>
    .configEdit {
        height:100%;
        background: #000000A8;
    }
    .config_form {
        width: 500px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background: #131f2dA8;
        color:#ffffff;
        padding: 0px;
        border-radius: 4px;
    }
    .addTaskHead {
        padding-bottom: 8px;
        margin-bottom: 8px;
        border-bottom: solid 1px #ffffff;
        padding: 8px;
        display: flex;
        align-items: center;
    }

    .addTaskHead img {
        width: 12px;
    }

    .formRow {
        padding: 0 12px;
    }

</style>