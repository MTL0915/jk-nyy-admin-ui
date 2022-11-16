<template>
  <div>
    <el-button
      type="primary"
      size="mini"
      @click="to"
    >生成代码</el-button>
    <el-dialog
      :top="'1vh'"
      :visible.sync="dialog"
      title="代码生成配置"
      append-to-body
      width="95%"
    >
      <div>
        <el-table
          v-loading="loading"
          :data="data"
          size="small"
          style="width: 100%;"
          height="80%"
        >
          <el-table-column
            label="序号"
            width="80"
            align="center"
            fixed
          >
            <template slot-scope="scope">
              <div>{{ scope.$index + 1 }}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="columnName"
            label="字段名称"
            fixed
          />
          <el-table-column
            prop="columnType"
            label="字段类型"
            fixed
          />
          <el-table-column
            prop="columnComment"
            label="字段标题"
            fixed
          >
            <template slot-scope="scope">
              <el-input
                v-model="data[scope.$index].columnComment"
                class="edit-input"
              />
            </template>
          </el-table-column>
          <el-table-column label="查询方式">
            <template slot-scope="scope">
              <el-select
                v-model="data[scope.$index].columnQuery"
                class="edit-input"
                clearable
                placeholder="请选择"
              >
                <el-option
                  label="模糊查询"
                  value="1"
                />
                <el-option
                  label="精确查询"
                  value="2"
                />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            align="left"
            prop="columnTag"
            label="编辑方式"
            width="190"
          >
            <template slot-scope="scope">
              <el-select
                v-model="data[scope.$index].columnTag"
                class="edit-input"
                clearable
                placeholder="请选择"
                style="width:100px"
              >
                <el-option
                  label="不显示"
                  value
                />
                <el-option
                  label="文本框"
                  value="text"
                />
                <el-option
                  label="数字框"
                  value="number"
                />
                <el-option
                  label="文本域"
                  value="textarea"
                />
                <el-option
                  label="下拉单选"
                  value="select"
                />
                <el-option
                  label="下拉多选"
                  value="selectmultiple"
                />
                <el-option
                  label="下拉树"
                  value="tree"
                />
                <el-option
                  label="复选"
                  value="checkbox"
                />
                <el-option
                  label="单选"
                  value="radiobox"
                />
                <el-option
                  label="附件上传"
                  value="upload"
                />
              </el-select>
              <el-select
                v-show="data[scope.$index].columnTag=='upload'"
                v-model="data[scope.$index].uploadType"
                class="edit-input"
                clearable
                placeholder="请选择"
                style="width:60px"
              >
                <el-option
                  label="图片"
                  value="image"
                />
                <el-option
                  label="文档"
                  value="doc"
                />
                <el-option
                  label="视频"
                  value="video"
                />
                <el-option
                  label="文件"
                  value="file"
                />
              </el-select>

              <el-button
                v-if="data[scope.$index].columnTag=='select' || data[scope.$index].columnTag=='selectmultiple' || data[scope.$index].columnTag=='tree' || data[scope.$index].columnTag=='checkbox' || data[scope.$index].columnTag=='radiobox'"
                size="mini"
                type="primary"
                icon="el-icon-edit"
                style="width:60px"
                @click="$refs['config_'+scope.row.columnName].visible=true"
              >配置</el-button>

              <el-dialog
                :append-to-body="true"
                :ref="'config_'+scope.row.columnName"
                title="配置选项"
                width="400px"
                @close="$refs['config_'+scope.row.columnName].visible=false"
              >
                <el-form
                  ref="form"
                  size="small"
                  label-width="80px"
                >
                  <el-form-item label="数据来源">
                    <el-radio-group
                      v-model="data[scope.$index].dataConfig.dataFrom"
                      @change="loadFromData($event,scope.$index)"
                    >
                      <el-radio :label="1">表数据</el-radio>
                      <el-radio :label="2">字典数据</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="配置">
                    <div v-if="data[scope.$index].dataConfig.dataFrom==1">
                      <div>
                        绑定值：
                        <el-select
                          v-model="data[scope.$index].dataConfig.columnValue"
                          style="width:120px"
                        >
                          <el-option
                            v-for="item in data[scope.$index].dataConfig.columnInfos"
                            :key="item.columnName"
                            :label="item.columnComment"
                            :value="item.columnName"
                          ></el-option>
                        </el-select>
                      </div>
                      <div>
                        显示值：
                        <el-select
                          v-model="data[scope.$index].dataConfig.columnLabel"
                          style="width:120px"
                        >
                          <el-option
                            v-for="item in data[scope.$index].dataConfig.columnInfos"
                            :key="item.columnName"
                            :label="item.columnComment"
                            :value="item.columnName"
                          ></el-option>
                        </el-select>
                      </div>
                    </div>
                    <div v-if="data[scope.$index].dataConfig.dataFrom==2">
                      <div>
                        <el-select
                          v-model="data[scope.$index].dictId"
                          class="edit-input"
                          clearable
                          placeholder="请选择字典列表"
                          style="width:200px"
                        >
                          <el-option
                            v-for="item in data[scope.$index].dataConfig.dictList"
                            :key="item.name"
                            :label="item.remark"
                            :value="item.name"
                          ></el-option>
                        </el-select>
                      </div>
                    </div>
                  </el-form-item>
                </el-form>
              </el-dialog>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="isNotBlank"
            label="是否必填"
          >
            <template slot-scope="scope">
              <el-tooltip
                :content="scope.row.isNotBlank === 'true' ?'是':'否'"
                placement="top"
              >
                <el-switch
                  v-model="data[scope.$index].isNotBlank"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-value="true"
                  inactive-value="false"
                />
              </el-tooltip>
            </template>
          </el-table-column>

          <el-table-column
            align="center"
            prop="columnShow"
            label="列表显示"
          >
            <template slot-scope="scope">
              <el-tooltip
                :content="scope.row.columnShow === 'true' ?'显示':'不显示'"
                placement="top"
              >
                <el-switch
                  v-model="data[scope.$index].columnShow"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-value="true"
                  inactive-value="false"
                />
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="viewShow"
            label="查看显示"
          >
            <template slot-scope="scope">
              <el-tooltip
                :content="scope.row.viewShow === 'true' ?'显示':'不显示'"
                placement="top"
              >
                <el-switch
                  v-model="data[scope.$index].viewShow"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-value="true"
                  inactive-value="false"
                />
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="isSmall"
            label="精简属性"
          >
            <template slot-scope="scope">
              <el-tooltip
                :content="scope.row.isSmall === 'true' ?'显示':'不显示'"
                placement="top"
              >
                <el-switch
                  v-model="data[scope.$index].isSmall"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-value="true"
                  inactive-value="false"
                />
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <div>
          <el-switch
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="生成导入导出"
            :active-value="true"
            :inactive-value="false"
            v-model="generateExImport"
          ></el-switch>
        </div>
      </div>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="text"
          @click="cancel"
        >取消</el-button>
        <el-button
          :loading="genLoading"
          type="primary"
          @click="doSubmit"
        >生成</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import initData from '@/mixins/initDataORI'
