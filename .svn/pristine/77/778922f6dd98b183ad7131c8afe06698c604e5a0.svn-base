<template>
  <div class="register">
    <!-- <div class="r-header">
      <div style="margin-left: 20px;padding-top:5px">
        <a
          href="/login"
          style="font-size:20px;font-weight: 800;color:#000000a6;display: block;margin-left: 10px"
        >
          <img
            src="../../assets/logo/logo3.png"
            style="float:left;display: block;"
          >
          <span style="float:left;display: block;padding-top: 8px;margin-left: 8px;">农语云</span>
        </a>
      </div>
    </div> -->
    <div style="width:calc(100% - 40px);height:calc(100% - 120px);margin:auto;margin:20px;padding:20px;background: #FFFFFF;">
      <div style="width: 100%;">
        <div style="font-size: 16px;font-weight: bold;">创建/加入基地</div>
      </div>

      <div class="product-intro">
        <div>
          <div style="font-size:20px;font-weight: 510;">欢迎使用&nbsp;&nbsp;农语云</div>
          <div style="color: #666;line-height: 1.5;font-size: 13px;width: 600px;margin: auto;margin-top: 30px;">
            实时监控生产基地的天气变化、土壤墒情、作物长势、虫情监测等，异常情况智能预警，险情及时有效排解。远程自动化控制农业设施设备，降低成本、提高效率、提升农产品产量与品质、提高经济效益。
          </div>
          <div style="width:750px;margin:auto;margin-top:40px;font-size:15px;">
            <div
              style="margin-left:0px"
              class="item-img"
            >
              <div><img src="../../assets/register/1.jpg"></div>
              <div style="margin-top: 10px;">轻松管理基地信息</div>
            </div>
            <div class="item-img">
              <div><img src="../../assets/register/2.jpg"></div>
              <div style="margin-top: 10px;">实时查看基地监控</div>
            </div>
            <div class="item-img">
              <div><img src="../../assets/register/3.jpg"></div>
              <div style="margin-top: 10px;">云端数据更安全</div>
            </div>
            <div class="item-img">
              <div><img src="../../assets/register/4.jpg"></div>
              <div style="margin-top: 10px;">企业组织易管理</div>
            </div>
            <div class="item-img">
              <div><img src="../../assets/register/5.jpg"></div>
              <div style="margin-top: 10px;">报障一键完成</div>
            </div>
          </div>
        </div>
        <div style="padding-top:40px;clear: both;">
          <div
            v-if="applySta==0"
            class="register-item"
            style="clear: both;"
          >
            <div style="font-size:25px;color:green;font-weight: bold;line-height:35px">您的申请已经提交，请耐心等待管理员审批<br>或者<a
                href="#"
                style="color:blue;text-decoration:underline;"
                @click="cancelApply()"
              >撤消申请</a></div>
          </div>
          <div
            v-if="applySta==2"
            class="register-item"
            style="clear: both;"
          >
            <div style="font-size:25px;color:#005050;font-weight: bold;line-height:35px">您的申请<i
                style="color:red;font-style:normal;text-decoration:underline;"
                title="审批未通过"
              >未通过</i>，您可以重新加入或创建自己的基地</div>
          </div>
          <div
            v-if="applySta==-1 || applySta==2"
            class="register-item"
            style="padding-top:20px;clear: both;"
          >
            <button
              type="button"
              class="submit-btn join-btn"
              style="width:145px;height:42px;"
              @click="joinDialog=true"
            >加入基地</button>
            <button
              type="button"
              class="submit-btn create-btn"
              style="width:145px;height:42px;margin-left:25px"
              @click="createDialog=true"
            >创建基地</button>
            <!-- <button
              type="button"
              class="submit-btn invite-btn"
              style="width:145px;height:42px;margin-left:25px"
              @click="invite()"
            >接受邀请</button> -->
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      :append-to-body="true"
      :visible.sync="createDialog"
      title="创建基地"
      height="200px"
      width="580px"
    >
      <div>
        <div>
          <input
            v-model="bs_base_name"
            type="text"
            class="register-input-text"
            placeholder="请输入基地的名称"
          >
        </div>
        <div
          class="register-item"
          style="text-align: center;"
        >
          <el-button
            type="primary"
            @click="createBase()"
          >确定创建</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      :append-to-body="true"
      :visible.sync="joinDialog"
      title="加入基地"
      height="200px"
      width="580px"
    >
      <div>
        <div>
          <el-input
            v-model="applyForm.bs_base_code"
            placeholder="请输入要加入基地的代码"
          />
        </div>
        <div
          class="register-item"
          style="text-align: center;"
        >
          <el-button
            :loading="loading"
            type="primary"
            @click="joinBase()"
          >申请加入</el-button>
        </div>
      </div>
    </el-dialog>
    <inviteList ref="inviteList" />
  </div>

