<template>
    <!-- 任务详细列表 -->
    <div class='taskListInfo'>
        <!-- 头部 -->
        <div></div>
        <!-- 列表 -->
        <div>
            <el-table :data="tableData" :height="tableHeight" border style="width: 100%"> 
                <el-table-column prop="taskName" label="日期" width="180"> </el-table-column>
                <el-table-column prop="name" label="姓名" width="180"> </el-table-column> 
                <el-table-column prop="address" label="地址"> </el-table-column> 
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
    data (){
        return {
            tableHeight: window.innerHeight - 35,
            tableData: [{
                taskName: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }]
        }
    }
}
</script> 

<style scoped>
    .taskListInfo {
        position:absolute;
        top: 35px;
        bottom:0;
        left:0;
        right:0;
    }
</style>