import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'

import './index.scss'

class Shop extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      text: '商城'
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
      <View className='shop'>
        <Text>{text}</Text>
      </View>
    )
  }
}

export default Shop
