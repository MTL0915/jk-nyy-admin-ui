<template>
  <div>
    <el-button
      type="primary"
      size="mini"
      @click="addPreset"
    >新增</el-button>
    <el-button
      v-show="hd_device_sensor_id!==''"
      type="danger"
      size="mini"
      @click="clearSensorPreset"
    >清除传感器预置点</el-button>
    <div style="display:flex;height:400px;margin-top:15px;">
      <div style="width:50%;height:100%;">
        <sxtifram
          :playWay="playWay"
          :hd_device_id="hd_device_id"
          :device_id="device_id"
        />
      </div>
      <div style="width:49%;height:100%;margin-left:15px;">
        <el-table
          :data="presets"
          height="400"
        >
          <el-table-column
            label="预置点名称"
            width="200px"
          >
            <template slot-scope="scope">
              {{scope.row.presetName}}
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-edit"
                circle
                @click="editPreset(scope.row.presetName,scope.row.index)"
              />
            </template>
          </el-table-column>
          <el-table-column
            prop="index"
            label="预置点"
            width="100px"
          />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                @click="sensorMoveSxtPreset(scope.row)"
              >移动</el-button>
              <el-button
                type="warning"
                size="mini"
                @click="replacePreset(scope.row)"
              >替换</el-button>
              <el-button
                v-show="hd_device_sensor_id===''"
                type="danger"
                size="mini"
                @click="deletePreset(scope.row)"
              >删除</el-button>
              <el-button
                v-show="hd_device_sensor_id!==''"
                type="success"
                size="mini"
                @click="choosePreset(scope.row)"
              >选择</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog
      :visible.sync="presetNameDialog"
      append-to-body
      :title="(editIndex===null)?'新增预置点':'修改预置点名称'"
      width="400px"
    >
      <div>
        预置点名称：
        <el-input
          v-model="presetName"
          size="mini"
          style="width:180px;"
        />
      </div>
      <div style="text-align:right;margin-top:15px;">
        <el-button
          type="primary"
          size="mini"
          @click="save"
        >
          保存
        </el-button>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="presetDeleteDialog"
      append-to-body
      title="删除预置点"
      width="400px"
    >
      <div style="text-align:center">
        <el-button
          size="mini"
          @click="presetDeleteDialog=false"
        >
          取消
        </el-button>
        <el-button
          type="danger"
          size="mini"
          @click="subDelete()"
        >
          删除
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { sensorDeleteSxtAllPreset, sensorSetSxtPreset } from '@/api/hd_device_sensor'
import { sxtPresetList, sensorMoveSxtPreset, deleteSxtPreset, updateSxtPresetName, addSxtPreset, replaceSxtPreset } from '@/api/sxt'
import sxtifram from './Sxt_ifram'

export default {
  components: {
    sxtifram
  },
  props: {
    hd_device_id: {
      // 设备ID
      type: String,
      default: ''
    },
    device_id: {
      // 设备序列号
      type: String,
      default: ''
    },
    playWay: {
      //播放方式
      type: String,
      default: 'play'
    },
    presets: {
      type: Array,
      default: []
    },
    hd_device_sensor_id: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      presetDeleteDialog: false,
      presetNameDialog: false,
      presetName: '',
      editIndex: null,
      deleteIndex: null,
      deletePresetId: null,
    }
  },
  created () {

  },
  methods: {
    replacePreset (row) {
      replaceSxtPreset({
        hd_device_id: this.hd_device_id,
        device_id: this.device_id,
        index: row.index,
        presetId: row.presetId
      }).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    choosePreset (row) {
      sensorSetSxtPreset({
        hd_device_sensor_id: this.hd_device_sensor_id,
        hd_device_id: this.hd_device_id,
        device_id: this.device_id,
        index: row.index,
        presetId: row.presetId
      }).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg)
          //TODO 
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    clearSensorPreset () {
      sensorDeleteSxtAllPreset({ hd_device_sensor_id: this.hd_device_sensor_id }).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg)
          //TODO 
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    deletePreset (row) {
      this.presetDeleteDialog = true
      this.deleteIndex = row.index
      this.deletePresetId = row.presetId
    },
    addPreset () {
      this.presetName = ''
      this.presetNameDialog = true
      this.editIndex = null
    },
    editPreset (name, index) {

      this.presetName = name
      this.presetNameDialog = true
      this.editIndex = index
    },
    subDelete () {
      this.presetDeleteDialog = false
      deleteSxtPreset({ hd_device_id: this.hd_device_id, device_id: this.device_id, index: this.deleteIndex, presetId: this.deletePresetId }).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg)
          this.sxtPresetList()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    save () {
      this.presetNameDialog = false
      //新增预置点
      if (this.editIndex === null) {
        addSxtPreset({ hd_device_id: this.hd_device_id, device_id: this.device_id, presetName: this.presetName }).then(res => {
          if (res.code === 200) {
            this.$message.success(res.msg)
            this.sxtPresetList()
          } else {
            this.$message.error(res.msg)
          }
        })
      }
      //编辑预置点名称
      else {
        updateSxtPresetName({ hd_device_id: this.hd_device_id, device_id: this.device_id, index: this.editIndex, presetName: this.presetName }).then(res => {
          if (res.code === 200) {
            this.$message.success(res.msg)
            this.sxtPresetList()
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    sxtPresetList () {
      sxtPresetList({ hd_device_id: this.hd_device_id, device_id: this.device_id }).then(res => {
        if (res.code === 200) {
          this.presets = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    sensorMoveSxtPreset (row) {
      sensorMoveSxtPreset({
        hd_device_id: this.hd_device_id,
        device_id: this.device_id,
        index: row.index,
        presetId: row.presetId
      }).then(res => {
        if (res.code === 200) {
          //this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>