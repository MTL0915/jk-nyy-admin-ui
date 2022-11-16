
<template>
  <!-- eslint-disable vue/require-component-is-->
  <component v-bind="linkProps(to)">
    <slot/>
  </component>
</template>

<script>
import { isExternal } from '@/utils'
import base64 from "@/utils/base64gb2312"
export default {
  props: {
    to: {
      type: String,
      required: true
    },
    url: {
      type: String,
      default: ""
    }
  },
  methods: {
    isExternalLink(routePath) {
      return isExternal(routePath)
    },
    linkProps(url) {
      if (this.isExternalLink(url)) {
        return {
          is: 'a',
          href: url,
          target: '_blank',
          rel: 'noopener'
        }
      }
      if (this.url) {
        return {
          is: 'router-link',
          to: {
            path: url,
            query: {
              thirdID: base64.encode64gb2312(this.url)
            }
          }
        }
      } else {
        return {
          is: 'router-link',
          to: url
        }
      }
      

    }
  }
}
</script>
