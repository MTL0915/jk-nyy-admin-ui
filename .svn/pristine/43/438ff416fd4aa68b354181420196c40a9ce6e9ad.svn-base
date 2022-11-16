<template>
  <div class="tab-page">
    <ul>
      <li>
        <div class="li-left">
          <img src="@/assets/resume/icon22.png" />
          <span>企业LOGO</span>
        </div>
        <div class="li-right">
          <div class="set-txt" @click="handleSet('企业LOGO', 'logo',true)">
            设置>
          </div>
        </div>
      </li>
      <li>
        <div class="li-left">
          <img src="@/assets/resume/icon49.png" />
          <span>基地位置：</span>
        </div>
        <div class="li-right">
          <el-checkbox label="启用"></el-checkbox>
        </div>
      </li>
      <li>
        <div class="li-left">
          <img src="@/assets/resume/icon66.png" />
          <span>种植时间：</span>
        </div>
        <div class="li-right">
          <el-checkbox label="启用"></el-checkbox>
        </div>
      </li>
      <li>
        <div class="li-left">
          <img src="@/assets/resume/icon69.png" />
          <span>采收时间：</span>
        </div>
        <div class="li-right">
          <el-checkbox label="启用"></el-checkbox>
        </div>
      </li>
      <li>
        <div class="li-left">
          <img src="@/assets/resume/icon67.png" />
          <span>产品介绍：</span>
        </div>
        <div class="li-right">
          <el-checkbox label="启用" v-model="proIntroVal"></el-checkbox>
          <div class="set-txt" @click="handleSet('产品介绍', 'cpjs',proIntroVal)">
            设置>
          </div>
        </div>
      </li>
      <li>
        <div class="li-left">
          <img src="@/assets/resume/icon54.png" />
          <span>评论：</span>
        </div>
        <div class="li-right">
          <el-checkbox label="启用"></el-checkbox>
        </div>
      </li>
      <li>
        <div class="li-left">
          <img src="@/assets/resume/icon56.png" />
          <span>我要购买：</span>
        </div>
        <div class="li-right">
          <el-checkbox label="启用" v-model="buyVal"></el-checkbox>
          <div class="set-txt" @click="handleSet('我要购买', 'wygm',buyVal)">
            设置>
          </div>
        </div>
      </li>
      <li>
        <div class="li-left">
          <img src="@/assets/resume/icon35.png" />
          <span>成熟度：</span>
        </div>
        <div class="li-right">
          <el-checkbox label="启用"></el-checkbox>
        </div>
      </li>
      <li>
        <div class="li-left">
          <img src="@/assets/resume/icon39.png" />
          <span>种植标准：</span>
        </div>
        <div class="li-right">
          <el-checkbox label="启用"></el-checkbox>
        </div>
      </li>
      <li>
        <div class="li-left">
          <img src="@/assets/resume/icon15.png" />
          <span>点赞：</span>
        </div>
        <div class="li-right">
          <el-checkbox label="启用"></el-checkbox>
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
      proIntroVal:true, //产品介绍
      buyVal:true  //我要购买
    };
  },
  methods: {
    handleSet(title, type,selectState) {
      if(!selectState){
        return false;
      }
      this.title = title;
      this.type = type;
      let self = this;
      setTimeout(() => {
        if(type==='cpjs'){
          self.$refs.logoform.width="800px"
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
