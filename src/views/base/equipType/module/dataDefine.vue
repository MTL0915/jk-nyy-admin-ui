<template>
  <div>
    <el-dialog
      :append-to-body="true"
      :visible.sync="dialogVisible"
      :title="hd_device_type_name+' - 数据描述'"
      width="1000px"
    >
      <div style="margin-left:10px">
        硬件版本号：
        <el-select v-model="hd_hardware_version_id" placeholder="请选择" size="small" style="width:120px;margin-right:50px;">
          <el-option
            v-for="item in hardwareVersions"
            :key="item.id"
            :label="item.hardware_version"
            :value="item.id"/>
        </el-select>
        <el-button size="small" type="primary" @click="addOne()">增加</el-button>
      </div>
      <el-table :data="propertyList" style="width: 100%">

        <el-table-column label="协议属性">
          <template slot-scope="scope">
            <el-input v-model="scope.row.property" size="small"/>
          </template>
        </el-table-column>
        <el-table-column label="转换属性">
          <template slot-scope="scope">
            <el-input v-model="scope.row.name" size="small"/>
          </template>
        </el-table-column>

        <el-table-column label="中文描述">
          <template slot-scope="scope">
            <el-input v-model="scope.row.chinesename" size="small" />
          </template>
        </el-table-column>

        <el-table-column label="单位符号" width="80">
          <template slot-scope="scope">
            <el-input v-model="scope.row.unit" size="small" />
          </template>
        </el-table-column>

        <el-table-column label="保留小数位" width="90" >
          <template slot-scope="scope">
            <el-input v-model="scope.row.small_num" size="small" />
          </template>
        </el-table-column>

        <el-table-column label="用户显示" width="80">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.show_status" :active-value="1" :inactive-value="0" size="small"/>
          </template>
        </el-table-column>
        <el-table-column label="系统显示" width="80">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.system_show_status" :active-value="1" :inactive-value="0" size="small"/>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="mini" @click="saveOrUpdate(scope.$index, scope.row)">保存</el-button>
            <el-button size="mini" type="danger" @click="removeOne(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

    </el-dialog>
  </div>
</template>
<script>
import { find as findHardwareVersion } from '@/api/hd_hardware_version'
import { find, update, del, add } from '@/api/hd_device_property'
export default {
  data() {
    return {
      hd_device_type_id: '',
      hd_device_type_name: '',

      dialogVisible: false,

      hardwareVersions: [], // 当前设备类型硬件版本列表
      hd_hardware_version_id: '', // 选中的硬件版本号

      propertyList: []
    }
  },
  computed: {},
  watch: {
    // 更换硬件版本号时触发
    hd_hardware_version_id: function() {
      this.getPropertyList()
    }
  },
  methods: {
    showDialog(hd_device_type_id, hd_device_type_name) {
      this.hd_device_type_id = hd_device_type_id
      this.hd_device_type_name = hd_device_type_name
      this.dialogVisible = true

      findHardwareVersion({ 'hd_device_type_id': hd_device_type_id }).then(res => {
        this.hardwareVersions = res.data.content
        if (this.hardwareVersions && this.hardwareVersions.length > 0) {
          this.hd_hardware_version_id = this.hardwareVersions[0].id
        }
      })
    },
    getPropertyList() {
      find({ 'hd_hardware_version_id': this.hd_hardware_version_id }).then(res => {
        this.propertyList = res.data.content
        if (this.propertyList.length === 0) {
          this.addOne()
        }
      })
    },
    removeOne(idx, item) {
      if (item.id) {
        del(item.id).then(res => {
          if (res.code === 200) {
            this.propertyList.splice(idx, 1)
            this.$message({ message: '删除成功!', type: 'success' })
          } else {
            this.$message.error(res.msg)
          }
        })
      } else {
        this.propertyList.splice(idx, 1)
      }
    },
    saveOrUpdate(idx, item) {
      item.hd_hardware_version_id = this.hd_hardware_version_id

      if (item.id) {
        update(item).then(res => {
          if (res.code === 200) {
            this.$message({ message: '保存成功!', type: 'success' })
          } else {
            this.$message.error(res.msg)
          }
        })
      } else {
        add(item).then(res => {
          if (res.code === 200) {
            this.$message({ message: '添加成功!', type: 'success' })
            item.id = res.data
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    addOne() {
      this.propertyList.push({
        'hd_hardware_version_id': this.hd_hardware_version_id,
        'property': '',
        'name': '',
        'chinesename': '',
        'unit': '',
        'small_num': '',
        'show_status': 0,
        'system_show_status': 1
      }
      )
    }
  }
}
</script>

<style scoped lang="stylus">
.el-dialog__wrapper >>> .el-dialog__body
  padding-top 10px
</style>
