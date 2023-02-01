<template>
  <div class="shuifeiji-bg">
    <headerNav :value="$route.query.id"></headerNav>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import headerNav from "./Header.vue"
export default {
  data() {
    return {

    };
  },
  components: {
    headerNav,
  },
  created() {

  },
  methods: {

  },

};
</script>

<style scoped>
.shuifeiji-bg{
  width: 100%;
  height: 100%;
  background: url("~@/assets/images/shuifeiji/底图.png") no-repeat;
  background-size:cover;
  min-height: 931px;
  min-width: 1920px;
  color: #fff;
}
</style>