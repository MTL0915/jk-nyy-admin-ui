<template>
    <div class="resume-page">
        <div class="page-left">
            <div class="page-left-title">
                <img src="@/assets/resume/icon67.png">
                <h3>履历列表</h3>
            </div>
            <div class="left-search-box">
                <el-input
                    placeholder="请输入内容"
                    suffix-icon="el-icon-search"
                    v-model="listSearchVal">
                </el-input>
            </div>
            <div class="left-list-box">
                <ul>
                    <li v-for="(item,i) in leftList" :key="i" :class="selectTitle===item?'active-left-title':''" @click="chooseList(item)">
                        <div class="img-icon"></div>
                        {{item}}
                    </li>
                </ul>
            </div>
        </div>
        <div class="page-right">
            <div class="right-top">
                <div class="info-icon-box">
                    <img src="@/assets/resume/info-icon.png" >
                    <h3>履历信息</h3>
                </div>
                <div class="top-btn-box">
                    <el-button type="primary">保存</el-button>
                    <el-button>删除</el-button>
                    <el-button>取消</el-button>
                </div>
            </div>
            <div class="addlv-box">
                <div class="add-left-box">
                    <div class="add-btn-box">
                        <img src="@/assets/resume/add-icon.png">
                        <span>添加履历</span>
                    </div>
                    <div>继续添加您的商品履历</div>
                </div>
                <div class="add-right-box">
                    <div class="view-box">
                        <img src="@/assets/resume/icon13.png">
                        <span>浏览量：0</span>
                    </div>
                    <div class="view-box">
                        <img src="@/assets/resume/icon14.png">
                        <span>转发量：0</span>
                    </div>
                    <div class="view-box">
                        <img src="@/assets/resume/icon15.png">
                        <span>点赞数：0</span>
                    </div>
                </div>
            </div>
            <div class="content-box">
                <div class="setinfo-box">
                    <div class="info-top-box">
                        <div class="info-top-left">
                            <div class="pro-img-box">
                                <img src="@/assets/resume/图层9.png" @click="changePic">
                            </div>
                            <div class="arrow-box">
                                <img src="@/assets/resume/up-arrow-icon.png">
                                <div class="arrow-tip">点击作物图片更改</div>
                            </div>
                        </div>
                        <div class="info-top-right">
                            <div class="input-box">
                                <el-input placeholder="请输入作物名称" v-model="zwName">
                                    <template slot="prepend">作物名称：</template>
                                </el-input>
                            </div>
                            <div class="select-box input-box">
                                <div class="select-slot">选择作物：</div>
                                <el-select v-model="selectZw" placeholder="请选择">
                                    <el-option
                                    v-for="item in zwList"
                                    :key="item"
                                    :label="item"
                                    :value="item">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                    </div>
                    <div class="tab-box">
                        <el-tabs v-model="activeName" @tab-click="handleClick">
                            <el-tab-pane label="产品信息" name="first">
                                <cpxx-tab></cpxx-tab>
                            </el-tab-pane>
                            <el-tab-pane label="生长环境" name="second">
                                <szhj-tab></szhj-tab>
                            </el-tab-pane>
                            <el-tab-pane label="生长过程" name="third">
                                <szgc-tab></szgc-tab>
                            </el-tab-pane>
                            <el-tab-pane label="品牌信息" name="fourth">
                                <ppxx-tab></ppxx-tab>
                            </el-tab-pane>
                            <el-tab-pane label="分享设置" name="fifth">
                                <fxsz-tab></fxsz-tab>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </div>
                <div class="preview-box">
                    <h3 style="text-align:center;line-height:30px">实时预览</h3>
                </div>
            </div>
        </div>
        <aform ref="logoform" :title="'作物图片'" :type="'logo'"/>
    </div>
