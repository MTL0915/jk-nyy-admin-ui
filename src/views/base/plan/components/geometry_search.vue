<template>

  <div class="geometrySearch" >
    <el-autocomplete
      v-model="state"
      :fetch-suggestions="querySearch"
      popper-class="my-autocomplete"
      placeholder="请输入内容"
      @select="handleSelect">
      <i
        slot="suffix"
        class="el-icon-edit el-input__icon"
        @click="handleIconClick"/>
      <template slot-scope="{ item }">
        <div class="name">
          {{ item.label }}
          <span style="color:red;font-size:12px">{{ item.type ? "("+item.type+")" : "" }}</span>
        </div>
        <span class="addr">{{ item.jd }}</span>
      </template>
    </el-autocomplete>

  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import ajaxApi from '@/api/map'
export default {
  name: 'GeometrySearch',
  data() {
    return {
      name: 'geometrySearch',
      restaurants: [],
      state: '',
      jdid: '' // 当前选中基地id
    }
  },
  computed: {
    ...mapGetters([
      'id',
      'token',
      'user'
    ])
  },
  mounted() {
    // this.restaurants = this.loadAll();
    this.getData()
  },
  methods: {
    setJdid(id) {
      this.jdid = id
    },
    getData() {
      this.restaurants = []
      this.getJD()
    },
    getJD(jdid, call) {
      ajaxApi.getBasesDetailByUser({
        bs_user_id: this.user.id
      }, (event) => {
        for (var i in event.data) {
          var it = event.data[i]
          this.restaurants.push({
            id: it.id,
            label: it.name,
            jd: it.name,
            jdid: it.id,
            type: '基地',
            key: [it.name, name, '基地', it.id].join(',')
          })
          this.getJDDK(it.id, it.name)
          this.getJDSB(it.id, it.name)
        }
      })
    },
    // 获取基地地块
    getJDDK(id, name) {
      ajaxApi.getDKByJDId({ bs_base_id: id }, (event) => {
        for (var i in event.data) {
          var it = event.data[i]
          if (it.geometry_json) {
            this.restaurants.push({
              id: it.id,
              label: it.name,
              jd: name,
              jdid: id,
              type: it.rs_facilities_type_name,
              key: [it.name, name, '地块', it.id].join(',')
            })
          }
        }
      })
    },
    getJDSB(id, name) {
      ajaxApi.queryDevice({ bs_base_id: id }, (event) => {
        for (var i in event.data.content) {
          var it = event.data.content[i]
          if (it.geometry_json) {
            this.restaurants.push({
              id: it.id,
              label: it.hd_device_type_name,
              jd: name,
              jdid: id,
              type: it.hd_device_type_code,
              key: [it.hd_device_type_code, it.hd_device_type_name, name, '设备', it.id].join(',')
            })
          }
        }
      })
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants
      restaurants = restaurants.filter((e) => {
        return e.jdid == this.jdid
      })
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
          .sort((a, b) => {
            return b.i - a.i
          })
        : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (restaurant) => {
        var i = 0
        var key = restaurant.key
        if (key.indexOf(queryString) > -1) i++
        key = key.toLowerCase()
        queryString = queryString.toLowerCase()
        if (key.indexOf(queryString) > -1) i++
        if (queryString.replace) {
          var queryString_ = queryString.replace(/$\s{0,}|\s{0,}^/g, '').replace(/\s{1,}/g, ',').split(',')
          for (i in queryString_) {
            if (restaurant.label.indexOf(queryString_[i]) > -1) i++
            if (queryString_[i] !== '' && key.indexOf(queryString_[i]) > -1) i++
          }
        }
        restaurant.i = i
        return i > 0
      }
    },
    loadAll() {
      return [
        { 'value': '三全鲜食（北新泾店）', 'address': '长宁区新渔路144号', 'type': '设备' },
        { 'value': 'Hot honey 首尔炸鸡（仙霞路）', 'address': '上海市长宁区淞虹路661号' },
        { 'value': '新旺角茶餐厅', 'address': '上海市普陀区真北路988号创邑金沙谷6号楼113' },
        { 'value': '泷千家(天山西路店)', 'address': '天山西路438号' },
        { 'value': '胖仙女纸杯蛋糕（上海凌空店）', 'address': '上海市长宁区金钟路968号1幢18号楼一层商铺18-101' },
        { 'value': '贡茶', 'address': '上海市长宁区金钟路633号' },
        { 'value': '豪大大香鸡排超级奶爸', 'address': '上海市嘉定区曹安公路曹安路1685号' },
        { 'value': '茶芝兰（奶茶，手抓饼）', 'address': '上海市普陀区同普路1435号' },
        { 'value': '十二泷町', 'address': '上海市北翟路1444弄81号B幢-107' },
        { 'value': '星移浓缩咖啡', 'address': '上海市嘉定区新郁路817号' },
        { 'value': '阿姨奶茶/豪大大', 'address': '嘉定区曹安路1611号' },
        { 'value': '新麦甜四季甜品炸鸡', 'address': '嘉定区曹安公路2383弄55号' },
        { 'value': 'Monica摩托主题咖啡店', 'address': '嘉定区江桥镇曹安公路2409号1F，2383弄62号1F' },
        { 'value': '浮生若茶（凌空soho店）', 'address': '上海长宁区金钟路968号9号楼地下一层' },
        { 'value': 'NONO JUICE  鲜榨果汁', 'address': '上海市长宁区天山西路119号' },
        { 'value': 'CoCo都可(北新泾店）', 'address': '上海市长宁区仙霞西路' },
        { 'value': '快乐柠檬（神州智慧店）', 'address': '上海市长宁区天山西路567号1层R117号店铺' },
        { 'value': 'Merci Paul cafe', 'address': '上海市普陀区光复西路丹巴路28弄6号楼819' },
        { 'value': '猫山王（西郊百联店）', 'address': '上海市长宁区仙霞西路88号第一层G05-F01-1-306' },
        { 'value': '枪会山', 'address': '上海市普陀区棕榈路' },
        { 'value': '纵食', 'address': '元丰天山花园(东门) 双流路267号' },
        { 'value': '钱记', 'address': '上海市长宁区天山西路' },
        { 'value': '壹杯加', 'address': '上海市长宁区通协路' },
        { 'value': '唦哇嘀咖', 'address': '上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元' },
        { 'value': '爱茜茜里(西郊百联)', 'address': '长宁区仙霞西路88号1305室' },
        { 'value': '爱茜茜里(近铁广场)', 'address': '上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺' },
        { 'value': '鲜果榨汁（金沙江路和美广店）', 'address': '普陀区金沙江路2239号金沙和美广场B1-10-6' },
        { 'value': '开心丽果（缤谷店）', 'address': '上海市长宁区威宁路天山路341号' },
        { 'value': '超级鸡车（丰庄路店）', 'address': '上海市嘉定区丰庄路240号' },
        { 'value': '妙生活果园（北新泾店）', 'address': '长宁区新渔路144号' },
        { 'value': '香宜度麻辣香锅', 'address': '长宁区淞虹路148号' },
        { 'value': '凡仔汉堡（老真北路店）', 'address': '上海市普陀区老真北路160号' },
        { 'value': '港式小铺', 'address': '上海市长宁区金钟路968号15楼15-105室' },
        { 'value': '蜀香源麻辣香锅（剑河路店）', 'address': '剑河路443-1' },
        { 'value': '北京饺子馆', 'address': '长宁区北新泾街道天山西路490-1号' },
        { 'value': '饭典*新简餐（凌空SOHO店）', 'address': '上海市长宁区金钟路968号9号楼地下一层9-83室' },
        { 'value': '焦耳·川式快餐（金钟路店）', 'address': '上海市金钟路633号地下一层甲部' },
        { 'value': '动力鸡车', 'address': '长宁区仙霞西路299弄3号101B' },
        { 'value': '浏阳蒸菜', 'address': '天山西路430号' },
        { 'value': '四海游龙（天山西路店）', 'address': '上海市长宁区天山西路' },
        { 'value': '樱花食堂（凌空店）', 'address': '上海市长宁区金钟路968号15楼15-105室' },
        { 'value': '壹分米客家传统调制米粉(天山店)', 'address': '天山西路428号' },
        { 'value': '福荣祥烧腊（平溪路店）', 'address': '上海市长宁区协和路福泉路255弄57-73号' },
        { 'value': '速记黄焖鸡米饭', 'address': '上海市长宁区北新泾街道金钟路180号1层01号摊位' },
        { 'value': '红辣椒麻辣烫', 'address': '上海市长宁区天山西路492号' },
        { 'value': '(小杨生煎)西郊百联餐厅', 'address': '长宁区仙霞西路88号百联2楼' },
        { 'value': '阳阳麻辣烫', 'address': '天山西路389号' },
        { 'value': '南拳妈妈龙虾盖浇饭', 'address': '普陀区金沙江路1699号鑫乐惠美食广场A13' }
      ]
    },
    handleSelect(item) {
      var a = this.$parent.geometrys.find((e) => { return e.attr.id === item.id })
      if (!a) {
        this.$message.info({
          message: '未找到对象几何，请先绘制目标',
          type: 'warning'
        })
      } else {
        if (a.graphic.geometry.type === 'point') {
          this.$parent.map.centerAndZoom(a.graphic.geometry, 17)
        } else {
          this.$parent.map.setExtent(a.graphic._extent)
        }
        setTimeout(() => {
          a.layerClick(a)
        }, 500)
      }
    },
    handleIconClick(ev) {
      console.log(ev)
    }
  }
}

</script>

<style>
.geometrySearch {
  margin-left: 0px;
}

.my-autocomplete li {
  line-height: normal;
  padding: 7px;
}
.my-autocomplete li .name {
  text-overflow: ellipsis;
  overflow: hidden;
}
.my-autocomplete li .addr {
  font-size: 12px;
  color: #b4b4b4;
}

.my-autocomplete li .highlighted .addr {
  color: #ddd;
}

</style>
