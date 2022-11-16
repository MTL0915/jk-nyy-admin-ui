import request from '@/utils/request'

export function findHd_device_upgrade_journal(data) {
  return request({
    url: '/hd/hd_device_upgrade_journal/find',
    method: 'get',
    params: data
  })
}

export function addHd_device_upgrade_journal(data) {
  // const deviceUpgradeJournalList = new FormData() // 创建form对象
  // for (const d in data) {
  //   if (data[d]) {
  //     deviceUpgradeJournalList.append(d, data[d])
  //   }
  // }
  return request({
    url: '/hd/hd_device_upgrade_journal/add',
    method: 'post',
    params: data
  })
}

export function findAllList(data) {
  return request({
    url: '/hd/hd_device_upgrade_journal/findAllList',
    method: 'get',
    params: data
  })
}
