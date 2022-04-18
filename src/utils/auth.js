import Cookies from 'js-cookie'
//get
export function getToken() {
  return Cookies.get('token')
}
export function getUid() {
  return Cookies.get('uid')
}
export function getName() {
  return Cookies.get('name')
}
export function getPhoneNumber() {
  return Cookies.get('phoneNumber')
}
//set
export function setToken(token, expires) {
  return Cookies.set('token', token, { expires })
}
export function setUid(uid, expires) {
  return Cookies.set('uid', uid, { expires })
}
export function setName(name, expires) {
  return Cookies.set('name', name, { expires })
}
export function setPhoneNumber(phoneNumber, expires) {
  return Cookies.set('phoneNumber', phoneNumber, { expires })
}
//remove
export function removeToken() {
  return Cookies.remove('token')
}
export function removeUid() {
  return Cookies.remove('uid')
}
export function removeName() {
  return Cookies.remove('name')
}
export function removePhoneNumber() {
  return Cookies.remove('phoneNumber')
}
