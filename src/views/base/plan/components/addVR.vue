<template>
  <div>
    <el-dialog
      :append-to-body="true"
      :visible.sync="dialog"
      :title="isAdd ? '新增' : '编辑'"
      :before-close="handleClose"
      width="500px"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        size="small"
        label-width="80px"
      >
        <el-form-item label="选择场景">
          <el-select
            v-model="form.id"
            name='id'
            placeholder="选择场景"
          >
            <el-option
              v-for='(it,i) in panorList'
              :key='i'
              :label="it.name"
              :value="it.id"
            ></el-option>
          </el-select>
          <el-button @click.prevent="createVR">添加场景</el-button>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <!-- <el-button type="text" @click="cancel">取消</el-button> -->
        <el-button
          v-show='!isedit'
          type="primary"
          @click="doSubmit"
        >确认</el-button>
        <el-button
          v-show='isedit'
          type="primary"
          @click="deleteSubmit"
        >删除</el-button>
        <el-button
          v-show='isedit'
          type="primary"
          @click="saveSubmit"
        >保存</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :append-to-body="true"
      :visible.sync="show_panorScene"
      title="新增场景"
      width="500px"
    >
      <el-form
        ref="form"
        :model="panorScene"
        :rules="rules"
        size="small"
        label-width="80px"
      >
        <el-form-item label="选择全景">
          <el-select
            v-model="panor.rsPanorId"
            name='id'
            placeholder="选择全景"
          >
            <el-option
              v-for='(it,i) in panorQJList'
              :key='i'
              :label="it.name"
              :value="it.id"
            ></el-option>
          </el-select>
          <el-button @click.prevent="createQJ">新增全景</el-button>
        </el-form-item>
        <el-form-item label="名称">
          <el-input
            v-model="panorScene.name"
            style="width: 370px;"
          />
        </el-form-item>
        <el-form-item label="场景图片路径">
          <input
            type='file'
            ref='file'
          />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <!-- <el-button type="text" @click="cancel">取消</el-button> -->
        <el-button
          v-show='!isedit'
          type="primary"
          @click="savePanorScene"
        >保存</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :append-to-body="true"
      :visible.sync="show_panor"
      title="新增全景"
      width="500px"
    >
      <el-form
        ref="form"
        :model="panor"
        :rules="rules"
        size="small"
        label-width="80px"
      >
        <el-form-item label="名称">
          <el-input
            v-model="panor.name"
            style="width: 370px;"
          />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <!-- <el-button type="text" @click="cancel">取消</el-button> -->
        <el-button
          v-show='!isedit'
          type="primary"
          @click="saveQJ"
        >保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { add, edit, get, getByBaseId } from '@/api/rsPanorScene'
import { get as getPanor, add as addPanor } from '@/api/rsPanor'


export default {
  components: {

  },
  props: {
    vClick: {
      type: Function,
      default: new Function
    },
    baseId: {
      type: String,
      default: function(){
        return this.$store.state.baseinfo.cur_base_id;
      }
    }
  },
  data () {
    return {
      loading: false,
      dialog: false,
      form: {
        id: '',
        rsPanorId: '',
        name: '',
        imagePath: '',
      },
      show_panor: false,
      panor: {
        rsPanorId: "",
        name: "",
      },
      show_panorScene: false,
      panorScene: {
        name: ""
      },
      rules: {
      },
      isedit: false, //是否是编辑状态
      panorList: [],
      panorQJList: [], //全景数组
      graphic: null,
    }
  },
  mounted () {
    // this.getPanorList();
  },
  methods: {
    handleClose (done) {
      if (this.graphic && !this.isedit) {
        this.graphic.remove();
      }
      this.close();
    },

    show (graphic, isedit) {
      this.form = {
        id: '',
        rsPanorId: '',
        name: '',
        imagePath: '',
      };
      this.panor = { name: "" }
      this.panorScene = { name: "" }

      this.graphic = graphic;
      this.panorList = [];
      this.getPanorList();
      this.dialog = true;
      this.isedit = typeof isedit === 'undefined' ? false : true;
      if (this.graphic) {
        this.form.id = this.graphic.attr.name;
      }
    },

    close () {
      this.hide();
      this.vClick && this.vClick({ type: "hide" });
    },

    hide () {
      this.dialog = false;
    },

    // 获取场景列表
    getPanorList () {
      getByBaseId(this.baseId).then((e) => {
        this.panorList = e.content.filter((e) => {
          return !e.longitude || (this.isedit && e.id === this.form.id);
        });
      });
    },

    // 获取全景数据
    getPanorQJList () {
      getPanor({ bs_base_id: this.$store.state.baseinfo.cur_base_id }).then((e) => {
        this.panorQJList = e.data.content.filter((e) => {
          return !e.longitude || (this.isedit && e.id === this.form.id);
        });
      });
    },

    // 确定按钮
    doSubmit () {
      this.vClick && this.vClick({ type: "enter" }, this.panorList.find((e) => { return e.id == this.form.id }));
      this.hide();
    },

    saveSubmit () {
      // 清除原有的场景经纬度
      var json = this.graphic.attr;
      edit({
        id: json.id,
        latitude: "",
        longitude: "",
      }).then(() => {
        // 将原有场景经纬度赋值给现在的      
        var a = this.panorList.find((e) => { return e.id == this.form.id });
        edit({
          id: a.id,
          latitude: json.latitude,
          longitude: json.longitude,
        }).then(() => {
          a.latitude = json.latitude,
            a.longitude = json.longitude,
            this.graphic.attr = a;
          this.hide();
        })
      })
    },

    deleteSubmit () {
      if (confirm("是否确定要去除")) {
        var json = this.graphic.attr;
        this.graphic.remove();
        edit({
          id: json.id,
          latitude: "",
          longitude: "",
        }).then(() => {
          this.hide();
        })
      }
    },

    // 创建场景
    createVR () {
      // 显示ui
      this.show_panorScene = true;
      // 加载全景列表数据
      this.getPanorQJList();
    },

    // 保存全景场景
    savePanorScene () {
      var load = this.openLoading()
      add({
        rsPanorId: this.panor.rsPanorId,
        name: this.panorScene.name,
        image: this.$refs.file.files[0],
      }).then(res => {
        load.close();
        this.show_panorScene = false;
        this.getPanorList();
      }).catch(err => {
        load.close();
        this.show_panorScene = false;
      })
    },

    // 新增全景
    createQJ () {
      // 显示ui
      this.show_panor = true;
    },

    saveQJ () {
      if (!this.panor.name) {
        alert("全景名称不能为空");
        return;
      }
      addPanor({
        name: this.panor.name,
        bs_base_id: this.$store.state.baseinfo.cur_base_id,
      }).then(res => {
        this.show_panor = false;
        // 刷新全景列表
        this.getPanorQJList();
      }).catch(err => {
        this.show_panor = false;
      })
    }

  }
}
</script>

<style scoped>
</style>
