
import logoImg from '@/assets/logo/jk_logo1.png'
export default {
  data() {
    return {
      title: "农语云",
      img: logoImg,
      fontSize: 19
    }
  },
  methods: {
    // 基地切换，获取logo,及logo旁的文字
    getTitle() {
      if (this.baseInfo.indexTitle) {
        if (typeof this.baseInfo.indexTitle === "string") {
          this.baseInfo.indexTitle = JSON.parse(this.baseInfo.indexTitle)
        }
        if (this.baseInfo.indexTitle.text) {
          this.title = this.baseInfo.indexTitle.text
          this.fontSize = this.baseInfo.indexTitle.fontSize
        } else {
          this.title = "农语云"
          this.fontSize = 19
        }
      } else {
        this.title = "农语云"
        this.fontSize = 19
      }
      if (this.baseInfo.indexLogo) {
        if (typeof this.baseInfo.indexLogo === "string") {
          this.baseInfo.indexLogo = JSON.parse(this.baseInfo.indexLogo)
        }
        if (this.baseInfo.indexLogo.backgroundImage) {
          if (this.baseInfo.indexLogo.backgroundImage.indexOf("http") > -1) {
            this.img = this.baseInfo.indexLogo.backgroundImage
          } else {
            this.img = process.env.IMG_URL + this.baseInfo.indexLogo.backgroundImage
          }
        } else {
          this.img = logoImg
        }
      } else {
        this.img = logoImg
      }
    }
  }
}