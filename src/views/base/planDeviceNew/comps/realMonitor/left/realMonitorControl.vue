<template>
    <!-- 无人设备展示功能操作系统 -->
    <div class='noManOpt'>
        <!-- 可控制按钮 -->
        <div class='btnArray'>
            <div v-for='it in sensorInfos.filter((e)=>{ 
                    return e.channelType == 1 && ( e.hd_sensor_type_function_code !== "POWER_SWITCH" )
                })' :key='it.channel' >
                <sensor-btn :sensor='it' :info='info' :isopt='isPower' :getWs='getWs'>
                    
                </sensor-btn>
            </div>
            <!-- 药剂 -->
            <!-- <div class='MP'>
                <div class='line' :style='"width:"+(speed_gear ? parseInt(speed_gear / 1.5 * 100)+"%" : "0")'></div>
                <div class='show'>速度：{{speed_gear ? speed_gear.toFixed(1) : "0"}}</div>
                <i class='el-icon-remove-outline removeSpeed' @click='downSpeedGean'></i>
                <i class='el-icon-circle-plus-outline addSpeed' @click='upSpeedGean'></i>
            </div> -->
        </div>
        
        <!-- 方向盘 -->
        <div class='fangxiangpan'>
            <!-- 头部 -->
            <div class='head'>
                <div class='name'>
                    <img :src='require("@/assets/img/Plan/drawLineMap/qp/jt.png")' />
                    <span>设备控制</span>
                </div>
            </div>
            <div v-if="device.hd_device_type_code != 'JK-GY'">
                <remote-control ref='control' :ws='ws' :isopt='isPower' :info='info' :property_values='property_values' :device_id='device_id' :angle='degs' :mouseup='mouseup' :mousedown='mousedown' :changeAngle='changeAngle'></remote-control>
                <!-- 设置速度 -->
                <div class='speed'>
                    <div class='speedValue'>速度：{{speed_gear1/10}}m/s</div>
                    <el-slider
                        v-model="speed_gear1"
                        @change='changeSpeed'
                        vertical
                        :min='1'
                        :max='15'
                        :show-tooltip='false'
                        height="135px">
                    </el-slider>
                </div>
            </div>
            <!-- 无人轨道车控制 -->
            <!-- <div v-if="device.hd_device_type_code === 'JK-GY'" style=" height:calc(100% - 35px);">
                <gyControl refs="gyControl" :ws='ws' :info='info' :property_values='property_values' :device_id='device_id' />
            </div> -->
        </div>
    </div>
</template>

<script>

