import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text, Block } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtIcon } from 'taro-ui'
import './index.scss'
@connect(state=>state.user)

class Me extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      text: '我的'
    }
  }

  goProfile = () => {
    Taro.navigateTo({
      url: '/pages/profile/index'
    })
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const { text } = this.state
    const { userInfo } = this.props 
    let navs = [
      {text: '待支付',id:'1'},
      {text: '待收货',id:'2'},
      {text: '待评价',id:'3'},
      {text: '待退货',id:'4'}
    ]
    let banners = [
      {
        id: '1',
        text: '账户余额',
        val: 0,
        unit: '元'
      },
      {
        id: '2',
        text: '优惠卡券',
        val: 1,
        unit: '张'
      }
    ]
    return (
      <View className='me'>
        <View className='me-top'>
          <View className='user-info' onClick={this.goProfile}>
            <Image className='avatar'
              src={userInfo.avatarUrl || 'https://www.fendi.cn/dist/img/loading_bg.3d417d5d.jpg'}
            />
            <Text className='name'>{userInfo.nickName || '轮轮'}</Text>
            <AtIcon value='chevron-right' size='20' color='#fff'></AtIcon>
          </View>
        </View>
        <View className='me-middle'>
          <View className='banners'>
            {
              banners.map((item,index)=> {
                return (
                  <Block>
                    <View className='banner' key={item.id}>
                      <View className='banner-top'>
                        <Text className='banner-val'>{item.val}</Text>
                        <Text className='banner-unit'>{item.unit}</Text>
                      </View>
                      <Text className='banner-tip'>{item.text}</Text>
                    </View>
                    {(index+1 == banners.length) ?null:<View className='line'></View>}
                  </Block>
                )
              })
            }
          </View>
        </View>
        <View className='me-bottom'> 
          {
            navs.map((item)=> {
              return (
                <View className='nav' key={item.id}>
                  <View className='nav-left'>
                    <AtIcon value='shopping-bag' size='20' color='#ccc'></AtIcon>
                    <Text className='text'>{item.text}</Text>
                  </View>
                  <AtIcon value='chevron-right' size='20' color='#787878'></AtIcon>
                </View>
              )
            })
          }
          
        </View>
      </View>
    )
  }
}

export default Me
