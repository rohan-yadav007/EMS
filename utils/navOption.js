import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, SafeAreaView, Image} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import * as Screen from '../screens';
import Login from '../screens/Login';
import Dashboard from '../screens/Dashboard';
import AttendencePage from '../screens/AttendencePage';
import Employee from '../screens/Employee';
import LeaveMaster from '../screens/LeaveMaster';
import Organization from '../screens/Organization';
import Icon from 'react-native-vector-icons/FontAwesome';
const Drawer = createDrawerNavigator();

const arr = [
  {
    a_MenuID: 1,
    t_MenuTitle: 'Organization',
  },
  {
    a_MenuID: 113,
    t_MenuTitle: "Employee",
   
  },
  {
    a_MenuID: 181,
    t_MenuTitle: "Leave Master",
    
  },
];
import {POST} from './responseHelper';
class CustomDrawerContent extends Component {
  constructor(props) {
    super(props);
  }
  renderScreen = async (id, name) => {
    const data = await POST('ApplicationManagement/MenuAccessSetting', {
      ModuleId: id,
    });
    console.log(data);
    this.props.navigation.navigate(name);
  };
  render() {
    return (
      <SafeAreaView>
        <View
          style={{
            width: '100%',
            padding: 10,
            backgroundColor: '#fff',
            alignItems: 'center',
          }}>
          <Image
            // style={{width: '100%', height: 115}}
            source={require('../static/logo_IIRIS.png')}
          />
        </View>

        {arr.map((e, i) => {
          return (
            <TouchableOpacity
              key={i}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                padding: 10,
                borderBottomWidth: 1,
                borderBottomColor: '#fff',
              }}
              onPress={() => this.renderScreen(e.a_MenuID, e.t_MenuTitle)}>
              <Text style={{color: '#fff', lineHeight: 30}}>
                {e.t_MenuTitle}
              </Text>
              
              <Icon name="angle-down" size={27} color="#fff" />
              
            </TouchableOpacity>
          );
        })}
      </SafeAreaView>
    );
  }
}

export default class CustomNavigator extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Login"
          headerMode="screen"
          drawerContent={props => <CustomDrawerContent {...props} />}
          minSwipeDistance={200}
          drawerStyle={{backgroundColor: 'rgb(120, 172, 249)'}}>
          <Drawer.Screen name="Login" component={Login} />
          <Drawer.Screen name="Dashboard" component={Dashboard}/>
          <Drawer.Screen name="AttendencePage" component={AttendencePage} />
          <Drawer.Screen name="Organization" component={Organization} />
          <Drawer.Screen name="Employee" component={Employee} />
          <Drawer.Screen name="Leave Master" component={LeaveMaster} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}
