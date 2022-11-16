<template>
    <div>
        <!-- 阀门开关管理 -->
        <div v-if='type==1' ref='btn' class='asdasd' @mousedown="clickBtn" @touchstart='clickBtn'>
            <div :class='sensor.value == 1 ?"zpy":"bj"' >
                <img style="width: 18px;vertical-align: middle;" v-if="sensor.value == 1" :src='require("@/assets/img/Plan/drawLineMap/qp/open_status1.png")' />
                <img style="width: 18px;vertical-align: middle;" v-if="sensor.value != 1" :src='require("@/assets/img/Plan/drawLineMap/qp/close_status1.png")' />
                {{sensor.name}} 
                <i style='color:#000000' v-show='loadings' class='el-icon-loading'></i> 
            </div>
        </div>
        <!-- 阀门开关管理 -->
        <div v-if='type==2 && sensor_type_codes.indexOf(sensor.hd_sensor_type_function_code) == -1' ref='btn' style='display:flex;position: relative;'>
            <div :class='{ zpy: sensor.value == 8, bj: sensor.value == 10 || sensor.value == 9 ,sensor_btn_continued: sensor.value == 8  }' @mousedown='clickDown(8)'>
                {{sensor.name + "1"}}
                <i style='color:#000000' v-show='loadings_2_1' class='el-icon-loading'></i>
            </div>
            <div :class='{ zpy: sensor.value == 9, bj: sensor.value == 10 || sensor.value == 8 ,sensor_btn_continued: sensor.value == 9  }' @mousedown='clickDown(9)'>
                {{sensor.name + "2"}}
                <i style='color:#000000' v-show='loadings_2_1' class='el-icon-loading'></i>
            </div>
        </div>
        <!-- KG_MACHINE -->
        <div v-if='type==2 && sensor.hd_sensor_type_function_code === "KG_MACHINE"' ref='btn' style='display:flex;position: relative;'>
            <div :class='{ zpy: sensor.value == 8, bj: sensor.value == 10 || sensor.value == 9 ,sensor_btn_continued: sensor.value == 8  }' 
                @mousedown='down_KG_MACHINE(8)'
                @mouseup='up_KG_MACHINE(8)'
                @mouseout="out_KG_MACHINE()">
                {{"上升"}}
                <i style='color:#000000' v-show='loadings_2_1' class='el-icon-loading'></i>
            </div>
            <div :class='{ zpy: sensor.value == 9, bj: sensor.value == 10 || sensor.value == 8 ,sensor_btn_continued: sensor.value == 9  }'
                @mousedown='down_KG_MACHINE(9)'
                @mouseup='up_KG_MACHINE(9)'
                @mouseout="out_KG_MACHINE(9)"
                >
                {{"下降"}}
                <i style='color:#000000' v-show='loadings_2_1' class='el-icon-loading'></i>
            </div>
        </div>
    </div>
</template>

<script>
// 创建一个全局的计时器集合对象
if( !window.sensor_btn_vue_timer ){
    window.sensor_btn_vue_timer = [];
};

import ws from '../../../websocket/py_ws'

