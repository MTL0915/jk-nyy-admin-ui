<template>
  <div>
    <div class="loginHeader">
      <div class="logo">
        <img
          src="../../assets/logo/jk_logo.png"
          style="height:40px"
        >
      </div>
      <div class="nav">
        <a href="#introduce">产品介绍</a>
        <a href="#feature">功能</a>
        <a href="#serve">服务模式</a>
        <a class="load">app下载
          <div class="card">
            <img
              src="../../assets/login/code.png"
              style="width:100px"
            >
          </div>
        </a>
        <a @click="$router.push('/login')">登录/注册</a>
      </div>
    </div>
    <div
      class="box"
      ref="box"
    >
      <div class="header">
        <img src="../../assets/logo/introduce.png" />
      </div>
      <div class="content">
        <div
          id="introduce"
          style="padding:0 200px"
        >
          <div>
            <p style="font-size:44px;text-align:center;margin-bottom:30px">农语云是什么？</p>
            <p style="font-size:18px;line-height:30px">农语-云平台，引领国内智慧农业发展方向，基于物联网设备为智慧农业提供全过程的监测、管理、分析和生成指导。聆听农户的心里话，解决农企的生产痛点，让农业领域的一、二、三产变得更轻松更便捷。</p>
          </div>
          <div class="scheme">
            <div class="schemeBox">
              <img src="../../assets/logo/jc.png" />
              <p>实时获取与作物生长息息相</p>
              <p>关的气象数据、环境数据</p>
            </div>
            <div class="schemeBox">
              <img src="../../assets/logo/gl.png" />
              <p>帮助农企实现精细化管理</p>
              <p>并降低成本、提高效率</p>
            </div>
            <div class="schemeBox">
              <img src="../../assets/logo/zd.png" />
              <p>生成最适合的指导方案</p>
              <p>打造智慧农业生态</p>
            </div>
          </div>
        </div>
        <div
          class="feature"
          id="feature"
        >
          <div>
            <p style="font-size:44px;text-align:center;margin-bottom:40px">功能介绍</p>
          </div>
          <div
            class="featureBox"
            style="padding-left:200px"
          >
            <div style="padding-top:60px;flex:0 0 450px">
              <img
                src="../../assets/logo/sy01.png"
                style="margin-bottom:20px"
              />
              <p style="font-size:18px;margin-bottom:40px">生产过程让农企全程可见</p>
              <p class="featureText">农语云APP可帮助农业生产者实现远程监控、远程管理，<br />精准控制生产周期、病虫害及时防范，减少人力物力投入，<br />显著提升作物产量，实现高效生产和利润提升。</p>
              <div style="margin:20px 0;font-size:16px;color:#5ACFB5">扫描app下载：</div>
              <div>
                <img
                  src="../../assets/login/code.png"
                  style="width:100px"
                />
              </div>
            </div>
            <div style="flex:1;text-align:right">
              <img
                src="../../assets/logo/sy.png"
                style="height:500px;object-fit:cover"
              />
            </div>
          </div>
          <div class="featureBox">
            <div>
              <img
                src="../../assets/logo/jkzk.png"
                style="height:500px;object-fit:cover"
              />
            </div>
            <div style="padding:60px 0 0 100px;flex:0 0 450px;">
              <img
                src="../../assets/logo/jkzk01.png"
                style="margin-bottom:20px"
              />
              <p style="font-size:18px;margin-bottom:40px">基地实时健康状况</p>
              <p class="featureText">快速查看基地实时健康状况，查看基地下属设备资源占比、设备状态，查看基地环境综合变化。</p>
            </div>
          </div>
          <div
            class="featureBox"
            style="padding-left:200px"
          >
            <div style="padding-top:60px;flex:0 0 450px">
              <img
                src="../../assets/logo/sbkz01.png"
                style="margin-bottom:20px"
              />
              <p style="font-size:18px;margin-bottom:40px">设备实时控制</p>
              <p class="featureText">农业物联网与农业生产技术深度融合，帮助用户实现远程监控、远程控制物联网设备，高效利用各种农业资源、最大限度减少农业成本和消耗，通过全面感知、可靠传输、智能分析处理。实现便捷、科学、高效生产。</p>
            </div>
            <div style="flex:1;text-align:right">
              <img
                src="../../assets/logo/sbkz.png"
                style="height:500px;object-fit:cover"
              />
            </div>
          </div>
          <div class="featureBox">
            <div>
              <img
                src="../../assets/logo/sjzs.png"
                style="height:500px;object-fit:cover"
              />
            </div>
            <div style="padding:60px 0 0 100px;flex:0 0 450px;">
              <img
                src="../../assets/logo/sjzs01.png"
                style="margin-bottom:20px"
              />
              <p style="font-size:18px;margin-bottom:40px">传感器数据展示</p>
              <p class="featureText">实时监测、展示当前作物生长息息相关的气象数据、土壤墒情数据，打造作物最适宜生长环境。</p>
            </div>
          </div>
          <div
            class="featureBox"
            style="padding-left:200px"
          >
            <div style="padding-top:60px;flex:0 0 450px">
              <img
                src="../../assets/logo/bch01.png"
                style="margin-bottom:20px"
              />
              <p style="font-size:18px;margin-bottom:40px">病虫害精准识别</p>
              <p class="featureText">用户发现作物异常时，可通过手机拍摄作物叶片或者果实上传到APP，即可在毫秒内识别作物是否患有病虫害，患有什么病虫害，并获得防治措施。</p>
            </div>
            <div style="flex:1;text-align:right">
              <img
                src="../../assets/logo/bch.png"
                style="height:500px;object-fit:cover"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        class="serveMode"
        id="serve"
      >
        <p style="font-size:44px;text-align:center;color:#fff;line-height:200px">农语云的服务模式</p>
        <div class="serveModeBox">
          <div class="serveBox1">
            <p style="font-size:18px;margin-bottom:10px">软件功能免费使用</p>
            <p style="font-size:14px">农语云APP免费使用，省钱又省心</p>
          </div>
          <div class="serveBox2">
            <p style="font-size:18px;margin-bottom:10px">物联网设备接入</p>
            <p style="font-size:14px">可购买物联网设备实现各类监测</p>
          </div>
          <div class="serveBox3">
            <p style="font-size:18px;margin-bottom:10px">个性化场景定制</p>
            <p style="font-size:14px">根据现场环境提供精准化服务</p>
          </div>
        </div>
      </div>
      <div class="footer">
        <img src="../../assets/logo/footerLogo.png" />
      </div>
    </div>
    <div
      class="top"
      ref="top"
      @click="top"
    >
      <i class="el-icon-top"></i>
    </div>
  </div>
