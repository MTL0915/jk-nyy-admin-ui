<template>

  <div class="dk_info open" v-show='showBox'>
    <div class="createDK">
      <div class="header">
        全景编辑
      </div>
      <div class="content">
       
        <!-- <div class='model'>
          <div class="modelName">选择场景</div>
          <div class="modelInput" style='border: none;'>
            <div class="modelInput">
              <el-select v-model="form.id" style='width:100%' @change="changeScene" type="text" >
                <el-option v-for='(it,i) in sceneList' :key='i' :label="it.name" :value="it.id"></el-option>
              </el-select>
            </div>
          </div>
        </div> -->
        <div class='model'>
          <div class="modelName">编辑场景</div>
          <div class="modelInput" style='border: none;'>
            <div class="modelInput">
              <button @click='goEditPanor' style="width: 100%;height: 34px;">进入</button>
            </div>
          </div>
        </div>
        <div class="model">
          <div class="modelName">选择图片</div>
          <div class="modelInput" style='border: none;position:relative;'>
            <img class='QJPic' @click='handleEdit' :src='form.img' />
            <i class='el-icon-delete-solid' @click='clearImg' style='color:red;position:absolute;right:0;top:0;font-size:21px;'></i>
          </div>
        </div>
       
      </div>
      <div class="createDK-footor">
        <div class="footor_btn" style="color:red;" @click='del' > 删除 </div>
        <div class="footor_btn" @click='save' > 保存 </div>
        <div class="footor_btn" @click='exit' > 取消 </div>
      </div>
    </div>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
import { add, edit , get , getByBaseId , changeImage } from '@/api/rsPanorScene'

export default {
  name: 'editVr',
  data() {
    return {
      name: 'editVr',
      showBox : false,
      form: {
        name: '',
        img : "",
        id : "",
      },
      // 禁止重复请求
      isSave: false,
      sceneList : [],
    }
  },
  computed: {
    ...mapGetters([
      'id',
      'token',
      'user'
    ])
  },
  mounted (){
    // this.getPanorList()
  },
  methods: {

    goEditPanor (){
      var json = this.geometry.attr
      this.$parent.show.vr = true
      setTimeout(() => {
        this.$parent.$refs.vrIframe.src = `/vr_edit?panorId=${json.rsPanorId}&sceneId=${json.id}`;
      }, 200);
    },

    // 场景变化
    changeScene (){
      // 将原有场景经纬度赋值给现在的      
      var a = this.sceneList.find((e)=>{ return e.id == this.form.id });
      this.form.img = process.env.IMG_URL + a.thumbnailPath;
      this.file = null;
    },

    // 清除图片
    clearImg (){
      // 还原显示图片
      this.form.img = process.env.IMG_URL + this.geometry.attr.thumbnailPath;
      // 清空file缓存
      this.file = null;
    },

    del (){
      // 如果没有id变化 直接修改经纬度坐标
      if( confirm("是否删除全景场景") ){
        var key = this.openLoading();
        edit({
          id : this.geometry.attr.id,
          longitude : "",
          latitude : "",
        }).then((e)=>{
          key.close();
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.geometry.remove();
          this.geometry.attr.latitude = "";
          this.geometry.attr.longitude = "";
          this.hide({type: "delete"});
        })
      }
    },

    hide(type){
      if( type === "save" ){
        this.$message({
          message: '保存成功',
          type: 'success'
        });
      }
      // 关闭编辑模式
      this.geometry.unedit();
      this.showBox = false;
      this.geometry = null;
    },

    // 退出放弃
    exit (){
      // 将几何坐标恢复
      this.geometry.graphic.geometry.x = this.geometry.attr.longitude;
      this.geometry.graphic.geometry.y = this.geometry.attr.latitude;
      this.geometry.layer.refresh();
      this.hide({ type : "exit" });
    },

    show (geometry){
      if( this.geometry ){
        return ;
      };
      this.file = null;
      this.geometry = geometry;
      this.form.name = geometry.attr.name;
      this.form.img = process.env.IMG_URL + geometry.attr.thumbnailPath;
      this.form.imagePath = geometry.attr.thumbnailPath;
      this.form.id = geometry.attr.id;
      this.showBox = true;
      this.getPanorList();
      // 开启编辑模式
      this.geometry.edit();
    },

    // 获取场景列表
    getPanorList (){
      getByBaseId(this.$store.state.baseinfo.cur_base_id).then((e)=>{
        this.sceneList = e.content.filter((e)=>{
          return !e.longitude || ( e.id === this.form.id );
        });
      });
    },

    // 保存
    save (){
      var json = this.geometry.attr;
      // 判断一下id是不是变化了
      if( this.form.id !== this.geometry.attr.id ){
        // 如果变化了就进行坐标切换
        // 清除原有的场景经纬度
        var key = this.openLoading();
        edit({
          id : json.id,
          latitude : "",
          longitude :"",
        }).then(()=>{
          // 将原有场景经纬度赋值给现在的      
          var a = this.sceneList.find((e)=>{ return e.id == this.form.id });
          edit({
            id : a.id,
            latitude : this.geometry.graphic.geometry.y || json.latitude,
            longitude : this.geometry.graphic.geometry.x || json.longitude,
          }).then(()=>{
            a.longitude = this.geometry.graphic.geometry.x;
            a.latitude = this.geometry.graphic.geometry.y;
            this.geometry.attr = a;
            key.close();
            // 上传图片
            this.updateImage();
          })
        }) 
      }else{
        // 如果没有id变化 直接修改经纬度坐标
        edit({
          id : json.id,
          longitude : this.geometry.graphic.geometry.x,
          latitude : this.geometry.graphic.geometry.y,
        }).then((e)=>{
          this.geometry.attr.latitude = this.geometry.graphic.geometry.x;
          this.geometry.attr.longitude = this.geometry.graphic.geometry.y;
          // 上传图片
          this.updateImage();
        });
      }
    },

    updateImage (){
      // 如果存在图片情况 则上传图片
      if( this.file ){
        var key = this.openLoading();
        changeImage({
          id : this.form.id,
          image : this.file.files[0]
        }).then((e)=>{
          key.close();
          this.hide({type:"save"});
        }).error(()=>{
          key.close();
          this.hide({type:"save"});
        })
      }else{
        this.hide({type:"save"});
      }
    },

    // 选择图片
    handleEdit (){
      var _this = this;
      if( !this.file ){
        this.file = document.createElement("input");
        this.file.type='file';
        this.file.onchange = function(){
            _this.form.img = URL.createObjectURL(this.files[0]);
        }
      }
      this.file.click();
    },
  }
}

</script>

<style>
.dk_info {
  position: absolute;
  top: 0 ;
  right : 0;
  width: 100%;
  height : 100%;
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

.createDK .QJPic {
  width: 100%;
  height: 100px;
}

.createDK .btns {
  display: none;
}

.createDK .modelInput:hover > .btns {
  display:block;
}
</style>
