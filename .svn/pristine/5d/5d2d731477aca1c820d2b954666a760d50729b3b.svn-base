<template>
  <div class="head-container">
    <!-- <div style="display: inline-block;float:left">
      <el-button
        v-show="!sup_this.exportData"
        v-permission="['ADMIN','DEVICE_ALL','DEVICE_CREATE']"
        icon="el-icon-plus"
        type="primary"
        size="mini"
        @click="add"
      >添加</el-button>
      <el-button
        v-permission="['ADMIN','DEVICE_ALL','DEVICE_DELETE']"
        icon="el-icon-close"
        type="danger"
        size="mini"
      >删除</el-button>
      <el-button
        v-permission="['ADMIN','DEVICE_ALL','DEVICE_SELECT']"
        icon="el-icon-download"
        type="warning"
        size="mini"
        @click="exportData()"
      >导出</el-button>
    </div> -->
    <!-- 添加 -->
    <div style="text-align:right;margin-right:10px">
      <el-select
        v-model="query.sta"
        size="mini"
        clearable
        placeholder="请选择状态"
        style="width:150px"
        @change="toQuery()"
      >
        <el-option
          v-for="item in staList"
          :key="item.value"
          :label="item.name"
          :value="item.value"
        />
      </el-select>
      <el-select
        v-model="query.rs_facilities_id"
        size="mini"
        clearable
        placeholder="请选择地块"
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
          <span style="float: right; color: green;margin-left: 10px; font-size: 12px">{{ item.dcount }}</span>
        </el-option>
      </el-select>
      <el-select
        v-model="condition"
        size="mini"
        placeholder="查询条件"
        style="width:150px"
        value-key="value"
      >
        <el-option
          v-for="item in conditionOptions"
          :key="item.value"
          :label="item.name"
          :value="item"
        >
        </el-option>
      </el-select>

      <el-input
        v-model="query.conditionValue"
        clearable
        :placeholder="condition.info"
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
      <el-button
        v-show="!sup_this.exportData"
        class="filter-item"
        size="mini"
        type="primary"
        icon="el-icon-refresh-right"
        @click="$parent.init()"
      >刷新</el-button>
      <el-button
        v-if="checkUserPermission( ['ADMIN','DEVICE_ALL','DEVICE_CREATE'])"
        v-show="!sup_this.exportData"
        icon="el-icon-plus"
        type="primary"
        size="mini"
        @click="add"
      >添加</el-button>
      <el-button
        v-permission="['ADMIN','DEVICE_ALL','DEVICE_SELECT']"
        icon="el-icon-download"
        type="warning"
        size="mini"
        @click="exportData()"
      >导出</el-button>
    </div>
    <equip-add
      ref="equipAdd"
      @refreshList="refreshList"
    />
    <exportDeviceSensor ref="exportDeviceSensor" />
  </div>
</template>

<script>
import { getGroupFacilities } from '@/api/rs_facilities'
import EquipAdd from './EquipAdd'
import exportDeviceSensor from './exportDeviceSensor'
import checkUserPermission from '@/utils/user_permission'

// 查询条件
export default {
  components: {
    EquipAdd,
    exportDeviceSensor
  },
  props: {
    query: {
      type: Object,
      required: true
    },
    sup_this: {
      type: Object,
      required: true
    },
  },
  data () {
    return {
      facilitieList: [],
      staList: [
        {
          name: '正常',
          value: 1
        },
        {
          name: '离线',
          value: 2
        },
        {
          name: '绑定',
          value: 3
        },
        {
          name: '未绑定',
          value: 4
        }
      ],
      condition: { name: '关键词', value: 'keyword', info: '关键词搜索' },
      conditionOptions: [
        { name: '关键词', value: 'keyword', info: '关键词搜索' },
        { name: '标签', value: 'label', info: '标签搜索' },
        { name: '备注', value: 'remark', info: '备注搜索' },
      ],
    }
  },
  created () {

    getGroupFacilities({
      'bs_base_id': this.$store.state.baseinfo.cur_base_id
    }).then(res => {
      if (res.data) {
        this.facilitieList = res.data
      }
    })
  },
  methods: {
    checkUserPermission,
    exportData () {
      if (this.$parent.multipleSelection && this.$parent.multipleSelection.length !== 0) {
        this.$refs.exportDeviceSensor.showDialog()
      } else {
        this.$message.warning('请选择设备')
      }
    },
    refreshList () {
      this.$emit('refreshList')
    },
    add () {
      this.$refs.equipAdd.handelAdd(this.$store.state.baseinfo.cur_base_id, this.query.rs_facilities_id ? this.query.rs_facilities_id : '')
    },
    toQuery () {
      this.$parent.page = 0
      this.$parent.init()
    }
  }
}
</script>
