<template>
  <div class="group">
    <h3>
      <i :class="className"/>
      <span>{{ text }}</span>
    </h3>
    <ul>
      <li v-for="(item,index) in data" v-if='index < num' :title="item.port" :key="index" @click="getDate(index)">{{ item.port }}</li>
    </ul>
    <div class="more" @click="more">
      <i :class="[unfold ? 'el-icon-arrow-down': 'el-icon-arrow-up']"/>
      <span v-show="unfold">展开</span>
      <span v-show="!unfold">收起</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      default: []
    },
    className: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      num: 5,
      unfold: true
    }
  },
  computed: {
  },
  mounted() {
  },
  methods: {
    more() {
      if (this.unfold) {
        this.num = 100
        this.unfold = false
      } else {
        this.num = 5
        this.unfold = true
      }
    },
    getDate(index) {
      this.$store.commit('SET_CURRENT_DATA', this.data[index])
      this.$store.commit('SET_CURRENT_PATH', this.data[index].id)
      this.$store.commit('SET_API_DATA', this.data)
      this.$router.push({
        path: `/nav`,
        query: { id: this.data[index].id }
      })
      sessionStorage.setItem('current_data', JSON.stringify(this.data[index]))
      sessionStorage.setItem('current_path', JSON.stringify(this.data[index].id))
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
    .group{
        cursor: default;
        font-size: 14px;
        flex: 1;
        padding: 0 26px 0 15px;
        h3 {
            height: 30px;
            line-height: 30px;
        }
        li {
            height: 40px;
            line-height: 40px;
            max-width: 185px;
            border-bottom: 1px solid #EBEBEB;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        li:hover {
            color: #108CEE;
            background: rgba(219,222,221,0.5);
            //border-radius: 40px;
        }
    }
    .more {
        height: 30px;
        line-height: 30px;
        color: #108CEE;
    }
</style>
