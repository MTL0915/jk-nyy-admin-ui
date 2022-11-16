<template>
   <el-dialog
    :close-on-click-modal="false"
    :append-to-body="true"
    :visible.sync="dialog"
    :lock-scroll="true"
    :title="title"
    @opened="onOpened"
    :width="width"
  >
    <!-- logo上传 -->
    <div class="logo-content" v-if="type==='logo'">
        <div class="logo-left">上传logo</div>
        <div class="logo-upload-btn">
            <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :limit="1">
                <img src="@/assets/resume/851.jpg">
                <!-- <el-button size="small" type="primary">点击上传</el-button> -->
            </el-upload>
        </div>
        <div class="logo-tip">
            <h3>图片标准：160*60(像素)</h3>
            <h3>支持格式：</h3>
            <h3>jpg,gif,png,jpeg,bmp</h3>
        </div>
    </div>

    <!--产品介绍 -->
    <div class="cpjs-content" v-if="type==='cpjs'">
        <editor :eidt_vue="this_vue" ref="editorForm" />
    </div>

    <!-- 我要购买 -->
    <div class="wygm-content" v-if="type==='wygm'">
        <div class="radio-box">
            <el-radio v-model="buyVal" label="1">一键购</el-radio>
            <el-radio v-model="buyVal" label="2">网址</el-radio>
        </div>
        <div class="buy-input-box" v-if="buyVal==='1'">
            <span>选择商品</span>
            <el-select v-model="selectGoods" filterable placeholder="请选择" style="width:80%;">
                <el-option
                v-for="item in goodsList"
                :key="item"
                :label="item"
                :value="item">
                </el-option>
            </el-select>
        </div>
        <div class="buy-input-box" v-if="buyVal==='2'">
            <span>输入网址</span>
            <el-input v-model="urlVal"></el-input>
        </div>
    </div>

    <!-- 资源规划 -->
    <div class="zygh-content logo-content" v-if="type==='zygh'">
        <div class="logo-left">上传图片</div>
        <div class="logo-upload-btn">
            <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-success="handleAvatarSuccess"
                :limit="1">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </div>
        <div class="logo-tip zygh-tip">
            <h3>(长X宽：320*66像素)</h3>
        </div>
    </div>

    <!-- 环境特色 -->
    <div class="hjts-content" v-if="type==='hjts'">
        <div class="buy-input-box hjts-input-box">
            <span>环境特色</span>
            <el-input type="textarea" :rows="5" v-model="hjtsVal"></el-input>
        </div>
    </div>

    <!-- 专家解读 -->
    <div class="zjjd-content" v-if="type==='zjjd'">
        <div class="zjjd-tip-box">
            <p>最多可以上传5个文件，点击文件右侧删除按钮可删除文件</p>
            <p class="zjjd-tip-right">专家解读</p>
        </div>
        <div class="audios-list">
            <div class="audios-title">
                <div class="audios-title-left">
                    <img src="@/assets/resume/icon78.png" >
                    <span>专家解读</span>
                </div>
                <div class="audios-title-right">
                    <img src="@/assets/resume/icon77.png">
                </div>
            </div>
            <div class="audios-list-cont" v-for="(au,a) in audioList" :key="a">
                <audio class="audio-item" controls="controls">
                    <source :src="au.url" type="audio/ogg">
                </audio>
                <el-button class="del-audio" @click="delAudio(i)">删除</el-button>
            </div>
        </div>
        <div class="audios-btn-box">
            <div class="audios-btn">
                <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :beforeUpload="beforeAudiosUpload"
                    :show-file-list="false"	
                    :limit="5"
                >
                    <img src="@/assets/resume/upload.png" style="height:33px;">
                </el-upload>
            </div>
            <div class="audios-upload-tip">
                点击文件上传选择文件，请上传小于3M的mp3文件，最多可以上传五个文件
            </div>
        </div>
    </div>

    <!-- 农事展示 -->
    <div class="nszs-content" v-if="type==='nszs'">
        <div class="show-date-box">
            <span>显示周期：</span>
            <el-date-picker
                v-model="showDateVal"
                type="datetimerange"
                format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
        </div>
        <div class="nszs-tip">
            <el-checkbox label="只显示推送农事计划的农事记录" v-model="isShowTsjl"></el-checkbox>
        </div>
        <div class="nszs-cont">
            <div class="nszs-cont-left">
                <div class="nszs-cont-title">全部</div>
            </div>
        
            <div class="nszs-cont-mid">
                <div class="nszs-btn">>></div>
                <div class="nszs-btn">></div>
                <div class="nszs-btn"><</div>
                <div class="nszs-btn"><<</div>
            </div>
            <div class="nszs-con-right">
                <div class="nszs-cont-title">已选择</div>
            </div>
        </div>
    </div>


    <!-- 生育期 -->
    <div class="syq-content" v-if="type==='syq'">
        <div class="syq-pic-box">
            <div class="syq-pic-item" :class="fruitTreeVal===item.name?'syq-pic-item-active':''" v-for="(item,i) in fruitList" :key="i" @click="chooseFruitTree(item.name)">
                <img :src="item.img">
                <p>{{item.name}}</p>
            </div>
        </div>
    </div>

    <!-- 农场介绍 -->
    <div class="ncjs-content" v-if="type==='ncjs'">
        <div class="buy-input-box hjts-input-box">
            <span>农场介绍</span>
            <el-input type="textarea" :rows="5" v-model="ncjsVal"></el-input>
        </div>
    </div>

    <!-- 农场秀 -->
    <div class="ncx-content" v-if="type==='ncx'">
        <div class="buy-input-box" style="width:94%">
            <span>选择农场秀</span>
            <el-select v-model="ncxVal" filterable placeholder="请选择" style="width:80%;">
                <el-option
                v-for="item in ncxList"
                :key="item"
                :label="item"
                :value="item">
                </el-option>
            </el-select>
        </div>
    </div>

    <!-- 分享红包 -->
    <div class="fxhb-content" v-if="type==='fxhb'">
        <div class="share-redpack-item">
            <p>选择红包</p>
            <div class="fxhb-input-box">
                <el-select v-model="xzhbVal" filterable placeholder="请选择" style="width:100%;">
                    <el-option
                    v-for="item in hbList"
                    :key="item"
                    :label="item"
                    :value="item">
                    </el-option>
                </el-select>
            </div>
        </div>
        <div class="share-redpack-item">
            <p>红包分享标题</p>
            <div class="fxhb-input-box">
                <el-input v-model="hbTitle"></el-input>
            </div>
        </div>
        <div class="share-redpack-item">
            <p>红包分享描述</p>
            <div class="fxhb-input-box">
                <el-input v-model="hbDesc" type="textarea" :rows="4"></el-input>
            </div>
        </div>
        <div class="share-redpack-item">
            <p></p>
            <div class="fxhb-input-box fxhb-tip">
                分享描述仅支持显示三行内容，请尽量将内容保持在三行内!
            </div>
        </div>

    </div>

    <!-- 农场视频 -->
    <div class="ncsp-content" v-if="type==='ncsp'">
        <div class="radio-box" style="margin-left:0;">
            <span style="margin-right:10px;">选择视频</span>
            <el-radio v-model="videoType" label="1">基地视频</el-radio>
            <el-radio v-model="videoType" label="2">企业视频</el-radio>
        </div>
        <div class="video-upload-box">
            <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :limit="1">
                <i class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </div>
        <div class="video-tip">
            视频仅支持(mp4,avi,rmvb,wmv,amv,dmv,rm)
        </div>
    </div>

    <!-- 资格证书 -->
    <div class="zgzs-content" v-if="type==='zzzs'">
        <div class="zgzs-pic-box">
            <div class="zgzs-pic-item" v-for="(pic,p) in zgzsList" :key="p" @mouseover="showDelBtn(p)">
                <img :src="pic.img" class="zgzs-img">
                <div class="del-zgzs-icon" v-if="zgzsDelIndex==p" @click="delZgzsPic(p)">
                    <img src="@/assets/resume/del03.jpg" alt="">
                </div>
            </div>
            <div class="zgzs-pic-item">
                <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :limit="1">
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </div>
        </div>
        <div class="zgzs-tip">文件大小：4M</div>
    </div>

    <div class="footer-box">
        <el-button type="primary">保存</el-button>
        <el-button @click="onClose()">取消</el-button>
    </div>
   </el-dialog> 
