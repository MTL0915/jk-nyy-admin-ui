<template>

  <div class="dk_info open">
    <div
      v-show="!form.rs_facilities_id"
      class="cover"
      @click="hideElement"
    />
    <div class="createDK">
      <div class="header">
        地块编辑
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
          <div
            class="modelInput"
            style="display:flex;"
          >
            <input
              v-model="form.area"
              style="width: calc(100% - 90px);"
              type="text"
            >
            <div style="width: 70px;text-align: center;line-height: 35px;">{{ form.area_ }}</div>
          </div>
        </div>
        <div class="model">
          <div class="modelName">设施类型</div>
          <div class="modelInput">
            <div>
              <el-select
                v-model="form.type"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in typeOption"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </div>
          </div>
        </div>
        <div class="model">
          <div class="modelName">颜色</div>
          <div class="modelInput">
            <input
              v-model="form.color"
              @change='change'
              style="width: 50px;position: absolute;height: 32px;margin: 0;border-radius: 8px;"
              type="color"
            >
            <input
              v-model="form.color"
              @change='change'
              style="margin-left: 55px;width: calc(100% - 60px);"
              type="text"
            >
          </div>
        </div>
        <div class="model">
          <div class="modelName">透明度</div>
          <div class="modelInput">
            <div class="block">
              <el-slider
                @change='change'
                v-model="form.opacity"
                :step="10"
              />
            </div>
          </div>
        </div>

      </div>
      <div
        v-show="form.rs_facilities_id"
        class="createDK-footor"
      >
        <div
          class="footor_btn"
          style="color:red;"
          @click="deletes_del()"
        > 删除 </div>
        <div
          class="footor_btn"
          @click="save"
        > 保存 </div>
        <div
          class="footor_btn"
          @click="unchange(),hideElement()"
        > 取消 </div>
      </div>
      <div
        v-show="!form.rs_facilities_id"
        class="createDK-footor"
      >
        <div
          class="footor_btn"
          @click="save"
        > 保存 </div>
        <div
          class="footor_btn"
          @click="deletes_del()"
        > 删除 </div>
      </div>
    </div>
  </div>

</template>

