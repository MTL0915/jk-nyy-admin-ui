<template>
  <div>
    <div class="box">
      <div class="left">
        <el-tree :data="rs_facilitiesData" :default-expand-all="true" :highlight-current="true"	 :props="defaultProps" @node-click="rs_facilitiesSelect"></el-tree>
      </div>
      <div class="content">
        <div class="areaName">
          <p>{{ rs_facilities_name }}</p>
        </div>
        <div style="border-bottom:1px solid #ccc;height:90px">
          <div class="plantStatus" v-for="(item,index) in showPlantList" :key="index" @click="choosePlant(item)">

            <div v-if="index === 0">
              <div class="tip" :style="{background:''}">正在种植 </div>
              <div class="arrow" :style="{borderColor:''}"></div>
            </div>
            <div v-if="index !== 0">
              <div class="tip" :style="{background:'#D8D8D8'}">历史种植</div>  
              <div class="arrow" :style="{borderColor:'#D8D8D8 transparent transparent transparent'}"></div>
            </div>

            <img :src="process_env_image_url + item.crop_image_path" class="plantImg" />
            <div class="plantContent">
              <p style="font-size:16px;margin-bottom:5px">{{ item.crop_name }}</p>
              <span>{{ item.plantStartTime }} 到 {{ item.plantEndTime }}</span>
            </div>
          </div>
          <div style="float:right;margin-top:20px;margin-right:10px;cursor:pointer;" @click="showAddPalnt()">
            <img src="@/assets/img/area/add2.png" style="width:60px;height:60px;">
          </div>
        </div>
        <div class="dizhi">
          <div style="width:120px;height:120px;float:left">
            <img src="@/assets/img/area/landSource.png" style="width:100%;height:100%">
          </div>
          <div style="float:left;margin-left:30px;height:120px;width:calc(100% - 150px)">
            <div style="height:60px">
              <div class="dizhi_property" >
                <div>检测日期</div>
                <div class="dizhi_property_value">{{selectPlant.checkTime}}</div>
              </div>
              <div class="dizhi_property" >
                <div>检测机构</div>
                <div class="dizhi_property_value">{{selectPlant.checkOrg}}</div>
              </div>
              <div class="dizhi_property" >
                <div>PH值</div>
                <div class="dizhi_property_value">{{selectPlant.ph}}</div>
              </div>
              <div class="dizhi_property" >
                <div>EC值（土壤盐分）</div>
                <div class="dizhi_property_value">{{selectPlant.ec}}</div>
              </div>
              <div style="clear:both"></div>
            </div>
            <div style="height:60px;margin-top:10px">
              <div class="dizhi_property" >
                <div>铵态氮</div>
                <div class="dizhi_property_value">{{selectPlant.nitrogen}}</div>
              </div>
              <div class="dizhi_property" >
                <div>速效磷</div>
                <div class="dizhi_property_value">{{selectPlant.phosphorus}}</div>
              </div>
              <div class="dizhi_property" >
                <div>有效钾</div>
                <div class="dizhi_property_value">{{selectPlant.kalium}}</div>
              </div>
              <div class="dizhi_property" >
                <div>有机质</div>
                <div class="dizhi_property_value">{{selectPlant.organic}}</div>
              </div>
              <div style="clear:both"></div>
            </div>
            
          </div>
          <div style="clear:both">
          </div>
        </div>
        <div class="inputs">
          <div class="inputs-title">
            投入品
          </div>
          <div>
            <div class="inputs-pro">
              <img src="@/assets/img/area/zhongzi.png">
              <br>
              种子
            </div>
            <div class="inputs-body">
              <div class="inputs-body-div" v-for="(item,index) in zhongziList">
                <div style="float:right;margin-top:5px;margin-right:10px">
                  <span style="color:#d86969;cursor:pointer" @click="editAreaPutAdd(item.id)">编辑</span>
                  <span style="color:#d86969;cursor:pointer" @click="deletePut(item.id)">删除</span>
                </div>
                <div style="clear:both;margin-left:10px">
                  <div style="float:left;width:70px;height:70px;" > 
                    <img src="@/assets/img/area/zhongzi.png" style="width:100%;height:100%">
                  </div>
                  <div style="float:left;margin-left:20px;font-size:16px">
                    <span style="font-size: larger;font-weight: bold;">{{item.name}}</span><br>
                    <span>{{item.weight}}kg</span><br>
                    <span>{{item.insertDate}}</span><br>
                  </div>
                  <div style="clear:both"/>
                </div>
              </div>

              <div style="width:10%;float:left;margin-top:10px;" >
                 <img src="@/assets/img/area/add.png" style="width:100%;height:100%;cursor:pointer" @click="showAreaPutAdd(1)">
              </div>
            </div>
            <div style="clear:both"/>
          </div>
          <div>
            <div class="inputs-pro">
              <img src="@/assets/img/area/nongyao.png">
              <br>
              农药
            </div>
            <div class="inputs-body">
              <div class="inputs-body-div" v-for="(item,index) in nongyaoList">
                <div style="float:right;margin-top:5px;margin-right:10px">
                  <span style="color:#d86969;cursor:pointer" @click="editAreaPutAdd(item.id)">编辑</span>
                  <span style="color:#d86969;cursor:pointer" @click="deletePut(item.id)">删除</span>
                </div>
                <div style="clear:both;margin-left:10px">
                  <div style="float:left;width:70px;height:70px;" > 
                    <img src="@/assets/img/area/nongyao.png" style="width:100%;height:100%">
                  </div>
                  <div style="float:left;margin-left:20px;font-size:16px">
                    <span style="font-size: larger;font-weight: bold;">{{item.name}}</span><br>
                    <span>{{item.weight}}kg</span><br>
                    <span>{{item.insertDate}}</span><br>
                  </div>
                  <div style="clear:both"/>
                </div>
              </div>
            
              <div style="width:10%;float:left;margin-top:10px;" >
                 <img src="@/assets/img/area/add.png" style="width:100%;height:100%;cursor:pointer" @click="showAreaPutAdd(2)">
              </div>
            </div>
            <div style="clear:both"/>
          </div>
          <div>
            <div class="inputs-pro">
              <img src="@/assets/img/area/feiliao.png">
              <br>
              肥料
            </div>
            <div class="inputs-body">
              <div class="inputs-body-div" v-for="(item,index) in feiliaoList">
                <div style="float:right;margin-top:5px;margin-right:10px">
                  <span style="color:#d86969;cursor:pointer" @click="editAreaPutAdd(item.id)">编辑</span>
                  <span style="color:#d86969;cursor:pointer" @click="deletePut(item.id)"  >删除</span>
                </div>
                <div style="clear:both;margin-left:10px">
                  <div style="float:left;width:70px;height:70px;" > 
                    <img src="@/assets/img/area/feiliao.png" style="width:100%;height:100%">
                  </div>
                  <div style="float:left;margin-left:20px;font-size:16px">
                    <span style="font-size: larger;font-weight: bold;">{{item.name}}</span><br>
                    <span>{{item.weight}}kg</span><br>
                    <span>{{item.insertDate}}</span><br>
                  </div>
                  <div style="clear:both"/>
                </div>
              </div>

              <div style="width:10%;float:left;margin-top:10px;" >
                <img src="@/assets/img/area/add.png" style="width:100%;height:100%;cursor:pointer" @click="showAreaPutAdd(3)">
              </div>
            </div>
            <div style="clear:both"/>
          </div>
          <div>
            <div class="inputs-pro" style=" border-bottom:2px solid #E0E0E0">
              <img src="@/assets/img/area/other.png">
              <br>
              其它
            </div>
            <div class="inputs-body" style="border-bottom:2px solid #E0E0E0">
              <div class="inputs-body-div" v-for="(item,index) in otherList">
                <div style="float:right;margin-top:5px;margin-right:10px">
                  <span style="color:#d86969;cursor:pointer" @click="editAreaPutAdd(item.id)">编辑</span>
                  <span style="color:#d86969;cursor:pointer" @click="deletePut(item.id)">删除</span>
                </div>
                <div style="clear:both;margin-left:10px">
                  <div style="float:left;width:70px;height:70px;" > 
                    <img src="@/assets/img/area/other.png" style="width:100%;height:100%">
                  </div>
                  <div style="float:left;margin-left:20px;font-size:16px">
                    <span style="font-size: larger;font-weight: bold;">{{item.name}}</span><br>
                    <span>{{item.weight}}kg</span><br>
                    <span>{{item.insertDate}}</span><br>
                  </div>
                  <div style="clear:both"/>
                </div>
              </div>

              <div style="width:10%;float:left;margin-top:10px;" >
                <img src="@/assets/img/area/add.png" style="width:100%;height:100%;cursor:pointer" @click="showAreaPutAdd(10)">
              </div>
            </div>
            <div style="clear:both"/>
          </div>
        </div>
      </div>
      <div class="right">
        <div style="font-size:15px;margin-bottom:10px">地块信息</div>
        <div style="text-align:center">
          <div>
            <img src="/static/img/dk/dk-2.png" style="width:150px;height:150px">
          </div>
          <span style="font-size:15px;color:rgb(150, 147, 147)">
            总面积：{{rs_facilities_acreage}}亩
          </span>
        </div>
        <div style="margin-top:20px;width:90%;margin-left:5%">
          <span style="color:#003333">土地种植历史记录</span>
          <div style="margin-top:10px;height: 580px;overflow-y: auto;" >
            <ul data-v-150368dc="" class="el-timeline">
              <li data-v-150368dc="" class="el-timeline-item" v-for="(item,index) in plantList" style="cursor:pointer">
                <div class="el-timeline-item__tail"></div><div class="el-timeline-item__node el-timeline-item__node--normal el-timeline-item__node--">
                </div>
                <div class="el-timeline-item__wrapper"><div class="el-timeline-item__timestamp is-top">
                  {{item.plantStartTime}}
                </div>
                <div class="el-timeline-item__content" @click="choosePlant(item)">
                  <div data-v-150368dc="" class="el-card is-always-shadow">
                    <div class="el-card__body">
                      <h4 data-v-150368dc="">{{item.crop_name}}</h4> 
                      <p data-v-150368dc="">种植面积：{{item.acreage ? (item.acreage == 0 ? '--':item.acreage) :'--'}}（亩）</p> 
                      <p data-v-150368dc="">
                        <span style="color:#d86969" @click="showAddPalnt(item.id)" >编辑</span>
                        <span style="color:#d86969;cursor:pointer" @click="deletePlant(item.id)">删除</span>
                      </p>
                    </div>
                  </div>
                </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <areaAdd ref="areaAdd" :getPlant="getPlant"  />
    <areaPutAdd ref="areaPutAdd" :showPuts="showPuts"  />
   
  </div>
