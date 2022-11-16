<template>
  <el-card class="manage">
    <el-dialog
      :title="operateType === 'add' ? '新增水肥机' : '更新水肥机'"
      :visible.sync="isShow"
      width="550px"
    >
      <!-- 表格S -->
      <el-form ref="form" :model="form" label-width="auto">
        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="主设备">
          <el-select v-model="form.firstEquipment" placeholder="请选择主设备">
            <el-option label="SF02A-2110019" value="shanghai"></el-option>
            <el-option label="SF02A-0000001" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="副设备">
          <el-select v-model="form.secondEquipment" placeholder="请选择副设备">
            <el-option label="PK01B-2111020" value="shanghai"></el-option>
            <el-option label="PK01B-0000001" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="传感器">
          <el-cascader
            :options="options"
            :props="{ multiple: true }"
            clearable>
          </el-cascader>
        </el-form-item>
        <el-form-item label="摄像头">
          <el-select v-model="form.camera" placeholder="请选择摄像头">
            <el-option label="机枪01" value="shanghai"></el-option>
            <el-option label="机枪02" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 表格E -->

      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary">确定</el-button>
      </div>
    </el-dialog>

    <div class="manage-header">
      <el-row class="header-row">
        <el-button type="primary" @click="addUser">新增</el-button>
      </el-row>
    </div>

    <div class="manage-body">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column fixed prop="name" label="名称" sortable>
        </el-table-column>
        <el-table-column
          prop="style"
          label="水肥系统样式"
          sortable
        ></el-table-column>
        <el-table-column
          prop="firstEquipment"
          label="主设备"
          sortable
        ></el-table-column>
        <el-table-column
          prop="secondEquipment"
          label="副设备"
          sortable
        >
        </el-table-column>
        <el-table-column prop="sensor" label="传感器" sortable>
        </el-table-column>
        <el-table-column
          prop="camera"
          label="枪机"
          sortable
        ></el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="handleLook(scope.row)" type="text" size="small"
              >查看</el-button
            >
            <el-button @click="handleEdit(scope.row)" type="text" size="small"
              >编辑</el-button
            >
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-card>
</template>

<script>
export default {
  methods: {
    handleLook(row) {
      console.log(row);
      this.$router.push({
        path: "/bigScreen",
        query: {
          row: JSON.stringify(row),
        },
      });
    },
    handleEdit(row) {
      console.log(row);
      this.isShow = true;
      this.operateType = "updata";
      this.form = {
        name: row.name,
        style: row.style,
        firstEquipment: row.firstEquipment,
        secondEquipment: row.secondEquipment,
        sensor: row.sensor,
        camera: row.camera,
      };
    },
    addUser() {
      this.isShow = true;
      this.operateType = "add";
      this.form = {
        name: '',
        firstEquipment: "",
        secondEquipment: "",
        sensor: "",
        camera: "",
      }
    },
    onSubmit() {
      console.log('submit!');
    }
  },
  data() {
    return {
      operateType: "add",
      isShow: false,
      form: {
        name: '',
        firstEquipment: "",
        secondEquipment: "",
        sensor: "",
        camera: "",
      },
      options: [
        {
          value: 'qixiangzhan',
          label: '气象站',
          children: [{
            value: 'xuliang',
            label: '雨量'
          }, {
            value: 'daqiwendu',
            label: '大气温度'
          }, {
            value: 'fengxiang',
            label: '风向'
          }]
        },
        {
          value: 'shangqing',
          label: '墒情',
          children: [{
            value: 'ph',
            label: 'ph值'
          }, {
            value: 'EC',
            label: 'EC值'
          }, {
            value: 'shuiya',
            label: '水压'
          }]
        }
      ],
      tableData: [
        {
          id: "00001",
          name: "水肥01",
          style: "旁路式",
          firstEquipment: "SF02A-2110019",
          firstEquipmentPK: "PK01B-2110019",
          firstEquipmentPC: "PC01B-2110019",
          secondEquipment: "PK01B-2111020",
          sensor: "风速、气温、ph、EC",
          camera: "摄像头01",
        },
        {
          id: "00002",
          name: "水肥02",
          style: "旁路式",
          firstEquipment: "SF02A-2110014",
          firstEquipmentPK: "PK01B-2110014",
          firstEquipmentPC: "PC01B-2110014",
          secondEquipment: "PK01B-2111020",
          sensor: "风速、气温、降雨量",
          camera: "摄像头02",
        },
      ],
      operateForm: {
        name: "",
        style: "",
        firstEquipment: "",
        secondEquipment: "",
        sensor: "",
        camera: "",
        weather: "",
        instrument: "",
      },
    };
  },
};
</script>

<style scoped>
.manage {
  line-height: normal;
  text-align: left;
}
.manage-header {
  height: 60px;
}
.header-row {
  height: 100%;
  text-align: left;
}
.manage-body {
}
::v-deep .el-dialog .el-dialog__body{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
