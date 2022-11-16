<template>
    <div class="tab-page">
        <ul>
            <li>
                <div class="li-left">
                    <img src="@/assets/resume/icon38.png">
                    <span>农事展示：</span>
                </div>
                <div class="li-right">
                    <el-checkbox label="启用" v-model="nszsVal"></el-checkbox>
                    <div class="set-txt" @click="handleSet('农事展示', 'nszs',nszsVal)">设置></div>
                </div>
            </li>
            <li>
                <div class="li-left">
                    <img src="@/assets/resume/icon41.png">
                    <span>实时视频：</span>
                </div>
                <div class="li-right">
                    <el-checkbox label="启用"></el-checkbox>
                </div>
            </li>
            <li>
                <div class="li-left">
                    <img src="@/assets/resume/icon44.png">
                    <span>视频追溯：</span>
                </div>
                <div class="li-right">
                    <el-checkbox label="启用"></el-checkbox>
                </div>
            </li>
            <li>
                <div class="li-left">
                    <img src="@/assets/resume/icon22.png">
                    <span>环境实况：</span>
                </div>
                <div class="li-right">
                    <el-checkbox label="启用"></el-checkbox>
                </div>
            </li>
            <li>
                <div class="li-left">
                    <img src="@/assets/resume/icon38.png">
                    <span>生育期：</span>
                </div>
                <div class="li-right">
                    <el-checkbox label="启用" v-model="syqVal"></el-checkbox>
                    <div class="set-txt" @click="handleSet('选择生育期样式', 'syq',syqVal)">设置></div>
                </div>
            </li>
        </ul>
        <aform ref="logoform" :title="title" :type="type" />
    </div>
</template>
<script>
import aform from "../module/add-form";
export default {
    components: {
        aform
    },
    data(){
        return{
            title: "",
            type: "",
            nszsVal:"", //农事展示
            syqVal:"",  //生育期
        }
    },
    methods: {
        handleSet(title, type,selectState) {
            if(!selectState){
                return false;
            }
            this.title = title;
            this.type = type;
            let self = this;
            setTimeout(() => {
                if(type==='nszs'){
                self.$refs.logoform.width="600px"
                }
                self.$refs.logoform.onOpened();
            }, 50);
        }
  }
}
</script>

<style lang="scss" scoped>
.tab-page{
    padding: 14px;
}
.tab-page ul{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
.tab-page ul li{
    width: 49%;
    height: 34px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 4px;
    margin-bottom: 20px;
    border-radius: 5px;
    border: 1px solid #f1f2f6;
    box-sizing: border-box;
    font-size: 12px;
    color: #666;
}
.tab-page ul li .li-left {
    display: flex;
    height: 34px;
    align-items: center;
}
.tab-page ul li .li-left span{
    display: block;
    margin-top: 4px;
}
.tab-page ul li .li-left img{
    display: block;
    margin-right: 4px;
}
.tab-page ul li .set-txt{
    color: #599ad1;
    margin-left: 10px;
    cursor: pointer;
}
.li-right{
    height: 100%;
    display: flex;
    align-items: center;
}
/deep/.el-checkbox__label{
    font-size: 12px;
}
</style>