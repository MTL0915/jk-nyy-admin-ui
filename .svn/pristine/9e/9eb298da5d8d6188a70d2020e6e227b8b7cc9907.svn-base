<!-- 新增编辑sim卡信息 -->
<template>
  <div>
    <div>
      <el-form
        :model="form"
        size="small"
        label-width="auto"
      >
        <div class="form-top">
          <div class="box1">
            <el-form-item label="选择基地:">
              <el-select
                clearable
                size="mini"
                filterable
                v-model="simForm.bs_base_id"
                placeholder="选择基地"
                @change="changeBase()"
                class="box2"
              >
                <el-option
                  v-for="item in baseArray"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="box1">
            <el-form-item label="选择设备:">
              <el-select
                clearable
                size="mini"
                filterable
                v-model="simForm.hd_device_id"
                placeholder="请选择"
                class="box2"
                @change="changeDevice()"
              >
                <el-option
                  v-for="item in deviceArray"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="box1">
            <el-form-item label="iccid:">
              <el-input
                size="mini"
                clearable
                v-model="simForm.iccid"
                class="box2"
              />
            </el-form-item>
          </div>
          <div class="box1">
            <el-form-item label="msisdn:">
              <el-input
                size="mini"
                clearable
                v-model="simForm.msisdn"
                class="box2"
              />
            </el-form-item>
          </div>
          <div class="box1">
            <el-form-item label="运营商:">
              <el-select
                clearable
                size="mini"
                filterable
                v-model="simForm.type"
                placeholder="请选择"
                class="box2"
              >
                <el-option
                  v-for="item in typeOptions"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="box1">
            <el-form-item label="卡片总容量:">
              <el-input
                size="mini"
                clearable
                v-model="simForm.totalFlow"
                class="box2"
              />
            </el-form-item>
          </div>

          <div class="box1">
            <el-form-item label="卡片剩余容量:">
              <el-input
                size="mini"
                clearable
                v-model="simForm.surplus"
                class="box2"
              />
            </el-form-item>
          </div>

          <div class="box1">
            <el-form-item label="卡片用量:">
              <el-input
                size="mini"
                clearablediv
                v-model="simForm.dosage"
                class="box2"
              />
            </el-form-item>
          </div>

          <div class="box1">
            <el-form-item label="单位:">
              <el-select
                clearable
                size="mini"
                filterable
                v-model="simForm.unit"
                placeholder="请选择"
                class="box2"
              >
                <el-option
                  v-for="item in unitOptions"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </div>

          <div class="box1">
            <el-form-item label="计费类型:">
              <el-select
                clearable
                size="mini"
                filterable
                v-model="simForm.chargeType"
                placeholder="请选择"
                class="box2"
              >
                <el-option
                  v-for="item in chargeTypeOptions"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </div>

          <div class="box1">
            <el-form-item label="激活时间:">
              <el-date-picker
                value-format="yyyy-MM-dd HH:mm:ss"
                style="width:220px;"
                size="mini"
                v-model="simForm.activateTime"
                type="datetime"
                placeholder="选择日期"
                class="box2"
              />
            </el-form-item>
          </div>
          <div class="box1">
            <el-form-item label="到期时间:">
              <el-date-picker
                value-format="yyyy-MM-dd HH:mm:ss"
                style="width:220px;"
                size="mini"
                v-model="simForm.expireTime"
                type="datetime"
                placeholder="选择日期"
                class="box2"
              />
            </el-form-item>
          </div>
          <div class="box1">
            <el-form-item label="卡片状态:">
              <el-select
                clearable
                size="mini"
                filterable
                v-model="simForm.status"
                placeholder="请选择"
                class="box2"
              >
                <el-option
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
      </el-form>
      <div style="text-align:right">
        <el-button
          v-if="simForm.id"
          type="success"
          size="mini"
          @click="simHistoryDialogVisible=true"
        >历史绑定设备</el-button>
        <el-button
          type="primary"
          size="mini"
          @click="saveForm"
        >保存</el-button>
      </div>
    </div>
    <div>
      <el-dialog
        v-if="simHistoryDialogVisible "
        :visible.sync="simHistoryDialogVisible"
        append-to-body
        title="历史绑定设备记录"
        width="700px"
      >
        <simHistoryBindDevice :simId="simId" />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getSimDetail, checkDeviceBindSim } from '@/api/hd_device_sim'
