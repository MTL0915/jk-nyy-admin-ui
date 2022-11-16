<template>
    <div class='headTabs' v-show='isShow'>
        <div @click='select1' :class='{active:active==1}' v-show="videoCameraShow">
            <i class='el-icon-video-camera'></i>
            <span>实时监控</span>
        </div>
        <div :class='{active:active==2}' v-show="taskDivShow">
            <i class='el-icon-tickets'></i>
            <span>任务管理</span>
        </div>
        <div @click='select3' :class='{active:active==3}'>
            <i class='el-icon-tickets'></i>
            <span>参数配置</span>
        </div>
    </div>
</template>

<script>
import bus from '../../../util/bus'
export default {
    props: {
        videoCameraShow: {
            type: Boolean,
            default: true
        },
        taskDivShow: {
            type: Boolean,
            default: true
        },
        active: {
            type: Number,
            default: 2
        },
    },
    data (){
        return {
            // active: 1,
            isShow: true
        }
    },
    mounted (){
        bus.$on("modeTab_show",()=>{ this.isShow = true })
        bus.$on("modeTab_hide",()=>{ this.isShow = false })
    },
    methods: {
        // 判断正在导航模式中
        isTaskGo(){
            if( this.$parent.property_values.nav_cmd == 5 ){
                // 如果正在导航中
                this.$message({
                    type: "warnning",
                    message: "正在导航中，无法切换，请先关闭导航任务！"
                })
                return false
            }
            return true;
        },
        // 显示配置信息
        showConfig (){
            if( !this.isTaskGo() ) return;
            // this.active = 3;
            this.$parent.showConfigEdit = true;
        },
        select1 (n){
            bus.$emit("home_showRealMonitor");
            this.switchMode()
        },
        select3 (){
            bus.$emit("home_showConfiguration");
            bus.$emit("configuration_refresh");
            this.switchMode()
        },
        switchMode (){
            bus.$emit("taskEdit_switchMode")
            bus.$emit("taskAdd_switchMode")
            bus.$emit("pathlist_switchMode")
            bus.$emit("taskList_switchMode")
        }
    }
}
</script>

<style scoped>
    .drawLineHead {
        position: absolute;
        width: 100%;
        background: #000000A8;
        height: 35px;
        line-height: 35px;
        top: 0;
        z-index: 9;
    }

    .headTabs {
        display: flex;
        position: absolute;
        color:#3aacff;
        right: 4px;
        top: 6px;
        background: #131f2dA8;
        z-index: 99;
    }

    .headTabs > div.active {
        color: #ffffff;
        background: #517fa1A8;
        border-bottom: solid 1px #3aacff;
    }

    .headTabs > div {
        padding: 14px 9px;
        font-size: 14px;
        font-weight: 800;
        cursor: pointer;
    }
</style>