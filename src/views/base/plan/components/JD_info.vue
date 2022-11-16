<template>

  <div class="jd_info">
    <div class="cover"/>
    <div class="jd_info_box">
      <div class="info_model jd_info_title">
        <!-- <img class='jd_info_logo' :src='form.image_path' /> -->
        <img v-if="form.image_path" :src="form.image_path" class="jd_info_logo" >
        <img v-else class="jd_info_logo" src="@/assets/img/Plan/nc.png" >
        <span> {{ jdName }} </span>
      </div>
      <div class="info_model">
        <div>基地面积</div>
        <div>{{ form.farm_size }}(亩)</div>
      </div>
      <div class="info_model">
        <div>种植面积</div>
        <div>{{ form.grow_size }}(亩)</div>
      </div>
      <div class="info_model">
        <div>地块数量</div>
        <div>{{ form.facilitiesNum }}(块)</div>
      </div>
      <div class="info_model">
        <div>设备数量</div>
        <div>{{ form.deviceNum }}(台)</div>
      </div>
      <div class="info_model jd_info_title qw">
        <img class="jd_info_logo" src="@/assets/img/Plan/tq.png" >
      </div>
      <div class="info_model qw">
        <div>气温</div>
        <div>{{ weather.temperature }}℃</div>
      </div>
      <div class="info_model qw">
        <div>风向</div>
        <div>{{ weather.winddirection }}</div>
      </div>
      <div class="info_model qw">
        <div>风力</div>
        <div>{{ weather.windpower }}</div>
      </div>
      <div class="info_model qw">
        <div>湿度</div>
        <div>{{ weather.humidity }}℃</div>
      </div>
      <!-- <div class='info_model qw more' style='cursor: pointer;'>
					<div>更多</div>
					<div><i class='el-icon-more'></i></div>
				</div> -->
    </div>
  </div>

</template>

<script>
import ajaxApi from '@/api/map'
export default {
  name: 'JDInfo',
  data() {
    return {
      name: 'JDInfo',
      jdName: '',
      form: {
        name: '/',
        farm_size: '/',
        grow_size: '/',
        facilitiesNum: '/',
        deviceNum: '/',
        image_path: null
      },
      weather: {
        weather: '',
        temperature: '',
        winddirection: '',
        windpower: '',
        humidity: ''
      },
      zhnc: '@/assets/img/Plan/zhnc.png',
      jyl: '@/assets/img/Plan/jyl.png',
      mode: true
    }
  },
  created: function() {
    this.getWeather()
    this.getJiangYu()
  },
  mounted() {

  },
  methods: {

    hideElement: function() {
      this.$parent.isshowJDInfo = false
    },
    getWeather: function() {
      this.$axios.get('https://restapi.amap.com/v3/weather/weatherInfo?key=2f0ed1c318f2decfecf5bafb7dbc9d87&city=440000')
        .then((e) => {
          var info = e.data
          var lives = info.lives[0]
          for (var i in this.weather) {
            this.weather[i] = lives[i]
          }
        })
    },
    taggle: function() {
      this.mode = !this.mode
    },

    // 获取降雨量的数据
    getJiangYu: function(jd, wd) {
      this.$axios.get('https://www.tianqiapi.com/api/?appid=16113714&appsecret=Em4zbbPt&lng=119.545023&lat=36.044254')
        .then((e) => {

        })
    },

    // 获取基地的基本信息(汇总数据)
    getJDInfo(id) {
      ajaxApi.getJDById(id, (e) => {
        this.form.name = e.data.name || '/'
        this.form.farm_size = e.data.farm_size || '/'
        this.form.grow_size = e.data.grow_size || '/'
        this.form.facilitiesNum = e.data.facilitiesNum || '/'
        this.form.deviceNum = e.data.deviceNum || '/'
        this.form.image_path = e.data.image_path ? process.env.IMG_URL + e.data.image_path : null
      })
    },

    // 加载农场数据
    setJD(id) {
      // this.setName(jd.name);
      this.getJDInfo(id)
    },

    setName(name) {
      this.jdName = name
    }

  }
}

</script>

<style>
.jd_info { position:absolute;font-size: 12px; border-radius: 3px; overflow: hidden; color: #fff;top: 15px;left: 280px;z-index:99999; }
.jd_info .info_model.jd_info_title { align-items: center; flex-direction: row; }
.jd_info .info_model { display: flex; flex-direction: column; justify-content: space-evenly; padding: 5px 15px;text-align: center; }
.jd_info .info_model.qw { padding: 5px 5px; display: none; }
.jd_info .jd_info_logo { width: 50px;height: 32px; border-radius: 5px; }
.jd_info .cover { position: absolute;width: 100%;height: 100%;background: #42556d;opacity: 0.75; }
.jd_info .jd_info_box { position: relative;  display: flex; }
.jd_info .info_model.qw.more { cursor: pointer; }
.jd_info .info_model.qw.more:hover { color: #4a9aff; }
</style>
