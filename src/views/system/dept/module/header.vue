<template>
  <div class="head-container">
    <div style="display: inline-block;float:left">
      <!-- 添加 -->
      <div style="display: inline-block;margin: 0px 2px;">
        <el-button
          v-if="sup_this.userLevel && sup_this.userLevel <=  2"
          class="filter-item"
          size="mini"
          type="primary"
          icon="el-icon-plus"
          @click="add"
        >添加</el-button>

        <eForm
          ref="form"
          :is-add="true"
          :dicts="dicts"
          :sup_this="sup_this"
        />

      </div>
    </div>
    <div style="text-align:right;margin-right:10px">
      <el-select
        v-model="query.type"
        clearable
        placeholder="是否开通"
        class="filter-item"
        style="width: 120px"
        @change="toQuery"
      >
        <el-option
          v-for="item in typeOptions"
          :key="item.type"
          :label="item.name"
          :value="item.type"
        >
          <span style="float: left">{{ item.name }}</span>
          <span style="float: right; color: green;margin-left: 10px; font-size: 12px">{{ item.count }}</span>
        </el-option>
      </el-select>
      <!-- 搜索 -->
      <el-input
        v-model="query.value"
        clearable
        placeholder="输入组织名称搜索"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="toQuery"
      />

      <el-button
        class="filter-item"
        size="mini"
        type="success"
        icon="el-icon-search"
        @click="toQuery"
      >搜索</el-button>
    </div>

    <!--<div style="display: inline-block;">
      <el-button
        class="filter-item"
        size="mini"
        type="warning"
        icon="el-icon-more"
        @click="expand">{{ $parent.expand ? '折叠' : '展开' }}</el-button>
      <eForm ref="form" :is-add="true" :dicts="dicts"/>
    </div>-->
  </div>
</template>

<script>
import eForm from './form'
import { getDeptCountGroupType } from '@/api/dept'

export default {
  components: { eForm },
  props: {
    sup_this: {
      type: Object,
      required: true
    },
    query: {
      type: Object,
      required: true
    },
    dicts: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      enabledTypeOptions: [
        { key: 'true', display_name: '正常' },
        { key: 'false', display_name: '禁用' }
      ],
      typeOptions: []
    }
  },
  created () {
    this.getDeptCountGroupType()
  },
  methods: {
    getDeptCountGroupType () {
      getDeptCountGroupType().then(res => {
        if (res.code === 200) {
          res.data.map((v, i) => {
            if (v.type) {
              v.name = '已开通'
            } else {
              v.name = '未开通'
            }
          })
          this.typeOptions = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    toQuery () {
      this.$parent.page = 0
      this.$parent.init()
    },
    add () {
      this.$refs.form.getDepts()
      this.$refs.form.form.pid = this.sup_this.user.orgId
      this.$refs.form.deptChange()
      this.$refs.form.dialog = true
      this.$refs.form.sup_this = this.sup_this
    },
    expand () {
      this.$parent.init()
      this.$parent.expand = !this.$parent.expand
    }
  }
}
</script>
