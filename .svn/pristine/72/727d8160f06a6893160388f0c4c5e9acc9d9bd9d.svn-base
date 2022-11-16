<template>

  <div
    id="bodyDiv"
    style="display: flex;"
  >
    <!-- <div v-show="led_rows === 0">正在获取LED屏数据...请稍后</div> -->
    <div
      style="width:500px;height:100%;"
      v-if="!preview"
    >
      <div style="justify-content: space-between;display:flex;margin-bottom: 5px;">
        <div>
          刷新间隔:<el-select
            size="mini"
            v-model="interval"
            style="width:100px;"
            placeholder="选择刷新间隔"
          >
            <el-option
              v-for="item in intervalOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          &nbsp;&nbsp;&nbsp;
          每页停留:
          <el-input
            v-model="pageTime"
            style="width:80px;"
            size="mini"
          />秒
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <el-button
            type="primary"
            size="mini"
            @click="initWidthHeight"
          >
            重置宽高
          </el-button>
        </div>
      </div>
      <div style="display: flex;margin-top:10px">
        <el-select
          v-model="type_value"
          placeholder="请选择"
          style="width:200px;"
          size="mini"
          @change="changeType"
        >
          <el-option
            v-for="item in type_options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-cascader
          v-model="sensorIds"
          :options="deviceData"
          :collapse-tags="true"
          size="mini"
          :props="{expandTrigger:'hover', multiple: true,label:'name',value:'id' }"
          placeholder="请选择或搜索传感器"
          clearable
          style="margin-left:5px;margin-right:5px;width:100%"
        />
        <el-button
          @click="getSensorData('value')"
          size="mini"
        >获取数据</el-button>
        <el-button
          @click="getSensorData('time')"
          size="mini"
        >获取采集时间</el-button>
      </div>
      <!-- 输入框 -->
      <el-input
        @input="changeInput"
        style="margin-top:10px;"
        ref="textArea"
        :rows="led_rows"
        v-model="inputText"
        size="mini"
        type="textarea"
      />
      <!-- 翻页 -->
      <div class="block">
        <el-pagination
          v-show="total !== 0"
          :page-size="1"
          :total="total"
          :current-page="pageNo"
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
        />
      </div>
      <div style="width: 100%;text-align: center;padding-top: 20px;">
        <el-button
          type="primary"
          size="mini"
          @click="ledCreate"
        >预览</el-button>
        <el-button
          :disabled="!saveAble || !online"
          type="success"
          size="mini"
          @click="save"
        >保存</el-button>
      </div>
    </div>
    <!-- LED -->
    <div
      ref="ledDiv"
      :style="{width:led_width,height:led_height,fontSize:led_font_size,lineHeight:led_line_height}"
      style="margin-left:10px;color:#F00;background:#000;overflow: hidden;"
    >
      <pre ref="ledShow" />
    </div>
  </div>
</template>

<script>
import { getPara, setPara } from '@/utils/websocket_util'
import { getById } from '@/api/hd_device_sensor'
import { saveLED } from '@/api/device'
import { encode64gb2312, decode64gb2312 } from '@/utils/base64gb2312'
import { getUserSensorTypeByBaseId, getFacilitiesDeviceSensorByBaseId, getDeviceSensorByBaseId } from '@/api/report'

