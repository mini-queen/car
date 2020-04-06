import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtIcon, AtTabBar } from 'taro-ui'
import { add, minus, asyncAdd } from '../../actions/counter'
import Home from '../home'
import Shop from '../shop'
import Wash from '../wash'
import Me from '../me'
import './index.scss'


@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add () {
    dispatch(add())
  },
  dec () {
    dispatch(minus())
  },
  asyncAdd () {
    dispatch(asyncAdd())
  }
}))

class Index extends Component {
  static defaultProps = {
    textMap : {
      0: '首页',
      1: '商城',
      2: '洗车',
      3: '我的'
    }
  }
  constructor () {
    super(...arguments)
    this.state = {
      current: 0
    }
  }
  handleClick = (current) => {
    Taro.setNavigationBarTitle({
      title: this.props.textMap[current]
    })
    this.setState({
      current
    })
  }

  config = {
    navigationBarTitleText: '首页'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () {

  }

  componentDidHide () { }

  render () {
    const items = [
      { title: '首页', iconType: 'home' },
      { title: '商城', iconType: 'shopping-cart' },
      { title: '洗车', iconType: 'money' },
      { title: '我的', iconType: 'user' }
    ]

    const { current } = this.state
    return (
      <View className='index'>
        {/* <Button className='add_btn' onClick={this.props.add}>+</Button>
        <Button className='dec_btn' onClick={this.props.dec}>-</Button>
        <Button className='dec_btn' onClick={this.props.asyncAdd}>async</Button>
        <View><Text>{this.props.counter.num}</Text></View>
        <View><Text>Hello, World</Text></View>
        <View className='at-icon at-icon-chevron-left'></View> */}

        {current == 0 ? <Home /> : current == 1 ? <Shop /> : current == 2 ? <Wash /> : <Me />}
        <AtTabBar
          fixed
          tabList={items}
          onClick={this.handleClick}
          current={current}
        />
      </View>
    )
  }
}

export default Index
