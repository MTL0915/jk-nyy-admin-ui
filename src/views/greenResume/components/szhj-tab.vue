<template>
  <div class="tab-page">
    <ul>
      <li>
        <div class="li-left">
          <img src="@/assets/resume/icon70.png" />
          <span>资源规划：</span>
        </div>
        <div class="li-right">
          <el-checkbox label="启用" v-model="zyghVal"></el-checkbox>
          <div class="set-txt" @click="handleSet('资源规划', 'zygh', zyghVal)">
            设置>
          </div>
        </div>
      </li>
      <li>
        <div class="li-left">
          <img src="@/assets/resume/icon58.png" />
          <span>四季田景：</span>
        </div>
        <div class="li-right">
          <el-checkbox label="启用"></el-checkbox>
          <div class="set-txt" @click="handleSet('四季田景', 'sjtj', sjtjVal)">
            设置>
          </div>
        </div>
      </li>
      <li>
        <div class="li-left">
          <img src="@/assets/resume/icon71.png" />
          <span>农场实景：</span>
        </div>
        <div class="li-right">
          <el-checkbox label="启用"></el-checkbox>
        </div>
      </li>
      <li>
        <div class="li-left">
          <img src="@/assets/resume/icon72.png" />
          <span>气象数据：</span>
        </div>
        <div class="li-right">
          <el-checkbox label="启用"></el-checkbox>
        </div>
      </li>
      <li>
        <div class="li-left">
          <img src="@/assets/resume/icon73.png" />
          <span>环境特色：</span>
        </div>
        <div class="li-right">
          <el-checkbox label="启用" v-model="hjtsVal"></el-checkbox>
          <div class="set-txt" @click="handleSet('环境特色', 'hjts', hjtsVal)">
            设置>
          </div>
        </div>
      </li>
      <li>
        <div class="li-left">
          <img src="@/assets/resume/icon74.png" />
          <span>环境指纹：</span>
        </div>
        <div class="li-right">
          <el-checkbox label="启用"></el-checkbox>
        </div>
      </li>
      <li>
        <div class="li-left">
          <img src="@/assets/resume/icon75.png" />
          <span>专家解读：</span>
        </div>
        <div class="li-right">
          <el-checkbox label="启用" v-model="zjjdVal"></el-checkbox>
          <div class="set-txt" @click="handleSet('专家解读', 'zjjd', zjjdVal)">
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
      zyghVal: false, //资源规划
      sjtjVal: false, //四季田景
      hjtsVal: false, //环境特色
      zjjdVal: false //专家解读
    };
  },
  methods: {
    handleSet(title, type, state) {
      if (!state) {
        return false;
      }
      this.title = title;
      this.type = type;
      let self = this;
      setTimeout(() => {
        if(type==='zjjd'){
            self.$refs.logoform.width='800px'
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
