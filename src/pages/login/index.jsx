import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { AtModal, AtModalHeader, AtModalContent, AtModalAction, 
  AtInput, AtMessage } from "taro-ui"
import { connect } from '@tarojs/redux'
import { goLogin, sendMsg, complementUserInfo } from '@/utils/api'
import { setUserInfo } from '@/actions/user';

import './index.scss'

@connect(({ user }) => ({
  userInfo: user
}), {
  setUserInfo
})

class Login extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      isOpened: false,
      isSend: false,
      time: 59,
      user: {}
    }
  }
  genderMap = {
    0: '女',
    1: '男',
    '男': 1,
    '女': 0
  }
  handleChange = (val,type) => {
    let user = {...this.state.user}
    user[type] = val
    this.setState({
      user: user
    })
  } 
  goBack = () => {
    Taro.navigateBack()
  }
  onTimeUp = () => {
    this.setState({
      isSend: false
    })
  } 
  onTimeStart= async () => {
    const { tel } = this.state.user
    if(!(/^1[3456789]\d{9}$/.test(tel))) {
      return Taro.atMessage({
        'message': '手机号码格式有误',
        'type': 'info'
      })
    }
    await sendMsg({phoneNum: tel})
    this.setState({
      isSend: true
    })
    this.timer = setInterval(_ => {
      if(this.state.time == 0) {
        clearInterval(this.timer)
        this.onTimeUp()
      }else {
        this.setState({
          time: this.state.time - 1
        })
      }
    }, 1000)
  } 
  sureHandler = () => {
    const { nickName,gender,tel,code } = this.state.user
    if(!nickName || !gender || !tel || !code) {
      return Taro.atMessage({
        'message': '请完善个人信息',
        'type': 'info'
      })
    }
    if(!this.genderMap[gender]) {
      return Taro.atMessage({
        'message': '性别只能为男或女',
        'type': 'info'
      })
    }
    if(!(/^1[3456789]\d{9}$/.test(tel))) {
      return Taro.atMessage({
        'message': '手机号码格式有误',
        'type': 'info'
      })
    }
    complementUserInfo(this.user).then(_ => {
      this.setState({
        isOpened: false
      })
    })
    
  }
  cancelHandler = () => {
    this.setState({
      isOpened: false
    })
  }
  getInfo = (e) => {
    if (e.target.userInfo) {
      const userInfo = e.target.userInfo
      wx.login({
        success: async (login) => {
        // 调用接口获取登录凭证（code）。通过凭证进而换取用户登录态信息，包括用户的唯一标识（openid）
        // https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/login.html
          this.setState({
            user: {
              ...userInfo,
              gender: this.genderMap[userInfo.gender]
            }
          })
          // 设置user信息
          this.props.setUserInfo(userInfo)

          let data = {
            wxName: userInfo.nickName,
            jscode: login.code
          }
          let result = await goLogin(data)
          console.log('登录结果',result)
          // 存储后端token
          Taro.setStorageSync('token', result.token)
          // 判断信息是否完整
          if(result.completion) {
            // 跳转
            // Taro.reLaunch({
            //   url: '/pages/index/main'
            // })
          }else {
            this.setState({
              isOpened: true
            })
          }          
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

  componentDidShow () { 
  }

  componentDidHide () { 
    this.timer && clearInterval(this.timer)
  }

  render () {
    const { isOpened, isSend, time, user } = this.state
    return (
      <View className='login'>
        {/* <Text className='font-48'>{text}</Text>
        <Button onClick={this.goBack}>返回</Button> */}
        <Button className='btn-login' openType='getUserInfo' onGetUserInfo={this.getInfo}>
          微信快捷登录
        </Button>
        <AtModal isOpened={isOpened} closeOnClickOverlay={false}>
          <AtModalHeader>请完善个人信息</AtModalHeader>
          <AtModalContent>
            <AtInput
              className='input-profile'
              title='昵称'
              type='text'
              placeholder='请输入昵称'
              value={user.nickName}
              onChange={(val)=>this.handleChange(val,'nickName')}
            />
            <AtInput
              className='input-profile'
              title='性别'
              type='text'
              placeholder='请输入性别'
              value={user.gender}
              onChange={(val)=>this.handleChange(val,'gender')}
            />
            <AtInput
              className='input-profile'
              border={false}
              title='手机号码'
              type='phone'
              placeholder='手机号码'
              onChange={(val)=>this.handleChange(val,'tel')}
            />
            <AtInput
              className='input-profile'
              clear
              title=''
              type='number'
              maxLength='4'
              placeholder='输入验证码'
              onChange={(val)=>this.handleChange(val,'code')}
            >
              {
                isSend ? <Text className='countdown'>{time}秒后重试</Text>
                : <Text  className='sendcode' onClick={this.onTimeStart}>发送验证码</Text>
              }
            </AtInput>
          </AtModalContent>
          <AtModalAction> 
            <Button onClick={this.sureHandler}>确定</Button> 
            <Button onClick={this.cancelHandler}>取消</Button> 
          </AtModalAction>
        </AtModal>
        <AtMessage />
      </View>
    )
  }
}

export default Login
