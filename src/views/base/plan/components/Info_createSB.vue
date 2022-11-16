<template>
  <div
    class="createSB_box"
    :style=' form.SBId ? "new" : "" '
  >
    <div class="createSB">
      <div class="header">
        设备编辑
        <div
          style=''
          class="high_btn"
        >
          <el-dropdown
            split-button
            size="mini"
            type="primary"
            @click="high_btn"
            @command="handleCommand"
          > 编辑
            <el-dropdown-menu slot="dropdown">
              <!-- <el-dropdown-item command="bind">{{ scope.row.bind_sta === 0 ? "设备绑定" : "设备解绑" }}</el-dropdown-item> -->
              <el-dropdown-item command="device_strategy">设备策略</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="content">
        <div class="model">
          <div class="modelName">名称</div>
          <div class="modelInput">
            <input
              v-model="form.name"
              type="text"
            >
          </div>
        </div>
        <div class="model">
          <div class="modelName">所属地块</div>
          <div class="modelInput">
            <select v-model="form.DKId">
              <option
                v-for=' (it,i) in dk '
                :key='i'
                :value='it.id'
              >{{ it.name }}</option>
            </select>
          </div>
        </div>
      </div>
      <div
        v-show="form.SBId"
        class="createDK-footor"
      >
        <div
          class="footor_btn"
          @click="removeSB"
        > 删除 </div>
        <div
          class="footor_btn"
          @click="save"
        > 保存 </div>
        <div
          class="footor_btn"
          @click="hideElement"
        > 取消 </div>
      </div>
      <div
        v-show="!form.SBId"
        class="createDK-footor"
      >
        <div
          class="footor_btn"
          @click="save"
        > 保存 </div>
        <div
          class="footor_btn"
          @click="hideElement(),destroy()"
        > 删除 </div>
      </div>
    </div>
    <loading ref="loading" />
  </div>

</template>

