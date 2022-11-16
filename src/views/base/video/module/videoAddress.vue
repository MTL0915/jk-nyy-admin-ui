<template>
  <div style="text-align: center;">
    <div class="mm" v-if="ezopen_sd">
      ezopen标清：<el-input
        size="mini"
        class="tag-read"
        style="width:calc(100% - 308px)"
        :value="ezopen_sd"
      />
      <el-button type="primary" size="mini" @click="copy(0)">复制</el-button>
    </div>
    <div class="mm" v-if="ezopen_hd">
      ezopen高清：<el-input
        size="mini"
        class="tag-read"
        style="width:calc(100% - 308px)"
        :value="ezopen_hd"
      />
      <el-button type="primary" size="mini" @click="copy(1)">复制</el-button>
    </div>
    <div class="mm" v-if="hls_sd">
      hls标清：<el-input
        size="mini"
        class="tag-read"
        style="width:calc(100% - 280px)"
        :value="hls_sd"
      />
      <el-button type="primary" size="mini" @click="copy(2)">复制</el-button>
    </div>
    <div class="mm" v-if="hls_hd">
      hls高清：<el-input
        size="mini"
        class="tag-read"
        style="width:calc(100% - 280px)"
        :value="hls_hd"
      />
      <el-button type="primary" size="mini" @click="copy(3)">复制</el-button>
    </div>
    <div class="mm" v-if="rtmp_sd">
      rtmp标清：<el-input
        size="mini"
        class="tag-read"
        style="width:calc(100% - 290px)"
        :value="rtmp_sd"
      />
      <el-button type="primary" size="mini" @click="copy(4)">复制</el-button>
    </div>
    <div class="mm" v-if="rtmp_hd">
      rtmp高清：<el-input
        size="mini"
        class="tag-read"
        style="width:calc(100% - 290px)"
        :value="rtmp_hd"
      />
      <el-button type="primary" size="mini" @click="copy(5)">复制</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ezopen_sd: null,
      ezopen_hd: null,
      hls_sd: null,
      hls_hd: null,
      rtmp_sd: null,
      rtmp_hd: null
    };
  },
  methods: {
    copy(index) {
      var dom = $(".tag-read")[index];
      var selection = window.getSelection();
      var range = document.createRange();
      // 选择复制目标
      range.selectNodeContents(dom);
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand("copy");
    },
    init(comm_json) {
      if (comm_json) {
        const deviceSerial = comm_json.config.deviceSerial;
        const validateCode = comm_json.config.validateCode;
        const channel = comm_json.config.channel;
        this.hls_sd = comm_json.url.sd.hls;
        this.hls_hd = comm_json.url.hd.hls;
        this.rtmp_sd = comm_json.url.sd.rtmp;
        this.rtmp_hd = comm_json.url.hd.rtmp;
        this.ezopen_sd =
          "ezopen://" +
          validateCode +
          "@open.ys7.com/" +
          deviceSerial +
          "/" +
          channel +
          ".live";
        this.ezopen_hd =
          "ezopen://" +
          validateCode +
          "@open.ys7.com/" +
          deviceSerial +
          "/" +
          channel +
          ".hd.live";
      }
    }
  }
};
</script>
<style>
.mm {
  margin: 15px;
}
</style>