<script>
import { clearFacilitiesGeometryJson } from '@/api/map3d/indexMap'
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
import ajaxApi from '@/api/map'
export default {
  name: 'InfoCreatedk',
  data () {
    return {
      name: 'InfoCreateDk',
      typeOption: [
        { name: '测试1', value: '测试1' },
        { name: '测试2', value: '测试2' }
      ],
      form1: {

      },
      form: {
        name: '',
        color: '',
        opacity: '',
        area: '',
        area_: '',
        type: '',
        create_user_id: '',
        // 基地id
        bs_base_id: '',
        geometry_json: '',
        // 地块id
        rs_facilities_id: ''
      },
      // 禁止重复请求
      isSave: false

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

      this.form1 = JSON.parse(JSON.stringify(this.form))
    },
    destroy: function () {
      for (var i in this.form) {
        this.form[i] = ''
      }
      if (this.geometry && !this.geometry.attr.geometry_json) this.geometry.remove();
      this.geometry && this.geometry.unedit(true)
      this.geometry = null;
    },
    setGemotry: function (geometry) {
      this.typeOption = this.$parent.data.dkType;
      this.destroy()
      this.geometry = geometry
      this.geometry.edit(2, () => {
        this.form.area_ = parseInt(this.geometry.getArea() / 666.7) + '亩';
      })
      var option = {
        rs_facilities_id: geometry.attr.id,
        ...geometry.attr,
        color: geometry.option.color,
        opacity: geometry.option.opacity * 100,
        area_: parseInt(geometry.getArea() / 666.7) + '亩',
        area: geometry.attr.acreage,
        type: geometry.attr.rs_facilities_type_id || geometry.attr.typeId
      }
      this.setInfo(option)
    },
    hideElement: function () {
      this.$parent.show.isshowCreateDK = false
      this.$parent.outEdit()
      this.destroy()
    },
    save: function () {
      if (this.$parent.isCoverDk(this.geometry.graphic.geometry)) {
        return this.$message({ message: '地块和其他地块重叠了，请编辑纠正后保存', type: 'warning' });
      };
      if (this.form.rs_facilities_id) {
        // 存在id 确认修改
        this.update_jidi()
      } else {
        // 不存在id 添加
        this.add()
      }
    },
    // 修改地块
    update_jidi: function () {
      var json = JSON.parse(this.geometry.export())
      json.color = this.form.color
      json.opacity = this.form.opacity * 0.01
      json = {
        rs_facilities_id: this.form.rs_facilities_id || '',
        name: this.form.name || '',
        geometry_json: JSON.stringify(json) || '',
        acreage: this.form.area || '',
        rs_facilities_type_id: this.form.type || ''
      }

      var formData = new FormData()
      for (var i in json) {
        formData.append(i, json[i])
      }

      const config = {
        headers: { 'Content-Type': 'application/form-data', 'Authorization': 'Bearer ' + getToken() }
      }

      this.$axios.post(process.env.BASE_API + '/rs/rs_facilities/update', formData, config).then(res => {
        if (res.data.code === 200) {
          this.$message.success('修改成功!')
          // 将修改的属性和几何属性同步
          var dk = this.geometry.attr
          dk.name = json.name
          dk.geometry_json = json.geometry_json
          dk.acreage = json.acreage
          dk.rs_facilities_type_id = json.rs_facilities_type_id
          // 将添加的几何添加进入列表
          this.$parent.getJD().dk.find((e) => { return e.option.id === json.rs_facilities_id }).graphic = this.geometry;
          //刷新为创建列表
          this.$parent.$refs.jdTree.render()
          // 刷新几何配置
          this.geometry.option = JSON.parse(json.geometry_json)
          // 重新创建几何
          this.geometry.createGeometry()
          this.geometry.showName()
          this.geometry.showZW()
          this.geometry.createSymbol();
        } else {
          //
        }
        this.hideElement()
      })
    },

    add: function () {

      if (this.isSave) return
      this.isSave = true
      var json = JSON.parse(this.geometry.export())
      json.color = this.form.color
      json.opacity = this.form.opacity * 0.01

      var json = {
        create_user_id: this.id,
        name: this.form.name,
        bs_base_id: this.form.bs_base_id,
        geometry_json: JSON.stringify(json),
        rs_facilities_type_id: this.form.type
      }

      var formData = new FormData()
      for (var i in json) {
        formData.append(i, json[i])
      }

      const config = {
        headers: { 'Content-Type': 'application/form-data', 'Authorization': 'Bearer ' + getToken() }
      }

      this.$axios.post(process.env.BASE_API + '/rs/rs_facilities/add', formData, config).then(res => {
        if (res.data.code === 200) {
          this.isSave = false
          this.$message.success('添加成功!')

          // 将配置的保存值 同步到几何中
          this.geometry.option.id = res.data.data
          var dk = this.geometry.attr
          dk.name = json.name
          dk.acreage = this.form.area
          dk.id = res.data.data
          dk.typeId = this.form.type

          // 因为是添加的 所以要给总数居添加记录
          var jd = this.$parent.getJD();
          json.id = res.data.data
          jd.dk.push({
            graphic: this.geometry,
            option: json
          })

          // 刷新显示列表
          this.$parent.$refs.jdTree.render();

          // 刷新地块的几何配置
          var geo_json = JSON.parse(json.geometry_json)
          geo_json.color = this.form.color
          this.geometry.attr = json
          this.geometry.option = geo_json

          // 几何创建
          this.geometry.createGeometry()
          this.geometry.showName()
          this.geometry.showZW()
          this.geometry.createSymbol()
        } else {

        }
        this.hideElement()
      })
    },

    deletes_del: function () {

      var geometry = this.geometry;
      var key = confirm('确定删除地块' + this.form.name + '?')

      if (!key) return
      if (this.form.rs_facilities_id) {
        var form = this.form
        clearFacilitiesGeometryJson(form.rs_facilities_id).then((res) => {

          // })
          // ajaxApi.deleteDKById(form.rs_facilities_id,(res)=>{
          if (res.code === 200) {
            this.$message.success('删除成功')
            // 清除几何的选中状态
            geometry.unedit()
            // 清除几何
            geometry.remove()
            // 将删除的几何添加进入列表
            var jd = this.$parent.getJD();
            var dk = jd.dk.find((e) => { return e.option.id === form.rs_facilities_id });
            dk.graphic = null;
            // jd.dk.splice(jd.dk.indexOf(dk),1);
            //刷新创建列表
            this.$parent.$refs.jdTree.render()
            // 清除
            this.hideElement()
          } else {
            this.$message.error(res.msg)
          }
        })
      } else {
        this.$message.success('删除成功')
        this.geometry.unedit()
        this.geometry.remove()
        this.hideElement()
      }
    },

    // 删除几何不删除地块
    deletes: function () {

      var key = confirm('确定删除地块' + this.form.name + '?')
      if (!key) return
      if (this.form.rs_facilities_id) {
        var form = this.form
        const config = {
          headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getToken() }
        }
        this.$axios.post(process.env.BASE_API + '/rs/rs_facilities/clearFacilitiesGeometryJson?rs_facilities_id=' + form.rs_facilities_id, {}, config).then(res => {
          if (res.data.code === 200) {
            this.$message.success('删除成功')
            // 清除几何的选中状态
            this.geometry.unedit()
            // 清除几何
            this.geometry.remove()
            // 将删除的几何添加进入列表
            this.$parent.getJD().dk.find((e) => { return e.option.id === form.rs_facilities_id }).graphic = null;
            //刷新创建列表
            this.$parent.$refs.jdTree.render()
            // 清除
            this.hideElement()
          } else {
            this.$message.error(res.data.msg)
          }
          this.hideElement()
        })
      } else {
        this.$message.success('删除成功')
        this.geometry.unedit()
        this.geometry.remove()
        this.hideElement()
      }

    },

    // 导入地块类型
    setType: function (dataType) {
      this.typeOption = dataType
    },

    // change
    change () {
      var json = JSON.parse(this.geometry.export())
      json.color = this.form.color
      json.opacity = this.form.opacity * 0.01
      json = {
        rs_facilities_id: this.form.rs_facilities_id || '',
        name: this.form.name || '',
        geometry_json: JSON.stringify(json) || '',
        acreage: this.form.area || '',
        rs_facilities_type_id: this.form.type || ''
      }

      var formData = new FormData()
      for (var i in json) {
        formData.append(i, json[i])
      }

      var dk = this.geometry.attr
      dk.name = json.name
      dk.geometry_json = json.geometry_json
      dk.acreage = json.acreage
      dk.rs_facilities_type_id = json.rs_facilities_type_id


      // 将添加的几何添加进入列表
      this.$parent.getJD().dk.find((e) => { return e.option.id === json.rs_facilities_id }).graphic = this.geometry;
      //刷新为创建列表
      this.$parent.$refs.jdTree.render()
      // 刷新几何配置
      this.geometry.option = JSON.parse(json.geometry_json)
      // 重新创建几何
      this.geometry.createGeometry()
      this.geometry.showName()
      this.geometry.showZW()
      this.geometry.createSymbol();
    },

    // 回滚
    // change
    unchange () {

      var json = JSON.parse(this.geometry.export())
      json.color = this.form1.color
      json.opacity = this.form1.opacity * 0.01
      json = {
        rs_facilities_id: this.form1.rs_facilities_id || '',
        name: this.form1.name || '',
        geometry_json: JSON.stringify(json) || '',
        acreage: this.form1.area || '',
        rs_facilities_type_id: this.form1.type || ''
      }

      var formData = new FormData()
      for (var i in json) {
        formData.append(i, json[i])
      }

      var dk = this.geometry.attr
      dk.name = json.name
      dk.geometry_json = json.geometry_json
      dk.acreage = json.acreage
      dk.rs_facilities_type_id = json.rs_facilities_type_id


      // 将添加的几何添加进入列表
      this.$parent.getJD().dk.find((e) => { return e.option.id === json.rs_facilities_id }).graphic = this.geometry;
      //刷新为创建列表
      this.$parent.$refs.jdTree.render()
      // 刷新几何配置
      this.geometry.option = JSON.parse(json.geometry_json)
      // 重新创建几何
      this.geometry.createGeometry()
      this.geometry.showName()
      this.geometry.showZW()
      this.geometry.createSymbol();
    },

  }
}

</script>

<style>
.dk_info {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
}
.dk_info.open {
  width: 0;
}
.dk_info .cover {
  height: 100%;
  background: #000000;
  opacity: 0.85;
}
.createDK {
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
  height: calc(100% - 100px) !important;
  background: #ffffff;
}
.createDK .model {
  display: flex;
  padding: 10px;
  align-items: center;
}
.createDK .model .modelName {
  width: 100px;
  text-align: right;
  padding: 0 10px;
}
.createDK .model .modelInput {
  width: calc(100% - 100px);
  border: solid 1px #8d93a8;
  border-radius: 8px;
  min-height: 35px;
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