<script>
import { clearDeviceGeometryJson } from '@/api/map3d/indexMap'
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
import { esri } from '../mapUtil/mapInit'
import loading from '@/components/loading'
import { bindOrUnbindDevice } from '@/utils/websocket_util'
export default {
  name: 'InfoCreateSB',
  components: {
    loading
  },
  data () {
    return {
      name: 'InfoCreateSB',
      form: {
        name: '',
        DKId: '',
        SBId: '',
      },
      dk: [],
      geometry: null
    }
  },
  computed: {
    ...mapGetters([
      'id',
      'token',
      'user'
    ])
  },
  methods: {
    setInfo: function (json) {
      for (var i in json) {
        typeof this.form[i] !== 'undefined' &&
          json[i] !== 'null' &&
          (this.form[i] = json[i])
      }
    },
    destroy: function () {
      for (var i in this.form) {
        this.form[i] = ''
      }
      if (this.geometry) {
        this.geometry.remove()
      }
    },
    setGemotry: function (geometry) {

      // this.destroy()
      // 获取地块列表用来选择
      this.dk = this.$parent.getJD().dk.map((e) => { return { id: e.option.id, name: e.option.name } });
      this.geometry = geometry
      this.geometry.edit()
      var option = {
        name: geometry.attr.name,
        DKId: geometry.attr.rs_facilities_id,
        SBId: geometry.attr.id
      }
      this.setInfo(option)
    },
    hideElement: function (bool = true) {

      this.$parent.show.isshowSBCreateInfo = false
      this.$parent.outEdit()
      this.geometry.unedit(bool)
    },
    save: function () {
      if (this.form.SBId) {
        // 存在id 确认修改
        this.update_jidi()
      } else {
        // 不存在id 添加
        // this.add();
      }
    },
    // 修改基地
    update_jidi: function () {
      var geometry = this.geometry
      // 将几何的点配置赋值未当前几何的坐标点
      geometry.option.point = [geometry.graphic.geometry.x, geometry.graphic.geometry.y];
      //   var id = geometry.attr.id
      var geometry_json = JSON.parse(geometry.export());
      // 确认一下所属地块
      var jd = this.$parent.getJD();
      var dk = jd.dk.find((e) => {
        console.log(esri);
        return e.graphic ? esri.GeometryEngine.contains(e.graphic.graphic.geometry, geometry.graphic.geometry) : false;
      })

      // 如果地块不存在
      if (!dk) { this.$message({ message: '当前设备没有标注在地块上', type: 'warning' }); }
      else {
        // 如果存在地块 则判断是否是不同地块 提示用户
        if (dk.graphic.attr.id !== geometry.attr.rs_facilities_id) {
          // 如果地块id不同的话
          this.$message({ message: '当前设备的地块信息发生了变化', type: 'warning' });
          geometry.attr.rs_facilities_id = dk.graphic.attr.id;
        }
      }

      if (!this.form.DKId) { return this.$message({ message: '当前设备找不到所属的地块信息，请确认地块信息后保存', type: 'warning' }); }
      var gps = esri.Geometry.webMercatorToGeographic(geometry.graphic.geometry);
      var form = this.form
      const config = {
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getToken() }
      }
      this.$axios.post(process.env.BASE_API + '/hd/hd_device/editAndSave', {
        "geometry_json": JSON.stringify(geometry_json),
        'hd_device_id': form.SBId,
        "name": form.name,
        'rs_facilities_id': geometry.attr.rs_facilities_id || this.form.DKId,
        "latitude": gps.y,
        "longitude": gps.x,
      }, config).then(res => {
        if (res.data.code === 200) {
          // 修改配置值
          geometry.attr.name = form.name;
          // 将几何图形的名称删掉 重新显示名称
          geometry.showName();
          // 重新绘制几何
          geometry.createGeometry();
          // 提示成功
          this.$message.success('提交成功！');
          // 不还原推出编辑
          this.hideElement(false)
          // 将添加的几何添加进入列表
          this.$parent.getJD().sb.find((e) => { return e.option.id === form.SBId }).graphic = geometry;
          // 刷新显示列表
          this.$parent.$refs.jdTree.render();
        } else {
          this.$message.error(res.data.msg)
        }
        this.hideElement();
      })
    },

    delete_ () {
      var form = this.form
      const config = {
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getToken() }
      }
      this.$axios.post(process.env.BASE_API + '/hd/hd_device/clearDeviceGeometryJson?hd_device_id=' + form.SBId, {}, config)
        .then(res => {
          if (res.data.code === 200) {
            // 销毁几何
            this.geometry.remove();
            // 将几何从列表中删除
            this.$parent.getJD().sb.find((e) => { return e.option.id === form.SBId }).graphic = null;
            // 提示成功
            this.$message.success('删除成功！');
            // this.$parent.renderTree()
            this.hideElement(false)
            // 刷新树状
            this.$parent.$refs.jdTree.render();
          } else {
            this.$message.error(res.data.msg)
          }
          this.hideElement();
        })
    },

    high_btn () {
      this.$parent.high_Edit_Sb(this.geometry.attr.id || this.form.SBId)
    },

    handleCommand (command, row) {

      if (command === 'bind') {
        this.handelBind()
      } else if (command === 'delete') {
        this.removeSB()
      } else if (command === 'device_strategy') {
        this.$parent.$refs.deviceStrategy.showDialog(this.geometry.attr.id || this.form.SBId)
      }
    },

    // 
    handelBind () {

      var hd_device_id = this.geometry.attr.id || this.form.SBId;
      var state = 0
      var row = this.geometry.attr;
      if (row.bind_sta === 0) {
        state = 1 // 表示绑定
        this.$refs.loading.loading_dialog_text = '正在绑定设备，请等待！'
      } else {
        this.$refs.loading.loading_dialog_text = '正在解绑设备，请等待！'
      }
      this.$refs.loading.openLoadInstance()
      bindOrUnbindDevice(hd_device_id, state, this.$ws).then((res) => {
        // this.init()
        row.state = res.data.state
        row.bind_sta = res.data.bind_sta
        this.$message.success(res.msg)
        this.$refs.loading.closeLoadInstance()
      }).catch(err => {
        this.$message.error(err.msg)
        this.$refs.loading.closeLoadInstance()
      })
    },

    // 解绑设备
    removeSB: function () {
      var id = this.geometry.attr.id || this.form.SBId;
      var sbs = this.$parent.getJD().sb;
      var sb = sbs.find(function (e) {
        return e.option.id === id;
      });
      if (!sb || !sb.graphic) {
        // 如果查詢不到這個集合
        this.hideElement();
        // 刪除掉集合
        this.geometry.remove();
        return;
      }
      // 如果存在集合則刪除集合
      clearDeviceGeometryJson(id).then(() => {
        var sbs = this.$parent.getJD().sb;
        var sb = sbs.find((e) => { return e.option.id === id });
        sb.graphic.unedit();
        sb.graphic.remove();
        sb.graphic = null;
        this.$parent.outEdit();
        // sbs = sbs.splice( sbs.indexOf(sb) , 1 );
        this.$parent.$refs.jdTree.render();
        this.$parent.show.isshowSBCreateInfo = false
      })
    }

  }
}

</script>

<style>
.createSB_box .high_btn {
  position: absolute;
  top: 0;
  right: 0;
  color: #00a7f7;
  border-radius: 8px;
  cursor: pointer;
  margin: 10px 15px;
  min-width: 80px;
  text-align: center;
  height: 33px;
  line-height: 33px;
}
.createSB_box {
  position: absolute;
  height: 100%;
  top: 0;
  right: 0;
  background: #99999988;
}
.createSB_box.new {
  width: 100%;
}
.createSB {
  z-index: 99;
  box-shadow: 0px -3px 3px #4e5465;
  top: 0;
  right: 0;
  color: #000;
  font-size: 12px;
  position: absolute;
  height: 100%;
  width: 350px;
}
.createSB .header {
  background: #dadbdf;
  line-height: 50px;
  height: 50px;
  padding-left: 15px;
}
.createSB .content {
  height: calc(100% - 100px) !important;
  background: #ffffff;
}
.createSB .model {
  display: flex;
  padding: 10px;
  align-items: center;
}
.createSB .model .modelName {
  width: 80px;
  text-align: right;
  padding: 0 10px;
}
.createSB .model .modelInput {
  width: calc(100% - 100px);
  border: solid 1px #8d93a8;
  border-radius: 8px;
}
.createSB .model .modelInput > input,
select {
  padding: 6px;
  border: none;
  margin: 4px;
  outline: none;
  width: calc(100% - 20px);
}
.createSB .model .modelInput > select > option {
  background: #2d3546;
  color: #fff;
}
.createSB .createDK-footor {
  height: 50px;
  background: #ffffff;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-top: solid 1px #b1b1b1;
}
.createSB .createDK-footor .footor_btn {
  background: #00a7f7;
  color: #fff;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  margin: 0 15px;
  min-width: 80px;
  text-align: center;
}
</style>
