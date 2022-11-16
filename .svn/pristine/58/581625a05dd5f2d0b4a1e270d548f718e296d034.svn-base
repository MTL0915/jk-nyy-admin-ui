<template>
  <div>
    <div style="font-size: 20px;margin-bottom: 20px;">基本信息</div>
    <el-row style="display: flex;padding:5px;">
      <el-col>所在地块:
        <el-select
          v-model="form.rs_facilities_id"
          size="small"
          style="width:200px"
          placeholder="选择所在地块"
        >
          <el-option
            v-for="item in facilities"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-col>
      <el-col>作物名称:
        <el-select
          v-model="form.crop_id"
          filterable
          placeholder="请选择"
        >
          <el-option
            v-for="item in cropOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row style="display: flex;padding:5px;">
      <el-col>种植品种:
        <el-input
          v-model="form.plant_variety"
          size="small"
          style="width:200px"
          clearable
        />
      </el-col>
      <el-col>种植标准:
        <el-select
          v-model="form.plant_norm"
          size="small"
          style="width:200px"
          placeholder="选择种植标准"
        >
          <el-option
            v-for="item in plant_norm_options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
    </el-row>
    <div style="font-size: 20px;margin-bottom: 20px;margin-top: 40px;">肥料信息</div>
    <el-row style="display: flex;padding:5px;">
      <el-col>氮:
        <el-input
          v-model="form.nitrogen"
          size="small"
          style="width:244px"
          clearable
        />
      </el-col>
      <el-col>磷:
        <el-input
          v-model="form.phosphorus"
          size="small"
          style="width:244px"
          clearable
        />
      </el-col>
    </el-row>
    <el-row style="display: flex;padding:5px;">
      <el-col>钾:
        <el-input
          v-model="form.kalium"
          size="small"
          style="width:244px"
          clearable
        />
      </el-col>
      <el-col>尿素:
        <el-input
          v-model="form.urea"
          size="small"
          style="width:230px"
          clearable
        />
      </el-col>
    </el-row>
    <el-row style="display: flex;padding:5px;">
      <el-col>磷酸二铵:
        <el-input
          v-model="form.DAP"
          size="small"
          style="width:200px"
          clearable
        />
      </el-col>
      <el-col>有机肥:
        <el-input
          v-model="form.organic_fertilizer"
          size="small"
          style="width:216px"
          clearable
        />
      </el-col>
    </el-row>

    <div style="font-size: 20px;margin-bottom: 20px;margin-top: 40px;">采收信息</div>
    <el-row style="display: flex;padding:5px;">
      <el-col>定植时间:
        <el-date-picker
          v-model="form.plant_start_time"
          min-time="2020-03-01 00:00:00"
          size="small"
          style="width:200px"
          value-format="yyyy-MM-dd"
        />
      </el-col>
      <el-col>采收时间:
        <el-date-picker
          v-model="form.recovery_time"
          size="small"
          style="width:200px"
          value-format="yyyy-MM-dd"
          @change="checkTime(2)"
        />
      </el-col>
    </el-row>
    <el-row style="display: flex;padding:5px;">
      <el-col>种植结束:
        <el-date-picker
          v-model="form.plant_end_time"
          size="small"
          style="width:200px"
          value-format="yyyy-MM-dd"
          @change="checkTime(3)"
        />
      </el-col>
      <el-col>种植面积:
        <el-input
          v-model="form.acreage"
          style="width:200px"
          size="small"
          type="number"
        />
      </el-col>
    </el-row>
    <el-row
      v-if="form.id"
      style="display: flex;padding:5px;"
    >
      <el-col>创建时间:
        <el-date-picker
          v-model="form.create_time"
          disabled="true"
          size="small"
          style="width:200px"
          value-format="yyyy-MM-dd"
        />
      </el-col>
      <el-col>修改时间:
        <el-date-picker
          v-model="form.update_time"
          disabled="true"
          size="small"
          style="width:200px"
          value-format="yyyy-MM-dd"
        />
      </el-col>
    </el-row>

    <div v-show="estimateList[0].length !== 0">
      <div style="font-size: 20px;margin-bottom: 20px;margin-top: 40px;">预估产值</div>
      <el-table
        :data="estimateList"
        style="text-align: center;"
      >
        <el-table-column
          v-for="(estimate,index) in estimateList[0]"
          :key="index"
          :label="estimate.label"
          width="100px"
        >
          <template slot-scope="scope">
            <el-input
              v-model="scope.row[index].value"
              size="small"
            />
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div style="margin-top: 40px;margin-right:15px;text-align: right;">
      <el-button
        size="small"
        type="primary"
        @click="save()"
      >确定</el-button>
      <el-button
        size="small"
        @click="closeAps()"
      >取消</el-button>
    </div>
  </div>
</template>
<script>

