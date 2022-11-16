<template>
    <div class='pointInfo' :style='"left:"+pointInfoX+"px;top:"+pointInfoY+"px"'>
        <div class='pointInfo-title'>{{deviceName || "-"}}</div>  
        <div class='pointInfo-row'>
            <!--
            <div class='pointInfo-model'>
                <span class='pointInfo-name'>电量:</span> 
                <span class='pointInfo-value'>{{getPowerValue}}</span>
            </div>
            -->
            <div class='pointInfo-model'>
                <span class='pointInfo-name'>温度:</span> 
                <span class='pointInfo-value'>{{property_values.dTemp? parseInt(property_values.dTemp )+"℃" : "-"}}</span>
            </div>
            <div class='pointInfo-model'>
                <span class='pointInfo-name'>速度:</span> 
                <span class='pointInfo-value'>{{property_values.speed? parseInt(property_values.speed) : "-"}}</span>
            </div>
            <div class='pointInfo-model'>
                <span class='pointInfo-name'>报警:</span> 
                <span class='pointInfo-value' style='color:#ff0000;' >{{property_values.rd_sta === 1 ? "有障碍物注意" : "-"}}</span>
            </div>
            <div class='pointInfo-model'>
                <span class='pointInfo-name'>任务状态:</span> 
                <span class='pointInfo-value' >{{property_values.nav_cmd === 5 ? "正在任务中" : "暂无任务"}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import ws from '../../websocket/py_ws'
export default {
    props: {
        pointInfoX: {
            type: Number,
            default: 0
        },
        pointInfoY: {
            type: Number,
            default: 0
        },
        deviceName: {
            type: String,
            default: "设备信息"
        }
    },
    data (){
        return {
            wsUploadSta: null,
            property_values: {}
        }
    },
    mounted (){

        this.ws = ws.get();
        this.wsUploadSta = this.ws.onUploadSta(this.uploadSta);
    },
    methods: {
        uploadSta (result){
            this.property_values = result.data.property_values;
        }
       
    }
}
</script>

<style scoped>
.pointInfo {
    position:absolute;
    z-index: 999;
    background: #000000A8;
    padding: 8px;
    border-radius: 4px;
    color: #fff;
    transform: translate(-50%,-140%);
    width: 150px;
}
.pointInfo-title {
    color: #039fb2;
    padding: 0 0 12px;
    font-size: 14px;
}
.pointInfo-row { }
.pointInfo-model { }
.pointInfo-name { }
.pointInfo-value { color: #8cc8cf; }
</style>