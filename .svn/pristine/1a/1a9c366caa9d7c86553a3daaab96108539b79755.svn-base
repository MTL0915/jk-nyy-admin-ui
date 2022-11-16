<template>
  <div class="head-container">
    <div style="text-align:right;margin-right:10px">
      <el-select
        v-show="!sup_this.vstate"
        v-model="query.hd_device_type_id"
        size="mini"
        clearable
        placeholder="设备类型"
        style="width:150px"
        @change="toQuery()"
      >
        <el-option
          v-for="item in deviceTypeList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
          <span style="float: left">{{ item.name }}</span>
          <span style="float: right; color: green;margin-left: 10px; font-size: 12px">{{ item.count }}</span>
        </el-option>
      </el-select>
      <el-select
        v-show="!sup_this.vstate"
        v-model="query.hd_sensor_type_id"
        size="mini"
        clearable
        placeholder="传感器类型"
        style="width:150px"
        @change="toQuery()"
      >
        <el-option
          v-for="item in sensorTypeList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
          <span style="float: left">{{ item.name }}</span>
          <span style="float: right; color: green;margin-left: 10px; font-size: 12px">{{ item.count }}</span>
        </el-option>
      </el-select>
      <el-select
        v-model="query.rs_facilities_id"
        size="mini"
        clearable
        placeholder="所属地块"
        style="width:150px"
        @change="toQuery()"
      >
        <el-option
          v-for="item in facilitieList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
          <span style="float: left">{{ item.name }}</span>
          <span style="float: right; color: green;margin-left: 10px; font-size: 12px">{{ item.count }}</span>
        </el-option>
      </el-select>
      <el-input
        v-show="!sup_this.vstate"
        v-model="query.keyword"
        clearable
        placeholder="请输入关键字"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="toQuery"
      />
      <el-button
        v-show="!sup_this.vstate"
        class="filter-item"
        size="mini"
        type="success"
        icon="el-icon-search"
        @click="toQuery"
      >搜索</el-button>
      <el-button
        :icon="sup_this.vstate?'el-icon-tickets':'el-icon-menu'"
        type="primary"
        size="mini"
        @click="changeVstate"
      />
    </div>
    <!-- <equip-add ref="equipAdd" @refreshList="refreshList" /> -->
  </div>
</template>

<script>
// import { getFacilitiesByBase } from '@/api/rs_facilities'
// import { getDeviceTypeByBase } from '@/api/device'
// import { getSensorTypeByBase } from '@/api/hd_sensor_type'
import { getSensorCount } from '@/api/hd_device_sensor'

// 查询条件
export default {
  components: {
  },
  props: {
    query: {
      type: Object,
      required: true
    },
    sup_this: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      facilitieList: [],
      deviceTypeList: [],
      sensorTypeList: []
    }
  },
  created () {
    getSensorCount({ 'bs_base_id': this.$store.state.baseinfo.cur_base_id, 'type': 'sensorFacilities' }).then(res => {
      this.facilitieList = res.data
    })
    getSensorCount({ 'bs_base_id': this.$store.state.baseinfo.cur_base_id, 'type': 'deviceType' }).then(res => {
      this.deviceTypeList = res.data
    })
    getSensorCount({ 'bs_base_id': this.$store.state.baseinfo.cur_base_id, 'type': 'sensorType' }).then(res => {
      this.sensorTypeList = res.data
    })
  },
  methods: {
    changeVstate () {
      this.$router.push({path:'/dkInfo'})
    },
    refreshList () {
      this.$emit('refreshList')
    },
    toQuery () {
      this.$parent.page = 0

      if (this.sup_this.vstate) {
        if (this.query.rs_facilities_id) {
          this.sup_this.$refs.facilitiesContent.getList(this.query.rs_facilities_id)
        }
      } else {
        this.$parent.init().then((data) => {
          this.$parent.showSensorList(data.data.content)
        })
      }
    }
  }
}
</script>
