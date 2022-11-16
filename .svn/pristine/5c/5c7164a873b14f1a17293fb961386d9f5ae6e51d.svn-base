import { get } from '@/api/dictDetail'

export default {
  data() {
    return {
      dicts: []
    }
  },
  methods: {
    async getDict(name) {
      return new Promise((resolve, reject) => {
        get(name).then(res => {
          this.dicts = res.data.content
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },

    async getDict2(obj, property, name) {
      return new Promise((resolve, reject) => {
        get(name).then(res => {
          obj[property] = res.data.content
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