</template>
<script>
import { findByBs_base_id } from '@/api/rs_facilities'
import { get,del } from '@/api/rs_facilities/rsFacilitiesPlant'
import { get as getPuts,del as delPut } from '@/api/rs_facilities/rsFacilitiesPut'
import areaAdd from './areaAdd'
import areaPutAdd from './areaPutAdd'

const img = require("@/assets/img/area/landSource.png")
export default {
  components:{areaAdd,areaPutAdd},
  data() {
    return {
      rs_facilitiesData: [{
        name: '从化区禽畜水产技术推广中心',
        type: 'base',
        children: [{
          name: '智能灌溉'
        },{
          name: '鱼塘'
        },{
          name: '水肥一体机'
        }]
      }],
      process_env_image_url:process.env.IMG_URL,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      rs_facilities_acreage:666,
      rs_facilities_id:"",
      rs_facilities_name:"",
      plantList:[],
      showPlantList:[],
      selectPlant:{},
      putList:[],
      zhongziList:[],
      feiliaoList:[],
      nongyaoList:[],
      otherList:[],
      areaAddVisible:false
    }
  },
  created(){
    var cur_base_id = this.$store.state.baseinfo.cur_base_id;
    var cur_base_name = this.$store.state.baseinfo.cur_base_name;

    this.rs_facilitiesData[0].name = cur_base_name

    findByBs_base_id({
      'bs_base_id': cur_base_id
    }).then(res => {
      var data = res.data
      this.rs_facilitiesData[0].children = data
      
      if (data && data.length > 0){
        this.rs_facilities_acreage = data[0].acreage ? data[0].acreage : '--';
        this.rs_facilitiesSelect(data[0]);
      }
    })
  },
  methods: {
    showAreaPutAdd(type){
      this.$refs.areaPutAdd.show(this.selectPlant.id,type);
    },
    editAreaPutAdd(id){
      this.$refs.areaPutAdd.showEdit(id);
    },
    showAddPalnt(id){
      this.$refs.areaAdd.show(this.rs_facilities_id,id)
    },
    deletePut(id){
      this.$confirm('是否进行删除?', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          delPut(id).then(res => {
            if (res.code === 200){
              this.showPuts(this.selectPlant.id)
            }else{
              this.$message.error(res.msg)
            }
          })
        })
      return false
    },
    deletePlant(id){
      this.$confirm('是否进行删除?', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          del(id).then(res => {
            if (res.code === 200){
              this.getPlant()
            }else{
              this.$message.error(res.msg)
            }
          })
        })
      return false
    },
    rs_facilitiesSelect(rs){
      this.selectPlant = {}
      if (rs.type && rs.type === 'base'){
        return;
      }
      var rs_facilities_id = rs.id;
      if (rs_facilities_id === this.rs_facilities_id){
        return;
      }
      this.rs_facilities_id = rs_facilities_id;
      this.rs_facilities_name = rs.name;
      this.rs_facilities_acreage = rs.acreage ? rs.acreage : '--';
      this.getPlant()

    },
    getPlant(){
      this.zhongziList = []
      this.feiliaoList = []
      this.otherList = []
      this.nongyaoList = []

      var params = {
        "rs_facilities_id":this.rs_facilities_id,
        "sort":"plantStartTime,desc",
        "page":0,
        "size":100
      }
      get(params).then(res => {
        this.plantList = res.data.content
        if (this.plantList.length > 3){
          this.showPlantList = this.plantList.slice(0,3)
        }else{
          this.showPlantList = this.plantList
        }
        
        if (this.plantList.length > 0){
          this.choosePlant(this.plantList[0]);
        }
      })
    },
    choosePlant(plant){
      this.selectPlant = plant;
      this.showPuts(plant.id);
    },
    showPuts(plant_id){
      var params = {
        "rsFacilitiesPlantId":plant_id,
        "sort":"insertDate,desc",
        "page":0,
        "size":100
      }
      getPuts(params).then(res => {
        this.zhongziList = []
        this.feiliaoList = []
        this.otherList = []
        this.nongyaoList = []

        this.putList = res.data.content
        this.putList.forEach(put => {
          if (put.type == 1){
            if (this.zhongziList.length < 3){
              this.zhongziList.push(put)
            }
          }else if (put.type == 2){
            if (this.nongyaoList.length < 3){
              this.nongyaoList.push(put);
            }
          }else if (put.type == 3){
            if (this.feiliaoList.length < 3){
              this.feiliaoList.push(put);
            }
          }else{
            if (this.otherList.length < 3){
              this.otherList.push(put);
            }
          }
        })
      })
    }

  }
}
</script>
<style lang="stylus" scoped>
.box
  width 100%
  height 100%
  display flex
  margin-top 10px

