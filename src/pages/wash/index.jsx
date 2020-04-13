import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image, Block } from '@tarojs/components'
import list from './config'
import './index.scss'
import imgUrl from '../../../static/img/c1.jpg'
class Wash extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      text: '洗车'
    }
  }

  buyHandler = () => {
    console.log('购买')
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
      <View className='wash'>
        <View className='car-items'>
          {
            list.map(item => {
              return (
                <View className='car-item' key={item.id}>
                  <View className='car-item_top'>
                    <Image className='avatar'
                      src={imgUrl}
                    />
                    <View className='car-info'>
                      <View className='car-title'>
                        {item.title}
                      </View>
                      <View className='info-mid'>
                        <View  className='mid-left'>
                          <View  className='star'>
                            总评分
                            <Text className='text'>{item.star}</Text>
                          </View>
                          <View  className='count'>
                            总单量
                            <Text className='text'>{item.count}</Text>
                          </View>
                        </View>
                        <View className='tag'>快修店</View>
                      </View>
                      <View className='car-addr'>
                        <Text className='addr'>{item.addr}</Text>
                        <Text className='distance'>{item.distance}km</Text>
                      </View>
                    </View>
                  </View>
                  <View className='car-item_bottom'>
                    <View className='bottom-left'>
                      <View className='bottom-tip'>
                        标准洗车
                      </View>
                      <View className='bottom-sale'>
                        已售
                        <Text className='sale'>{item.sale}</Text>
                      </View>
                    </View>
                    <View className='bottom-right'>
                      <View className='right-price'>
                        <View className='origin-price'>
                            ¥{item.originPrice}
                        </View>
                        <View className='cut-price'>
                            ¥{item.cutPrice}
                        </View>
                      </View>
                      <View className='buy' onClick={this.buyHandler}>
                          购买
                      </View>
                  </View>
                </View>
              </View>
              )
            })
          }
        </View>
      </View>
    )
  }
}

export default Wash
