<template>
  <div class="help">
    <div class="header">
      <span>帮助中心</span>
      <span>开发者资源</span>
    </div>
    <div class="contant">
      <div class="listLeft">
        <ul>
          <li v-for="(item, index) in list1" :key="index" @click="helpTool(index)" >{{ item }}</li>
        </ul>
      </div>
      <div class="listRight">
        <ul>
          <li v-for="(item, index) in list2" :key="index" @click="adminTool(index)">{{ item }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      list1: ['操作文档', '入门视频'],
      list2: ['API接口文档']
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  created(){
  },
  methods: {

    startIntro() {
      var intro = introJs()
      intro.setOptions({ 'skipLabel': '结束', 'doneLabel': '结束', 'prevLabel': '上一步', 'nextLabel': '下一步', 'showStepNumbers': true }).start()
      intro.onchange(function(targetElement) {
        // not to do
      }).oncomplete(function() {
        intro.exit()
      })
    },
    adminTool(index) {
      if(this.list2[index] === 'API接口文档'){
          window.open('/static/doc/健坤物联网云平台开放接口文档说明.pdf');
      }
    },
    helpTool(index) {
        if (this.list1[index] === '操作文档') {
            //this.startIntro()
            window.open('/static/doc/健坤物联网云平台操作手册.pdf');
        }else if (this.list1[index] === '入门视频') {
            alert("视频正在火速录制中，敬请期待...");
        }
    }
  }
}
</script>
<style lang="scss" scoped>
    ul {
        list-style: none;
    }
    li {
        height: 30px;
        line-height: 30px;
    }
    li:hover {
        color: #108CEE;
    }
    .header {
        display: flex;
        height: 30px;
        line-height: 30px;
        span {
            display: inline-block;
            flex: 1;
            color: #999;
        }
    }
    .help {
        background-color: #fff;
		width: 180px;
		height: 100px;
        cursor: default;
    }
    .listLeft {
        flex: 1;
    }
    .listRight {
        flex: 1;
    }
    .contant {
        display: flex;
        color: #000;
    }
</style>
