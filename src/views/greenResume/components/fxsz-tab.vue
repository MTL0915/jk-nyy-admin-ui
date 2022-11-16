<template>
    <div class="fxsz-tab">
        <ul>
            <li>
                <div class="li-left">分享标题：</div>
                <div class="li-right">
                    <el-input v-model="titleVal"></el-input>
                </div>
            </li>
            <li>
                <div class="li-left">分享描述：</div>
                <div class="li-right">
                    <el-input v-model="descVal" type="textarea" :rows="2"></el-input>
                </div>
            </li>
            <li>
                <div class="li-left">分享预览：</div>
                <div class="li-right li-share">
                    <div class="title-share">{{titleVal}}</div>
                    <div class="share-preview">
                        <div class="preview-img">
                            <img src="@/assets/resume/图层9.png">
                        </div>
                        <div class="preview-desc">{{descVal}}</div>
                    </div>
                </div>
                <div class="li-right-code">
                    <img src="@/assets/resume/icon61.png" class="person-icon">
                    <img src="@/assets/resume/icon62.png" class="code-icon">
                </div>
            </li>
            <li>
                <div class="li-left">分享链接：</div>
                <div class="li-right">
                    <el-input v-model="urlVal" :disabled="true"></el-input>
                </div>
                <div class="li-copy">
                    <el-button class="copy-btn" 
                        v-clipboard:copy="urlVal"
                        v-clipboard:success="onCopy"
                        v-clipboard:error="onError">
                    </el-button>
                    <img src="@/assets/resume/icon63.png">
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return{
            titleVal:"标题啊",
            descVal:"描述描描--",
            urlVal:"https://www.baidu.com"
        }
    },
    methods:{
        onCopy: function (e) {
            console.log('你刚刚复制: ' + e.text)
        },
        onError: function (e) {
            console.log('无法复制文本！')
        }
    }
}
</script>
<style lang="scss" scoped>
.fxsz-tab{
    padding: 14px;
    color: #666;
}
ul{
    list-style: none;
}
.fxsz-tab ul li{
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}
.li-right{
    width: 30%;
}
/deep/.li-right .el-input .el-input__inner{
    width: 100%;
    height: 34px;
    line-height: 34px;
}
.li-share{
    height: 117px;
    padding: 4px 10px;
    box-sizing: border-box;
    background: url("../../../assets/resume/icon64.png") center no-repeat;
    background-size: 100% 100%;
}
.title-share{
    font-size: 16px;
    line-height: 30px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.share-preview{
    display: flex;
}
.preview-img{
    margin-right: 10px;
    img{
        display: block;
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }
}
.preview-desc{
    font-size: 12px;
    line-height: 15px;
    letter-spacing: 1px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
}
.li-right-code{
    display: flex;
    margin-left: 6px;
    margin-top: 10px;
}
.li-right-code .person-icon{
    display: block;
    width: 32px;
    height: 32px;
    margin-right: 10px;
}
.li-right-code .code-icon{
    display: block;
    width: 98px;
    height: 98px;
}
.li-copy{
    position: relative;
    margin-left: 20px;
    cursor: pointer;
}
.copy-btn{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border: none;
    padding: 0;
    color: transparent;
    border-color: transparent;
    background-color:transparent;
}
.copy-btn:focus, .copy-btn:hover{
    color: transparent;
    border-color: transparent;
    background-color:transparent;
}
</style>