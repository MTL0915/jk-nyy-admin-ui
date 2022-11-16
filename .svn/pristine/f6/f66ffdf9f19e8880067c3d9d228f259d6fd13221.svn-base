<template>
  <div>
    <default-login v-if="show =='default'" />
    <custom-one
      :loginConfig="loginConfig"
      v-if="show =='custom_formwork1'"
      :custom_base_id="custom_base_id"
    />
    <custom-two
      :loginConfig="loginConfig"
      v-if="show =='custom_formwork2'"
      :custom_base_id="custom_base_id"
    />
    <custom-three
      :loginConfig="loginConfig"
      v-if="show =='custom_formwork3'"
      :custom_base_id="custom_base_id"
    />
    <div class="footerBox" v-if="footerShow">
      <span>备案号:<a href="https://beian.miit.gov.cn" target="_blank" class="link">粤ICP备2021141072号</a></span>
    </div>
  </div>
</template>
<script>
import defaultLogin from "@/views/login/index"
import customOne from "@/views/login/custom_formwork1"
import customTwo from "@/views/login/custom_formwork2"
import customThree from "@/views/login/custom_formwork3"
import { getCustom, getCustomView } from '@/api/login'
import Config from '@/config'
export default {
  data () {
    return {
      show: "",
      loginConfig: {},
      custom_base_id: "",
      footerShow: false
    }
  },
  props: {
    basecode: {
      type: String,
      default: null
    }
  },
  components: {
    defaultLogin,
    customOne,
    customTwo,
    customThree
  },
  created () {
    // 判断ip,添加尾部
    if (window.location.hostname === '112.94.67.234') {
      this.footerShow = true
    } else {
      this.footerShow = false
    }
    this.getCustomConfig()
  },
  // mounted () {
  //   this.getCustomConfig()
  // },
  methods: {
    //获取url参数字段
    GetQueryString (name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]); return null;
    },
    getCustomConfig () {
      const code = this.GetQueryString('basecode') || this.basecode
      const custom_base_id = this.GetQueryString('custom_base_id')
      if (code == null && custom_base_id == null) {
        this.show = 'default'
      } else {
        if (custom_base_id == null) {
          localStorage.removeItem("loginConfig")
          localStorage.removeItem("basecode")
          const data = {
            bs_base_code: code
          }
          getCustom(data).then(res => {
            if (res.code == 200) {
              // 登录页设置  网页标题
              for(let i = 0; i < res.data.config.length; i++){
                const text = res.data.config[i];
                if (text.cff_code == "documentTitle") {
                  if (text.cbf_data && text.cbf_data !== null && text.cbf_data !== '') {
                    if (typeof text.cbf_data === "string") {
                      var documentTitle = JSON.parse(text.cbf_data)
                    }
                    if (documentTitle.text) {
                      document.title = this.$route.meta.title + ' - ' + documentTitle.text
                    }
                  } else {
                    document.title = this.$route.meta.title + ' - ' + Config.webName
                  }
                  break
                }
              }
              this.$store.dispatch("setBaseCode", code)
              this.$store.dispatch("setLoginConfig", res.data)
              localStorage.setItem("basecode", code)
              localStorage.setItem("loginConfig", JSON.stringify(res.data))
              this.show = res.data.cf_code
            } else {
              this.show = 'default'
            }

          }).catch(() => {
            this.show = 'default'
          })
        } else {
          const data = {
            custom_base_id: custom_base_id
          }
          this.custom_base_id = custom_base_id
          getCustomView(data).then(res => {
            if (res.code == 200) {
              this.loginConfig = res.data
              this.show = res.data.cf_code
            } else {
              this.show = 'default'
            }

          }).catch(() => {
            this.show = 'default'
          })
        }

      }

    }
  }
}
</script>
<style lang="stylus" scoped>
.footerBox {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  text-align: center;
  background: rgba(238, 238, 238, 0.8);
  padding: 8px;
  font-size: 15px;
  color: #000
}
.link:hover {
  color: red;
  text-decoration: underline
}
</style>