import { apsGet, findByBs_base_id, vegetablesList } from '@/api/rs_facilities'
import { parseTime } from '@/utils/index'
import { getToken } from '@/utils/auth'
export default {
  components: {
  },
  props: {
    sup_this: {
      type: Object,
      required: true
    },
    closeAps: {
      type: Function,
      default: new Function
    }
  },
  data () {
    return {
      plant_norm_options: [{
        label: '有机',
        value: 0
      }, {
        label: '绿色',
        value: 1
      }, {
        label: '无公害',
        value: 2
      }],
      facilities: [],
      cropOptions: [],
      form: {
        id: null,
        rs_facilities_id: '',
        plant_variety: '',
        plant_norm: 0,
        nitrogen: null, // 氮
        phosphorus: null, // 磷
        kalium: null, // 钾
        urea: null, // 尿素
        DAP: null, // 磷酸二铵
        organic_fertilizer: null, // 有机肥
        plant_start_time: null,
        recovery_time: null,
        plant_end_time: null,
        acreage: 0,
        estimate_crop: null
      },
      estimateList: [
        []
      ]
    }
  },
  created () {
    // 获取基地下的地块
    findByBs_base_id({ bs_base_id: this.$store.state.baseinfo.cur_base_id }).then(res => {
      if (res.code === 200) {
        this.facilities = res.data
      } else {
        this.$message.error(res.msg)
      }
    })
    vegetablesList().then(res => {
      if (res.code === 200) {
        this.cropOptions = res.data.content
      } else {
        this.$message.error(res.msg)
      }
    })
  },
  methods: {
    parseTime,
    // 判断输入的时间是否合理
    checkTime (type, ee) {
      if (this.form.plant_start_time === null) {
        this.$message.warning('请输入定植时间!')
        this.form.recovery_time = null
        this.form.plant_end_time = null
        return
      }
      if (type === 2 && this.form.recovery_time !== null) {
        if (new Date(this.form.plant_start_time.replace(/-/g, '/')).getTime() >= new Date(this.form.recovery_time.replace(/-/g, '/')).getTime()) {
          this.$message.warning('采收时间不能小于定植时间')
          this.form.recovery_time = null
          return
        }
      } else if (type === 3 && this.form.plant_end_time !== null) {
        if (this.form.recovery_time === null) {
          this.$message.warning('请输入采收时间!')
          this.form.plant_end_time = null
          return
        }
        if (new Date(this.form.recovery_time.replace(/-/g, '/')).getTime() >= new Date(this.form.plant_end_time.replace(/-/g, '/')).getTime()) {
          this.$message.warning('结束时间不能小于采收时间')
          this.form.plant_end_time = null
          return
        }
        // 生成预估产量数组
        var r = this.form.recovery_time.split('-')
        var recovery_year = parseInt(r[0])
        var recovery_month = parseInt(r[1])
        var e = this.form.plant_end_time.split('-')
        var end_year = parseInt(e[0])
        var e_month = parseInt(e[1])
        var end_time = new Date(end_year + '/' + e_month)
        var time = null
        var array = []
        var index = 0
        while (time === null || time.getTime() < end_time.getTime()) {
          var month = (recovery_month - 1) % 12
          var year = parseInt(recovery_year + (recovery_month - 1) / 12)
          time = new Date(year + '/' + (month + 1))
          var value = ee ? ee[index].value : 0
          array.push({
            'label': time.getFullYear() + '年' + (time.getMonth() + 1) + '月',
            'time': time.getFullYear() + '-' + (time.getMonth() + 1),
            'value': value
          })
          recovery_month++
          index++
        }
        this.$set(this.estimateList, 0, array)
      }
    },
    // 保存
    save () {
      if (!this.form.rs_facilities_id) {
        this.$message.error('请选择地块!')
        return
      }
      if (!this.form.crop_id) {
        this.$message.error('请选择作物')
        return
      }
      if (!this.form.plant_start_time) {
        this.$message.error('请输入定植时间!')
        return
      }
      if (!this.form.recovery_time) {
        this.$message.error('请输入采收时间!')
        return
      }
      if (!this.form.plant_end_time) {
        this.$message.error('请输入种植结束时间!')
        return
      }
      if (this.estimateList[0].length !== 0) {
        this.form.estimate_crop = this.estimateList[0]
      }
      const config = {
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getToken() }
      }
      this.$axios.post(process.env.BASE_API + '/rs/rs_facilities_aps/addOrEdit', this.form, config).then(res => {
        if (res.data.code === 200) {
          this.$message.success('操作成功!')
          this.sup_this.dialogVisible = false
          this.sup_this.$refs.schedul.getData()
          this.resetForm()
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    // 获取编辑数据
    getData (id) {
      apsGet({ id: id }).then(res => {
        if (res.code === 200) {
          this.form = res.data
          if (this.form.plant_start_time) {
            this.form.plant_start_time = parseTime(this.form.plant_start_time).substring(0, 10)
          }
          if (this.form.recovery_time) {
            this.form.recovery_time = parseTime(this.form.recovery_time).substring(0, 10)
          }
          if (this.form.plant_end_time) {
            this.form.plant_end_time = parseTime(this.form.plant_end_time).substring(0, 10)
          }
          if (this.form.create_time) {
            this.form.create_time = parseTime(this.form.create_time).substring(0, 10)
          }
          if (this.form.update_time) {
            this.form.update_time = parseTime(this.form.update_time).substring(0, 10)
          }
          var ee = JSON.parse(this.form.estimate_crop)
          this.checkTime(3, ee)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 重置表单
    resetForm () {
      this.form = {
        id: null,
        rs_facilities_id: '',
        plant_variety: '',
        plant_norm: 0,
        nitrogen: null, // 氮
        phosphorus: null, // 磷
        kalium: null, // 钾
        urea: null, // 尿素
        DAP: null, // 磷酸二铵
        organic_fertilizer: null, // 有机肥
        plant_start_time: null,
        recovery_time: null,
        plant_end_time: null,
        acreage: 0,
        estimate_crop: null
      }
      this.estimateList[0] = []
    }
  }
}
</script>
