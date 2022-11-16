<template>
    <div class='real_monitor_vue'>
        <!-- 设备状态栏 -->
        <comp-headportrait v-show="false"></comp-headportrait>

        <!-- 设备信息列表 -->
        <comp-deviceinfolist v-show="false"></comp-deviceinfolist>
        
        <!-- 设备控制界面 -->
        <comp-realmonitorcontrol v-show="false"></comp-realmonitorcontrol>
    </div>
</template>

<script>
import compHeadportrait from "./headPortrait"
import compDeviceinfolist from './deviceInfoList'
import compRealmonitorcontrol from './realMonitorControl'
export default {
    components: {
        compHeadportrait,
        compDeviceinfolist,
        compRealmonitorcontrol
    }
}
</script>

<style scoped>
    .real_monitor_vue {
        position: absolute;
        left: 0;
        top: 0;
        height: calc(100% - 12px);
        width: 300px;
        margin: 6px;
        /* border: solid 1px #ffffff; */
        display: flex;
        flex-direction: column;
    }
</style>