</template>
<script>
export default {
  mounted () {
    window.addEventListener("scroll", this.scrollTop, true);
  },
  methods: {
    scrollTop () {
      const box = this.$refs.box
      const top = this.$refs.top
      if (box.scrollTop > 800) {
        top.style.display = "block"
      } else {
        top.style.display = "none"
      }
    },
    top () {

      this.$refs.box.scrollTop = 0
    }
  }
}
</script>
<style lang="stylus" scoped>
@import 'swiper/dist/css/swiper.css'

.loginHeader
  width 100%
  height 60px
  line-height 60px
  display flex
  background linear-gradient(to right, #08b8c8, #5acfb5)

.logo
  height 100%
  flex 0 0 150px
  margin-left 60px
  display inline-block
  box-sizing border-box
  padding 10px 0

.box
  position fixed
  top 60px
  bottom 0
  overflow-y auto

.nav
  flex 1
  margin-left 100px
  display inline-block
  box-sizing border-box
  height 100%
  display flex
  color #fff
  font-size 14px

  a
    flex 1
    text-align center
    display inline-block
    line-height 60px
    cursor pointer

.header
  img
    width 100%
    object-fit cover

.content
  margin-top 100px

.box::-webkit-scrollbar
  width 0
  height 0

.box::-webkit-scrollbar-thumb
  border-radius 50%
  box-shadow inset 0 0 5px rgba(0, 0, 0, .2)
  background #535353

.box::-webkit-scrollbar-track
  box-shadow inset 0 0 5px rgba(0, 0, 0, .2)
  border-radius 10px
  background #ededed

.scheme
  display flex
  margin-top 60px

.schemeBox
  text-align center
  flex 1
  font-size 16px

  img
    margin-bottom 20px

  p
    margin-bottom 10px

.feature
  margin 100px 0

.featureBox
  display flex
  margin-top 100px

.featureText
  position relative
  font-size 16px
  line-height 24px

.featureText:before
  width 8px
  height 8px
  content ''
  display inline-block
  position absolute
  border-radius 50%
  top 4px
  left -12px
  background #5ACFB5

.serveMode
  position relative
  height 200px
  background linear-gradient(#08b8c8, #5acfb5)

.serveModeBox
  position absolute
  display flex
  justify-content center
  width 100%
  bottom -50px

.serveBox1
  display inline-block
  width 240px
  height 100px
  padding-top 50px
  margin 10px
  text-align center
  background url('../../assets/logo/01.png')
  background-size cover
  box-shadow 0 10px 10px #ccc

.serveBox2
  display inline-block
  width 240px
  height 100px
  padding-top 50px
  margin 10px
  text-align center
  background url('../../assets/logo/02.png')
  background-size cover
  box-shadow 0 10px 10px #ccc

.serveBox3
  display inline-block
  width 240px
  height 100px
  padding-top 50px
  margin 10px
  text-align center
  background url('../../assets/logo/03.png')
  background-size cover
  box-shadow 0 10px 10px #ccc

.footer
  margin-top 60px
  text-align center
  line-height 100px
  height 100px
  width 100%

.load
  position relative

.card
  position absolute
  background #ffffff
  padding 10px
  top 60px
  left 50%
  transform translateX(-50%)
  display none

.load:hover
  .card
    display block
    z-index 100

.top
  cursor pointer
  position fixed
  bottom 60px
  right 60px
  background rgba(228, 228, 228, .7)
  width 40px
  height 40px
  border-radius 50%
  line-height 40px
  font-size 30px
  text-align center
  display none
  z-index 100

.top:hover
  box-shadow 0px 0px 3px #ccc
  background #fff
</style>