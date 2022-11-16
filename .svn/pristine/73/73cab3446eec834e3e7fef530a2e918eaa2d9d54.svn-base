<template>
  <div>
    <div style="display: flex; justify-content: space-between;">
      <div>
        <el-button
          type="primary"
          size="mini"
          @click="add"
        >新增</el-button>
      </div>
      <div>
        <!-- 搜索框 -->
        <el-input
          size="mini"
          style="width:200px;"
          v-model="keyword"
          clearable
        />
        <el-button
          type="success"
          size="mini"
          @click="search"
        >搜索</el-button>
      </div>
    </div>
    <div>
      <el-table :data="data">
        <el-table-column label="缩略图">
          <template slot-scope="scope">
            <el-image
              style="width: 160px; height: 120px"
              :src="getLogo(scope.row.thumbnail_path)"
              :preview-src-list="[getLogo(scope.row.thumbnail_path)]"
            >
            </el-image>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称"
        />
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.isUse"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="staChange(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="200"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="update(scope.row.id)"
            >修改</el-button>
            <el-button
              type="danger"
              size="mini"
              @click="remove(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="page"
        :page-size="size"
        @current-change="handleCurrentChange"
      />
    </div>

    <addcustombase
      ref="addcustombase"
      :orgid="orgid"
      :baseid="baseid"
      :basecode="basecode"
    />
    <updatecustombase ref="updatecustombase" />
    <el-dialog
      append-to-body
      title="提示"
      :visible.sync="deleteVisible"
      width="300px"
    >
      <div style="font-size:20px;text-align:center;">是否进行删除?</div>
      <div style="text-align:right;margin-top:30px;">
        <el-button @click="deleteVisible = false">取消</el-button>
        <el-button
          @click="certainRemove()"
          type="primary"
        >确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import addcustombase from "./addCustomBase";
import updatecustombase from "./updateCustomBase";
import bus from "@/components/common/bus.js";
import {
  deleteCustomBase,
  customBaseList,
  changeCustomBaseSta
} from "@/api/custom_base";

export default {
  components: {
    addcustombase,
    updatecustombase
  },
  props: {
    baseid: {
      type: String,
      default: ""
    },
    orgid: {
      type: String,
      default: null
    },
    basecode: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      deleteVisible: false,
      data: [],
      keyword: "",
      page: 1,
      size: 10,
      total: 0,
      deleteId: null
    };
  },
  methods: {
    handleCurrentChange (val) {
      this.page = val;
      this.customBaseList();
    },
    customBaseList () {
      customBaseList({
        bs_base_id:
          this.baseid !== ""
            ? this.baseid
            : this.$store.state.baseinfo.cur_base_id,
        keyword: this.keyword,
        page: this.page - 1,
        size: this.size
      }).then(res => {
        if (res.code === 200) {
          res.data.content.map(v => {
            if (v.sta === 1) {
              v.isUse = true;
            } else {
              v.isUse = false;
            }
          });
          this.data = res.data.content;
          this.total = res.data.totalElements;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //修改
    update (id) {
      this.$refs.updatecustombase.showDialog(id);
    },
    remove (row) {
      this.deleteId = row.id;
      this.deleteVisible = true;
    },
    certainRemove () {
      deleteCustomBase({ id: this.deleteId }).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg);
          this.deleteVisible = false;
          this.customBaseList();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //新增
    add () {
      this.$refs.addcustombase.showDialog();
    },
    //搜索
    search () {
      this.page = 1;
      this.customBaseList();
    },
    //更改使用状态
    staChange (row) {
      if (row.sta === 1) {
        row.sta = 0;
      } else {
        row.sta = 1;
        localStorage.setItem("basecode", this.basecode);
        //this.$store.dispatch("setBaseCode", this.basecode)
      }
      changeCustomBaseSta({ id: row.id, sta: row.sta }).then(res => {
        if (res.code === 200) {
          this.customBaseList();
          // 改变状态后，及时刷新菜单栏背景颜色
          bus.$emit("getBaseList")
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    getLogo (img) {
      if (img === null || img === "") {
        return "";
      }
      return process.env.IMG_URL + img;
    }
  }
};</script
>>
