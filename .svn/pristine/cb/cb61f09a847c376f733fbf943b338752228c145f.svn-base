<template>
    <div class='map_loading_vue' :class='{hide:isOpacity}' v-show='isShow'>
        <div class='title'>地图设备管理</div>
        <div :class="{loader:isShowLoader}" v-if='isShowLoader'>
            <div class="text">Loading...</div>
            <div class="horizontal">
                <div class="circlesup">
                        <div class="circle"></div>
                        <div class="circle"></div>
                        <div class="circle"></div>
                        <div class="circle"></div>
                        <div class="circle"></div>
                </div>
                <div class="circlesdwn">
                        <div class="circle"></div>
                        <div class="circle"></div>
                        <div class="circle"></div>
                        <div class="circle"></div>
                        <div class="circle"></div>
                </div>
            </div>
            <div class="vertical">
                <div class="circlesup">
                        <div class="circle"></div>
                        <div class="circle"></div>
                        <div class="circle"></div>
                        <div class="circle"></div>
                        <div class="circle"></div>
                </div>
                <div class="circlesdwn">
                        <div class="circle"></div>
                        <div class="circle"></div>
                        <div class="circle"></div>
                        <div class="circle"></div>
                        <div class="circle"></div>
                </div>
            </div>
        </div>
        <div class='progressbar' :class='{ hide: isHidePage }'>
            <div class='bar' :style='"width:calc("+complete+"% - 10px);"' >
                <span class='completeV'>{{complete}}%</span>
            </div>
        </div>

        <div class='welcomeTitle' :class='{show:isShowWelcome}'>
            <span>欢迎使用</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        complete: {
            type: Number,
            default: 75
        },
        init: {
            type: Function,
            default: ()=>{  }
        }
    },
    watch: {
        complete (v){
            if( v >= 100 ){
                setTimeout(()=>{
                    this.guodu();
                },500)
                // 如果进度完成度超过100了  那就判断为完成了
                setTimeout(()=>{
                    this.completeEnd();
                },3000)
            }
        }
    },
    data (){
        return {
            isOpacity: false,
            isShow: true,
            isShowLoader: true,
            isHidePage: false,
            isShowWelcome: false
        }
    },
    mounted (){

    },
    methods: {

        // 欢迎的过度动画
        guodu (){
            // 隐藏掉加载滚动粒子
            this.isShowLoader = false;
            // 将进度条向下滑动消失
            this.isHidePage = true;
            setTimeout(()=>{
                // 将欢迎使用从下向上弹出
                this.isShowWelcome = true;
            },1000)
        },

        // 完成任务
        completeEnd (){
            // 渐渐隐藏自己
            this.isOpacity = true;
            setTimeout(()=>{
                // 将自己隐藏掉
                this.isShow = false;
                this.init();
            },950)
        }
    }
}
</script>

