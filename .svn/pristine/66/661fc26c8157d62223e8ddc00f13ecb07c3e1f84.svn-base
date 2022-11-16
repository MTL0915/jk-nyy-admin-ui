<template>
  <div class="vr_new">
    <img src="@/assets/vr/vr_logo.jpg" >
    <div ref="room" class="vr_new_room">
      <div class="vr_new_room_title">
        <div> 建坤全景图 </div>
      </div>
      <div class="vr_new_room_dy">
        <img src="@/assets/vr/vr_new_add.png" title="创建新的全景" @click="createPanorama" >
      </div>
      <div class="vr_new_room_dy">
        <img style="height:90%;margin-top:5%;" src="@/assets/vr/vr_new_copy.png" title="从已有全景克隆" >
      </div>
    </div>
    <div ref="left" class="vr_new_room left" style="height: 350px;">
      <div style="padding: 0 0;" class="vr_new_room_title">
        <input type="text" value="新建全景图 " >
        <img class="leftBack" src="@/assets/vr/vr_new_before.png" @click="leftBack" >
      </div>
      <div style="" class="vr_new_room_foot">
        <div>预览</div>
        <div>保存</div>
      </div>
      <div class="vr_new_room_dy" @click="updateFile">
        <div style="position: absolute;width: 100%;top: 5px;color:#ffffff;"> 点击上传全景图片 </div>
        <img style="height: 160px;margin-top: 91px;" src="@/assets/vr/vr_new_updateFlie.png" title="上传图片" >
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {

  },
  data: () => ({

  }),
  created() {

  },
  methods: {
    // 创建新的全景图
    createPanorama() {
      // 首页上飞
      this.$refs.room.className = 'vr_new_room top'
      // 标签页剧中
      this.$refs.left.className = 'vr_new_room center'
    },
    // 新建全景回到上一步
    leftBack() {
      // 首页上飞
      this.$refs.room.className = 'vr_new_room'
      // 标签页剧中
      this.$refs.left.className = 'vr_new_room left'
    },
    // 上传图片
    updateFile() {
      if (!this.file) {
        this.file = document.createElement('input')
        this.file.type = 'file'
        this.file.onchange = (ev) => {
        }
      }
      this.file.click()
    }

  }
}
</script>
<style>
    .vr_new {
      position: relative;
      height: 100%;
    }
    .vr_new > img {
      height: 100%;
      width: 100%;
    }
    .vr_new .vr_new_room.left {
      left: -100%;
    }
    .vr_new .vr_new_room.right {
      left: 100%;
    }
    .vr_new .vr_new_room.top {
      top: -100%;
    }
    .vr_new .vr_new_room.center {
      left: 50%;
    }
    .vr_new .vr_new_room {
      transition: all 0.35s;
      width: 600px;
      height:200px;
      position:absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      background: #ffffff3d;
      border: solid 1px #02b9ff;
      border-radius: 4px;
      display: flex;
    }
    .vr_new .vr_new_room .vr_new_room_dy {
      width: 100%;
      margin: 20px;
      cursor: pointer;
      transition: all 0.25s;
      position: relative;
      text-align: center;
    }
    .vr_new .vr_new_room .vr_new_room_dy:hover {
      background: #36484ec7;
      border-radius: 4px;
    }
    .vr_new .vr_new_room .vr_new_room_dy > img {
      height : 100%;
    }
    .vr_new .vr_new_room .vr_new_room_foot {
      position: absolute;
      bottom: -65px;
      width: 100%;
      text-align: center;
      color: #1296db;
      font-size: 29px;
      display: flex;
      justify-content: space-around;
    }
    .vr_new .vr_new_room .leftBack {
      position: absolute;
      right: -60px;
      width: 37px;
      height: 37px;
      border: 1px solid #1296db;
      border-radius: 4px;
      cursor: pointer;
    }
    .vr_new .vr_new_room .leftBack:hover {
      background: #1296db3e;
    }
    .vr_new .vr_new_room .vr_new_room_foot > div:hover {
      background: #02b9ff;
    }
    .vr_new .vr_new_room .vr_new_room_foot > div {
      font-size: 14px;
      padding: 15px 0;
      transition: all 0.35s;
      cursor: pointer;
      border: solid 1px #ffffff;
      width: 100%;
      border-radius: 4px;
      background: #02b9ff8c;
      color: #fff;
    }
    .vr_new .vr_new_room .vr_new_room_title {
      position: absolute;
      top: -65px;
      width: 100%;
      text-align: center;
      color: #1296db;
      font-size: 29px;
      background: #ffffff8c;
      border-radius: 4px;
      border: solid 1px;
      padding: 8px 0px;
    }
    .vr_new .vr_new_room .vr_new_room_title > input {
      width: calc(100% - 24px);
      padding: 10px;
      font-size: 16px;
      color: #001fff;
      background: #ffffff12;
      border-radius: 6px;
      border: none;
      outline: none;
    }
    .vr_new .vr_new_room .vr_new_room_title > input:focus {
      background: #ffffff;
    }
</style>