import remoteControl from './realMonitorRemoteControl'
import { getDevice } from '../../../data/data'
import ws from '../../../websocket/py_ws'
import sensorBtn from './realMonitorControlSensorBtn'
export default {
    props: {
        device: {
            type: Object,
            default: ()=> { return {} }
        },
    },
    watch: {
      
    },
    components: {
        remoteControl,
        sensorBtn,
        // gyControl
    },
    data (){
        return {
            optActive: -1, // 0t 1b 2l 3r
            switchBtn: 0,
            degs: 0,
            quanStatus: true,
            top: 0,
            keyChangeAngle: null,
            channelValue: [], //通道数据
            property_values: {}, //body体数据
            sensorInfos: [],
            speed_gear1: window.noManOpt_speed || 0.5,
            info: {},
            isPower: false, //电源状态
            value: 5,
            ws: null
        }
    },
    mounted (){
        this.getDevice();
        this.createWebsocket();
    },
    methods: {
        
        getDevice (){
            getDevice(this.$route.query.device_id).then((res)=>{
                this.device = res.data;
            })
        },

        /* 开始建立websocket链接 */
        createWebsocket (){
            // 创建ws的实例化对象
            this.ws = ws.get();
            // 绑定上报事件
            this.wsUploadSta = this.ws.onUploadSta(this.deviceWsUpdateFunction);
        },

        // 上传信息监测
        deviceWsUpdateFunction (result){
            // 更新信息内容
            this.updateInfo1(result.data);
        },

        changeSpeed (){
            window.noManOpt_speed = this.speed_gear1;
        },

        // 上传信息
        updateInfo1 (info){
            this.info = info;
            if( this.sensorInfos == null || this.sensorInfos.length == 0 ){
                this.sensorInfos = info.sensorInfos;
            }else{
                this.sensorInfos.forEach((e)=>{
                    // 获取当前的通道号
                    var channel = e.channel;
                    // 根据通道号获取上传的通道号数据 同步数据
                    var infos = info.sensorInfos.find( (e)=>{ return e.channel === channel } )
                    // 开始对照数据进行同步
                    for( var i in e ){
                        e[i] = infos[i] === undefined ? e[i] : infos[i];
                    }
                })
            }
            //判断电源是否打开
            var isPower = this.sensorInfos.find((e)=> { return e.hd_sensor_type_function_code === "POWER_SWITCH" });
            if( isPower ){
                this.isPower = isPower.value;
            }
            this.channelValue = info.channelValue;
            this.property_values = info.property_values;
            // this.updateInfo(info);
        },

        // 方向盘变化
        setAngle (speed , angle){
            // 设置速度
            this.$refs.control.setAngle(speed,angle);
        },

        // 方向变化事件
        changeAngle (angle){
            this.degs = angle;
        },

        // 按下方向盘
        mousedown (){
            // 按下放键盘 立马启动计时器 没0.3秒发送一下当前方向盘位置
            this.controlDownKey = setInterval(()=>{
                 // 发送给一个方向键设置信息
                this.setAngle(this.speed_gear1 / 10,this.degs);
            },50)
        },

        mouseup (){
            // 取消掉控制盘的监听
            this.controlDownKey && clearInterval(this.controlDownKey);
            this.controlDownKey = null;
            setTimeout(()=>{
                this.setAngle(0,0);
            },80)
        },

        // 放开键盘 
        mouseup1 (){
            if( this.keyChangeAngle ){
                // 如果存在排队等待的变化事件 取消掉变化
                clearTimeout(this.keyChangeAngle);
            }
            setTimeout(()=>{
                this.setAngle(0,0);
                this.keyChangeAngle = null;
            },200)
        },

        up (){
            this.$refs.control.up();
        },

        down (){
            this.$refs.control.down();
        }, 

        unUpAndDown (){
            this.$refs.control.unUpAndDown();
        },

        // 如果按下三档开关
        clickDown (it,type,event){
            // 记录一下这个计时器已经在执行了
            it.isTimer = true;
            // 按下按钮后不断的开始请求
            var key = setInterval(()=>{
                // 判断内心是开 还是关
                if( type === 1 ){
                    // 没0.5s发送一次请求
                    this.$refs.control.openWindow(it.hd_device_sensor_id);   
                    console.log("openWindow")
                }else{
                    // 没0.5s发送一次请求
                    this.$refs.control.closeWindow(it.hd_device_sensor_id);   
                    console.log("closeWindow")
                }
            },500)
            // 获取触发事件元素
            var dom = event.target;
            // 监听移出和 抬起事件
            var domMouseUp = ()=>{
                // 抬起后取消掉定时器
                clearInterval(key);
                // 关闭掉事件监听
                dom.removeEventListener("mouseup",domMouseUp);
                // 关闭掉事件监听
                dom.removeEventListener("mouseover",domMouseOver);
                // 记录以及修改关闭
                it.isTimer = false;
                // 传入停止指令
                this.$refs.control.stopWindow(it.hd_device_sensor_id);
                console.log("stopWindow")
            }
            dom.addEventListener("mouseup",domMouseUp)
            var domMouseOver = ()=>{
                // 抬起后取消掉定时器
                clearInterval(key);
                // 关闭掉事件监听
                dom.removeEventListener("mouseup",domMouseUp);
                // 关闭掉事件监听
                dom.removeEventListener("mouseover",domMouseOver);
                // 记录以及修改关闭
                it.isTimer = false;
                // 传入停止指令
                this.$refs.control.stopWindow(it.hd_device_sensor_id);
                console.log("stopWindow")
            }
            dom.addEventListener("mouseover",domMouseOver)
        }
    }
}
</script>

