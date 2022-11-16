<template>
    <div class='deviceInfoBox'>
        <!-- 显示设备信息 -->
        <div class='deviceInfoModel' v-show='showInfoModel'>
            <!-- 相册区 -->
            <div class='imgBox' v-if='sxt != ""'>
                <!-- <img v-show='sxtList.length === 0' :src='require("@/assets/img/imgny.png")' /> -->
                <iframe dbbig='sada' ref="video" 
                    :src=" sxt != '' ? '/sxt?hd_device_id=' + sxt + '&playWay=play' : ''" 
                    style="z-index: 99999;"/>
                <div class='imgBox_btn' @click='cameraPhoto'>相冊</div>
            </div>
            <div>
                <div class='nameTitle'>
                    <span>{{deviceInfo.name}}</span>
                </div>
                <div class='deviceInfoList'>
                    <i class='el-icon-map-location'></i>
                    <span> 所属基地 </span>
                    <span>{{deviceInfo.bs_base_name}}</span>
                </div>
                <div class='deviceInfoList'>
                    <i class='el-icon-tickets'></i>
                    <span> 设备编号 </span>
                    <span>{{deviceInfo.device_id}}</span>
                </div>
                <div class='deviceInfoList'>
                    <i class='el-icon-s-order'></i>
                    <span> 设备类型 </span>
                    <span>{{deviceInfo.hd_device_type_name}}</span>
                </div>
            </div>

             <!-- tab选项卡 -->
            <div class='tabType'>
                <div
                :class='selectShowType === 0 ? "active" : ""'
                @click='changeShowType(0)'
                >
                <div class='imgTop'><i class='el-icon-s-data' /></div>
                <div>数据</div>
                </div>
                <div
                :class='selectShowType === 1 ? "active" : ""'
                @click='changeShowType(1)'
                >
                <div class='imgTop'><i class='el-icon-turn-off' /></div>
                <div>控制</div>
                </div>
                <div
                :class='selectShowType === 2 ? "active" : ""'
                @click='changeShowType(2)'
                >
                <div class='imgTop'><i class='el-icon-notebook-2' /></div>
                <div>日志</div>
                </div>
                <div
                :class='selectShowType === 3 ? "active" : ""'
                @click='changeShowType(3)'
                >
                <div class='imgTop'><i class='el-icon-warning-outline' /></div>
                <div>预警</div>
                </div>
            </div>

            <div class='' v-show='selectShowType === 0'>
                <sensorEcharts
                    style="padding: 10px 0 ;width:100%;height:350px"
                    v-if="currentID"
                    :ids="currentIds"
                    :currentID="currentID"
                    :mobilePlatform="false" />
                <div class='deviceList'>
                    <div
                        class='deviceInfo'
                        :class='it.hd_device_sensor_id === currentID ? "active" : ""'
                        v-for='(it,i) in sensorList.filter((e)=>{ return e.channelType != 1 })'
                        :key='i'
                        @click='changeSensor(it.hd_device_sensor_id)'>
                        <div>
                            <img :src='it.hd_sensor_type_small_image_path' />
                        </div>
                        <div>{{it.name}}</div>
                        <div>{{it.value + it.unit}}</div>
                    </div>
                </div>
            </div>
            <el-table
                v-show='selectShowType === 1'
                :data="sensorList.filter((e)=>{ return e.channelType === 1 })"
                row-key="id"
                class='scrollbarNone'
                style="width: 100%;font-size:13px;" >
                <el-table-column
                    property="name"
                    label="名称" />
                <el-table-column
                    property="channel"
                    label="通道号" />
                <el-table-column
                    label="操作"
                    width="150" >
                    <template slot-scope="scope">
                    <!-- 二挡开关 -->
                    <el-switch
                        v-if="scope.row.hd_sensor_type_code == '101'"
                        v-model="scope.row.value"
                        @change="handelSwitch(scope.row, scope)"
                        v-loading="scope.row.loading"
                        :active-value="1"
                        :inactive-value="0"
                        active-color="#13ce66"
                        inactive-color="#BBB7B7" >
                    </el-switch>
                    <!-- 三挡开关 -->

                    <el-radio-group
                        v-if="scope.row.hd_sensor_type_code === '102'"
                        v-model="scope.row.value"
                        size="small"
                        v-loading="scope.row.loading"
                        @change="handelWindow(scope.row, scope)" >
                        <el-radio-button key="8" :label="8">开</el-radio-button>
                        <el-radio-button key="10" :label="10" >停</el-radio-button>
                        <el-radio-button key="9" :label="9" >关</el-radio-button> 
                    </el-radio-group>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 展示日志信息 -->
            <div
                class="model cgq_model"
                id="logPanel"
                v-show='selectShowType === 2'
            >
                <div
                class="model_name"
                style="border-bottom:0px;overflow: hidden;"
                >
                <div style="float: left;">设备日志</div>
                <div style="float: right;">
                    <!-- <div
                    @click="loadAllLog"
                    style="margin-top: -2px;padding-right: 5px;cursor: pointer;"
                    ><i class="el-icon-full-screen fullScreen"></i></div> -->
                </div>
                </div>
                <div class="cgq_model_div">
                <div
                    class="cgq_model_timeLine"
                    style="margin-top:8px;margin-right: 2px;"
                >
                    <div class='noData' v-show='activities.length === 0'>暂无信息</div>
                    <el-timeline>
                    <el-timeline-item
                        v-for="(item, index) in activities"
                        :key="index"
                        size="large"
                        :icon="item.icon"
                        :color="item.color"
                        placement="top"
                    >
                        <el-card>
                        <div>
                            <span
                            style="padding: 3px 6px;"
                            :style="'border-radius:5px;color:#FFF;background:' + item.color"
                            >{{ item.type }}</span>
                        </div>
                        <p style="margin-top: 10px;">{{ item.title }}</p>
                        <div style="margin-top:10px;align-items: center;">
                            <div>
                            <img
                                style="width: 18px;height: 18px;align-self:center;position:absolute"
                                src="/static/img/timer.png"
                            />
                            <span style="margin-left: 24px;">{{ item.date }}</span>
                            </div>
                            <div style="margin-left:24px">操作人:{{ item.u_name }}</div>
                        </div>
                        </el-card>
                    </el-timeline-item>
                    </el-timeline>
                </div>
                </div>
            </div>

            <!-- 展示预警信息 -->
            <div
                class="model cgq_model"
                id="logPanel"
                v-show='selectShowType === 3'
            >
                <div
                class="model_name"
                style="border-bottom:0px;overflow: hidden;"
                >
                <div style="float: left;">设备预警</div>
                <div style="float: right;">
                    <!-- <div
                    @click="loadAllLog"
                    style="margin-top: -2px;padding-right: 5px;cursor: pointer;"
                    ><i class="el-icon-full-screen fullScreen"></i></div> -->
                </div>
                </div>
                <div class="cgq_model_div">
                <div
                    class="cgq_model_timeLine"
                    style="margin-top:8px;margin-right: 2px;"
                >
                    <div class='noData' v-show='activitiesWarn.length === 0'>暂无信息</div>
                    <el-timeline>
                    <el-timeline-item
                        v-for="(item, index) in activitiesWarn"
                        :key="index"
                        size="large"
                        :icon="item.icon"
                        :color="item.color"
                        placement="top"
                    >
                        <el-card>
                        <div>
                            <span
                            style="padding: 3px 6px;"
                            :style="'border-radius:5px;color:#FFF;background:' + item.color"
                            >{{ item.type }}</span>
                        </div>
                        <p style="margin-top: 10px;">{{ item.title }}</p>
                        <div style="margin-top:10px;align-items: center;">
                            <div>
                            <img
                                style="width: 18px;height: 18px;align-self:center;position:absolute"
                                src="/static/img/timer.png"
                            />
                            <span style="margin-left: 24px;">{{ item.date }}</span>
                            </div>
                            <div style="margin-left:24px">操作人:{{ item.u_name }}</div>
                        </div>
                        </el-card>
                    </el-timeline-item>
                    </el-timeline>
                </div>
                </div>
            </div>
        </div>
        <camera-photo ref="cameraPhoto" />
    </div>
