import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
// eslint-disable-next-line no-unused-vars
const userNames = 'username'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
export function getUserName() {
  return Cookies.get(userNames)
}

export function setUserName(userName) {
  return Cookies.set(userNames, userName)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
export function removeUserName() {
  return Cookies.remove(userNames)
}
