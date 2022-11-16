<template>
  <div>
    <el-form-item label="所在地区">
      <el-cascader
        :options="provenceArray"
        v-model="areaCode"
        :props="props"
      />
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: 'AreaCode',
  props: {
    area_code: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      areaCode: this.area_code,
      provenceArray: [],
      props: {
        label: 'name',
        value: 'code'
      }
    }
  },
  watch: {
    area_code(val) {
      this.areaCode = val
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.$axios.get('/static/provence.json').then((res) => {
        this.provenceArray = res.data.provenceArray
      })
    },
    getAreaid() {
      if (this.areaCode.length === 3) {
        let arr = []
        const resarr = []
        this.areaCode.forEach((element, index) => {
          if (index === 0) {
            this.provenceArray.forEach((p, i) => {
              if (p.code === element) {
                resarr.push(p.id)
                arr = p.children
              }
            })
          }
          if (arr.length > 0) {
            arr.forEach(c => {
              if (c.code === element) {
                resarr.push(c.id)
                arr = c.children
              }
            })
          }
        })
        return resarr[2]
      }
      return ''
    }
  }
}
</script>
