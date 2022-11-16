<template>
    <div class='headTabs'>
        <div @click='select(1)' :class='{active:active==1}' v-show="videoCameraShow">
            <i class='el-icon-video-camera'></i>
            <span>实时监控</span>
        </div>
        <div @click='select(2)' :class='{active:active==2}' v-show="taskDivShow">
            <i class='el-icon-tickets'></i>
            <span>任务管理</span>
        </div>
        <div @click='showConfig' :class='{active:active==3}'>
            <i class='el-icon-tickets'></i>
            <span>参数配置</span>
        </div>
    </div>
</template>

<script>

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
            default: 1
        },
    },
    data (){
        return {
            // active: 1,
        }
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
        select (n){
            if( !this.isTaskGo() ) return;
            this.$parent.headActive = n;
            this.active = n;
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