</template>
<script>
import cpxxTab from "./components/cpxx-tab"
import szhjTab from "./components/szhj-tab"
import szgcTab from "./components/szgc-tab"
import ppxxTab from "./components/ppxx-tab"
import fxszTab from "./components/fxsz-tab"
import aform from "./module/add-form"
export default {
    components:{
        cpxxTab,
        szhjTab,
        szgcTab,
        ppxxTab,
        fxszTab,
        aform
    },
    data(){
        return{
            listSearchVal:"",
            zwName:"",
            selectZw:"",
            activeName:"first",
            zwList:["A4--西红柿--西红柿","A4--淮山--淮山","A4--玉米--玉米"],
            selectTitle:"南冷一-结球生菜-球生菜",
            leftList:["南冷一-结球生菜-球生菜","南冷二-结球生菜-球生菜","南冷三-结球生菜-球生菜","南冷四-结球生菜-球生菜","南冷五-结球生菜-球生菜","南冷-结球生菜-球生菜"]
        }
    },
    methods:{
        chooseList(title){
            this.selectTitle=title
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
        changePic(){
            let self=this
            setTimeout(()=>{
                self.$refs.logoform.onOpened();
            },50);
        }
    }
}
</script>
<style lang="scss" scoped>
.app-main{
    padding-bottom: 0;
}
.resume-page{
    width: 100%;
    // height: 100%;
    height: calc(100vh - 134px);
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
}
.page-left{
    width: 16%;
    height: 100%;
    background-color: #fff;
}
.page-right{
    width: calc(84% - 20px);
    height: 100%;
    background-color: #fff;
}
.page-left-title{
    height: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 4px;
    font-size: 14px;
    box-sizing: border-box;
    color: #333;
    background-color: #f1f2f6;
}
.page-left-title h3{
    margin-left: 4px;
}
.page-left-title img{
    display: block;
    width: 15px;
    height: 14px;
}
.left-search-box{
    margin-top: 8px;
}
.left-list-box{
    width: 100%;
    height: calc(100% - 110px);
    overflow-y: auto;
    margin-top: 10px;
}
.left-list-box ul li:first-child{
    border-top: 1px solid #e8ebf0;
}
.left-list-box ul li{
    height: 44px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    box-sizing: border-box;
    font-size: 14px;
    border-bottom: 1px solid #e8ebf0;
    cursor: pointer;
}
.left-list-box ul li .img-icon{
    display: block;
    width: 15px;
    height: 14px;
    background: url("../../assets/resume/icon-ll.png") center no-repeat;
    background-size: 100% 100%;
    margin-right: 10px;
}
.left-list-box ul li:hover,.active-left-title{
    position: relative;
    color: #fff;
    background-color: #23a0f0;
    .img-icon{
        background: url("../../assets/resume/icon-ll-xz.png") center no-repeat !important;
        background-size: 100% 100%;
    }
}
// .active-left-title::after{
//     position: absolute;
//     top: 50%;
//     right: -4px;
//     display: block;
//     content: "";
//     width: 0;
//     height: 0;
//     border-top: 5px solid transparent;
//     border-left: 10px solid #23a0f0;
//     border-bottom: 5px solid transparent;
// }

.right-top{
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #f1f2f6;
    padding: 0 10px;
}
.info-icon-box{
    display: flex;
    font-size: 14px;
}
.top-btn-box{
    width: 30%;
    display: flex;
    justify-content: flex-start;
}
.top-btn-box button{
    padding: 8px 20px;
}
.info-icon-box h3{
    margin-left: 8px;
}
.addlv-box{
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    box-sizing: border-box;
}
.add-left-box{
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #333;
    letter-spacing: 1px;
}
.add-btn-box{
    display: flex;
    width: 100px;
    height: 30px;
    align-items: center;
    justify-content: center;
    margin-right: 14px;
    border-radius: 3px;
    color: #fff;
    background-color: #23a0f0;
}
.add-btn-box img{
    display: block;
    margin-right: 10px;
}
.add-right-box{
    display: flex;
    align-items: center;
    padding-right: 10px;
}
.view-box{
    margin-left: 20px;
}
.content-box{
    width: 100%;
    height: calc(100% - 110px);
    display: flex;
    justify-content: space-between;
    padding: 10px;
    box-sizing: border-box;
}
.setinfo-box{
    width: calc(70% - 10px);
    height: 100%;
}
.preview-box{
    width: 30%;
    border: 1px solid #f1f2f6;
}
.info-top-box{
    width: 100%;
    height: 35%;
    display: flex;
    padding: 20px 4px 0;
    box-sizing: border-box;
    border: 1px solid #f1f2f6;
}
.info-top-left{
    width: 26%;
    height: 100%;
    margin-right: 30px;
}
.pro-img-box{
    width: 100%;
    height: 74%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    border: 1px solid #f1f2f6;
    border-radius: 14px;
    margin-bottom: 10px;
}
.pro-img-box img{
    width: 94%;
    height: 92%;
    border-radius: 14px;
}
.arrow-box{
    text-align: center;
}
.arrow-box .arrow-tip{
    margin-top: 8px;
    letter-spacing: 1px;
    color: #666;
}
.info-top-right{
    width: 50%;
    padding-top: 14px;
}
.input-box{
    margin-bottom: 14px;
}
/deep/.input-box .el-input .el-input__inner{
    width: 100%;
    height: 34px;
    line-height: 34px;
}
.select-box{
    display: flex;
}
.select-box .el-select{
    width: calc(100% - 111px);
}
/deep/.select-box .el-input .el-input__inner{
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}
.select-slot{
    width: 111px;
    height: 34px;
    line-height: 34px;
    background-color: #f5f7fa;
    color: #909399;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    text-align: center;
    border-right: none;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    font-size: 14px;
}
.tab-box{
    height: calc(65% - 10px);
    margin-top:10px;
    border: 1px solid #f1f2f6;
}
/deep/.el-tabs--top .el-tabs__item.is-top:nth-child(2){
    padding-left: 20px;
}
</style>