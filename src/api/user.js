import request from "@/utils/request";

export function facilitiesUsers(data) {
  return request({
    url: "/api/facilitiesUsers",
    method: "get",
    params: data
  });
}

export function needUpdatePass(data) {
  return request({
    url: "/api/needUpdatePass",
    method: "get",
    params: data
  });
}

export function checkPhone(data) {
  return request({
    url: "/auth/checkPhone",
    method: "get",
    params: data
  });
}

export function authinfo(data,token) {
  var json = {
    url: "/auth/info",
    method: "get",
    params: data
  }
  if( token ) {
    json.headers = {
      'Authorization': 'Bearer ' + token
    }
  }
  
  return request(json);
}

//将一个无组织用户设为某组织的组织管理员
export function setUserBecomeAdmin(data) {
  return request({
    url: "api/users/setUserBecomeAdmin",
    method: "get",
    params: data
  });
}

//管理员重置密码
export function resetPassByAdmin(data) {
  return request({
    url: "api/resetPassByAdmin",
    method: "post",
    params: data
  });
}

//忘记密码 发送短信给用户
export function getForgetPass(data) {
  return request({
    url: "auth/getForgetPass",
    method: "get",
    params: data
  });
}

//检验验证码是否正确
export function checkForgetPass(data) {
  return request({
    url: "auth/checkForgetPass",
    method: "get",
    params: data
  });
}

export function userFacilitiesList(data) {
  return request({
    url: "api/userFacilitiesList",
    method: "get",
    params: data
  })
}

export function userBaseList(data) {
  return request({
    url: "api/userBaseList",
    method: "get",
    params: data
  });
}

export function searchUser(data) {
  return request({
    url: "api/users/searchUser",
    method: "get",
    params: data
  });
}

export function updateUserBaseInfo(data) {
  return request({
    url: "api/updateUserBaseInfo",
    method: "post",
    params: data
  });
}

export function removeUserBase(data) {
  return request({
    url: "api/removeUserBase",
    method: "get",
    params: data
  });
}

export function removeUserOrg(data) {
  return request({
    url: "api/removeUserOrg",
    method: "get",
    params: data
  });
}

export function phoneRegister(data) {
  return request({
    url: "auth/phoneRegister",
    method: "post",
    params: data
  });
}

export function phoneVerificationCode(data) {
  return request({
    url: "auth/phoneVerificationCode",
    method: "get",
    params: data
  });
}

export function userList(data) {
  return request({
    url: "api/userList",
    method: "get",
    params: data
  });
}

export function nuserList(data) {
  return request({
    url: "api/nuserList",
    method: "get",
    params: data
  });
}

export function add(data) {
  return request({
    url: "api/users",
    method: "post",
    data
  });
}

export function del(id) {
  return request({
    url: "api/users/" + id,
    method: "delete"
  });
}

export function edit(data) {
  return request({
    url: "api/users",
    method: "put",
    data
  });
}

export function getById(data) {
  return request({
    url: "api/users/byId",
    method: "get",
    params: data
  });
}

export function validPass(data) {
  return request({
    url: "api/users/validPass/",
    method: "post",
    params: data
  });
}

export function updatePass(data) {
  return request({
    url: "api/users/updatePass",
    method: "post",
    params: data
  });
}

export function updateEmail(data) {
  return request({
    url: "api/users/updateEmail",
    method: "post",
    params: data
  });
}

export function updateName(data) {
  return request({
    url: "api/users/updateName",
    method: "post",
    params: data
  });
}

export function hasOrg() {
  return request({
    url: "api/users/hasOrg",
    method: "get"
  });
}
