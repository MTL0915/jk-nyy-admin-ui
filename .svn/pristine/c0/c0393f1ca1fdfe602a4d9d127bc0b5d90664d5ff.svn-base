<template>
  <div style="overflow: hidden;" class="head-container">
    <div style="display: inline-block;float:left">
      <!-- 排产管理 -->
      <div v-show="sup_this.vstate">
        <el-button size="small" type="success" @click="add()">添加</el-button>
        <el-input
          v-model="schedul_query.crop_name"
          clearable
          placeholder="作物名称"
          style="width: 200px;"
          class="filter-item"
          @change="toQuery"
        />
        <el-select
          v-model="schedul_query.plant_time_quantum"
          multiple
          placeholder="选择种植时间"
          clearable
          collapse-tags
          @change="toQuery"
        >
          <el-option
            v-for="item in plant_time_quantum_options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-date-picker
          v-model="schedul_query.plant_time"
          size="small"
          format="yyyy年MM月dd日"
          value-format="yyyy-MM-dd"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="toQuery()"
        />
      </div>
      <!-- 计划表 -->
      <div v-show="!sup_this.vstate">
        <el-input
          v-model="plan_query.crop_name"
          clearable
          placeholder="作物名称"
          style="width: 200px;"
          class="filter-item"
          @keyup.enter.native="toQuery"
        />
        <el-date-picker
          v-model="plan_query.plant_time"
          size="small"
          format="yyyy年MM月"
          value-format="yyyy-MM"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="toQuery()"
        />
      </div>
      <!-- <el-select v-model="plan_query.plant_time_type" multiple placeholder="选择地块" style="width:150px;" clearable @change="toQuery">
        <el-option
          v-for="item in plant_time_options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select> -->
    </div>
    <div style="text-align:right;margin-right:10px">
      <!-- <el-button size="small" type="primary" @click="apsChange()">{{ sup_this.vstate?'计划表':'排产管理' }}</el-button> -->
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    schedul_query: {
      type: Object,
      required: true
    },
    plan_query: {
      type: Object,
      required: true
    },
    sup_this: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      plant_time_quantum: null,
      plant_time_quantum_options: [
        {
          label: "历史种植",
          value: "1"
        },
        {
          label: "当前种植",
          value: "2"
        },
        {
          label: "计划种植",
          value: "3"
        }
      ]
    };
  },
  created() {
    this.$nextTick(() => {
      var year = new Date().getFullYear();
      var array = [];
      array.push(year + "-01-01");
      array.push(year + "-12-31");
      this.$set(this.schedul_query, "plant_time", array);
      this.$set(this.plan_query, "plant_time", array);
      this.toQuery();
    });
  },
  methods: {
    toQuery() {
      var start_time = "";
      var end_time = "";
      if (this.sup_this.vstate) {
        // 排产
        var quantum = "";
        if (this.schedul_query.plant_time_quantum !== null) {
          this.schedul_query.plant_time_quantum.forEach(element => {
            quantum = quantum + element + ",";
          });
        }
        if (this.schedul_query.plant_time) {
          start_time = this.schedul_query.plant_time[0];
          end_time = this.schedul_query.plant_time[1];
        }
        this.sup_this.$refs.schedul.rs_facilities_ids = null;
        this.sup_this.$refs.schedul.crop_name = this.schedul_query.crop_name;
        this.sup_this.$refs.schedul.quantum = quantum;
        this.sup_this.$refs.schedul.plant_start_time = start_time;
        this.sup_this.$refs.schedul.plant_end_time = end_time;
        this.sup_this.$refs.schedul.page = 1;
        this.sup_this.$refs.schedul.getData();
      } else {
        // 计划
        if (this.plan_query.plant_time) {
          start_time = this.plan_query.plant_time[0];
          end_time = this.plan_query.plant_time[1];
        } else {
          // 时间不能为空
          return;
        }
        // this.sup_this.$refs.plan.rs_facilities_ids = null
        this.sup_this.$refs.plan.crop_name = this.plan_query.crop_name;
        this.sup_this.$refs.plan.plant_start_time = start_time;
        this.sup_this.$refs.plan.plant_end_time = end_time;
        this.sup_this.$refs.plan.page = 1;

        var start_time_year = parseInt(start_time.substring(0, 4));
        var start_time_month = parseInt(start_time.substring(5, 7));
        var end_time_year = parseInt(end_time.substring(0, 4));
        var end_time_month = parseInt(end_time.substring(5, 7));
        var array1 = [];
        var array2 = [];
        var lastYear = start_time_year;
        while (
          start_time_year < end_time_year ||
          start_time_month <= end_time_month
        ) {
          if (lastYear !== start_time_year) {
            array1.push({
              year: lastYear,
              month: array2
            });
            array2 = []; // 清空array2
          }
          // 将月份存入到array2
          array2.push(start_time_month);
          start_time_month++;
          // 超过12月进行年月处理
          if (start_time_month > 12) {
            start_time_month = 1;
            start_time_year++;
          }
        }
        array1.push({
          year: lastYear,
          month: array2
        });
        this.sup_this.$refs.plan.getData();
      }
    },
    add() {
      this.sup_this.dialogTitle = "新增";
      this.sup_this.dialogVisible = true;
      this.$nextTick(() => {
        this.sup_this.$refs.apsAddEdit.resetForm();
      });
    },
    apsChange() {
      this.sup_this.vstate = !this.sup_this.vstate;
    }
  }
};
</script>
