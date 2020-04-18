/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  BackHandler,
  SafeAreaView,
} from 'react-native';
import Header from '../components/Header';

class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [{name: 'rohan'}],
    };
  }

  toggler = () => {
    this.props.navigation.toggleDrawer();
  };
  render() {
    return (
      <>
        <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>
          <Header openMenu={this.props.navigation.openDrawer} />

          <View
            style={{
              flex: 1,
              position: 'relative',
              padding: 20,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#fff',
            }}>
            <Text style={{color: 'black'}}>Employee</Text>
          </View>
        </SafeAreaView>
      </>
    );
  }
}

export default Employee;