import { deviceList } from '@/api/equip'
import { formatDate } from "@/utils/date"
import { getToken } from '@/utils/auth'
import simHistoryBindDevice from './simHistoryBindDevice'
export default {
  components: { simHistoryBindDevice },
  props: {
    simId: {
      type: String,
      default: null
    },
    baseArray: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      deviceArray: [],//设备列表
      simForm: {
        id: null,
        hd_device_id: null,
        iccid: null,
        type: null,
        totalFlow: null,
        surplus: null,
        dosage: null,
        activateTime: null,
        expireTime: null,
        status: null,
        msisdn: null,
        unit: null,
        chargeType: null,
      },
      typeOptions: [
        {
          name: '科通达',
          value: 'COTONDA'
        },
        {
          name: '173物联',
          value: 'WULIAN'
        },
        {
          name: '仨石',
          value: 'SASHI'
        }
      ],
      statusOptions: [
        {
          name: '待激活',
          value: 1
        },
        {
          name: '已激活',
          value: 2
        },
        {
          name: '已停机',
          value: 3
        },
        {
          name: '已失效',
          value: 4
        },
        {
          name: '测试卡',
          value: 5
        },
        {
          name: '已销户',
          value: 6
        },
        {
          name: '库存',
          value: 7
        },
        {
          name: '机卡分离',
          value: 8
        },
      ],
      unitOptions: [
        {
          name: 'MB',
          value: 'MB'
        },
        {
          name: 'GB',
          value: 'GB'
        },
      ],
      chargeTypeOptions: [
        {
          name: '按年',
          value: 'YEAR'
        },
        {
          name: '按月',
          value: 'MONTH'
        },
        {
          name: '按天',
          value: 'DAY'
        },
        {
          name: '按流量',
          value: 'QUANTITY'
        },
      ],
      simHistoryDialogVisible: false,
    }
  },
  created () {
    if (this.simId !== null) {
      getSimDetail({
        id: this.simId
      }).then(res => {
        if (res.code === 200) {
          res.data.activateTime = this.getDate(res.data.activateTime)
          res.data.expireTime = this.getDate(res.data.expireTime)
          this.simForm = res.data
          this.getDeviceList()
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  },
  methods: {
    //选择设备
    changeDevice () {
      if (this.simForm.hd_device_id) {
        checkDeviceBindSim({
          hd_device_id: this.simForm.hd_device_id,
          hd_device_sim_id: this.simForm.id
        }).then(res => {
          if (res.code === 200) {
            if (res.data) {
              this.$alert('该设备已绑定sim卡,绑定此设备会解绑另一个设备,请谨慎操作', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                }
              });
            }
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    //日期转换
    formatDate,
    getDate (timestamp) {
      if (this.checkNotNull(timestamp)) {
        return this.formatDate(new Date(timestamp), 'yyyy-MM-dd hh:mm:ss')
      } else {
        return null
      }
    },
    //保存
    saveForm () {
      const config = {
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getToken() }
      }
      this.$axios.post(process.env.BASE_API + '/hd_device_sim/simAddOrUpdate', this.simForm, config).then(res => {
        if (res.data.code === 200) {
          this.$message.success(res.data.msg)
          if (this.$parent.$parent.search) {
            this.$parent.$parent.search()
            this.$parent.$parent.simFormDialogVisible = false
          }

        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    //选择基地
    changeBase () {
      this.deviceArray = []
      this.simForm.hd_device_id = null
      this.getDeviceList()
    },
    //获取设备列表
    getDeviceList () {
      if (this.simForm.bs_base_id) {
        deviceList({
          bs_base_id: this.simForm.bs_base_id,
          need_camera: true,//包括摄像头
        }).then(res => {
          if (res.code === 200) {
            this.deviceArray = res.data.content
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    },
    checkNotNull (value) {
      if (value !== undefined && value !== null) {
        return true
      }
      return false
    },
  }
}
</script>
<style scoped>
.box1 {
  width: 50%;
}
.box2 {
  width: 200px;
}
.form-top {
  display: flex;
  flex-wrap: wrap;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
