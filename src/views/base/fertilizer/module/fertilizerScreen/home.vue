<template>
  <div class="shuifeiji-box">
    <div class="shuifeiji">
      <div class="shuifeiji-left">
        <bgLeftPanglu></bgLeftPanglu>
        <!-- <bgLeftZaixian></bgLeftZaixian> -->
      </div>
      <div class="shuifeiji-right">
        <bgRight></bgRight>
      </div>
    </div>
    <div class="showList">
      <showList :allData="allData"></showList>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import MyWebSocket from "@/utils/MyWebSocket";
import { getToken } from "@/utils/auth";

// import { getTokenMethod } from "@/api/login";

import draggable from 'vuedraggable'

import bgLeftPanglu from "./pipePanglu/bgLeft.vue";
import bgLeftZaixian from "./pipeZaixian/bgLeft.vue";
import bgRight from "./pipePanglu/bgRight.vue";
import showList from "./showList";
import { productSfDetail, deviceList, getDetailById } from '@/api/shuifei'
export default {
  data() {
    return {
      // 基地id
      bs_base_id:'',
      // 根据水肥应用的id获取的详细信息
      allData:"",
      // 主设备的设备
      PKid1:"",
      // 副设备的设备
      PKid2:"",
      // 主设备的传感器
      PCid:""
    };
  },
  components: {
    bgLeftPanglu,
    bgLeftZaixian,
    bgRight,
    showList,
    draggable,
  },
  created() {
    // console.log(this.$route.query.id)
    this.getProductSfDetail()
    this.bs_base_id = this.$route.query.bs_base_id
    // axios获取token
    // const data = {
    //   expires_in: 0,
    //   password: "Matianle0915",
    //   username: "18923236683",
    // };
    // getTokenMethod(data).then((res) => {
    //   console.log(res);
    // });

    // axios获取设备
    const PKid1 = "PK01B-2110019";
    const PKid2 = "PK01B-2111020";
    // axios获取传感器
    const PCid = "PC01B-2110019";

    // websocket相关
    // if (Vue.prototype.$ws) {
    //   return;
    // }
    console.log("水肥建立socket连接");
    let ws = new MyWebSocket(process.env.WEBSOCKET_URL, getToken());
    // let ws = new MyWebSocket(
    //   "iot.joinken.cn/iotcs-websocket/socketServer",
    //   getToken()
    // );
    Vue.prototype.$ws = ws;
    if (!window["GLOBAL_VARIABLE"]) window["GLOBAL_VARIABLE"] = {};
    window["GLOBAL_VARIABLE"]["WEBSOCKET"] = ws;
    this.$ws.open(this);
    // 当浏览器界面关闭或刷新时触发该事件
    window.addEventListener("beforeunload", (e) => {
      this.$ws.close();
    });

    // 触发回调，获取websocket的数据
    this.$ws.deviceInfoUpload = this.getWebsocketInfo;

  },
  methods: {
    getProductSfDetail(){
      const data = {
        id: this.$route.query.id,
      }
      productSfDetail(data)
        .then(res => {
          if (res.code === 200) {
            this.allData = res.data
            console.log(this.allData,'allData')
            // 有副设备的情况
            if(res.data.vice_hd_device_id){
              const vice_data = {
                bs_base_id: this.$route.query.bs_base_id,
                hd_device_parent_id: res.data.vice_hd_device_id
              }
              deviceList(vice_data).then(res => {
                var viceArrObj = res.data.content.filter((item) => {
                  return item.hd_device_type_code == "JK-PK"
                })
                // this.PKid1 = this.allData.hd_device_childs[1].device_id
                this.PKid1 = this.allData.hd_device_childs.filter((item) => {
                  return item.device_id.slice(0,2) == "PK"
                })[0].device_id
                this.PKid2 = viceArrObj[0].device_id
                // this.PCid = this.allData.hd_device_childs[0].device_id
                this.PCid = this.allData.hd_device_childs.filter((item) => {
                  return item.device_id.slice(0,2) == "PC"
                })[0].device_id
                Promise.all([getDetailById({ device_id: this.PKid1 }), getDetailById({ device_id: this.PKid2 }), getDetailById({ device_id: this.PCid })]).then(([res1,res2,res3]) => {
                  this.$store.commit("SET_EQUIPMENT_DATA", {pkArr01:res1.data.sensor, pkArr02:res2.data.sensor});
                  this.$store.commit("INIT_CODE", {pkArr01:res1.data.sensor, pkArr02:res2.data.sensor});
                  this.$store.commit("SET_SENSOR_DATA", res3.data.sensor);
                });
              })
            }else{
              // 没有副设备的情况
              this.PKid1 = this.allData.hd_device_childs.filter((item) => {
                return item.device_id.slice(0,2) == "PK"
              })[0].device_id

              this.PCid = this.allData.hd_device_childs.filter((item) => {
                return item.device_id.slice(0,2) == "PC"
              })[0].device_id
              Promise.all([getDetailById(this.PKid1), getDetailById(this.PCid)]).then(([res1,res3]) => {
                this.$store.commit("SET_EQUIPMENT_DATA", {pkArr01:res1.data.sensor});
                this.$store.commit("INIT_CODE", {pkArr01:res1.data.sensor});
                this.$store.commit("SET_SENSOR_DATA", res3.data.sensor);
              });
            }
            // const vice_data = {
            //   bs_base_id: this.$route.query.bs_base_id,
            //   hd_device_parent_id: res.data.vice_hd_device_id
            // }
            // deviceList(vice_data).then(res => {
            //   console.log(res,'副设备数据')
            //   var viceArrObj = res.data.content.filter((item) => {
            //     return item.hd_device_type_code == "JK-PK"
            //   })
            //   // this.PKid1 = this.allData.hd_device_childs[1].device_id
            //   this.PKid1 = this.allData.hd_device_childs.filter((item) => {
            //     return item.device_id.slice(0,2) == "PK"
            //   })[0].device_id
            //   this.PKid2 = viceArrObj[0].device_id
            //   // this.PCid = this.allData.hd_device_childs[0].device_id
            //   this.PCid = this.allData.hd_device_childs.filter((item) => {
            //     return item.device_id.slice(0,2) == "PC"
            //   })[0].device_id
            //   console.log(this.PKid1,'pk1')
            //   console.log(this.PKid2,'pk2')
            //   console.log(this.PCid,'pc')
            //   Promise.all([getDetailById(this.PKid1), getDetailById(this.PKid2), getDetailById(this.PCid)]).then(([res1,res2,res3]) => {
            //     this.$store.commit("SET_EQUIPMENT_DATA", {pkArr01:res1.data.sensor, pkArr02:res2.data.sensor});
            //     this.$store.commit("INIT_CODE", {pkArr01:res1.data.sensor, pkArr02:res2.data.sensor});
            //     this.$store.commit("SET_SENSOR_DATA", res3.data.sensor);
            //   });
            // })

          }
        })
    },

    getWebsocketInfo(data) {
      // console.log("WebSocket" + "上报了");
      if (data.device_id == this.PKid2 && data.channelValue != null) {
        this.$store.commit("SET_EQUIPMENT_DATA", {pkArr02:data.sensorInfos});
        this.$store.commit("INIT_CODE", {pkArr02:data.sensorInfos});
        // console.log(data.sensorInfos);
        console.log(this.PKid2 + "装置设备上报");
      }
      if (data.device_id == this.PKid1 && data.channelValue != null) {
        this.$store.commit("SET_EQUIPMENT_DATA", {pkArr01:data.sensorInfos});
        this.$store.commit("INIT_CODE", {pkArr01:data.sensorInfos});
        // console.log(data.sensorInfos);
        console.log(this.PKid1 + "装置设备上报");
      }
      if (data.device_id == this.PCid) {
        this.$store.commit("SET_SENSOR_DATA", data.sensorInfos);
        // console.log(data.sensorInfos);
        console.log(this.PCid + "传感器上报");
      }
    },
  },

};
</script>