</template>
<script>
import editor from "./Editor"
export default {
    components:{
        editor
    },
    props:{
        title:{
            type:String,
            require:true
        },
        type:{
            type:String,
            require:true
        }
    },
    data(){
        return{
            dialog:false,
            width:"500px",
            this_vue:this,
            buyVal:"1", //我要购买  类型
            selectGoods:"", //我要购买  选择商品
            urlVal:"", //我要购买 网址
            goodsList:["瑞麦丰","新鲜草莓红霞","红颜"],
            imageUrl:"", //资源规划图片
            hjtsVal:"", //环境特色
            showDateVal:"", //显示周期
            isShowTsjl:false,
            fruitTreeVal:"",
            fruitList:[
                {
                    img:require("@/assets/resume/icon79.png"),
                    name:"果树类"
                },
                {
                    img:require("@/assets/resume/icon80.png"),
                    name:"结果类作物"
                },
                {
                    img:require("@/assets/resume/icon81.png"),
                    name:"不结果类作物"
                }
            ],
            ncjsVal:"",  //农场介绍
            ncxVal:"",   //农场秀
            ncxList:["池海龙塘","池海龙塘","池海龙塘","池海龙塘"],
            xzhbVal:"", //选择红包
            hbList:["测试红包1","测试红包"],
            hbTitle:"", //红包分享标题
            hbDesc:"", //分享红包描述
            videoType:"1", //农场视频
            zgzsList:[
                {
                    img:require("@/assets/resume/zgzs-01.jpg")
                },
                {
                    img:require("@/assets/resume/zgzs-02.jpg")
                },
                {
                    img:require("@/assets/resume/zgzs-01.jpg")
                },
                {
                    img:require("@/assets/resume/zgzs-02.jpg")
                },
                {
                    img:require("@/assets/resume/zgzs-01.jpg")
                },
                {
                    img:require("@/assets/resume/zgzs-02.jpg")
                }
            ],
            zgzsDelIndex:-1,
            audioList:[
                {
                    url:require("@/assets/mp3/test.mp3")
                },
                {
                    url:require("@/assets/mp3/test.mp3")
                },
                {
                    url:require("@/assets/mp3/test.mp3")
                },
                {
                    url:require("@/assets/mp3/test.mp3")
                },
                {
                    url:require("@/assets/mp3/test.mp3")
                }
            ]
        }
    },
    methods:{
        onOpened(){
            this.dialog=true
            this.$emit("onOpened");
        },
        onClose(){
            this.dialog=false
            this.$emit("onClose");
            if(this.$refs.editorForm){
                this.$refs.editorForm.content = "";
            }
        },
        handlePreview(file) {
            console.log(file,'------previewimg');
        },
        // 资源规划上传图片成功
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        // mp3上传之前的钩子
        beforeAudiosUpload(file){
            let msg=file.name.substring(file.name.lastIndexOf(".")+1)
            const extension = msg==='mp3'
            if(!extension){
                this.$message({
                    message:"上传文件只能是mp3格式!",
                    type:"error"
                })
            }
            return extension
        },
        chooseFruitTree(name){
            this.fruitTreeVal=name
        },
        showDelBtn(i){
            this.zgzsDelIndex=i
        },
        // 删除资格证书图片
        delZgzsPic(i){
            this.zgzsList.splice(i,1)
        },
        // 删除专家解读音频
        delAudio(i){
            this.audioList.splice(i,1)
        }
    }
}
</script>
<style lang="scss" scoped>
/deep/.el-dialog__header{
    padding: 10px 20px;
    color: #000;
    border-bottom: 1px solid #f1f1f1;
    box-sizing: border-box;
}
/deep/ .el-dialog__title{
    font-size: 14px;
    font-weight: bold;
}
.footer-box{
    border-top: 1px solid #f1f1f1;
    text-align: center;
    margin: 20px -20px 0;
    padding-top: 20px;
}
.footer-box .el-button{
    padding: 8px 16px;
}
.logo-content{
    display: flex;
}
.logo-upload-btn{
    margin: 0 10px;
}
.logo-tip h3{
    letter-spacing: 1px;
    font-size: 14px;
    color: #ff2626;
    line-height: 16px;
}
.el-upload img{
    width: 140px;
    height: 140px;
}
.logo-left{
    color: #000;
    padding-top: 20px;
    box-sizing: border-box;
}
.wygm-content{
    width: 100%;
}
.radio-box{
    margin: 0 80px 20px;
}
/deep/ .el-input{
    width: 80%;
}
/deep/ .el-select .el-input{
    width: 100%;
}
/deep/.el-input__inner{
    height: 34px;
    line-height: 34px;
}
.buy-input-box {
    width: 80%;
}
.buy-input-box span{
    margin-right: 10px;
}

