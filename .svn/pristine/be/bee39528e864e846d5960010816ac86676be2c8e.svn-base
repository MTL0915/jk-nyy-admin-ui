<template>
  <el-dialog
    :append-to-body="true"
    :visible.sync="dialog"
    :title="isAdd ? '新增' : '编辑'"
    width="1100px"
  >
    <!-- <el-form
      ref="form"
      :model="form"
      :rules="rules"
      size="small"
      label-width="80px"
    > -->
      <!-- <el-form-item label="所属全景项目" >
        <el-select v-model="form.rsPanorId" name='rsPanorId' placeholder="请选择活动区域">
          <el-option v-for='(it,i) in panorList' :key='i' :label="it.name" :value="it.id"></el-option>
        </el-select>
      </el-form-item> -->
      <!-- <el-form-item label="场景名称">
        <el-input
          v-model="form.name"
          name='name'
          style="width: 370px;"
        />
      </el-form-item> -->
      <!-- <el-form-item label="场景图片路径"> -->
        <!-- <div class='updateImgsDiv'>
          <div @click='clickUpdate' class='btnUpdate'>点击上传</div>
        </div> -->
        <el-button type="primary" @click="clickUpdate">添加</el-button>
        <div style='max-height: 240px;overflow: auto;margin-top: 15px;border-top: solid 1px #409eff;padding: 15px;'>
          <div style='display:flex;flex-wrap: wrap;'>
            <div class='updateImgsDiv' v-for='(it,i) in files' :key='i'>
              <img :src='it.base64' />
              <div class='imgTools'>
                <i class='el-icon-delete' @click='deleteArImg(i)'></i>
                <i class='el-icon-setting' @click='updateImage(it)'></i>
              </div>
              <input type='text' class='inputText' v-model='it.name' />
            </div>
          </div>
        </div>
        <!-- <input
          type='file'
          ref='file'
          @change='updateImage'
        /> -->
      <!-- </el-form-item> -->
    <!-- </el-form> -->
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        type="text"
        @click="cancel"
      >取消</el-button>
      <el-button
        :loading="loading"
        type="primary"
        @click="doSubmit"
      >确认</el-button>
      <!-- <el-button
        v-show='this.isAdd'
        :loading="loading"
        type="primary"
        @click="doSubmitGoNext"
      >确认并继续添加</el-button> -->
    </div>

  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/rsPanorScene'
import { get } from '@/api/rsPanor'
export default {
  props: {
    isAdd: {
      type: Boolean,
      required: true
    },
    sup_this: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      loading: false, dialog: false,
      form: {
        id: '',
        rsPanorId: this.sup_this.panor_id || "",
        name: '',
        imagePath: '',
      },
      rules: {
      },
      panorList: [],
      files: [],
      filesUrl:[]
    }
  },
  mounted () {
    this.getPanorList();
  },
  methods: {

    deleteArImg (i){
      this.files.splice(i,1);
    },

    updateImage (it) {
      var self = this;
      var file = document.createElement("input");
      file.type = 'file';
      file.onchange = function(e){
        var fs = new FileReader();
        fs.onload = function(e){
          it.base64 = e.currentTarget.result;
        }
        fs.readAsDataURL(this.files[0]);
      }
      file.click();
    },

    clickUpdate (){
      var self = this;
      var file = document.createElement("input");
      file.type = 'file';
      file.multiple="multiple";
      file.onchange = function(e){
        for( var i = 0; i< this.files.length ; i++ ){
          let it = this.files[i];
          let json = {
            files: it , 
            name: it.name.split(".")[0],
            base64: ""
          }
          var fs = new FileReader();
          fs.onload = function(e){
            json.base64 = e.currentTarget.result;
          }
          fs.readAsDataURL(it);
          self.files.push(json)
        }
      }
      file.click();
    },

    // 获取全景列表
    getPanorList () {
      get().then((e) => {
        this.panorList = e.data.content;
      })
    },
    show (json, isAdd) {
      for (var i in json) {
        typeof this.form[i] !== 'undefined' && (this.form[i] = json[i] || null);
      }
      this.dialog = true;
      typeof isAdd === 'boolean' && (this.isAdd = isAdd);
    },
    cancel () {
      this.resetForm()
    },
    doSubmit (param) {
      this.loading = true;
      if (this.isAdd) {
        this.doAdd(param)
      } else this.doEdit(param)
    },
    doSubmitGoNext (){
      if (this.form.name == ""){
        this.$message.error("名称不能为空!")
        return;
      }
      if (!this.$refs.file.files[0]){
        this.$message.error("上传文件不能为空!")
        return;
      }
      
      this.loading = true;
      this.doSubmit({
        isNext: true
      });
    },
    doAdd (param) {
      var data = this.files;
      var ilength = data.length;
      for( var i in data ){
        var it = data[i];
        add({
          rsPanorId: this.form.rsPanorId || this.sup_this.panor_id,
          name: it.name,
          image: it.files,
        }).then(res => {
          ilength --;
          if( ilength == 0  ){
            this.resetForm()
            this.$notify({
              title: '添加成功',
              type: 'success',
              duration: 2500
            })
            this.loading = false
            this.sup_this.init(false);
          }
        }).catch(err => {
          ilength --;
          this.loading = false
          console.log(err.response.data.message)
        })
      }
    },
    doEdit () {
      edit(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '修改成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.sup_this.init(false)
      }).catch(err => {
        this.loading = false
      })
    },
    resetForm () {
      this.dialog = false
      // this.$refs['form'].resetFields()
      // this.$refs.file.value = '';
      this.files = [];
      this.form = {
        id: '',
        rsPanorId: '',
        name: '',
        imagePath: '',
        ord: '',
        sta: '',
        createUser: '',
        createDate: ''
      }
    }
  }
}
</script>

<style scoped>
  .updateImgsDiv {
    width: 165px;
    height: 120px;
    /* border:solid 1px #409eff  ; */
    border-radius: 4px;
    position: relative;
    overflow: hidden;
    padding: 3px;
  }

  .btnUpdate:hover {
    font-size: 16px;
  }
  .btnUpdate {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background: #d7e7f7;
    border-radius: 4px;
    color: #2e90f5;
    cursor: pointer;
    transition: all 0.25s;
    user-select: none;
  }

  .updateImgsDiv:hover .imgTools {
    right: 0;
  }

  .updateImgsDiv > img {
    border: solid 1px #409eff;
    height: calc( 100% - 22px );
    width: 100%;
  }

  .imgTools {
    position: absolute;
    right: -170px;
    transition: 0.25s;
    cursor: pointer;
    background: #2e90f5ab;
    color: #ffffff;
    padding: 0 15px;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    height: calc( 100% - 22px );
    -webkit-box-align: center;
    align-items: center;
    top: 0;
  }

  .inputText {
    border:none;
  }

  .inputText:focus {
    border: solid 1px #46a6ff;
  }
  
</style>