</template>

<script>
import Config from '@/config'
import { create as createBase, applyJoinBase, getApprovalSta, cancelApply } from '@/api/baseInfo'
import Cookies from 'js-cookie'
import inviteList from './inviteList'
import { authinfo } from '@/api/user'

export default {
  name: 'Register',
  components: { inviteList },
  data () {
    return {
      applyForm: {
        bs_base_code: null
      },
      createDialog: false,
      joinDialog: false,
      bs_base_name: '',
      applySta: -1,
      applyId: '',
      loading: false
    }
  },
  created () {
    // getApprovalSta({ name: this.bs_base_name }).then(res => {
    //   var _this = this
    //   if (res.data != null && res.data.length > 0) {
    //     if (res.data[0].sta == 1) {
    //       window.location.href = '/dashboard'
    //     } else {
    //       this.applySta = res.data[0].sta * 1
    //       this.applyId = res.data[0].id
    //     }
    //   }
    // })
  },
  methods: {
    // 接受邀请
    invite () {
      this.$refs.inviteList.getList()
    },
    // 创建基地
    createBase () {
      if (this.bs_base_name == '') {
        this.$message.info('请输入基地名称')
        return
      }
      createBase({ name: this.bs_base_name }).then(res => {
        var _this = this
        if (res.code == 200) {
          this.$alert('创建基地成功!', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              authinfo().then(res => {
                if (res.code === 200) {
                  this.$store.commit("SET_USER", res.data)
                  window.location.href = '/dashboard'
                } else {
                  this.$message.error('获取用户信息失败!')
                }
              })
            }
          })
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 申请加入基地
    joinBase () {
      if (this.applyForm.bs_base_code === null || this.applyForm.bs_base_code === '') {
        this.$message({
          message: '请输入基地编码',
          type: 'warning'
        })
        return false
      }
      this.loading = true
      applyJoinBase(this.applyForm).then(res => {
        this.loading = false
        if (res.code === 200) {
          this.joinDialog = false
          this.applySta = 0,
            this.$message({
              message: res.msg,
              type: 'success'
            })
        } else {
          this.$message({
            message: res.msg,
            type: 'warning'
          })
        }
      })
    },
    // 取消申请
    cancelApply () {
      var _this = this
      this.$confirm('确定撤消?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        cancelApply({ id: _this.applyId }).then(res => {
          if (res.data != null && res.data > 0) {
            _this.$message.success('已经成功撤消申请！')
            _this.applySta = -1
          } else {
            _this.$message.error('撤消失败！')
          }
        })
      }).catch(() => {

      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.register {
  background: #ededed !important;
  color: #000;
}

.product-intro {
  width: 850px;
  height: 400px;
  margin: auto;
  padding-top: 100px;
  text-align: center;
  .item-img {
    float: left;
    margin-left: 45px;
    img {
      width: 110px;
      height: 110px;
    }
  }
}
.register {
  height: 100%;
  .r-header {
    height: 60px;
    box-sizing: border-box;
    background-color: #fff;
    border-bottom: #e5e5e5 1px solid;
  }
}
.register-item {
  margin-top: 20px;
  span {
    display: inline-block;
    vertical-align: middle;
    max-width: 85%;
    line-height: 1.4;
    font-size: 14px;
    cursor: pointer;
  }
}
.register-input-text {
  font-size: 14px;
  height: 45px;
  width: 100%;
  display: inline-block;
  border: 1px solid #e5e5e5;
  color: #333;
  vertical-align: middle;
  padding: 13px 10px 12px;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0;
  &:focus {
    border-color: #00a2ff !important;
    outline: 0;
  }
  &:hover {
    border-color: #b3b3b3;
    border: 1px solid #b3b3b3;
    outline: 0;
  }
}

.vcode-btn {
  border: 1px solid #00a4ff;
  color: #00a4ff;
  background-color: #fff;
  width: 208px;
  height: 45px;
  float: right;
  line-height: 43px;
  padding: 0 20px;
  cursor: pointer;
  outline: 0;
  display: inline-block;
  vertical-align: top;
  font-size: 14px;
  &:hover {
    background-color: #00a4ff;
    border: 1px solid #00a4ff;
    color: #fff;
  }
}
.submit-btn {
  width: 100%;
  height: 45px;
  border: none;
  margin-bottom: 20px;
  font-size: 14px;
  background-color: #00a4ff;
  color: #fff;
  outline: 0;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #0097ee;
  }
}
.join-btn {
  background: #0058cc !important;
  &:hover {
    background: #07336d !important;
  }
}
.invite-btn {
  background: #40e0d0 !important;
  &:hover {
    background: #07336d !important;
  }
}
</style>
