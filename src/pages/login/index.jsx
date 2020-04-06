import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'

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
        <Text>{text}</Text>
        <Button onClick={this.goBack}>返回</Button>
      </View>
    )
  }
}

export default Login