export default {
  encode64gb2312,
  decode64gb2312,
  components: {

  },
  props: {
    communication: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      preview: false,//预览模式
      online: false,//设备是否在线
      failNo: [],
      saveAble: true,
      saveSingleAble: true,
      needSend: [],
      refreshInterval: '',
      inputText: '',
      dialogVisible: false,
      hd_device_id: '',
      original_width: 0,
      original_height: 0,
      original_font_size: 0,
      led_width: '150px',
      led_height: '100px',
      led_font_size: '15px',
      led_line_height: '20px',
      led_row_charnum: 0,
      led_rows: 0,
      pageTime: 10,//每页停留时间
      total: 0,
      textarea: '',
      totalpage: null,
      contentList: [],
      pageNo: 0,
      type_value: '2',
      type_options: [{
        label: '按地块',
        value: '1'
      }, {
        label: '按设备',
        value: '2'
      }, {
        label: '按传感器',
        value: '3'
      }],
      sensorIds: [],
      deviceData: [],
      interval: 0,
      intervalOptions: [{
        value: 0,
        label: '永不刷新'
      }, {
        value: 300,
        label: '5分钟'
      }, {
        value: 600,
        label: '10分钟'
      }, {
        value: 1200,
        label: '20分钟'
      }, {
        value: 1800,
        label: '30分钟'
      }, {
        value: 3600,
        label: '1小时'
      }]
    }
  },
  created () {
    this.changeType()
  },
  methods: {
    initWidthHeight () {
      getPara(this.hd_device_id, this.$ws).then(res => {
        if (res.code === 200) {
          this.changeLedDiv(res.data.led_width, res.data.led_height)
        }
      }).catch(err => {
        this.$message.error('重置宽高失败!')
      })
    },
    changeInput () {
      if (this.needSend.length !== 0) {
        this.needSend = []
      }
    },
    getSensorData (type) {
      this.addSensor(this.sensorIds, type)
    },
    // 增加传感器数据 type: 数据/时间
    // name            传感器名称
    // value           传感器的值
    // unit            传感器单位
    // time            传感器采集时间
    // device_id       设备序列号
    // hd_device_name  设备名称
    addSensor (data, type) {
      // 截取传感器ID数组
      // var regex = /[^\{\)]+(?=\})/g
      // var oldSensorList = this.inputText.match(regex)
      // if (!oldSensorList) { oldSensorList = [] }
      var oldSensorList = []// 直接新增
      var index = []
      for (var i = 0; i < this.sensorIds.length; i++) {
        var id = this.sensorIds[i][this.sensorIds[i].length - 1]
        for (var j = 0; j <= oldSensorList.length; j++) {
          if (j === oldSensorList.length) { // 无此传感器,进行新增
            if (type === 'value') {
              this.inputText = this.inputText + '{' + id + ',name+\'  \'+value+unit}' + '\n'
            } else if (type === 'time') {
              this.inputText = this.inputText + '{' + id + ',time}' + '\n'
            }
            break
          }
          if (id === oldSensorList[j]) {
            index.push(j)
            break
          }
        }
      }
      // index数组中不存在的元素进行移除
      // for (var k = 0; k < oldSensorList.length; k++) {
      //   for (var z = 0; z <= index.length; z++) {
      //     if (z === index.length) { // 不存在 -进行移除
      //       // this.inputText = this.inputText.replace('{' + oldSensorList[k] + '}', '')
      //       break
      //     }
      //     if (k === index[z]) { // 存在 -不处理
      //       break
      //     }
      //   }
      // }
    },
    // 选择筛选传感器方式
    changeType () {
      this.sensorIds = []
      if (this.type_value === '1') {
        getFacilitiesDeviceSensorByBaseId({ bs_base_id: this.$store.state.baseinfo.cur_base_id }).then(res => {
          this.deviceData = res.data
        }).catch({})
      } else if (this.type_value === '2') {
        getDeviceSensorByBaseId({ bs_base_id: this.$store.state.baseinfo.cur_base_id }).then(res => {
          this.deviceData = res.data
        }).catch({})
      } else if (this.type_value === '3') {
        getUserSensorTypeByBaseId({ bs_base_id: this.$store.state.baseinfo.cur_base_id }).then(res => {
          this.deviceData = res.data
        }).catch({})
      } else {
        getFacilitiesDeviceSensorByBaseId({ bs_base_id: this.$store.state.baseinfo.cur_base_id }).then(res => {
          this.deviceData = res.data
        }).catch({})
      }
    },
    async saveSingle () {
      this.saveAble = false
      this.saveSingleAble = false
      await setPara(this.hd_device_id, {
        uploadInter: 10,
        pageTime: this.pageTime,
        totalpage: this.contentList.length,
        pageNo: this.pageNo,
        pageContent: encode64gb2312(this.contentList[this.pageNo - 1])
      }, this.$ws).then(res => {
        if (res.code === 200) {
          this.$message.success('第' + (this.pageNo) + '屏保存成功!')
          for (var i = 0; i < this.needSend.length; i++) {
            if (this.pageNo === this.needSend[i]) {
              this.needSend.splice(i, 1)
              break
            }
          }
        }
      }).catch(err => {
        err.msg
        this.$message.error('第' + (this.pageNo) + '屏发送失败,请重试!')
      })
      this.saveDatabase()
    },
    // 保存按钮
    async save () {
      if (!this.pageTime) {
        this.pageTime = 10
      }
      if (!this.interval) {
        this.interval = 600
      }
      this.saveAble = false
      this.saveSingleAble = false
      await this.textChange(this.inputText)
      //保存失败再点击保存时，只重发失败的几屏
      if (this.needSend.length !== 0) {
        for (var ii = this.needSend.length - 1; ii >= 0; ii--) {
          await setPara(this.hd_device_id, {
            uploadInter: 10,
            pageTime: this.pageTime,
            totalpage: this.contentList.length,
            pageNo: this.needSend[ii],
            pageContent: encode64gb2312(this.contentList[this.needSend[ii] - 1])
          }, this.$ws).then(res => {
            if (res.code === 200) {
              this.needSend.splice(ii, 1)
            } else {
            }
          }).catch(err => {
            err.msg
          })
        }
      } else {
        //-------------- 整体保存-------------------
        this.needSend = []
        // 上传到展示板
        for (var i = 0; i < this.contentList.length; i++) {
          await setPara(this.hd_device_id, {
            uploadInter: 10,
            pageTime: this.pageTime,
            totalpage: this.contentList.length,
            pageNo: i + 1,
            pageContent: encode64gb2312(this.contentList[i])
          }, this.$ws).then(res => {
            if (res.code === 200) {
              console.log('第' + (i + 1) + '屏保存成功!')
              // this.$message.success('第' + (i + 1) + '屏保存成功!')
            } else {
              this.needSend.push(i + 1)
            }
          }).catch(err => {
            err.msg
            this.needSend.push(i + 1)
          })
        }
      }
      this.saveDatabase()
    },
    // 保存到数据库
    saveDatabase () {
      if (this.needSend.length === 0) { // 全部屏成功发送
        // id //内容 //刷新间隔//宽 高 字体大小
        saveLED({
          hd_device_id: this.hd_device_id,
          content: this.inputText,
          interval: this.interval,
          led_width: this.original_width,
          led_height: this.original_height,
          led_font_size: this.original_font_size,
          pageTime: this.pageTime
        }).then(res => {
          if (res.code === 200) {
            this.$message.success('保存成功')
          } else {
            this.$message.error(res.msg)
          }
        })
      } else {
        var str = ''
        this.needSend.forEach(element => {
          str = str + '[' + element + '] '
        })
        //this.$message.error(str + '屏仍未保存成功!请进行单屏保存')
        this.$message.error('一些页面未保存成功,请继续保存')
      }
      this.saveAble = true
      this.saveSingleAble = true
    },
    // 翻页
    handleCurrentChange (val) {
      this.pageNo = val
      this.$refs.ledShow.textContent = this.contentList[val - 1]
    },
    // 预览
    ledCreate () {
      this.textChange(this.inputText)
    },
    getTime (time = +new Date()) {
      var date = new Date(time + 8 * 3600 * 1000) // 增加8小时
      return date.toJSON().substr(0, 19).replace('T', ' ')
    },
    // *************** 文本转换 *********************
    async textChange (inputText) { // async
      const _this = this
      var text = inputText
      // 截取传感器ID数组，进行替换操作
      var regex = /[^\{\)]+(?=\})/g
      var sensorList = text.match(regex)
      if (sensorList) {
        for (var t = 0; t < sensorList.length; t++) {
          var ss = sensorList[t].split(',');
          var sensor_id = ss[0];
          var words = ss[1].split('+');
          await getById({ hd_device_sensor_id: sensor_id }).then(res => { // await
            if (res.code === 200) {
              var result = res.data
              if (result === null) {
                this.$message.error(sensor_id + '传感器不存在!')
                return
              }
              // for (var i = 0; i < sensorList.length; i++) {
              if (sensor_id === result.id) {
                var replaceStr = ''
                words.forEach(word => {
                  if (word.indexOf('\'') !== -1) {
                    replaceStr = replaceStr + word.substring(1, word.length - 1)
                  } else {
                    if (word === 'unit') {
                      replaceStr = replaceStr + result['hd_sensor_type_unit']
                    } else if (word === 'time') {
                      replaceStr = replaceStr + _this.getTime(result['system_response_time'])
                    } else if (word === 'value') {
                      if (result.hd_sensor_type_code === '101') { // 二挡开关
                        if (result.value === '0') {
                          replaceStr = replaceStr + '关'
                        } else if (result.value === '1') {
                          replaceStr = replaceStr + '开'
                        }
                      } else if (result.hd_sensor_type_code === '102') { // 三挡开关
                        if (result.value === '8') {
                          replaceStr = replaceStr + '打开'
                        } else if (result.value === '9') {
                          replaceStr = replaceStr + '关闭'
                        } else if (result.value === '10') {
                          replaceStr = replaceStr + '暂停'
                        }
                      } else if (result.hd_sensor_type_code === '22') {
                        if (result.value !== '') {
                          let s = parseFloat(result.value)
                          if (s <= 22.5 || s >= 337.5) {
                            replaceStr = replaceStr + "北风";
                          } else if (s <= 67.5) {
                            replaceStr = replaceStr + "东北风";
                          } else if (s <= 112.5) {
                            replaceStr = replaceStr + "东风";
                          } else if (s <= 157.5) {
                            replaceStr = replaceStr + "东南风";
                          } else if (s <= 202.5) {
                            replaceStr = replaceStr + "南风";
                          } else if (s <= 247.5) {
                            replaceStr = replaceStr + "西南风";
                          } else if (s <= 292.5) {
                            replaceStr = replaceStr + "西风";
                          } else if (s <= 337.5) {
                            replaceStr = replaceStr + "西北风";
                          }
                        }
                      } else {
                        /*
                        var num = parseFloat(result[word])// NaN
                        if (!window.isNaN(num)) { // 保留一位小数
                          replaceStr = replaceStr + num.toFixed(1)
                        } else {
                          replaceStr = replaceStr + result[word]
                        }
                        */
                        console.log(result[word])
                        replaceStr = replaceStr + result[word]
                      }
                    } else {
                      replaceStr = replaceStr + result[word]
                    }
                  }
                })
                text = text.replace('{' + sensorList[t] + '}', replaceStr)
                //   break
                // }
              }
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      }
      var textArray = text.split('\n')
      for (var i = 0; i < textArray.length; i++) {
        if (textArray[i].length === 0) { textArray[i] = ' ' }// 硬件不支持空换行
        var charArray = textArray[i].split('')
        var totalLength = 0
        for (var j = 0; j < charArray.length; j++) {
          if (charArray[j].match(/[\u0000-\u00ff]/g)) { // 半角
            totalLength += 0.5
          } else if (charArray[j].match(/[\u4e00-\u9fa5]/g)) { // 中文
            totalLength += 1
          } else if (charArray[j].match(/[\uff00-\uffff]/g)) { // 全角
            totalLength += 1
          }
          // 判断长度是否超标
          if (totalLength > this.led_row_charnum) {
            var front = textArray[i].substring(0, j)
            var back = textArray[i].substring(j)
            textArray.splice(i, 1)
            textArray.splice(i, 0, back)
            textArray.splice(i, 0, front)
            break
          }
        }
      }
      // textArray.join('\n')
      this.pageNo = 1
      var str = ''
      this.contentList = []
      for (var z = 0; z <= textArray.length; z++) {
        if (z === textArray.length) {
          this.contentList[this.pageNo - 1] = str
          break
        }
        if (z !== 0 && z % Math.floor(this.led_rows) === 0) {
          this.contentList[this.pageNo - 1] = str
          this.pageNo++
          str = ''
        }
        str = str + textArray[z]
        if (z < textArray.length - 1) { str = str + '\n' }
      }
      this.$refs.ledShow.textContent = this.contentList[this.pageNo - 1]
      this.total = this.contentList.length
    },
    // 根据LED实际大小生成对应的DIV
    changeLedDiv (kuan, gao, fontSize) {

      fontSize = 16// 默认16
      this.original_width = kuan
      this.original_height = gao
      this.original_font_size = fontSize
      var width = 0
      if (this.preview) {
        width = $('#bodyDiv').width()
      } else {
        width = $('#bodyDiv').width() / 2
      }
      if (width === 0) { width = 1450 / 2 }
      var height = width / kuan * gao
      var row = gao / fontSize
      this.led_font_size = width / kuan * fontSize + 'px'// 预览LED屏字体大小
      this.led_width = width + 'px'// 预览LED屏宽度
      this.led_height = height + 'px'// 预览LED屏高度
      this.led_rows = row// 预览LED屏行数
      this.led_line_height = height / row + 'px'// 预览LED屏行高
      this.led_row_charnum = kuan / fontSize// 预览LED屏每行字数
      this.saveAble = true
      this.saveSingleAble = true
    },
    init (preview, hd_device_id, communication) {
      this.preview = preview
      this.online = false
      this.led_rows = 0
      this.hd_device_id = hd_device_id
      if (communication) {
        let comm = JSON.parse(communication)
        this.$nextTick(() => {
          this.changeLedDiv(comm.led_width, comm.led_height)
          this.inputText = comm.content
          this.interval = comm.interval
          this.pageTime = comm.pageTime
          this.ledCreate()
          this.checkOnline(true)

          if (this.preview) {
            this.pageNo = 1
            const _this = this
            setInterval(() => {
              _this.autoFlip()
            }, (_this.pageTime * 1000))
          }
        })
      } else {
        this.checkOnline(false)
      }
    },
    //自动翻页
    autoFlip () {

      if (this.pageNo > this.total) {
        this.pageNo = 1
      }
      this.$refs.ledShow.textContent = this.contentList[this.pageNo - 1]
      this.pageNo = this.pageNo + 1
    },
    //判断设备在线状态,非在线无法进行保存操作
    checkOnline (isInit) {
      getPara(this.hd_device_id, this.$ws).then(res => {
        if (res.code === 200) {
          // this.$message.success('获取LED屏数据成功!')
          this.online = true
          if (!isInit) {
            this.changeLedDiv(res.data.led_width, res.data.led_height)
          }
        }
      }).catch(err => {
        this.$message.error(err.msg)
        if (!isInit) {
          this.changeLedDiv(192, 128)
        }
      })
    },
    // showDialog (hd_device_id, communication) {
    //   this.led_rows = 0
    //   this.hd_device_id = hd_device_id
    //   this.led_flag = false
    //   // 根据实际大小生成等比模型
    //   this.dialogVisible = true
    //   getPara(this.hd_device_id, this.$ws).then(res => {
    //     if (res.code === 200) {
    //       this.$message.success('获取LED屏数据成功!')
    //       this.changeLedDiv(res.data.led_width, res.data.led_height)
    //       this.led_flag = true
    //       if (communication) {
    //         var comm_json = JSON.parse(communication)
    //         this.inputText = comm_json.content
    //         this.interval = comm_json.interval
    //         this.pageTime = comm_json.pageTime
    //         this.ledCreate()
    //       }
    //     }
    //   }).catch(err => {
    //     this.$message.error(err.msg)
    //     this.dialogVisible = false
    //   })
    // }

  }
}
</script>
<style scoped>
</style>>
