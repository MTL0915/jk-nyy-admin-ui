<template>
  <div
    id="plan"
    class="Plan"
  >
    <div
      v-show="show.intro"
      class="cover"
      style="position:absolute;width:100%;height:100%;top:0;left:0;background:#000000bd;z-index: 99999999999;"
    >
      <div>您还没有自己的基地地图，马上<el-link
          type="primary"
          style="font-size: 28px;"
          @click="switchEdit"
        >规划</el-link>一个吧</div>
    </div>
    <div
      v-if="!status.mode"
      class="drawControl"
    >
      <el-tooltip
        :value="show.intro_draw"
        :manual="true"
        class="item"
        effect="dark"
        content="点击这里创建对于类型"
        placement="bottom"
      >
        <div style="width:100%;height:100%;position:absolute;" />
      </el-tooltip>
      <!-- <el-tooltip :value='show.intro_draw_jd' :manual='true' class="item" effect="dark" content="点击这里创建对于类型" placement="bottom">
        <div id="add-marker" class="nitem add-marker" title="新建基地" />
      </el-tooltip> -->
      <div class="webgis-navbar clearfix">
        <el-tooltip
          :value="show.intro_draw_jd"
          :manual="true"
          class="item"
          effect="dark"
          content="创建基地"
          placement="bottom"
        >
          <div
            id="add-base"
            style="position:relative;"
            class="nitem add-base"
            title="圈定基地"
            @click="createJiDi()"
          />
        </el-tooltip>
        <el-tooltip
          :value="show.intro_draw_dk"
          :manual="true"
          class="item"
          effect="dark"
          content="创建地块"
          placement="bottom"
        >
          <div class="nitem ntiem-group">
            <span
              v-for=" (item,index) in data.dkType "
              id="add-jiarws"
              :key="index"
              :title="item.name"
              class="group-icon"
              @click="createDiKuaiByTypes( item )"
            >
              <img :src="item.image_path">
            </span>
          </div>
        </el-tooltip>
        <el-tooltip
          :value="show.intro_draw_sb"
          :manual="true"
          class="item"
          effect="dark"
          content="创建设备"
          placement="bottom"
        >
          <div class="nitem ntiem-device">
            <span
              id="add-video"
              class="device-icon add-video"
              title="发现设备"
              @click="addDevice"
            />
          </div>
        </el-tooltip>
        <div class="nitem ntiem-device">
          <span
            id="add-video"
            class="device-icon add-vr"
            title="创建全景图"
            @click="addVR"
          />
        </div>
      </div>
    </div>

    <!-- body -->
    <div class="content">
      <div
        ref="mapBox"
        class="map_content"
      >
        <div
          id="mapBox"
          :class="mapOpen ? &quot;open&quot; : &quot;&quot;"
        />
        <div
          id="utilBox"
          style="position: absolute;right: 21px;bottom: 107px;border-radius: 4px;background: #fff;width: 30px;"
        >
          <div
            style="width: 100%;height: 30px;display: flex;align-items: center;justify-content: center;cursor: pointer;"
            @click="toggleFullScreen"
          >
            <!-- <img src='@/assets/img/Plan/full.png' style="width: 18px;" /> -->
            <span>全屏</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 切换模式按钮 -->
    <div
      v-intro="'请先点击进入编辑模式创建基地'"
      v-intro-position="'top'"
      v-show="getCur_user_level() && !isBaseId || show.intro_mode"
      id="selectMode"
      ref="selectMode"
      data-step="7"
      class="qiehuanBtn"
      style="cursor: pointer;position: absolute;z-index: 99;right: 15px;top: 15px;"
      @click="switchMode"
    >
      <div v-show="!show.selectJd">
        <!-- <el-tooltip :value='show.intro && status.mode' :manual='true' class="item" effect="dark" content="点击此处进入编辑模式" placement="bottom"> -->
        <img
          v-if="status.mode"
          style="width:50px;height:50px;"
          src="/static/map/img/cq_03_03.jpg"
        >
        <!-- </el-tooltip> -->
        <!-- <el-tooltip :value='show.intro && !status.mode' :manual='true' class="item" effect="dark" content="点击此处进入预览模式" placement="bottom"> -->
        <img
          v-if="!status.mode"
          style="width:50px;height:50px;"
          src="/static/map/img/zy_02_03.jpg"
        >
        <!-- </el-tooltip> -->
        <span style="position: absolute;color: #ffffff;font-size: 12px;bottom: 6px;transform: scale(0.8);left: 0;">{{ status.mode ? "规划基地" : "退出保存" }}</span>
      </div>
    </div>
    <!-- 发现设备弹窗 -->
    <div
      ref="faxianshebeiWindow"
      style="display: none"
      class="faxianshebei"
    >
      <div style="padding: 8px 0;">设备序列号</div>
      <el-input v-model="bindSb.xlh" />
      <div style="padding: 8px 0;">设备验证码</div>
      <el-input v-model="bindSb.yzm" />
      <div style="padding: 8px 0;">地块选择</div>
      <el-select
        v-model="bindSb.dkid"
        placeholder="选择地块"
      >
        <el-option
          v-for="item in bindSb.dk"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <el-button
        type="primary"
        @click="faxianshebeiWindowOK"
      >查询</el-button>
      <el-button @click="faxianshebeiWindowClose">取消</el-button>
    </div>

    <!-- 设备信息列表 -->
    <equip-detail
      v-show="show.equip"
      ref="equipDetail"
    />
    <!-- 基地信息窗口 -->
    <JD-Info
      v-show="status.mode"
      ref="jdInfo"
      :style="isBaseId ? &quot;left: 15px;&quot; : &quot;&quot;"
    />
    <!-- 编辑基地模板 -->
    <Info-CreateJD
      v-show="show.isshowJDCreateInfo"
      ref="createJD"
    />
    <!-- 编辑地块模板 -->
    <Info-Createdk
      v-show="show.isshowCreateDK"
      ref="createDK"
    />
    <!-- 编辑设备模板 -->
    <Info-CreateSB
      v-show="show.isshowSBCreateInfo"
      ref="createSB"
    />
    <!-- 编辑界面地块设备树 -->
    <Jd-Tree
      v-show="!status.mode"
      ref="jdTree"
    />
    <!--  -->
    <map-CenterAt
      v-intro="'在此处查询你的基地所在地，点击搜索确认区域，绘制基地'"
      v-intro-position="'top'"
      v-show="(status.mode || true) && !isBaseId"
      ref="mapCenterAt"
      :style="!status.mode ? 'left: auto;border-radius: 8px;right: 70px;':''"
      style="z-index: 10;"
      data-step="8"
    />

    <add-Device
      ref="addDevice"
      :fn="addDeviceFn"
    />
    <edit-Device
      ref="editDevice"
      :noshow-info="false"
    />
    <device-Strategy ref="deviceStrategy" />

    <!-- 新手指引模块 -->
    <!-- <intro-Index ref='intro'></intro-Index> -->

    <div
      v-if="show.vr"
      modal-append-to-body="false"
      class="vr_dialog"
      title=""
      style="width:100%;height:100%;position: absolute;top: 0;z-index: 99999;"
    >
      <!-- <iframe style="width:100%;height:100%;" src="https://i.svrvr.com/v2/pano/#/pano/088d992578" /> -->
      <iframe
        ref="vrIframe"
        style="width:100%;height:100%;"
        src=""
      />
      <i
        class="el-icon-close closeBtn"
        @click="show.vr = false"
      >退出</i>
    </div>
    <el-dialog
      :before-close="handleClose"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      :append-to-body="false"
      title="视频播放"
    >
      <!-- <vPlay :play="dialogVisible" :device_id='childRow.device_id'  /> -->
      <!-- :video-adress="videoAdress" :row="childRow" -->
      <iframe
        ref="video"
        :src="'/sxt?device_id='+childRow.device_id+'&playWay=play'"
        style="width:100%;height:500px"
      />
    </el-dialog>

    <map-legend
      ref="mapLegend"
      class="map_legend"
    />

    <add-vr
      :baseId='this.baseId'
      ref="addVrVue"
      :v-click="addVrClick"
    />

    <edit-vr ref="editVr"  />

    <!-- <el-dialog
      append-to-body
      :visible.sync="configBaseMapVisible"
      title="配置基地底图"
    >
      <div>
      <el-form label-width="80px">
        <el-form-item label="二维服务">
          <el-input v-model="layerUrl2d"></el-input>
        </el-form-item>
        <el-form-item label="三维服务">
          <el-input v-model="layerUrl3d"></el-input>
        </el-form-item>
        </el-form>
        <div style="width: 100%;text-align: center;">
          <el-button type="primary">保存</el-button>
          <el-button type="info">取消</el-button>
        </div>
      </div>
    </el-dialog> -->
    <!-- <form-list ref='createPanorScene'></form-list> -->
  </div>

