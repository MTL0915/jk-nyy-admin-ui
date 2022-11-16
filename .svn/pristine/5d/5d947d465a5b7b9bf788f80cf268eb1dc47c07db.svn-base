<template>
    <!-- 报警之后提示是否终止任务 -->
    <el-dialog
        title="障碍物报警"
        :visible.sync="dialogVisible"
        width="30%">
        <span>在执行中遇到了障碍物 是否停止任务？</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">知道了</el-button>
            <el-button type="primary" @click="stopTask">停止任务</el-button>
        </span> 
    </el-dialog>
</template>

<script>
export default {
    props: {
        property_values: {
            type: Object,
            default: ()=> {}
        }
    },
    watch: {
        property_values (res){
            // 判断设备报警状态 和 是否处在任务中
            if( res.rd_sta === 1 && res.nav_cmd === 5 ) {
                this.dialogVisible = true;
            }else{
                this.dialogVisible = false;
            }
        }
    },
    data() {
      return {
        dialogVisible: false
      };
    },
    methods: {
        stopTask (){
            // 停止任务
            this.$parent.ws.cancelInstructions();
            // 隐藏这个弹窗
            this.dialogVisible = false
        }
    }
};
</script>

<style>

</style>