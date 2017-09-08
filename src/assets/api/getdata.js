const PLATFORM = 'platform=ios'
const SIGN = 'sign=9a0ce2d8bf4d28a75e1f6945f70dc9bf'
const UESR_ID = ''
const UUID = 'uuid=74C5A500-45F6-4220-9CDB-0BBB7553A94E'
const VERSION = 'version=v4.3.2'
var USER_INFO = PLATFORM + '&' + SIGN + '&' + UUID + '&' + VERSION
export function getList() {
  let url = 'http://v3.wufazhuce.com:8000/api/onelist/idlist/?' + USER_INFO;
  return fetch(idlist).then(response => {
    return response.json();
  })
}
export function getDatas(id) {
  let url = 'http://v3.wufazhuce.com:8000/api/onelist/' + id + '/0?' + USER_INFO;
  return fetch(url).then(response => {
    return response.json();
  })
}
//请求今天的数据
export function getNowDatas() {
  let url = 'http://v3.wufazhuce.com:8000/api/channel/one/0/0?' + USER_INFO;
  return fetch(url).then(response => {
    return response.json();
  })
}
//请求顶部菜单列表数据
//传入年份,月份
export function getMenuList(years, month) {
  let url = 'http://v3.wufazhuce.com:8000/api/feeds/list/' + years + '-' + month + '?' + USER_INFO;
  return fetch(url).then(response => {
    return response.json();
  })
}
//获取指定日期数据
//传入日期 格式: 2012-12-12
export function getDateDatas(date) {
  let url = 'http://v3.wufazhuce.com:8000/api/channel/one/' + date + '/0?' + USER_INFO;
  return fetch(url).then(response => {
    return response.json();
  })
}
// export function aaaa(date) {
//   let url = '/api/Showtime/HotCitiesByCinema.api'
//   return fetch(url).then(response => {
//     return response.json();
//   })
// }