<template>

  <div class="createDK">
    <div class="header">
      智慧农场
    </div>
    <div class="content">
      <div class="model">
        <div class="modelName">名称</div>
        <div class="modelInput">
          <!-- {{form.name}} -->
          <input
            v-model="form.name"
            :disabled="true"
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
            :disabled="true"
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
              :disabled="true"
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
            :disabled="true"
            style="width: 50px;position: absolute;height: 32px;margin: 0;border-radius: 8px;"
            type="color"
          >
        </div>
      </div>
      <div class="model">
        <div class="modelName">透明度</div>
        <div class="modelInput">
          <div class="block">
            <el-slider
              :disabled="true"
              v-model="form.opacity"
              :step="10"
            />
          </div>
        </div>
      </div>
      <div class="model">
        <div class="modelName">作物类别</div>
        <div class="modelInput">
          <input
            v-model="form.zwname"
            type="text"
          >
        </div>
      </div>
    </div>
    <div class="createDK-footor">
      <div
        class="footor_btn"
        @click="save"
      > 保存 </div>
      <div
        class="footor_btn"
        @click="hideElement"
      > 取消 </div>
    </div>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
export default {
  name: 'InfoCreateZW',
  data() {
    return {
      name: 'InfoCreateZW',
      typeOption: [
        { name: '测试1', value: '测试1' },
        { name: '测试2', value: '测试2' }
      ],
      form: {
        name: '',
        area: '',
        area_: '',
        type: '',
        color: '',
        opacity: '',
        zwname: '香蕉',
        zwid: '香蕉'
      }

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
    },
    destroy: function() {
      for (var i in this.form) {
        this.form[i] = ''
      }
    },
    setGemotry: function(geometry) {
      this.destroy()
      this.geometry = geometry
      var option = {
        name: geometry.attr.name,
        rs_facilities_id: geometry.attr.id,
        color: geometry.option.color,
        area_: parseInt(geometry.area / 666.7) + '亩',
        area: geometry.attr.acreage + '亩',
        opacity: geometry.option.opacity * 100,
        type: geometry.attr.rs_facilities_type_id
      }
      this.setInfo(option)
    },
    hideElement: function() {
      this.$parent.isshowZWCreateInfo = false
      this.destroy()
    },
    save: function() {
      if (this.form.rs_facilities_id) {
        // 存在id 确认修改
        this.update_jidi()
      } else {
        // 不存在id 添加
        // this.add();
      }
    },
    // 修改基地
    update_jidi: function() {
    // var form = this.form
      this.formData = new FormData()
      // 				for( var i in form ){
      // // 					if( i === "geometry" ){
      // // 						var json = this.geometry.export();
      // // 						if(json){
      // // 							json = JSON.parse(json);
      // // 							json.color = form.color;
      // // 						}
      // // 						this.formData.append(i, JSON.stringify(json));
      // // 						continue;
      // // 					}
      // 					if( i == "id" ){
      // 						this.formData.append("rs_facilities_id", form[i]);
      // 						continue;
      // 					}
      // 					this.formData.append(i, form[i]);
      // 				}

      //   this.formData.append(i, form.rs_facilities_id)
      //   this.formData.append(i, form.rs_facilities_id)
      const config = {
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getToken() }
      }
      this.$axios.post(process.env.BASE_API + '/bs/bs_base/update', this.formData, config).then(res => {
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
          this.geometry.createGeometry()
          this.geometry.createSymbol()
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    // 导入地块类型
    setType: function(dataType) {
      this.typeOption = dataType
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
  height: calc(100% - 100px);
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
