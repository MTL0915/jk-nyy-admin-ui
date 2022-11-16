import { getToken } from '@/utils/auth'
import axios from 'axios'
let requestForm = function(param) {
  
  var url = param.url;
  var json = param.data;
  var formData = new FormData()
  for (var i in json) {
    formData.append(i, json[i])
  }

  // const config = {
  //   headers: {
  //     // 'Content-Type': 'application/json',
  //     Authorization: 'Bearer ' + getToken()
  //   }
  // }
  return request({
    url:url,
    method:"post",
    data:formData
  })
  // return axios
  //   .post(process.env.BASE_API + url, formData, config)
  //   .then(res => {
  //     if (res.data.code === 200) {
  //       call && call(res)
  //     }
  //   })
}

export {requestForm}
