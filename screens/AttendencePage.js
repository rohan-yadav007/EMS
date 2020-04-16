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

class AttendencePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <SafeAreaView>
          <View>
            <Text>AttendencePage</Text>
          </View>
        </SafeAreaView>
      </>
    );
  }
}

export default AttendencePage;
