<template>
  <div>
    <!-- 引入组件 -->
    <area-edit :form="form"> {{ dialogTitle }} </area-edit>
  </div>
</template>

<script>
import areaEdit from './components/areaEdit'
export default {
  name: 'AreaEdit1',
  components: {
    'area-edit': areaEdit
  },
  data() {
    return {
      form: {
        name: '',
        code: '',
        type: '',
        order: '',
        pic: ''
      },
      dialogTitle: '编辑'
    }
  }
}
</script>