<style scoped>
.shuifeiji-box{
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: calc(100% - 98px);
  /* min-height: 1030px; */
  overflow: hidden;
  color: #fff;
}
.shuifeiji {
  display: flex;
  width: 1760px;
  height: 830px;
  position: relative;
  overflow-x: auto;
  overflow-y: hidden;
  padding-top: 180px;
  box-sizing: content-box;
  margin-right: 20px;
}
.shuifeiji-left {
  padding-left: 60px;
}
.shuifeiji-right {

}
/* .shuifeiji {
    zoom: 0.8;
} */
@media screen and (max-height: 1049px) {
  /* 弊端：火狐浏览器不支持 */
  .shuifeiji {
      zoom: 0.8;
  }
}
@media screen and (min-height: 1050px) {
  /* 弊端：火狐浏览器不支持 */
  .shuifeiji {
      zoom: 0.9;
  }
}

.shuifeiji::-webkit-scrollbar {/*滚动条整体样式*/
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 15px;
}

.shuifeiji::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(16,159,250,0.8);
  background: rgba(255,255,255,0.9);
}

.shuifeiji::-webkit-scrollbar-track { /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(255,255,255,0.9);
  border-radius: 0;
  background: rgba(0,0,0,0);
}

.showList{
  height: 100%;
}
/* .chosen {
  opacity: 0.4;
} */

.sortable-ghost{
  opacity: 0;
}

</style>