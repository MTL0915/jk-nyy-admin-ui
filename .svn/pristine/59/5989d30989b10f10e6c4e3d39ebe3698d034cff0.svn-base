<template>
  <!-- 新水肥配方 -->
  <div>
    <div>
      <el-table
        :data="formulaList"
        style="width: 100%"
      >
        <el-table-column label="配方名称">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.fml_name"
              size="mini"
              clearable
              :disabled="!checkUserPermission(['ADMIN','DEVICE_ALL','DEVICE_EDIT'])"
            />
          </template>
        </el-table-column>

        <el-table-column label="配肥方式">
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.fml_way"
              placeholder="请选择"
              size="mini"
              filterable
              clearable
              :disabled="!checkUserPermission(['ADMIN','DEVICE_ALL','DEVICE_EDIT'])"
            >
              <el-option
                v-for="item in fmlWayOptions"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </template>
        </el-table-column>

        <el-table-column
          label="配肥比例"
          width="450"
        >
          <template slot-scope="scope">
            <div style="display: flex;">
              <div
                v-for="(items, index)  in scope.row.fml_nArray"
                :key="index"
              >
                <el-input
                  v-model="scope.row.fml_nArray[index]"
                  size="mini"
                  type="number"
                  style="width:70px;"
                  :disabled="!checkUserPermission(['ADMIN','DEVICE_ALL','DEVICE_EDIT'])"
                />
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="EC">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.fml_ec"
              size="mini"
              type="number"
              clearable
              :disabled="!checkUserPermission(['ADMIN','DEVICE_ALL','DEVICE_EDIT'])"
            />
          </template>
        </el-table-column>

        <el-table-column label="PH">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.fml_ph"
              size="mini"
              clearable
              :disabled="!checkUserPermission(['ADMIN','DEVICE_ALL','DEVICE_EDIT'])"
            />
          </template>
        </el-table-column>

        <el-table-column label="配方备注">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.fml_note"
              size="mini"
              clearable
              :disabled="!checkUserPermission(['ADMIN','DEVICE_ALL','DEVICE_EDIT'])"
            />
          </template>
        </el-table-column>

        <el-table-column label="编辑时间">
          <template slot-scope="scope">
            {{getTime(scope.row.fml_time)}}
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click="setFormula(scope.row)"
              type="primary"
              size="mini"
              :disabled="!checkUserPermission(['ADMIN','DEVICE_ALL','DEVICE_EDIT'])"
            >修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { getFormula, setFormula } from '@/utils/jkfm_websocket_util'
import { formatDate } from "@/utils/date"
import checkUserPermission from '@/utils/user_permission'

export default {
  props: {
    device_id: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      formulaList: [],//配方列表
      fmlUserTypeOptions: [//用户类型
        { name: '系统（终端）', value: 0 },
        { name: '普通用户', value: 1 },
        { name: '专家用户', value: 2 },
      ],
      fmlWayOptions: [//配肥方式
        { name: 'EC控制', value: 0 },
        { name: '水肥比例控制', value: 1 },
      ],
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    //判断权限
    checkUserPermission,
    formatDate,
    //初始化
    init () {
      if (this.device_id) {
        this.getFormula()
      }
    },
    //判断水肥设置后返回是否成功
    checkJkfmReturnSuccess (data) {
      if (data) {
        if (data.message_body) {
          if (data.message_body.msgbd_result === 0) {
            return true
          } else {
            this.$message.error(data.message_body.msgbd_result_detail)
            return false
          }
        }
      }
      return false
    },
    getTime (timestamp) {
      if (timestamp) {
        return this.formatDate(new Date(timestamp), 'yyyy-MM-dd hh:mm:ss')
      }
      return ''
    },
    //获取配方
    getFormula () {
      // getFormula
      getFormula(this.device_id, this.$ws)
        .then(res => {
          if (res.code === 200) {
            let list = res.data.msgbd_content
            for (let i = 0; i < list.length; i++) {
              list[i].fml_nArray = list[i].fml_n.split(';')
            }
            this.formulaList = list
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          this.$message.error(err.msg)
        });
    },
    //设置配方
    setFormula (row) {
      row.fml_time = new Date().getTime()//编辑时间
      row.fml_n = row.fml_nArray.join(';')//水肥比
      row.fml_user_type = 1//普通用户
      setFormula(this.device_id, row, this.$ws, this.$store.state.user.user.name).then(res => {
        if (res.code === 200) {
          if (this.checkJkfmReturnSuccess(res.data)) {
            this.$message.success(res.msg)
          } else {
            this.init()
          }
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        this.$message.error(err.msg)
      });
    },
  }
}
</script>