</template>

<script>

// var one = false

// var _model = new model();
// 系统用的引用
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
import ajaxApi from '@/api/map'

// 业务用引用
import { mapInit, esri } from './mapUtil/mapInit.js'
import data from './mapUtil/data.js'
import business from './mapUtil/business.js'
import create from './mapUtil/create.js'

// 模块引用
import EquipDetail from '../equip/module/EquipDetail' // 设备显示模块
import JDInfo from './components/JD_info' // 显示基地模板

import InfoCreateJD from './components/Info_createJD' // 编辑基地模板
import InfoCreatedk from './components/Info_createdk' // 编辑地块模板
import InfoCreateSB from './components/Info_createSB' // 编辑设备模板
import editVr from './components/editVR' // 编辑设备模板

import JdTree from './components/Jd_tree' // 编辑模式下基地为创建单位模板

import mapCenterAt from './components/mapCenterAt' // 编辑模式下基地为创建单位模板

import addDevice from '../equip/module/EquipAdd' // 添加设备添加功能模块
import editDevice from '../equip/module/EquipEdit' // 添加设备添加功能模块
import DeviceStrategy from '@/views/base/hd_device_strategy/module/DeviceStrategy.vue'
import vPlay from '@/views/base/video/module/Sxt.vue'

import mapLegend from './components/map_legend' // 编辑模式下基地为创建单位模板

