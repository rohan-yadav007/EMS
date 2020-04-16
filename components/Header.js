import React, {Component} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';

export default class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <View
          style={{
            borderBottomWidth: 1,
            backgroundColor: 'rgb(120, 172, 249)',
            borderBottomColor: '#53a8bf',
          }}>
          <TouchableOpacity onPress={() => this.props.openMenu()}>
            <Image source={require('../static/hamburger.png')} />
          </TouchableOpacity>
        </View>
      </>
    );
  }
}
