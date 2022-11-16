<template>
  <div>

    <div style="width: 180px;margin-bottom: 11px;">
      <el-input
        size="mini"
        v-model="searchInput"
        placeholder="搜索"
      ></el-input>
    </div>

    <div>
      <el-button
        class="bt"
        :type="(searchInput!==null && searchInput!=='' && '托普云农设备'.indexOf(searchInput)!==-1)?'success':'primary'"
        size="mini"
        @click="addZjtpyun"
      >托普云农设备</el-button>

      <el-button
        class="bt"
        :type="(searchInput!==null && searchInput!=='' && '瑞丰设备'.indexOf(searchInput)!==-1)?'success':'primary'"
        size="mini"
        @click="addRuifeng"
      >瑞丰设备</el-button>

      <el-button
        class="bt"
        :type="(searchInput!==null && searchInput!=='' && '冠辰设备'.indexOf(searchInput)!==-1)?'success':'primary'"
        size="mini"
        @click="addGuanchen"
      >冠辰设备</el-button>

      <el-button
        class="bt"
        :type="(searchInput!==null && searchInput!=='' && '盟创云设备'.indexOf(searchInput)!==-1)?'success':'primary'"
        size="mini"
        @click="addMengchuangyun"
      >盟创云设备</el-button>

      <el-button
        class="bt"
        :type="(searchInput!==null && searchInput!=='' && 'OneNet设备'.indexOf(searchInput)!==-1)?'success':'primary'"
        size="mini"
        @click="addOnenet"
      >OneNet设备</el-button>

    </div>
    <div style="margin-top:20px">

      <el-button
        class="bt"
        :type="(searchInput!==null && searchInput!=='' && '比昂设备'.indexOf(searchInput)!==-1)?'success':'primary'"
        size="mini"
        @click="addBiang"
      >比昂设备</el-button>

      <el-button
        class="bt"
        :type="(searchInput!==null && searchInput!=='' && '慧冷云设备'.indexOf(searchInput)!==-1)?'success':'primary'"
        size="mini"
        @click="addHuilengyun"
      >慧冷云设备</el-button>

      <el-button
        class="bt"
        :type="(searchInput!==null && searchInput!=='' && '为动科技设备'.indexOf(searchInput)!==-1)?'success':'primary'"
        size="mini"
        @click="addWeidkz"
      >为动科技设备</el-button>

      <el-button
        class="bt"
        :type="(searchInput!==null && searchInput!=='' && '科大讯飞'.indexOf(searchInput)!==-1)?'success':'primary'"
        size="mini"
        @click="addIflytek"
      >科大讯飞</el-button>

      <el-button
        class="bt"
        :type="(searchInput!==null && searchInput!=='' && '云牧设备'.indexOf(searchInput)!==-1)?'success':'primary'"
        size="mini"
        @click="addYunMu"
      >云牧设备</el-button>

    </div>

    <div style="margin-top:20px">
      <el-button
        class="bt"
        :type="(searchInput!==null && searchInput!=='' && '北斗设备'.indexOf(searchInput)!==-1)?'success':'primary'"
        size="mini"
        @click="addJT808"
      >北斗设备</el-button>

      <el-button
        class="bt"
        :type="(searchInput!==null && searchInput!=='' && '全产业链溯源平台设备'.indexOf(searchInput)!==-1)?'success':'primary'"
        size="mini"
        @click="addSuyuan51"
      >全产业链溯源平台设备</el-button>

      <el-button
        class="bt"
        :type="(searchInput!==null && searchInput!=='' && '威视佰科设备'.indexOf(searchInput)!==-1)?'success':'primary'"
        size="mini"
        @click="addVispek"
      >威视佰科设备</el-button>

      <el-button
        class="bt"
        :type="(searchInput!==null && searchInput!=='' && '精讯云设备'.indexOf(searchInput)!==-1)?'success':'primary'"
        size="mini"
        @click="addJingxun"
      >精讯云设备</el-button>

      <el-button
        class="bt"
        :type="(searchInput!==null && searchInput!=='' && '海豹设备'.indexOf(searchInput)!==-1)?'success':'primary'"
        size="mini"
        @click="addSeal"
      >海豹设备</el-button>

    </div>

    <div style="margin-top:20px">

      <el-button
        class="bt"
        :type="(searchInput!==null && searchInput!=='' && '瑞德设备'.indexOf(searchInput)!==-1)?'success':'primary'"
        size="mini"
        @click="addRuide"
      >瑞德设备</el-button>

      <!-- 海睿设备  -->
      <el-button
        class="bt"
        :type="(searchInput!==null && searchInput!=='' && '海睿设备'.indexOf(searchInput)!==-1)?'success':'primary'"
        size="mini"
        @click="addHairui"
      >海睿设备</el-button>

      <el-button
        class="bt"
        :type="(searchInput!==null && searchInput!=='' && '诚顺设备'.indexOf(searchInput)!==-1)?'success':'primary'"
        size="mini"
        @click="addChengshun"
      >诚顺设备</el-button>

      <el-button
        class="bt"
        :type="(searchInput!==null && searchInput!=='' && '杭州农耕设备'.indexOf(searchInput)!==-1)?'success':'primary'"
        size="mini"
        @click="addNonggeng"
      >杭州农耕设备</el-button>

      <el-button
        class="bt"
        :type="(searchInput!==null && searchInput!=='' && '赛诺光谱仪设备'.indexOf(searchInput)!==-1)?'success':'primary'"
        size="mini"
        @click="addSainuo"
      >赛诺光谱仪设备</el-button>

    </div>

    <div style="margin-top:20px">
      <el-button
        class="bt"
        :type="(searchInput!==null && searchInput!=='' && '营养液元素监测仪'.indexOf(searchInput)!==-1)?'success':'primary'"
        size="mini"
        @click="addYingyangye"
      >营养液元素监测仪</el-button>

      <el-button
        class="bt"
        :type="(searchInput!==null && searchInput!=='' && '海康云眸设备'.indexOf(searchInput)!==-1)?'success':'primary'"
        size="mini"
        @click="addHikcloud"
      >海康云眸设备</el-button>

      <el-button
        class="bt"
        :type="(searchInput!==null && searchInput!=='' && '蓝奥声设备'.indexOf(searchInput)!==-1)?'success':'primary'"
        size="mini"
        @click="addAlmsound"
      >蓝奥声设备</el-button>

      <el-button
        class="bt"
        :type="(searchInput!==null && searchInput!=='' && '广东弘科托普设备'.indexOf(searchInput)!==-1)?'success':'primary'"
        size="mini"
        @click="addZjtpyunGdhk"
      >广东弘科托普设备</el-button>
    </div>

    <el-dialog
      append-to-body
      title="托普云农"
      :visible.sync="zjtpyunDialogVisible"
      v-if="zjtpyunDialogVisible"
    >
      <addZjtpyun />
    </el-dialog>
    <el-dialog
      append-to-body
      title="瑞丰"
      :visible.sync="ruifengDialogVisible"
      v-if="ruifengDialogVisible"
    >
      <addRuifeng />
    </el-dialog>
    <el-dialog
      append-to-body
      title="冠辰设备"
      :visible.sync="guanchenDialogVisible"
      v-if="guanchenDialogVisible"
    >
      <addGuanchen />
    </el-dialog>

    <el-dialog
      append-to-body
      title="盟创云设备"
      :visible.sync="mengchuangyunDialogVisible"
      v-if="mengchuangyunDialogVisible"
    >
      <addMengchuangyun />
    </el-dialog>

    <el-dialog
      append-to-body
      title="OneNet设备"
      :visible.sync="onenetDialogVisible"
      v-if="onenetDialogVisible"
    >
      <addOnenet />
    </el-dialog>

    <el-dialog
      append-to-body
      title="比昂设备"
      :visible.sync="biangDialogVisible"
      v-if="biangDialogVisible"
    >
      <addBiang />
    </el-dialog>

    <el-dialog
      append-to-body
      title="慧冷云设备"
      :visible.sync="huilengyunDialogVisible"
      v-if="huilengyunDialogVisible"
    >
      <addHuilengyun />
    </el-dialog>

    <el-dialog
      append-to-body
      title="为动科技"
      :visible.sync="weidkzDialogVisible"
      v-if="weidkzDialogVisible"
    >
      <addWeidkz />
    </el-dialog>

    <el-dialog
      append-to-body
      title="科大讯飞"
      :visible.sync="iflytekDialogVisible"
      v-if="iflytekDialogVisible"
    >
      <addIflytek />
    </el-dialog>

    <el-dialog
      append-to-body
      title="云牧设备"
      :visible.sync="yunMuDialogVisible"
      v-if="yunMuDialogVisible"
    >
      <addYunMu />
    </el-dialog>

    <el-dialog
      append-to-body
      title="北斗设备"
      :visible.sync="jt808DialogVisible"
      v-if="jt808DialogVisible"
    >
      <addJT808 />
    </el-dialog>

    <el-dialog
      append-to-body
      title="全产业链溯源平台设备"
      :visible.sync="suyuan51DialogVisible"
      v-if="suyuan51DialogVisible"
    >
      <addSuyuan51 />
    </el-dialog>

    <el-dialog
      append-to-body
      title="威视佰科设备"
      :visible.sync="vispekDialogVisible"
      v-if="vispekDialogVisible"
    >
      <addVispek />
    </el-dialog>

    <el-dialog
      append-to-body
      title="精讯云设备"
      :visible.sync="jingxunDialogVisible"
      v-if="jingxunDialogVisible"
    >
      <addJingxun />
    </el-dialog>

    <el-dialog
      append-to-body
      title="海豹设备"
      :visible.sync="sealDialogVisible"
      v-if="sealDialogVisible"
    >
      <addSeal />
    </el-dialog>

    <el-dialog
      append-to-body
      title="瑞德设备"
      :visible.sync="ruideDialogVisible"
      v-if="ruideDialogVisible"
    >
      <addRuide />
    </el-dialog>

    <el-dialog
      append-to-body
      title="海睿设备"
      :visible.sync="hairuiDialogVisible"
      v-if="hairuiDialogVisible"
    >
      <addHairui />
    </el-dialog>

    <el-dialog
      append-to-body
      title="诚顺设备"
      :visible.sync="chengshunDialogVisible"
      v-if="chengshunDialogVisible"
    >
      <addChengshun />
    </el-dialog>

    <el-dialog
      append-to-body
      title="杭州农耕设备"
      :visible.sync="nonggengDialogVisible"
      v-if="nonggengDialogVisible"
    >
      <addNonggeng />
    </el-dialog>

    <el-dialog
      append-to-body
      title="赛诺光谱仪设备"
      :visible.sync="sainuoDialogVisible"
      v-if="sainuoDialogVisible"
    >
      <addSainuo />
    </el-dialog>

    <el-dialog
      append-to-body
      title="营养液元素监测仪"
      :visible.sync="yingyangyeDialogVisible"
      v-if="yingyangyeDialogVisible"
    >
      <addYingyangye />
    </el-dialog>

    <el-dialog
      append-to-body
      title="海康云眸设备"
      :visible.sync="hikcloudDialogVisible"
      v-if="hikcloudDialogVisible"
    >
      <addHikcloud />
    </el-dialog>

    <el-dialog
      append-to-body
      title="蓝奥声设备"
      :visible.sync="almsoundDialogVisible"
      v-if="almsoundDialogVisible"
    >
      <addAlmsound />
    </el-dialog>

    <el-dialog
      append-to-body
      title="广东弘科托普设备"
      :visible.sync="zjtpyunGdhkDialogVisible"
      v-if="zjtpyunGdhkDialogVisible"
    >
      <addZjtpyunGdhk />
    </el-dialog>

  </div>
