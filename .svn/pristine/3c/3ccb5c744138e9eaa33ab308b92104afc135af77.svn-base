<template>
  <div
    class='showAllDevice'
    :style='showList?"height: 100%;":""'
  >
    <!-- 查询多选框 -->
    <el-input
      maxlength = "10"
      v-model='filter_key'
      @change='chaxun'
      placeholder="请输入内容"
      
    ></el-input>
    <i @click="chaxun" class="el-icon-search"></i>
    <!-- 汇总页面 -->
    <div
      class='contentBox'
      v-show='showBox'
    >
      <div class='contentBoxHeader'>
        <!-- <div class='contentBoxTitle'>设备概况</div> -->
        <!-- 顶部在线离线故障情况 -->
        <div class='contentBoxData'>
          <div
            class='contentBoxDataModel'
            @click='filter(it.name)'
            v-for='(it,i) in deviceStatus'
            :key='i'
          >
            <div style='font-size: 16px;color: #0087ff;margin-bottom: 5px;'>{{it.value}}</div>
            <div>{{it.name}}</div>
          </div>
        </div>
        <!-- 结束 -->
      </div>
      <!-- 中间区域选择部分 -->
      <div class='contentBoxBody'>
        <div class='contentBoxTitle'>设备分布</div>
        <div class='contentBoxDistributed'>
          <div
            v-for='(it,i) in area'
            :key='i'
          >
            <div class='cityListName'>{{it.shen}}</div>
            <div class='cityListModel'>
              <div
                class='contentBoxDataModel'
                @click='filter(null,its)'
                v-for='(its,i) in it.shi'
                :key='i'
              >
                <span style='color: rgb(0, 135, 255);'>{{its.shi_area_name}}</span>
                <span>({{its.device_num}})</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 结束 -->
      <!-- 图表部分 -->
      <div>
        <div
          class='chart'
          ref='chart'
        ></div>
      </div>
      <!-- 结束 -->
    </div>
    <!-- 设备列表 -->
    <div
      class='contentBox'
      v-show='showList'
    >
      <!-- 返回按钮 -->
      <div
        @click='blackList'
        class='backBaseInfoDiv'
      >
        <span>{{"<" + "返回"}}</span>
      </div>
      <!-- 结束 -->
      <!-- 列表项筛选器 -->
      <div
        class='filterArray'
        style='display:flex;'
      >
        <div class='filterModel'>
          <div class='menuName'>{{shiName || "全部城市"}}</div>
          <i class='el-icon-caret-bottom filterI'></i>
          <div class='menus'>
            <div style='width: 100px;border-right:solid 1px #ffffff;height: 100%;'>
              <div
                class='areamenus'
                v-for='(it,i) in area'
                :key='i'
              >
                <div class='areamenusname'>{{it.shen}}</div>
                <div class='areamenuslist'>
                  <div
                    v-for='(its,i) in it.shi'
                    :key='i'
                    @click='selectCity(its)'
                    class='curText'
                  >{{its.shi_area_name}}({{its.device_num}})</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class='filterModel'>
          <div class='menuName'>{{base_name || "全部基地"}}</div>
          <i class='el-icon-caret-bottom filterI'></i>
          <div class='menus'>
            <div
              class='divCenter curText'
              @click='selectBase({id:"",name:"全部基地"})'
            >全部基地</div>
            <div
              class='divCenter curText'
              v-for='(it,i) in city'
              :key='i'
              @click='selectBase(it)'
            >{{it.name}}</div>
          </div>
        </div>
        <div class='filterModel'>
          <div class='menuName'>{{device_status || "全部"}}设备</div>
          <i class='el-icon-caret-bottom filterI'></i>
          <div class='menus'>
            <div
              class='divCenter curText'
              @click='selectStatus("")'
            >全部</div>
            <div
              class='divCenter curText'
              @click='selectStatus("在线")'
            >在线</div>
            <div
              class='divCenter curText'
              @click='selectStatus("离线")'
            >离线</div>
            <div
              class='divCenter curText'
              @click='selectStatus("故障")'
            >故障</div>
            <!-- <div>广东省</div>
                        <div>广东省</div>
                        <div>广东省</div> -->
          </div>
        </div>
      </div>
      <!-- 结束 -->
      <div class='deviceInfoList'>
        <div
          class='deviceInfoListModel'
          @click='listRowClick(it)'
          v-for='(it , i) in datas'
          :key='i'
        >
          <!-- 图标 -->
          <div>
            <img :src='require("@/assets/img/Plan/juhe1.png")' />
          </div>
          <!-- 内容 -->
          <div>
            <!-- 标题 -->
            <div class='deviceInfoName'>{{it.name}}({{it.device_id}})</div>
            <div style='width:100%;'>{{it.bs_base_name}}</div>
            <div>广东省广州市天河区林和街27号中意花园A栋首层</div>
          </div>
          <!-- 图片 -->
          <div>
            <img
              class='deviceImg'
              :src='require("@/assets/img/imgny.png")'
            />
          </div>
        </div>
      </div>
      <c-page
        ref='page'
        :page='page'
        :change='changePage'
        :count='count'
        :max='max'
      ></c-page>
    </div>
    <div
      class='blackInfo'
      @click='backInfo'
      v-show='showInfo'
    >返回</div>
    <device-info
      ref='info'
      :datas='device'
    ></device-info>
  </div>
