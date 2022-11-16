<template>
  <div
    v-loading="fullscreenLoading"
    style="background: #FFFFFF"
  >
    <div style="text-align:right;">
      <div style="margin-right:20px;line-height: 55px;">
        <!-- <el-select
          filterable 
          v-show="bs_base_id"
          style="width:150px;"
          size="mini"
          v-model="rs_facilities_id"
          placeholder="所在地块"
          clearable
          @change="searchPhoto"
        >
          <el-option
            v-for="item in facilitiesOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select> -->
        <div>
          <el-select
            filterable
            v-show="bs_base_id || rs_facilities_id"
            style="width:150px;"
            size="mini"
            v-model="hd_device_id"
            placeholder="选择设备"
            clearable
            @change="searchPhoto"
          >
            <el-option
              v-for="item in deviceOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
          <el-select
            style="width:150px;"
            size="mini"
            v-model="photoType"
            placeholder="照片类型"
            clearable
            @change="searchPhoto"
          >
            <el-option
              v-for="item in photoTypeOptions"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
          <el-date-picker
            size="mini"
            v-model="photoTime"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            unlink-panels
            align="right"
            @change="searchPhoto"
          />
        </div>

        <template>
          <el-dropdown
            split-button
            size="mini"
            type="primary"
            @click="photoExport('choose')"
            @command="photoExport('time')"
          >
            导出选中
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="0">导出全部</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown
            split-button
            size="mini"
            type="danger"
            @click="photoDelete('choose')"
            @command="photoDelete('time')"
          >
            删除选中
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="2">删除全部</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

        </template>
      </div>
    </div>
    <div style="margin-top:15px">
      <div>
        <el-timeline>
          <el-timeline-item
            v-for="(tlist,i) in images"
            :key="i"
          >
            <label>{{ tlist.time }}</label>
            <!-- <label>{{ tlist.time }}</label>&nbsp;&nbsp;&nbsp;<el-checkbox v-model="tlist.checked" label="全选" border size="medium" @change="tlistChange(tlist)"/> -->
            <div style="display:flex;flex-wrap: wrap;">
              <div
                v-for="(photo) in tlist.cameraList"
                :key="photo.id"
                style="margin:3px;"
                class="pp"
              >
                <el-image
                  :src="photo.thumbnail_path"
                  :ref="photo.id"
                  fit="cover"
                  style="width: 190px; height: 150px;margin:3px;"
                  :style="{border: photo.isChoose ? '2px solid #409EFF': ''}"
                  @click="recognition(photo.id)"
                />
                <div style="position:absolute;bottom:10px;right:10px;color:#fff;font-size:14px">
                  <div
                    style="border:3px solid #409EFF;width:15px;height:15px"
                    :style="{background: photo.isChoose ? '#409EFF': ''}"
                    @click.stop="choose(photo)"
                  >
                    <i
                      class="el-icon-check"
                      v-show="photo.isChoose"
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </el-timeline-item>

        </el-timeline>
        <div>{{ device_id }}</div>
      </div>
      <!--分页组件-->
      <el-pagination
        :total="total"
        :page-size="size"
        :current-page="page + 1"
        style="margin-top: 8px;"
        layout="total, prev, pager, next, sizes"
        @size-change="sizeChange"
        @current-change="pageChange"
      />
    </div>
    <CameraPhotoDetails ref="CameraPhotoDetails" />
  </div>
</template>
<script>

import { formatDate } from '@/utils/date'
import { cameraPictureList, deletePhoto, photoCompressExport, cameraUploadTypeList } from '@/api/hd_device_camera'
import { parseTime } from '@/utils/index'
import CameraPhotoDetails from './CameraPhotoDetails'
import { findByBs_base_id } from '@/api/rs_facilities'
import { deviceList } from '@/api/equip'
import JSZip from 'jszip'
import FileSaver from 'file-saver'

