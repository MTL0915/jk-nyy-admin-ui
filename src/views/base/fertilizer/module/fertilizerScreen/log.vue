<template>
  <div class="box">
    <div class="sidebar">
      <ul class="nav">
        <li><a id="_1" href="#">Menu1</a></li>
        <li><a id="_2" href="#">Menu2</a></li>
      </ul>
    </div>
    <div class="content"></div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.box{
  display: flex;
  height: 100%;
}
.sidebar{
  width: 270px;
  height: 100%;
  background-color: #acacac;
}
.content{
  width: calc(100% - 270px);
  height: 100%;
  background-color: #abcdef;
}
</style>