<template>
  <!-- 虫情识别饼图 -->
  <div style="height:100%;margin:0;padding:0">
    <div style="height: calc(100% - 40px)">
      <v-chart
        style="width:100%;height:100%"
        :options="option"
        :autoresize="true"
      />
    </div>
  </div>
</template>
<script>
import { recognitionGroup } from "@/api/recognition";
import "echarts/lib/chart/line";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/polar";
import "echarts/lib/component/legend";
import "echarts/lib/component/title.js";

export default {
  props: {
    hd_device_ids: {
      type: String,
      default: null
    },
    device_ids: {
      type: String,
      default: null
    },
    bs_base_id: {
      type: String,
      default: null
    },
    rs_facilities_id: {
      type: String,
      default: null
    },
    startTime: {
      default: null,
      type: String
    },
    endTime: {
      default: null,
      type: String
    }
  },
  watch: {
    bs_base_id: {
      handler: function () {
        if (this.flag) {
          this.recognitionGroup();
        }
      },
      immediate: true
    },
    rs_facilities_id: {
      handler: function () {
        if (this.flag) {
          this.recognitionGroup();
        }
      },
      immediate: true
    },
    hd_device_ids: {
      handler: function () {
        if (this.flag) {
          this.recognitionGroup();
        }
      },
      immediate: true
    },
    device_ids: {
      handler: function () {
        if (this.flag) {
          this.recognitionGroup();
        }
      },
      immediate: true
    },
    startTime: {
      handler: function () {
        if (this.flag) {
          this.recognitionGroup();
        }
      },
      immediate: true
    },
    endTime: {
      handler: function () {
        if (this.flag) {
          this.recognitionGroup();
        }
      },
      immediate: true
    }
  },
  data () {
    return {
      flag: true,
      option: {},
      colors: [
        '#22EE87',
        '#FCCF31',
        '#51B7FF',
        '#FD6585',
        '#018871',
        '#FFFF0D',
        '#1CAAE5',
        '#C91739',
        '#36FC89',
        '#B252F7',
      ],
    };
  },
  created () { },
  methods: {
    recognitionGroup () {
      this.flag = false;
      recognitionGroup({
        bs_base_id: this.bs_base_id || this.$store.state.baseinfo.cur_base_id,
        rs_facilities_id: this.rs_facilities_id,
        hd_device_ids: this.hd_device_ids,
        device_ids: this.device_ids,
        timeGroup: null,
        deviceGroup: null,
        nameGroup: true,
        startTime: this.startTime,
        endTime: this.endTime,
      }).then(res => {
        this.flag = true;
        if (res.code === 200) {
          this.option = {};
          const dataList = []
          for (let i = 0; i < res.data.length; i++) {
            const rData = res.data[i];
            dataList.push({
              name: rData._id.name,
              value: rData.totalNum,
              itemStyle: { color: this.colors[i % 10] }
            })
          }
          this.option = Object.assign(
            {},
            {
              // title: {
              //   text: '占比情况'
              // },
              tooltip: {
                trigger: 'item'
              },
              legend: {
                top: '5%',
                left: 'center'
              },
              series: [
                {
                  type: 'pie',
                  radius: ['40%', '60%'],
                  avoidLabelOverlap: false,
                  itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                  },
                  label: {
                    show: false,
                    position: 'center'
                  },
                  emphasis: {
                    label: {
                      show: true,
                      fontSize: '22',
                      fontWeight: 'bold'
                    }
                  },
                  labelLine: {
                    show: false
                  },
                  data: dataList
                }
              ]
            }
            // {
            //   title: {
            //     text: '占比情况'
            //   },
            //   // tooltip: {
            //   //   trigger: 'item',
            //   //   formatter: '{b} : {c} ({d}%)'
            //   // },
            //   legend: {
            //     top: 'bottom'
            //   },

            //   series: [
            //     {
            //       type: 'pie',
            //       radius: [50, 75],
            //       center: ['50%', '50%'],
            //       //roseType: 'area',
            //       itemStyle: {
            //         borderRadius: 8
            //       },
            //       label: {
            //         show: false,
            //         position: 'center'
            //       },
            //       data: dataList
            //     }
            //   ]
            // }
          );
        } else {
          this.$message.error(res.msg);
        }
      });
    }
  }
}
</script>
