<template>
  <div class="box">
    <!-- <div class="header">视频监控</div> -->
    <div class='boxContont'>
      <!-- <iframe src=''  style='border:1px solid #288c9d;width:100%;height:100%'></iframe> -->
      <div class="toggleHeader">
        <!-- 标签切换 -->
        <div class="tags_box">
          <div v-for="(item, index) in modelData" :key="item.productSfModelDetailId" class="tags">
            <div
              :class="{ isActive: index == toggleIndex }"
              class="tags_box_item_box"
              @click="HandelToggle(index,item.hd_device_id)"
            >
              <span class="toggleSelect">{{item.hd_device_name}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="toggleBody">
        <div class="toggle-body-item">
          <!-- <video src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" style='width:100%;height:100%' controls></video> -->
          <iframe :src="'/sxt?hd_device_id='+sxtId+'&device_id=&playWay=play&rs_facilities_id=&autoPlay=true&unableControl=false'"  style='border:1px solid #288c9d;width:100%;height:100%'></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:["modelData"],
  data() {
    return {
      toggleIndex: 0,
      sxtId:''
    };
  },
  mounted() {
    this.HandelToggle(0,this.modelData[0].hd_device_id)
  },
  methods:{
    HandelToggle(index,id) {
      this.toggleIndex = index;
      this.sxtId = id
    },
  }
};
</script>

<style scoped>
.box{
    height: calc(32% - 10px);
    position: relative;
    margin: 10px 0;
    border: 1px solid #288c9d;
}

.box .header {
  font-size: 20px;
  color: #78F7F7;
  text-align: center;
  height: 38px;
  line-height: 38px;
}
.boxContont{
  padding: 10px;
  height: 100%;
}
.toggleHeader{
  height: 50px;
}
.toggleBody{
  height: calc(100% - 50px);
}
.toggle-body-item{
  height: 100%
}
.tags_box{
  display: flex;
  align-items: center;
  /* justify-content: right; */
  overflow-x: scroll;
  width: 100%;
}
.tags{
  text-align: center;
  margin-left: 10px;
  cursor: pointer;
}
.toggleSelect{
  display: inline-block;
  width: 101px;
  height: 38px;
  line-height: 38px;
  background: url(~@/assets/images/shuifeiji/select_bg.png) no-repeat;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 10px;
}
.isActive .toggleSelect{
  background: url(~@/assets/images/shuifeiji/select_bg_on.png) no-repeat;
}
</style>