</template>

<script>
import sensorEcharts from "@/views/sensorEcharts";
import { openChannel, closeChannel } from "@/utils/websocket_util.js";
import { getDeviceRunLogListByh_id } from '@/api/map3d/index'
import { parseTime } from '@/utils/index';
import { getLogTypeDes, getLogTypeColor, getLogTypeIcon } from '@/utils/logutil';
import cameraPhoto from "@/views/base/video/module/CameraPhoto";
export default {
    components: {
        sensorEcharts,
        cameraPhoto
    },
    props: {
        datas: {
            type: Object,
            default: ()=> {}
        }
    },
    watch :{
        datas(it){
            this.listRowClick(it);        
        }
    },
    data (){
        return {
            activeNames: 1,
            filter: "",
            taggle: true,
            currentID: "",
            currentIds: [],
            showInfoModel: false,
            sensorList: [],
            deviceInfo: {},
            selectShowType: 0,
            activitiesWarn: [],
            activities: [],
            sxt: ""
        }
    },
    methods: {

        cameraPhoto (){
            // if (this.selectSxt) {
            this.$refs.cameraPhoto.dialogVisible = true;
            this.$refs.cameraPhoto.hd_device_id = this.sxt;
            this.$refs.cameraPhoto.getData();
            // } else {
                // this.$message.warning("暂无相册");
            // }
        },

        changeShowType (num){
            this.selectShowType = num;
        },

        taggleShow (){
            this.taggle = !this.taggle;
            if( this.taggle ){
                this.showInfoModel = false;
                if( this.deviceInfo.graphic && this.deviceInfo.graphic.dom ){
                    // 如果存在几何 清除掉几何的弹窗
                    this.deviceInfo.graphic.dom.remove();
                    this.deviceInfo.graphic.dom = null;
                }
            }
        },

        // 菜单变化的事件
        handleChange() {
            
        },

        changeSensor (id){
            this.currentID = id;
        },

        getIcon(it) {
            var a = null;
            try{
                a = require('@/assets/img/Plan/sbIcon/' + it.hd_device_type_code + '_' + it.state + '.png');
            }catch(e){ }
            return a;
        },

        listRowClick(it) {
            // 隐藏列表
            this.taggle = false;
            this.showInfoModel = true;
            // 显示这个设备的基本信息
            this.deviceInfo = it;
            var sensor = it.sensorInfos.map((e)=>{ return e.hd_device_sensor_id  });
            this.currentID = sensor[0];
            this.currentIds = sensor.join(",");
            this.sensorList = JSON.parse( JSON.stringify(it.sensorInfos.map((e)=>{ e.loading = false; return e; })) );
            // 显示这个设备的日志信息
            this.getDeviceRunLogListByh_id(it.id);
            // 显示这个设备的预警信息
            this.getDeviceWarnListByh_id(it.id,"SensorException");
            // 查询到几何
            var graphic = it.graphic;
            if( !graphic ) return;
            if( it.hd_device_type_code === 'JK-SX' ){
                this.sxt = it.id;
                this.$parent.dialog(graphic,`
                    ${it.name}
                `);
            }else{
                this.sxt = "";
                // 设置几何
                this.$parent.showDialogDevice(it.graphic);
            }
            // 定位几何位置
            this.view.goTo({
                center: graphic.geometry,
                zoom: 19
            })
        },

        handelSwitch (row, scope) {
            if (row.loading) {
                return;
            }
            var hd_sensor_id = row.hd_device_sensor_id;
            var index = scope.$index;
            row.loading = true;
            if (row.value == 1) {
                openChannel(hd_sensor_id, this.$ws)
                .then(res => {
                    row.value = 1;
                    row.loading = false;
                })
                .catch(err => {
                    this.$message.error(err.msg);
                    row.value = 0;
                    row.loading = false;
                });
            } else {
                closeChannel(hd_sensor_id, this.$ws)
                .then(res => {
                    row.value = 0;
                    row.loading = false;
                })
                .catch(err => {
                    this.$message.error(err.msg);
                    row.value = 1;
                    row.loading = false;
                });
            }
        },

        // 显示设备的预警信息
        getDeviceRunLogListByh_id (id){
            this.activities = [];
            getDeviceRunLogListByh_id(id).then((e)=>{
                for (let index = 0; index < e.data.content.length; index++) {
                    const element = e.data.content[index];
                    var obj = {
                        title: element.tle,
                        content: element.cont,
                        u_name: element.u_name,
                        date: parseTime(element.i_date),
                        type: getLogTypeDes(element.type),
                        color: getLogTypeColor(element.type),
                        icon: getLogTypeIcon(element.type)
                    };
                    this.activities.push(obj);
                }
            })
        },

        // 显示设备的预警信息
        getDeviceWarnListByh_id (id,type){
            this.activitiesWarn = [];
            getDeviceRunLogListByh_id(id,type).then((e)=>{
                for (let index = 0; index < e.data.content.length; index++) {
                    const element = e.data.content[index];
                    var obj = {
                        title: element.tle,
                        content: element.cont,
                        u_name: element.u_name,
                        date: parseTime(element.i_date),
                        type: getLogTypeDes(element.type),
                        color: getLogTypeColor(element.type),
                        icon: getLogTypeIcon(element.type)
                    };
                    this.activitiesWarn.push(obj);
                }
            })
        }

    }
    
}
</script>

