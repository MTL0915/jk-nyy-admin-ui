<template>
  <div
    v-show="showWindow"
    class="vr_edit"
  >
    <div class="title"> 场景热点编辑 </div>
    <!-- 步骤一 -->
    <div
      v-show="step == 1"
      class="step1"
    >
      <div>热点类型</div>
      <div class="list">
        <!-- <div
          :class="hotType == 'audio' ? 'active':''"
          class="hotType"
          @click="clickHotType('audio')"
        >
          <img :src="require('@/assets/img/vr/ico_audio.png')">
        </div> -->
        <div
          :class="hotType == 'video' ? 'active':''"
          class="hotType"
          @click="clickHotType('video')"
        >
          <img :src="require('@/assets/img/vr/ico_video.png')">
        </div>
        <!-- <div
          :class="hotType == 'img' ? 'active':''"
          class="hotType"
          @click="clickHotType('img')"
        >
          <img :src="require('@/assets/img/vr/ico_img.png')">
        </div> -->
        <!-- <div
          :class="hotType == 'jump' ? 'active':''"
          class="hotType"
          @click="clickHotType('jump')"
        >
          <img :src="require('@/assets/img/vr/ioc_1.png')">
        </div> -->
        <div
          :class="hotType == 'jump' ? 'active':''"
          class="hotType"
          @click="clickHotType('device')"
        >
          <img :src="require('@/assets/img/vr/ioc_2.png')">
        </div>
        <div
          :class="hotType == 'link' ? 'active':''"
          class="hotType"
          @click="clickHotType('link')"
        >
          <img :src="require('@/assets/img/vr/ioc_3.png')">
        </div>
        <div
          :class="hotType == 'jump' ? 'active':''"
          class="hotType"
          @click="clickHotType('jump')"
        >
          <img :src="require('@/assets/img/vr/ioc_4.png')">
        </div>
        <div
          :class="hotType == 'list' ? 'active':''"
          class="hotType"
          @click="clickHotType('list',3)"
        >
          <img :src="require('@/assets/img/vr/ioc_4.png')">
        </div>
      </div>
      <div class="footor">
        <div
          class="close"
          @click="close"
        >取消</div>
      </div>
    </div>
    <div
      v-show="step == 2"
      class="step2"
    >
      <div>热点图标</div>
      <div class="list">
        <!-- <div
          class="hotPic"
          @click="updateIcon"
        >
          <img :src='require("@/vr/vr_new_updateFlie.png")'>
        </div> -->
        <div
          class="hotPic"
          @click="updateIcon"
        >
          <img :src="require('@/assets/vr/vr_new_updateFlie.png')">
        </div>
        <div
          v-for='(it,i) in iconList'
          :key='i'
          class="hotPic"
          @click="icon = it.image_path;next(3)"
        >
          <img :src="getImagePath(it.image_path)">
        </div>
      </div>
      <div class="footor">
        <div
          class="nextBtn"
          @click="next(1)"
        >上一步</div>
        <div
          class="close"
          @click="close"
        >取消</div>
      </div>
    </div>
    <div
      v-show="step == 3"
      class="step3"
    >
      <div>热点动作</div>
      <div
        v-show="hotType == 'jump'"
        class="list"
      >
        <el-form
          ref="form"
          label-width="80px"
        >
          <el-form-item label="热点标题">
            <el-input
              v-model="hotTitle"
              type="text"
            />
          </el-form-item>
          <el-form-item label="选择场景">
            <el-select
              v-model="scene"
              placeholder="请选择跳转的场景"
              @change="updateScene"
            >
              <el-option
                v-for="(it , i) in sceneList"
                :key="i"
                :label="it.name"
                :value="it.id"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div
        v-show="hotType == 'link'"
        class="list"
      >
        <el-form
          ref="form"
          label-width="80px"
        >
          <el-form-item label="热点标题">
            <el-input
              v-model="hotTitle"
              type="text"
            />
          </el-form-item>
          <el-form-item label="热点链接">
            <el-input
              v-model="hotLink"
              type="text"
            />
          </el-form-item>
          <el-form-item label="内部窗口">
            <el-switch v-model="hotLinkIsOpenWindow" />
          </el-form-item>
          <el-form-item label="窗口大小">
            <div style='display: flex;align-items: center;'>
              <div style='display:flex;align-items: center;'>
                <span>宽度</span>
                <el-input
                  style='margin-left: 14px;width: 230px;'
                  v-model="windowWidth"
                  type='number'
                />
              </div>
              <div style='display:flex;align-items: center;'>
                <span>高度</span>
                <el-input
                  style='margin-left: 14px;width: 230px;'
                  v-model="windowHeight"
                  type='number'
                />
              </div>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div
        v-show="hotType == 'list'"
        class="list"
      >
        <el-form
          ref="form"
          label-width="80px"
        >
          <el-form-item label="标题文案">
            <el-input
              v-model="hotTitle"
              type="text"
            />
          </el-form-item>
          <el-form-item label="数据来源">
            <el-radio
              v-model="listType"
              label="1"
            >第三方链接</el-radio>
            <el-radio
              v-model="listType"
              label="2"
            >文本域上传</el-radio>
          </el-form-item>
          <div v-show='listType == "1"'>
            <el-form-item label="列表链接">
              <el-input
                v-model="hotLink"
                type="text"
              />
            </el-form-item>
          </div>
          <div v-show='listType == "2"'>
            <el-form-item label="列表内容">
              <el-input
                v-model="hotHTML"
                type="textarea"
              />
            </el-form-item>
          </div>
          <el-form-item label="窗口位置">
            <div style='display:flex;align-items: center;'>
              <span>{{windowPositionLeftOrRight ? "靠左" : "靠右"}}</span>
              <el-switch
                style='margin-left: 14px'
                v-model="windowPositionLeftOrRight"
              />
              <el-input
                style='width: 230px;'
                v-model='windowPositionLeftOrRightValue'
                type='number'
              />
            </div>
            <div style='display:flex;align-items: center;'>
              <span>{{windowPositionTopOrBottom ? "靠上" : "靠下"}}</span>
              <el-switch
                style='margin-left: 14px'
                v-model="windowPositionTopOrBottom"
              />
              <el-input
                style='width: 230px;'
                v-model='windowPositionTopOrBottomValue'
                type='number'
              />
            </div>
          </el-form-item>
          <el-form-item label="窗口大小">
            <div style='display: flex;align-items: center;'>
              <div style='display:flex;align-items: center;'>
                <span>宽度</span>
                <el-input
                  style='margin-left: 14px;width: 230px;'
                  v-model="windowWidth"
                  type='number'
                />
              </div>
              <div style='display:flex;align-items: center;'>
                <span>高度</span>
                <el-input
                  style='margin-left: 14px;width: 230px;'
                  v-model="windowHeight"
                  type='number'
                />
              </div>
            </div>
          </el-form-item>
          <el-form-item label="默认显示">
            <el-switch
              v-model="device_show"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </el-form-item>
        </el-form>
      </div>
      <div
        v-show="hotType == 'video'"
        class="list"
      >
        <el-form
          ref="form"
          label-width="100px"
        >
          <el-form-item label="摄像头标题">
            <el-input
              v-model="hotTitle"
              type="text"
            />
          </el-form-item>
          <el-form-item label="选择地块">
            <el-select
              v-model="dk_sxt"
              placeholder="选择地块"
            >
              <el-option
                v-for="(it , i) in dkList_sxt"
                :key="i"
                :label="it.name"
                :value="it.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="选择摄像头">
            <el-select
              v-model="video"
              placeholder="请选择摄像头"
              @change="updateVideo"
            >
              <el-option
                v-for="(it , i) in videoList"
                :key="i"
                :label="it.name"
                :value="it.device_id"
                v-show='it.rs_facilities_id === dk_sxt'
              />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div
        v-show="hotType == 'device'"
        class="list"
      >
        <el-form
          ref="form"
          label-width="100px"
        >
          <el-form-item label="设备标题">
            <el-input
              v-model="hotTitle"
              type="text"
            />
          </el-form-item>
          <el-form-item label="选择地块">
            <el-select
              v-model="dk_sb"
              placeholder="选择地块"
            >
              <el-option
                v-for="(it , i) in dkList_sb"
                :key="i"
                :label="it.name"
                :value="it.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="选择设备">
            <el-select
              v-model="device"
              placeholder="请选择绑定的设备"
              @change="updateDevice"
            >
              <el-option
                v-for="(it , i) in deviceList"
                :key="i"
                :label="it.name"
                :value="it.id"
                v-show='it.rs_facilities_id === dk_sb'
              />
            </el-select>
          </el-form-item>
          <el-form-item label="默认展开">
            <el-switch
              v-model="device_show"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </el-form-item>
        </el-form>
      </div>
      <el-form
        ref="form"
        label-width="80px"
      >
        <el-form-item label="动画">
          <el-radio-group v-model="iconanimate">
            <el-radio label="">静态图片</el-radio>
            <el-radio label="icon_leftRight">左右浮动</el-radio>
            <el-radio label="icon_topBottom">上下浮动</el-radio>
            <el-radio label="icon_bigSmall">立体浮动</el-radio>
            <el-radio label="icon_rotateY">旋转浮动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否生效">
          <el-switch v-model="isEffective" />
        </el-form-item>
      </el-form>
      <div class="footor">
        <div
          v-show="!id"
          class="nextBtn"
          @click="_create"
        >创建</div>
        <div
          v-show="id"
          class="nextBtn"
          @click="_edit"
        >修改</div>
        <div
          class="nextBtn"
          @click="next(2)"
        >上一步</div>
        <div
          class="close"
          @click="close"
        > 取消</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getByPanorId as getScene } from '@/api/rsPanorScene'
