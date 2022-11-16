<template>
  <div v-show="!item.hidden&&item.children && isShowItem(item)" class="menu-wrapper">
    <template
      v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow"
    >
      <app-link :to="resolvePath(onlyOneChild.path)" :url="onlyOneChild.thirdUrl">
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{'submenu-title-noDropdown':!isNest}"
          @click="menuClick()"
        >
          <item
            v-if="onlyOneChild.meta"
            :icon="onlyOneChild.meta.icon||item.meta.icon"
            :title="onlyOneChild.meta.title"
          />
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-else ref="submenu" :index="resolvePath(item.path)">
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta.icon" :title="item.meta.title" />
      </template>
      <template v-for="child in item.children" v-if="!child.hidden">
        <sidebar-item
          v-if="child.children&&child.children.length>0"
          :is-nest="true"
          :item="child"
          :key="child.path"
          :base-path="resolvePath(child.path)"
          class="nest-menu"
        />

        <app-link v-if="isShowChildItem(child)" :to="resolvePath(child.path)" :url="child.thirdUrl" :key="child.name">
          <el-menu-item :index="resolvePath(child.path)" @click="menuClick()">
            <item v-if="child.meta" :icon="child.meta.icon" :title="child.meta.title" />
          </el-menu-item>
        </app-link>
      </template>
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils'
import Item from './Item'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      onlyOneChild: null
    }
  },
  created() {
    // console.log(this.item)
  },
  methods: {
    hasOneShowingChild(children, parent) {
      if (children == null) {
        return false
      }
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath(routePath) {
      if (this.isExternalLink(routePath)) {
        return routePath
      }
      // console.log(path.resolve(this.basePath, routePath))
      return path.resolve(this.basePath, routePath)
    },
    resolveUrl(url) {
      return path.resolve(url)
    },
    isExternalLink(routePath) {
      return isExternal(routePath)
    },
    menuClick() {},
    isShowItem(item) {
      if (this.isAdmin()) {
        return true
      } else {
        return item.name != '系统管理'
      }
    },
    isShowChildItem(child) {
      return (
        child.meta.title != '基地详情' &&
        child.meta.title != '单位管理' &&
        child.meta.title != '基地管理'
      )
    },
    isAdmin() {
      var permissions = this.$store.state.user.user.permissions
      for (var i = 0; i < permissions.length; i++) {
        if (permissions[i] == 'ADMIN') {
          return true
        }
      }
      return false
    }
  }
}
</script>
