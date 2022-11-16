<template>
  <div>
    <eHeader :query="query" />
    <el-card shadow="never">
      <!--表格渲染-->
      <el-table
        v-loading="loading"
        :data="data"
        size="small"
        style="width: 100%;"
      >
        <el-table-column
          prop="imagePath"
          label="缩略图"
        >
          <template slot-scope="scope">
            <el-image
              v-if="scope.row.imagePath"
              style="width: 154px; height: 80px"
              :src="domainName+scope.row.imagePath"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="rqcodeImagePath"
          label="手机浏览"
        >
          <template slot-scope="scope">
            <vue-qr
              v-if="scope.row.url"
              style='width:100px;height:100px;'
              :text="scope.row.url"
            />
            <vue-qr
              v-else
              style='width:100px;height:100px;'
              :text="domainName+'/vr?panorId='+scope.row.id+'&mode=false'"
            />
          </template>
        </el-table-column>
        <!-- <el-table-column prop="id" label="id"/> -->
        <el-table-column
          prop="name"
          label="名称"
        >
          <template slot-scope="scope">
            <div>
              {{ scope.row.name}}&nbsp;&nbsp;&nbsp;&nbsp;
              <edit
                v-permission="['ADMIN','RSPANOR_ALL','RSPANOR_EDIT']"
                :data="scope.row"
                :sup_this="sup_this"
              />
            </div>
            <div v-if="scope.row.url">
              <el-tag
                size="mini"
                effect="dark"
              >第三方全景</el-tag>
            </div>
            <div v-else>
              <el-tag
                size="mini"
                type="success"
                effect="dark"
              >{{scope.row.sceneCount}}个场景</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="viewCount"
          label="浏览量"
        />
        <el-table-column
          prop="createDate"
          label="创建日期"
        >
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.createDate) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="share"
          label="是否对外共享"
          v-if="checkPermission(['ADMIN','RSPANOR_ALL','RSPANOR_EDIT'])"
        >
          <template slot-scope="scope">
            <el-switch
              v-if="!scope.row.url"
              v-model="scope.row.isShare"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="shareChange(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column
          v-if="checkPermission(['ADMIN','RSPANOR_ALL','RSPANOR_SELECT','RSPANOR_EDIT','RSPANOR_DELETE'])"
          label="操作"
          width="290px"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              v-permission="['ADMIN','RSPANOR_ALL','RSPANOR_SELECT']"
              slot="reference"
              type="primary"
              icon="el-icon-video-camera"
              size="mini"
              title='预览'
              @click='jumpVr(scope.row)'
            ></el-button>
            <!-- <el-button
              v-permission="['ADMIN','RSPANOR_ALL','RSPANOR_EDIT']"
              slot="reference"
              type="primary"
              icon="el-icon-edit"
              size="mini"
              title='导航图'
              @click='navigation(scope.row)'
            ></el-button> -->
            <el-button
              v-permission="['ADMIN','RSPANOR_ALL','RSPANOR_EDIT']"
              :disabled="!(scope.row.url === null || scope.row.url === '')"
              :test='JSON.stringify(scope.row)'
              slot="reference"
              type="primary"
              icon="el-icon-edit"
              size="mini"
              title='编辑场景'
              @click='jumpScene(scope.row)'
            ></el-button>
            <el-popover
              v-permission="['ADMIN','RSPANOR_ALL','RSPANOR_DELETE']"
              :ref="scope.row.id"
              placement="top"
              width="180"
            >
              <p>确定删除本条数据吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button
                  size="mini"
                  type="text"
                  @click="$refs[scope.row.id].doClose()"
                >取消</el-button>
                <el-button
                  :loading="delLoading"
                  type="primary"
                  size="mini"
                  @click="subDelete(scope.row.id)"
                >确定</el-button>
              </div>
              <el-button
                slot="reference"
                type="danger"
                icon="el-icon-delete"
                size="mini"
                title='删除'
              ></el-button>
            </el-popover>
            <el-dropdown
              size="mini"
              split-button
              type="primary"
              @command='dropdownCommand'
            >
              <i class='el-icon-more-outline'></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command='{ name: navigation, data: scope.row }'>导航图</el-dropdown-item>
                <!-- <el-dropdown-item @click='iconEdit'>图标管理</el-dropdown-item> -->
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <!--分页组件-->
      <el-pagination
        :current-page="page"
        :page-size="size"
        :total="total"
        style="margin-top: 8px;"
        layout="total, prev, pager, next"
        @current-change="pageChange"
      />
    </el-card>

    <!-- 编辑导视图 -->
    <navigation
      :show='showNavigation'
      :panor='editPanor'
    ></navigation>

  </div>
</template>

<script>

import checkPermission from '@/utils/permission'
import { del, edit as editPanor, get as getPanor, addPanorViewCount, sharePanor } from '@/api/rsPanor'
import { parseTime } from '@/utils/index'
import eHeader from './module/header'
import edit from './module/edit'
import navigation from './module/navigation'
import vueQr from 'vue-qr'

export default {
  components: { eHeader, edit, vueQr, navigation },
  data () {
    return {
      domainName: process.env.IMG_URL,
      imageUrl: require("@/assets/img/vr/drag.png"),
      delLoading: false,
      sup_this: this.$parent,
      page: 1,
      size: 10,
      total: 0,
      data: [],
      showNavigation: false,
      editPanor: {},
      query: {},
    }
  },
  created () {
  },
  mounted () {
    this.init()
  },
  methods: {
    parseTime,
    checkPermission,
    init () {
      let keyword = null
      if (this.query.keyword) {
        keyword = this.query.keyword
      }
      getPanor({
        keyword: keyword,
        bs_base_id: this.$store.state.baseinfo.cur_base_id,
        page: (this.page - 1),
        size: this.size
      }).then(res => {
        if (res.code === 200) {
          res.data.content.map(v => {
            if (v.share === 1) {
              v.isShare = true
            } else {
              v.isShare = false
            }
          })
          this.data = res.data.content
          this.total = res.data.totalElements
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 更多下拉选项
    dropdownCommand (object) {
      object.name(object.data)
    },
    // 图标管理
    iconEdit () {
      // 显示图标管理列表
    },
    subDelete (id) {
      this.delLoading = true
      del(id).then(res => {
        this.delLoading = false
        if (res.code === 200) {
          this.$refs[id].doClose()
          this.$message.success(res.msg)
          this.init()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    shareChange (row) {
      if (row.share === 1) {
        row.share = 0
      } else {
        row.share = 1
      }

      sharePanor({ "id": row.id, "share_sta": row.share }).then(res => {
        if (res.code === 200) {
          this.$message.success('修改成功')
        } else {
          this.$message.error(res.msg)
          row.isShare = !row.isShare
        }
      })
    },
    pageChange (val) {
      this.page = val
      this.init()
    },
    // 跳转预览
    jumpVr (item) {
      if (item.url) {
        window.open(item.url)
      } else {
        window.open(`/vr?panorId=${item.id}`)
      }
      addPanorViewCount({ id: item.id }).then(res => {
        if (res.code === 200) {
          item.viewCount = res.data
        }
      })
    },

    // 跳转查看场景
    jumpScene (item) {
      this.$router.push({ path: '/myresources/panorScene', query: { id: item.id, name: item.name } })
    },

    // 编辑导航图
    navigation (json) {
      this.editPanor = json;
      this.showNavigation = true;
    }
  }
}
</script>

<style scoped>
</style>
