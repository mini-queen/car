import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'

import './index.scss'

class Me extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      text: '我的'
    }
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
      <View className='me'>
        <Text>{text}</Text>
      </View>
    )
  }
}

export default Me
