<template>
  <div class="addPlantBox">
    <div style="position: absolute;top: 34px;right: 33px;">
      <a
        style="color:#5b5bca"
        href="javascript:window.history.back()"
      >返回</a>
    </div>

    <div>
      <el-form
        :model="form"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <p class="title">基本信息</p>
        <div class="infoForm">
          <el-row>
            <el-col :span="12">
              <el-form-item label="生产地块">
                <el-select
                  size="medium"
                  v-model="form.rs_facilities_id"
                  placeholder="请选择"
                >
                  <el-option
                    :label="item.name"
                    :value="item.id"
                    v-for="(item, index) in rs_facilitiesList"
                    :key="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                size="medium"
                label="档案名称"
              >
                <el-input
                  size="medium"
                  v-model="form.name"
                  style="width:240px"
                  placeholder="名称"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item
                size="medium"
                label="农产品分类"
                style="display:inline-block"
              >
                <datacascader
                  ref="datacascader"
                  :buttonShow="false"
                  :cascaderChange="cascaderChange"
                  :form="form"
                  :disabled="changeDisabled"
                />
              </el-form-item>
              <el-form-item
                size="medium"
                label="品种"
                label-width="50px"
                style="display:inline-block"
              >
                <el-select
                  size="medium"
                  v-model="form.agroProductBreedId"
                  placeholder="请选择"
                  :disabled="changeDisabled"
                >
                  <el-option
                    :label="item.name"
                    :value="item.id"
                    v-for="(item, index) in agroProductBreedList"
                    :key="item.id"
                  ></el-option>
                </el-select>

              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="质量认证">
                <el-select
                  size="medium"
                  v-model="form.authentication"
                  placeholder="请选择"
                >
                  <el-option
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                    v-for="item  in authenticationType"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item
                size="medium"
                label="生产开始时间"
              >
                <el-date-picker
                  v-model="form.produceStartTime"
                  type="date"
                  @change="produceStartTimeChange"
                  placeholder="日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                size="medium"
                label="生产结束时间"
              >
                <el-date-picker
                  v-model="form.produceEndTime"
                  @change="produceEndTimeChange"
                  type="date"
                  placeholder="日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item
                size="medium"
                label="播种日期"
              >
                <el-date-picker
                  v-model="form.seedTime"
                  type="date"
                  placeholder="日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                size="medium"
                label="定植日期"
              >
                <el-date-picker
                  v-model="form.plantTime"
                  type="date"
                  placeholder="日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="占地面积(亩)">
                <el-input
                  size="medium"
                  v-model="form.produceArea"
                  style="width:120px"
                  placeholder="面积"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="生产规模">
                <el-input
                  size="medium"
                  v-model="form.produceScale"
                  style="width:120px"
                  placeholder="规模"
                ></el-input>
                <el-select
                  size="medium"
                  v-model="form.scaleUnit"
                  style="width:120px"
                  placeholder="规模单位"
                >
                  <el-option
                    :label="item.name"
                    :value="item.value"
                    v-for="(item, index) in unitType"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <p class="title">生长周期</p>
        <div>
          <el-table
            :data="this.form.agroProduceArchiveCycleDTOs"
            style="width: 90%;margin:0 auto;"
          >
            <el-table-column
              label="图标"
              width="180"
            >
              <template slot-scope="scope">
                <img
                  :src="getImage(scope.row.imagePath)"
                  min-width="60"
                  height="60"
                >
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="名称"
            >
            </el-table-column>
            <el-table-column label="展示颜色">
              <template slot-scope="scope">
                <el-color-picker
                  v-model="scope.row.color"
                  size="mini"
                ></el-color-picker>
              </template>
            </el-table-column>
            <el-table-column label="开始时间">
              <template slot-scope="scope">
                <el-date-picker
                  v-model="scope.row.startTime"
                  size="mini"
                  type="date"
                  placeholder="日期"
                >
                </el-date-picker>
              </template>
            </el-table-column>
            <el-table-column label="结束时间">
              <template slot-scope="scope">
                <el-date-picker
                  v-model="scope.row.endTime"
                  size="mini"
                  type="date"
                  placeholder="日期"
                  @change="cycleEndTimeChange(scope.row.endTime,scope.$index)"
                >
                </el-date-picker>
              </template>
            </el-table-column>

            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  type="success"
                  size="mini"
                  @click="showEnvConfig(scope.row)"
                >生长环境配置</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div style="text-align:center;margin-top:10px">
          <el-button
            size="medium"
            type="info"
            @click="back()"
            style="margin-right:50px"
          >返回</el-button>

          <el-button
            size="medium"
            v-show="form.id"
            type="danger"
            @click="delArchive()"
            style="margin-right:50px"
          >删除</el-button>

          <el-button
            size="medium"
            :loading="loading"
            type="primary"
            @click="doSubmit"
          >确认</el-button>
        </div>
      </el-form>
    </div>
    <produce_env ref="produceenv" />
  </div>
