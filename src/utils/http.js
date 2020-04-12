import Taro from '@tarojs/taro'
import { shaParams } from '@/utils'

const whiteList = ['login']
let Fly = require('flyio/dist/npm/wx') // eslint-disable-line
let request = new Fly()
request.config.timeout = 15 * 1000
request.config.baseURL = 'http://39.101.197.57:9001/api'
request.interceptors.request.use((req) => {
  req.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  // req.headers['Content-Type'] = 'application/json'
  if(!whiteList.includes(req.url)) {
    req.body.token = Taro.getStorageSync('token')
  }
  req.body.sign = shaParams(req.body) // 参数加密

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

function checkStatus (response) {
  if (response.code == '200') {
    return response.data
  } else {
    Taro.showToast({
      title: response.message,
      icon: 'none',
      duration: 2000
    })
    throw new Error(response.message)
  }
}

export default function fetch (url, params = {}, method = 'post') {
  return new Promise((resolve, reject) => {
    request[method](url, params)
      .then(checkStatus)
      .then(response => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
