<template>
  <div class="table">
    <div class="container">
      <div class="head-container">
        <div style="display: inline-block;float:left">
          <el-button
            v-permission="['ADMIN','FACILITIES_ALL','FACILITIES_CREATE']"
            icon="el-icon-plus"
            type="primary"
            size="mini"
            @click="handleAdd"
            v-if="checkBasePermission( $store.state.baseinfo.cur_org_id, $store.state.baseinfo.cur_base_id)"
          >添加</el-button>
          <el-button
            v-if="checkBasePermission( $store.state.baseinfo.cur_org_id, $store.state.baseinfo.cur_base_id)"
            v-permission="['ADMIN','FACILITIES_ALL','FACILITIES_EDIT']"
            icon="el-icon-add-location"
            type="primary"
            size="mini"
            @click="mapAdd"
          >添加到地图</el-button>

          <!-- 功能未实现，隐藏
          <el-button
            icon="el-icon-close"
            type="danger"
            size="mini"
            @click="delAll"
          >删除</el-button>
          -->

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
          <el-button
            :icon="!vstate?'el-icon-tickets':'el-icon-menu'"
            type="primary"
            size="mini"
            @click="changeVstate"
          />
        </div>
      </div>
      <el-card shadow="never">
        <div v-if="!vstate">
          <div class="apps">
            <el-row>
              <el-col
                v-for="(item,index) in data"
                :span="3"
                :key="index"
              >
                <div class="grid-content">
                  <img
                    v-if="item.sxt_image_path"
                    :src="item.sxt_image_path"
                    @mouseover="handleMouseOver(index,item)"
                    style="width:150px;height:100px;display: block;margin: 2px;border-radius: 8px;border: 2px solid #efecec;"
                  >
                  <img
                    v-else-if="item.image_path"
                    :src="item.image_path"
                    @mouseover="handleMouseOver(index,item)"
                    style="width:150px;height:100px;display: block;margin: 2px;border-radius: 8px;border: 2px solid #efecec;"
                  >
                  <img
                    v-else
                    :src="item.rs_facilities_type_image_path"
                    @mouseover="handleMouseOver(index,item)"
                    style="width:150px;height:100px;display: block;margin: 2px;border-radius: 8px;border: 2px solid #efecec;"
                  >
                  <p class="dk-title">{{ item.name }}</p>
                  <p class="dk-area">总面积：{{ item.acreage }}亩</p>
                  <div
                    class="dk-edit-btns"
                    v-show="isShow_DK==index"
                    @mouseleave="handleMouseLeave()"
                  >
                    <div style="padding-top:45px;padding-left: 30px;">
                      <el-button
                        type="primary"
                        @click="handleView(index,item)"
                        v-if="checkBasePermission( $store.state.baseinfo.cur_org_id, $store.state.baseinfo.cur_base_id)"
                      >查看</el-button>
                    </div>
                    <div style="position: absolute;right: 0px;top: 0px;">
                      <el-button-group>
                        <el-button
                          type="primary"
                          icon="el-icon-edit"
                          size="mini"
                          @click="handleEdit(index,item)"
                        />
                        <el-button
                          type="danger"
                          icon="el-icon-delete"
                          size="mini"
                          v-if="checkBasePermission( $store.state.baseinfo.cur_org_id, $store.state.baseinfo.cur_base_id)"
                          @click="handleDelete(index,item)"
                        />
                      </el-button-group>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="3">
                <div class="grid-content bg-purple" />
              </el-col>
            </el-row>
          </div>
        </div>
        <div v-else>
          <el-table
            ref="multipleTable"
            :data="data"
            :default-sort="{prop: 'ord'}"
            border
            class="table"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="55"
              align="center"
            />
            <el-table-column
              prop="image_path"
              label="示例图"
              width="170"
            >
              <template slot-scope="scope">
                <img
                  v-if="scope.row.sxt_image_path"
                  :src="scope.row.sxt_image_path"
                  style="width:150px;height:100px;display: block;border-radius: 4px;"
                >
                <img
                  v-else-if="scope.row.image_path"
                  :src="scope.row.image_path"
                  style="width:150px;height:100px;display: block;border-radius: 4px;"
                >
                <img
                  v-else
                  :src="scope.row.rs_facilities_type_image_path"
                  style="width:150px;height:100px;display: block;border-radius: 4px;"
                >
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="名称"
            />
            <el-table-column
              prop="acreage"
              label="面积(亩)"
              width="120"
            />
            <el-table-column
              prop="ord"
              sortable
              label="排序"
              width="150"
            />
            <el-table-column
              label="操作"
              width="280"
              align="center"
            >
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  icon="el-icon-view"
                  size="mini"
                  @click="handleView(scope.$index, scope.row)"
                >查看</el-button>
                <el-button
                  v-permission="['ADMIN','FACILITIES_ALL','FACILITIES_EDIT']"
                  type="success"
                  icon="el-icon-edit"
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                  v-if="checkBasePermission( $store.state.baseinfo.cur_org_id, $store.state.baseinfo.cur_base_id)"
                >编辑</el-button>
                <el-button
                  v-permission="['ADMIN','FACILITIES_ALL','FACILITIES_DELETE']"
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click="handleDelete(scope.$index, scope.row)"
                  v-if="checkBasePermission( $store.state.baseinfo.cur_org_id, $store.state.baseinfo.cur_base_id)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
      <div>
        <el-pagination
          background
          layout="total,prev, pager, next"
          :current-page="page + 1"
          :page-size="size"
          @current-change="change"
          :total="total"
        >
        </el-pagination>
      </div>
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
    <DkEdit ref="dkEdit" />
    <DkAdd ref="dkAdd" />
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import { loadCss, loadModules } from 'esri-loader'
import renderDK from './api/renderDK'
import DkEdit from './components/edit' // 显示地块模板
import DkAdd from './components/add'
import { getToken } from '@/utils/auth'
import initData from '@/mixins/initData'
import { deleteById, facilitiesList } from '@/api/rs_facilities'
import checkBasePermission from "@/utils/device_permission";

