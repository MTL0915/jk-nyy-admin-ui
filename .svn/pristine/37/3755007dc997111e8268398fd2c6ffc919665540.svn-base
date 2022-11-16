<template>
  <div>
    <div style="display: flex;justify-content: space-evenly;margin-bottom: 15px;">
      <div>
        设备类型:
        <el-select
          placeholder="请选择"
          @change="nonggengTypeChange"
          v-model="nonggengType"
          value-key="name"
          size="mini"
        >
          <el-option
            v-for="item in nonggengTypeOptions"
            :key="item.name"
            :label="item.name"
            :value="item"
          >
          </el-option>
        </el-select>
      </div>
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
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
    >
      <el-tab-pane
        label="测试数据"
        name="first"
      >
        <el-button
          type="primary"
          size="mini"
          @click="addChannel(1)"
        >新增</el-button>
        <el-table
          :data="channels1"
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
                @click="zIndexTop(channels1,scope.$index)"
              >置顶</el-button>
              <el-button
                type="text"
                size="small"
                @click="zIndexUp(channels1,scope.$index)"
              >上移</el-button>
              <el-button
                type="text"
                size="small"
                @click="zIndexDown(channels1,scope.$index,channels1.length)"
              >下移</el-button>
              <el-button
                @click.native.prevent="deleteRow(scope.$index, channels1)"
                type="text"
                size="small"
              >
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane
        label="测试结果"
        name="second"
      >
        <el-button
          type="primary"
          size="mini"
          @click="addChannel(2)"
        >新增</el-button>
        <el-table
          :data="channels2"
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
              {{channels1.length + scope.$index +1}}
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
                @click="zIndexTop(channels2,scope.$index)"
              >置顶</el-button>
              <el-button
                type="text"
                size="small"
                @click="zIndexUp(channels2,scope.$index)"
              >上移</el-button>
              <el-button
                type="text"
                size="small"
                @click="zIndexDown(channels2,scope.$index,channels2.length)"
              >下移</el-button>
              <el-button
                @click.native.prevent="deleteRow(scope.$index, channels2)"
                type="text"
                size="small"
              >
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <div style="text-align:right;">
      <el-button
        type="primary"
        @click="save"
        size="mini"
      >确定添加</el-button>
    </div>
  </div>
</template>
<script>
import { find } from '@/api/hd_sensor_type'
import { getToken } from '@/utils/auth'

export default {
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
  data () {
    return {
      name: '',//设备名称
      verification_code: 'A12345',//设备验证码
      channelConfigList: [],//通道
      sensorTypeList: [],//传感器类型
      default_sensor_type_id: null,//默认传感器类型
      nonggengType: null,
      nonggengTypeOptions: [
        {
          name: '气孔设备',
          channels1://测试数据
            [{ name: '开始湿度', hd_sensor_type_code: '23' }, { name: '终止湿度', hd_sensor_type_code: '23' }, { name: '大气压', hd_sensor_type_code: '25' }, { name: '叶室温度', hd_sensor_type_code: '88' }, { name: '叶片温度', hd_sensor_type_code: '84' }, { name: '光强', hd_sensor_type_code: '64' },],
          channels2://测试结果
            [{ name: '湿度落差' }, { name: '气室容积' }, { name: '叶片面积' }, { name: '蒸腾速率' }, { name: '气孔导度' }],
        },
        {
          name: '植物蒸腾设备',
          channels1://测试数据
            [{ name: '开始湿度', hd_sensor_type_code: '23' }, { name: '终止湿度', hd_sensor_type_code: '23' }, { name: '大气压', hd_sensor_type_code: '25' }, { name: '叶室温度', hd_sensor_type_code: '88' }, { name: '叶片温度', hd_sensor_type_code: '84' }, { name: '光强', hd_sensor_type_code: '64' },],
          channels2://测试结果
            [{ name: '湿度落差' }, { name: '气室容积' }, { name: '叶片面积' }, { name: '蒸腾速率' }, { name: '气孔导度' }],
        },
      ],
      channels1: [],//测试数据
      channels2: [],//测试结果
      activeName: 'first',
    }
  },
  methods: {
    //增加通道号
    addChannel (val) {
      if (val === 1) {
        this.channels1.push({
          name: '',
          hd_sensor_type_id: this.default_sensor_type_id,
        })
      } else if (val === 2) {
        this.channels2.push({
          name: '',
          hd_sensor_type_id: this.default_sensor_type_id,
        })
      }
    },
    //农耕设备类型下拉框更改
    nonggengTypeChange (val) {
      this.channels1 = []
      this.channels2 = []
      this.name = val.name
      for (let i = 0; i < val.channels1.length; i++) {
        let hd_sensor_type_id = this.default_sensor_type_id
        if (val.channels1[i].hd_sensor_type_code) {
          for (let j = 0; j < this.sensorTypeList.length; j++) {
            if (val.channels1[i].hd_sensor_type_code === this.sensorTypeList[j].code) {
              hd_sensor_type_id = this.sensorTypeList[j].id
              break
            }
          }
        }
        this.channels1.push({
          name: val.channels1[i].name,
          hd_sensor_type_id: hd_sensor_type_id,
        })
      }
      for (let i = 0; i < val.channels2.length; i++) {
        let hd_sensor_type_id = this.default_sensor_type_id
        if (val.channels2[i].hd_sensor_type_code) {
          for (let j = 0; j < this.sensorTypeList.length; j++) {
            if (val.channels2[i].hd_sensor_type_code === this.sensorTypeList[j].code) {
              hd_sensor_type_id = this.sensorTypeList[j].id
              break
            }
          }
        }
        this.channels2.push({
          name: val.channels2[i].name,
          hd_sensor_type_id: hd_sensor_type_id,
        })
      }
    },
    //保存
    save () {
      if (this.nonggengType === null) {
        this.$message.error('请先选择农耕设备类型')
        return
      }
      if (this.name === null) {
        this.$message.error('请输入设备名称')
        return
      }
      if (this.verification_code === null) {
        this.$message.error('请输入设备验证码')
        return
      }

      let communication = {}//设备配置信息 在此用于识别Excel
      let deviceinfo = {}
      let testData = []
      let testResult = []
      this.channelConfigList = []
      for (let i = 0; i < this.channels1.length; i++) {
        this.channels1[i].channel = (i + 1)
        this.channelConfigList.push({
          name: this.channels1[i].name,
          hd_sensor_type_id: this.channels1[i].hd_sensor_type_id,
          channel: this.channels1[i].channel
        })
        testData.push(this.channels1[i].name)
      }
      for (let i = 0; i < this.channels2.length; i++) {
        this.channels2[i].channel = (this.channels1.length + i + 1)
        this.channelConfigList.push({
          name: this.channels2[i].name,
          hd_sensor_type_id: this.channels2[i].hd_sensor_type_id,
          channel: this.channels2[i].channel
        })
        testResult.push(this.channels2[i].name)
      }
      deviceinfo.testData = testData
      deviceinfo.testResult = testResult
      deviceinfo.typeName = this.nonggengType.name
      communication.deviceinfo = deviceinfo

      const config = {
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getToken() }
      }
      this.$axios.post(process.env.BASE_API + '/nonggeng/addNonggengDeviceFactory', {
        name: this.name,
        verification_code: this.verification_code,
        channelConfigList: this.channelConfigList,
        communication: JSON.stringify(communication)
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
    //移除
    deleteRow (index, rows) {
      rows.splice(index, 1);
    },
  }
}
</script>
