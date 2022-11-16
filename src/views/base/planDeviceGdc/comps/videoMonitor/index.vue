<template>
    <div v-show="show">
        <div class='wrap'>
            <div class="header">
                <img :src='require("@/assets/planDeviceNew/videoicon.png")' style="float: left;" @click="play"/>
                <select class="list" value="rtmpURL" size="mini" style="width:150px" @change="changeUrl" v-show="urlOptions.length > 1">
                    <option
                        v-for="item in urlOptions"
                        :value="item.value">
                        {{item.name}}
                    </option>
                </select>
                <img :src='require("@/assets/planDeviceNew/videoclose.png")' style="float: right;" @click="close" />
            </div>
            <BaiduPlayer :address="rtmpURL" style="width:100%;height:100%" ref="baiduPlayer" />
        </div>
    </div>
</template>

<script>
import BaiduPlayer from "@/views/base/video/module/BaiduPlayer";
export default {
    name: 'videoMonitor',
    components: {  BaiduPlayer},
    props: {
        urlOptions:{
            type:Array,
            default:[]
        },
        hideCompFunc:{
            type:Function
        },
    },
    data (){
        return { 
            show:false,
            rtmpURL:"",
        }
    },
    watch: {
        urlOptions:{
            handler: function(){
                this.init();
            },
            deep: true,
        }
    } ,
    methods: {
        init(){
            console.log("urlOptions",this.urlOptions)
            if (this.urlOptions && this.urlOptions.length > 0){
                this.rtmpURL = this.urlOptions[0].value;
                this.play();
            }
        },
        changeUrl(e){
            this.rtmpURL = e.target.value;
        },
        play(){
            this.$refs.baiduPlayer.play();
        },
        close(){
            this.hideCompFunc && this.hideCompFunc("videoMonitor");
        },
        hideComp(){
            this.show = false;
        },
        showComp(){
            this.show = true;
            this.play();
        }
    }
}
</script>
<style scoped>
    .wrap{
        position:relative;
        width:100%;
        height:100%;
        top: 6vh;
    }
    .header{
        background-color: #3d6f6b4f;
        position:absolute;
        top:0px;
        left:0px;
        width:100%;
        height:30px;
        line-height:30px;
        z-index: 10;
    }
    .header .list{
        height:25px;
        line-height:25px;
        padding-left:5px;
    }
    .header .list:selected{
        border:none;
    }
    .header img{
        margin-top: 4px;
        cursor:pointer;
        margin-right: 10px;
    }
</style>