/deep/.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  /deep/.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  /deep/.avatar-uploader-icon {
    font-size: 40px;
    color: #8c939d;
    width: 128px;
    height: 128px;
    line-height: 128px;
    text-align: center;
  }
  /deep/.avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .zygh-tip{
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
  }
  .hjts-input-box{
      display: flex;
  }
  .hjts-input-box .el-textarea{
      width: 80%;
  }
  .zjjd-tip-box{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .audios-list{
      height: 360px;
      overflow-y: auto;
      padding: 20px 0;
      box-sizing: border-box;
  }
  .audios-list-cont{
      width: 100%;
      display: flex;
      margin-top: 15px;
  }
  .del-audio{
      width: 50px;
      height: 30px;
      line-height: 30px;
      padding: 0;
      margin:5px 10px;
  }
  .audios-title{
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 6px;
      box-sizing: border-box;
      color: #fff;
      background: #3e89ce;
  }
  .audios-title-left span{
      margin-left: 6px;
  }
  .audios-btn-box{
      width: 100%;
      height: 100px;
    //   display: flex;
    //   flex-wrap: wrap;
    //   align-items: center;
    //   justify-content: center;
      background-color: #f7f7f7;
      border: 1px solid #ececec;
      border-radius: 10px;
      box-sizing: border-box;
  }
  .audios-btn{
      margin: 20px 0px 10px;
      box-sizing: border-box;
  }
  .audios-btn,.audios-upload-tip{
      text-align: center;
  }
  .show-date-box{
      display: flex;
  }
  .show-date-box span{
      margin-right: 10px;
  }
  .nszs-tip{
      margin: 20px 0;
  }
  .nszs-cont{
      width: 100%;
      height: 320px;
      display: flex;
  }
  .nszs-cont-left, .nszs-con-right{
      width: 45%;
      height: 100%;
    //   padding: 10px;
      box-sizing: border-box;
      border-radius: 4px;
      border: 1px solid #e9e9e9;
      overflow-y: auto;
  }
  .nszs-cont-title{
      width: 100%;
      height: 30px;
      line-height: 30px;
      background-color: #f9f9f9;
      text-align: center;
      border-bottom: 1px solid #e9e9e9;
  }
  .nszs-cont-mid{
      width: 10%;
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      align-items: center;
      justify-content: center;
  }
  .nszs-cont-mid .nszs-btn{
      width: 80%;
      height: 30px;
      line-height: 30px;
      margin-bottom: 10px;
      text-align: center;
      cursor: pointer;
      color: #666;
      border: 1px solid #e9e9e9;
      background-color: #fafafa;
  }
  .syq-pic-box{
      width: 100%;
      display: flex;
      justify-content: space-around;
      padding: 20px 0;
  }
  .syq-pic-item{
      width: 130px;
      padding: 20px 0;
      cursor: pointer;
      text-align: center;
  }
  .syq-pic-item img{
      height: 150px;
  }
  .syq-pic-item p{
      font-size: 14px;
  }
  .syq-pic-item-active{
      border: 1px solid #bad4eb;
  }
  .share-redpack-item{
      width: 100%;
      display: flex;
      font-size: 14px;
      margin-bottom: 20px;
  }
  .share-redpack-item p{
      width: 30%;
      text-align: right;
      padding-right: 10px;
      box-sizing: border-box;
  }
  .share-redpack-item .fxhb-input-box{
      width: 65%;
  }
  .fxhb-input-box .el-input{
      width: 100%;
  }
  .fxhb-tip{
      letter-spacing: 1px;
      color: #ff0000;
  }
  .video-tip{
      margin: 10px 0;
      color: #ff0000;
      padding-left: 20px;
  }
  .zgzs-pic-box{
      width: 100%;
      height: 270px;
      overflow-y: auto;
      display: flex;
      flex-wrap: wrap;
  }
  .zgzs-pic-item {
      width: 25%;
      position: relative;
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
  }
  .zgzs-pic-item .zgzs-img{
      width: 110px;
      height: 110px;
      display: block;
  }
  .zgzs-pic-item .avatar-uploader .el-upload .avatar-uploader-icon{
      width: 110px;
      height: 110px;
      line-height: 110px;
  }
  .zgzs-tip{
      color: #ff0000;
  }
  .del-zgzs-icon{
    position: absolute;
    top: 0;
    right: 15px;
    cursor: pointer;
  }
   .del-zgzs-icon img{
       width: 27px;
       height: 23px;
       display: block;
   }
   .audio-item{
       width: 60%;
       height: 40px;
   }
</style>