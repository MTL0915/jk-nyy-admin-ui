<template>
  <div class="table">
    <div class="container">
      <div class="head-container">
        <div style="display: inline-block;float:left">
          <el-button
            icon="el-icon-plus"
            type="primary"
            size="mini"
            @click="handleAdd"
          >添加</el-button>
        </div>
        <div style="display: inline-block;float:left">
          <el-button
            icon="el-icon-plus"
            type="primary"
            size="mini"
            @click="handleAdd"
          ></el-button>
        </div>
        <div style="text-align:right;margin-right:10px">
          <el-input
            v-model="select_word"
            placeholder="筛选关键词"
            size="mini"
            class="handle-input mr10 ml10"
          />
          <el-button
            type="primary"
            icon="search"
            size="mini"
            @click="search"
          >搜索</el-button>
        </div>
      </div>
      <el-card shadow="never">
        <div class="apps">
          <el-row>
            <draggable
              class="syllable_ul"
              element="ul"
              :list="syllable"
              :options="{group:'title', animation:150}"
              :no-transition-on-drag="true"
              @change="change"
              @start="start"
              @end="end"
              :move="move"
            >
              <transition-group
                type="transition"
                :name="!drag? 'syll_li' : null"
                :css="true"
              >
                <el-col
                  v-for="(item,index) in data"
                  :span="3"
                  :key="index"
                  :ref='item.id'
                  :idx='item.id'
                >
                  <!-- v-dragging="{ item: item, list: data }" -->
                  <div class="grid-content">
                    <img
                      :src="getImagePath( item.thumbnailPath )"
                      style="width:150px;height:100px;display: block;margin: 2px;border-radius: 8px;border: 2px solid #efecec;"
                    >
                    <p class="dk-title">
                      <input
                        type='text'
                        class='inputText'
                        :value='item.name'
                        @change='updateName($event,item)'
                      />
                    </p>
                    <!-- <p class="dk-area">总面积：{{ item.acreage }}亩</p> -->
                    <div
                      v-show='item.status===0'
                      class="dk-edit-btns"
                      style="display: block;display: flex;color: #ffffff;justify-content: center;align-items: center;"
                    >生成中</div>
                    <el-button-group class="dk-edit-btns">
                      <el-button
                        v-show='item.status===1'
                        type="primary"
                        icon="el-icon-video-camera"
                        size="mini"
                        @click="handleView(index,item)"
                      >编辑</el-button>
                      <el-button
                        v-show='item.status===1'
                        type="primary"
                        icon="el-icon-edit"
                        size="mini"
                        @click="handleEdit(index,item)"
                      >替换</el-button>
                      <el-button
                        v-show='item.status===1'
                        type="danger"
                        style='position: absolute;top: 0;right: 0;'
                        icon="el-icon-delete"
                        size="mini"
                        @click="handleDelete(index,item)"
                      />
                    </el-button-group>
                  </div>
                </el-col>
              </transition-group>
            </draggable>
            <el-col :span="3">
              <div class="grid-content bg-purple" />
            </el-col>
          </el-row>
        </div>

        <div class="pagination">
          <el-pagination
            :total="5"
            background
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-card>
    </div>

    <!-- 删除提示框 -->
    <el-dialog
      :visible.sync="delVisible"
      append-to-body
      title="提示"
      width="300px"
      close="test"
      center
    >
      <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="deleteRow"
        >确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑模板 -->
    <eForm
      ref="form"
      :sup_this="this"
      :is-add="true"
    />
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
import initData from '@/mixins/initData'
import { del, get, edit, getByPanorId, changeOrd, changeImage } from '@/api/rsPanorScene'
import { parseTime } from '@/utils/index'
import * as loading from '@/utils/loading'
import eHeader from './module/header'
// import edit from './module/edit'
import eForm from './module/form'
import draggable from "vuedraggable"
export default {
  components: { eHeader, eForm, draggable },
  mixins: [initData],
  data () {
    return {
      delLoading: false, sup_this: this,
      panor_id: "",
      delVisible: false,
      data: [],
      select_word: "",
    }
  },
  created () {

  },

  // beforeRouteLeave (to, form, next){
  // this.setTime && clearTimeout(this.setTime);
  // this.setTime = null;
  // next();
  // },

  // beforeRouteEnter (to, form, next){
  // next();
  // this.init();
  // },

  destroyed () {
    // this.dragend
    this.setTime && clearTimeout(this.setTime);
    this.setTime = null;
  },
  mounted () {
    // 传过来的全景id
    this.panor_id = this.$router.history.current.query.id;
    this.panor_name = this.$router.history.current.query.name;
    this.init();
  },
  methods: {
    getImagePath (path) {
      return path ? process.env.VR_IMGPATH + path : '/static/img/dk/dk-2.png';
    },

    search () {

    },
    init () {
      this.getList()
    },

    clearTimer () {
      // 关闭计时器  
      this.setTime && clearTimeout(this.setTime)
      // 置空对象
      this.setTime = null;
    },
    getList () {
      getByPanorId(this.panor_id).then((e) => {
        // 判断是否存在为切片完成的
        var bool = !!e.content.find((e) => { return !e.thumbnailPath })
        this.data = e.content;

        // 如果已经不存在未切片的时候 关闭请求
        if (!bool) {
          this.clearTimer();
          return;
        }

        // 判断是否存在计时器 如果已经存在了则不再创建
        // 定时刷新
        !this.setTime && (this.setTime = setTimeout(() => {
          this.getList()
          this.setTime = null;
        }, 10000))

      })
    },
    parseTime,
    checkPermission,
    beforeInit () {
      this.url = 'api/rsPanorScene'
      const sort = 'id,desc'
      this.params = { page: this.page, size: this.size, sort: sort }
      return true
    },
    subDelete (id) {
      this.delLoading = true
      del(id).then(res => {
        this.delLoading = false
        this.data.splice(this.data.findIndex((e) => { return e.id == id; }), 1)
        this.$notify({
          title: '删除成功',
          type: 'success',
          duration: 2500
        })
      }).catch(err => {
        this.delLoading = false
        // this.$refs[id].doClose()
        // console.log(err.response.data.message)
      })
    },
    deleteRow () {

    },

    handleCurrentChange () {

    },

    // 显示编辑模板
    handleAdd () {
      this.$refs.form.show({}, true);
    },

    // 预览场景
    handleView (index, itme) {
      window.open(`/vr_edit?panorId=${this.panor_id}&sceneId=${itme.id}`)
      // this.$router.push({ path: '/vr_edit', query: { panorId: this.panor_id, sceneId: itme.id } });
    },

    // 编辑
    handleEdit (index, itme) {
      var _self = this;
      // this.$refs.form.show(itme,false);
      var file = document.createElement("input");
      file.type = 'file';
      file.onchange = function (e) {
        loading.show();
        file.onchange = null;
        changeImage({
          id: itme.id,
          image: this.files[0]
        }).then((e) => {
          loading.hide();
          if (e.code === 200) {
            itme.thumbnailPath = e.data.thumbnailPath;
          } else {
            _self.$message.error(e.msg);
          }
        })
      }
      file.click();
    },

    // 替换全景图
    replacePic () {

    },

    // 删除
    handleDelete (index, itme) {
      this.delVisible = true;
      this.deleteRowScene = itme;
    },

    deleteRow () {
      this.delVisible = false;
      this.subDelete(this.deleteRowScene.id);
    },

    // 修改名字
    updateName (event, itme) {
      edit({
        id: itme.id,
        name: event.target.value
      }).then((e) => {

      })
    },

    change (evt) {
      console.log(evt, 'change...')
    },
    //start ,end ,add,update, sort, remove 得到的都差不多
    start (evt) {
      this.drag = true
      console.log(evt, 'start...')
    },
    end (evt) {
      console.log(evt, 'end....')
      this.drag = true
      // evt.item //可以知道拖动的本身
      // evt.to    // 可以知道拖动的目标列表
      // evt.from  // 可以知道之前的列表
      // var oldIndex = evt.oldIndex  // 可以知道拖动前的位置
      // var newIndex = evt.newIndex  // 可以知道拖动后的位置
      var rsPanorSceneId = evt.from.children[evt.oldIndex].getAttribute("idx");
      var toRsPanorSceneId = evt.from.children[evt.newIndex].getAttribute("idx");
      changeOrd({
        rsPanorSceneId,
        toRsPanorSceneId,
      }).then(() => {

      })
    },
    move (evt, originalEvent) {
      console.log(evt, 'move')
      console.log(originalEvent) //鼠标位置
    }

  }
}
</script>
<style lang="stylus" scoped>
.inputText
  border none

