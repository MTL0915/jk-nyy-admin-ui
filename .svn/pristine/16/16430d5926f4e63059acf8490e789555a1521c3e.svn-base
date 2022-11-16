<template>
    <div v-show="JSON.stringify(pointInfo) !=='{}'" class='pointInfo' :style='{left:pointInfo.x+"px",top:pointInfo.y+"px"}'>
        <div class='pointInfo-title'>{{runStatus}}</div>  
        <div class='pointInfo-row'>
            <div class='pointInfo-model'>
                <span class="circle"></span>
                <span class='pointInfo-name'>行驶速度:</span> 
                <span class='pointInfo-value'>{{speed}}m/s</span>
            </div>
            <div class='pointInfo-model'>
                <span class="circle"></span>
                <span class='pointInfo-name'>行驶方向:</span> 
                <span class='pointInfo-value'>{{direction}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { getDirectionByArimuth } from '@/utils/device_util'

export default {
    props: {
        deviceInfo:{
            type:Object
        },
        pointInfo: {
            type: Object,
            default: ()=>({x:0,y:0})
        }
    },
    data (){
        return {
            runStatus:"正在行驶中",
            speed:0.1,
            direction:"北",
        }
    },
    watch: {
      deviceInfo:{
        handler: function(deviceInfo){
            var speed = deviceInfo.innerStatus.property_values ? deviceInfo.innerStatus.property_values.speed : 0;
            this.speed = speed;
            
            var arimuth = deviceInfo.innerStatus.property_values ? deviceInfo.innerStatus.property_values.arimuth : 0;
            this.direction = getDirectionByArimuth(arimuth);

            if (speed === 0){
                this.runStatus = "停止中";
            }else{
                this.runStatus = "正在行驶中";
            }
        },
        deep: true,
      }
    },
    mounted (){
    },
    methods: {
    }
}
</script>

<style scoped>
.pointInfo {
    position:absolute;
    z-index: 999;
    background: url('~@/assets/planDeviceNew/map_card.png') center no-repeat;
    background-size: 100% 100%;
    padding: 20px 30px;
    color: #fff;
    transform: translate(-50%,-120%);
}
.pointInfo-title {
    font-size: 18px;
    padding-bottom : 8px;
}

.pointInfo-model{
    display: flex;
    align-items: center;
    color: #f8f8f8;
    font-size:14px;
}

.circle{
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #00d845;
    margin-right: 5px;
}

</style>