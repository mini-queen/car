import Taro from '@tarojs/taro'

let Fly = require('flyio/dist/npm/wx') // eslint-disable-line
let request = new Fly()
request.config.timeout = 15 * 1000
request.config.baseURL = 'http://39.101.197.57:9001/api'
request.interceptors.request.use((req) => {
  req.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  // req.headers['Content-Type'] = 'application/json'
  // req.headers['sign'] = 'bba3323921709ed27e2fdb459ca65b70'
  // req.headers['X-SZK-Channel'] = 'small'
  // req.headers['X-SZK-Token'] = Taro.getStorageSync('DIAN_TOKEN')
  Taro.showLoading({ title: '加载中..' })
  return req
})

request.interceptors.response.use(

  (response, promise) => {
    Taro.hideLoading()
    return promise.resolve(response.data)
  },
  (err, promise) => {
    Taro.hideLoading()
    Taro.showToast({
      title: '网络请求失败,请稍后重试',
      icon: 'none',
      duration: 2000
    })
    return promise.resolve(err)
  }
)


export default function fetch (url, params = {}, method = 'post') {
  return new Promise((resolve, reject) => {
    request[method](url, params)
      .then(response => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
