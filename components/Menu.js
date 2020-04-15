/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Menubackground, Menuleft} from '../css/Menu.css';

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

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

            <Text>Home Page4</Text>

          </View>
        </Menuleft>
      </Menubackground>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'red',
  },
});
