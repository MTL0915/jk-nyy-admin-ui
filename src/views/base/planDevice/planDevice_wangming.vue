<template>
    <div class='plan_device_vue'>

        <!-- 地图模块 主要作用于地图显示 -->
        <comp-devicemap></comp-devicemap>

        <!-- 实时监控模式 -->
        <comp-realMonitor v-show='showRealMonitor'></comp-realMonitor>

        <!-- 任务管理模式 -->
        <comp-taskmanagements v-show='showTaskmanagements'></comp-taskmanagements>

        <!-- 设备配置模式 -->
        <comp-configuration v-show='showConfiguration'></comp-configuration>

    </div>
</template>

<script>
import compDevicemap from './comps/map/deviceMap'
import compRealMonitor from './comps/realMonitor/realMonitor'
import compTaskmanagements from './comps/taskmanagementswm/taskmanagements'
import compConfiguration from './comps/deviceConfiguration/configuration'

import bus from './util/bus'

import { getToken, setToken, removeToken } from '@/utils/auth'

export default {
    components: {
        compDevicemap,
        compRealMonitor,
        compTaskmanagements,
        compConfiguration
    },
    data (){
        return {
            showRealMonitor: true,
            showTaskmanagements: false,
            showConfiguration: false,

            prev: "showRealMonitor"
        }
    },
    mounted (){
        bus.$on("home_showRealMonitor",()=>{ 
            this.showRealMonitor = true;
            this.showTaskmanagements = false;
            this.showConfiguration = false;
            this.prev = "showRealMonitor";
        })
        bus.$on("home_showTaskmanagements",()=>{ 
            this.showRealMonitor = false;
            this.showTaskmanagements = true;
            this.showConfiguration = false;
            this.prev = "showTaskmanagements";
        })
        bus.$on("home_showConfiguration",()=>{ 
            this.showRealMonitor = false;
            this.showTaskmanagements = false;
            this.showConfiguration = true;
        })
        bus.$on("home_backConfiguration",()=>{
            this.showRealMonitor = false;
            this.showTaskmanagements = false;
            this.showConfiguration = false;
            this[this.prev] = true;
        })
        
        // 判断是否存在token
        var token = this.$route.query.token;
        if( token && !getToken() ){
            setToken(token);
            // 然后刷新自己
            location.reload();
        }
    },

    methods: {


    }
}
</script>

<style scoped>
    .plan_device_vue {
        height: 100%;
    }
</style>