.inputText:focus
  border solid 1px #46a6ff

.handle-box
  margin-bottom 20px

.handle-select
  width 120px

.handle-input
  width 300px
  display inline-block

.del-dialog-cnt
  font-size 16px
  text-align center

.table
  width 100%
  font-size 14px

.red
  color #ff0000

.mr10
  margin-right 10px

.ml10
  margin-left 10px

.srt-pic >>> .el-input__inner
  width 90px
  height 42px
  color transparent
  background-size contain
  background-repeat no-repeat

.vstate
  font-size 36px
  color #409EFF
  float right
  margin-right 1rem
  cursor pointer

.el-row
  margin-bottom 20px

  &:last-child
    margin-bottom 0

.el-col
  border-radius 4px
  margin-bottom 20px

  .dk-title
    font-weight bold

  .dk-area
    color #aaaaaa

  .dk-edit-btns
    display none
    position absolute
    top 0px
    left 0px
    width 150px
    height 100px
    background #00000088
    justify-content space-between
    align-items center

  .el-button--mini
    padding 3px 6px

  &:hover
    .dk-edit-btns
      display flex

.grid-content
  border-radius 4px
  min-height 140px
  position relative

/* 图片上传 */
.avatar-uploader >>> .el-upload
  border 1px dashed #d9d9d9
  border-radius 6px
  cursor pointer
  position relative
  verflow hidden

  &:hover
    border-color #409eff

.avatar-uploader-icon
  font-size 28px
  color #8c939d
  width 178px
  height 178px
  line-height 178px
  text-align center

.avatar
  width 178px
  height 178px
  display block

.dk-map
  float left
  width 800px
  height 582px

.dk-div
  margin-left 0px
  height 620px
  overflow hidden
  padding 15px
</style>

