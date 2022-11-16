<template>
  <el-dialog
    :title="panor.name"
    :modal-append-to-body='false'
    :visible.sync="show"
    :before-close="handleClose"
  >
    <div class='box'>
      <!-- <div class='img'> 
                <img @click='addMater' @dragover="allowDrop" @drop='drop' :src='require("@/assets/vr/vr_logo.jpg")' />
            </div> -->
      <panormap
        class='img'
        :iconClick='iconClick'
        :dropfn='drop'
        :panorBaseMap='panorBaseMap'
        :index="index"
        :point='panorScene'
      ></panormap>
      <div class='sceneList'>
        <div
          v-for='(it,i) in secneList'
          :key='i'
          draggable="true"
          @dragstart='dragStart($event,it)'
        >{{it.name}}</div>
      </div>
    </div>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="updateImage">上传图片</el-button>
      <el-button @click="show = false">取 消</el-button>
      <el-button
        type="primary"
        @click="save"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { edit as editPanor } from '@/api/rsPanor'
import { getByPanorId } from '@/api/rsPanorScene'
import panormap from '../../vr/components/map'
import { compression } from '../js/compression.js'

var a = compression;
let _compression = new compression();

export default {
  components: {
    panormap
  },
  props: {
    panor: {
      type: Object,
      default: function () {
        return {}
      }
    },
    show: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    panor (res) {
      // 加载全景下的场景数据
      this.getByPanorId(res.id)
      // 加载导航图配置
      var json = typeof res.config === 'string' ? JSON.parse(res.config) : res.config;
      this.panorScene = json && json.point ? json.point : [];
      this.panorBaseMap = json && json.dhtBaseImage ? json.dhtBaseImage : "";
    }
  },
  created () {
    var res = this.panor;
    // 第一次上面不會執行
    this.getByPanorId(res.id)
    // 加载导航图配置
    var json = typeof res.config === 'string' ? JSON.parse(res.config) : res.config;
    this.panorScene = json && json.point ? json.point : [];
    this.panorBaseMap = json && json.dhtBaseImage ? json.dhtBaseImage : "";
  },
  data () {
    return {
      // dialogVisible: true,
      panorScene: [],
      index: "1",
      secneList: [],
      panorBaseMap: "", // 导航图底图
    };
  },
  methods: {

    // 上传图片
    updateImage () {
      var panor = this.panor;
      _compression.toSelect((base64) => {

        // 将上传的图片保存
        if (typeof panor.config === 'string') { panor.config = JSON.parse(panor.config) };
        panor.config.dhtBaseImage = base64;
        // 保存数据库
        var id = this.panor.id;
        var formData = new FormData();
        formData.set("id", id)
        formData.set("config", JSON.stringify(panor.config))
        editPanor(formData).then(() => {
          this.$message({
            type: 'success',
            message: '上传底图成功!'
          });
        });
        // 同步数据
        this.panor.config.dhtBaseImage = base64;
        this.panorBaseMap = base64;
      });
    },

    // 热点被点击
    iconClick (res) {
      this.$confirm('此操作将永久删除这个标记, 是否继续?', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 提示是否删除
        var index = this.panorScene.indexOf(res);
        this.panorScene.splice(index, 1);
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      })
    },

    // 获取全景下面的场景列表
    getByPanorId (panorId) {
      // 获取场景名称
      getByPanorId(panorId).then((res) => {
        this.secneList = res.content;
      })
    },

    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },

    // 点击导航图添加坐标点
    addMater (res) {
      // 标注出坐标点
      var x = res.offsetX;
      var y = res.offsetY;
      // 
    },

    // 拖动结束
    dragStart (res, json) {
      event.dataTransfer.setData("Text", JSON.stringify(json));
    },

    // 将元素拖放到图片中
    drop (res) {
      console.log(11111);
      var data = event.dataTransfer.getData("Text");
      data = JSON.parse(data);
      // 触发问题后
      var dom = res.target;
      var x = parseFloat((res.offsetX / dom.offsetWidth * 100).toFixed(2));
      var y = parseFloat((res.offsetY / dom.offsetHeight * 100).toFixed(2));
      this.panorScene.push({
        point: [x, y],
        name: data.name,
        id: data.id,
      });
    },

    save () {
      // 将标记的点作为坐标保存下来
      var id = this.panor.id;
      var config = this.panorScene;
      // this.dialogVisible = false;
      // return;
      var formData = new FormData();

      if (typeof this.panor.config === "string") {
        this.panor.config = JSON.parse(this.panor.config);
      }

      this.panor.config.point = config

      formData.set("id", id)
      formData.set("config", JSON.stringify(this.panor.config))
      editPanor(formData).then(() => {
        this.$message({
          type: 'success',
          message: '保存成功!'
        });
      });
      // 同步数据
      if (!this.panor.config) {
        this.panor.config = {};
      };
      this.panor.config.point = config;
    },

    allowDrop (event) {
      event.preventDefault();
    }
  }
}
</script>

<style scoped>
.box {
  display: flex;
}

.img {
  width: calc(100% - 150px);
  height: 350px;
  flex-shrink: 0;
  position: relative !important;
}

img {
  width: 100%;
  height: 350px;
}

.sceneList > div {
  border: solid 1px #0095ff;
  border-radius: 4px;
  padding: 4px;
  margin: 4px 0px;
  cursor: pointer;
}

.sceneList {
  width: 100%;
  padding: 0 15px;
  border-radius: 4px;
  height: 350px;
  overflow: auto;
}
</style>