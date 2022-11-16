<template>
    <el-dialog
        title="全景图配置"
        :modal-append-to-body="false"
        :append-to-body="false"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <el-select v-model="value" placeholder="请选择全景图">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="queding">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { getCameraById } from '../../vr/data/camera.js'
export default {
    data() {
      return {
        dialogVisible: false,
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
        fn : null
      };
    },
    mounted (){
        getCameraById("all",(data)=>{
            this.options = data.map((e)=>{ return {label:e.info.name,value:e.info.id}; })
        })
    },
    methods: {
        show (fn) {
            this.value = "";
            this.dialogVisible = true;
            this.fn = fn;
        },
        hide (){
            this.dialogVisible = false;
        },
        handleClose(done) {
            this.$confirm('确认放弃创建吗？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },
        queding (){
            this.hide();
            this.fn && this.fn(this.value);
        }
    }
};
</script>

<style>

</style>