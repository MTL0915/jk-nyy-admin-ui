<template>
  <div class="navbar">
    <div
      class="logoHeader"
      v-if="title.length > 5"
    >
      <img
        :src="img"
        style="width: 26px;height:26px;vertical-align:middle;display:inline-block;"
      />
      <span style="margin-left:10px;font-size: 19px;">{{ title }}</span>
    </div>
    <div
      v-show="user.orgId"
      v-intro="'多基地在这里进行切换'"
      v-intro-position="'top'"
      class="header-select left-region"
      data-step="5"
    >
      <span
        v-show="isGlobalModel"
        title="全局"
        style="float:left;color: #000000;font-size: 14px;"
      >全局</span>
        <el-select
          v-show="!isGlobalModel"
          value-key="id"
          v-model="currentSelectedBase"
          class="bs_base_select_class"
          :disabled="baseSelectDisabled()"
          filterable
          @change="selectBase2" placeholder="请选择">
          <el-option-group
            v-for="group in baseList"
            :key="group.bs_org_id"
            :label="group.bs_org_name">
            <el-option
              v-for="item in group.options"
              :key="item.id"
              :label="item.name"
              :value="item">
            </el-option>
          </el-option-group>
        </el-select>
      <!-- <el-select
        v-show="!isGlobalModel"
        value-key="id"
        v-model="currentSelectedBase"
        placeholder="请选择"
        class="bs_base_select_class"
        :disabled="baseSelectDisabled()"
        filterable
        @change="selectBase2"
      >
        <el-option
          v-for="item in baseList"
          :key="item.id"
          :label="item.name"
          :value="item"
        />
      </el-select> -->
      <!-- <router-link
        v-show="!isGlobalModel"
        to="/myresources/baseView"
      >
        <span
          id="region"
          :title="currentSelectedBaseName"
          class="region-text region-su"
          style="float:left;line-height: 30px;"
        >
          <i class="el-icon-location-outline" />
          {{ currentSelectedBaseName }}
          <i
            class="el-submenu__icon-arrow el-icon-arrow-down"
            style="margin-top: -4px;right:18px;"
          />
        </span>
      </router-link> -->
      <span style="float: left;display: inline-block;padding-top: 4px;display: none;">
        <svg
          t="1574833322074"
          class="icon"
          viewBox="0 0 1070 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3363"
          width="16"
          height="16"
        >
          <path
            d="M682.216727 1024a35.281455 35.281455 0 0 1-18.618182-7.912727 46.638545 46.638545 0 0 1-12.101818-16.337455l-3.258182-8.378182a19.549091 19.549091 0 0 1-3.258181-4.654545 139.915636 139.915636 0 0 0-35.793455-46.685091 104.448 104.448 0 0 0-134.888727 0c-19.083636 15.080727-33.698909 35.048727-42.356364 57.856a37.748364 37.748364 0 0 1-16.244363 19.083636c-18.757818 7.912727-39.842909 7.912727-58.600728 0a320.791273 320.791273 0 0 1-38.167272-13.498181 185.902545 185.902545 0 0 1-34.397091-19.083637 95.511273 95.511273 0 0 1-20.945455-21.038545 33.652364 33.652364 0 0 1-6.050909-18.152728c-0.465455-10.053818 1.629091-20.014545 6.050909-28.951272 8.238545-18.106182 11.450182-38.074182 9.309091-57.856a100.398545 100.398545 0 0 0-27.927273-59.717818 71.121455 71.121455 0 0 0-37.189818-21.41091 159.557818 159.557818 0 0 0-41.890909-3.723636c-15.825455 0.930909-31.418182 3.909818-46.498909 8.843636a46.405818 46.405818 0 0 1-30.72 0 50.269091 50.269091 0 0 1-22.295273-20.526545 237.661091 237.661091 0 0 1-18.618182-35.002182 219.229091 219.229091 0 0 1-12.567272-39.656727 93.556364 93.556364 0 0 1 0-33.559273 35.002182 35.002182 0 0 1 21.876363-30.813091 154.903273 154.903273 0 0 0 59.112728-43.380363c16.896-18.432 26.344727-42.589091 26.530909-67.630546a96.256 96.256 0 0 0-26.065455-67.165091c-16.337455-18.245818-36.538182-32.581818-59.112727-41.984a30.254545 30.254545 0 0 1-16.290909-15.872 56.087273 56.087273 0 0 1-10.24-27.508363c0.465455-10.891636 2.141091-21.736727 5.12-32.209455a217.367273 217.367273 0 0 1 27.927272-64.372364c5.306182-8.238545 12.288-15.220364 20.48-20.48a22.760727 22.760727 0 0 1 16.756364-4.70109c6.144 0.791273 12.241455 2.234182 18.152727 4.18909 21.643636 8.843636 45.195636 11.729455 68.328728 8.378182 23.738182-3.397818 45.754182-14.336 62.836363-31.232 8.890182-8.843636 15.592727-19.735273 19.549091-31.697454 3.770182-12.334545 6.283636-24.994909 7.447273-37.794909a168.401455 168.401455 0 0 0 0-34.071273c0-9.309091 0-16.756364-2.792727-21.876364a113.105455 113.105455 0 0 1-3.723637-13.591272 23.365818 23.365818 0 0 1 0-16.29091c5.306182-11.636364 14.056727-21.410909 25.088-28.020363 11.450182-7.912727 23.784727-14.429091 36.770909-19.549091 12.520727-4.794182 25.413818-8.517818 38.586182-11.217455 10.379636-2.466909 20.945455-3.909818 31.650909-4.189091a28.811636 28.811636 0 0 1 22.295273 9.309091c5.12 5.538909 9.076364 12.008727 11.636364 19.130182 8.564364 20.48 22.155636 38.446545 39.563636 52.270546 39.330909 29.323636 93.184 29.323636 132.514909 0 19.176727-13.498182 33.792-32.581818 41.890909-54.597819l2.327273-4.654545c3.444364-4.887273 7.354182-9.402182 11.636364-13.498182l3.258181-3.770182c14.848-6.330182 31.650909-6.330182 46.498909 0 12.101818 2.978909 23.924364 7.028364 35.374546 12.101819 11.682909 4.980364 22.667636 11.543273 32.535273 19.595636 9.309091 7.447273 17.361455 16.477091 23.738181 26.624 3.258182 5.771636 4.375273 12.567273 3.258182 19.083636a50.501818 50.501818 0 0 1-5.12 15.872c-9.169455 20.805818-12.101818 43.845818-8.378182 66.234182 3.677091 23.412364 14.754909 45.009455 31.65091 61.579636 17.221818 17.314909 40.261818 27.601455 64.60509 28.951273a142.894545 142.894545 0 0 0 71.214546-12.567273c6.423273-3.816727 13.963636-5.259636 21.364364-4.235636 8.564364 0.279273 16.709818 3.723636 22.807272 9.774546 12.939636 13.312 22.946909 29.184 29.323637 46.68509 8.285091 20.340364 14.056727 41.658182 17.175272 63.441455a38.353455 38.353455 0 0 1-6.050909 28.858182 40.96 40.96 0 0 1-17.221818 14.056727c-22.993455 8.331636-43.147636 23.04-58.135273 42.449455a107.985455 107.985455 0 0 0-25.134545 70.423272c-0.465455 23.365818 6.516364 46.219636 20.014545 65.303273a112.64 112.64 0 0 0 53.061819 40.122182 23.272727 23.272727 0 0 1 10.24 7.447273h2.792727c7.493818 5.957818 13.032727 14.103273 15.778909 23.319272 0.093091 1.396364 0.093091 2.792727 0 4.189091a97.745455 97.745455 0 0 1 0 29.882182c-2.234182 12.939636-5.818182 25.6-10.705455 37.794909-4.840727 12.194909-11.077818 23.738182-18.618181 34.490182a67.025455 67.025455 0 0 1-24.203637 21.922909c-14.475636 7.912727-31.976727 7.912727-46.498909 0a229.236364 229.236364 0 0 0-27.461818-6.050909 131.723636 131.723636 0 0 0-33.466182 0 159.650909 159.650909 0 0 0-33.978182 6.981818 65.582545 65.582545 0 0 0-28.811636 18.664727 108.357818 108.357818 0 0 0-30.72 62.510546c-3.025455 22.900364 0.372364 46.126545 9.774545 67.165091a42.077091 42.077091 0 0 1-3.258181 43.892363 86.574545 86.574545 0 0 1-20.945455 18.152728c-9.914182 6.562909-20.293818 12.334545-31.138909 17.268363a195.444364 195.444364 0 0 1-35.84 12.101819 150.807273 150.807273 0 0 1-31.604364 5.166545z m-378.135272-83.037091l7.912727 6.516364c8.098909 5.771636 16.849455 10.612364 26.065454 14.475636 10.705455 4.561455 21.736727 8.471273 33.000728 11.636364 6.656 2.094545 13.498182 3.351273 20.48 3.723636a179.525818 179.525818 0 0 1 54.411636-72.285091 150.807273 150.807273 0 0 1 194.420364 0c18.944 15.173818 34.722909 33.838545 46.545454 55.063273 2.187636 2.094545 3.956364 4.654545 5.12 7.447273l3.258182 8.843636h12.055273c9.309091-2.187636 18.292364-5.306182 26.996363-9.309091 8.704-3.863273 17.082182-8.378182 25.134546-13.498182l6.981818-4.654545a172.125091 172.125091 0 0 1-13.032727-90.996364 152.669091 152.669091 0 0 1 42.775272-88.622545 111.616 111.616 0 0 1 48.826182-31.232c14.196364-4.701091 28.858182-7.819636 43.752728-9.309091a179.479273 179.479273 0 0 1 46.498909 0c11.636364 1.861818 23.133091 4.468364 34.443636 7.912727h9.262545a22.807273 22.807273 0 0 0 6.981819-7.447273c5.492364-7.866182 10.007273-16.290909 13.498181-25.227636 3.816727-9.309091 6.609455-18.990545 8.378182-28.904727 0.372364-4.189091 0.372364-8.424727 0-12.613818l-3.258182-2.327273A158.673455 158.673455 0 0 1 932.910545 605.090909a155.648 155.648 0 0 1-28.811636-93.277091 153.274182 153.274182 0 0 1 34.443636-97.978182c18.199273-23.412364 42.077091-41.890909 69.306182-53.620363a216.901818 216.901818 0 0 0-13.498182-46.685091 108.311273 108.311273 0 0 0-13.498181-25.6 187.904 187.904 0 0 1-89.786182 14.894545 144.011636 144.011636 0 0 1-92.997818-42.914909 156.392727 156.392727 0 0 1-46.545455-87.226182 165.562182 165.562182 0 0 1 11.170909-90.484363 89.739636 89.739636 0 0 0-29.789091-20.992 161.978182 161.978182 0 0 0-27.880727-9.309091l-13.963636-4.701091a161.373091 161.373091 0 0 1-55.342546 73.216 157.323636 157.323636 0 0 1-190.696727-2.792727 178.641455 178.641455 0 0 1-52.596364-70.423273h-11.636363a204.241455 204.241455 0 0 0-31.138909 9.309091 139.403636 139.403636 0 0 0-27.461819 14.475636l-3.723636 2.792727v6.05091c0 8.843636 2.792727 17.268364 3.723636 27.089454 1.442909 14.242909 1.442909 28.625455 0 42.914909-1.582545 15.825455-4.840727 31.464727-9.774545 46.638546-6.050909 19.549091-16.756364 37.236364-31.138909 51.758545-24.203636 24.064-55.528727 39.563636-89.320727 44.311273a175.336727 175.336727 0 0 1-90.205091-10.24v2.327273a143.825455 143.825455 0 0 0-12.101819 22.388363 170.123636 170.123636 0 0 0-8.843636 26.577455 90.298182 90.298182 0 0 0-3.258182 25.693091A211.176727 211.176727 0 0 1 148.247273 410.530909c24.901818 26.670545 38.725818 61.905455 38.632727 98.443636a146.245818 146.245818 0 0 1-38.167273 97.931637c-19.409455 23.133091-43.752727 41.611636-71.168 54.132363-0.512 4.654545-0.512 9.309091 0 13.963637a175.755636 175.755636 0 0 0 24.669091 58.786909l2.792727 3.723636a198.097455 198.097455 0 0 1 112.081455-6.050909c23.412364 5.12 44.683636 17.361455 60.974545 35.002182a145.687273 145.687273 0 0 1 41.37891 87.691636c2.839273 27.927273-1.815273 56.133818-13.498182 81.640728l-1.861818 5.12zM77.544727 360.261818l-18.618182 13.498182 18.618182-9.774545v-3.723637zM405.922909 25.739636l-17.221818 15.36 3.723636 3.258182 13.498182-18.618182z"
            p-id="3364"
            fill="#1296db"
          />
          <path
            d="M543.045818 698.181818a186.181818 186.181818 0 1 1 0-372.363636 186.181818 186.181818 0 0 1 0 372.363636z m0-325.818182a139.636364 139.636364 0 1 0 0 279.272728 139.636364 139.636364 0 0 0 0-279.272728z"
            p-id="3365"
            fill="#1296db"
          />
        </svg>
      </span>

      <!-- <ul
        class="select-items region-select"
        style="overflow-y:auto"
      >
        <li
          v-for="(item,index) in baseList"
          :style="item.id === currentSelectedBaseId?'background: #00ffff;pointer-events: none;':'background: #ffffff;'"
          :key="item.id"
          @click="selectBase(item)"
        >
          <span
            :title="item.name"
            class="select-item"
          >
            <i class="el-icon-location-outline" />
            {{ item.name }}
          </span>
        </li>
      </ul> -->
    </div>

    <div class="left-region">
      <el-tooltip
        v-show="
          $store.state.baseinfo.cur_user_level <= 2 || user.orgCode === 'jk-000'
        "
        class="item"
        effect="dark"
        content="添加基地"
        placement="bottom"
      >
        <i
          v-permission="['ADMIN', 'BASE_ALL', 'BASE_CREATE']"
          class="el-submenu__icon-arrow el-icon-circle-plus-outline"
          style="margin-top: 16px;right: -40px;;font-size:17px;font-weight: bold;"
          @click="addBase"
        />
      </el-tooltip>
      <el-tooltip
        class="item"
        effect="dark"
        content="基地信息"
        placement="bottom"
      >
        <i
          @click="toBase"
          class="el-submenu__icon-arrow el-icon-tickets"
          style="margin-top: 16px;right: -14px;;font-size:17px;font-weight: bold;"
        />
      </el-tooltip>
    </div>
    <div class="right-menu">
      <el-tooltip
        v-if="user.orgId"
        :enterable="false"
        class="item"
        effect="dark"
        content="通过关键字全文搜索地块、设备信息"
        placement="bottom"
      >
        <div
          v-intro="'地块、设备信息一键搜索'"
          v-intro-position="'top'"
          :class="isActive ? 'search search-active' : 'search'"
          style="float: left;text-align: center;"
          data-step="6"
        >
          <div class="bg" />
          <div class="content">
            <input
              id="search-input"
              :style="search_input_style"
              v-model="keyword"
              placeholder="请输入关键字"
              type="text"
              name="q"
              class="input"
              style="width:170px"
              @keypress.enter="showSearch()"
            />
            <button
              id="header-search-button"
              type="button"
              class="button"
              @click="showSearch()"
            >
              <i
                class="el-icon-search"
                style="font-size:18px;color:black;font-weight: 888;"
              />
            </button>
          </div>
        </div>
      </el-tooltip>
      <!-- <div class="header-nav-item ticket-item">
        <el-badge :max="99" class="item" value="5">
          <a><span>工单</span></a>
        </el-badge>
      </div>-->
      <div class="header-nav-item">
        <MessageCenter />
      </div>
      <div
        class="header-nav-item doc"
        style="width: 80px;"
      >
        <span
          style="display: inline-block;height: 100%;widht: 100%;cursor:pointer"
          @click.prevent="helpShow = !helpShow"
        >帮助文档</span>
        <help
          v-if="helpShow"
          class="helpDoc"
        />
      </div>

      <div
        v-if="
          ($store.state.baseinfo.cur_user_level &&
            $store.state.baseinfo.cur_user_level <= 2) ||
            user.orgCode === 'jk-000'
        "
        class="header-nav-item"
        style="width: 80px;"
        @click="forwardOrg()"
      >
        <a>
          <span>企业组织</span>
        </a>
      </div>

      <el-dropdown
        class="avatar-container right-menu-item"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <a class="username">{{ first_username }}</a>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <span
            style="display:none;"
            @click="show = true"
          >
            <el-dropdown-item>布局设置</el-dropdown-item>
          </span>
          <router-link
            v-show="user.orgId"
            to="/user/center"
          >
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>
          <router-link
            v-if="false"
            to="/myresources/baseView"
          >
            <el-dropdown-item>我的基地</el-dropdown-item>
          </router-link>
          <span
            style="display:block;"
            @click="open"
          >
            <el-dropdown-item divided>退出登录</el-dropdown-item>
          </span>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <guide ref="guide" />
  </div>
