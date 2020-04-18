import React, {Component} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Foundation';

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
            padding:5
          }}>
          <TouchableOpacity onPress={() => this.props.openMenu()} style={{marginLeft:10}}>
          <Icon name="indent-more" size={40} color="#fff" />
          </TouchableOpacity>
        </View>
      </>
    );
  }
}
