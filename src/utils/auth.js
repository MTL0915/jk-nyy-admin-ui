import Cookies from 'js-cookie'
import Config from '@/config'

const TokenKey = Config.TokenKey

let lsToken = {};

export function getToken() {
  return lsToken[TokenKey] || Cookies.get(TokenKey)
}

export function setToken(token, rememberMe) {
  lsToken[TokenKey] = token
  if (rememberMe) {
    return Cookies.set(TokenKey, token, { expires: Config.tokenCookieExpires })
  } else return Cookies.set(TokenKey, token)
}

export function removeToken() {
  lsToken[TokenKey] = "";
  delete lsToken[TokenKey];
  return Cookies.remove(TokenKey)
}