export default {
    props: {
        // 阀门传感器对象
        sensor: {
            type: Object,
            default: ()=>{}
        },
        // 发送的间隔
        speed: {
            type: Number,
            default: 100
        },
        // 是否允许控制
        isopt: {
            type: Boolean,
            default: false
        },
        info: {
            type: Object,
            default: ()=>{}
        }
    },
    watch: {
        "sensor.value" (){
            this.loadings = false;
        }
    },
    data (){
        return {
            type: 0,
            loadings: false,
            // 三档开关持续开启效果 1号键
            loadings_2_1: false,
            // 三档开关持续开启效果 2号键
            loadings_2_2: false,
            // 二挡开关计时器
            btn_2_key: null,
            // 三挡开关计时器
            btn_3_key: null,
            // 特殊字段处理的集
            sensor_type_codes: ["KG_MACHINE"]
        }
    },
    mounted (){
        this.type = this.getType();
    },
    methods: {

        getWs (){
            return ws.get();
        },

        // 清除计时器
        clearTimer (){
            // 清除二挡开关特效
            this.loadings = false;
            // 清除二挡开关计时器
            clearInterval(this.btn_2_key);
            this.btn_2_key = null;

            // 清除三挡开关特效
            this.loadings_2_1 = false;
            this.loadings_2_2 = false;
            // 清除三挡开关计时器
            clearInterval(this.btn_3_key);
            this.btn_3_key = null;
        },

        // 获取开关类型
        getType (){
            if( this.sensor.hd_sensor_type_code == '101' ){
                // 二挡开关
                return 1;
            }else if( this.sensor.hd_sensor_type_code == '102' ){
                // 三挡开关
                return 2;
            }
            return 1
        },

        // 电源开关
        clickDianYuan (){
            
        },

        // 按下一档开关
        clickBtn (){

            // 判断电源是否启动
            if( !this.isopt ){
                 this.$message({
                    message: '电源还未启动，请先启动电源！',
                    type: 'warning'
                });
                return;
            }
            if( this.info.controlType === 3 ){
                // 如果设备是处于离线状态则无法控制
                 this.$message({
                    message: '该设备正在现场控制 无法远程控制。',
                    type: 'warning'
                });
                return ;
            }
            if( this.info.property_values.nav_cmd === 5 ){
                // 如果设备是处于现场控制状态则无法控制
                 this.$message({
                    message: '该设备正在执行任务中 无法远程控制。如果需要请先退出任务！',
                    type: 'warning'
                });
                return ;
            }
            // 判断是否是等待状态中 
            if( this.loadings === true ) return;
            // 将点击状态变为等待中
            this.loadings = true;
            // 获取当前阀门对象数据
            var it = this.sensor;
            // 获取当前控制的websocket对象
            var ws = this.getWs();
            // 获取值的对象
            var value = this.info.channelValue[it.channel-1]; //it.value;
            // 判断是开 还是关
            if( value == 1 ){
                // 如果这个开关是开着的  则关闭
                ws.sendOff(it,true).then((res)=>{
                    this.loadings = false;
                    this.$message({
                        type: "success",
                        message: res.msg
                    })
                }).catch((res)=>{
                    this.loadings = false;
                    this.$message({
                        type: "error",
                        message: res.msg
                    }) 
                });;
            }else{
                // 如果这个开关是关着的  则开启
                ws.sendOn(it,true).then((res)=>{
                    this.loadings = false;
                    this.$message({
                        type: "success",
                        message: res.msg
                    })
                }).catch((res)=>{
                    this.loadings = false;
                    this.$message({
                        type: "error",
                        message: res.msg
                    })
                });;
            }
        },


        // 普通的3挡开关控制
        down_3 (){
            // 判断电源是否启动
            if( !this.isopt ){
                 this.$message({
                    message: '电源还未启动，请先启动电源！',
                    type: 'warning'
                });
                return;
            }
            if( this.info.controlType === 3 ){
                // 如果设备是处于离线状态则无法控制
                 this.$message({
                    message: '该设备正在现场控制 无法远程控制。',
                    type: 'warning'
                });
                return ;
            }
            if( this.info.property_values.nav_cmd === 5 ){
                // 如果设备是处于现场控制状态则无法控制
                 this.$message({
                    message: '该设备正在执行任务中 无法远程控制。如果需要请先退出任务！',
                    type: 'warning'
                });
                return ;
            }
            if( this.loadings_2_1 === true ) return;
            // 获取阀门数据
            var it = this.sensor;
            // 获取websocket对象
            var ws = this.getWs();
            // 判断ws是否存在不存在不执行
            if( !ws ) return;
            // 获取当前阀门按钮的值
            var value = this.info.channelValue[it.channel-1]; //it.value;
            // 记录下这个计时器已经在运行了防止二次点击
            it.isTimer = true;
            // 判断值是开还是关 由此来判断是要关闭还是开启
            if( val == 8 && value != val ){
                // 标注为
                // this.loadings_2_1 = true;
                // 开启设备
                ws.sendOn(it,true).then((res)=>{
                    // this.loadings_2_1 = false;
                }).then((res)=>{
                    // this.loadings_2_1 = false;
                });;
            }else if( val == 9 && value != val ){
                this.loadings_2_2 = true;
                // 关闭设备
                ws.sendOff(it,true).then((res)=>{
                    // this.loadings_2_2 = false;
                }).catch((res)=>{
                    // this.loadings_2_2 = false;
                });
            }else {
                ws.sendStop(it,true).then((res)=>{
                    // this.loadings_2_1 = false;
                }).catch((res)=>{
                    // this.loadings_2_1 = false; 
                });
                this.loadings_2_1 = false; 
                // 清除三挡开关计时器
                clearInterval(this.btn_3_key);
                this.btn_3_key = null;
                return;
            }
            // 按下按钮后不断的开始请求
            if( this.btn_3_key ){
                // 清除三挡开关计时器
                clearInterval(this.btn_3_key);
                this.btn_3_key = null;
            }
            this.btn_3_key = setInterval(()=>{
                // 判断内心是开 还是关
                if( val == 8 ){
                    // 开启设备
                    ws.sendOn(it,true).then((res)=>{
                        // this.loadings_2_1 = false;
                    }).catch((res)=>{
                        // this.loadings_2_1 = false;
                    });;
                }else if( val == 9 ){
                    // 关闭设备
                    ws.sendOff(it,true).then((res)=>{
                        // this.loadings_2_1 = false;
                    }).catch((res)=>{
                        // this.loadings_2_1 = false;
                    });
                }
            },this.speed)
        },


        // 开沟施肥机 3当开关控制
        down_KG_MACHINE (val){
            // 判断电源是否启动
            if( !this.isopt ){
                 this.$message({
                    message: '电源还未启动，请先启动电源！',
                    type: 'warning'
                });
                return;
            }
            if( this.info.controlType === 3 ){
                // 如果设备是处于离线状态则无法控制
                 this.$message({
                    message: '该设备正在现场控制 无法远程控制。',
                    type: 'warning'
                });
                return ;
            }
            if( this.info.property_values.nav_cmd === 5 ){
                // 如果设备是处于现场控制状态则无法控制
                 this.$message({
                    message: '该设备正在执行任务中 无法远程控制。如果需要请先退出任务！',
                    type: 'warning'
                });
                return ;
            }
            if( this.loadings_2_1 === true ) return;
            // 获取阀门数据
            var it = this.sensor;
            // 获取websocket对象
            var ws = this.getWs();
            // 判断ws是否存在不存在不执行
            if( !ws ) return;
            // 获取当前阀门按钮的值
            var value = this.info.channelValue[it.channel-1]; //it.value;
            // 记录下这个计时器已经在运行了防止二次点击
            it.isTimer = true;
            // 判断值是开还是关 由此来判断是要关闭还是开启
            if( val == 8 && value != val ){
                // 标注为
                // this.loadings_2_1 = true;
                // 开启设备
                ws.sendOn(it,true).then((res)=>{
                    // this.loadings_2_1 = false;
                }).catch((res)=>{
                    // this.loadings_2_1 = false;
                });;
            }else if( val == 9 && value != val ){
                this.loadings_2_2 = true;
                // 关闭设备
                ws.sendOff(it,true).then((res)=>{
                    // this.loadings_2_2 = false;
                }).catch((res)=>{
                    // this.loadings_2_2 = false;
                });
            }else {
                ws.sendStop(it,true).then((res)=>{
                    // this.loadings_2_1 = false;
                }).catch((res)=>{
                    // this.loadings_2_1 = false; 
                });
                this.loadings_2_1 = false; 
                // 清除三挡开关计时器
                clearInterval(this.btn_3_key);
                this.btn_3_key = null;
                return;
            }
            // 按下按钮后不断的开始请求
            if( this.btn_3_key ){
                // 清除三挡开关计时器
                clearInterval(this.btn_3_key);
                this.btn_3_key = null;
            }
            this.btn_3_key = setInterval(()=>{
                // 判断内心是开 还是关
                if( val == 8 ){
                    // 开启设备
                    ws.sendOn(it,true).then((res)=>{
                        // this.loadings_2_1 = false;
                    }).catch((res)=>{
                        // this.loadings_2_1 = false;
                    });;
                }else if( val == 9 ){
                    // 关闭设备
                    ws.sendOff(it,true).then((res)=>{
                        // this.loadings_2_1 = false;
                    }).catch((res)=>{
                        // this.loadings_2_1 = false;
                    });
                }
            },this.speed)
        },

        up_KG_MACHINE (){
            this.btn_3_key && clearInterval( this.btn_3_key );
            this.btn_3_key = null;
        },

        out_KG_MACHINE (){
            this.btn_3_key && clearInterval( this.btn_3_key );
            this.btn_3_key = null;
        },

        // 如果按下二档开关
        // 老本版长按功能按钮
        clickDown_bak (){

            // 判断电源是否启动
            if( !this.isopt ){
                 this.$message({
                    message: '电源还未启动，请先启动电源！',
                    type: 'warning'
                });
            }

            this.loadings = true;
            var it = this.sensor;
            var ws = this.getWs();
            if( !ws ) return;
            var value = it.value;
            // 记录一下这个计时器已经在执行了
            it.isTimer = true;
            // 判断内心是开 还是关
            if( value == 1 ){
                // 如果这个开关是开着的  则关闭
                ws.sendOff(it);
                console.log("sendOff")
            }else{
                // 如果这个开关是关着的  则开启
                ws.sendOn(it);
                console.log("sendOn")
            }
            // 按下按钮后不断的开始请求
            var key = setInterval(()=>{
                // 判断内心是开 还是关
                if( value == 1 ){
                    // 如果这个开关是开着的  则关闭
                    ws.sendOff(it);
                    console.log("sendOff")
                }else{
                    // 如果这个开关是关着的  则开启
                    ws.sendOn(it);
                    console.log("sendOn")
                }
            },this.speed)
            // 获取触发事件元素
            var dom = this.$refs.btn;
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
                // this.$refs.control.stopWindow(it.hd_device_sensor_id);
                // console.log("stopWindow")
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
                // this.$refs.control.stopWindow(it.hd_device_sensor_id);
                // console.log("stopWindow")
            }
            dom.addEventListener("mouseover",domMouseOver)
        },
    }
}
</script>

