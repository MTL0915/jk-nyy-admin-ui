<template>
    <div class='baiduVideoBox' v-show='isOpen' :style="'top:'+bottom+'px;right:'+right+'px;width:'+width+'px;height:'+height+'px;'">
        <div v-show='isShow && !isBig' class='title' @mousedown1="drag">
            <span>摄像头</span>
            <div class='smallBtn'>
                <i v-show='isBig' class='iconbtn el-icon-minus' @click='suoxiao'></i>
                <i v-show='!isBig' class='iconbtn el-icon-plus' @click='fangda'></i>
                <i v-show='!isBig' class='iconbtn el-icon-d-caret' @click='hide'></i>
            </div>
        </div>
        <div class='baiduVideo' :style='isBig ? "height:100%": ""' v-show='isShow' >
            <div ref='baiduVideo' ></div>
        </div>
        <i v-show='!isShow' @click='show' class='iconbtnShow el-icon-video-camera-solid'></i>
        <div class='backVideo' v-show='isBig' @click='suoxiao'>退出视频</div>
    </div>
</template>

<script>
import { getDeviceConf } from "../data/data"
export default {
    data (){
        return { 
            myPlayer: null,
            key: null,
            bottom: 15,
            right: 15,
            width: 280,
            height: 200,

            oldRight: 0,
            oldBottom: 0,
            isBig: false,
            isShow: true,
            isOpen: false
        }
    },
    beforeDestroy (){
        this.myPlayer.remove();
        this.myPlayer = null;
        this.key && clearInterval(this.key);
        this.key = null;
    },
    mounted (){
        this.playVideo();
    },
    methods: {

        show (){
            this.isShow = true;
            this.width = 280;
            this.height = 200;
        },

        hide (){
            this.isShow = false;
            this.width = 50;
            this.height = 50;
        },

        fangda (){
            this.isBig = true;
            this.width = document.body.offsetWidth;
            this.height = document.body.offsetHeight;
            this.oldRight = this.right;
            this.oldBottom = this.bottom;
            this.right = 0;
            this.bottom = 0;
        },

        suoxiao (){
            this.isBig = false;
            this.width = 280;
            this.height = 200;
            this.right = this.oldRight;
            this.bottom = this.oldBottom;
        },

        //初始化百度播放器
        playVideo () {
            if( this.key ){
                clearInterval(this.key);
                this.key = null;
            }
            this.key = setInterval((e)=>{
                if( window.cyberplayer ){
                    clearInterval(this.key);
                    getDeviceConf(this.$route.query.device_id).then((res)=>{
                        this.key = null;
                        if( this.myPlayer ){
                            this.myPlayer.remove();
                            this.myPlayer = null;
                        }
                        var videoAdress = res.data.find((e)=>{ return e.name == 'video_url' })
                        if( videoAdress ){
                            videoAdress = videoAdress.value;
                            this.isOpen = true;
                        }else{
                            this.isOpen = false;
                        }
                        this.myPlayer = cyberplayer(this.$refs.baiduVideo).setup({
                            title: "live",
                            file: videoAdress, // 播放地址
                            width: "100%",
                            height: "100%",
                            autostart: true, // 是否自动播放
                            stretching: "exactfit", // 拉伸设置
                            repeat: false, // 是否重复播放
                            volume: 0, // 音量
                            controls: false, // controlbar是否显示
                            ak: "8fa5f129aa3e4d52af02666e4d43884a", //百度云的 AK
                            controlbar: {
                                barLogo: false
                            },
                            rtmp: {
                                reconnecttime: 99999, // rtmp直播的重连次数
                                bufferlength: 0 // 缓冲多少秒之后开始播放 默认1秒
                            }
                        });

                        this.myPlayer.onError(function(event){ 
                            console.log("onError");
                        });
                    })
                }
            },1000)
        },

        // 拖动事件
        drag (event){
            // 获取当前距离的误差
            var x = event.layerX;
            var y = event.layerY;
            // 获取屏幕宽高
            var w = document.body.offsetWidth;
            var h = document.body.offsetHeight;
            var mousemove = (e)=>{ 
                var left = e.pageX - x;
                var top = e.pageY - y;
                this.bottom = h - top - this.height;
                this.right = w - left - this.width;
            }
            document.addEventListener("mousemove", mousemove)
            var mouseup = ()=>{
                document.removeEventListener("mousemove",mousemove)
                document.removeEventListener("mouseup", mouseup)
            }
            document.addEventListener("mouseup", mouseup)
        }
    }
}
</script>


<style>
    
</style>

<style scoped>
    #videoChe {
        position:absolute;
        z-index: 99;
        right: 15px;
        top: 15px;
    }

    .iconbtnShow {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        z-index: 11;
        color: #139dff;
        font-size: 22px;
        cursor: pointer;
    }
    .baiduVideoBox {
        position:absolute;
        z-index: 9999;
        border: solid 1px #06c4fb;
        border-radius: 4px;
        overflow: hidden;
        background: #cacaca;
        transition: width 0.25s,width 0.25s;
    }
    .baiduVideoBox * {
        user-select: none;
    }
    .baiduVideo {
        z-index: 9999;
        width: 100%;
        height: calc(100% - 19px);
    }
    .title {
        padding: 3px;
        font-size: 12px;
        color: #ffffff;
        cursor: move;
        background: #16c5cb;
    }
    .smallBtn {
        float: right;
        cursor: pointer;
    }
    .iconbtn:hover {
        color:#027fff;
    }
    .iconbtn {
        cursor: pointer;
        color:#4c4747;
    }
    .backVideo:hover {
        color: #ffffff;
    }
    .backVideo {
        transition: color 0.25s;
        cursor: pointer;
        padding: 8px;
        color:#027fff;
        background: #000000A8;
        border:solid 1px;
        border-radius: 4px;
        position: absolute;
        bottom: 15px;
        right: 15px;
    }
</style>