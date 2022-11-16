<template>
  <div>
    <div>
      <el-table
        :data="device.sensor"
        style="width: 100%;"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
        />

        <el-table-column
          label="传感器名称"
          prop="name"
        ></el-table-column>

        <el-table-column
          label="通道号"
          prop="channel"
        ></el-table-column>

        <el-table-column label="数值">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.value"
              placeholder="数值"
              size="small"
            />
          </template>
        </el-table-column>

      </el-table>
      <div style="text-align:right;margin:15px;">
        <el-button
          :disabled="multipleSelection.length===0"
          type="primary"
          @click="save"
        >确定</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { setParaGkDevice } from '@/utils/websocket_util.js';
import { getDetailById } from '@/api/equip'

export default {
  props: {
    device_id: {
      type: String,
      default: null
    },
    hd_device_id: {
      type: String,
      default: null
    },
  },
  data () {
    return {
      device: null,
      multipleSelection: [],
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      getDetailById({
        hd_device_id: this.hd_device_id,
        device_id: this.device_id
      }).then(res => {
        if (res.code === 200) {
          this.device = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    save () {
      let channelArray = []
      let valueArray = []
      for (let i = 0; i < this.multipleSelection.length; i++) {
        let sensor = this.multipleSelection[i]
        channelArray.push(sensor.channel)
        valueArray.push(sensor.value)
      }
      let channelStr = channelArray.join(',')
      let valueStr = valueArray.join(',')
      setParaGkDevice(this.device.device_id, channelStr, valueStr, this.$ws)
        .then(res => {
          this.$message.success('设置成功')
        })
        .catch(err => {
          this.$message.error(err.msg);
        });
    },
  }
}
</script>