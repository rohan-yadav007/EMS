import React, {Component} from 'react';
import {View, Text, FlatList, Button, SafeAreaView} from 'react-native';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (state.user !== props.route.params.user) {
      return {user: props.route.params.user};
    }
  }
  render() {
    return (
      <>
        <SafeAreaView>
          <Button
            style={{color: 'red'}}
            title="Go to Login"
            onPress={() =>
              this.props.navigation.navigate('Login', {name: 'Login'})
            }
          />
          <View style={{flex: 1}}>
            <Text style={{color: 'black'}}>Dashboard</Text>
          </View>
        </SafeAreaView>
      </>
    );
  }
}

export default Dashboard;
