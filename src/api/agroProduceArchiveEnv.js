import request from '@/utils/request'

export function getNowAgroProduceArchiveEnvByArchive (data) {
    return request({
        url: "api/getNowAgroProduceArchiveEnvByArchive",
        method: "get",
        params: data
    });
}

export function del (id) {
    return request({
      url: 'api/agroProduceArchiveEnv/' + id,
      method: 'delete'
    })
  }