import { addOrUpdatePanorIcon, listPanorIcon } from '@/api/rsPanor'

import { getSxtList } from '@/api/sxt'
import { deviceList } from '@/api/device'

export default {
  props: {
    create: {
      type: Function,
      default: new Function()
    },
    edit: {
      type: Function,
      default: new Function()
    },
    panor: {
      type: Object,
      default: {}
    }
  },
  watch: {
    panor () {
      // 加载图标列表
      this.getIconList();
    }
  },
  data () {
    return {
      isEffective: true,
      step: 1,
      showWindow: false,
      hotTitle: 'asdasdasd',
      hotLink: '',
      hotLinkIsOpenWindow: true,
      windowPositionType: true,    // true为跟随  false为自定义
      windowPositionLeftOrRight: true, // true 靠右 false 靠左
      windowPositionLeftOrRightValue: 15,
      windowPositionTopOrBottom: true, //
      windowPositionTopOrBottomValue: 15,
      windowWidth: 300,
      windowHeight: 200,
      listType: 1,
      hotHTML: "",
      hotType: '',
      iconanimate: '',
      icon: '',   //标签
      scene: '',  //场景
      device: '', //设备
      device_show: false, //设备默认展开
      video: '',
      sceneList: [],
      videoList: [],
      deviceList: [],
      dkList_sxt: [],
      dkList_sb: [],
      id: '',
      dk_sxt: '',
      dk_sb: '',
    }
  },
  mounted () {
    this.dk_sxt = this.$router.history.current.query.dk;
    this.sb = this.$router.history.current.query.dk;
  },
  methods: {

    getImagePath (path) {
      return process.env.VR_IMGPATH + path;
    },

    updateIcon () {
      var bs_base_id = this.$parent.panor.bs_base_id;
      if (!bs_base_id) {
        this.$message({
          message: '找不到基地对象，无法上传',
          type: 'warning'
        });
        return;
      }
      var file = document.createElement("input");
      file.type = 'file';
      file.onchange = () => {
        // 将获取到的文件files传入类型
        var formData = new FormData();
        formData.set("name", "")
        formData.set("bs_base_id", bs_base_id)
        formData.set("image_path", file.files[0])
        addOrUpdatePanorIcon(formData).then((res) => {

        })
      }
      file.click();
    },

    // 获取图标列表
    getIconList () {
      var bs_base_id = this.panor.bs_base_id;
      listPanorIcon({
        bs_base_id
      }).then((res) => {
        // 将结果赋值给数组用于页面显示列表
        this.iconList = res.data.content;
      })
    },

    show (json) {
      this.init(json)
      this.showWindow = true
    },

    setPanor (panor) {
      this.panor = panor;
      this.getScene(panor.id);
      this.getSxtList(panor.bs_base_id)
      this.getDeviceList(panor.bs_base_id);
    },

    getScene (id) {
      getScene(id).then((e) => {
        this.sceneList = e.content
      })
    },

    /**
     * 获取视频数组
     * @date 2020-03-31
     * @returns {any}
     */
    getSxtList (id) {
      getSxtList({ bs_base_id: id }).then((res) => {
        var ary = [];
        var data = res.data.content;
        data.forEach((e) => {
          if (!ary.find((ev) => { return ev.id === e.rs_facilities_id })) {
            ary.push({
              id: e.rs_facilities_id,
              name: e.rs_facilities_name
            })
          }
        })
        this.videoList = res.data.content;
        this.dkList_sxt = ary;
        if (!ary.find((e) => { return this.dk_sxt === e.id })) {
          setTimeout(() => {
            // 不存在id默认第一个
            ary[0] && (this.dk_sxt = ary[0].id);
          })
        }
      })
    },

    /**
     * 获取设备数组
     * @date 2020-03-31
     * @returns {any}
     */
    getDeviceList (id) {
      deviceList({ bs_base_id: id }).then((res) => {
        var ary = [];
        res.data.content.forEach((e) => {
          if (!ary.find((ev) => { return ev.id === e.rs_facilities_id })) {
            ary.push({
              id: e.rs_facilities_id,
              name: e.rs_facilities_name
            })
          }
        })
        this.deviceList = res.data.content
        this.dkList_sb = ary;
        if (!ary.find((e) => { return this.dk_sb === e.id })) {
          setTimeout(() => {
            // 不存在id默认第一个
            ary[0] && (this.dk_sb = ary[0].id);
          })
        }
      })
    },

    /**
     * 初始化配置
     * @date 2020-03-24
     * @returns {any}
     */
    init (json = {}) {
      this.step = json.step || 1
      this.hotTitle = json.name || '新建热点'
      this.hotLink = json.hotLink || ''
      this.hotHTML = json.hotHTML || ''
      this.hotType = json.hotType || ''
      this.icon = json.icon || ''
      this.scene = json.scene || ''
      this.device = json.device || ''
      this.id = json.id || ''
      this.iconanimate = json.iconanimate || ''
      this.hotLinkIsOpenWindow = json.hotLinkIsOpenWindow || false
      this.video = json.video || "";
      // this.dk_sb = json.dk_sb || "";
      // this.dk_sxt = json.dk_sxt || "";
      this.device_show = json.device_show || false;
      this.isEffective = json.isEffective === false ? false : true;

      this.windowPositionType = json.windowPositionType === undefined ? true : json.windowPositionType;    // true为跟随  false为自定义
      this.windowPositionLeftOrRight = json.windowPositionLeftOrRight === undefined ? true : json.windowPositionLeftOrRight; // true 靠右 false 靠左
      this.windowPositionLeftOrRightValue = json.windowPositionLeftOrRightValue === undefined ? 15 : json.windowPositionLeftOrRightValue;
      this.windowPositionTopOrBottom = json.windowPositionTopOrBottom === undefined ? true : json.windowPositionTopOrBottom; //
      this.windowPositionTopOrBottomValue = json.windowPositionTopOrBottomValue === undefined ? 15 : json.windowPositionTopOrBottomValue;

      this.windowWidth = json.windowWidth === undefined ? 300 : json.windowWidth;
      this.windowHeight = json.windowHeight === undefined ? 200 : json.windowHeight;

      this.listType = json.listType === undefined ? "1" : json.listType;

    },

    set (obj) {
      this.anchor = obj
      this.data = obj.data
    },

    next (ind) {
      this.step = ind || 2
    },

    close () {
      this.showWindow = false
    },

    _create () {

      this.showWindow = false
      this.create({
        hotTitle: this.hotTitle,
        hotLink: this.hotLink,
        hotType: this.hotType,
        icon: this.icon,
        scene: this.scene,
        iconanimate: this.iconanimate,
        hotLinkIsOpenWindow: this.hotLinkIsOpenWindow,
        video: this.video,
        device: this.device,
        device_show: this.device_show,
        isEffective: this.isEffective,
        windowPositionType: this.windowPositionType,    // true为跟随  false为自定义
        windowPositionLeftOrRight: this.windowPositionLeftOrRight, // true 靠右 false 靠左
        windowPositionLeftOrRightValue: this.windowPositionLeftOrRightValue,
        windowPositionTopOrBottom: this.windowPositionTopOrBottom, //
        windowPositionTopOrBottomValue: this.windowPositionTopOrBottomValue,
        windowWidth: this.windowWidth,
        windowHeight: this.windowHeight,
        listType: this.listType,
        hotHTML: this.hotHTML
      })
    },
    _edit () {

      this.showWindow = false
      this.edit({
        hotTitle: this.hotTitle,
        hotLink: this.hotLink,
        hotType: this.hotType,
        icon: this.icon,
        scene: this.scene,
        iconanimate: this.iconanimate,
        hotLinkIsOpenWindow: this.hotLinkIsOpenWindow,
        video: this.video,
        device: this.device,
        device_show: this.device_show,
        isEffective: this.isEffective,
        windowPositionType: this.windowPositionType,    // true为跟随  false为自定义
        windowPositionLeftOrRight: this.windowPositionLeftOrRight, // true 靠右 false 靠左
        windowPositionLeftOrRightValue: this.windowPositionLeftOrRightValue,
        windowPositionTopOrBottom: this.windowPositionTopOrBottom, //
        windowPositionTopOrBottomValue: this.windowPositionTopOrBottomValue,
        windowWidth: this.windowWidth,
        windowHeight: this.windowHeight,
        listType: this.listType,
        hotHTML: this.hotHTML,
        id: this.id,
      })
    },
    clickHotType (type, page) {
      this.hotType = type || 'audio'
      this.next(page || 2)
    },
    // 联动场景选择标题
    updateScene () {
      this.hotTitle = this.sceneList.find((e) => { return e.id === this.scene }).name
    },

    updateVideo () {
      this.hotTitle = this.videoList.find((e) => { return e.device_id === this.video }).name
    },

    updateDevice () {
      this.hotTitle = this.deviceList.find((e) => { return e.id === this.device }).name
    }
  }
}
</script>

