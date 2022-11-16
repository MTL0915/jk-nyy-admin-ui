<template>
  <div>
    <div class="head-container">
      <div style="display: inline-block;float:left">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="add">添加</el-button>
        <el-button icon="el-icon-close" type="danger" size="mini">删除</el-button>
      </div>
      <!-- 添加 -->
      <div style="text-align:right;margin-right:10px">
        <el-select v-model="queryCondition.rs_facilities_id" size="mini" placeholder="请选择地块" style="width:150px" clearable @change="toQuery()">
          <el-option v-for="item in facilitieList" :key="item.id" :label="item.name" :value="item.id">
            <span style="float: left">{{ item.name }}</span>
          </el-option>
        </el-select>
        <el-input v-model="queryCondition.keyword" clearable placeholder="请输入关键字" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery" />
        <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="toQuery">搜索</el-button>
      </div>
    </div>

  </div>
</template>
<script>
import { findByBs_base_id } from '@/api/rs_facilities'
export default {
  components: {
  },
  props: {
    queryCondition: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      facilitieList: []

    }
  },

  created() {
    findByBs_base_id({
      'bs_base_id': this.$store.state.baseinfo.cur_base_id
    }).then(res => {
      this.facilitieList = res.data
      if (this.facilitieList.length > 0) {
        // this.queryCondition.rs_facilities_id = this.facilitieList[0].id
        this.toQuery()
      }
    })
  },
  methods: {
    toQuery() {
      this.$emit('query')
    },
    add() {
      this.$emit('add')
    }
  }
}
</script>
