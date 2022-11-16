<template>
  <div class="head-container">
    <div
      v-permission="['ADMIN','USER_ALL','USER_CREATE']"
      style="display: inline-block;float:left"
    >
      <!-- 添加 -->
      <el-button
        :disabled="sup_this.$store.state.baseinfo.cur_user_level > 3"
        class="filter-item"
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="add"
      >添加</el-button>
      <el-button
        :disabled="sup_this.$store.state.baseinfo.cur_user_level > 3"
        class="filter-item"
        size="mini"
        type="primary"
        icon="el-icon-user"
        @click="invite"
      >邀请</el-button>

      <!-- 导出 -->
      <el-button
        v-permission="['ADMIN']"
        :loading="downloadLoading"
        size="mini"
        class="filter-item"
        type="warning"
        icon="el-icon-download"
        @click="download"
      >导出</el-button>
    </div>
    <div style="text-align:right;margin-right:10px">
      <!-- 搜索 -->
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
      </el-select> 
      <el-select
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
    <eForm
      :orgid="orgid"
      :baseid="baseid"
      ref="form"
      :sup_this="sup_this"
      :dicts="dicts"
    />
    <invite
      ref="invite"
      :to_base_id="baseid"
    />
  </div>
</template>

<script>

import { parseTime } from '@/utils/index'
import eForm from './baseUserForm'
import invite from '@/views/system/user/module/invite'

// 查询条件
export default {
  components: { invite, eForm },
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
    baseid: {
      type: String,
      default: ''
    },
    orgid: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      downloadLoading: false,
      queryTypeOptions: [
        { key: 'username', display_name: '用户名' },
        { key: 'email', display_name: '邮箱' }
      ],
      enabledTypeOptions: [
        { key: 'true', display_name: '激活' },
        { key: 'false', display_name: '锁定' }
      ]
    }
  },
  methods: {
    invite () {
      this.$refs.invite.dialog = true
    },
    add () {
      this.$refs.form.form.deptCode = null
      this.$refs.form.showDialog()
    },
    // 去查询
    toQuery () {
      this.sup_this.page = 0
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