.areaAddDiv >>> .el-dialog__body
  padding 10px 20px

.left
  width 200px
  margin-right 10px
  background #fff
  border-radius 5px
  padding 10px
.left >>> .el-tree-node__label{
  text-overflow:ellipsis;overflow:hidden;
}
.content
  flex 1
  margin-right 10px
  border-radius 5px
  background #fff
  padding 10px

.dizhi_property
  float:left
  width:calc(25% - 12px)
  margin-right:10px
  font-size:16px
  color:#727272
  /*border-right:1px solid #DDDDDD*/
  height:100%
.dizhi_property_value{
  color:black;
  margin-top:10px;
  font-size:17px
}
.right
  width 300px
  background #fff
  border-radius 5px
  padding 10px
.areaName
  padding 10px
  font-weight 700
  border-bottom 1px solid #ccc
.plantStatus
  position relative
  padding 30px 0 10px 0 
  display inline-block
  margin-right 10px
  cursor:pointer
.plantImg
  width 50px
  height 50px
  margin-right 10px
  vertical-align middle
.plantContent
  display inline-block
  vertical-align middle
.tip
  position absolute
  left 0px
  top 5px
  background #0FA2F8
  height 20px
  padding 5px
  color #fff
.arrow
  position absolute
  left 20px
  top 25px
  width 0
  height 0
  border-width 10px
  border-style solid
  border-color #0FA2F8 transparent transparent transparent
.dizhi
  padding 10px
.inputs
  padding 10px
.inputs-title
  width 130px
  height 45px
  border 2px solid #E0E0E0
  text-align center
  font-size:16px
  vertical-align middle
  line-height 45px
  color #424242
  border-bottom none
.inputs-pro
  width 130px
  height 120px
  border 2px solid #E0E0E0
  text-align center
  font-size 16px
  padding-top 30px
  float left
  border-bottom none

.inputs-body
  width calc(100% - 140px)
  height 120px
  border 2px solid #E0E0E0
  border-left none
  float left
  border-bottom none

.inputs-body-div
  width:calc(30% - 20px)
  height:calc(100% - 20px)
  background-color: rgb(232, 229, 229)
  margin:10px
  border-radius: 10px
  float:left
  min-width:200px
</style>