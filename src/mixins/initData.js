import { initData } from '@/api/data'
import { formatDate } from '@/utils/date'
export default {
  data() {
    return {
      loading: true,
      data: [],
      page: 0,
      size: 10,
      total: 0,
      url: '',
      params: {},
      query: {},
      time: 170
    }
  },
  methods: {
    async init() {
      if (!await this.beforeInit()) {
        return
      }
      return new Promise((resolve, reject) => {
        
        this.loading = true
        initData(this.url, this.params).then(res => {
          if(res.code === 200){
          
          this.total = res.data.totalElements
          this.data = []

          setTimeout(() => {
            this.data = res.data.content
          }, 300)
          setTimeout(() => {
            this.loading = false
          }, this.time)
          resolve(res)
        }else{
          this.$message.error(res.msg)
        }
        }).catch(err => {
          this.loading = false
          reject(err)
        })
      })
    },
    beforeInit() {
      return true
    },
    pageChange(e) {
      this.page = e - 1
      this.init()
    },
    sizeChange(e) {
      this.page = 0
      this.size = e
      this.init()
    },
    // 预防删除第二页最后一条数据时，或者多选删除第二页的数据时，页码错误导致请求无数据
    dleChangePage(size) {
      if (size === undefined) {
        size = 1
      }
      if (this.data.length === size && this.page !== 0) {
        this.page = this.page - 1
      }
    },
    dateFormat(row, column) {
      var date = row[column.property]
      if (date === undefined || date === '') {
        return ''
      }
      return formatDate(new Date(date), 'yyyy-MM-dd hh:mm')
    }
  }
}
