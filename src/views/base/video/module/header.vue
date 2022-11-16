<template>
  <div class="head-container">
    <!-- 添加，删除 -->
    <div style="display: inline-block;float:left">
      <el-button
        v-permission="['ADMIN','DEVICE_ALL','DEVICE_CREATE']"
        icon="el-icon-plus"
        type="primary"
        size="mini"
        @click="add"
      >添加</el-button>
      <!-- <el-button @click="test">
        test
      </el-button> -->
      <!-- <el-button v-permission="['ADMIN','DEVICE_ALL','DEVICE_DELETE']" icon="el-icon-close" type="danger" size="mini">删除</el-button> -->
    </div>

    <div style="text-align:right;margin-right:10px">
      <el-select
        v-model="query.rs_facilities_id"
        size="mini"
        clearable
        placeholder="请选择地块"
        style="width:150px"
        @change="toQuery()"
      >
        <el-option
          v-for="item in facilitieList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
          <span style="float: left">{{ item.name }}</span>
          <span style="float: right; color: green;margin-left: 10px; font-size: 12px">{{ item.dcount }}</span>
        </el-option>
      </el-select>
      <el-input
        v-model="query.keyword"
        clearable
        placeholder="请输入关键字"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="toQuery"
      />
      <el-button
        class="filter-item"
        size="mini"
        type="success"
        icon="el-icon-search"
        @click="toQuery"
      >搜索</el-button>
      <!-- <el-button
        :icon="sup_this.vstate?'el-icon-tickets':'el-icon-menu'"
        type="primary"
        size="mini"
        @click="changeVstate"
      /> -->
    </div>
    <!-- <video-add ref="videoAdd" :sup_this="sup_this" /> -->
    <!-- <el-dialog
      append-to-body
      :visible.sync="testDialog"
    >
      <video
        ref="videoPlayer"
        class="video-js"
      />
    </el-dialog> -->
  </div>
</template>

<script>
import { getGroupFacilitiesByVideo } from '@/api/rs_facilities'
import videojs from 'video.js';


export default {
  components: {
    // VideoAdd
  },
  props: {
    sup_this: {
      type: Object,
      required: true
    },
    query: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      DOMAIN: process.env.DOMAIN,
      facilitieList: [],
      childform: {},
      type: '',
      testDialog: false,
      videoOptions: {
        autoplay: 'muted',//自动播放
        controls: true,//用户可以与之交互的控件
        loop: true,//视频一结束就重新开始
        muted: false,//默认情况下将使所有音频静音
        aspectRatio: "16:9",//显示比率
        fullscreen: {
          options: { navigationUI: 'hide' }
        },
        sources: [
          {
            src: "https://" + this.DOMAIN + "/160_stream/live/SX01A-2002969/index.m3u8",
            type: "application/x-mpegURL"
          },
          // {
          //   src: "rtmp://rtmp01open.ys7.com/openlive/d2680ef8a458434185b537b32e1ffc89.hd",
          //   type: "rtmp/flv"
          // }
        ]
      }
    }
  },
  created () {
    this.getFacilitiesList()
  },
  methods: {
    test () {
      this.testDialog = true
      this.player = this.$video(this.$refs.videoPlayer, this.videoOptions, function onPlayerReady () {
        console.log('onPlayerReady', this);
      })
    },
    async changeVstate () {
      if (!this.sup_this.vstate) { // 切换成九宫格先获取列表的默认流地址
        this.sup_this.vstate = !this.sup_this.vstate
        this.sup_this.qiehuan()
        //await this.sup_this.getDefaultUrl()
      } else {
        this.sup_this.whetherOnline = null
        this.sup_this.vstate = !this.sup_this.vstate
      }
    },
    getFacilitiesList () {
      getGroupFacilitiesByVideo({ 'bs_base_id': this.$store.state.baseinfo.cur_base_id }).then(res => {
        if (res.data) {
          this.facilitieList = res.data
        }
      })
    },
    add () {
      this.sup_this.$refs.videoAddEdit.showDialog()
    },
    bindDeviceSuccess (id) {
      this.tableData.map(v => {
        if (v.id === id) {
          v.bind_sta = 1
        }
      })
    },
    toQuery () {
      this.$parent.page = 0
      this.$parent.init()
    }
  }
}
</script>

<style>
</style>