<style>
.vr_edit {
  position: absolute;
  padding: 8px 15px;
  color: #00a1ff;
  background: #35353c;
  border-radius: 4px;
  top: calc(50% - 80px);
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  border-top: solid 2px #00a1ff;
  border-bottom: solid 2px #00a1ff;
  top: 50%;
  z-index: 99;
}

.vr_edit .title {
  padding: 5px 0;
  border-bottom: solid 1px;
  margin-bottom: 12px;
}

.vr_edit .step1 .list {
  display: flex;
  flex-wrap: wrap;
  /* align-items: center; */
  justify-content: center;
}

.vr_edit .step1 .hotType {
  width: 150px;
  height: 15px;
  cursor: pointer;
}

.vr_edit .step2 .list {
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
}
.vr_edit .step2 .list::-webkit-scrollbar {
  width: 0px;
}

.vr_edit .list {
  max-height: 600px;
  min-height: 400px;
  margin-top: 5px;
  overflow: auto;
}
.vr_edit .list .hotPic {
  padding: 8px;
  border: solid 1px #585454;
  margin: 18px;
  width: 75px;
  height: 75px;
  cursor: pointer;
}

.vr_edit .list .hotPic:hover {
  border: solid 1px #00a1ff;
  color: #00a1ff;
}

.vr_edit .list .hotPic img {
  width: 100%;
  height: 100%;
}

.vr_edit .footor {
  height: 42px;
  background-color: #44454b;
  color: #fff;
  line-height: 41px;
  font-size: 14px;
  text-align: center;
}

.vr_edit .footor > div {
  width: 200px;
  display: inline-block;
  background-color: #3498db;
  display: inline-block;
  padding: 6px 12px;
  margin-bottom: 0;
  font-size: 14px;
  font-weight: normal;
  line-height: 1.428571429;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 4px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
}

.vr_edit .step3 .model {
  display: flex;
  height: 49px;
  align-items: center;
  color: #bababa;
  justify-content: center;
}

.vr_edit .step3 input {
  height: 38px;
  border-radius: 4px;
  width: 200px;
  float: left;
  background-color: #44454b;
  border: 1px solid #777;
  color: #fff;
  margin: 0 15px;
}

.vr_edit .el-select__caret.el-input__icon.el-icon-arrow-up {
  transform-origin: 50% 50%;
  display: block;
  height: 39px;
  width: 39px;
}
</style>
