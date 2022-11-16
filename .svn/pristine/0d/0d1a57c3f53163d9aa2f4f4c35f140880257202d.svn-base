<template>
    <div>
        <el-upload
            ref="upload"
            :show-file-list="false"
            :auto-upload="false"
            :on-change="handleImgChange"
            :before-upload="beforeAvatarUpload"
            class="avatar-uploader"
            :style="{width:size,height:size,'line-height':size}"
            action="' '"
          >
            <img
                v-if="form[imagePathName]"
                :src="getImage(form[imagePathName])"
                
                :style="{width:size,height:size}"
                class="avatar"
            >
            <i
                v-else
                class="el-icon-plus avatar-uploader-icon"
                :style="{width:size}"
            />
        </el-upload>
    </div>
</template>
<script>
    import { getImage } from '@/utils/image_util'
    export default {
        props: {
            // 表单对象赋值
            form:{
                type:Object,
                required:true
            },
            // 上传文件名
            fileRawName:{
                type:String,
                required:true
            },
            //显示图片
            imagePathName:{
                type:String,
                required:true
            },
            //图片大小
            size:{
                type:String,
                default:'150px'
            }
        },
        mounted(){
            this.imagePath = this.form[this.imagePathName];
        },
        data(){
            return {
                imagePath:''
            }
        },
        methods:{
            getImage:getImage,
            handleImgChange (file, fl) {
                // 生成上传file数据 file.raw
                if (file) {
                    this.form[this.imagePathName] = URL.createObjectURL(file.raw)
                    this.form[this.fileRawName] = file.raw
                }
            },
            beforeAvatarUpload (file) {
                const isJPG = file.type === 'image/jpeg'
                const isLt2M = file.size / 1024 / 1024 < 2

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!')
                    file = null
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!')
                    file = null
                }
                return false
            }
        }
    }
</script>

<style lang="stylus" scoped>
/* 图片上传 */
.avatar-uploader >>> .el-upload
  border 1px dashed #d9d9d9
  border-radius 6px
  cursor pointer
  position relative
  overflow hidden

  &:hover
    border-color #409eff

.avatar-uploader-icon
  font-size 28px
  color #8c939d
  text-align center

.avatar
  display block
</style>