</template>
<script>
import { findByBs_base_id as findRs_facilitiesListByBs_base_id } from '@/api/rs_facilities'

import { findByAgroProductClassificationId as findBreedByAgroProductClassificationId } from '@/api/agroProductBreed'
import { findByAgroProductClassificationId as findProductCycleByAgroProductClassificationId } from '@/api/agroProductCycle'
import { findByAgroProductCycleId as findEnvByAgroProductCycleId } from '@/api/agroProductEnv'

import { addOrEdit as addOrEdit, get as get, del as delArchiveById } from '@/api/agroProduceArchive'

import { del, batchDel } from '@/api/agroProductEnv'

import datacascader from '@/views/base/archive/agro/module/datacascader'
import { getImage } from '@/utils/image_util'
import produce_env from '@/views/base/archive/produce_env/index'
export default {
  components: { datacascader, produce_env },
  data () {
    return {
      loading: false,
      cur_base_id: '',
      rs_facilitiesList: [],
      agroProductBreedList: [],
      agroProduceArchiveId: '',
      changeDisabled: false,
      form: {
        id: '',
        rs_facilities_id: "",
        agroProductClassificationId: "",
        name: "",
        agroProductBreedId: "",
        authentication: 1,
        produceStartTime: '',
        produceEndTime: '',
        plantTime: '',
        seedTime: '',
        produceArea: 0,
        produceScale: 0,
        scaleUnit: '亩',
        agroProduceArchiveCycleDTOs: [
        ],
      },
      authenticationType: [
        { name: "有机", value: 1 },
        { name: "绿色", value: 2 },
        { name: "无公害", value: 3 },
      ],
      unitType: [
        { name: "亩", value: "亩" },
        { name: "头", value: "头" },
        { name: "只", value: "只" },
        { name: "条", value: "条" },
        { name: "其它", value: "其它" },
      ]
    }
  },
  activated () {
    var agroProduceArchiveId = this.$route.query.agroProduceArchiveId;
    this.agroProduceArchiveId = agroProduceArchiveId;

    get(agroProduceArchiveId).then(res => {
      if (res.code === 200) {
        this.form = res.data;
        this.changeDisabled = true;
        this.$refs.datacascader.initValue(this.form.agroProductClassificationId);
      }
    });
  },
  created () {
    this.cur_base_id = this.$store.state.baseinfo.cur_base_id;
    this.getRs_facilitiesList();
  },
  methods: {
    getImage: getImage,
    produceStartTimeChange (value) {
      if (this.form.agroProduceArchiveCycleDTOs == undefined || this.form.agroProduceArchiveCycleDTOs.length == 0) {
        return;
      }
      this.$confirm('是否自动生成生长周期时间?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.renderCycleTimeByDay();
      })

    },
    produceEndTimeChange (value) {
      if (this.form.agroProduceArchiveCycleDTOs == undefined || this.form.agroProduceArchiveCycleDTOs.length == 0) {
        return;
      }

      this.$confirm('是否按比例生成生长周期时间?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.renderCycleTimeByRatio();
      }).catch(() => {
        var len = this.form.agroProduceArchiveCycleDTOs.length;
        if (this.form.agroProduceArchiveCycleDTOs[len - 1].endTime == false) {
          this.form.agroProduceArchiveCycleDTOs[len - 1].endTime = value;
        }
      })


    },

    cycleEndTimeChange (value, index) {
      var isDate = value instanceof Date;
      if (isDate === false) {
        return;
      }
      if (this.form.agroProduceArchiveCycleDTOs == undefined || this.form.agroProduceArchiveCycleDTOs.length == 0) {
        return;
      }

      var len = this.form.agroProduceArchiveCycleDTOs.length;
      if (index == (len - 1)) {
        return;
      }

      var startTime = new Date(value.getTime() + 3600000 * 24);
      if (this.form.agroProduceArchiveCycleDTOs[index + 1].startTime == false) {
        this.form.agroProduceArchiveCycleDTOs[index + 1].startTime = startTime
      }
      if (this.form.agroProduceArchiveCycleDTOs[index + 1].endTime == false) {
        this.form.agroProduceArchiveCycleDTOs[index + 1].endTime = startTime
      }
    },
    showEnvConfig (row) {
      var agroProduceArchiveEnvDTOs = row.agroProduceArchiveEnvDTOs;
      this.$refs.produceenv.showDialog(row.id, row.agroProductEnvId, agroProduceArchiveEnvDTOs);
    },
    delArchive () {
      this.$confirm('是否删除该种植档案?', '确认删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delArchiveById(this.form.id).then(res => {
          if (res.code === 200) {
            this.$router.push({ path: '/agroProduceArchive/plantFile', query: { refresh: true } })
          } else {
            this.$message({
              type: 'error',
              message: res.msg
            });
          }
        })
      });
    },
    doSubmit () {
      if (!this.form.name) {
        this.$message.error("请输入档案名称！");
        return;
      }
      if (!this.form.rs_facilities_id) {
        this.$message.error("请选择地块！");
        return;
      }
      if (!this.form.agroProductClassificationId) {
        this.$message.error("请选择农产品分类！");
        return;
      }

      if (!this.form.agroProductBreedId) {
        this.$message.error("请选择农产品品种！");
        return;
      }
      if (!this.form.authentication) {
        this.$message.error("请选择质量认证！");
        return;
      }
      if (!this.form.produceStartTime) {
        this.$message.error("请选择生产开始时间！");
        return;
      }
      if (!this.form.produceEndTime) {
        this.$message.error("请选择生产结束时间！");
        return;
      }

      var produceEndTimeDate = new Date(this.form.produceEndTime);
      var produceStartTimeDate = new Date(this.form.produceStartTime);
      if (produceEndTimeDate < produceStartTimeDate) {
        this.$message.error("生产结束时间需大于生产开始时间！");
        return;
      }

      if (this.form.seedTime) {
        var seedTimeDate = new Date(this.form.seedTime);
        if (seedTimeDate > produceEndTimeDate || seedTimeDate < produceStartTimeDate) {
          this.$message.error("播种时间需位于生产开始时间与生产结束时间之间！");
          return;
        }
      }

      if (this.form.plantTime) {
        var plantTimeDate = new Date(this.form.plantTime);
        if (plantTimeDate > produceEndTimeDate || plantTimeDate < produceStartTimeDate) {
          this.$message.error("定值时间需位于生产开始时间与生产结束时间之间！");
          return;
        }
      }


      this.loading = true;
      addOrEdit(this.form).then(res => {
        this.loading = false;
        if (res.code === 200) {
          this.$router.push({ path: '/agroProduceArchive/plantFile', query: { refresh: true } })
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    cascaderChange (agroProductClassificationId) {
      this.form.agroProductClassificationId = agroProductClassificationId;
      this.getAgroProductBreedList(agroProductClassificationId);

      if (this.changeDisabled == false) {
        this.getProductCycleList(agroProductClassificationId);
      }
    },
    // 渲染生长周期时间
    renderCycleTime () {
      if (this.form.produceStartTime == false) {
        this.form.produceStartTime = new Date();
      }

      this.renderCycleTimeByDay();
    },
    renderCycleTimeByRatio () {
      var produceStartTime = this.form.produceStartTime;
      var produceEndTime = this.form.produceEndTime;

      if (produceStartTime == false || produceEndTime == false) {
        return;
      }
      if (produceStartTime >= produceEndTime) {
        this.$message.error("生产开始时间不能大于生产结束时间");
        return
      }
      var totalDay = 0;
      var agroProduceArchiveCycleDTOs = this.form.agroProduceArchiveCycleDTOs;
      agroProduceArchiveCycleDTOs.forEach((item) => { totalDay += item.day })



      var cycleStartTime = produceStartTime;
      var cycleEndTime = produceStartTime;
      var durationDay = this.getDurationDay(produceStartTime, produceEndTime);

      for (var i = 0, len = agroProduceArchiveCycleDTOs.length; i < len; i++) {
        var day = agroProduceArchiveCycleDTOs[i].day;

        if (i == 0) {
          cycleStartTime = cycleEndTime;
        }
        var nowDay = parseInt(day / totalDay * durationDay)

        cycleEndTime = new Date(cycleStartTime.getTime() + nowDay * 24 * 3600 * 1000);
        if (cycleEndTime > produceEndTime) {
          cycleEndTime = produceEndTime;
        }

        agroProduceArchiveCycleDTOs[i].startTime = cycleStartTime;
        agroProduceArchiveCycleDTOs[i].endTime = cycleEndTime

        cycleStartTime = new Date(cycleEndTime.getTime() + 24 * 3600 * 1000);
      }

    },

    getDurationDay (date1Obj, date2Obj) {
      var t1 = date1Obj.getTime();
      var t2 = date2Obj.getTime();
      var dateTime = 1000 * 60 * 60 * 24; //每一天的毫秒数
      var minusDays = Math.floor(((t2 - t1) / dateTime));//计算出两个日期的天数差
      var days = Math.abs(minusDays);//取绝对值
      return days;
    },
    renderCycleTimeByDay () {

      var agroProduceArchiveCycleDTOs = this.form.agroProduceArchiveCycleDTOs;
      var cycleStartTime = this.form.produceStartTime;
      if (cycleStartTime == false) {
        return;
      }
      var cycleEndTime = this.form.produceStartTime;
      for (var i = 0, len = agroProduceArchiveCycleDTOs.length; i < len; i++) {
        var day = agroProduceArchiveCycleDTOs[i].day;
        if (i == 0) {
          cycleStartTime = cycleEndTime;
        }
        cycleEndTime = new Date(cycleStartTime.getTime() + day * 24 * 3600 * 1000);

        agroProduceArchiveCycleDTOs[i].startTime = cycleStartTime;
        agroProduceArchiveCycleDTOs[i].endTime = cycleEndTime

        cycleStartTime = new Date(cycleEndTime.getTime() + 24 * 3600 * 1000);
      }

      this.form.produceEndTime = cycleEndTime;
    },
    // 获取生长周期列表
    getProductCycleList (agroProductClassificationId) {

      findProductCycleByAgroProductClassificationId(agroProductClassificationId).then(async res => {
        if (res.code === 200) {
          this.form.agroProduceArchiveCycleDTOs = [];

          var datas = res.data.content;
          for (var i = 0, len = datas.length; i < len; i++) {
            var agroProduceArchiveCycleDTO = {
              "id": "",
              "agroProduceArchiveId": this.form.id,
              "agroProductCycleId": datas[i].id,
              "color": datas[i].color,
              "name": datas[i].name,
              "imagePath": datas[i].imagePath,
              "day": datas[i].day,
              "startTime": "",
              "endTime": ""
            }

            await this.getAgroProduceArchiveEnvDTOs(datas[i].id).then(agroProduceArchiveEnvDTOs => {
              agroProduceArchiveCycleDTO.agroProduceArchiveEnvDTOs = agroProduceArchiveEnvDTOs;
            });
            this.form.agroProduceArchiveCycleDTOs.push(agroProduceArchiveCycleDTO);
          }

        }
      }).then(res => {
        this.renderCycleTime();
      });
    },
    async getAgroProduceArchiveEnvDTOs (agroProductCycleId) {
      var agroProduceArchiveEnvDTOs = [];
      await findEnvByAgroProductCycleId(agroProductCycleId).then(res => {

        if (res.code === 200) {
          var datas = res.data.content;
          for (var i = 0, len = datas.length; i < len; i++) {
            var agroProduceArchiveEnvDTO = {
              "agroProduceArchiveCycleId": "",
              "agroProduceArchiveCycleName": "",
              "agroProductEnvId": datas[i].id,
              "agroProductEnvName": "",
              "hd_sensor_type_function_id": datas[i].hd_sensor_type_function_id,
              "hd_sensor_type_function_name": datas[i].hd_sensor_type_function_name,
              "id": "",
              "name": datas[i].name,
              "suitLower": datas[i].suitLower,
              "suitUpper": datas[i].suitUpper,
              "type": datas[i].type,
              "warnLower": datas[i].warnLower,
              "warnUpper": datas[i].warnUpper
            }

            agroProduceArchiveEnvDTOs.push(agroProduceArchiveEnvDTO);
          }
        }
      });
      return agroProduceArchiveEnvDTOs;
    },
    getRs_facilitiesList () {
      findRs_facilitiesListByBs_base_id({
        'bs_base_id': this.cur_base_id
      }).then(res => {
        if (res.code === 200) {
          this.rs_facilitiesList = res.data
        }
      })
    },
    getAgroProductBreedList (agroProductClassificationId) {
      findBreedByAgroProductClassificationId(agroProductClassificationId).then(res => {
        if (res.code === 200) {
          this.agroProductBreedList = res.data.content;
        }
      });
    },
    back () {
      // this.$router.go(-1);
      this.$router.push({ path: '/agroProduceArchive/plantFile', query: { refresh: true } })
    }
  }
}
</script>
<style lang="stylus" scoped>
.addPlantBox
  background #fff
  padding 10px

.title
  font-size 16px
  padding-bottom 10px

.infoForm
  padding 20px 100px
</style>