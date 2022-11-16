<template>
  <div class="pestBox">
    <div style="position: absolute;top: 34px;right: 33px;"><a
        style="color:#5b5bca"
        href="javascript:window.history.back()"
        v-show="!pestId"
      >返回</a></div>

    <div class="pestTitle">
      <span style="overflow:hidden">病虫害信息</span>
    </div>
    <div class="pestInfo">
      <table
        class="disease-table"
        width="100%"
        cellpadding="0"
        cellspacing="0"
      >
        <tbody>
          <tr>
            <td
              class="td-txt1"
              width="12%"
              height="36"
            >名称</td>
            <td
              class="td-txt2"
              width="30%"
            >{{ data.name }}{{ data.ename && ('(' + data.ename + ')') }}</td>
            <td
              class="td-txt1"
              width="12%"
            >别名</td>
            <td
              class="td-txt2 bor-rt"
              width="30%"
            >{{ data.sname }}</td>
            <td
              rowspan="4"
              width="320"
            >
              <div
                class="crop-exhibit"
                style="max-height: 600px;overflow-y: scroll;"
              >
                <strong class="crop-hd">图片</strong>
                <div class="crop-bd">
                  <img
                    :src="getPestImage(src)"
                    v-for="(src, index) in data.image_path_h90s"
                    :key="index"
                    style="width:100%"
                  >
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td
              class="td-txt1"
              height="36"
            >简介</td>
            <td class="td-txt2">{{ data.summary }}</td>
            <td class="td-txt1">危害症状</td>
            <td class="td-txt2 bor-rt">{{ data.damage }}</td>
          </tr>
          <tr>
            <td
              class="td-txt1"
              height="36"
            >侵染循环</td>
            <td class="td-txt2">{{ data.cycle }}</td>
            <td class="td-txt1">习性</td>
            <td class="td-txt2 bor-rt">{{ data.habits }}</td>
          </tr>
          <tr>
            <td class="td-txt1">形态特征</td>
            <td class="td-txt2">{{ data.morphology }}</td>
            <td class="td-txt1">症状</td>
            <td class="td-txt2 bor-rt">{{ data.symptom }}</td>
          </tr>
          <tr>
            <td class="td-txt1">病原体</td>
            <td class="td-txt2">{{ data.pathogen }}</td>
            <td class="td-txt1">发生因素</td>
            <td
              class="td-txt2"
              colspan="2"
            >{{ data.causes }}</td>
          </tr>
          <tr>
            <td
              class="td-txt1"
              height="36"
            >防治方法</td>
            <td
              class="td-txt2"
              colspan='4'
            >{{ data.method }}</td>
            <!-- <td class="td-txt1"></td>
              <td class="td-txt2" colspan="2"></td> -->
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { get } from '@/api/bs_pest'
import { getPestImage } from '@/utils/image_util'

export default {
  mounted () {
    var id = this.$route.query.id;
    this.id = id;
  },
  props: {
    pestId: {
      type: String,
      default: null
    }
  },
  created () {
    this.$nextTick(() => {
      this.refresh(this.id || this.pestId)
    })
  },
  data () {
    return {
      id: "",
      data: {
        image_path_h90s: [],
        name: "",
        sname: "",
        ename: "",
        summary: "",
        damage: "",
        cycle: "",
        habits: "",
        morphology: "",
        symptom: "",
        pathogen: "",
        causes: "",
        method: ""
      }
    }
  },
  methods: {
    getPestImage: getPestImage,
    refresh (id) {
      get(id).then(res => {
        if (res.code == 200) {
          this.data = res.data;
        }
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.pestBox
  height 100%
  width 100%
  padding 10px
  background #fff

.pestTitle
  font-size 14px
  font-weight 700
  height 30px
  line-height 30px
  position relative

.pestTitle:before
  content ''
  display inline-block
  height 1px
  width 10px
  height 10px
  border-radius 50%
  position absolute
  background #ccc
  top 10px
  left 75px

.pestTitle:after
  content ''
  display inline-block
  height 1px
  width calc(100% - 80px)
  margin-left 10px
  position absolute
  background #ccc
  top 15px

.disease-table
  border 1px solid #e2e2e2
  font-size 12px

.td-txt1
  line-height 22px
  padding 7px 10px
  box-sizing border-box
  background #f0f5fb
  font-weight bold
  text-align right
  color #323232

.td-txt2
  line-height 22px
  padding 7px 10px
  box-sizing border-box
  text-align left
  color #646464

td
  border-bottom 1px solid #e2e2e2
  vertical-align top

.crop-hd
  display block
  height 36px
  line-height 22px
  padding 7px 10px
  box-sizing border-box
  background #f0f5fb
  font-size 12px
  text-align center
  color #323232
  overflow hidden

.bor-rt
  border-right 1px solid #e2e2e2
</style>