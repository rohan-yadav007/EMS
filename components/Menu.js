/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Menubackground, Menuleft} from '../css/Menu.css';
import {removeItem} from '../utils/AsyncStorage';

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  Logout = async () => {
    await removeItem('LoggedIn');
    this.props.navigation.navigate('Login', {name: 'Login', mounted: true});
  };
  render() {
    return (
      <Menubackground style={styles.body}>
        <Menuleft>
          <View>
            <Text>Home Page1</Text>
          </View>
          <View>
            <Text>Home Page2</Text>
          </View>
          <View>
            <Text>Home Page3</Text>
          </View>
          <View>
            <TouchableOpacity
              style={{height: 30, backgroundColor: 'red'}}
              onPress={() => this.Logout()}>
              <Text>Logout</Text>
            </TouchableOpacity>
          </View>
        </Menuleft>
      </Menubackground>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'red',
    maxWidth: 300,
  },
});
