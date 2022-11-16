<template>

  <div class="createDK">
    <div class="header">
      {{ form.name }}
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
        <div class="modelName">面积</div>
        <div class="modelInput">
          <input
            v-model="form.area"
            type="text"
          >
        </div>
      </div>
      <div class="model">
        <div class="modelName">颜色</div>
        <div class="modelInput">
          <input
            v-model="form.color"
            style="width: 50px;position: absolute;height: 32px;margin: 0;border-radius: 8px;"
            type="color"
          >
          <input
            v-model="form.color"
            style="margin-left: 55px;width: calc(100% - 60px);"
            type="text"
          >
        </div>
      </div>
      <div class="model">
        <div class="modelName">透明度</div>
        <div class="modelInput">
          <div class="block">
            <el-slider v-model="form.opacity" :step="10" />
          </div>
        </div>
      </div>
      <div class="model">
        <div class="modelName">详细地址</div>
        <div class="modelInput">
          <input
            v-model="form.address"
            type="text"
          >
        </div>
      </div>
      <div class="model">
        <div class="modelName">联系人</div>
        <div class="modelInput">
          <input
            v-model="form.linkman"
            type="text"
          >
        </div>
      </div>
      <div class="model">
        <div class="modelName">邮箱</div>
        <div class="modelInput">
          <input
            v-model="form.email"
            type="text"
          >
        </div>
      </div>
      <div class="model">
        <div class="modelName">介绍</div>
        <div class="modelInput">
          <input
            v-model="form.introduction"
            type="text"
          >
        </div>
      </div>
      <div class="model">
        <div class="modelName">2d图层地址</div>
        <div class="modelInput">
          <input
            v-model="form.layerUrl2d"
            type="text"
          >
        </div>
      </div>
      <div class="model">
        <div class="modelName">3d图层地址</div>
        <div class="modelInput">
          <input
            v-model="form.layerUrl3d"
            type="text"
          >
        </div>
      </div>
      <!-- <div class="model">
        <div @click="configBaseMapVisible=true" style="position: absolute;top:0px;right:0px;">
          <el-button type="primary" style="padding: 12px;font-size: 12px">配置<br/>底图</el-button>
        </div>
      </div> -->
    </div>
    <div class="createDK-footor">
      <div
        class="footor_btn"
        @click="save"
      > 保存 </div>
      <div
        class="footor_btn"
        @click="close"
      > 取消 </div>
    </div>

    <el-dialog
      append-to-body
      :visible.sync="configBaseMapVisible"
      title="配置基地底图"
    >
      <div>
      <el-form label-width="80px">
        <el-form-item label="二维服务">
          <el-input v-model="form.layerUrl2d"></el-input>
        </el-form-item>
        <el-form-item label="三维服务">
          <el-input v-model="form.layerUrl3d"></el-input>
        </el-form-item>
        </el-form>
        <div style="width: 100%;text-align: center;">
          <el-button type="primary">保存</el-button>
          <el-button type="info">取消</el-button>
        </div>
      </div>
    </el-dialog>

  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
