<template>
  <div class="body" :style="{backgroundColor:'#eeeeee',width:'100%',height:'100%'}">
    <div style="line-height:40px;height:40px">
      <a href="/function/qrcode?id=319">
        <i class="el-icon-arrow-left" style="font-size:25px"></i>
        <span style="font-size:16px;vertical-align:top;height:30px;line-height:30px">返回</span>
      </a>
    </div>
    <div style="height: 100px;line-height: 100px;text-align: center;font-size: 18px;">请输入管理密码</div>
    <div style="text-align:center">
      <el-input v-model="password" show-password placeholder="请输入密码" style="width:200px"></el-input>
    </div>
    <div
      style="height:120px;line-height:120px;font-size:15px;color:red;text-align:center"
    >{{errormsg}}</div>
    <div style="text-align:center">
      <el-button type="success" style="width:100px" @click="checkLogin">登陆</el-button>
    </div>
  </div>
</template>
<script>

import {login} from './qrcode'

export default {
  data() {
    return {
      id:'',
      password: '',
      errormsg: ''
    }
  },
  created(){
    var id = this.$route.query.id;
    this.id = id;
  },
  methods: {
    checkLogin() {
      login(this.id,this.password).then(res => {
        if (res.code === 200)  {
          localStorage.setItem('passkey', res.data)
          window.location.href = '/function/qrcode/setting?id=319'
        }else {
          this.errormsg = res.msg
        }
      })
    }
  }
}
</script>
<style scoped>

</style>