export default {
  name: 'Area',
  components: {
    DkEdit,
    DkAdd
  }, mixins: [initData],
  data () {
    return {
      show: { isshowDKInfo: false },
      image_path: '',
      upUrl: process.env.IMG_URL + '/rs/rs_facilities/addFacilitie',

      vstate: true,
      url: './area.json',
      tableData: [],
      cur_page: 1,
      multipleSelection: [],
      select_cate: '',
      select_word: '',
      del_list: [],
      is_search: false,
      editVisible: false,
      delVisible: false,
      isShow_DK: -1,
      form: {
        name: '',
        code: '',
        type: '',
        ord: '',
        image_path: ''
      },
      pitchRow: null,
      options: [],
      jidi_id: '',
      data: [],
      page: 0,
      size: 5,
      total: 0,
    }
  },
  computed: {
    ...mapGetters([
      'id',
      'token',
      'user'
    ])
  },
  created () {

    this.loadTableData()
  },
  activated: function () {
    this.loadTableData()
  },

  methods: {
    //翻页
    change (e) {
      this.page = e - 1;
      this.getData()
    },
    checkBasePermission,
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleChange (file, fl) {
      this.image_path = URL.createObjectURL(file.raw)
      this.fileRaw = file.raw
    },
    handleAvatarSuccess (res, file) {
      // this.image_path = URL.createObjectURL(file.raw);
      // 提示上传成功

    },
    // 获取 easy-mock 的模拟数据
    // getData () {
    //   this.$axios.get(this.url, {
    //     page: this.cur_page
    //   }).then((res) => {
    //     this.tableData = res.data.list
    //   })
    // },
    // 选择基地id之后 渲染基地内的地块显示
    loadTableData: function () {
      this.init()
    },
    init () {
      this.page = 0
      this.getData()
    },
    getData () {
      this.data = []
      facilitiesList({
        bs_base_id: this.$store.state.baseinfo.cur_base_id,
        order: 'ord_asc',
        keyword: this.select_word,
        page: this.page,
        size: this.size
      }).then(res => {
        this.total = res.data.totalElements
        res.data.content.map(e => {

          e.acreage = e.acreage || ''
          e.sxt_image_path = (e.sxt_image_path && e.sxt_image_path !== null && e.sxt_image_path !== '') ? (process.env.IMG_URL + e.sxt_image_path) : ''
          e.rs_facilities_type_image_path = (e.rs_facilities_type_image_path !== null && e.rs_facilities_type_image_path !== '') ? (process.env.IMG_URL + e.rs_facilities_type_image_path) : '/static/img/dk/dk-2.png'
          e.image_path = (e.image_path != null && e.image_path !== '') ? (process.env.IMG_URL + e.image_path) : ''
        })
        this.data = res.data.content
      })
    },
    search () {
      this.is_search = true
      this.init()
    },
    filterTag (value, row) {
      return row.tag === value
    },
    handleView (index, d) {
      this.$router.push({ path: '/dkInfo', query: { id: d.id } })
    },
    handleEdit (index, row) {
      this.$refs.dkEdit.handelWatch(row)
    },
    handleAdd () {
      this.form.geometry_json = ''
      this.form.rs_facilities_id = ''
      // this.dialogTitle = '添加'
      // this.editVisible = true
      this.$refs.dkAdd.dialogVisible = true
      this.form.image_path = ''
    },
    mapAdd () {
      this.$router.push({ path: '/mydevicedata/map', query: { status_mode: false, intro: true } })
    },
    // 删除操作
    handleDelete (index, row) {
      this.pitchRow = row
      this.delVisible = true
    },
    handleMouseOver (index, row) {
      this.isShow_DK = index
    },
    handleMouseLeave () {
      this.isShow_DK = -1
    },
    delAll () {
      const length = this.multipleSelection.length
      let str = ''
      this.del_list = this.del_list.concat(this.multipleSelection)
      for (let i = 0; i < length; i++) {
        str += this.multipleSelection[i].name + ' '
      }
      this.$message.error('删除了' + str)
      this.multipleSelection = []
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 确定删除
    deleteRow () {
      deleteById({ rs_facilities_id: this.pitchRow.id }).then(res => {
        if (res.code === 200) {
          this.$message.success('删除成功')
          this.loadTableData()
          this.pitchRow = null
        } else {
          this.$message.error(res.msg)
        }
        this.delVisible = false
      })
    },
    // 显示logo url
    getImg (logo) {
      return './img/dk/' + logo + '.png'
    },
    // select 示例图片
    changeSelection () {
      const path = this.getImg(this.$refs.select.selectedLabel)
      this.$refs.select.$el.getElementsByTagName('input')[0].setAttribute('style', 'background-image:url(' + path + ')')
    },
    changeVstate () {
      console.log('this.vstate', this.vstate)
      this.vstate = !this.vstate
      console.log('this.vstate2', this.vstate)
    },
    // 根据地块数据来显示在地图上
    showEditMapByDK: function () {
      renderDK({
        JDId: this.jidi_id,
        map: this.map,
        DK_geometry: JSON.parse(this.form.geometry_json),
        DK_id: this.form.id,
        complete: function () {

        }
      })
    }
  }
}

</script>
<style lang="stylus" scoped>
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
    position absolute
    background #00000069
    top 2px
    left 2px
    width 148px
    height 98px
    margin 2px
    border-radius 8px

  .el-button--mini
    padding 3px 6px

  &:hover
    .dk-edit-btns
      display block

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
