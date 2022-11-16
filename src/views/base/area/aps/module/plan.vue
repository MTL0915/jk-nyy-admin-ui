<template>
  <div>
    <!-- <table border="1" style="width:100%">
      <tr>
        <th/>
        <th colspan="6">2019年</th>
        <th colspan="6">2020年</th>
      </tr>
      <tr>
        <th>所属地块</th>
        <th >7月</th>
        <th >8月</th>
        <th >9月</th>
        <th >10月</th>
        <th >11月</th>
        <th >12月</th>
        <th >1月</th>
        <th >2月</th>
        <th >3月</th>
        <th >4月</th>
        <th >5月</th>
        <th >6月</th>
      </tr>
      <tr>
        <th>A地块</th>
        <th ><div style="width:60%;background:#ffff00;"/><div style="width:40%;background:#00ffff;"/></th>
        <th ><div style="background:#ffff00;"/></th>
        <th ><div/></th>
        <th ><div/></th>
        <th ><div/></th>
        <th ><div/></th>
        <th ><div/></th>
        <th ><div/></th>
        <th ><div/></th>
        <th ><div/></th>
        <th ><div/></th>
        <th ><div/></th>
      </tr>
    </table> -->
    <div style="width:100%">
      <!-- 年份 -->
      <div/>
      <!-- 月份 -->
      <div/>
      <!-- 生产记录 -->
      <div/>
    </div>
  </div>
</template>
<script>

import { apsList } from '@/api/rs_facilities'

export default {
  components: {
  },
  props: {

  },
  data() {
    return {
      page: 1,
      total: 0,
      pageSize: 20,
      rs_facilities_ids: '',
      crop_name: '',
      plant_time_quantum: null,
      plant_start_time: null,
      plant_end_time: null,
      data: [],
      year: [],
      month: []
    }
  },
  created() {

  },
  methods: {
    getData() {
      apsList({
        bs_base_id: this.$store.state.baseinfo.cur_base_id,
        rs_facilities_ids: this.rs_facilities_ids,
        crop_name: this.crop_name,
        plant_time_quantum: this.plant_time_quantum,
        plant_start_time: this.plant_start_time,
        plant_end_time: this.plant_end_time,
        page: this.page,
        size: this.pageSize
      }).then(res => {
        if (res.code === 200) {
          this.total = res.data.totalElements
          res.data.content.forEach(asp => {

          })
          this.data = res.data.content
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>