import addVr from './components/addVR' // 编辑模式下基地为创建单位模板

import introIndex from './components/intro' // 开始导航

import { edit as editUser } from '@/api/user'

// import formList from '.components/form.vue'

// var DKColor = [[208, 151, 163], [104, 182, 120], [62, 135, 180], [144, 185, 217], [115, 137, 73], [202, 149, 79], [0, 113, 219], [128, 194, 105], [85, 162, 140], [229, 123, 241], [114, 85, 231], [194, 197, 68], [194, 197, 68]]
export default {
  name: 'ArcgisMap',
  components: {
    EquipDetail,
    JDInfo,
    InfoCreateJD,
    InfoCreatedk,
    InfoCreateSB,

    JdTree,

    mapCenterAt,

    addDevice,
    editDevice,
    DeviceStrategy,
    vPlay,

    mapLegend, // 图例

    introIndex,

    addVr,

    editVr // 编辑全景场景
  },
  data () {
    return {
      isBaseId: !!window.param.baseId,
      baseId: this.$store.state.baseinfo.cur_base_id,

      // 地图显示数据
      mapData: {
        id: null, // 当前选中id
        jd: [],
        dk: [],
        sb: []
      },

      // 数据管理
      data: {
        dkType: [],
        sbType: []
      },

      // 状态值
      status: {
        // 是否时预览模式
        mode: true
      },

      // 显示权限
      show: {
        equip: false,
        isshowDKInfo: false,
        isshowJDInfo: false,
        isshowJDCreateInfo: false,
        isshowCreateDK: false,
        isshowSBCreateInfo: false,
        vr: false,
        intro: false,
        intro_mode: false, // 切换模式教程
        intro_select: false, // 搜索教程
        intro_draw_dk: false, // 绘制教程
        intro_draw_jd: false, // 创建基地教程
        intro_draw_sb: false // 绘制教程
      },

      // 关于绑定设备的操作
      bindSb: {
        xlh: '',
        yzm: '',
        dkid: '',
        dk: []
      },
      mapOpen: false,
      videoAdress: '',
      dialogVisible: false,
      childRow: {},
      // 是否全屏
      isFullscreen: true,

      layerUrl2d: null,
      layerUrl3d: null
    }
  },
  computed: {
    ...mapGetters([
      'id',
      'token',
      'user'
    ])
  },
  mounted () {
    // 刷新地块类型
    // this.getDKType()
    this.init()
    // 标准基地id
    this.baseId = this.$router.history.current.query.base_id;
  },
  created () {
    document.addEventListener('keyup', this.clearDraw.bind(this))

    // !one && this.intro();
    // one = true;

    if (this.user.web_navigator_status === null || this.user.web_navigator_status === 0) {
      this.$confirm('您是否进入用户入门指引导航?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '不再提示',
        type: 'warning',
        width: '250px'
      }).then(() => {
        this.startIntro()
      }).catch((action) => {
        if (action === 'cancel') {
          editUser({
            id: this.user.id,
            web_navigator_status: 1
          })
        }
      })
    }
  },
  activated () {
    // this.init()
    var query = this.$route.query
    if (query.status_mode !== undefined) {
      this.status.mode = query.status_mode
    }
    if (query.intro !== undefined) {
      // this.intro();
    }
  },
  methods: {

    handleClose (done) {
      // this.$refs.video.src = "";
      this.childRow = {};
      done()
    },

    startIntro () {
      var intro = window.introJs()
      intro.setOptions({ 'skipLabel': '结束', 'doneLabel': '结束', 'prevLabel': '上一步', 'nextLabel': '下一步', 'showStepNumbers': true }).start()
      intro.onchange(function (targetElement) {
        // not to do
      }).oncomplete(function () {
        intro.exit()
        this.intro()
      })
    },
    // 地图加载相关方法
    ...mapInit,
    // 加载数据的请求接口
    ...data,
    // 关于几何的创建端口
    ...business,
    // 创建方面的类
    ...create,
    // 初始化行为
    init () {
      // 显示地图
      this.mapInit()
      // 加载地块类型
      this.getDKType()
    },
    // 地图创建并且加载地图完毕后触发
    loadMap (map) {
      window.map = map;
      // 获取基地信息
      this.getMapJdByBs_org_id(() => {
        // 根据获取的基地信息生成基地
        this.renderJDPosition()
      })
    },
    // 根据id查询基地
    getJD (id) {
      id = id || this.getSelectId()
      return this.mapData.jd.find((e) => { return e.option.id === id })
    },

    // 显示设备信息
    showSBInfo (id, device_id, sensorNum) {
      this.$refs.equipDetail.handelWatch(id, device_id)
      if (sensorNum !== 0) {
        // 如果不存在传感器则显示设备信息
        // this.$refs.equipDetail.activeName = 'second'
        return
      }
    },

    // 显示地块信息
    showDKInfo (id) {
      // this.show.isshowDKInfo = true
      this.$router.push({ path: '/dkInfo', query: { id: id } })
    },

    // 显示基地模板
    showJDInfo (a) {
      this.show.isshowJDInfo = true
      this.$refs.jdInfo.setJD(a)
    },

    // 显示基地编辑模块
    showJDEdit (geometry) {
      this.editGeometry = geometry
      this.show.isshowJDCreateInfo = true
      this.show.isshowCreateDK = false
      this.show.isshowSBCreateInfo = false
      this.$refs.createJD.setGemotry(geometry)
    },

    // 显示地块编辑模块
    showDKEdit (geometry) {
      this.editGeometry = geometry
      this.show.isshowCreateDK = true
      this.show.isshowJDCreateInfo = false
      this.show.isshowSBCreateInfo = false
      this.$refs.createDK.setGemotry(geometry)
    },

    // 显示设备编辑模块
    showSBEdit (geometry) {
      this.editGeometry = geometry
      this.show.isshowSBCreateInfo = true
      this.show.isshowCreateDK = false
      this.show.isshowJDCreateInfo = false
      this.$refs.createSB.setGemotry(geometry)
    },

    // 退出编辑界面
    outEdit () {
      this.editGeometry && this.editGeometry.unedit && this.editGeometry.unedit()
      this.editGeometry = null
    },

    // 切换模式
    switchMode: function () {
      if (this.status.mode) {
        this.switchEdit()
      } else {
        if( opener ){
          opener.refresh3dMap && opener.refresh3dMap();
          window.close();
        }else{
          location.href = './map3d?base_id='+( this.baseId || this.$store.state.baseinfo.cur_base_id ); 
        }
        // this.switchPreview()
      }
    },
    // 切换预览模式
    switchPreview: function () {
      if (!this.getJD().graphic) {
        return this.$message({ message: '请先在地图上绘制地图，在进行其他操作', type: 'warning' })
      }
      this.status.mode = true
      this.show.isshowEdit = false
      // 隐藏基地显示面板
      this.show.isshowJDInfo = true
    },
    // 切换编辑模式模式
    switchEdit: function () {
      this.introClose();
      // 对用户进行权限管理
      if (!this.getCur_user_level()) { return this.$message({ message: '您没有编辑基地的权限', type: 'error' }) }
      if (!this.getSelectId()) {
        this.$message.error('请先选择基地')
        return
      }
      this.status.mode = false
      this.show.isshowEdit = true
      // 隐藏基地显示面板
      this.show.isshowJDInfo = false
      this.$refs.jdTree.show()
    },
    getSelectId () {
      return this.map.id
    },

    // 判断是否有编辑管理基地的权限
    getCur_user_level () {
      if (this.$store.state.baseinfo.cur_user_level > 3) {
        return false
      } else {
        return true
      }
    },

    createDiKuaiByTypes (it) {
      if (this.editGeometry) return this.$message({ message: '编辑状态中，无法进行该操作。', type: 'warning' })
      it = JSON.parse(JSON.stringify(it))
      this.createDiKuaiByType(it)
    },

    // 创建设备
    addDevice () {
      // 先进行描点
      this.createSheBei({

      }, (graphic) => {
        // 描点成功后 进行绑定流程
        this.$refs.addDevice.show({
          baseId: this.$store.state.baseinfo.cur_base_id,
          facilitiesId: graphic.attr.rs_facilities_id,
          fnCall: (res) => {
            var hd_device_id = res.data.id = res.data.hd_device_id
            // 根据设备id获取设备名称
            ajaxApi.getDetailById(hd_device_id, (event) => {
              var jd = this.getJD()
              jd.sb.push({
                graphic: graphic,
                option: event.data
              })
              graphic.attr = event.data
              var geometry = graphic
              // 将几何的点配置赋值未当前几何的坐标点
              geometry.option.point = [geometry.graphic.geometry.x, geometry.graphic.geometry.y]
              //   var id = geometry.attr.id
              var geometry_json = JSON.parse(geometry.export())
              var gps = esri.Geometry.webMercatorToGeographic(geometry.graphic.geometry)
              // 确认一下所属地块
              var dk = jd.dk ? jd.dk.find((e) => {
                return e.graphic ? esri.GeometryEngine.contains(e.graphic.graphic.geometry, geometry.graphic.geometry) : false
              }) : null
              // 如果地块不存在
              if (!dk) { this.$message({ message: '当前设备没有标注在地块上', type: 'warning' }) } else {
                // 如果存在地块 则判断是否是不同地块 提示用户
                if (dk.graphic.attr.id !== geometry.attr.rs_facilities_id) {
                  // 如果地块id不同的话
                  this.$message({ message: '当前设备的地块信息发生了变化', type: 'warning' })
                  geometry.attr.rs_facilities_id = dk.graphic.attr.id
                }
              }
              if (!geometry.attr.rs_facilities_id) { return this.$message({ message: '当前设备找不到所属的地块信息，请确认地块信息后保存', type: 'warning' }) }
              const config = {
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getToken() }
              }
              this.$axios.post(process.env.BASE_API + '/hd/hd_device/editAndSave', {
                'geometry_json': JSON.stringify(geometry_json),
                'hd_device_id': hd_device_id,
                'name': geometry.attr.name,
                'rs_facilities_id': geometry.attr.rs_facilities_id,
                'latitude': gps.y,
                'longitude': gps.x
              }, config).then(res => {
                if (res.data.code === 200) {
                  // 修改配置值
                  // geometry.attr.name = geometry.attr.name;
                  // 重新绘制几何
                  geometry.createGeometry()
                  // 将几何图形的名称删掉 重新显示名称
                  geometry.showName()
                  // 将添加的几何添加进入列表
                  this.getJD().sb.find((e) => { return e.option.id === hd_device_id }).graphic = geometry
                  // 刷新显示列表
                  this.$refs.jdTree.render()
                } else {
                  this.$message.error(res.data.msg)
                }
              })
              // 刷新列表
              this.$refs.jdTree.render()
              // 显示编辑设备界面
              this.showSBEdit(graphic)
            })
          },
          backCall: () => {
            // 如果取消则销毁设备
            graphic.remove()
          }
        })
      })
    },

    // 添加设备成功后
    addDeviceFn (res) {

    },

    // 点击设备高级之后
    high_Edit_Sb (sbId, jidi) {
      this.$refs.editDevice.handelEdit(sbId, jidi || this.$store.state.baseinfo.cur_base_id)
    },

    // 按esc退出编辑
    clearDraw: function (event) {
      if (this.isdraw && event.keyCode === 27 && !this.isBanDraw) {
        this.isdraw = false
        this.drawGeometry.deactivate()
      }
    },

    // 添加VR
    addVR () {
      this.createVR({}, function () {
        // this.$refs.addVrVue.show();
      })
      // this.$refs.addVrVue.show();
    },

    FullScreen (el) {
      if (document.webkitIsFullScreen) { // 退出全屏
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen()
        } else if (!document.msRequestFullscreen) {
          document.msExitFullscreen()
        }
      } else { // 进入全屏
        if (el.requestFullscreen) {
          el.requestFullscreen()
        } else if (el.mozRequestFullScreen) {
          el.mozRequestFullScreen()
        } else if (el.webkitRequestFullscreen) {
          el.webkitRequestFullscreen()
        } else if (el.msRequestFullscreen) {
          el.msRequestFullscreen()
        }
      }
    },
    toggleFullScreen () {
      this.isFullscreen = !this.isFullscreen
      var el = this.$refs.mapBox// target兼容Firefox
      this.FullScreen(el)
    },
    fullMap () {
      this.show.lange = false
      var ext = this.getJD().graphic.graphic._extent
      this.map.setExtent(ext)
      if (this.map) { this.map.setExtent(ext) }
      this.map.graphics.clear()
      this.$refs.jdList.datas = []
      this.$refs.gs.jdid = null
    },
    renderTree () {
      this.$refs.jdTree.render()
    },
    // 点击vr创建确认键
    addVrClick (json) {
      // this.createVR(json,function(){

      // })
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.introjs-arrow.top-right {
  background-image: none;
  width: auto;
  height: auto;
}
.Plan {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
}
.Plan .map_content {
  perspective: 500;
  -webkit-perspective: 500;
}

.Plan .content,
.Plan .map_content {
  height: 100%;
}

.Plan .mapBox > div {
  height: initial !important;
}

.Plan .map {
  width: 100%;
  height: 100%;
}
.Plan .showEditModeHtml {
  right: 0 !important;
}
.Plan .right_model {
  right: -300px;
}
.Plan .faxianshebei {
  position: absolute;
  top: 50%;
  z-index: 99;
  background: #fff;
  width: 400px;
  padding: 15px;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 15px;
}
.Plan .hidden {
  display: none;
}
.Plan .group-icon img {
  width: 34px;
  height: 28px;
}
.Plan .row {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.Plan .row .col_1 {
  width: 8.333%;
}
.Plan .row .col_2 {
  width: 16.666%;
}
.Plan .row .col_3 {
  width: 25%;
}
.Plan .row .col_4 {
  width: 33.333%;
}
.Plan .row .col_5 {
  width: 41.666%;
}
.Plan .row .col_6 {
  width: 50%;
}
.Plan .row .col_7 {
  width: 58.333%;
}
.Plan .row .col_8 {
  width: 66.666%;
}
.Plan .row .col_9 {
  width: 75%;
}
.Plan .row .col_10 {
  width: 83.333%;
}
.Plan .row .col_11 {
  width: 91.666%;
}
.Plan .row .col_12 {
  width: 100%;
}
.Plan .curP {
  width: 100%;
}
.Plan .jd_easy_info {
  padding: 8px;
  font-size: 12px;
}
.Plan .jd_easy_info .info_model {
  height: 33%;
}
.Plan .SB_info_model {
  padding: 8px;
  font-size: 12px;
  color: #fff;
  top: 0;
  left: 0;
}
.Plan .SB_info_model img {
  width: 100%;
  height: 100%;
}
.Plan .SB_info_model .info_model {
  height: 33%;
}
.Plan .SB_info_model .SB_info_content {
  position: relative;
}
.Plan .SB_info_model .cover {
  background: #404852;
  opacity: 0.85;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
}
.Plan .SB_info_model .curp {
  cursor: pointer;
}
.Plan .SB_info_model .head {
  font-size: 16px;
  padding: 8px 0;
}
.Plan .sb_info {
  display: flex;
}
.Plan .sb_info .sb_info_icon {
  width: 32px;
  height: 26px;
}
.Plan .sb_info .sb_info_con {
}
.Plan .valueRed {
  color: red;
}
.esriPopup .actionsPane {
  display: none;
}
.sx.el-message-box {
  /* width: 60%; */
  width: auto;
}

.vr_dialog {
  height: 100%;
  position: absolute;
}
.vr_dialog > .el-dialog {
  margin-top: 0 !important;
  height: 100%;
  margin-bottom: 0 !important;
}
.vr_dialog .el-dialog__body {
  height: 100%;
  box-sizing: border-box;
  padding: 0;
}
.vr_dialog .el-dialog__header {
  position: absolute;
  width: 100%;
}
.vr_dialog .el-dialog__headerbtn {
  left: 23px;
  padding: 3px;
  border: solid 1px #2a99ff;
  border-radius: 5px;
  color: #2a99ff;
}

.Plan .ifCover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
}

.vr_dialog {
  height: 100%;
  position: absolute;
}
.vr_dialog > .el-dialog {
  margin-top: 0 !important;
  height: 100%;
  margin-bottom: 0 !important;
}
.vr_dialog .el-dialog__body {
  height: 100%;
  box-sizing: border-box;
  padding: 0;
}
.vr_dialog .el-dialog__header {
  position: absolute;
  width: 100%;
}
.vr_dialog .el-dialog__headerbtn {
  left: 23px;
  padding: 3px;
  border: solid 1px #2a99ff;
  border-radius: 5px;
  color: #2a99ff;
}
.vr_dialog {
  animation: openVr 1s;
}
@keyframes openVr {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.Plan .map_content {
  perspective: 500;
  -webkit-perspective: 500;
}

.Plan .map_content #mapBox.open {
  animation: mapOpen 3s;
}

@keyframes mapOpen {
  /* 0% { transform: rotateX(0deg) scale(1); opacity: 1;}
  50% { transform: rotateX(0deg) scale(3) ;opacity: 0.8;}
  80% { transform: rotateX(45deg) scale(3) ; opacity: 0.5; }
  100% { transform: rotateX(45deg) scale(3) ;opacity: 0; } */
  0% {
    transform: scale(1);
    opacity: 1;
  }
  /* 50% { transform: rotateX(0deg) scale(3); opacity: 0.8;}
  80% { transform: rotateX(45deg) scale(3); opacity: 0.5; } */
  100% {
    transform: scale(3);
    opacity: 0;
  }
}

.Plan .content,
.Plan .map_content {
  height: 100%;
}

.Plan {
  position: absolute;
  height: 100%;
  width: 100%;
}
.Plan .map_content {
  perspective: 500;
  -webkit-perspective: 500;
}

.Plan .map_content #mapBox.open {
  animation: mapOpen 3s;
}

@keyframes mapOpen {
  0% {
    transform: rotateX(0deg) scale(1);
    opacity: 1;
  }
  50% {
    transform: rotateX(0deg) scale(3);
    opacity: 0.8;
  }
  80% {
    transform: rotateX(45deg) scale(3);
    opacity: 0.5;
  }
  100% {
    transform: rotateX(45deg) scale(3);
    opacity: 0;
  }
}

.Plan .cover > div {
  cursor: pointer;
  position: absolute;
  color: #ffffff;
  font-size: 20px;
  top: 50%;
  left: calc(50% - 230px);
  width: 100%;
}

.Plan .closeBtn {
  position: absolute;
  font-size: 12px;
  color: #fff;
  border-radius: 6px;
  left: 40px;
  top: 73px;
  padding: 12px;
  background: #000000c2;
  box-shadow: 0px 0px 3px #fff;
}
</style>
