<template>
  <div class="head-container">
    <div
      v-permission="['ADMIN','USER_ALL','USER_CREATE']"
      style="display: inline-block;float:left"
    >
      <!-- 添加 -->
      <el-button
        class="filter-item"
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="add"
      >添加</el-button>
      <eForm
        ref="form"
        :sup_this="sup_this"
        :is-add="true"
        :dicts="dicts"
      />
      <!-- 导出 -->
      <el-button
        v-permission="['ADMIN']"
        :loading="downloadLoading"
        size="mini"
        class="filter-item"
        type="warning"
        icon="el-icon-download"
        @click="download"
        v-show="false"
      >导出</el-button>
    </div>
    <div style="text-align:right;margin-right:10px">
      <!-- 搜索 -->
      <el-select
        v-if="selectType && orgid===null"
        v-model="query.bs_org_id"
        size="mini"
        clearable
        filterable
        placeholder="请选择组织"
        style="width:150px"
        @change="selectOrg()"
        @clear="selectOrg()"
      >
        <el-option
          v-for="item in orgList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
          <span style="float: left">{{ item.name }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px;margin-left:5px;">{{ item.code }}</span>
        </el-option>
      </el-select>
      <el-select
        v-else-if="!selectType && orgid===null"
        v-model="query.bs_org_id"
        size="mini"
        clearable
        filterable
        placeholder="请选择组织"
        style="width:150px"
        @change="selectOrg()"
        @clear="selectOrg()"
      >
        <el-option-group
          v-for="type in orgList"
          :key="type.label"
          :label="type.label"
        >
          <el-option
            v-for="item in type.options"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
            <span style="float: left">{{ item.name }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px;margin-left:5px;">{{ item.code }}</span>
          </el-option>
        </el-option-group>
      </el-select>

      <el-input
        v-model="query.value"
        clearable
        placeholder="输入关键字搜索"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="toQuery"
      />
      <!-- <el-select
        v-model="query.type"
        clearable
        placeholder="类型"
        class="filter-item"
        style="width: 130px"
      >
        <el-option
          v-for="item in queryTypeOptions"
          :key="item.key"
          :label="item.display_name"
          :value="item.key"
        />
      </el-select> -->
      <!-- <el-select
        v-model="query.enabled"
        clearable
        placeholder="状态"
        class="filter-item"
        style="width: 90px"
        @change="toQuery"
      >
        <el-option
          v-for="item in enabledTypeOptions"
          :key="item.key"
          :label="item.display_name"
          :value="item.key"
        />
      </el-select> -->
      <el-button
        class="filter-item"
        size="mini"
        type="success"
        icon="el-icon-search"
        @click="toQuery"
      >搜索</el-button>
    </div>
  </div>
</template>

<script>
import { getDepts } from '@/api/dept'
import { parseTime } from '@/utils/index'
import eForm from './form'
import { mapGetters } from 'vuex'
// 查询条件
export default {
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  components: { eForm },
  props: {
    query: {
      type: Object,
      required: true
    },
    sup_this: {
      type: Object,
      required: true
    },
    dicts: {
      type: Array,
      required: true
    },
    orgid: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      orgList: [],
      downloadLoading: false,
      queryTypeOptions: [
        { key: 'username', display_name: '账号' },
        { key: 'name', display_name: '姓名' },
        { key: 'email', display_name: '邮箱' }
      ],
      enabledTypeOptions: [
        { key: 'true', display_name: '激活' },
        { key: 'false', display_name: '锁定' }
      ],
      selectType: true
    }
  },
  created () {
    getDepts({ getTree: false }).then(res => {
      if (res.code === 200) {
        let list = res.data
        let ssOption = []
        let fssOption = []
        for (let i = 0; i < list.length; i++) {
          let org = list[i]
          if (org.code === 'jk-000') {
            ssOption.push(list[i])
          } else {
            fssOption.push(list[i])
          }
        }
        if (ssOption.length !== 0) {
          this.selectType = false
          this.orgList.push({ label: '实施人员', options: ssOption })
          this.orgList.push({ label: '非实施人员', options: fssOption })
        } else {
          this.selectType = true
          this.orgList = list
        }

        // if (this.orgList.length === 1) {
        //   this.$set(this.query, 'bs_org_id', this.orgList[0].id)
        //   this.toQuery()
        // }
      }
    })
  },
  methods: {
    add () {

      const _this = this.$refs.form
      _this.form.dept = this.query.bs_org_id
      _this.getBaseRole(this.query.bs_org_id)
      /* this.$refs.form.getDepts()
      this.$refs.form.dept = this.sup_this.deptId
      this.$refs.form.getBaseRole(this.sup_this.deptId)*/
      this.$refs.form.dialog = true
    },
    selectOrg () {
      this.orgbase = null
      this.$set(this.query, 'bs_base_id', '')
      if (this.query.bs_org_id !== 0) {
        this.$parent.deptId = this.query.bs_org_id
      } else {
        this.$parent.deptId = null
      }
      this.toQuery()
    },
    // 去查询
    toQuery () {
      this.sup_this.cur_page = 1
      this.sup_this.init()
    },
    // 导出
    download () {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['ID', '用户名', '邮箱', '头像地址', '状态', '注册日期', '最后修改密码日期']
        const filterVal = ['id', 'username', 'email', 'avatar', 'enabled', 'createTime', 'lastPasswordResetTime']
        const data = this.formatJson(filterVal, this.sup_this.data)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    // 数据转换
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'createTime' || j === 'lastPasswordResetTime') {
          return parseTime(v[j])
        } else if (j === 'enabled') {
          return parseTime(v[j]) ? '启用' : '禁用'
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
