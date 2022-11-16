<template>
  <div class="tab-page">
    <ul>
      <li>
        <div class="li-left">
          <img src="@/assets/resume/icon58.png" />
          <span>农场介绍：</span>
        </div>
        <div class="li-right">
          <el-checkbox label="启用" v-model="ncjsVal"></el-checkbox>
          <div class="set-txt" @click="handleSet('农场介绍', 'ncjs', ncjsVal)">
            设置>
          </div>
        </div>
      </li>
      <li>
        <div class="li-left">
          <img src="@/assets/resume/icon51.png" />
          <span>农场视频：</span>
        </div>
        <div class="li-right">
          <el-checkbox label="启用" v-model="ncspVal"></el-checkbox>
          <div class="set-txt" @click="handleSet('农场视频', 'ncsp', ncspVal)">
            设置>
          </div>
        </div>
      </li>
      <li>
        <div class="li-left">
          <img src="@/assets/resume/icon38.png" />
          <span>农场秀：</span>
        </div>
        <div class="li-right">
          <el-checkbox label="启用" v-model="ncxVal"></el-checkbox>
          <div class="set-txt" @click="handleSet('农场秀', 'ncx', ncxVal)">
            设置>
          </div>
        </div>
      </li>
      <li>
        <div class="li-left">
          <img src="@/assets/resume/icon50.png" />
          <span>资质证书：</span>
        </div>
        <div class="li-right">
          <el-checkbox label="启用" v-model="zzzsVal"></el-checkbox>
          <div class="set-txt" @click="handleSet('资格证书', 'zzzs', zzzsVal)">
            设置>
          </div>
        </div>
      </li>
      <li>
        <div class="li-left">
          <img src="@/assets/resume/icon47.png" />
          <span>农场主：</span>
        </div>
        <div class="li-right">
          <el-checkbox label="启用"></el-checkbox>
        </div>
      </li>
      <li>
        <div class="li-left">
          <img src="@/assets/resume/icon48.png" />
          <span>种植者：</span>
        </div>
        <div class="li-right">
          <el-checkbox label="启用"></el-checkbox>
        </div>
      </li>
      <li>
        <div class="li-left">
          <img src="@/assets/resume/icon82.png" />
          <span>分享红包：</span>
        </div>
        <div class="li-right">
          <el-checkbox label="启用" v-model="fxhbVal"></el-checkbox>
          <div class="set-txt" @click="handleSet('分享红包', 'fxhb', fxhbVal)">
            设置>
          </div>
        </div>
      </li>
    </ul>
    <aform ref="logoform" :title="title" :type="type" />
  </div>
</template>
<script>
import aform from "../module/add-form";
export default {
  components: {
    aform
  },
  data() {
    return {
      title: "",
      type: "",
      ncjsVal: true,
      ncspVal: true,
      ncxVal: true,
      zzzsVal: true,
      fxhbVal: true
    };
  },
  methods: {
    handleSet(title, type, selectState) {
      if (!selectState) {
        return false;
      }
      this.title = title;
      this.type = type;
      let self = this;
      setTimeout(() => {
        if(type==='zzzs'){
            self.$refs.logoform.width="600px"
        }
        self.$refs.logoform.onOpened();
      }, 50);
    }
  }
};
</script>

<style lang="scss" scoped>
.tab-page {
  padding: 14px;
}
.tab-page ul {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.tab-page ul li {
  width: 49%;
  height: 34px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #f1f2f6;
  box-sizing: border-box;
  font-size: 12px;
  color: #666;
}
.tab-page ul li .li-left {
  display: flex;
  height: 34px;
  align-items: center;
}
.tab-page ul li .li-left span {
  display: block;
  margin-top: 4px;
}
.tab-page ul li .li-left img {
  display: block;
  margin-right: 4px;
}
.tab-page ul li .set-txt {
  color: #599ad1;
  margin-left: 10px;
  cursor: pointer;
}
.li-right {
  height: 100%;
  display: flex;
  align-items: center;
}
/deep/.el-checkbox__label {
  font-size: 12px;
}
</style>
