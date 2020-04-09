import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { AtIcon, AtButton } from 'taro-ui'
import sections from './config'
import './index.scss'

class Profile extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      text: '个人资料'
    }
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

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    
    const { text } = this.state
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
                        src={item.imgUrl || 'https://www.fendi.cn/dist/img/loading_bg.3d417d5d.jpg'}
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