</template>

<script>
// import Vue from 'vue'
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import Screenfull from "@/components/Screenfull";
import MessageCenter from "./Message/MessageCenter";
import help from "@/views/help/help";
import request from "@/utils/request";
import UserWizard from "./UserWizard";
import { hasOrg } from "@/api/user";
import guide from "./guide";
import bus from "@/components/common/bus.js";
import Config from "@/config";

export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    img: {
      type: String,
      default: ""
    },
    fontSize: {
      type: String,
      default: ""
    }
  },
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull,
    UserWizard,
    MessageCenter,
    help,
    guide
  },
  data () {
    return {
      dialogVisible: false,
      currentSelectedBase: null,
      first_username: "",
      isGlobalModel: false,
      isActive: true,
      isTransitionEnd: false,
      search_input_style: "",
      // 是否能查看基地
      isViewBase: false,
      isShowSearch: false,
      keyword: "",
      baseList: [],
      helpShow: false,
      basecode: ""
    };
  },
  computed: {
    ...mapGetters(["sidebar", "user", "device"]),
    show: {
      get () {
        return this.$store.state.settings.showRightPanel;
      },
      set (val) {
        this.$store.dispatch("changeSetting", {
          key: "showRightPanel",
          value: val
        });
      }
    }
  },
  watch: {
    currentSelectedBase: {
      handler (newValue, oldValue) {
        this.$store.state.baseinfo.cur_base_id = newValue.id;
        this.$store.state.baseinfo.cur_base_name = newValue.name;
        this.$store.state.baseinfo.cur_base_code = newValue.code;
        this.$store.state.baseinfo.cur_user_level = newValue.user_level;
        this.$store.state.baseinfo.baseInfo = newValue;
        this.$store.state.baseinfo.cur_org_id = newValue.bs_org_id;
        this.$store.state.baseinfo.cur_org_code = newValue.bs_org_code;
        localStorage.setItem("currentBaseId", newValue.id);
        if (
          newValue.documentTitle &&
          newValue.documentTitle !== null &&
          newValue.documentTitle !== ""
        ) {
          if (typeof newValue.documentTitle === "string") {
            var documentTitle = JSON.parse(newValue.documentTitle);
          }
          if (documentTitle.text) {
            document.title =
              this.$route.meta.title + " - " + documentTitle.text;
          }
        } else {
          document.title = this.$route.meta.title + " - " + Config.webName;
        }
      },
      deep: true
    }
  },
  created () {
    bus.$on("selectBase", param => {
      this.selectBase2(param);
    });
    bus.$on("getBaseList", param => {
      this.getBaseList(param);
    });

    if (this.user.name !== null) {
      this.first_username = this.user.name.substring(0, 1);
    } else {
      this.first_username = "";
    }
    this.basecode = this.$route.query.basecode;
    this.getBaseList();
  },
  mounted () {
    var search_input = document.getElementById("search-input");
    var _this = this;
    // 搜索框的过渡事件结束监听
    search_input.addEventListener("webkitTransitionEnd", function () {
      if (_this.isTransitionEnd) {
        _this.isActive = false;
        _this.isTransitionEnd = false;
      }
    });
  },
  methods: {
    baseSelectDisabled () {
      //故障列表
      if (this.$route.path === "/myresources/submitRepair") {
        return true;
      }
      return false;
    },
    async getBaseList (fn) {
      await request({
        url: "/bs/bs_base/findByBs_user_id",
        method: "get",
        async: false,
        params: {
          bs_user_id: this.user.id
        }
      }).then(res => {
        let lst = res.data;
        for (let i = 0; i < lst.length; i++) {
          if (lst[i].code === "AAAAAA") {
            this.$store.state.baseinfo.implement_org_id = lst[i].bs_org_id;
            this.$store.state.baseinfo.implement_org_code = "jk-000";
            this.$store.state.baseinfo.implement_base_id = lst[i].id;
            this.$store.state.baseinfo.implement_base_code = "AAAAAA";
            lst.splice(i, 1);
            break;
          }
        }

        // 构建数据，所有基地按组织进行分组
        const obj = {}
        for (let i = 0; i < lst.length; i++) {
          if (!obj[lst[i].bs_org_code]) {
            obj[lst[i].bs_org_code] = { 
              bs_org_name: lst[i].bs_org_name,
              bs_org_code: lst[i].bs_org_code,
              bs_org_id: lst[i].bs_org_id,
              options: [lst[i]]
            }
          } else {
            obj[lst[i].bs_org_code].options.push(lst[i])
          }
        }
        this.baseList = Object.values(obj);
        if (this.baseList.length > 0) {
          // this.$store.state.baseinfo.cur_base_list = res.data;
          // var currentSelectedBase = null;
          // var currentBaseId = localStorage.getItem("currentBaseId");
          // if (currentBaseId) {
          //   for (var i = 0, len = this.baseList.length; i < len; i++) {
          //     if (currentBaseId === this.baseList[i].id) {
          //       currentSelectedBase = this.baseList[i];
          //       break;
          //     }
          //   }
          // }
          // //免登录时，自动定位免登录对应的基地
          // if (this.basecode != "") {
          //   for (var i = 0, len = this.baseList.length; i < len; i++) {
          //     if (this.basecode === this.baseList[i].code) {
          //       currentSelectedBase = this.baseList[i];
          //       break;
          //     }
          //   }
          // }
          // if (!currentSelectedBase) {
          //   currentSelectedBase = this.baseList[0];
          // }
          // this.currentSelectedBase = currentSelectedBase;

          this.$store.state.baseinfo.cur_base_list = res.data;
          var currentSelectedBase = null;
          var currentBaseId = localStorage.getItem("currentBaseId");
          if (currentBaseId) {
            for (var i = 0, len = this.baseList.length; i < len; i++) {
              for (let j = 0; j < this.baseList[i].options.length; j++) {
                  if (currentBaseId === this.baseList[i].options[j].id) {
                  currentSelectedBase = this.baseList[i].options[j];
                  break;
                }
              }
            }
          }
          //免登录时，自动定位免登录对应的基地
          if (this.basecode != "") {
            for (var i = 0, len = this.baseList.length; i < len; i++) {
              for (let j = 0; j < this.baseList[i].options.length; j++) {
                if (this.basecode === this.baseList[i].options[j].code) {
                  currentSelectedBase = this.baseList[i].options[j];
                  break;
                }
              }
              
            }
          }
          if (!currentSelectedBase) {
            currentSelectedBase = this.baseList[0].options[0];
          }
          this.currentSelectedBase = currentSelectedBase;
        }
        fn && fn(this.$store.state.baseinfo.cur_base_list);
      });
    },
    // //获取url参数字段
    // GetQueryString (name) {
    //   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    //   var r = window.location.search.substr(1).match(reg);
    //   if (r != null) return unescape(r[2]); return null;
    // },
    addBase () {
      this.$refs.guide.dialogVisible = true;
    },
    toBase () {
      this.$router.push({ path: "/myresources/baseView" });
    },
    selectBase2 (item) {
      localStorage.setItem("currentBaseId", item.id);
    },
    showSearch () {
      if (this.keyword !== "") {
        this.isShowSearch = true;
        this.$router.push({
          path: "/search",
          query: { keyword: this.keyword }
        });
        return;
      }
      //   if (this.isActive) {
      //     this.isTransitionEnd = true
      //     this.search_input_style = 'transition:0.5s ease 0s;width:0px;'
      //   } else {
      //     this.isActive = true
      //     this.search_input_style = 'transition: width 0.5s;width:132px'
      //   }
    },
    forwardOrg () {
      hasOrg().then(res => {
        if (res.code === 200) {
          if (res.data) {
            this.$router.push({ path: "/orgIndex" });
          } else {
            this.$router.push({ path: "/orgIntro" });
          }
        }
      });
    },
    open () {
      this.$confirm("确定注销并退出系统吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        localStorage.setItem(
          "basecode",
          this.$store.state.baseinfo.cur_base_code
        );
        //this.$store.dispatch("setBaseCode", this.$store.state.baseinfo.cur_base_code)
        this.logout();
      });
    },
    toggleSideBar () {
      this.$store.dispatch("ToggleSideBar");
    },
    logout () {
      this.dialogVisible = false;
      this.$store.dispatch("LogOut").then(() => {
        location.reload(); // 为了重新实例化vue-router对象 避免bug
        this.$ws.close();
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.bs_base_select_class {
  .el-input__inner {
    height: 35px;
  }
}
.navbar {
  height: 50px;
  line-height: 50px;
  background: #f5f5f5;
  border-radius: 0px !important;
  border-bottom: 1px solid #e8ecf0;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .ticket-item {
    .el-badge__content.is-fixed {
      top: 13px !important;
      right: 5px !important;
    }
  }
  .breadcrumb-container {
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .left-menu {
    float: left;
  }
  .header-nav-item {
    color: #000;
    width: 60px;
    float: left;
    &:hover {
      background: #ffffff;
      color: #1890ff;
    }
  }
  .el-icon-location-outline {
    font-size: 15px;
    margin-right: 10px;
  }
  .left-region {
    float: left;
    border: none;
    position: relative;
    top: 0px;
    transition: all 0.15s ease;
    padding-left: 10px;
  }
  .header-select {
    position: relative;
    padding: 0 20px 0 15px;
    height: 50px;
    //z-index: 99;
    z-index: 0;
  }
  .header-select .username,
  .header-select .region-text {
    display: inline-block;
    line-height: 50px;
    color: #000000;
    cursor: pointer;
    padding: 0 15px 0 10px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAABkBAMAAABN4rykAAAAA3NCS…wDTOUoOXJISLxD04BnJzA9sExlBaYNywCGSEMGJgYGJiy6ADITJbiL/o1ZAAAAAElFTkSuQmCC)
      right 21px no-repeat;
    &:hover {
      color: blue;
      text-decoration: underline;
    }
  }
  .region-text {
    font-size: 14px;
    min-width: 100px;
    white-space: nowrap;
  }
  .header-select .region-text .iconfont {
    margin-right: 10px;
  }
  .header-select .region-select {
    background-color: #fff;
    color: #666;
  }
  .header-select:hover:not([disabled]) .region-select {
    max-height: 500px;
  }
  .header-select:hover .select-items {
    max-height: 600px;
  }
  .header-select .region-select .select-item {
    line-height: 40px;
    color: #666;
    cursor: pointer;
    padding: 0 20px;
    white-space: nowrap;
    font-size: 14px;
  }
  .header-select .select-item {
    display: block;
    line-height: 30px;
    padding: 0 20px;
    color: #000;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .header-select .region-select {
    right: auto;
    left: 0;
    width: auto;
    min-width: 220px;
    border: none;
    box-shadow: none;
    background-color: #2a4795;
  }
  .header-select .select-items {
    position: absolute;
    top: 100%;
    right: 0;
    background-color: #fff;
    box-shadow: 0 2px 3px rgba(25, 35, 60, 0.1);
    overflow: hidden;
    max-height: 0;
    transition: all 0.15s ease;
    z-index: 999;
    zoom: 1;
  }
  .header-select .region-select .select-item:hover {
    background-color: #eaf6fe;
    color: #108cee;
  }
  ol,
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    border: 0;
    outline: 0;
  }
  .right-menu {
    float: right;
    height: 100%;
    font-size: 12px;
    &:focus {
      outline: none;
    }
    .search {
      float: right;
      padding: 7px 10px;
      margin: 11px 20px 0 0;
      margin-right: 10px;
      position: relative;
    }
    .search .bg {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background: #e5e5e5;
      opacity: 0.4;
      filter: alpha(opacity=40);
      -webkit-border-radius: 3px;
      -moz-border-radius: 3px;
      border-radius: 3px;
      display: none;
    }
    .search-active .bg {
      border: 1px solid #ebebeb;
      opacity: 1;
      background-color: #fff;
      -webkit-border-radius: 15px;
      -moz-border-radius: 15px;
      border-radius: 15px;
      display: block;
    }
    .search .content {
      position: relative;
    }
    .search input {
      color: #666;
      border: none;
      float: left;
      outline: none;
    }
    .search-active .input {
      padding: 0 4px;
      margin: 1px 0 0 0;
      line-height: 14px;
    }

    .search .input {
      background-color: transparent;
      font-size: 12px;
      width: 0;
    }
    #header-search-button {
      background: transparent;
    }
    .search button {
      border: none;
      float: left;
      outline: none;
      padding: 0;
    }
    .search-active .button {
      background-position: 0 -53px;
      margin: 0 0 0 4px;
    }
    .search .button {
      width: 16px;
      height: 16px;
      background: transparent
        url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAABFCAMAAAB0bpYXAAAAilBMV…saoKX241LdtsCJJF1lrREy4URWOVIFz6QywWvr/xGuj/AXuhAeNQHAEsgAAAAASUVORK5CYII=)
        0 0 no-repeat;
      margin: -2px;
      cursor: pointer;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international {
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        .username {
          display: inline-block;
          width: 30px;
          height: 30px;
          font-size: 14px;
          background: #121a2c;
          border-radius: 50px;
          text-align: center;
          line-height: 30px;
          padding: 0;
          color: #fff;
          margin-top: 10px;
        }
        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 18px;
          font-size: 12px;
        }
      }
    }
  }
}
.doc {
  position: relative;
  .helpDoc {
    position: absolute;
    top: 50px;
    right: 0;
    z-index: 100;
  }
}
.logoHeader {
  float: left;
  height: 50px;
  margin: 0 10px;
  font-size: 18px;
  max-width: 400px;
  overflow: hidden;
}
</style>