</template>
<script>
import addZjtpyun from "./zjtpyun/add";
import addRuifeng from "./ruifeng/add";
import addGuanchen from "./guanchen/add";
import addMengchuangyun from "./mengchuangyun/add";
import addOnenet from "./onenet/add";
import addBiang from './biang/add'
import addHuilengyun from './huilengyun/add'
import addWeidkz from './weidkz/add'
import addIflytek from './iflytek/add'
import addYunMu from './yunMu/add'
import addJT808 from './jt808/add'
import addSuyuan51 from './suyuan51/add'
import addVispek from './vispek/add'
import addJingxun from './jingxun/add'
import addSeal from './seal/add'
import addRuide from './ruide/add'
import addHairui from './hairui/add'
import addChengshun from './chengshun/add'
import addNonggeng from './nonggeng/add'
import addSainuo from './sainuo/add'
import addYingyangye from './yingyangye/add'
import addHikcloud from './hikcloud/add'
import addAlmsound from './almsound/add'
import addZjtpyunGdhk from './zjtpyunGdhk/add'

export default {
  components: {
    addZjtpyun, addRuifeng, addGuanchen, addMengchuangyun, addOnenet, addBiang, addHuilengyun, addWeidkz, addSainuo,
    addIflytek, addYunMu, addJT808, addSuyuan51, addVispek, addJingxun, addSeal, addRuide, addHairui, addChengshun, addNonggeng,
    addYingyangye, addHikcloud, addAlmsound, addZjtpyunGdhk
  },
  data () {
    return {
      searchInput: null,
      sealDialogVisible: false,
      biangDialogVisible: false,
      zjtpyunDialogVisible: false,
      ruifengDialogVisible: false,
      guanchenDialogVisible: false,
      mengchuangyunDialogVisible: false,
      huilengyunDialogVisible: false,
      onenetDialogVisible: false,
      weidkzDialogVisible: false,
      iflytekDialogVisible: false,
      yunMuDialogVisible: false,
      jt808DialogVisible: false,
      suyuan51DialogVisible: false,
      vispekDialogVisible: false,
      jingxunDialogVisible: false,
      ruideDialogVisible: false,
      hairuiDialogVisible: false,
      chengshunDialogVisible: false,
      nonggengDialogVisible: false,
      sainuoDialogVisible: false,
      yingyangyeDialogVisible: false,
      hikcloudDialogVisible: false,
      almsoundDialogVisible: false,
      zjtpyunGdhkDialogVisible: false,
    }
  },
  methods: {
    addSeal () {
      this.sealDialogVisible = true
    },
    addBiang () {
      this.biangDialogVisible = true
    },
    addZjtpyun () {
      this.zjtpyunDialogVisible = true
    },
    addRuifeng () {
      this.ruifengDialogVisible = true
    },
    addGuanchen () {
      this.guanchenDialogVisible = true
    },
    addMengchuangyun () {
      this.mengchuangyunDialogVisible = true
    },
    addHuilengyun () {
      this.huilengyunDialogVisible = true
    },
    addWeidkz () {
      this.weidkzDialogVisible = true;
    },
    addIflytek () {
      this.iflytekDialogVisible = true;
    },
    addOnenet () {
      this.onenetDialogVisible = true
    },
    addYunMu () {
      this.yunMuDialogVisible = true;
    },
    addJT808 () {
      this.jt808DialogVisible = true
    },
    addSuyuan51 () {
      this.suyuan51DialogVisible = true
    },
    addVispek () {
      this.vispekDialogVisible = true
    },
    addJingxun () {
      this.jingxunDialogVisible = true
    },
    addRuide () {
      this.ruideDialogVisible = true
    },
    addHairui () {
      this.hairuiDialogVisible = true
    },
    addChengshun () {
      this.chengshunDialogVisible = true
    },
    addNonggeng () {
      this.nonggengDialogVisible = true
    },
    addSainuo () {
      this.sainuoDialogVisible = true
    },
    addYingyangye () {
      this.yingyangyeDialogVisible = true
    },
    addHikcloud () {
      this.hikcloudDialogVisible = true
    },
    addAlmsound () {
      this.almsoundDialogVisible = true
    },
    addZjtpyunGdhk () {
      this.zjtpyunGdhkDialogVisible = true
    }
  }
}
</script>
<style scoped>
.bt {
  width: 18%;
}
</style>