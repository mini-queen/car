import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'

import './index.scss'

class Home extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      text: '首页'
    }
  }
  goLogin = () => {
    Taro.navigateTo({
      url: '/pages/login/index'
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
    return (
      <View className='home'>
        <Text>{text}</Text>
        <Button onClick={this.goLogin}>去登录</Button>
      </View>
    )
  }
}

export default Home
