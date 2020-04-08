import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { goLogin } from '@/utils/api'
import { shaParams } from '@/utils'

import './index.scss'

class Login extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      text: '登录页'
    }
  }

  goBack = () => {
    Taro.navigateBack()
  }
  loginHandler = async () => {
    let result = await goLogin()
    console.log('结果',result)
  }
  getInfo = (e) => {
    
    if (e.target.userInfo) {
      const userInfo = e.target.userInfo
      wx.login({
        success: async (login) => {
        // 调用接口获取登录凭证（code）。通过凭证进而换取用户登录态信息，包括用户的唯一标识（openid）
        // https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/login.html
          
          let data = {
            wxName: userInfo.nickName,
            jscode: login.code
          }
          let ret = shaParams(data)
          console.log(userInfo,login.code)
          let result = await goLogin({
            ...data,
            sign: ret
          })
          console.log('结果',result)
          // console.log('返回结果', res.result.token)
          // // 存储后端token
          // Taro.setStorageSync('token', res.result.token)
          // // 授权成功后，并跳转进入小程序首页
          // Taro.reLaunch({
          //   url: '/pages/index/main'
          // })
        },
        fail: (error) => {
          console.log('errlogin=>', error)
        }
      })
    } else {
      // 用户按了拒绝按钮
      Taro.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  }
  config = {
    navigationBarTitleText: '登录'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const { text } = this.state
    return (
      <View className='login'>
        {/* <Text className='font-48'>{text}</Text>
        <Button onClick={this.loginHandler}>登录登录</Button>
        <Button onClick={this.goBack}>返回</Button> */}
        <Button className='btn-login' openType='getUserInfo' onGetUserInfo={this.getInfo}>
          微信快捷登录
        </Button>
      </View>
    )
  }
}

export default Login
