<template>
  <div>
    <div class="head-container">
      <div style="text-align:right;margin-right:10px">
        <el-input v-model="keyword" style="width:200px;" placeholder="请输入关键词"/>
        <el-button size="small" type="primary" @click="getData()">搜索</el-button>
      </div>
    </div>
    <div>
      <el-card shadow="never">
        <el-table ref="multipleTable" :data="data" tooltip-effect="dark" style="width: 100%">
          <el-table-column prop="city" label="市名称"/>
          <el-table-column prop="county" label="县名称"/>
          <el-table-column prop="ownership_name" label="权属名称"/>
          <el-table-column prop="land_name" label="地类名称"/>
          <el-table-column prop="calculate_area" label="计算面积"/>
          <el-table-column prop="adjustment_area" label="平差面积"/>
          <el-table-column prop="terrain" label="地形部位"/>
          <el-table-column prop="geology" label="质地"/>
          <el-table-column prop="ph" label="PH"/>
          <el-table-column prop="organic_matter" label="有机质"/>
          <el-table-column prop="nitrogen" label="全氮"/>
          <el-table-column prop="phosphorus" label="有效磷"/>
          <el-table-column prop="kalium" label="速效钾"/>
          <el-table-column prop="irrigate_guarantee" label="灌溉保证标"/>
          <el-table-column prop="drain_flooded_fields" label="排涝能力标"/>
          <el-table-column prop="profile_configuration" label="剖面构型"/>
          <el-table-column prop="province_soil_name" label="省土类名称"/>
          <el-table-column prop="province_subclass_name" label="省亚类名称"/>
          <el-table-column prop="province_genus_name" label="省土属名称"/>
        </el-table>
        <!--分页组件-->
        <el-pagination :total="total" :current-page="page" :page-size="pageSize" style="margin-top: 8px;" layout="total, prev, pager, next" @current-change="pageChange" />
      </el-card>
    </div>
  </div>
</template>
<script>
import { soilManureList } from '@/api/rs_facilities'

export default {
  components: {
  },
  props: {

  },
  data() {
    return {
      keyword: '',
      total: 0,
      page: 1,
      pageSize: 10,
      data: []
    }
  },
  created() {
    this.$nextTick(() => {
      this.getData()
    })
  },
  methods: {
    pageChange(val) {
      this.page = val
      this.getData()
    },
    getData() {
      soilManureList({ keyword: this.keyword, page: this.page, size: this.pageSize }).then(res => {
        if (res.code === 200) {
          this.data = res.data.content
          this.total = res.data.totalElements
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>