export default {
  name: 'InfoCreateJD',
  data() {
    return {
      name: 'InfoCreateJD',

      configBaseMapVisible:false,
      typeOption: [
        { name: '测试1', value: '测试1' },
        { name: '测试2', value: '测试2' }
      ],
      form: {
        name: '',
        address: '',
        email: '',
        linkman: '',
        introduction: '',
        geometry: '',
        bs_base_id: '',
        color: '',
        opacity: 1,
        area: '',
        layerUrl2d: '',
        layerUrl3d: ''
      },
      isShowJDCreateInfo: false,
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
    setInfo: function(json) {
      for (var i in json) {
        typeof this.form[i] !== 'undefined' &&
          json[i] !== 'null' &&
          (this.form[i] = json[i])
      }
      if( json.geometry ){
        var geo = JSON.parse(json.geometry);
        if( geo ){
          this.form.layerUrl2d = geo.layer2d;
          this.form.layerUrl3d = geo.layer3d;
        }
      }else{
        json.layer2d && ( this.form.layerUrl2d = json.layer2d );
        json.layer3d && ( this.form.layerUrl3d = json.layer3d );
      }
    },
    destroy: function() {
      for (var i in this.form) {
        this.form[i] = ''
      }
      this.geometry && this.geometry.unedit()
    },
    setGemotry: function(geometry) {
      this.destroy()
      this.geometry = geometry
      this.geometry.edit()
      var option = {
        bs_base_id: geometry.attr.id || geometry.option.id,
        ...geometry.option,
        ...geometry.attr,
        color: geometry.option.color,
        opacity: geometry.option.opacity * 100,
        area: parseInt(geometry.getArea() / 666.7) + '亩'
      }
      this.setInfo(option)
    },
    // 点击取消按钮
    close() {
      this.onclose && this.onclose()
      this.hideElement()
    },
    hideElement: function() {
      if (this.$parent.getJD() && !this.$parent.getJD().graphic) {
        this.$confirm('此操作将取消当前绘制的基地, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$parent.outEdit()
          this.$parent.show.isshowJDCreateInfo = false
          this.destroy()
          this.geometry.remove()
          // 重新进入绘制流程
          this.$parent.createJiDi()
          this.onsave = null
          this.onclose = null
        }).catch(() => {

        })
        return
      }
      this.onsave = null
      this.onclose = null
      this.$parent.outEdit()
      this.$parent.show.isshowJDCreateInfo = false
      this.destroy()
    },
    // 关闭之后
    save: function() {
      if (this.form.bs_base_id || this.geometry.attr.id) {
        // 存在id 确认修改
        this.update_jidi()
      } else {
        // 不存在id 添加
        this.add((g) => { this.onsave && this.onsave(g) })
      }
    },
    // 修改基地
    update_jidi: function() {
      var form = this.form
      this.formData = new FormData()
      for (var i in form) {
        if (i === 'geometry') {
          var json = this.geometry.export()
          if (json) {
            json = JSON.parse(json)
            json.color = form.color
            json.opacity = form.opacity / 100
            json.layer2d = form.layerUrl2d;
            json.layer3d = form.layerUrl3d;
          }
          this.formData.append(i, JSON.stringify(json))
          continue
        }
        if (i === 'id') {
          this.formData.append('bs_base_id', form[i])
          continue
        }
        this.formData.append(i, form[i])
      }
      const config = {
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getToken() }
      }
      this.$axios.post(process.env.BASE_API + '/bs/bs_base/update', this.formData, config).then(res => {
        if (res.data.code === 200) {
          this.$message.success('提交成功！')
          this.geometry.option = JSON.parse(this.formData.get('geometry'))
          this.onsave && this.onsave(this.geometry);
          for (var i in this.geometry.attr) {
            var it = this.formData.get(i)
            it != null && (this.geometry.attr[i] = it)
            if (i === 'geometry') {
              this.geometry.option = JSON.parse(it)
            }
          }
          var jd = this.$parent.getJD()
          jd.graphic = this.geometry
          this.geometry.createGeometry()
          this.geometry.createSymbol()
          this.$parent.renderTree()
          this.hideElement()
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    add(fn) {
      var form = this.form
      this.formData = new FormData()
      for (var i in form) {
        if (i === 'geometry') {
          var json = this.geometry.export()
          if (json) {
            json = JSON.parse(json)
            json.color = form.color
            json.layer2d = form.layerUrl2d;
            json.layer3d = form.layerUrl3d;
          }
          this.formData.append(i, JSON.stringify(json))
          continue
        }
        this.formData.append(i, form[i])
      }

      const config = {
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getToken() }
      }
      this.$axios.post(process.env.BASE_API + '/bs/bs_base/save', this.formData, config).then(res => {
        if (res.data.code === 200) {
          this.$message.success('提交成功！')
          this.geometry.option = JSON.parse(this.formData.get('geometry'))
          for (var i in this.geometry.attr) {
            var it = this.formData.get(i)
            it != null && (this.geometry.attr[i] = it)
            if (i === 'geometry') {
              this.geometry.option = JSON.parse(it)
            }
          }
          this.geometry.attr.id = res.data.data
          this.geometry.createGeometry()
          this.geometry.createSymbol()
          fn && fn(this.geometry)
          // this.hideElement()
          // this.$parent.renderTree()
        } else {
          this.$message.error(res.data.msg)
        }
      })
    }
  }
}

</script>

<style>
.createDK {
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
.createDK .header {
  background: #dadbdf;
  line-height: 50px;
  height: 50px;
  padding-left: 15px;
}
.createDK .content {
  height: calc(100% - 100px)!important;
  background: #ffffff;
}
.createDK .model {
  display: flex;
  padding: 10px;
  align-items: center;
}
.createDK .model .modelName {
  width: 80px;
  text-align: right;
  padding: 0 10px;
}
.createDK .model .modelInput {
  width: calc(100% - 100px);
  border: solid 1px #8d93a8;
  border-radius: 8px;
}
.createDK .model .modelInput > input,
select {
  padding: 6px;
  border: none;
  margin: 4px;
  outline: none;
  width: calc(100% - 20px);
}
.createDK .model .modelInput > select > option {
  background: #2d3546;
  color: #fff;
}
.createDK .createDK-footor {
  height: 50px;
  background: #ffffff;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-top: solid 1px #b1b1b1;
}
.createDK .createDK-footor .footor_btn {
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
