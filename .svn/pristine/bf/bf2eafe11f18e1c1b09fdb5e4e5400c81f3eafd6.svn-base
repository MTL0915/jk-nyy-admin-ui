<template>
  <div class="org_intro">
    <div style="background: #FFF;width:calc(100% - 355px);padding:20px;float:left">
      <div style="font-size:15px;line-height: 50px;">企业组织简介</div>
      <div style="line-height: 25px;color:gray">
        您可以将相关账户加入企业组织，组织成具有层级关系的结构。例如：如果您的账户代表一家公司，则可以将所有部门账户添加进来，按照公司结构组织这些部门账户的层级关系；如果您的账户是代理商，可以添加所有子公司账户。作为主账户，您还可以控制子账户的访问权限。
      </div>
      <div style="padding-top: 20px;border-bottom:1px solid #80808040;padding-bottom:20px;">
        <el-button type="primary" size="mini" icon="el-icon-plus" @click="show">创建企业组织</el-button>
        <el-button type="primary" size="mini" plain style="display: none;">查看文档</el-button>
      </div>
      <div style="font-size:15px;line-height: 50px;">使用场景</div>
      <div style="line-height: 25px;color:gray">
        <div style="float:left;width:50%">
          <div style="padding-left:15px">
            <div><span style="font-weight: bold;">场景一：</span>A公司拥有多个子公司，A公司和子公司之间既是相互关联的一个整体，也相对独立运行。

            A公司和子公司都希望有相对独立的帐户，能独立管理云资源。
            </div>
            <div style="padding-top: 20px;"><span style="font-weight: bold;">场景二：</span>代理商B拥有多个客户，代理商负责为客户管理名下云资源。</div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div style="background: #FFF;width:320px;padding:20px;height:190px;margin-left:25px;padding-right:0px;float:left;font-size: 14px;color: #333;">
        <div style="line-height: 40px;border-bottom:1px solid #80808040;">欢迎使用</div>
        <div style="line-height: 40px;">收到的邀请</div>
        <div style="line-height: 40px;font-size:12px;">0个</div>
      </div>
    </div>
    <div/>
    <el-dialog
      :append-to-body="true"
      :visible.sync="dialog"
      title="创建组织"
      width="580px"
    >
      <el-form
        ref="form"
        :inline="false"
        :model="form"
        :rules="rules"
        size="small"
        label-width="100px"
      >
        <el-form-item label="企业名称：" prop="bs_org_name" >
          <el-input v-model="form.bs_org_name"/>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button
          type="text"
          @click="dialog = false"
        >取消</el-button>
        <el-button
          :loading="loading"
          type="primary"
          @click="attestationOrg"
        >确认</el-button>
      </div>

    </el-dialog>
  </div>
</template>

<script>
import { attestationOrg } from '@/api/org'

export default {
  name: 'OrgIntro',
  data() {
    return {
      dialog: false,
      form: {
        bs_org_name: null
      },
      rules: {
        bs_org_name: [
          { required: true, message: '请输入组织名称', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {

  },
  methods: {
    show() {
      this.dialog = true
    },
    attestationOrg() {
      const _this = this

      attestationOrg({ bs_org_name: this.form.bs_org_name }).then(res => {
        _this.dialog = false
        if (res.code === 200) {
          _this.$message.success(res.msg)
          _this.$router.push('/orgIndex')
        } else {
          _this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
