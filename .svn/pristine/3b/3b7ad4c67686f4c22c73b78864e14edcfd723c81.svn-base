<template>
  <div>
    <div
      v-show="step === 1"
      style="text-align:center;"
    >
      <div>
        诚顺账号：
        <el-input
          size="mini"
          style="width:300px;margin-top:15px;"
          v-model="username"
          clearable
        />
      </div>
      <div>
        诚顺密码：
        <el-input
          size="mini"
          style="width:300px;margin-top:15px;"
          v-model="password"
          clearable
        />
      </div>
      <el-button
        :loading="loginLoading"
        type="primary"
        size="mini"
        style="margin-top:15px;"
        @click="login"
      >获取配置</el-button>
    </div>
    <div v-show="step === 2">
      <el-table
        :data="tableData"
        style="width: 100%"
        max-height="300"
        @selection-change="handleSelectionChange"
      >
        >

        <el-table-column
          type="selection"
          width="55"
        />

        <el-table-column
          prop="name"
          label="名称"
        />

        <el-table-column
          prop="type"
          label="类型"
        />

        <el-table-column
          prop="rwTpye"
          label="读写类型"
        />

        <el-table-column
          prop="plcAddress"
          label="PLC地址"
        />

        <el-table-column
          prop="value"
          label="数值"
        />

      </el-table>
      <div style="text-align:right;">
        <el-button
          :disabled="multipleSelection.length === 0"
          type="primary"
          @click="choice"
          size="mini"
        >确定选择</el-button>
      </div>
    </div>
    <div v-show="step===3">
      <div style="display: flex;justify-content: space-evenly;margin-bottom: 15px;">
        <div>
          设备名称：
          <el-input
            v-model="name"
            size="mini"
            style="width:150px;"
          />
        </div>
        <div>
          设备序列号：
          <el-input
            v-model="verification_code"
            size="mini"
            style="width:150px;"
          />
        </div>
      </div>
      <el-table
        :data="channels"
        style="width: 100%;"
      >
        <el-table-column label="名称">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.name"
              placeholder="名称"
              size="small"
            />
          </template>
        </el-table-column>

        <el-table-column label="传感器类型">
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.hd_sensor_type_id"
              placeholder="请选择"
              filterable
            >
              <el-option
                v-for="item in sensorTypeList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>

        <el-table-column
          label="通道号"
          width="120px"
        >
          <template slot-scope="scope">
            {{scope.$index +1}}
          </template>
        </el-table-column>

        <el-table-column
          label="编辑"
          width="260px"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="zIndexTop(channels,scope.$index)"
            >置顶</el-button>
            <el-button
              type="text"
              size="small"
              @click="zIndexUp(channels,scope.$index)"
            >上移</el-button>
            <el-button
              type="text"
              size="small"
              @click="zIndexDown(channels,scope.$index,channels.length)"
            >下移</el-button>
            <el-button
              @click.native.prevent="deleteRow(scope.$index, channels)"
              type="text"
              size="small"
            >
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align:right;">
        <el-button
          :disabled="channels.length === 0"
          type="primary"
          @click="save"
          size="mini"
        >确定添加</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { getPLCAddress } from '@/api/chengshun'
import { find } from '@/api/hd_sensor_type'
import { getToken } from '@/utils/auth'

export default {
  data () {
    return {
      username: 'shunde',
      password: '888888',
      step: 1,
      loginLoading: false,
      tableData: [],
      multipleSelection: [],
      channels: [],
      sensorTypeList: [],
      default_sensor_type_id: null,//默认传感器ID,
      name: '诚顺设备',//设备名称,
      verification_code: 'A12345',//设备验证码
    }
  },
  created () {
    find({
      page: 0,
      size: 9999
    }).then(res => {
      if (res.code === 200) {
        this.sensorTypeList = res.data.content
        for (let i = 0; i < this.sensorTypeList.length; i++) {
          if (this.sensorTypeList[i].code === '133') {
            this.default_sensor_type_id = this.sensorTypeList[i].id
            break
          }
        }
      } else {
        this.$message.error(res.msg)
      }
    })
  },
  methods: {
    deleteRow (index, rows) {
      rows.splice(index, 1);
    },
    save () {
      for (let i = 0; i < this.channels.length; i++) {
        this.channels[i].channel = (i + 1)
      }
      const config = {
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getToken() }
      }

      this.$axios.post(process.env.BASE_API + '/chengshun/addChengshunDeviceFactory', {
        name: this.name,
        verification_code: this.verification_code,
        username: this.username,
        password: this.password,
        channelConfigList: this.channels,
      }, config).then(res => {
        if (res.data.code === 200) {
          this.$message.success('操作成功')
          this.step = 2
          this.multipleSelection = []
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    choice () {
      this.step = 3
      this.channels = []
      for (let i = 0; i < this.multipleSelection.length; i++) {
        this.multipleSelection[i]
        this.channels.push({
          name: this.multipleSelection[i].name,
          hd_sensor_type_id: this.default_sensor_type_id,
          configuration: JSON.stringify(this.multipleSelection[i])
        })
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    login () {
      getPLCAddress({
        username: this.username,
        password: this.password
      }).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg)
          this.step = 2
          this.tableData = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    //换位
    swapArray (arr, index1, index2) {
      arr[index1].ord = index2
      arr[index2].ord = index1
      arr[index1] = arr.splice(index2, 1, arr[index1])[0];
      return arr
      //return arr;
    },
    //置顶
    zIndexTop (arr, index) {
      if (index != 0) {
        //首先判断当前元素需要上移几个位置,置底移动到数组的第一位
        var moveNum = index - 0;
        //循环出需要一个一个上移的次数
        for (var i = 0; i < moveNum; i++) {
          this.swapArray(arr, index, index - 1);
          index--;
        }
      } else {
        this.$message.warning('已经处于顶部')
      }
    },
    //下移
    zIndexDown (arr, index, length) {
      if (index + 1 != length) {
        this.swapArray(arr, index, index + 1);
      } else {
        this.$message.warning('已经处于置顶，无法下移')
      }
    },
    //上移
    zIndexUp (arr, index) {
      if (index != 0) {
        this.swapArray(arr, index, index - 1);
      } else {
        this.$message.warning('已经处于置底，无法上移')
      }
    },
  }
}
</script>