<template>
  <div>
    <el-dialog
      :append-to-body="true"
      :visible.sync="dialogVisible"
      :title="device_type_name+' - 版本管理'"
      width="1000px"
    >
      <el-button icon="el-icon-upload" type="success" size="small" @click="add">添加</el-button>

      <el-table
        :data="datas"
        style="width: 100%;margin-top:10px"
        border
        class="table">

        <el-table-column label="硬件版本号" width="150" prop="hardware_version" align="center"/>
        <el-table-column label="通信方式" align="center">
          <template slot-scope="scope">
            <div v-for="item in $parent.communication_typeDicts" :key="item.id">
              <span v-if="scope.row.communication_type.toString() === item.value" >{{ item.label }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="信号通道" align="center">
          <template slot-scope="scope">
            <div v-for="item in $parent.signal_channelDicts" :key="item.id">
              <span v-if="scope.row.signal_channel.toString() === item.value" >{{ item.label }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="注释" prop="description" align="center">
          <template slot-scope="scope">
            <div style="max-height:100px;overflow:auto;width:100%;text-align:left">{{ scope.row.description }}</div>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" width="300px">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="confirmDel(scope.$index, scope.row)">删除</el-button>
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="success" @click="upgradeFileManager(scope.$index, scope.row)">升级程序管理</el-button>
          </template>
        </el-table-column>
      </el-table>

    </el-dialog>

    <versionManagerAdd ref="versionManagerAdd" />
    <versionManagerEdit ref="versionManagerEdit" />
    <upgradeFile ref="upgradeFile" />

  </div>
</template>
<script>
import { find, deleteById } from '@/api/hd_hardware_version'
import upgradeFile from './upgradeFile'
import versionManagerAdd from './versionManagerAdd'
import versionManagerEdit from './versionManagerEdit'

// property
export default {
  components: { versionManagerAdd, versionManagerEdit, upgradeFile },
  data() {
    return {
      datas: [],
      dialogVisible: false,
      hd_device_type_id: '',
      device_type_name: ''
    }
  },
  computed: {
  },
  methods: {
    showDialog(obj) {
      this.device_type_name = obj.name
      this.hd_device_type_id = obj.id
      this.dialogVisible = true
      this.getData()
    },

    getData() {
      find({ 'hd_device_type_id': this.hd_device_type_id }).then(res => {
        this.datas = res.data.content
      })
    },
    upgradeFileManager(index, obj) {
      this.$refs.upgradeFile.show(obj)
    },
    add() {
      this.$refs.versionManagerAdd.show(this.hd_device_type_id)
    },
    handleEdit(index, obj) {
      this.$refs.versionManagerEdit.show(obj)
    },
    confirmDel(index, obj) {
      var hd_hardware_version_id = obj.id

      this.$confirm('是否确认删除该设备类型?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        width: '250px'
      }).then(() => {
        deleteById({ id: hd_hardware_version_id }).then(res => {
          if (res.code === 200) {
            this.$message.success('删除成功！')
            this.getData()
          }
        })
      })
    }

  }
}
</script>

<style scoped>
  .el-dialog__wrapper >>> .el-dialog__body{
    padding-top: 5px;
  }
</style>
