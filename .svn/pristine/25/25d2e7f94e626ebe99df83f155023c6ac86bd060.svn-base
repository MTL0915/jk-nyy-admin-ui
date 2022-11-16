<template>
    <div class='showAllBase'>
        <!-- 查询搜索 -->
        <el-input v-show='showList' v-model='filter_key' @change='chaxun' placeholder="请输入内容">
        </el-input>
        <i @click='closeFilter' v-show='filter_key' class='el-icon-close closeFilter'></i>
        <!-- 基地列表 -->
        <div class='contentBox' v-show='showList'>
            <div class='filterArray' style='display:flex;' >
                <div class='filterModel'>
                    <div class='menuName'>{{shiName || "全部城市"}}</div>
                    <i class='el-icon-caret-bottom filterI'></i>
                    <div class='menus'>
                        <div style='width: 100px;border-right:solid 1px #ffffff;height: 100%;'>
                            <div class='areamenus' v-for='(it,i) in area' :key='i'>
                                <div class='areamenusname'>{{it.shen}}</div>
                                <div class='areamenuslist'>
                                    <div v-for='(its,i) in it.shi' :key='i' @click='selectCity(its)' class='curText'>{{its.shi_area_name}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class='filterModel'>
                    <div class='menuName'>{{sortName || "默认排序"}}</div>
                    <i class='el-icon-caret-bottom filterI'></i>
                    <div class='menus'>
                        <div class='divCenter curText' @click='deviceSort("设备排序","deviceCount,desc")'>设备从多到少</div>
                        <div class='divCenter curText' @click='deviceSort("设备排序","deviceCount,asc")'>设备从少到多</div>
                        <div class='divCenter curText' @click='deviceSort("地块排序","re_facilitiesCount,desc")'>地块从多到少</div>
                        <div class='divCenter curText' @click='deviceSort("地块排序","re_facilitiesCount,asc")'>地块从少到多</div>
                        <div class='divCenter curText' @click='deviceSort("创建时间","create_date,desc")'>创建时间从早到晚</div>
                        <div class='divCenter curText' @click='deviceSort("创建时间","create_date,asc")'>创建时间从晚到早</div>
                    </div>
                </div>
            </div>
            <div class='deviceInfoList'>
                <div class='deviceInfoListModel' 
                    @click='listRowClick(it)'
                    v-for='(it , i) in baseData' :key='i'>
                    <!-- 图标 -->
                    <div>
                        <img :src='require("@/assets/img/Plan/juhe1.png")' />
                    </div>
                    <!-- 内容 -->
                    <div style='padding: 0 8px;'>
                        <!-- 标题 -->
                        <div style='width:100%;' class='deviceInfoName'>{{it.name}}</div>
                        <div>广东省广州市天河区林和街27号中意花园A栋首层404号房间</div>
                        <div style='display: flex;justify-content: space-between;'>
                            <div>设备数量：{{it.deviceCount || 0}}</div>
                            <div>地块数量：{{it.rs_facilitiesCount || 0}}</div>
                        </div>
                    </div>
                    <!-- 图片 -->
                    <div>
                        <img class='deviceImg' :src='require("@/assets/img/imgny.png")' />
                    </div>
                </div>
            </div>
             <c-page ref='page' :page='page' :change='changePage' :count='count' :max='max'></c-page> 
        </div>
        <!-- <i class='el-icon-close blackBaseInfo' v-show='isbaseInfo'></i> -->
        <div @click='backBaseInfo' class='backBaseInfoDiv' v-show='isbaseInfo'>{{ "<" + "退回"}} </div>
        <base-info style='margin-top: 35px;' ref='baseInfo' class='info' v-if='isbaseInfo' :baseid='baseid' :orgid='orgid' :basecode='basecode'></base-info>
    </div>
</template>

<script>
import cPage from './page.vue'
import baseInfo from '@/views/base/info/module/view'
import { findMapBaseShiAreaByBs_user_id } from '@/api/map3d/index'
export default {
    components: {
        baseInfo,
        cPage
    },
    props: {
        datas: {
            type: Array,
            default: ()=> []
        },
        change: {
            type: Function,
            default: ()=>{}
        },
        max: 100
    },
    watch :{
        datas( it ){
            // 赛选关键字
            this.baseData = it.filter((e)=>{ return e.name.indexOf(this.filter_key) > -1 })
            // 赛选城市
            // this.baseData =  datas.filter((e)=>{ return e.name.indexOf(filter_key) > -1 })
            // 赛选排序
            // this.baseData = this.baseData.sort((e)=>{ return  })
        }
    }, 
    data (){
        return {
            page: 1,
            
            count: 5,
            baseData: [],
            filter_key: "",
            showList: true,
            isbaseInfo: false,
            options: [{
                value: '选项1',
                label: '黄金糕'
            }, {
                value: '选项2',
                label: '双皮奶'
            }, {
                value: '选项3',
                label: '蚵仔煎'
            }, {
                value: '选项4',
                label: '龙须面'
            }, {
                value: '选项5',
                label: '北京烤鸭'
            }],
            value: '',

            area: [],
            shi: "",
            shiName: "",
            sort: ""
        }
    },
    mounted (){
        // 求行政区域面积
        this.getAreaData();
    },
    methods: {

        // 获取行政区域菜单内容
        getAreaData (){
            findMapBaseShiAreaByBs_user_id().then((e)=>{
                // 对数据结果进行预处理
                var data = e.data;
                var ary = [];
                for( var i in data ){
                    var it = data[i];
                    // 判断是那个省的
                    var shen = it.sheng_area_name;
                    if( !shen ) {
                        shen = "其他"
                        it.shi_area_name = '全部区域'
                    }
                    // 判断这个省有没有收录
                    var dat = ary.find((e)=>{ return e.shen === shen });
                    if( !dat ) {
                        dat = { shen , shi: [] };
                        ary.push(dat);
                    }
                    dat.shi.push(it);
                }
                this.area = ary;
            })
        },

        filter (){

        },
        blackList (){

        },
        listRowClick (it){
            this.showList = false;
            this.isbaseInfo = true;
            setTimeout(()=>{
                this.baseid = it.id;
                this.$refs.baseInfo.baseid = it.id;
            },1000)
        },
        // 退出基地详细介绍
        backBaseInfo (){
            this.showList = true;
            this.isbaseInfo = false;
            // this.baseid = it.id;
        },
        
        // 修改頁碼
        setPage (i){
            this.$refs.page.setPage(i);
        },

        // 分页函数
        changePage (i){
            this.change(i);
        },

        // 选择城市
        selectCity (it){
            this.shi = it.shi_area_id;
            this.shiName = it.shi_area_name;
            this.$parent.baseChange("all");
        },

        // 進行排序
        deviceSort (name,it){
            this.sort = it;
            this.sortName = name;
            this.$parent.baseChange("all");
        },

        // 查询
        chaxun (){
            // 数据
            this.$parent.baseChange("all");
        },

        // 关闭查询
        closeFilter (){
            this.filter_key = "";
            this.chaxun();
        }
    }
}
</script>

<style>
    .showAllBase {
        position: absolute;
        top: 0;
        left: 0;
        padding: 15px;
        border-radius: 4px;
        width: 375px;
        height: 100%;
    }

    .showAllBase .contentBox {  
        margin-top: 15px;
        background: #ffffff;
        border-radius: 4px;
        height: calc(100% - 70px);
        padding-top: 10px;
    }

    .showAllBase .contentBoxHeader {
        bottom: solid 1px #ffffff;
    }

    .showAllBase .contentBoxData {
        display: flex;
        justify-content: left;
        flex-wrap: wrap;
        text-align: center;
        padding: 15px;
        border-bottom: solid 1px #bdbdbd;
        margin-bottom: 15px;
    }
    .showAllBase .contentBoxData > div {
        width: 33%;
        padding: 8px 0;
    }

    .showAllBase .deviceInfoList {
        padding: 10px;
        height: calc(100% - 84px);
        overflow: auto;
    }

    .showAllBase .deviceInfoListModel {
        display:flex;
        padding: 7px 0;
        cursor: pointer;
    }

    .showAllBase .deviceInfoListModel:hover {
        background: #ececec;
    }

    .showAllBase .deviceImg {
        width: 70px;
        height: 100%;
        border-radius: 6px;
    }

    .showAllBase .deviceInfoName {
        font-size: 13px;
        margin-bottom: 5px;
        color: #0087ff;
    }

    .showAllBase .blackInfo {
        /* position: absolute; */
        /* top: 15px; */
        background: #fff;
        width: calc(100% - 10px);
        /* left: 10px; */
        padding: 9px;
        border-radius: 4px;
        cursor: pointer;
    }
    
    .showAllBase .el-tabs__content {
        width: 100%;
    }

    .showAllBase .info {
        position:fixed;
        width:100%;
        height:100%;
        top: 0;
        left: 0;
        background: #ffffff;
    }

    .showAllBase .filterArray {
        display: flex;
    }

    .showAllBase .filterModel {
        /* position: relative; */
        width: 100%;
        color: #fff;
        cursor: pointer;
        display:flex;
        align-items: center;
    }

    .showAllBase .filterModel .filterI {
        /* position: absolute; */
        /* right: 5px; */
        /* top: 50%; */
        /* transform: translateY(-50%); */
        transition: all 0.25s;
        height: 12px;
    }

    .showAllBase .filterModel:hover > .filterI {
        transform: rotateZ(-180deg);
    }

    .showAllBase .filterModel:hover > .menus {
        display: block;
    }

    .showAllBase .filterModel .menuName {
        background: #adadad;
        padding: 6px;
        border-radius: 4px;
    }

    .showAllBase .filterModel .menus{
        display:none;
        position:absolute;
        width:311px;
        background: #3e3e3e;
        left: 0;
        height: 200px;
        top: 100%;
    }

    .showAllBase .filterModel .menus .areamenus {
        padding: 5px 0;
        font-size: 12px;
        border-bottom: solid 1px #ffffff;
        cursor: pointer;
    }

    .showAllBase .filterModel .menus .areamenus.active {
        
    }

    .showAllBase .filterArray {
        display: flex;
        width: 90%;
        margin: auto;
        background: #adadad;
        position: relative;
    }

    .showAllBase .blackBaseInfo {
        position: fixed;
        z-index: 99;
        right: 15px;
        top: 15px;
        color: #000000;
        border: solid 1px;
        padding: 8px;
    }

    .showAllBase .backBaseInfoDiv {
        position: fixed;
        top: 0px;
        left: 0px;
        height: 35px;
        line-height: 35px;
        background: #fff;
        width: 100%;
        cursor: pointer;
    }

    .showAllBase .backBaseInfoDiv:hover {
        color:#0087ff
    }

    .showAllBase .areamenus {
        /* position:relative; */
    }

    .showAllBase .areamenus:hover .areamenuslist {
        display: block; 
    }

    .showAllBase .areamenusname {

    }

    .showAllBase .areamenuslist {
        display: none;
        position:absolute;
        left: 101px;
        top: 0;
        width: calc(100% - 101px);
        background: #3e3e3e;
        height: 100%;
    }
    .showAllBase .areamenuslist > div {
        padding: 4px;
    }

    .showAllBase .closeFilter {
        position: absolute;
        right: 24px;
        top: 28px;
        font-size: 16px;
        cursor: pointer;
    }

    .showAllBase .divCenter {
        padding: 8px;
        text-align: center;
    }

    .showAllBase .curText:hover {
        color:#0087ff;
    }

</style>