<style>
    .deviceInfoBox.show {
        left: 0;
    }
    .deviceInfoBox {
        position: absolute;
        left: -400px;
        top: 0;
        bottom: 0;
        width: 400px;
        background: #ffffff;
        transition: left 0.25s;
    }
    .deviceInfoBox::-webkit-scrollbar{
        width: 0px;
    }
    .deviceInfoBox .el-collapse-item__header {
        height: 42px;
        line-height: 42px;
        /* background-color: #2ab8ef; */
        color: #000000;
    }
    .deviceInfoBox .jd {
        width: 33%;
        padding: 8px 8px;
        box-sizing: border-box;
    }
    .deviceInfoBox .dk {
        width: 33%;
        padding: 8px 8px;
        box-sizing: border-box;
    }
    .deviceInfoBox .mc {
        width: 33%;
        padding: 8px 8px;
        box-sizing: border-box;
    }
    .deviceInfoBox .listRow {
        display: flex;
        border-bottom: solid 1px #9e9a9a;
        font-size: 12px;
        cursor: pointer;
        transition: all 0.25s;
    }
    .deviceInfoBox .listRow:hover {
        background: #a9cfde;
        color: #fff;
    }
    .deviceInfoBox .ps {
        color:#0097de;
        font-size: 16px;
    }
    .deviceInfoBox .ic,.deviceInfoBox .ps {
        display: flex;
        justify-items: center;
        align-items: center;
    }
    .deviceInfoBox .ic img {
        width: 21px;
        height: 21px;
    }
    .deviceInfoBox .taggleIcon:hover {
        background: #0097de;
        color:#ffffff;
    }
    .deviceInfoBox .taggleIcon {
        position: absolute;
        top: 0;
        right: -52px;
        padding: 14px;
        background: #fff;
        cursor: pointer;
        transition: all 0.25s;
    }
    .deviceInfoModel::-webkit-scrollbar {
        width: 1px;
    }
    .deviceInfoModel {
        position: fixed;
        top: 50px;
        left: 10px;
        bottom: 15px;
        background: #ffffff;
        overflow: auto;
        padding: 8px;
        border-radius: 4px;
        width: 365px;
    }
    .deviceInfoModel .deviceList {
        display: flex;
        flex-wrap: wrap;
    }
    .deviceInfoModel .deviceInfo {
        font-size: 12px;
        text-align: center;
        width: 33%;
    }
    .deviceInfoModel .deviceInfo.active {
        color: #0097de;
        background: #00adff66;
        border-radius: 7px;
    }
    .deviceInfoModel .deviceInfo img { 
        height: 37px;
        width: 37px;
    }
    .deviceInfoBox .lies {
        height: calc(100% - 40px);
        overflow: auto;
    }
    .deviceInfoBox .lies::-webkit-scrollbar {
        width: 0px;
    }
    .deviceInfoBox .deviceInfoList {
        padding: 5px 0;
        font-size: 12px;
        /* color: #03A9F4; */
    }
    .deviceInfoBox .nameTitle {
        padding: 4px 0;
        font-size: 16px;
        border-bottom: solid 1px #000;
    }

    .deviceInfoBox .tabType {
        display: flex; 
        justify-content: space-evenly;
        text-align: center;
        border-top: solid 1px #aba6a6;
        border-bottom: solid 1px #aba6a6;
        padding: 9px 0;
        margin: 5px 0;
    }

    .deviceInfoBox .tabType .active {
        color: #0097de;
    }

    .deviceInfoBox .tabType .active .imgTop {
        background: #0097de;
        color: #ffffff;
    }

    .deviceInfoBox .tabType .imgTop {
        cursor: pointer;
        height: 25px;
        width: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #fff;
        border-radius: 50%;
        border: solid 1px #a29999;
        margin-bottom: 5px;
    }

    .deviceInfoBox .noData {
        border: solid 1px #a9a9a9;
        text-align: center;
        font-size: 16px;
        padding: 15px;
    }

    .deviceInfoBox .imgBox {
        height: 225px;
        position: relative;
        margin: -10px -10px 0;
    }
    .deviceInfoBox .imgBox .imgBox_btn {
        background: #000000a8;
        padding: 6px;
        position: absolute;
        right: 5px;
        top: 5px;
        color: #fff;
        border-radius: 4px;
        cursor: pointer;
    }
    .deviceInfoBox .imgBox > iframe,
    .deviceInfoBox .imgBox > img {
        height: 100%;
        width: 100%;
        border: none;
        /* width: 100%; */
    }

</style>