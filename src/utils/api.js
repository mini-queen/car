import fetch from './http'


// 首页
export async function getIndexGoods (params) {
  let result = await fetch('Api/h5/m/p/getShopRecommendListForIndex', params, 'post')
  return result
}

export async function goLogin (params) {
  let result = await fetch('login', params, 'post')
  return result
}
