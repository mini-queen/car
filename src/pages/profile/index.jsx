import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtIcon, AtButton } from 'taro-ui'
import sections from './config'
import './index.scss'

@connect(state=>state.user)

class Profile extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      text: '个人资料'
    }
  }
  genderMap = {
    0: '女',
    1: '男'
  }
  logout = () => {
    console.log('登出')
  }

  config = {
    navigationBarTitleText: '个人资料'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { 
    
  }

  componentDidShow () {

  }

  componentDidHide () { }

  render () {
    
    const { userInfo } = this.props
    sections.forEach(item => {
      if( item.key === 'avatar') {
        item.imgUrl = userInfo.avatarUrl || item.imgUrl 
      }
      if(item.key === 'name') {
        item.info = userInfo.nickName || item.info
      }
      if(item.key === 'gender') {
        item.info = this.genderMap[userInfo.gender] || item.info
      }
      if(item.key === 'tel') {
        item.info = userInfo.tel || item.info
      }
    })
    return (
      <View className='profile'>
        <View className='sections'>
          {
            sections.map(item=> {
              return (
                <View className='section' key={item.id}>
                  <Text className='tip'>{item.text}</Text>
                  <View className='right-info'>
                    {
                      item.isImg && 
                      <Image className='avatar'
                        src={item.imgUrl}
                      />
                    }
                    {
                      !item.isImg && 
                      <Text className={['text',item.isArrow ? 'right':'']}>{item.info}</Text>
                    }
                    {
                      item.isArrow && 
                      <AtIcon value='chevron-right' size='16' color='#787878'></AtIcon>
                    }
                  </View>
                </View>
              )
            })
          }
        </View>
        <AtButton className='btn-logout' type='primary' onClick={this.logout}>退出登录</AtButton>
      </View>
    )
  }
}

export default Profile
