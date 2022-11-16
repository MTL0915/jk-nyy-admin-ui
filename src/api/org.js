import request from '@/utils/request'

export function orgSelect(data) {
  return request({
    url: '/api/dept/orgSelect',
    method: 'get',
    params: data
  })
}

export function attestationOrg(data) {
  return request({
    url: '/api/dept/attestationOrg',
    method: 'get',
    params: data
  })
}

export function treeBaseRole(data) {
  return request({
    url: '/tree/treeBaseRole',
    method: 'get',
    params: data
  })
}

/* export function jobList(data) {
  return request({
    url: '/tree/jobList',
    method: 'get',
    params: data
  })
}*/

export function treeOrgRootNode(data) {
  return request({
    url: '/tree/treeOrgRootNode',
    method: 'get',
    params: data
  })
}

export function treeChildOrgAndBase(data) {
  return request({
    url: '/tree/treeChildOrgAndBase',
    method: 'post',
    params: data
  })
}

export function treeChildOrg(data) {
  return request({
    url: '/tree/treeChildOrg',
    method: 'get',
    params: data
  })
}

export function treeBase(data) {
  return request({
    url: '/tree/treeBase',
    method: 'get',
    params: data
  })
}

export function treeFacilities(data) {
  return request({
    url: '/tree/treeFacilities',
    method: 'post',
    params: data
  })
}

export function treeFacilitiesIncludeSensor(data) {
  return request({
    url: '/tree/treeFacilitiesIncludeSensor',
    method: 'post',
    params: data
  })
}

export function getOrgOne(data) {
  return request({
    url: '/api/dept/findOneLevelList',
    method: 'get',
    params: data
  })
}

export function findSubList(bs_org_parent_id) {
  return request({
    url: '/api/dept/findSubList',
    method: 'get',
    params: {
      bs_org_parent_id: bs_org_parent_id
    }
  })
}

function getBase(data) {
  return request({
    url: '/bs/bs_base/findBasesByBs_org_id',
    method: 'get',
    params: data
  })
}

function getFacilities(data) {
  return request({
    url: '/rs/rs_facilities/findByBs_base_id',
    method: 'get',
    params: data
  })
}

export function findOneLevelList() {
  return new Promise(resolve => {
    getOrgOne()
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        console.log('requery err', err)
      })
  })
}

export function getBaseData(id) {
  const data = {
    bs_org_id: id
  }
  return new Promise(resolve => {
    getBase(data)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        console.log('requery err', err)
      })
  })
}

export function getFacilitiesData(id) {
  const data = {
    bs_base_id: id
  }
  return new Promise(resolve => {
    getFacilities(data)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        console.log('requery err', err)
      })
  })
}

// add
export function addOrg(data) {
  const param = new FormData() // 创建form对象
  for (const d in data) {
    if (data[d]) {
      param.append(d, data[d])
    }
  }
  return request({
    url: '/bs/bs_org/save',
    method: 'post',
    data: param
  })
}
// edit
export function editOrg(data) {
  const param = new FormData() // 创建form对象
  for (const d in data) {
    if (data[d]) {
      param.append(d, data[d])
    }
  }
  return request({
    url: '/bs/bs_org/update',
    method: 'post',
    data: param
  })
}
// delete
export function delOrg(data) {
  return request({
    url: '/bs/bs_org/deleteById',
    method: 'get',
    params: data
  })
}
