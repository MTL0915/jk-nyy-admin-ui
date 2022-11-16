<template>
    <div class='real_monitor_right_vue'>
        
        <!-- 切换模式按钮组 -->
        <comp-modetabs></comp-modetabs>

        <!-- 导航模式 -->
        <comp-navigation></comp-navigation>

    </div>
</template>

<script>
import compNavigation from './navigation'
import compModetabs from './modeTabs'
export default {
    components: {
        compNavigation,
        compModetabs
    }
}
</script>

<style scoped>
    .real_monitor_right_vue {
        position: absolute;
        right: 0;
        top: 0;
        /* height: calc(100% - 12px); */
        width: 100%;
        /* margin: 6px; */
        /* border: solid 1px #ffffff; */
        display: flex;
        flex-direction: column;
    }
</style>