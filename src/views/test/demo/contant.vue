<template>
  <div ref="errBack" class="errBack">
    <div class="errDsc">
      <p class="text">{{ currentData.port }}</p>
      <p class="date">更新时间:{{ getDate | date }}</p>
    </div>
    <p class="content-text">接口地址:&nbsp;&nbsp;&nbsp;&nbsp;<span class="text">{{ currentData.path }}</span></p>
    <p class="content-text">传参方式:&nbsp;&nbsp;&nbsp;&nbsp;<span class="text">{{ currentData.request }}</span></p>
    <p class="content-text">consumes:&nbsp;&nbsp;&nbsp;&nbsp;<span class="text">{{ currentData.consumes }}</span></p>
    <p class="content-text">produces:&nbsp;&nbsp;&nbsp;&nbsp;<span class="text">["*/*"]</span></p>
    <p class="content-text">接口描述:&nbsp;&nbsp;&nbsp;&nbsp;<span class="text">{{ currentData.consumes }}</span></p>
    <div class="request-example">
      <p class="content-text" style="margin-bottom: 15px;">请求示例:&nbsp;&nbsp;&nbsp;&nbsp;</p>
      <div class="example-contant">
        <div style="height: 100%;width: 80%;margin: 0 auto;">
          <pre class="info" v-html="`${JSON.stringify(json,null,4)}`"/>
        </div>
      </div>
    </div>
    <div class="request-set">
      <p class="content-text" style="margin-bottom: 15px;">请求参数:&nbsp;&nbsp;&nbsp;&nbsp;</p>
      <el-table
        :data="tableData"
        border
        style="width: 80%;margin-top: 15px;"
      >
        <el-table-column
          prop="setName"
          label="参数名称"
        />
        <el-table-column
          prop="setDesc"
          label="参数说明"
        />
        <el-table-column
          prop="request"
          label="请求类型"
        />
        <el-table-column
          prop="key"
          label="是否必须"
        />
        <el-table-column
          prop="setName"
          label="参数名称"
        />
        <el-table-column
          prop="key"
          label="数据类型"
        />
        <el-table-column
          prop="schema"
          label="schema"
        />
      </el-table>
    </div>

    <p class="example">示例:</p>
    <!-- <div class="errInfo" id="json" v-html='syntaxHighlight(this.json)'>

        </div> -->
    <div class="errInfo">
      <div style="height: 100%;width: 80%;margin: 0 auto;">
        <pre class="info" v-html="`${JSON.stringify(json,null,4)}`"/>
      </div>
    </div>

  </div>

</template>
<script>
import { mapState } from 'vuex'
export default {
  filters: {
    date(value) {
      const date = new Date(value)
      const year = date.getFullYear()
      const mouth = date.getMonth() + 1 > 10 ? date.getMonth() : '0' + date.getMonth()
      const day = date.getDate() > 10 ? date.getDate() : '0' + date.getDate()
      const h = date.getHours() > 10 ? date.getHours() : '0' + date.getHours()
      const m = date.getMinutes() > 10 ? date.getMinutes() : '0' + date.getMinutes()
      const s = date.getSeconds() > 10 ? date.getSeconds() : '0' + date.getSeconds()

      return `${year}-${mouth}-${day} ${h}:${m}:${s}`
    }
  },
  props: {
    bread: {
      type: Array,
      default: function() {
        return []
      }
    },
    list: {
      type: Object,
      default: function() {
        return {}
      }
    },
    currentData: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      tableData: [
        {
          setName: 'authorizationUser',
          setDesc: 'authorizationUser',
          request: 'body',
          key: 'true',
          type: 'AuthorizationUser',
          schema: 'AuthorizationUser'
        },
        {
          setName: 'code',
          setDesc: '验证码',
          request: 'body',
          key: 'true',
          type: 'String',
          schema: ''
        },
        {
          setName: 'password',
          setDesc: '密码',
          request: 'body',
          key: 'true',
          type: 'String',
          schema: ''
        },
        {
          setName: 'uuid',
          setDesc: '通用唯一标识符',
          request: 'body',
          key: 'true',
          type: 'String',
          schema: ''
        }
      ]
    }
  },
  computed: {
    getDate() {
      return new Date()
    },
    ...mapState({
      list: state => state.help.api_list,
      currentData: state => state.help.currentData
    })
  },
  watch: {
    currentData(newData) {

    }
  },
  created() {
    this.json = {
      requestId: 'ae2225f7-1c2e-427a-a1ad-5413b762957d',
      code: 'NoSuchKey',
      message: 'The resource you requested does not exist'
    }
  },
  methods: {
    syntaxHighlight(json) {
      if (typeof json !== 'string') {
        json = JSON.stringify(json, undefined, 4)
      }
      json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>')
      return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
        function(match) {
          var cls = 'number'
          if (/^"/.test(match)) {
            if (/:$/.test(match)) {
              cls = 'key'
            } else {
              cls = 'string'
            }
          } else if (/true|false/.test(match)) {
            cls = 'boolean'
          } else if (/null/.test(match)) {
            cls = 'null'
          }
          return '<span class="' + cls + '">' + match + '</span>'
        })
    }
  }

}
</script>
<style rel="stylesheet/scss" lang="scss">
    .errBack {
        height: 100%;
    }
    .errDsc {
        height: 100px;
        text-align: left;
        border-bottom: 1px solid #DFE6EC;
        margin-bottom: 10px;
        .text {
            font-size: 30px;
        }
        .date {
            font-size: 16px;
            color: #9F9F9F;
            margin-top: 15px;
        }
    }
    .content-text {
        font-size: 16px;
        line-height: 24px;
        margin-top: 15px;
        font-weight: 800;
        .text {
            font-size: 16px;
            font-weight: 400;
            color: red;
        }
    }
    .example {
        padding: 30px 0, 0, 30px;
        margin: 15px 0;
        font-size: 14px;
        text-align: justify;
    }
    .errInfo, .example-contant {
        width: 100%;
        height: 150px;
        background-color: #F5F2F0;
        padding-top: 20px;
    }
    .info {
        font-size: 14px;
    }

    .pre {outline: 1px solid #ccc; padding: 5px; margin: 5px; }
    .string { color: green; }
    .number { color: darkorange; }
    .boolean { color: blue; }
    .null { color: magenta; }
    .key { color: red; }
</style>
