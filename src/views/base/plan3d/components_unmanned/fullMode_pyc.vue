<template>
    <div class='fullMode'>
        <!-- 头部 -->
        <div class='head'>
            <div class='title'>
                <div class='dian'></div>
                <div class='titleText'>喷药车</div>
                <div class='dian'></div>
            </div>
        </div>
        <!-- 身体 -->
        <div class='body'>

            <!-- 左侧 -->
            <div class='left_ce'>

                <!-- 上面的表格 -->
                <div class='left_ce_top'>
                    <div class='box'>
                        <i class='el-icon-bicycle'></i>
                        <div>速度:20km/h</div>
                    </div>
                    <div class='box'>
                        <i class='el-icon-bicycle'></i>
                        <div>速度:20km/h</div>
                    </div>
                    <div class='box'>
                        <i class='el-icon-bicycle'></i>
                        <div>速度:20km/h</div>
                    </div>
                    <div class='box'>
                        <i class='el-icon-bicycle'></i>
                        <div>速度:20km/h</div>
                    </div>
                    <div class='box'>
                        <i class='el-icon-bicycle'></i>
                        <div>速度:20km/h</div>
                    </div>
                    <div class='box'>
                        <i class='el-icon-bicycle'></i>
                        <div>速度:20km/h</div>
                    </div>
                    <div class='box'>
                        <i class='el-icon-bicycle'></i>
                        <div>速度:20km/h</div>
                    </div>
                    <div class='box'>
                        <i class='el-icon-bicycle'></i>
                        <div>速度:20km/h</div>
                    </div>
                    <div class='box'>
                        <i class='el-icon-bicycle'></i>
                        <div>速度:20km/h</div>
                    </div>
                </div>

                <div class='left_ce_bottom'>
                    <div class='tab'>
                        <div class='active'>手动模式</div>
                        <div>遥控模式</div>
                        <div>App模式</div>
                    </div>
                    <div class='tabBox'>
                        <!-- 手动模式的操作界面 -->
                        <div class='sd'>
                            <!-- 左边 -->
                            <div class='sd_left'>
                                <!-- 下 -->
                                <div class='sd_left_bottom'>
                                    <!-- 方向盘 -->
                                    <div class='quan'>
                                        <!-- 外边距 -->
                                        <div class='m-border'></div>
                                        <!-- 内边距 -->
                                        <div class='p-border' :class='"optActive"+optActive'>
                                            <!-- 分界线 -->
                                            <div class='x-line'></div>
                                            <div class='y-line'></div>
                                            <!-- 中心的圆 -->
                                            <div class='xy-cirle'>
                                                <i class='el-icon-switch-button dy'></i>
                                            </div>
                                            <!-- 文字 -->
                                            <div>
                                                <div class='font-top' :class='{active: optActive == 0}'>上</div>
                                                <div class='font-bottom' :class='{active: optActive == 1}'>下</div>
                                                <div class='font-left' :class='{active: optActive == 2}'>左</div>
                                                <div class='font-right' :class='{active: optActive == 3}'>右</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- 右边 -->
                            <div class='sd_right'>
                                <!-- 右下 -->
                                <div class='sd_right_bottom'>
                                    <!-- 右下右 -->
                                    <div class='sd_right_bottom_right cy'>
                                        <div class='sd_left_top'>
                                            <div>
                                                <img :src='require("@/assets/img/Plan/drawLineMap/dianl.png")' />
                                                <div>正在施肥</div>
                                            </div>
                                            <div>
                                                <img :src='require("@/assets/img/Plan/drawLineMap/dianx.png")' />
                                                <div>停止施肥</div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 右下左 -->
                                    <div class='sd_right_bottom_left'>
                                        <div class='btn one'>
                                            <i class='el-icon-shopping-cart-full'></i>
                                            <div>加速</div>
                                        </div>
                                        <div class='btn one'>
                                            <i class='el-icon-shopping-cart-full'></i>
                                            <div>停止</div>
                                        </div>
                                        <div class='btn one'>
                                            <i class='el-icon-shopping-cart-full'></i>
                                            <div>减速</div>
                                        </div>
                                  
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <!-- 右侧 -->
            <div class='right_ce'>
                <div class='boxs'>
                    <!-- 视频 -->
                    <div class='spBox'>
                        <img :src='require("@/assets/img/Plan/unmanned/sp.png")'>
                    </div>
                    <div class='btnBox'>
                        <!-- btn按钮 -->
                        <div class='btn'>
                            <i class='el-icon-shopping-cart-full'></i>
                            <div>开始施肥</div>
                        </div>
                        <div class='btn'>
                            <i class='el-icon-shopping-cart-full'></i>
                            <div>开始施肥</div>
                        </div>
                        <div class='btn'>
                            <i class='el-icon-shopping-cart-full'></i>
                            <div>开始施肥</div>
                        </div>
                        <div class='btn'>
                            <i class='el-icon-shopping-cart-full'></i>
                            <div>开始施肥</div>
                        </div>
                        <div class='btn'>
                            <i class='el-icon-shopping-cart-full'></i>
                            <div>开始施肥</div>
                        </div>
                        <div class='btn'>
                            <i class='el-icon-shopping-cart-full'></i>
                            <div>开始施肥</div>
                        </div>
                        <div class='btn'>
                            <i class='el-icon-shopping-cart-full'></i>
                            <div>开始施肥</div>
                        </div>
                        <div class='btn'>
                            <i class='el-icon-shopping-cart-full'></i>
                            <div>开始施肥</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
    .fullMode { width: 1300px; height: 100%; background: #000000ba; border-radius: 10px; border: solid 1px #178083; }
    .head { display: flex;padding: 12px; }
    .dian { width: 5px;height: 5px;border-radius: 50%;background: #1dcbc9; }
    .title { font-size: 16px;display:flex;margin: auto;align-items: center;color: #1dcbc9;border: solid 1px;border-radius: 9px;padding: 4px 12px; }
    .titleText { margin: 0 8px; }

    .body { display: flex; height: 615px; }
    .right_ce { width: 60%; padding: 20px; }
    .left_ce { width: 40%; padding: 20px; }

    .left_ce_top { box-shadow: 0px 0px 3px #1dcbc9;display:flex;flex-wrap: wrap; }
    .left_ce_bottom { margin-top: 15px; height: calc(100% - 230px); }
    .box { display: flex; flex-direction: column;width: 33.33%;border: solid 1px #1dcbc9;color: #1dcbc9;text-align: center;padding: 30px 0px;}
    .box i { font-size: 32px; }
    .tab { display:flex; }
    .tab > div { width: 100%; color:#1dcbc9; text-align: center;padding:6px;background: #030c08A8; }
    .tab > div.active { background: #1dcbc9A8; color:#ffffff; }
    .tabBox { border:solid 1px #1dcbc9; height: calc(100% - 130px); }
    .boxs { border-radius: 8px;border: solid 1px #1dcbc9; height: 100%; }

    .btn {
        background: url("~@/assets/img/Plan/drawLineMap/b.png") no-repeat;
        background-size: 100% 100%;
    }

    .btn { display: flex;-webkit-box-orient: vertical;-webkit-box-direction: normal;flex-direction: column;width: calc(25% - 72px );border: solid 1px #1dcbc900;color: #1dcbc9;text-align: center;padding: 12px 0px;position: relative;border-radius: 8px;margin: 5px 36px;}
    /* .btn::after {content: "";position: absolute;height: calc(100% - 6px);width: calc(100% - 6px);margin: 3px;box-shadow: 0 0 5px #1db3b1;top: 0;left: 0;} */
    .btn i { font-size: 32px; }
    .btnBox { display: flex; flex-wrap: wrap; margin-top: 10px;}
    .spBox { height: calc(100% - 172px);  }
    .spBox img { width: 100%; height: 100%; }

    .sd {
        height: 100%;
        display:flex;
    }
    .sd_left {
        height: 100%;
        width: calc(100% - 250px);
        flex-shrink: 0;
    }

    .flex {
        display: flex;
    }

    .tabBtnRange {
        width: 22px;
        height: 22px;
        background: #000000;
    }

    .sd_left_top {
        display: flex;
        height: 120px;
        flex-direction: column;
        justify-content: center;
    }

    .sd_left_top > div > img {
        width: 25px;
        height: 25px;
        margin-right: 5px;
    }

    .sd_left_top > div {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 9px;
        color: #39acaa;
        font-size: 14px;
    }

    .btn.one {
        margin: 5px;
        width: 60px;
        font-size: 12px;
        padding: 0 0;
        height: 54px;
        justify-content: center;
    }

    .btn.one i {
        font-size: 18px;
    }

    .sd_left_bottom {
        height: 100%;
        width: 100%;
        position:relative;
    }

    .quan {
        height: 200px;
        width: 200px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }

    .y-line {
        position: absolute;
        width: 100%;
        height:3px;
        border-radius: 3px;
        background: #3ae8e5;
        top: 50%;
        left: 0;
        transform: translateY(-50%) rotateZ(135deg);
    }

    .x-line {
        position: absolute;
        width: 100%;
        height:3px;
        border-radius: 3px;
        background: #3ae8e5;
        top: 50%;
        left: 0;
        transform: translateY(-50%) rotateZ(45deg);
    }

    .xy-cirle {
        border-radius: 50%;
        width: 50%;
        height: 50%;
        background: #888181;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border: solid 5px #1df2fa;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 50px;
        color: #1df2fa;
    }

    .font-top {
        position:absolute;
        top: 13%;
        left:50%;
        transform: translate(-50%,-50%);
        color:#ffffff;
        font-size: 12px;
    }

    .font-bottom {
        position:absolute;
        bottom: 4%;
        left:50%;
        transform: translate(-50%,-50%);
        color:#ffffff;
        font-size: 12px;
    }

    .font-left {
        position:absolute;
        top: 50%;
        left:13%;
        transform: translate(-50%,-50%);
        color:#ffffff;
        font-size: 12px;
    }

    .font-right {
        position:absolute;
        top: 50%;
        right:5%;
        transform: translate(-50%,-50%);
        color:#ffffff;
        font-size: 12px;      
    }

    .p-btn i {
        font-size: 22px;
        
    }

    .p-btn > * {
        position:relative;
        z-index: 1;
    }

    .p-btn::after {
        content: "";
        margin: 5px;
        border-radius: 50%;
        /* border:solid 1px #1df2fa; */
        box-shadow: 0px 0px 10px #1df2fa;
        position:absolute;
        width: calc(100% - 10px);
        height: calc(100% - 10px);
        top: 0;
        left: 0;
        background: #233239cc;
    }

    .p-btn {
        color: #11ddff;
        position: absolute;
        width: 75px;
        height: 75px;
        border-radius: 50%;
        border: solid 1px #5abfe1;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

    }

    .m-border {
        background: #2c4b4594;
        border-radius: 50%;
        margin: 15px;
        height: calc(100% - 30px);
        position: absolute;
        width: calc(100% - 30px);
    }

    .p-border {
        background: #233136;
        border-radius: 50%;
        margin: 30px;
        height: calc(100% - 60px);
        position: absolute;
        width: calc(100% - 60px);
    }

    .p-border.optActive0 {
        border-top: solid 1px #1df2fa;
    }

    .p-border .active {
        color: #1df2fa;
    }

    .upOrdownLine {
        height: calc(100% - 155px);
        position: relative;
        margin: 10px 0;
    }

    .upOrdownLine::after {
        content: "";
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #1dcbc9;
        left: 50%;
        bottom: 0;
        position: absolute;
        transform: translateX(-50%);

    }

    .lineup {
        width: 2px;
        height: 100%;
        position:absolute;
        left: 50%;
        transform: translateX(-50%);
        background: #1dcbc9;
    }

    .dianup {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #1dcbc9;
        left: 50%;
        position: absolute;
        transform: translateX(-50%);
    }

    .upValue {
        color: #fff;
        position: absolute;
        background: #1b8e8b;
        padding: 3px 8px;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        border-radius: 4px;
        cursor: pointer;
    }

    .dy {
        font-size: 22px;
    }

    .sd_right {
        /* display: flex; */
        width: 100%;
    }

    .sd_right_bottom {
        /* display: -webkit-box;
        display: -ms-flexbox;
        display: flex; */
        -webkit-box-pack: space-evenly;
        -ms-flex-pack: space-evenly;
        justify-content: space-between;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        height: 100%;
        width: 72%;
        margin: auto;
    }

    .sd_right_top {
        position:relative;
    }

    .sd_right_top img {
        width: 150px;
        height: 110px;
    }

    .sszhi {
        position: absolute;
        background: #1dcbc9;
        color: #000000;
        font-size: 12px;
        border-radius: 4px;
        padding: 5px 8px;
        top: 50%;
        transform: translateY(-50%);
        right: 5px;
    }

    .sd_right_bottom_left {
        height: calc(100% - 85px);
        display: flex;
        /* flex-direction: column; */
        justify-content: space-around;
        padding: 18px 0;
        align-items: center;
    }

    .sd_right_bottom_right {
        height: 75px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: #ffffff;
    }

    .cy {
        cursor: pointer;
    }

</style>