<template>
  <div>
    <div style="margin-bottom:10px" v-show="!addShow">
      <el-button size="mini" type="primary" @click="addPlan"><i class="el-icon-plus"></i>新增</el-button>
    </div>
    <div v-show="!addShow">
      <el-table
        :data="planList"
        row-key="id"
        border
        style="width: 100%;font-size:13px"
      > 
        <el-table-column
          align="center"
          property="name"
          label="计划名称"
        />
        <el-table-column
          align="center"
          property="hd_device_sensor_names"
          label="阀门"
        />
        <el-table-column label="已灌溉（天）" align="center">
          <template slot-scope="scope">
            <div v-show="scope.row.status != 2">
              {{ scope.row.now_day }}
            </div>
            <div v-show="scope.row.status == 2">
              {{ scope.row.duration_day }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          property="duration_day"
          label="周期（天）"
        />
        <el-table-column
          align="center"
          property="day_minute"
          label="每天灌溉时长（分钟）"
        />
        <el-table-column label="灌溉时间" align="center">
          <template slot-scope="scope">
            <div v-for="(item, i) in scope.row.dayTimes" :key="i">
              {{ item.startTime }}~{{ item.endTime }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          property="tempWeeks"
          label="每周灌溉日"
        />
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.status == 2" style="color: red">
              已过期
            </div>
            <div v-else-if="scope.row.status == 1" style="color:#67C23A">
              运行中
            </div>
            <div v-else>
              暂停中
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="200px">
          <template slot-scope="scope">
            <div>
              <el-button size="mini" type="primary" v-if="scope.row.today_stop_irrigation_status == 0" @click="stop(scope.row)">停灌一次</el-button>
              <el-button size="mini" type="primary" v-if="scope.row.today_stop_irrigation_status == 1" @click="stop(scope.row)">取消停灌</el-button>
              <el-dropdown
                split-button
                size="mini"
                type="success"
                v-if="scope.row.status == 1"
                @click="stopPlan(scope.row)"
                @command="handle($event, scope.row)"
              >
                停止
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="del">删除</el-dropdown-item>
                  <el-dropdown-item command="amend">修改</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-dropdown
                split-button
                size="mini"
                type="success"
                v-if="scope.row.status != 1"
                @click="stopPlan(scope.row)"
                @command="handle($event, scope.row)"
              >
                开始
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="del">删除</el-dropdown-item>
                  <el-dropdown-item command="amend">修改</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </template>

        </el-table-column>
      </el-table>
    </div>
    <div v-show="addShow">
      <addIrrigatePlan ref="addIrrigate" />
    </div>
  </div>
</template>
<script>
import {
  cancelStopIrrigationOnce,
  stopIrrigationOnce,
  deleteById,
  startDeviceIrrigationPlan,
  stopDeviceIrrigationPlan,
  listDeviceIrrigationPlan
} from "@/api/equip";
import addIrrigatePlan from "./addIrrigatePlan"
export default {
  components: {
    addIrrigatePlan
  },
  data() {
    return {
      addShow: false,
      planList: [],
      deleteShow: false,
      headerShow: true,
      device_id: "ff8080817300eb5f017302cbdd790008"
    };
  },
  create() {
  },
  mounted() {
    this.dataLoad();
  },
  methods: {
    //停止、开始计划
    stopPlan(item) {
      console.log(item);
      if (item.status === 2) {
        this.$message({
          message: '该计划已过期，操作失败',
          type: 'warning'
        });
        return;
      }
      const data = {
        strategy_id: item.strategy_id
      };
      if (!item.status) {
       startDeviceIrrigationPlan(data).then(
          res => {
            if (res.code === 200) {
              this.$message({
                message: res.msg,
                type: "success"
              })
              this.dataLoad();
            } else {
              this.$message({
                message: res.msg,
                type: "warning"
              })
            }
          }
        )
      } else {
        this.$confirm('是否停止计划？')
          .then(()=> {
            stopDeviceIrrigationPlan(data).then(
              res => {
                if (res.code === 200) {
                  this.$message({
                    message: res.msg,
                    type: "success"
                  })
                  this.dataLoad();
                }
              }
            );
          })
          .catch(() => {});
      }
    },
    //停灌一次
    stop(item) {
      if (item.status !== 1) {
        this.$message({
          message: "计划已停止或过期，停灌一次失败",
          type: 'warning'
        });
        return;
      }
      if (item.trigger_status === 1 && item.status === 1) {
        this.$message({
          message: "正在实施灌溉中，停灌一次失败",
          type: 'warning'
        });
        return;
      }
      const data = {
        strategy_id: item.strategy_id
      };
      if (item.today_stop_irrigation_status == 1) {
        cancelStopIrrigationOnce(data).then(
          res => {
            if (res.code === 200) {
              this.$message({
                message: res.msg,
                type: 'success'
              });
              this.dataLoad()
            }
          }
        );
      } else {
        stopIrrigationOnce(data).then(res => {
          if (res.code === 200) {
            this.$message({
              message: res.msg,
              type: 'success'
            });
            this.dataLoad()
          }
        });
      }
    },
    handle(type, item) {
      if (type == "del") {
        this.del(item)
      } else {
        const irrigate = this.$refs.addIrrigate
        this.addShow = true;
        //用于计划修改
        this.timeList = [];
        irrigate.active = 1;
        irrigate.name = item.name;
        irrigate.time = item.weeks.split(",");
        irrigate.dataList = item.dayTimes;
        irrigate.startDate = item.startDate;
        irrigate.endDate = item.endDate;
        irrigate.FMresultIDS = item.hd_device_sensor_ids;
        irrigate.FTresultIDS = item.fertilizer_bucket_ids;
        irrigate.strategy_id = item.strategy_id;
        irrigate.detailDuration = item.duration_day;
        irrigate.day_minute = item.day_minute;
        for (let i in irrigate.dataList) {
          irrigate.timeList.push(irrigate.dataList[i].startTime);
          irrigate.timeList.push(irrigate.dataList[i].endTime);
        }
      }
    },
    //删除计划
    del(item) {
      this.$confirm('是否删除计划？')
        .then(() => {
          const data = {
            id: item.strategy_id
          };
          deleteById(data).then(res => {
            if (res.code === 200) {
              this.$message({
                message: res.msg,
                type: "success"
              })
              this.dataLoad();
            }
          });
        });
    },
    //新增计划
    addPlan() {
      this.addShow = true;
      this.$refs.addIrrigate.active = 0
    },
    dataLoad() {
      const data = {
        hd_device_id: this.device_id
      };
      listDeviceIrrigationPlan(data).then(res => {
        if (res.code === 200) {
          for (let i = 0; i < res.data.length; i++) {
            res.data[i].hd_device_sensor_names = res.data[i].hd_device_sensor_names.join(",")
            res.data[i].fertilizer_bucket_names = res.data[i].fertilizer_bucket_names.join(",")
            res.data[i].tempWeeks = res.data[i].weeks.split(",")
            for (let j = 0; j <  res.data[i].tempWeeks.length; j++) { 
              if (res.data[i].tempWeeks[j] == 1) {
                res.data[i].tempWeeks[j] = "周一"
              } else if (res.data[i].tempWeeks[j] == 2) {
                res.data[i].tempWeeks[j] = "周二"
              } else if (res.data[i].tempWeeks[j] == 3) {
                res.data[i].tempWeeks[j] = "周三"
              } else if (res.data[i].tempWeeks[j] == 4) {
                res.data[i].tempWeeks[j] = "周四"
              } else if (res.data[i].tempWeeks[j] == 5) {
                res.data[i].tempWeeks[j] = "周五"
              } else if (res.data[i].tempWeeks[j] == 6) {
                res.data[i].tempWeeks[j] = "周六"
              } else {
                res.data[i].tempWeeks[j] = "周日"
              }
            }
            res.data[i].tempWeeks = res.data[i].tempWeeks.join(",")
          }
          this.planList = res.data;
        }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
</style>
