<template>
  <div style="height:400px;overflow:auto;">
    <el-table
      v-loading="loading"
      :data="data"
      size="small"
      style="width: 100%;"
      ref="multipleTable"
      row-key="id"
    >
      <el-table-column
        :prop="'title'"
        width="200px"
        :show-overflow-tooltip="true"
      >
        <template slot="header" slot-scope="scope">
          <div>标题</div>
        </template>
        <template slot-scope="scope">
          {{ scope.row.title }}
          <!-- <div :class="scope.row.stat==1?'unread':''" >{{scope.row.title}}</div> -->
        </template>
      </el-table-column>

      <el-table-column
        :prop="'content'"
        label="内容"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <!-- <div :class="scope.row.stat==1?'unread':''"  >{{scope.row.content}}</div> -->
          {{ scope.row.content }}
        </template>
      </el-table-column>

      <el-table-column
        :prop="'result'"
        label="处理结果"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.userMessageTypeOption != null">
            {{ scope.row.result ? scope.row.result : "等待处理" }}
          </span>
          <span v-if="scope.row.userMessageTypeOption == null">
            {{ scope.row.stat == 1 ? "已读" : "未读" }}
          </span>
        </template>
      </el-table-column>

      <el-table-column prop="createDate" width="150px" label="时间">
        <template slot-scope="scope">
          {{ scope.row.createDate }}
        </template>
      </el-table-column>

      <el-table-column width="150px" align="center">
        <template slot-scope="scope">
          <div
            v-if="
              scope.row.result == null &&
                scope.row.userMessageTypeOption != null &&
                scope.row.userMessageTypeCode != 'mynotice'
            "
          >
            <el-button
              v-for="(it, idx) in getTypeOption(scope.row)"
              :key="idx"
              @click="dispatchOption(scope.row, it.action)"
              type="primary"
              size="mini"
              round
              >{{ it.desciption }}</el-button
            >
          </div>
          <el-button
            v-if="
              scope.row.stat == 0 && scope.row.userMessageTypeOption == null
            "
            @click="dispatchOption(scope.row, 'markReaded')"
            type="primary"
            size="mini"
            round
            >设为已读</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { markReaded } from "@/api/userMessage";
export default {
  components: {},
  props: {
    data: {
      type: Array,
      required: true
    },

    spuer_: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      detail: { title: "", content: "" },
      detailDialog: false,
      addParam: {
        name: "content",
        value: null
      }
    };
  },
  directives: {},
  created() {},
  methods: {
    viewDetail(msg) {
      msg.stat = 1;
      this.spuer_.markReaded(msg);
    },
    getTypeOption(mesg) {
      if (mesg.userMessageTypeOption == undefined) {
        return [];
      }
      let typeOpt = JSON.parse(mesg.userMessageTypeOption);
      return typeOpt.option;
    },
    dispatchOption(msg, action) {
      msg.stat = 1;
      this.spuer_[action](msg);
    },
    query() {
      this.$emit("conditionChange");
    },
    getAddParam() {
      return this.addParam;
    },
    claenAddParam() {
      this.addParam.value = null;
    }
  }
};
</script>

<style scoped>
.unread {
  font-weight: 700;
}
</style>