export default {
  components: {
    CameraPhotoDetails
  },
  created () {
    this.init()
  },
  props: {
    hd_device_id: {
      type: String,
      default: null
    },
    device_id: {
      type: String,
      default: null
    },
    rs_facilities_id: {
      type: String,
      default: null
    },
    bs_base_id: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      fullscreenLoading: false,
      photoTime: null,
      checked: null,
      facilitiesOptions: [],
      deviceOptions: [],
      serviceUrl: process.env.IMG_URL,
      images: [],
      imageSrc: '',
      imgVisible: false,
      size: 10,
      page: 0,
      total: 0,
      sensorShow: false,
      photo_ids: [],
      photoTypeOptions: [],
      pickerOptions: {
        shortcuts: [
          {
            text: '一天',
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '三天',
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 3);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '五天',
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 5);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一周',
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一月',
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三月',
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近半年',
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 183);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近一年',
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 366);
              picker.$emit('pick', [start, end]);
            }
          }
        ]
      },
      photoType: null,
      title: ""
    }
  },
  methods: {
    formatDate,
    photoDelete (type) {
      let ids = null
      let start_insert_date = null
      let end_insert_date = null
      if (type === 'choose') {
        if (this.photo_ids.length === 0) {
          this.$message.error('未选中图片')
          return
        }
        ids = this.photo_ids.join(',')
      }
      if (this.photoTime) {
        start_insert_date = this.photoTime[0]
        end_insert_date = this.photoTime[1]
      }
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deletePhoto({
          ids: ids,
          bs_base_id: this.bs_base_id,
          rs_facilities_id: this.rs_facilities_id,
          hd_device_id: this.hd_device_id,
          device_id: this.device_id,
          start_insert_date: start_insert_date,
          end_insert_date: end_insert_date
        }).then(res => {
          if (res.code === 200) {
            this.$message.success(res.msg)
            this.searchPhoto()
          } else {
            this.$message.error(res.msg)
          }
        })
      }).catch(() => {

      });
    },
    photoExport (type) {
      const _this = this
      let ids = null
      let start_insert_date = null
      let end_insert_date = null
      if (type === 'choose') {
        if (this.photo_ids.length === 0) {
          this.$message.error('未选中图片')
          return
        }
        ids = this.photo_ids.join(',')
      }
      if (this.photoTime) {
        start_insert_date = this.photoTime[0]
        end_insert_date = this.photoTime[1]
      }
      this.$confirm('是否导出图片,一次最多导出1000张', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        photoCompressExport({
          ids: ids,
          bs_base_id: this.bs_base_id,
          rs_facilities_id: this.rs_facilities_id,
          hd_device_id: this.hd_device_id,
          device_id: this.device_id,
          start_insert_date: start_insert_date,
          end_insert_date: end_insert_date
        }).then(res => {
          if (res.code && res.code !== 200) {
            this.$message.error(res.msg)
          } else {
            this.$message.success('开始下载')
            const content = res;
            const blob = new Blob([content]);
            var fileName = formatDate(new Date(), 'yyyy-MM-dd') + '.zip';
            document.createElement("a"); // 非IE下载
            const elink = document.createElement("a");
            elink.download = fileName;
            elink.style.display = "none";
            elink.href = URL.createObjectURL(blob);
            document.body.appendChild(elink);
            elink.click();
            URL.revokeObjectURL(elink.href); // 释放URL 对象
            document.body.removeChild(elink)
            this.searchPhoto()
          }
        }).catch(err => {
          let reader = new FileReader();
          reader.onload = function (event) {
            _this.$message.error(reader.result)
          };
          reader.readAsText(err.response.data);
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消导出'
        });
      });
    },
    choose (item) {
      item.isChoose = !item.isChoose
      if (item.isChoose) {//选中
        this.photo_ids.push(item.id)
      } else {//取消选中
        for (let i = 0; i < this.photo_ids.length; i++) {
          if (this.photo_ids[i] === item.id) {
            this.photo_ids.splice(i, 1)
            break
          }
        }
      }
    },
    recognition (id) {
      this.$refs.CameraPhotoDetails.hd_device_id = this.hd_device_id
      this.$refs.CameraPhotoDetails.getData(id)
    },
    parseTime,
    tlistChange (tlist) {
      var checked = tlist.checked
      tlist.cameraList.forEach(element => {
        element.checked = checked
      })
    },
    searchPhoto () {
      this.page = 0
      this.getData()
    },
    init () {

      if (this.bs_base_id === null
        && this.rs_facilities_id === null
        && this.hd_device_id === null
        && this.device_id === null) {
        this.bs_base_id = this.$store.state.baseinfo.cur_base_id
        const end = new Date();
        const start = new Date(end.getTime() - (3600 * 1000 * 24 * 7));
        let a = []
        a.push(this.formatDate(start, "yyyy-MM-dd hh:mm:ss"))
        a.push(this.formatDate(end, "yyyy-MM-dd hh:mm:ss"))
        this.$set(this, 'photoTime', a)
      }
      if (this.bs_base_id) {
        findByBs_base_id({ bs_base_id: this.bs_base_id }).then(res => {
          this.facilitiesOptions = res.data
        })
        deviceList({
          bs_base_id: this.bs_base_id,
          existPhoto: true,
          need_camera: true,
          page: 1,
          size: 999
        }).then(res => {
          this.deviceOptions = res.data.content
        })
      } else if (this.rs_facilities_id) {
        deviceList({
          rs_facilities_id: this.rs_facilities_id,
          existPhoto: true,
          page: 1,
          size: 999
        }).then(res => {
          this.deviceOptions = res.data.content
        })
      }
      cameraUploadTypeList({
        hd_device_id: this.hd_device_id,
        device_id: this.device_id,
        rs_facilities_id: this.rs_facilities_id,
        bs_base_id: this.bs_base_id
      }).then(res => {
        this.photoTypeOptions = res.data
      })
      this.getData()
    },
    getData () {
      this.fullscreenLoading = true
      let start_insert_date = null
      let end_insert_date = null
      if (this.photoTime) {
        start_insert_date = this.photoTime[0]
        end_insert_date = this.photoTime[1]
      }
      cameraPictureList({
        bs_base_id: this.bs_base_id,
        rs_facilities_id: this.rs_facilities_id,
        hd_device_id: this.hd_device_id,
        device_id: this.device_id,
        start_insert_date: start_insert_date,
        end_insert_date: end_insert_date,
        photoType: this.photoType,
        page: this.page,
        size: this.size,
      }).then(res => {
        this.fullscreenLoading = false;
        this.photo_ids = []
        if (res.code === 200) {
          res.data.content.map(items => {
            items.cameraList.map(item => {
              item.isChoose = false;
              if (item.image_path.indexOf("http") == -1) {
                item.thumbnail_path = this.serviceUrl + item.thumbnail_path
                item.image_path = this.serviceUrl + item.image_path
              }
            })
            // if (this.hd_device_id == "ff8080817682e8200176838180880094") {
            //   // 临时
            //   items.time = formatDate(new Date(new Date(items.time).getTime() + 9 * 24 * 3600 * 1000), "yyyy-MM-dd")
            // }

          })
          this.images = res.data.content
          this.total = res.data.totalElements
          this.$forceUpdate()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    sizeChange: function (pageSize) { // 每页条数切换
      this.size = pageSize
      this.pageChange(this.page)
    },
    // 分页
    pageChange (val) {
      this.page = val - 1
      this.getData()
    }
  }
}
</script>
<style scoped>
.pp >>> .el-icon-circle-close {
  color: #fff;
}
.pp {
  position: relative;
}
</style>

<style>
.tyest {
  display: block;
}

.hoverShow > div {
  display: none;
}
.hoverShow:hover > div {
  display: block;
}
</style>
