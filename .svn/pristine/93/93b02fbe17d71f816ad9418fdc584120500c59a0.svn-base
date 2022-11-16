<template>
  <div>
    <el-card shadow="never">
      <div class="search-result">
        <div>为您找到<span style="color:green"> {{ searchResult.totals }} </span>条相关结果</div>
        <div class="panel">
          <div
            v-for="d in searchResult.results"
            class="panel-item"
          >
            <div class="title">
              <h2>
                <a @click="forwardPage(d)">
                  <span v-html="d.name" />
                  <span
                    v-if="d.code!=''"
                    v-html="d.code"
                  />
                </a>
              </h2>
            </div>
            <div style="position: absolute;top:5px;right:6px">
              <el-tag
                v-if="d.type=='基地'"
                type="success"
                size="mini"
                effect="dark"
              >{{ d.type }}</el-tag>
              <el-tag
                v-if="d.type=='设备' && d.propertyJson.hd_device_type_code=='JK-SX'"
                type="success"
                size="mini"
                effect="dark"
              >{{ d.propertyJson.hd_device_type_name }}</el-tag>
              <el-tag
                v-if="d.type=='设备' && d.propertyJson.hd_device_type_code!='JK-SX'"
                type="success"
                size="mini"
                effect="dark"
              >{{ d.type }}</el-tag>
              <el-tag
                v-if="d.type=='未出厂设备' && d.propertyJson.hd_device_type_code=='JK-SX'"
                type="info"
                size="mini"
                effect="dark"
              >{{ d.propertyJson.hd_device_type_name }}</el-tag>
              <el-tag
                v-if="d.type=='未出厂设备' && d.propertyJson.hd_device_type_code!='JK-SX'"
                type="info"
                size="mini"
                effect="dark"
              >{{ d.type =='未出厂设备' ? '出产设备表':d.type }}</el-tag>
              <el-tag
                v-if="d.type=='地块'"
                type="warning"
                size="mini"
                effect="dark"
              >{{ d.type }}</el-tag>
            </div>
            <div class="content">
              <div class="left img">
                <img :src="d.propertyJson.image_path">
              </div>

              <div
                v-if="d.type=='基地'"
                class="left property"
              >
                <div class="property-item">
                  <div class="left">基地代码：</div>
                  <div class="left">{{ d.propertyJson.code }}</div>
                </div>
                <div class="property-item">
                  <div class="left">负责人：</div>
                  <div class="left">{{ d.propertyJson.linkman }}</div>
                </div>
                <div class="property-item">
                  <div class="left">联系电话：</div>
                  <div class="left">{{ d.propertyJson.mobile }}</div>
                </div>
                <div class="property-item">
                  <div class="left">占地面积：</div>
                  <div class="left">{{ d.propertyJson.farm_size }}</div>
                </div>
                <div class="property-item">
                  <div class="left">生产面积：</div>
                  <div class="left">{{ d.propertyJson.grow_size }}</div>
                </div>
              </div>
              <div
                v-if="d.type=='地块'"
                class="left property"
              >
                <div class="property-item">
                  <div class="left">所属基地：</div>
                  <div class="left">{{ d.propertyJson.bs_base_name }}</div>
                </div>
                <div class="property-item">
                  <div class="left">所属地块：</div>
                  <div class="left">{{ d.propertyJson.rs_facilities_name }}</div>
                </div>
                <div class="property-item">
                  <div class="left">负责人：</div>
                  <div class="left">{{ d.propertyJson.linkman }}</div>
                </div>
                <div class="property-item">
                  <div class="left">联系电话：</div>
                  <div class="left">{{ d.propertyJson.mobile }}</div>
                </div>
              </div>
              <div
                v-if="d.type=='设备'"
                class="left property"
              >
                <div class="property-item">
                  <div class="left">所属基地：</div>
                  <div class="left">{{ d.propertyJson.bs_base_name }}</div>
                </div>
                <div class="property-item">
                  <div class="left">所属地块：</div>
                  <div class="left">{{ d.propertyJson.rs_facilities_name }}</div>
                </div>
                <div class="property-item">
                  <div class="left">设备类型：</div>
                  <div class="left">{{ d.propertyJson.hd_device_type_name }}</div>
                </div>
                <div class="property-item">
                  <div class="left">版本号：</div>
                  <div class="left">{{ d.propertyJson.version }}</div>
                </div>
              </div>
              <div
                v-if="d.type=='未出厂设备'"
                class="left property"
              >
                <div class="property-item">
                  <div class="left">序列号：</div>
                  <div class="left">{{ d.propertyJson.code }}</div>
                </div>
                <div class="property-item">
                  <div class="left">验证码：</div>
                  <div class="left">{{ d.propertyJson.vcode }}</div>
                </div>
                <div class="property-item">
                  <div class="left">出厂日期：</div>
                  <div class="left">{{ d.propertyJson.production_date }}</div>
                </div>
                <div class="property-item">
                  <div class="left">版本号：</div>
                  <div class="left">{{ d.propertyJson.version }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <equip-detail ref="equipDetail" />

    </el-card>
    <el-dialog
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      :append-to-body="false"
      title="视频播放"
    >
      <div style="width: 100%;height:380px;">
        <sxtifram
          ref="video"
          playWay="play"
          :hd_device_id="hd_device_id"
        />
      </div>
      <!-- <iframe
        ref="video"
        :src="'/sxt?hd_device_id='+hd_device_id+'&playWay=play'"
        style="width:100%;height:100%"
      /> -->
    </el-dialog>
    <!--分页组件-->
    <el-pagination
      :total="searchResult.totals"
      :current-page="page"
      :page-size="size"
      style="margin-top: 8px;"
      layout="total, prev, pager, next"
      @current-change="pageChange"
    />
  </div>
</template>

<script>
import request from '@/utils/request'
import EquipDetail from '../base/equip/module/EquipDetail'
import VideoPlay from '../base/video/module/VideoPlay'
//import vPlay from '../base/video/module/Video'
import sxtifram from '@/views/base/video/module/Sxt_ifram'
//import { getSxtUrlById } from '@/api/sxt'
export default {
  name: 'Search',
  components: {
    EquipDetail, VideoPlay, sxtifram
  },
  data () {
    return {
      page: 1,
      size: 10,
      hd_device_id: '',
      device_id: '',
      playWay: 'play',
      videoAdress: '',
      dialogVisible: false,
      childRow: {},
      show: { isshowDKInfo: false },
      searchResult: { results: [], totals: 0 }
    }
  },
  mounted () {
    this.search()
  },
  methods: {
    pageChange (val) {
      this.page = val
      this.search()
    },
    search () {
      var keyword = this.$route.query.keyword
      request({
        url: 'search',
        method: 'get',
        params: { keyword: keyword, page: this.page, size: this.size },
      }).then((res) => {
        this.searchResult = res.data
        for (var i = 0; i < this.searchResult.results.length; i++) {
          var resultObj = this.searchResult.results[i]
          resultObj['propertyJson'] = this.parseJson(this.searchResult.results[i].business_property)
          // /assets/img/search/'+d.propertyJson.hd_device_type_code+'.png'
          if (resultObj.type == '基地') {
            resultObj.propertyJson['http_image_path'] = '/static/img/search/jd.png'
          } else if (resultObj.type == '地块') {
            resultObj.propertyJson['http_image_path'] = '/static/img/search/dk.png'
          } else if (resultObj.type == '设备') {
            resultObj.propertyJson['http_image_path'] = '/static/img/search/' + resultObj.propertyJson.hd_device_type_code + '.png'
          } else {

          }
          /*
          if (resultObj.propertyJson.image_path != null && resultObj.propertyJson.image_path != '') {
            resultObj.propertyJson.image_path = process.env.IMG_URL + resultObj.propertyJson.image_path
          }
          */
        }
      })
    }, parseJson (jsonString) {
      if (jsonString == null || jsonString == '') return {}
      return $.parseJSON(jsonString)
    }, forwardPage (d) {

      if (d.type == '基地') {
        this.$router.push({ path: '/myresources/baseView', query: { bs_base_id: d.business_id } })
      } else if (d.type == '地块') {
        this.$router.push({ path: '/dkInfo', query: { id: d.rs_facilities_id } })
      } else if (d.type === '设备') {

        if (d.propertyJson.hd_device_type_code === 'JK-SX') {


          this.hd_device_id = d.business_id
          this.dialogVisible = true
          // getSxtUrlById({ hd_device_id: d.propertyJson.id }).then(res => {
          //   // var communication = $.parseJSON(d.propertyJson.communication)
          //   this.videoAdress = res.data// communication.url.hd.rtmp
          //   this.childRow = d.propertyJson
          //   this.dialogVisible = true
          // })
        } else {
          this.$router.push({ path: '/deviceInfo', query: { id: d.business_id, breadcrumb: 'hide' } })
          //this.$refs.equipDetail.handelWatch(d.business_id, d.propertyJson.code)
        }
      }
    }
  }
}
</script>

<style lang="scss">
em {
  color: #d00 !important;
  font-style: normal;
}
.search-result {
  padding: 15px;
  z-index: 99999;
  background: #fff;
  width: calc(100%);
  height: calc(100% - 50px);
  .panel {
    width: 540px;
    margin-left: 150px;
    .panel-item {
      position: relative;
      height: 190px;
      margin-bottom: 30px;
      padding: 20px 19px;
      background: #fff;
      border: 1px solid #e3e3e3;
      zoom: 1;
      z-index: 30;
      box-shadow: 0 0 4px 1px rgba(116, 116, 116, 0.1);
      clear: both;
    }
  }
  h2 {
    font-size: 20px;
    line-height: 24px;
    a {
      color: #001ba0;
    }
  }
  .title {
  }
  .content {
    padding-top: 10px;
    line-height: 18px;
    .property-item {
      clear: both;
      color: #666;
      height: 25px;
    }
    img {
      width: 100px;
      height: 100px;
      border-radius: 5px;
      border: 2px solid #8080802e;
    }
    .property {
      padding-left: 10px;
    }
  }
  .left {
    float: left;
  }
}
</style>
