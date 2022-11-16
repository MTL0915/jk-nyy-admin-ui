<template>
  <div class="api">
    <div class="header">
      <div class="headerContent">
        <a href="#" class="link">
          <img src="../../assets/logo/logo3.png">
          <span>农语云</span>
        </a>
      </div>
    </div>
    <section class="apiBanner">
      <div class="apiBg">
        <img src="../../assets/login/api_banner_bg.png" style="width:100%;height: 100%;">
        <div class="dsc">
          <h1>开发者资源中心</h1>
          <p>开发者所需的API、SDK自助工具专区</p>
        </div>
      </div>
    </section>
    <section class="content">
      <div class="group1">
        <list :data="data.list1.list" :class-name = "data.list1.class" :text="data.list1.text"/>
        <list :data="data.list2.list" :class-name = "data.list2.class" :text="data.list2.text"/>
        <list :data="data.list3.list" :class-name = "data.list3.class" :text="data.list3.text"/>
        <list :data="data.list4.list" :class-name = "data.list4.class" :text="data.list4.text"/>
        <list :data="data.list5.list" :class-name = "data.list5.class" :text="data.list5.text"/>
      </div>
    </section>
  </div>
</template>
<script>
import list from './list'

export default {
  name: 'Api',
  components: {
    list
  },
  data() {
    return {
      minNum: 5,
      data: {
        beginBfore: {
          list: [
            { port: '首页', path: '', id: 'beginBfore_home' },
            { port: '更新日志', path: '', id: 'beginBfore_update_log' },
            { port: '开发者规范', path: '', id: 'beginBfore_rule' },
            { port: '接口权限说明', path: '', id: 'beginBfore_port_desc' },
            { port: '全局返回码说明', path: '', id: 'beginBfore_global_code_desc' },
            { port: '入门引导', path: '', id: 'beginBfore_enter_guide' }
          ],
          class: 'el-icon-s-grid',
          text: '开发前必读'
        },
        beginWork: {
          list: [
            { port: '接入指南', path: '', id: 'beginWork_guide' },
            { port: '接口域名说明', path: '', id: 'beginWork_port_desc' },
            { port: '获取Access token', path: '', id: 'beginWork_get_AccessToken' },
            { port: '接口测试号申请', path: '', id: 'beginWork_port_apply' },
            { port: '报警排查索引', path: '', id: 'beginWork_warning_check' },
            { port: '接口在线调试', path: '', id: 'beginWork_port_online_debug' },
            { port: '获取微信服务器IP地址', path: '', id: 'beginWork_WX_IP_address' },
            { port: '网络检查', path: '', id: 'beginWork_netweb_check' },
            { port: '常见问题', path: '', id: 'beginWork_question' }
          ],
          class: 'el-icon-mouse',
          text: '开始开发'
        },
        list1: {
          list: [
            { port: '基地接收申请列表', path: '/nyy/admin/bs/bs_base/applyBaseList', id: 'base_applyBaseList', request: 'GET', consumes: '' },
            { port: '申请加入指定基地', path: '/nyy/admin/bs/bs_base/applyJoinBase', id: 'base_applyJoinBase', request: 'GET', consumes: '' },
            { port: '基地列表', path: '/nyy/admin/bs/bs_base/baseList', id: 'base_baseList', request: 'GET', consumes: '' },
            { port: '撤消加入基地的申请', path: '/nyy/admin/bs/bs_base/cancelApply', id: 'base_cancelApply', request: 'GET', consumes: '' },
            { port: '快速创建基地', path: '/nyy/admin/bs/bs_base/create', id: 'base_create', request: 'POST', consumes: '["application/json"]' },
            { port: '删除基地', path: '/nyy/admin/bs/bs_base/deleteById', id: 'base_deleteById', request: 'GET', consumes: '' },
            { port: '查询基地', path: '/nyy/admin/bs/bs_base/find', id: 'base_find', request: 'GET', consumes: '' },
            { port: '根据组织获取基地列表', path: '/nyy/admin/bs/bs_base/findBasesByBs_org_id', id: 'base_findBasesByBs_org_id', request: 'GET', consumes: '' },
            { port: '根据组织获取基地详细信息列表', path: '/nyy/admin/bs/bs_base/findBasesDetailByBs_org_id', id: 'base_findBasesDetailByBs_org_id', request: 'GET', consumes: '' },
            { port: '根据当前用户获取基地列表', path: 'findByBs_user/nyy/admin/bs/bs_base/findByBs_user_id_id', id: 'base_findByBs_user_id_id', request: 'GET', consumes: '' },
            { port: '根据ID获取申请详情', path: '/nyy/admin/bs/bs_base/getApplyBaseById', id: 'base_getApplyBaseById', request: 'GET', consumes: '' },
            { port: '查询加入基地的审核状态', path: '/nyy/admin/bs/bs_base/getApprovalSta', id: 'base_getApprovalSta', request: 'GET', consumes: '' },
            { port: '根据ID查询基地概况（数量）', path: '/nyy/admin/bs/bs_base/getBaseResourcesCount', id: 'base_getBaseResourcesCount', request: 'GET', consumes: '' },
            { port: '根据基地编码查询基地', path: '/nyy/admin/bs/bs_base/getByCode', id: 'base_getByCode', request: 'GET', consumes: '' },
            { port: '根据ID查询基地', path: '/nyy/admin/bs/bs_base/getById', id: 'base_getById', request: 'GET', consumes: '' },
            { port: '邀请用户进入基地', path: '/nyy/admin/bs/bs_base/inviteUserJoinBase', id: 'base_inviteUserJoinBase', request: 'GET', consumes: '' },
            { port: '创建基地', path: '/nyy/admin/bs/bs_base/save', id: 'base_save', request: 'POST', consumes: '["multipart/form-data"]' },
            { port: '更新基地', path: '/nyy/admin/bs/bs_base/update', id: 'base_update', request: 'POST', consumes: '["multipart/form-data"]' },
            { port: '审批基地接收申请', path: '/nyy/admin/bs/bs_base/updateApplyBase', id: 'base_updateApplyBase', request: 'GET', consumes: '' }
          ],
          class: 'el-icon-place',
          text: '基地'
        },
        list2: {
          list: [
            { port: '添加地块', path: '/nyy/admin/rs/rs_facilities/add', id: 'rs_add', request: 'POST', consumes: '["multipart/form-data"]' },
            { port: '清空地块地图几何数据', path: '/nyy/admin/rs/rs_facilities/clearFacilitiesGeometryJson', id: 'rs_clearFacilitiesGeometryJson', request: 'POST', consumes: '["application/json"]' },
            { port: '清空地块图片', path: '/nyy/admin/rs/rs_facilities/clearFacilitiesImagePath', id: 'rs_clearFacilitiesImagePath', request: 'POST', consumes: '["application/json"]' },
            { port: '删除地块', path: '/nyy/admin/rs/rs_facilities/deleteById', id: 'rs_deleteById', request: 'GET', consumes: '' },
            { port: '查询地块', path: '/nyy/admin/rs/rs_facilities/find', id: 'rs_find', request: 'GET', consumes: '' },
            { port: '根据基地ID获取地块', path: '/nyy/admin/rs/rs_facilities/findByBs_base_id', id: 'rs_findByBs_base_id', request: 'GET', consumes: '' },
            { port: '获取某用户在该基地下对地块的关联列表', path: '/nyy/admin/rs/rs_facilities/findUserFacilitiesRelevance', id: 'rs_findUserFacilitiesRelevance', request: 'POST', consumes: '["application/json"]' },
            { port: '根据ID查询地块', path: '/nyy/admin/rs/rs_facilities/get', id: 'rs_get', request: 'GET', consumes: '' },
            { port: '根据基地ID获取地块(传感器数量)', path: '/nyy/admin/rs/rs_facilities/getFacilitiesByBase', id: 'rs_getFacilitiesByBase', request: 'GET', consumes: '' },
            { port: '存在设备的地块下拉', path: '/nyy/admin/rs/rs_facilities/getGroupFacilitiesByBs_base_id', id: 'rs_getGroupFacilitiesByBs_base_id', request: 'GET', consumes: '' },
            { port: '存在摄像头的地块下拉', path: '/nyy/admin/rs/rs_facilities/getGroupFacilitiesByVideo', id: 'rs_getGroupFacilitiesByVideo', request: 'GET', consumes: '' },
            { port: '更新地块', path: '/nyy/admin/rs/rs_facilities/update', id: 'rs_update', request: 'GET', consumes: '' },
            { port: '修改某用户在该基地下对地块的关联', path: '/nyy/admin/rs/rs_facilities/updateUserFacilitiesRelevance', id: 'rs_updateUserFacilitiesRelevance', request: 'GET', consumes: '' },
            { port: '添加地块类别', path: '/nyy/admin/rs/rs_facilities_type/add', id: 'rs_add_type', request: 'GET', consumes: '' },
            { port: '删除地块类别组', path: '/nyy/admin/rs/rs_facilities_type/batchDelete', id: 'rs_batchDelete', request: 'GET', consumes: '' },
            { port: '删除地块类别', path: '/nyy/admin/rs/rs_facilities_type/deleteById', id: 'rs_deleteById', request: 'GET', consumes: '' },
            { port: '查询地块类别', path: '/nyy/admin/rs/rs_facilities_type/find', id: 'rs_find_type', request: 'POST', consumes: '["multipart/form-data"]' },
            { port: '更新地块类别', path: '/nyy/admin/rs/rs_facilities_type/update', id: 'rs_update_type', request: 'POST', consumes: '["application/json"]' }
          ],
          class: 'el-icon-cpu',
          text: '地块'
        },
        list3: {
          list: [
            { port: '添加', path: '/nyy/admin/hd/hd_device_upgrade_file/add', id: 'hd_add_file', request: 'POST', consumes: '["multipart/form-data"]' },
            { port: '删除', path: '/nyy/admin/hd/hd_device_upgrade_file/delete', id: 'hd_delete_file', request: 'GET', consumes: '' },
            { port: '查询', path: '/nyy/admin/hd/hd_device_upgrade_file/query', id: 'hd_query_file', request: 'POST', consumes: '["application/json"]' },
            { port: '设备照片列表', path: '/nyy/admin/hd/hd_device_camera/cameraPictureList', id: 'hd_cameraPictureList', request: 'GET', consumes: '' },
            { port: '根据设备ID获取拍摄图片', path: '/nyy/admin/hd/hd_device_camera/findByHd_device_id', id: 'hd_findByHd_device_id', request: 'GET', consumes: '' },
            { port: '查询设备通道号小时平均数据', path: '/nyy/admin/hd/device/getDayWsenData', id: 'hd_getDayWsenData', request: 'GET', consumes: '' },
            { port: '查询设备传感器最新数据（设备序列号）', path: '/nyy/admin/hd/device/getNewWsenDataByDevice_id', id: 'hd_getNewWsenDataByDevice_id', request: 'GET', consumes: '' },
            { port: '查询设备传感器最新数据（设备ID）', path: '/nyy/admin/hd/device/getNewWsenDataByHd_device_id', id: 'hd_getNewWsenDataByHd_device_id', request: 'GET', consumes: '' },
            { port: '查询设备通道号几天内每天的平均数据', path: '/nyy/admin/hd/device/getSomeDayWsenData', id: 'hd_getSomeDayWsenData', request: 'GET', consumes: '' },
            { port: '查询设备通道号数据', path: '/nyy/admin/hd/device/getWsenData', id: 'hd_getWsenData', request: 'GET', consumes: '' },
            { port: '查询设备传感器数据组', path: '/nyy/admin/hd/device/getWsenDataByHd_device_id', id: 'hd_getWsenDataByHd_device_id', request: 'GET', consumes: '' },
            { port: '根据开始时间与结束时间查询设备通道号数据', path: '/nyy/admin/hd/device/getWsenDataByStarttimeAndEndtime', id: 'hd_getWsenDataByStarttimeAndEndtime', request: 'GET', consumes: '' },
            { port: '根据设备ID获取异常日志列表', path: '/nyy/admin/hd/hd_device_error_log/getLogListByDevice', id: 'hd_getLogListByDevice', request: 'GET', consumes: '' },
            { port: '添加设备硬件版本', path: '/nyy/admin/hd/hd_hardware_version/add', id: 'hd_add_version', request: 'POST', consumes: '["multipart/form-data","multipart/*"]' },
            { port: '删除设备硬件版本', path: '/nyy/admin/hd/hd_hardware_version/deleteById', id: 'hd_deleteById', request: 'GET', consumes: '' },
            { port: '根据设备硬件版本ID配置通道传感器信息', path: '/nyy/admin/hd/hd_hardware_version/editDeviceChannelConfig', id: 'hd_editDeviceChannelConfig', request: 'POST', consumes: '["application/json"]' },
            { port: '查询设备硬件版本', path: '/nyy/admin/hd/hd_hardware_version/find', request: 'GET', consumes: '' },
            { port: '根据设备硬件版本Id获取通道配置列表', path: '/nyy/admin/hd/hd_hardware_version/findChannelConfigByHd_hardware_version_id', id: 'hd_findChannelConfigByHd_hardware_version_id', request: 'GET', consumes: '' },
            { port: '更新设备硬件版本', path: '/nyy/admin/hd/hd_hardware_version/update', id: 'hd_update_version', request: 'POST', consumes: '["multipart/form-data","multipart/*"]' },
            { port: '添加网关设备', path: '/nyy/admin/hd/hd_device/addDevice', id: 'hd_addDevice', request: 'GET', consumes: '' },
            { port: '添加网关下属设备', path: '/nyy/admin/hd/hd_device/addSubDevice', id: 'hd_addSubDevice', requrest: 'GET', consumes: '' },
            { port: '检查设备是否可以添加到平台', path: '/nyy/admin/hd/hd_device/checkDeviceValidity', id: 'hd_checkDeviceValidity', request: 'GET', consumes: '' },
            { port: '清空设备地图几何数据', path: '/nyy/admin/hd/hd_device/clearDeviceGeometryJson', id: 'hd_clearDeviceGeometryJson', request: 'POST', consumes: '["application/json"]' },
            { port: '删除设备', path: '/nyy/admin/hd/hd_device/deleteDevice', id: 'hd_deleteDevice', request: 'GET', consumes: '' },
            { port: '设备列表', path: '/nyy/admin/hd/hd_device/deviceList', id: 'hd_deviceList', request: 'GET', consumes: '' },
            { port: '编辑设备信息', path: '/nyy/admin/hd/hd_device/editAndSave', id: 'hd_editAndSave', request: 'POST', consumes: '["application/json"]' },
            { port: '根据基地ID获取设备列表', path: '/nyy/admin/hd/hd_device/findByBs_base_id', id: 'hd_findByBs_base_id', request: 'GET' },
            { port: '根据地块ID与应用ID获取设备', path: '/nyy/admin/hd/hd_device/findByHd_product_idAndRs_facilities_id', id: 'hd_findByHd_product_idAndRs_facilities_id', request: 'GET', consumes: '' },
            { port: '根据地块ID获取设备列表', path: '/nyy/admin/hd/hd_device/findByRs_facilities_id', id: 'hd_findByRs_facilities_id', request: 'GET', consumes: '' },
            { port: '根据地块ID与产品应用ID获取控制类设备', path: '/nyy/admin/hd/hd_device/findControlByRs_facilities_id', id: 'hd_findControlByRs_facilities_id', request: 'GET', consumes: '' },
            { port: '查询某设备在该基地下的用户操作权限列表', path: '/nyy/admin/hd/hd_device/findDevicePermissionByDevice', id: 'hd_findDevicePermissionByDevice', request: 'GET', consumes: '' },
            { port: '查询某用户在该基地下对设备的权限列表', path: '/nyy/admin/hd/hd_device/findDevicePermissionByUser', id: 'hd_findDevicePermissionByUser', request: 'GET', consumes: '' },
            { port: '根据地块ID与产品应用ID获取网关控制类设备', path: '/nyy/admin/hd/hd_device/findNetControlByRs_facilities_id', id: 'hd_findNetControlByRs_facilities_id', request: 'GET', consumes: '' },
            { port: '根据基地ID与应用ID获取网关类设备', path: '/nyy/admin/hd/hd_device/findNetDeviceByHd_product_idAndBs_base_id', id: 'hd_findNetDeviceByHd_product_idAndBs_base_id', request: 'GET', consumes: '' },
            { port: '根据地块ID与产品应用ID获取无线控制类设备', path: '/nyy/admin/hd/hd_device/findSubNetControlByRs_facilities_id', id: 'hd_findSubNetControlByRs_facilities_id', request: 'GET', consumes: '' },
            { port: '获取某用户在该地块下对设备的关联列表', path: '/nyy/admin/hd/hd_device/findUserDeviceRelevance', id: 'hd_findUserDeviceRelevance', request: 'POST', consumes: '["application/json"]' },
            { port: '根据设备Id获取设备详情', path: '/nyy/admin/hd/hd_device/getDetailById', id: 'hd_getDetailById', request: 'GET', consumes: '' },
            { port: '根据基地ID获取网关类设备', path: '/nyy/admin/hd/hd_device/getNetDevicesByBs_base_id', id: 'hd_getNetDevicesByBs_base_id', request: 'GET', consumes: '' },
            { port: '获取组织-基地-地块的设备列表', path: '/nyy/admin/hd/hd_device/getOrgBaseFacilitiesDevices', id: 'hd_getOrgBaseFacilitiesDevices', request: 'GET', consumes: '' },
            { port: '根据设备获取关联用户', path: '/nyy/admin/hd/hd_device/getUserListByDevice', id: 'hd_getUserListByDevice', request: 'GET', consumes: '' },
            { port: '根据网关类设备Id获取网关下属设备列表', path: '/nyy/admin/hd/hd_device/listByHd_device_parent_id', id: 'hd_listByHd_device_parent_id', request: 'GET', consumes: '' },
            { port: '设备进行转移', path: '/nyy/admin/hd/hd_device/moveDeivce', id: 'hd_moveDeivce', request: 'POST', consumes: '["application/json"]' },
            { port: '查询设备', path: '/nyy/admin/hd/hd_device/queryDevice', id: 'hd_queryDevice', request: 'GET', consumes: '' },
            { port: '修改用户对设备的操作权限', path: '/nyy/admin/hd/hd_device/updateDevicePermission', id: 'hd_updateDevicePermission', request: 'POST', consumes: '["application/json"]' },
            { port: '增加设备类型属性', path: '/nyy/admin/hd/hd_device_property/add', id: 'hd_add_property', request: 'POST', consumes: '["application/json"]' },
            { port: '删除设备类型属性', path: '/nyy/admin/hd/hd_device_property/deleteById', id: 'hd_deleteById_property', request: 'POST', consumes: '["application/json"]' },
            { port: '查询设备类型属性', path: '/nyy/admin/hd/hd_device_property/find', id: 'hd_find_properry', request: 'POST', consumes: '["application/json"]' },
            { port: '查询设备指定属性天数的数据(平均)', path: '/nyy/admin/hd/hd_device_property/getDayData', id: 'hd_getDayData', request: 'GET', consumes: '' },
            { port: '根据ID查询设备类型属性', path: '/nyy/admin/hd/hd_device_property/getDeviceProperty', id: 'hd_getDeviceProperty', request: 'POST', consumes: '["application/json"]' },
            { port: '查询设备最新属性数据', path: '/nyy/admin/hd/hd_device_property/getDevicePropertyData', id: 'hd_getDevicePropertyData', request: 'GET', consumes: '' },
            { port: '查询设备指定属性小时的数据(平均)', path: '/nyy/admin/hd/hd_device_property/getHourData', id: 'hd_getHourData', request: 'GET', consumes: '' },
            { port: '修改设备类型属性', path: '/nyy/admin/hd/hd_device_property/update', id: 'hd_update_preperty', request: 'POST', consumes: '["application/json"]' },
            { port: '添加设备类型', path: '/nyy/admin/hd/hd_device_type/add', id: 'hd_add_type', request: 'POST', consumes: '["multipart/form-data"]' },
            { port: '删除设备类型', path: '/nyy/admin/hd/hd_device_type/deleteById', id: 'hd_deleteById_type', request: 'GET', consumes: '' },
            { port: '查询设备类型', path: '/nyy/admin/hd/hd_device_type/find', id: 'hd_find_type', request: 'GET', consumes: '' },
            { port: '根据地块ID获取网关控制器与无线控制器设备数量', path: '/nyy/admin/hd/hd_device_type/findControlByHd_product_idAndRs_facilities_id', id: 'hd_findControlByHd_product_idAndRs_facilities_id', request: 'GET', consumes: '' },
            { port: '查询所有的设备类型', path: '/nyy/admin/hd/hd_device_type/getAllList', id: 'hd_getAllList', request: 'GET', consumes: '' },
            { port: '根据基地ID获取设备类型(传感器数量)', path: '/nyy/admin/hd/hd_device_type/getDeviceTypeByBase', id: 'hd_getDeviceTypeByBase', request: 'GET', consumes: '' },
            { port: '设备类型与硬件版本下拉', path: '/nyy/admin/hd/hd_device_type/getTypeHardware', id: 'hd_getTypeHardware', request: 'GET', consumes: '' },
            { port: '更新设备类型', path: '/nyy/admin/hd/hd_device_type/update', id: 'hd_update_type', request: 'POST', consumes: '["multipart/form-data"]' }
          ],
          class: 'el-icon-video-camera',
          text: '设备'
        },
        list4: {
          list: [
            { port: '添加分组', path: '/nyy/admin/hd/hd_device_sensor_group/add', id: 'device_add_group', request: 'POST', consumes: '["application/json"]' },
            { port: '删除分组', path: '/nyy/admin/hd/hd_device_sensor_group/deleteById', id: 'device_deleteById_group', request: 'GET', consumes: '' },
            { port: '根据地块ID获取分组信息', path: '/nyy/admin/hd/hd_device_sensor_group/findByRs_facilities_id', id: 'device_findByRs_facilities_id', request: 'GET', consumes: '' },
            { port: '根据地块ID获取分组传感器信息', path: '/nyy/admin/hd/hd_device_sensor_group/findGroupSensorByRs_facilities_id', id: 'device_findGroupSensorByRs_facilities_id', request: 'GET', consumes: '' },
            { port: '更新分组', path: '/nyy/admin/hd/hd_device_sensor_group/update', id: 'device_update_group', request: 'POST', consumes: '["application/json"]' },
            { port: '根据ID查询传感器小时平均数据', path: '/nyy/admin/hd/hd_device_sensor/getDayWsenDataBySensorId', id: 'device_getDayWsenDataBySensorId', request: 'GET', consumes: '' },
            { port: '根据ID查询传感器天数平均数据', path: '/nyy/admin/hd/hd_device_sensor/getSomeDayWsenDataBySensorId', id: 'device_getSomeDayWsenDataBySensorId', request: 'GET', consumes: '' },
            { port: '根据ID查询传感器最新几条数据', path: '/nyy/admin/hd/hd_device_sensor/getWsenDataBySensorId', id: 'device_getWsenDataBySensorId', request: 'GET', consumes: '' },
            { port: '根据开始时间与结束时间查询传感器数据', path: '/nyy/admin/hd/hd_device_sensor/getWsenDataByStarttimeAndEndtime', id: 'device_getWsenDataByStarttimeAndEndtime', request: 'GET', consumes: '' },
            { port: '查询传感器数据', path: '/nyy/admin/hd/hd_device_sensor/selectSensorData', id: 'device_selectSensorData', request: 'GET', consumes: '' },
            { port: '删除传感器', path: '/nyy/admin/hd/hd_device_sensor/deleteById', id: 'device_deleteById_sensor', request: 'GET', consumes: '' },
            { port: '根据设备Id获取该设备关联的所有传感器列表', path: '/nyy/admin/hd/hd_device_sensor/findAllSensorByHd_device_id', id: 'device_findAllSensorByHd_device_id', request: 'GET', consumes: '' },
            { port: '根据设备Id获取传感器列表', path: '/nyy/admin/hd/hd_device_sensor/findByHd_device_id', id: 'device_findByHd_device_id', request: 'GET', consumes: '' },
            { port: '根据分组ID获取传感器列表', path: '/nyy/admin/hd/hd_device_sensor/findByHd_device_sensor_group_id', id: 'device_findByHd_device_sensor_group_id', request: 'GET', consumes: '' },
            { port: '根据出厂设备ID获取传感器通道配置列表', path: '/nyy/admin/hd/hd_device_sensor/findByHd_factory_device_id', id: 'device_findByHd_factory_device_id', request: 'GET', consumes: '' },
            { port: '根据地块ID与产品应用ID获取控制类设备', path: '/nyy/admin/hd/hd_device_sensor/findControlByRs_facilities_id', id: 'device_findControlByRs_facilities_id', request: 'GET', consumes: '' },
            { port: '根据地块ID与产品ID获取有效传感器列表（根据阀门分类功能分组）', path: '/nyy/admin/hd/hd_device_sensor/findGroupRs_facilities_idAndHd_product_id', id: 'device_findGroupRs_facilities_idAndHd_product_id', request: 'GET', consumes: '' },
            { port: '根据地块ID与产品应用ID获取网关控制类设备传感器', path: '/nyy/admin/hd/hd_device_sensor/findNetControlByRs_facilities_id', id: 'device_findNetControlByRs_facilities_id', request: 'GET', consumes: '' },
            { port: '根据地块ID与阀门分类功能ID获取有效传感器列表', path: '/nyy/admin/hd/hd_device_sensor/findRs_facilities_idAndHd_sensor_type_function_id', id: 'device_findRs_facilities_idAndHd_sensor_type_function_id', request: 'GET', consumes: '' },
            { port: '根据地块ID与产品应用ID获取无线控制类设备', path: '/nyy/admin/hd/hd_device_sensor/findSubNetControlByRs_facilities_id', id: 'device_findSubNetControlByRs_facilities_id', request: 'GET', consumes: '' },
            { port: '根据用户ID获取存在传感器的基地-地块', path: '/nyy/admin/hd/hd_device_sensor/getBaseFacilitiesByUserId', id: 'device_getBaseFacilitiesByUserId', request: 'GET', consumes: '' },
            { port: '根据ID查询详情', path: '/nyy/admin/hd/hd_device_sensor/getById', id: 'device_getById', request: 'GET', consumes: '' },
            { port: '根据用户获取存在传感器的地块列表', path: '/nyy/admin/hd/hd_device_sensor/getFacilitiesSensor', id: 'device_getFacilitiesSensor', request: 'GET', consumes: '' },
            { port: '根据传感器ID查询最新数据', path: '/nyy/admin/hd/hd_device_sensor/getNewDataBySensorId', id: 'device_getNewDataBySensorId', request: 'GET', consumes: '' },
            { port: '根据传感器ID组查询最新数据', path: '/nyy/admin/hd/hd_device_sensor/getNewDataBySensorIds', id: 'device_getNewDataBySensorIds', request: 'GET', consumes: '' },
            { port: '获取最新的传感器列表', path: '/nyy/admin/hd/hd_device_sensor/getNewsSensorList', id: 'device_getNewsSensorList', request: 'GET', consumes: '' },
            { port: '根据设备ID返回数据传感器列表', path: '/nyy/admin/hd/hd_device_sensor/getSensorListByDeviceId', id: 'device_getSensorListByDeviceId', request: 'GET', consumes: '' },
            { port: '根据地块ID返回数据传感器列表', path: '/nyy/admin/hd/hd_device_sensor/getSensorListByFacilitiesId', id: 'device_getSensorListByFacilitiesId', request: 'GET', consumes: '' },
            { port: '根据地块ID返回数据传感器列表2', path: '/nyy/admin/hd/hd_device_sensor/getSensorListByFacilitiesId2', id: 'device_getSensorListByFacilitiesId2', request: 'GET', consumes: '' },
            { port: '根据设备ID获取设备对应的开关传感器列表', path: '/nyy/admin/hd/hd_device_sensor/getSwitchSensorsByHd_device_id', id: 'device_getSwitchSensorsByHd_device_id', request: 'GET', consumes: '' },
            { port: '根据地块ID获取设备对应的开关传感器列表', path: '/nyy/admin/hd/hd_device_sensor/getSwitchSensorsByRs_facilities_id', id: 'device_getSwitchSensorsByRs_facilities_id', request: 'GET', consumes: '' },
            { port: '根据地块ID获取设备对应的数值传感器列表', path: '/nyy/admin/hd/hd_device_sensor/getValueSensorsByRs_facilities_id', id: 'device_getValueSensorsByRs_facilities_id', request: 'GET', consumes: '' },
            { port: '根据用户获取传感器类型-地块-设备-传感器', paht: '/nyy/admin/hd/hd_device_sensor/getUserSensorTypeByBaseId', id: 'device_getUserSensorTypeByBaseId', request: 'GET', consumes: '' },
            { port: '更新传感器信息', path: '/nyy/admin/hd/hd_device_sensor/update', id: 'device_update_sersor', request: 'POST', consumes: '["application/json"]' },
            { port: '添加传感器类型', path: '/nyy/admin/hd/hd_sensor_type/add', id: 'device_add_type', request: 'POST', consumes: '["multipart/form-data"]' },
            { port: '删除传感器类型', path: '/nyy/admin/hd/hd_sensor_type/deleteById', id: 'device_deleteById_type', request: 'GET', consumes: '' },
            { port: '查询传感器类型', path: '/nyy/admin/hd/hd_sensor_type/find', id: 'device_find_type', request: 'GET', consumes: '' },
            { port: '根据基地ID获取设备类型', path: '/nyy/admin/hd/hd_sensor_type/getSensorTypeByBase', id: 'device_getSensorTypeByBase', request: 'GET', consumes: '' },
            { port: '修改传感器类型', path: '/nyy/admin/hd/hd_sensor_type/update', id: 'device_update_type', request: 'POST', consumes: '["multipart/form-data"]' }
          ],
          class: 'el-icon-coordinate',
          text: '传感器'
        },
        list5: {
          list: [
            { port: '移除用户-基地', path: '/nyy/admin/api/removeUserBase', id: 'user_removeUserBase', request: 'GET', consumes: '' },
            { port: '移除用户-设备', path: '/nyy/admin/api/removeUserDevice', id: 'user_removeUserDevice', request: 'GET', consumes: '' },
            { port: '移除用户-地块', path: '/nyy/admin/api/removeUserFacilities', id: 'user_removeUserFacilities', request: 'GET', consumes: '' },
            { port: '移除用户-组织', path: '/nyy/admin/api/removeUserOrg', id: 'user_removeUserOrg', request: 'GET', consumes: '' },
            { port: '通过用户名查找用户', path: '/nyy/admin/api/rest/users/findByName', id: 'user_findByName', request: 'GET', consumes: '' },
            { port: '修改用户基本信息', path: '/nyy/admin/api/updateUserBaseInfo', id: 'user_updateUserBaseInfo', request: 'POST', consumes: '["application/json"]' },
            { port: '用户列表', path: '/nyy/admin/api/userList', id: 'user_userList', request: 'GET', consumes: '' },
            { port: '查询用户', path: '/nyy/admin/api/users', id: 'user_users_select', request: 'GET', consumes: '' },
            { port: '添加修改用户', path: '/nyy/admin/api/users', id: 'user_users_inset', request: 'POST', consumes: '["application/json"]' },
            { port: '修改用户', path: '/nyy/admin/api/users', id: 'user_users_update', request: 'PUT', consumes: '["application/json"]' },
            { port: '根据ID获取数据', path: '/nyy/admin/api/users/byId', id: 'user_byId', request: 'GET', consumes: '' },
            { port: '根据ID获取用户', path: '/nyy/admin/api/users/getMap', id: 'user_getMap', request: 'GET', consumes: '' },
            { port: '判断用户是否有组织', path: '/nyy/admin/api/users/hasOrg', id: 'user_hasOrg', request: 'GET', consumes: '' },
            { port: '修改头像', path: '/nyy/admin/api/users/updateAvatar', id: 'user_updateAvatar', request: 'POST', consumes: '["multipart/form-data"]' },
            { port: '修改邮箱', path: '/nyy/admin/api/users/updateEmail/{code}', id: 'user_updateEmail', request: 'POST', consumes: '["application/json"]' },
            { port: '修改密码', path: '/nyy/admin/api/users/updatePass', id: 'user_updatePass', request: 'POST', consumes: '' },
            { port: '验证密码', path: '/nyy/admin/api/users/validPass', id: 'user_validPass', request: 'POST', consumes: '' },
            { port: '删除用户', path: '/nyy/admin/api/users/{id}', id: 'user_delete', request: 'DELETE', consumes: '' },
            { port: '手机验证码是否有效', path: '/nyy/admin/auth/aPhoneVerificationCode', id: 'user_aPhoneVerificationCode', request: 'GET', consumes: '' },
            { port: '加密直接登录', path: '/nyy/admin/auth/directLogin', id: 'user_directLogin', request: 'POST', consumes: '["application/json"]' },
            { port: '测试直接登录', path: '/nyy/admin/auth/directLogin2', id: 'user_directLogin2', request: 'POST', consumes: '["application/json"]' },
            { port: '获取大屏token', path: '/nyy/admin/auth/getDataViewToken', id: 'user_getDataViewToken', request: 'GET', consumes: '' },
            { port: '获取用户信息', path: '/nyy/admin/auth/info', id: 'user_info', request: 'GET', consumes: '' },
            { port: '网页端登录', path: '/nyy/admin/auth/login', id: 'user_login', request: 'POST', consumes: '["application/json"]' },
            { port: '手机验证码登录', path: '/nyy/admin/auth/phoneLogin', id: 'user_phoneLogin', request: 'POST', consumes: '["application/json"]' },
            { port: '手机验证码注册', path: '/nyy/admin/auth/phoneRegister', id: 'user_phoneRegister', request: 'POST', consumes: '["application/json"]' },
            { port: '获取手机验证码', path: '/nyy/admin/auth/phoneVerificationCode', id: 'user_phoneVerificationCode', request: 'GET', consumes: '' },
            { port: '获取图片验证码', path: '/nyy/admin/auth/vCode', id: 'user_vCode', request: 'GET', consumes: '' }
          ],
          class: 'el-icon-user',
          text: '人员'
        }
      }

    }
  },
  created() {
    this.$nextTick(() => {
      // this.more()
    })
  },
  mounted() {
    this.$store.commit('SET_API_LIST', this.data)
    const list = JSON.stringify(this.data)
    sessionStorage.setItem('MyList', list)
  },
  methods: {
    // more() {
    //     const list = document.getElementsByTagName('ul')
    //     //console.log(list.length)
    //     for(let i=0; i<list.length; i++) {
    //         if(list[i].children.length>this.minNum) {

    //             const obj = document.createElement('div')
    //             obj.className = 'more'
    //             const icon = document.createElement('i')
    //             icon.className = 'el-icon-arrow-down'
    //             const span = document.createElement('span')
    //             span.innerHTML = '展开'
    //             obj.appendChild(icon)
    //             obj.appendChild(span)
    //             list[i].parentNode.appendChild(obj)
    //         }
    //     }
    // }
  }
}
</script>
<style  rel="stylesheet/scss" lang="scss">
    ul {
        list-style: none;
    }
    .header {
        height: 60px;
        box-sizing: border-box;
        background-color: #fff;
        border-bottom: #e5e5e5 1px solid;
    }
    .headerContent {
        padding: 0 60px;
    }
    .link {
        display: inline-block;
        height: 60px;
        padding-top: 10px;
        font-size:20px;
        font-weight: 800;
        color:#000000a6;
        img {vertical-align: middle;}

    }
    .apiBg {
        position: relative;
    }
    .dsc {
        position: absolute;
        width: 100%;
        text-align: center;
        top: 70px;
        left: 0;
        color: #fff;
        p {
            margin-top: 20px;
        }
    }
    .content {
        width: 80%;
        box-sizing: border-box;
        height: 500px;
        margin: 0 auto;
    }
    .group1 {
        display: flex;
    }
    .list {
        flex: 1;
    }
</style>
