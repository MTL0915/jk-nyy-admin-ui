<template>
    <!-- 任务管理模块 -->
    <div class='real_taskManagements_vue'>
        
        <!-- 头部 -->
        <comp-taskheadportrait></comp-taskheadportrait>

        <!-- 模式切换列表 -->
        <comp-modetabs></comp-modetabs>

        <!-- 设备的任务列表模板 -->
        <comp-tasklists></comp-tasklists>

        <!-- 设备任务编辑模板 -->
        <comp-taskedit></comp-taskedit>

        <!-- 设备任务新增模板 -->
        <comp-taskadd></comp-taskadd>

        <!-- 任务路段作业列表 -->
        <comp-pathlist></comp-pathlist>

    </div>
</template>

<script>
import compTaskheadportrait from "./comps/taskHeadPortrait"
import compModetabs from './comps/modeTabs'
import compTasklists from './comps/taskLists'
import compTaskedit from './comps/taskEdit'
import compTaskadd from './comps/taskAdd'
import compPathlist from './comps/pathList'
export default {
    components: {
        compTaskheadportrait,
        compModetabs,
        compTasklists,
        compTaskedit,
        compTaskadd,
        compPathlist
    }
}
</script>

<style scoped>
    .real_taskManagements_vue {
        
    }
</style>