import { generator, getTables } from '@/api/generator'
import { get as getDictList } from '@/api/dict'

export default {
  name: 'Generator',
  mixins: [initData],
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      genLoading: false,
      dialog: false,
      columnQuery: '',
      generateExImport: false,
      constDict: []
    }
  },
  created () {
    getDictList()
      .then(res => {
        for (var i = 0; i < res.content.length; i++) {
          this.constDict.push(res.content[i])
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    to () {
      this.dialog = true
      this.time = 130
      this.$nextTick(() => {
        this.init()
      })
    },
    beforeInit () {
      this.url = 'api/generator/columns'
      const tableName = this.name
      this.params = { tableName }
      return true
    },
    cancel () {
      this.dialog = false
    },
    doSubmit () {
      this.genLoading = true
      let requestBody = {
        tableName: this.name,
        generateExImport: this.generateExImport,
        columnInfos: this.data
      }

      generator(requestBody)
        .then(res => {
          this.$notify({
            title: '生成成功',
            type: 'success',
            duration: 2500
          })
          this.dialog = false
          this.genLoading = false
        })
        .catch(err => {
          this.dialog = false
          this.genLoading = false
          console.log(err.response.data.message)
        })
    },
    loadFromData (event, index) {
      if (event == '2') {
        let dataConfig = this.data[index].dataConfig
        if (!dataConfig.dictList || dictList.length == 0) {
          dataConfig.dictList = this.constDict.filter(e => e)
        }
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.edit-input {
  .el-input__inner {
    border: none;
  }
}
</style>
