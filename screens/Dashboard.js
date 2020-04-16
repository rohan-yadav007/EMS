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

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [{name: 'rohan'}],
    };
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      return true, BackHandler.exitApp();
    });
  }
  toggler = () => {
    this.props.navigation.toggleDrawer();
  };
  render() {
    return (
      <>
        <SafeAreaView
          style={{flex: 1, flexDirection: 'row', backgroundColor: 'red'}}>
          <View
            style={{flex: 1, position: 'relative', backgroundColor: 'yellow'}}>
            <TouchableOpacity onPress={this.toggler}>
              <Text style={{color: 'black'}}>Dashboard</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </>
    );
  }
}

export default Dashboard;
