<template>
    <div class='addTask'>
         <!-- 头部 -->
        <div class='addTaskHead'>
            <img :src='require("@/assets/img/Plan/drawLineMap/shebei.png")' />
            <span>添加路段</span>
        </div>
        <!-- 身体 -->
        <div class=''>
            <div class='addTaskModel'>
                <div class='addTaskModelName'>设备名称：</div>
                <div>{{form.deviceName}}</div>
            </div>
            <div class='addTaskModel'>
                <div class='addTaskModelName'>任务名称：</div>
                <div><input type='text' v-model="form.taskName" /></div>
            </div>
            <div class='addTaskModel'>
                <div class='addTaskModelName'>任务类型：</div>
                <div>
                    <select class='taskType' v-model="form.taskType">
                        <option>喷药</option>
                        <option>喷药</option>
                        <option>喷药</option>
                        <option>喷药</option>
                    </select>
                </div>
            </div>
            <div class='addTaskModel'>
                <div class='addTaskModelName'></div>
                <div class=''>当前剩余：12.9L </div>
            </div>
            <div class='addTaskModel'>
                <div class='addTaskModelName'>操作模式</div>
                <div class='flex width'>
                    <el-radio-group v-model="form.mode">
                        <el-radio :label="1">手动</el-radio>
                        <el-radio :label="2">自动</el-radio>
                    </el-radio-group>
                </div>
            </div>
            <div class='addTaskModel'>
                <div class='addTaskModelName'>操作机手：</div>
                <div>
                    <select class='taskType' v-model="form.czjs">
                        <option>廖威仲</option>
                        <option>廖威仲</option>
                        <option>廖威仲</option>
                        <option>廖威仲</option>
                    </select>
                </div>
            </div>
            <div class='addTaskModel'>
                <div class='addTaskModelName'>作业路线：</div>
                <div>
                    <select class='taskType' style='width: 100px;' v-model="form.czjs">
                        <option>廖威仲</option>
                        <option>廖威仲</option>
                        <option>廖威仲</option>
                        <option>廖威仲</option>
                    </select>
                    <button style='padding:2px;' @click='draw' class='cur'>创建路线</button>
                </div>
            </div>
            <div class='addTaskModel'>
                <div class='addTaskModelName'>返回路线：</div>
                <div>
                    <select class='taskType' style='width: 100px;' v-model="form.czjs">
                        <option>廖威仲</option>
                        <option>廖威仲</option>
                        <option>廖威仲</option>
                        <option>廖威仲</option>
                    </select>
                    <button style='padding:2px;' class='cur'>创建路线</button>
                </div>
            </div>
        </div>

        <div class='footor'>
            <div class='save'>保存</div>
            <div class='close'>取消</div>
        </div>
    </div>
</template>

<script>
import { map3d } from "@/utils/jiankun_map";
export default {
    data(){
        return {
            form: {
                deviceName:"1号无人喷药车",
                taskName: "喷药作业",
                taskType: "喷药",
                mode: 1, //模式
                czjs: "廖威仲",
            },
            graphic: null
        }
    },
    methods: {
        // 开始绘制路径
        drawClick (){
            // 启动绘制功能
            this.draw();
        },

        draw (){
            map3d.Util.draw("polyline",(res)=>{
                // 将几何保存进入
                this.graphic = res.graphic;
            })
        },
    }
}
</script>

<style scoped>
    .addTask {
        position: absolute;
        top: 50px;
        right: 15px;
        background: #00000080;
        width: 250px;
        /* height: 250px; */
        border-radius: 6px;
        color: #fff;
        padding: 8px;
    }

    .addTaskHead {
        padding-bottom: 8px;
        margin-bottom: 8px;
    }

    .addTaskHead img {
        width: 12px;
    }

    .addTaskModel {
        display: flex;            
        padding: 8px 0;
        align-items: center;
    }
    
    .addTaskModelName {
        width: 62px;
        flex-shrink: 0; 
    }

    input[type='text'],select {
        width: 160px;
    }
    input[type='text'],select,button {
        border-radius: 4px;
    }

    .flex {
        display: flex;
        align-items: center;
        justify-content: space-around;
    }

    .width {
        width: 100%;
    }

    .cur {
        cursor: pointer;
    }

    .footor {
        display: flex;
        justify-content: space-around;
        padding: 9px;
        font-size: 12px;
        margin-top: 10px;
    }

    .save {
        padding: 6px 12px;
        background: #35a24c;
        border-radius: 4px;
        color: #ffffff;
        font-size: 12px;
        cursor: pointer;
    }

    .close {
        padding: 6px 12px;
        background: #ffffff;
        border-radius: 4px;
        color: #4e4d4d;
        font-size: 12px;
        cursor: pointer;
    }
</style>