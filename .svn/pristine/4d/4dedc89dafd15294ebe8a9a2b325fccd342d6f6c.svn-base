<template>
    <div class='noManList'>
        <div class='modol'>
            <img class='bg' :src='require("@/assets/planDeviceNew/info_bg.png")' />
            <img class='yuan' :src='require("@/assets/planDeviceNew/info_yuan.png")' />
            <img class='jwd' :src='require("@/assets/planDeviceNew/info_jwd.png")' />
            <div class='box'>
                <div>
                    <span>41°46'</span>
                    <span style='font-size:12px;'>N</span>
                </div>
                <div>
                    <span>50°14'</span>
                    <span style='font-size:12px;'>W</span>
                </div>
            </div>
        </div>

        <div class='modol'>
            <img class='bg' :src='require("@/assets/planDeviceNew/info_bg.png")' />
            <img class='yuan' :src='require("@/assets/planDeviceNew/info_yuan.png")' />
            <img class='jwd' :src='require("@/assets/planDeviceNew/info_jwd.png")' />
            <div class='box'>
                <div>
                    <span>设备状态：</span>
                </div>
                <div>
                    <span>在线</span>
                </div>
            </div>
        </div>

        <div class='modol'>
            <img class='bg' :src='require("@/assets/planDeviceNew/info_bg.png")' />
            <img class='yuan' :src='require("@/assets/planDeviceNew/info_yuan.png")' />
            <img class='jwd' :src='require("@/assets/planDeviceNew/info_jwd.png")' />
            <div class='box'>
                <div>
                    <span>模式：</span>
                </div>
                <div>
                    <span>远程手动控制</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ws from "../websocket/py_ws.js"
export default {
    props: {
        
    },
    data (){
        return {
            // updateInfo : {}
            controlType: ["底线安全策略","远程手动控制","条件逻辑控制","现场控制"],
            nav_cmd: ["暂无","命令设备开始连续记录位置点","命令设备结束连续记录位置点","命令设备记录单个位置点","从服务器下载目标路径到设备里","启动自动航行","停止自动导航","向服务器上传设备里已保存的位置点","清空设备里已保存的位置点"],
            updateInfo: {},
            property_values: {},
            sensorInfos: []
        }
    },
    mounted (){
        this.createWebsocket();
    },
    methods: {
    
        /* 开始建立websocket链接 */
        createWebsocket (){
            // 创建ws的实例化对象
            this.ws = ws.get();
            // 绑定上报事件
            this.wsUploadSta = this.ws.onUploadSta(this.deviceWsUpdateFunction);
        },

        deviceWsUpdateFunction (result){
            this.updateInfo = result.data;
            this.sensorInfos = result.data.sensorInfos;
            this.property_values = result.data.property_values;
        }

    }
}
</script>


<style scoped>

    .noManList {
        /* padding: 12px; */
        /* background: #131f2dA8; */
        color: #bfe0e4;
        z-index: 1000;
        /* height: 100%; */
        position: absolute;
        top: 250px;
        left: 70px;
        width: 350px;
    }

    .modol {
        /* padding: 12px; */
        position: relative;
    }

    .bg {
        position: absolute;
        top: 5px;
        width: 100%;
        height: calc(100% - 10px);
        left: 30px;
    }

    .yuan {
        position: relative;
    }

    .jwd {
        position: absolute;
        left: 11px;
        top: 13px;
    }

    .box {
        font-size: 23px;
        left: 65px;
        height: 100%;
        position: absolute;
        top: 0;
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: calc(100% - 110px);
    }

</style>