<style scoped>
    .zpy {
        padding: 12px 24px;
        color: #ffffff;
        font-size: 12px;
        background: #1d3443;
        border-radius: 4px;
        white-space: nowrap;
        cursor: pointer;
        box-shadow: 0px 0px 18px #59aae2;
    }
    .bj {
        padding: 12px 24px;
        color: #ffffff;
        font-size: 12px;
        background: #1d3443;
        border-radius: 4px;
        white-space: nowrap;
        cursor: pointer;
    }
</style>
<style>
    /* 持续运行的按钮状态 */
    .sensor_btn_continued::before, .sensor_btn_continued::after {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }    
    .sensor_btn_continued {
        position: relative;   
    }
    .sensor_btn_continued::before, .sensor_btn_continued::after {
        content: '';
        z-index: 0;
        /* margin: -5%; */
        box-shadow: inset 0 0 0 2px #ff0000;
        animation: clipMe 8s linear infinite;
    }
    .sensor_btn_continued::before {
        animation-delay: -4s;
    }
    .sensor_btn_continued:hover::after, .sensor_btn_continued:hover::before {
        /* background-color: rgba(0, 107, 247, 0.973); */
    }
    @keyframes clipMe {
        0%, 100% {
            clip: rect(0px, 58px, 2px, 0px);
        }
        25% {
            clip: rect(0px, 2px, 29px, 0px);
        }
        50% {
            clip: rect(27px, 58px, 29px, 0px);
        }
        75% {
            clip: rect(0px, 58px, 29px, 56px);
        }
    }
</style>