<style scoped>
    
    .welcomeTitle.show {
        top: 50%;
    }

    .welcomeTitle {
        transition: top 0.75s;
        position:absolute;
        top: 130%;
        left: 50%;
        padding: 20px;
        text-align: center;
        width: 30%;
        transform: translate(-50%,-50%);
        font-size: 40px;
        text-shadow: #13a3a5 1px 0 0, #13a3a5 0 1px 0, #13a3a5 -1px 0 0, #13a3a5 0 -1px 0;
        border-radius: 8px;
    }

    .progressbar.hide {
        animation: progressbarHide 1s;
        animation-fill-mode: forwards;
    }

    @keyframes progressbarHide {
        0%{ bottom: 10% }
        30% { bottom: 15% }
        100% { bottom: -30% };
    }

    .completeV {
        font-size: 33px;
        position: absolute;
        left: 50%;
        transform: translate(-50%,-50%);
        top: 50%;
        text-shadow: #13a3a5 1px 0 0,
                     #13a3a5 0 1px 0, 
                     #13a3a5 -1px 0 0,
                     #13a3a5 0 -1px 0;
        color: #ffffff;
        z-index: 9;
    }

    .progressbar {
        background: #ffffff;
        width: 30%;
        height: 60px;
        border-radius: 8px;
        left: 50%;
        position:absolute;
        transform: translateX(-50%);
        bottom: 10%;
        transition: bottom 0.75s;
    }

    .progressbar .bar {
        background: #13a3a5;
        width: calc(100% - 10px);
        height: 60px;
        border-radius: 8px;
        transform: translate(5px,-12px);
        transition: width 0.25s;
    }
    .progressbar .bar::before {
        content: "";
        background: #54cacc;
        width: 100%;
        height: 60px;
        border-radius: 8px;
        transform: translate(0px,7px);
        position: absolute;
    }
    .progressbar .bar::after {
        content: "";
        background: #13a3a5;
        width: 100%;
        height: 60px;
        border-radius: 8px;
        position:absolute;
    }

    .title {
        font-size: 33px;
        position: absolute;
        left: 50%;
        transform: translate(-50%,-50%);
        top: 15%;
        text-shadow: #13a3a5 1px 0 0,
                     #13a3a5 0 1px 0, 
                     #13a3a5 -1px 0 0,
                     #13a3a5 0 -1px 0;
    }

    .map_loading_vue.hide {
        opacity: 0;
    }

    .map_loading_vue { 
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        background: #403833;
        font-family: 'Open Sans';
        font-weight: 100;
        color:#f2f2f2;
        font-size:100%;
        margin:0em;
        padding:0em;
        width:100%;
        height:100%;
        position:absolute;
        top: 0;
        z-index: 99999;
        opacity: 1;
        transition: all 1s;
    }

    /* Start the loader code, first, let's align it the center of screen */
    .loader {
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -mos-transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        text-align:center;
    /* disable selection and cursor changes */
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        cursor:default;
    }

    /* Text align it the center of screen and connect the looped animation for 2 seconds */
    .text{
        position: absolute;
        left: -1.3em;
        top: -1.7em;
        -webkit-animation: text 2s infinite;
        -moz-animation: text 2s infinite;
        -moz-animation: text 2s infinite;
        -ms-animation: text 2s infinite;
        -o-animation: text 2s infinite;
        animation: text 2s infinite;
    }

    /* Set for the first layer vertical position */
    .vertical{
        position:absolute;
        top: -1.84em;
        left: -0.4em;
        -webkit-transform: rotate(90deg);
        -moz-transform: rotate(90deg);
        -ms-transform: rotate(90deg);
        -o-transform: rotate(90deg);
        transform: rotate(90deg);
    }

    /* Set for the second layer horizontal position */
    .horizontal{
        position:absolute;
        top:0em;
        left:0em;
        -webkit-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
    }

    /* The next two classes do mirror for animation */
    .circlesup{
        position:absolute;
        top: -4.7em;
        right: 12.1em;
    }

    .circlesdwn{
        position:absolute;
        top:2.5em;
        right:-13.5em;
        -webkit-transform: rotate(180deg);
        -moz-transform: rotate(180deg);
        -ms-transform: rotate(180deg);
        -o-transform: rotate(180deg);
        transform: rotate(180deg);
    }

    /* Create a container for our circles, rotate it 45 degrees and set animation*/
    .circle {
        position: absolute;
        width: 15em;
        height: 15em;
        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        -o-transform: rotate(45deg);
        transform: rotate(45deg);
        -webkit-animation: orbit 2s infinite;
        -moz-animation: orbit 2s infinite;
        -moz-animation: orbit 2s infinite;
        -ms-animation: orbit 2s infinite;
        -o-animation: orbit 2s infinite;
        animation: orbit 2s infinite;
        z-index:5;
    } 

    /* Style's of our circles */
    .circle:after {
        content: '';
        position: absolute;
        width: 2em;
        height: 2em;
        -webkit-border-radius: 100%;
        -moz-border-radius: 100%;
        -ms-border-radius: 100%;
        -o-border-radius: 100%;
        border-radius: 100%;
        background: #13A3A5; /* Pick a color 1*/
    }

    .circle:nth-child(2) {
        -webkit-animation-delay: 100ms; 
        -moz-animation-delay: 100ms; 
        -ms-animation-delay: 100ms; 
        -o-animation-delay: 100ms; 
        animation-delay: 100ms;
        z-index:4;
    }

    .circle:nth-child(2):after  {
        background: #56bebf; /* Pick a color 2*/
        -webkit-transform: scale(0.8,0.8);
        -moz-transform: scale(0.8,0.8);
        -ms-transform: scale(0.8,0.8);
        -o-transform: scale(0.8,0.8);
        transform: scale(0.8,0.8);
    }

    .circle:nth-child(3) {
        -webkit-animation-delay: 225ms; 
        -moz-animation-delay: 225ms; 
        -ms-animation-delay: 225ms; 
        -o-animation-delay: 225ms; 
        animation-delay: 225ms; 
        z-index:3;
    }

    .circle:nth-child(3):after  {
        background: #ffa489; /* Pick a color 3*/
        -webkit-transform: scale(0.6,0.6);
        -moz-transform: scale(0.6,0.6);
        -ms-transform: scale(0.6,0.6);
        -o-transform: scale(0.6,0.6);
        transform: scale(0.6,0.6);
    }

    .circle:nth-child(4) {
        -webkit-animation-delay: 350ms; 
        -moz-animation-delay: 350ms; 
        -ms-animation-delay: 350ms; 
        -o-animation-delay: 350ms; 
        animation-delay: 350ms; 
        z-index:2;
    }

    .circle:nth-child(4):after  {
        background: #ff6d37; /* Pick a color 4*/
        -webkit-transform: scale(0.4,0.4);
        -moz-transform: scale(0.4,0.4);
        -ms-transform: scale(0.4,0.4);
        -o-transform: scale(0.4,0.4);
        transform: scale(0.4,0.4);
    }


    .circle:nth-child(5) {
        -webkit-animation-delay: 475ms; 
        -moz-animation-delay: 475ms; 
        -ms-animation-delay: 475ms; 
        -o-animation-delay: 475ms; 
        animation-delay: 475ms; 
        z-index:1;
    }

    .circle:nth-child(5):after  {
        background: #DB2F00; /* Pick a color 5*/
        -webkit-transform: scale(0.2,0.2);
        -moz-transform: scale(0.2,0.2);
        -ms-transform: scale(0.2,0.2);
        -o-transform: scale(0.2,0.2);
        transform: scale(0.2,0.2);
    }

    /* Animation keys */
    @-webkit-keyframes orbit {
        0%		{ -webkit-transform:rotate(45deg); } 

        5%		{ -webkit-transform:rotate(45deg);
                -webkit-animation-timing-function: ease-out; } 

        70%		{ -webkit-transform:rotate(405deg); 
                -webkit-animation-timing-function: ease-in; }

        100%	{ -webkit-transform:rotate(405deg); } 
    }

    @-moz-keyframes orbit {
        0%		{ -moz-transform:rotate(45deg); } 

        5%		{ -moz-transform:rotate(45deg);
                -moz-animation-timing-function: ease-out; } 

        70%		{ -moz-transform:rotate(405deg); 
                -moz-animation-timing-function: ease-in; }

        100%	{ -moz-transform:rotate(405deg); } 
    }
    @-ms-keyframes orbit {
        0%		{ -ms-transform:rotate(45deg); } 

        5%		{ -ms-transform:rotate(45deg);
                -ms-animation-timing-function: ease-out; } 

        70%		{ -ms-transform:rotate(405deg); 
                -ms-animation-timing-function: ease-in; }

        100%	{ -ms-transform:rotate(405deg); } 
    }

    @-o-keyframes orbit {
        0%		{ -o-transform:rotate(45deg); } 

        5%		{ -o-transform:rotate(45deg);
                -o-animation-timing-function: ease-out; } 

        70%		{ -o-transform:rotate(405deg); 
                -o-animation-timing-function: ease-in; }

        100%	{ -o-transform:rotate(405deg); } 
    }

    @keyframes orbit { 
        0%		{ transform:rotate(45deg); } 
        
        5%		{ transform:rotate(45deg);
                animation-timing-function: ease-out; } 

        70% 	{ transform:rotate(405deg); 
                animation-timing-function: ease-in; }

        100%	{ transform:rotate(405deg); } 
    }


    @-webkit-keyframes text {
        0%		{-webkit-transform:scale(0.2,0.2);
                -webkit-animation-timing-function: ease-out; } 

        40%,60%{ -webkit-transform:scale(1,1); 
                -webkit-animation-timing-function: ease-out;  }

        70%,100%{ -webkit-transform:scale(0.2,0.2);  } 
    }

    @-moz-keyframes text {
        0%		{-moz-transform:scale(0.2,0.2);
                -moz-animation-timing-function: ease-out; } 

        50%		{ -moz-transform:scale(1,1); 
                -moz-animation-timing-function: ease-out;  }

        60%		{ -moz-transform:scale(1,1); 
                -moz-animation-timing-function: ease-out;  }

        100%	{ -moz-transform:scale(0.2,0.2);  } 	
    }

    @-mos-keyframes text {
        0%		{-mos-transform:scale(0.2,0.2);
                -mos-animation-timing-function: ease-out; } 

        50%		{ -mos-transform:scale(1,1); 
                -mos-animation-timing-function: ease-out;  }

        60%		{ -mos-transform:scale(1,1); 
                -mos-animation-timing-function: ease-out;  }

        100%	{ -mos-transform:scale(0.2,0.2);  } 
    }

    @-o-keyframes text {
        0%		{ -o-transform:scale(0.2,0.2);
                -o-animation-timing-function: ease-out; } 

        50%		{ -o-transform:scale(1,1); 
                -o-animation-timing-function: ease-out;  }

        60%		{ -o-transform:scale(1,1); 
                -o-animation-timing-function: ease-out;  }

        100%	{ -o-transform:scale(0.2,0.2);  } 
    }

    @keyframes text {
        0%		{ transform:scale(0.2,0.2);
                animation-timing-function: ease-out; } 

        50%		{ transform:scale(1,1); 
                animation-timing-function: ease-out;  }

        60%		{ transform:scale(1,1); 
                animation-timing-function: ease-out;  }

        100%	{ transform:scale(0.2,0.2);  } 
    }
</style>