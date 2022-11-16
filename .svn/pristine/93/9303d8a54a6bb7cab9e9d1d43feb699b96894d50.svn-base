<template>

  <div class="SB_info_model">
    <div class="cover" />
    <div class="SB_info_content">
      <div class="head">{{ form.name }}</div>
      <div class="row">
        <div class="col_4">
          <img src="/static/img/cgq.png">
        </div>
        <div class="col_1" />
        <div class="col_7">
          <div>
            <span>气温</span>
            <span>: </span>
            <span>22℃</span>
          </div>
          <div>
            <span>气温</span>
            <span>: </span>
            <span>22℃</span>
          </div>
          <div>
            <span>气温</span>
            <span>: </span>
            <span>22℃</span>
          </div>
          <div>
            <span>气温</span>
            <span>: </span>
            <span>22℃</span>
          </div>
        </div>
      </div>
      <div
        class="row"
        style="background: #000000;text-align: center;margin-top:8px;padding:3px;width:calc(100% - 6px)"
      >
        <div class="col_4 curp">查看更多</div>
        <div class="col_4" />
        <div class="col_4 curp">更新</div>
      </div>
    </div>
  </div>

</template>

<script>

export default {
  name: 'SBInfo',
  data() {
    return {
      name: 'SBInfo',
      form: {
        name: ''
      }
    }
  },
  methods: {
    setGemotry: function(geometry) {
      this.form.name = geometry.attr.name
    },
    hideElement: function() {
      this.$parent.isshowSBInfo = false
    }
  }
}

</script>

<style>
.row {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.row .col_1 {
  width: 8.333%;
}
.row .col_2 {
  width: 16.666%;
}
.row .col_3 {
  width: 25%;
}
.row .col_4 {
  width: 33.333%;
}
.row .col_5 {
  width: 41.666%;
}
.row .col_6 {
  width: 50%;
}
.row .col_7 {
  width: 58.333%;
}
.row .col_8 {
  width: 66.666%;
}
.row .col_9 {
  width: 75%;
}
.row .col_10 {
  width: 83.333%;
}
.row .col_11 {
  width: 91.666%;
}
.row .col_12 {
  width: 100%;
}

/* .SB_info_model { width: 280px;position:absolute;padding:8px;font-size: 12px;color: #fff;top: 0;left:0; }
.SB_info_model img { width:100%;height:100%; } */
.SB_info_model .info_model {
  height: 33%;
}
.SB_info_model .SB_info_content {
  position: relative;
}
.SB_info_model .cover {
  background: #404852;
  opacity: 0.85;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
}
.SB_info_model .curp {
  cursor: pointer;
}
.SB_info_model .head {
  font-size: 16px;
  padding: 8px 0;
}
</style>
