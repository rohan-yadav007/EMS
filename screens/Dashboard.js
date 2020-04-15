/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, Button, SafeAreaView} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Menu from '../components/Menu';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [{name: 'rohan'}],
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (state.user !== props.route.params.user) {
      return {user: props.route.params.user};
    }
  }
  RenderList = () => {
    const arr = Object.entries(this.state.user);
    return arr.map((e, i) => {
      return (
        <Text key={i}>
          {e[0]} : {e[1]}
        </Text>
      );
    });
  };
  render() {
    return (
      <>
      <SafeAreaView style={{flex:1,flexDirection:'row' ,backgroundColor:'red'}}>
       
        <View style={{flex:1,position:'relative' ,backgroundColor:'yellow'}}>
          <Text style={{color: 'black'}}>Dashboard</Text>
        </View>

        <View style={{position: 'absolute',width:'70%',alignSelf:'stretch'}}>
          <Menu />
        </View>

      </SafeAreaView>
        
      </>
    );
  }
}

export default Dashboard;