</template>

<script>
import cPage from './page.vue'
import { findMapBaseShiAreaByBs_user_id, baseListByOrgIds, userDevicesStatus, userMapDeviceShiArea } from '@/api/map3d/index'
import deviceInfo from './deviceInfo'
export default {
  name: "showAllBase",
  components: {
    deviceInfo,
    cPage
  },
  props: {
    page: 1,
    max: 100,
    count: 5,
    datas: {
      type: Array,
      default: () => []
    },
    change: {
      type: Function,
      default: () => { }
    }
  },
  watch: {
    datas (e) {

    }
  },
  data () {
    return {
      showBox: true,
      showList: false,
      showInfo: false,
      citys: [],
      deviceId: "",
      status1: 0,
      status2: 0,
      status3: 0,
      filter_status: 0,
      filter_key: "",
      state: "",
      device: {},
      area: [],
      city: [],
      shi: "",
      base_id: "",
      device_status: "",
      deviceStatus: []
    }
  },
  mounted () {
    this.getAreaData();
    this.getBaseData();
    this.getDeviceData();
  },
  methods: {

    // 获取设备状态数量
    getDeviceData () {
      userDevicesStatus().then((e) => {
        var ary = [];
        for (var i in e.data) {
          ary.push({ name: i, value: e.data[i] });
        }
        this.deviceStatus = ary;
      })
    },
    // 获取行政区域菜单内容
    getAreaData () {
      // findMapBaseShiAreaByBs_user_id
      userMapDeviceShiArea().then((e) => {
        // 对数据结果进行预处理
        var data = e.data;
        var ary = [];
        for (var i in data) {
          var it = data[i];
          // 判断是那个省的
          var shen = it.sheng_area_name;
          if (!shen) {
            shen = "其他"
            it.shi_area_name = '其他区域'
          }
          var cityName = it.shi_area_name || "其他";
          var itCity = this.citys.find((e) => { return e.name === cityName });
          if (!itCity) {
            itCity = { name: cityName, value: it.device_num };
            this.citys.push(itCity);
          } else {
            itCity.value += it.device_num;
          }
          // 判断这个省有没有收录
          var dat = ary.find((e) => { return e.shen === shen });
          if (!dat) {
            dat = { shen, shi: [] };
            ary.push(dat);
          }
          dat.shi.push(it);
        }
        this.area = ary;

        this.renderEcharts();
      })
    },

    // 获取行政区域菜单内容
    getBaseData () {
      baseListByOrgIds().then((e) => {
        this.city = e.data;
      })
    },
    // 分页函数
    changePage (i) {
      this.change(i);
    },
    filter (status, city, filter_key) {

      this.showList = true;
      this.showBox = false;
      if (city) {
        this.shi = city.shi_area_id;
        this.shiName = city.shi_area_name;
      };
      if (status) {
        this.device_status = status;
      }
      if (status || city) {
        this.$parent.baseChange("allDevice");
      }
    },
    // 搜索结果返回按钮事件
    blackList () {
      this.showList = false;
      this.showBox = true;
      // 清除筛选条件
      this.shi = ""
      this.shiName = ""
      this.filter_key = ""
      this.base_id = ""
      this.base_name = ""
      this.device_status = ""
    },
    backInfo () {
      this.showList = true;
      this.showBox = false;
      this.showInfo = false;
      // 清除掉攝像頭
      this.$refs.info.sxt = "";
      this.$refs.info.showInfoModel = false;
    },
    renderEcharts () {
      var dom = this.$refs.chart;
      if (!this.echarts) {
        this.echarts = echarts.init(dom);
      }
      var color = ["#0087ff", "#c1232b", "#b5c334", "#fcce10", "#e87b10", "#277c7b", "#fe8463"];
      this.echarts.setOption({
        color: color,
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          data: this.citys.map((e) => { return e.name })
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: this.citys.map((e, i) => {
            return {
              value: e.value,
              itemStyle: { color: color[i % 6] }
            }
          }),
          type: 'bar',
          showBackground: true,
        }]
      })
    },
    querySearch (queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    loadAll () {
      return [
        { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
        { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
        { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
        { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
        { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
        { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
        { "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
        { "value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号" },
        { "value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107" },
        { "value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号" },
        { "value": "阿姨奶茶/豪大大", "address": "嘉定区曹安路1611号" },
        { "value": "新麦甜四季甜品炸鸡", "address": "嘉定区曹安公路2383弄55号" },
        { "value": "Monica摩托主题咖啡店", "address": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F" },
        { "value": "浮生若茶（凌空soho店）", "address": "上海长宁区金钟路968号9号楼地下一层" },
        { "value": "NONO JUICE  鲜榨果汁", "address": "上海市长宁区天山西路119号" },
        { "value": "CoCo都可(北新泾店）", "address": "上海市长宁区仙霞西路" },
        { "value": "快乐柠檬（神州智慧店）", "address": "上海市长宁区天山西路567号1层R117号店铺" },
        { "value": "Merci Paul cafe", "address": "上海市普陀区光复西路丹巴路28弄6号楼819" },
        { "value": "猫山王（西郊百联店）", "address": "上海市长宁区仙霞西路88号第一层G05-F01-1-306" },
        { "value": "枪会山", "address": "上海市普陀区棕榈路" },
        { "value": "纵食", "address": "元丰天山花园(东门) 双流路267号" },
        { "value": "钱记", "address": "上海市长宁区天山西路" },
        { "value": "壹杯加", "address": "上海市长宁区通协路" },
        { "value": "唦哇嘀咖", "address": "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元" },
        { "value": "爱茜茜里(西郊百联)", "address": "长宁区仙霞西路88号1305室" },
        { "value": "爱茜茜里(近铁广场)", "address": "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺" },
        { "value": "鲜果榨汁（金沙江路和美广店）", "address": "普陀区金沙江路2239号金沙和美广场B1-10-6" },
        { "value": "开心丽果（缤谷店）", "address": "上海市长宁区威宁路天山路341号" },
        { "value": "超级鸡车（丰庄路店）", "address": "上海市嘉定区丰庄路240号" },
        { "value": "妙生活果园（北新泾店）", "address": "长宁区新渔路144号" },
        { "value": "香宜度麻辣香锅", "address": "长宁区淞虹路148号" },
        { "value": "凡仔汉堡（老真北路店）", "address": "上海市普陀区老真北路160号" },
        { "value": "港式小铺", "address": "上海市长宁区金钟路968号15楼15-105室" },
        { "value": "蜀香源麻辣香锅（剑河路店）", "address": "剑河路443-1" },
        { "value": "北京饺子馆", "address": "长宁区北新泾街道天山西路490-1号" },
        { "value": "饭典*新简餐（凌空SOHO店）", "address": "上海市长宁区金钟路968号9号楼地下一层9-83室" },
        { "value": "焦耳·川式快餐（金钟路店）", "address": "上海市金钟路633号地下一层甲部" },
        { "value": "动力鸡车", "address": "长宁区仙霞西路299弄3号101B" },
        { "value": "浏阳蒸菜", "address": "天山西路430号" },
        { "value": "四海游龙（天山西路店）", "address": "上海市长宁区天山西路" },
        { "value": "樱花食堂（凌空店）", "address": "上海市长宁区金钟路968号15楼15-105室" },
        { "value": "壹分米客家传统调制米粉(天山店)", "address": "天山西路428号" },
        { "value": "福荣祥烧腊（平溪路店）", "address": "上海市长宁区协和路福泉路255弄57-73号" },
        { "value": "速记黄焖鸡米饭", "address": "上海市长宁区北新泾街道金钟路180号1层01号摊位" },
        { "value": "红辣椒麻辣烫", "address": "上海市长宁区天山西路492号" },
        { "value": "(小杨生煎)西郊百联餐厅", "address": "长宁区仙霞西路88号百联2楼" },
        { "value": "阳阳麻辣烫", "address": "天山西路389号" },
        { "value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13" }
      ];
    },
    handleSelect (item) {
      console.log(item);
    },
    handleIconClick (ev) {
      console.log(ev);
    },
    listRowClick (it) {
      this.showBox = false;
      this.showList = false;
      this.$refs.info.showInfoModel = true;
      this.showInfo = true;
      this.device = it;
    },
    // 修改頁碼
    setPage (i) {
      // 页码
      this.$refs.page.setPage(i);
    },

    chaxun () {
      // 数据
      this.$parent.baseChange("allDevice");
      this.showBox = false;
      this.showList = true;
    },

    selectCity (it) {
      this.shi = it.shi_area_id;
      this.shiName = it.shi_area_name;
      this.$parent.baseChange("allDevice");
    },

    selectBase (it) {
      this.base_id = it.id;
      this.base_name = it.name;
      this.$parent.baseChange("allDevice");
    },

    selectStatus (status) {
      this.device_status = status;
      this.$parent.baseChange("allDevice");
    },

    showName (shi) {
      var it = this.area.find((e) => { return e.shi_area_id === shi });
      return it.shi_area_name;
    }
  }
}
</script>

<style>
.showAllDevice {
  position: absolute;
  top: 0;
  left: 0;
  padding: 15px;
  border-radius: 4px;
  width: 375px;
  height: 100%;
}
.showAllDevice .el-icon-search {
  position: absolute;
  margin-top: 15px;
  margin-left: -30px;
  transform: scale(3);
  cursor: pointer;
}
.showAllDevice .contentBox {
  margin-top: 15px;
  background: #ffffff;
  border-radius: 4px;
  height: calc(100% - 60px);
  padding: 0 8px;
  overflow-y: scroll;
}
.showAllDevice .contentBoxHeader {
  bottom: solid 1px #ffffff;
}
.showAllDevice .contentBoxData {
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
  text-align: center;
  padding: 15px;
  border-bottom: solid 1px #bdbdbd;
  margin-bottom: 15px;
}
.showAllDevice .contentBoxData > div {
  width: 33%;
  padding: 8px 0;
}
.showAllDevice .chart {
  width: 100%;
  height: 300px;
}
.showAllDevice .deviceInfoList {
  padding: 10px;
  height: calc(100% - 119px);
  overflow: auto;
}
.showAllDevice .deviceInfoListModel {
  display: flex;
  padding: 7px 0;
  cursor: pointer;
}
.showAllDevice .deviceInfoListModel:hover {
  background: #ececec;
}
.showAllDevice .deviceImg {
  width: 70px;
  height: 100%;
  border-radius: 6px;
}
.showAllDevice .deviceInfoName {
  font-size: 13px;
  margin-bottom: 5px;
  color: #0087ff;
}
.showAllDevice .contentBoxDataModel {
  cursor: pointer;
}
.showAllDevice .blackInfo {
  position: absolute;
  top: 15px;
  background: #fff;
  width: calc(100% - 10px);
  left: 10px;
  padding: 9px;
  border-radius: 4px;
  cursor: pointer;
}
.showAllDevice .filterArray {
  display: flex;
}
.showAllDevice .filterModel {
  width: 100%;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
}
.showAllDevice .filterModel .filterI {
  transition: all 0.25s;
  height: 12px;
}
.showAllDevice .filterModel:hover > .filterI {
  transform: rotateZ(-180deg);
}
.showAllDevice .filterModel:hover > .menus {
  display: block;
}
.showAllDevice .filterModel .menuName {
  background: #adadad;
  padding: 6px;
  border-radius: 4px;
}
.showAllDevice .filterModel .menus {
  display: none;
  position: absolute;
  width: 311px;
  background: #3e3e3e;
  left: 0;
  height: 200px;
  top: 100%;
  overflow: auto;
}
.showAllDevice .filterModel .menus::-webkit-scrollbar {
  width: 0px;
}
.showAllDevice .filterModel .menus .areamenus {
  padding: 5px 0;
  font-size: 12px;
  border-bottom: solid 1px #ffffff;
  cursor: pointer;
}

.showAllDevice .filterArray {
  display: flex;
  width: 90%;
  margin: auto;
  background: #adadad;
  position: relative;
}

.showAllDevice .blackBaseInfo {
  position: fixed;
  z-index: 99;
  right: 15px;
  top: 15px;
  color: #000000;
  border: solid 1px;
  padding: 8px;
}

.showAllDevice .backBaseInfoDiv {
  height: 35px;
  line-height: 35px;
  background: #fff;
  width: 100%;
  cursor: pointer;
  padding-left: 15px;
}

.showAllDevice .backBaseInfoDiv > span {
  border-radius: 4px;
  padding: 4px;
  border: solid 1px #c5c5c5;
}

.showAllDevice .backBaseInfoDiv:hover {
  color: #0087ff;
}

.showAllDevice .areamenus {
  /* position:relative; */
}

.showAllDevice .areamenus:hover .areamenuslist {
  display: block;
}

.showAllDevice .areamenusname {
}

.showAllDevice .areamenuslist {
  display: none;
  position: absolute;
  left: 101px;
  top: 0;
  width: calc(100% - 101px);
  background: #3e3e3e;
  height: 100%;
}
.showAllDevice .areamenuslist > div {
  padding: 4px;
}

.showAllDevice .divCenter {
  padding: 8px;
  text-align: center;
}

.showAllDevice .curText:hover {
  color: #0087ff;
}

.showAllDevice .cityListName {
  text-align: left;
  padding: 3px 7px;
}

.showAllDevice .cityListModel {
  display: flex;
  flex-wrap: wrap;
}

.shoAllDevice .contentBoxDistributed {
  max-height: 120px;
  overflow: auto;
}

.showAllDevice .cityListModel .contentBoxDataModel {
  margin: 6px 0px;
  width: 33%;
  padding: 0px 13px;
}
</style>