<style scoped>

    .btnArray {
        position: absolute;
        bottom: 10px;
        left: 330px;
        display: flex;
        /* box-shadow: 0px 0px 5px #29dde8;
        background: #233239e0; */
    }

    .btnArray .MP {
        width: 200px;
        position: absolute;
        bottom: -32px;
        margin: 0 -1px;
    }

    .btnArray > * {
        margin: 5px;
    }

    .zpy {
        padding: 8px;
        color: #ffffff;
        font-size: 12px;
        background: #1df2fa;
        border-radius: 4px;
        /* margin: 2px 8px; */
        white-space: nowrap;
        cursor: pointer;
    }
    .ypy {
        padding: 8px;
        color: #ffffff;
        font-size: 12px;
        background: #1df2fa;
        border-radius: 4px;
        /* margin: 2px 8px; */
        white-space: nowrap;
        cursor: pointer;
    }
    .bj {
        padding: 8px;
        color: #ffffff;
        font-size: 12px;
        background: #757575;
        border-radius: 4px;
        /* margin: 2px 8px; */
        white-space: nowrap;
        cursor: pointer;
    }

    .headBoxMiddel {
        min-width: 256px;
        background: #233239e0;
        padding: 7px;
        padding-left: 40px;
        padding-right: 23px;
        border-radius: 4px;
        box-shadow: 0px 0px 5px #29dde8;
    }

    .opt {
        display: flex;
        height: 40px;
        /* justify-content: space-between; */
        align-items: center;
    }

    .opt > div {
        margin-right: 8px;
    }

    .HP {
        height: 20px;
        border-radius: 50%;
        width: 100%;
        border-radius: 4px;
        overflow: hidden;
        border:solid 1px #86a3a5;
        position: relative;
    }

    .HP .line {
        width: 60%;
        height: 100%;
        background: #1df2fa;
        border-radius: 4px;
    }

    .HP .show {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        color: #96fbff;
        font-size: 12px;
        text-shadow: 0px 0px 1px #000000;
    }

    .MP {
        height: 20px;
        border-radius: 50%;
        width: 100%;
        border-radius: 4px;
        overflow: hidden;
        border:solid 1px #86a3a5;
        margin-top: 5px;
        position: relative;
    }

    .MP .line {
        width: 60%;
        height: 100%;
        background: #00adff;
        border-radius: 4px;
    }

    .MP .show {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        color: #88d8ff;
        font-size: 12px;
        text-shadow: 0px 0px 15px #000000;
    }

    .headBox {
        position: absolute;
        left: 50px;
        top: 35px;
        display: flex;
    }

    .btnGroup {
        display: flex;
        position: absolute;
        left: 200px;
        bottom: 20px;
        background: #263439bf;
        border-radius: 4px;
        box-shadow: 0px 0px 5px #32d6d4;
    }

    .headIconBox {
        position: absolute;
        left: -40px;
        width: 30px;
        height: 30px;
    }

    .headIcon {
        width: 65px;
        height: 65px;
        box-shadow: 0px 0px 5px #29dde8;
        border-radius: 50%;
        position: absolute;
    }

    .qiu {
        border-radius: 50%;
        width: 20px;
        width: 20px;
        position:absolute;
        left: 50%;
        top: 50%;
        text-align: center;
        transform: translate(-50%,-50%);
        line-height: 20px;
        cursor: pointer;
        font-size: 12px;
    }

    .noManOpt {
        /* width: 450px;
        height: 450px; */
        position: relative;
        /* height: 100%; */
    }

    .m-border {
        background: #2c4b4594;
        border-radius: 50%;
        margin: 15px;
        height: calc(100% - 30px);
        position: absolute;
        width: calc(100% - 30px);
    }

    .p-border {
        background: #233136;
        border-radius: 50%;
        margin: 30px;
        height: calc(100% - 60px);
        position: absolute;
        width: calc(100% - 60px);
    }

    .p-border .cover {
        position:absolute;
        z-index: 9;
        width: 100%;
        top:0;
        left:0;
        height: 100%;
    }

    .p-border.optActive0 {
        border-top: solid 1px #1df2fa;
    }
    .p-border.optActive1 {
        border-bottom: solid 1px #1df2fa;
    }
    .p-border.optActive2 {
        border-left: solid 1px #1df2fa;
    }
    .p-border.optActive3 {
        border-right: solid 1px #1df2fa;
    }

    .p-border .active {
        color: #1df2fa;
    }

    .quan {
        height: 200px;
        width: 200px;
        position: absolute;
        top: 30px;
        left: 0;
    }

    .y-line {
        position: absolute;
        width: 100%;
        height:3px;
        border-radius: 3px;
        background: #3ae8e5;
        top: 50%;
        left: 0;
        transform: translateY(-50%) rotateZ(135deg);
    }

    .x-line {
        position: absolute;
        width: 100%;
        height:3px;
        border-radius: 3px;
        background: #3ae8e5;
        top: 50%;
        left: 0;
        transform: translateY(-50%) rotateZ(45deg);
    }

    .xy-cirle {
        border-radius: 50%;
        width: 50%;
        height: 50%;
        background: #888181;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border: solid 5px #1df2fa;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 50px;
        cursor: pointer;
        /* color: #1df2fa; */
    }

    .font-top {
        position:absolute;
        top: 13%;
        left:50%;
        transform: translate(-50%,-50%);
        color:#ffffff;
        font-size: 22px;
        padding: 23px 78px;
        cursor: pointer;
    }

    .font-bottom {
        position:absolute;
        bottom: -13%;
        left:50%;
        transform: translate(-50%,-50%);
        color:#ffffff;
        font-size: 22px;
        padding: 23px 78px;
        cursor: pointer;
    }

    .font-left {
        position:absolute;
        top: 50%;
        left:13%;
        transform: translate(-50%,-50%);
        color:#ffffff;
        font-size: 22px;
        padding: 78px 23px;
        cursor: pointer;
    }

    .font-right {
        position:absolute;
        top: 50%;
        right:-13%;
        transform: translate(-50%,-50%);
        color:#ffffff;
        font-size: 22px;
        padding: 78px 23px;
        cursor: pointer;
    }

    .p-btn i {
        font-size: 22px;
    }

    .p-btn > * {
        position:relative;
        z-index: 1;
    }

    .p-btn::after {
        /* content: ""; */
        margin: 5px;
        box-shadow: 0px 0px 1px #1df2fa;
        position:absolute;
        width: calc(100% - 10px);
        height: calc(100% - 10px);
        top: 0;
        left: 0;
        background: #233239cc;
    }

    .p-btn {
        color: #11ddff;
        width: 75px;
        height: 75px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .MP:hover > .removeSpeed , .MP:hover > .addSpeed {
        display: block;
    }

    .removeSpeed {
        display: none;
        position:absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 15px;
        color: #ffffff;
        cursor: pointer;
    }

    .addSpeed {
        display: none;
        position:absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 15px;
        color: #ffffff;
        cursor: pointer;
    }

    .fangxiangpan {
        /* position: absolute; */
        /* width: 300px; */
        height: 230px;
        bottom: 0;
        left: 8px;
        background: #131f2dA8;
    }

    .head::after {
        content: "";
        position: absolute;
        left: 0;
        height: 3px;
        width: 3px;
        bottom: -2px;
        background:#487bc4;
        z-index: 122;
    }

    .head::before {
        content: "";
        position: absolute;
        right: 0;
        height: 3px;
        width: 10px;
        bottom: -2px;
        background:#487bc4;
        z-index: 122;
    }

    .head {
        padding: 8px 0px;
        position: relative;
        /* background: #01afc51c; */
        border-bottom: solid 1px #fff;
        margin: 0px 14px;
    }

    .name {
        display: flex;
        align-items: center;
        color:#ffffff;
    }

    .speed {
        width: 36px;
        position: absolute;
        right: 35px;
        height: 165px;
        top: 50px;
    }

    .speedValue {
        text-align: center;
        color: #ffffff;
        padding: 5px;
        position: absolute;
        width: 94px;
        bottom: 0;
        left: -30px;
    }
</style>