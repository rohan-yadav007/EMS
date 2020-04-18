import 'react-native-gesture-handler';
import React, {Component} from 'react';
// eslint-disable-next-line prettier/prettier
import { View, ScrollView, Text, TouchableOpacity, SafeAreaView, Image, StyleSheet} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import Login from '../screens/Login';
import Dashboard from '../screens/Dashboard';
import AttendencePage from '../screens/AttendencePage';
import Employee from '../screens/Employee';
import LeaveMaster from '../screens/LeaveMaster';
import Organization from '../screens/Organization';
import Icon from 'react-native-vector-icons/FontAwesome';
import {GET} from './responseHelper';
import {getData} from './AsyncStorage';
const Drawer = createDrawerNavigator();

class CustomDrawerContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Menu: [],
      subMenu: [],
    };
  }
  async componentDidMount() {
    const n_Employee = await getData('UserId');
    const data = await GET(
      `CorporateRecruitment/ApplicationManagement/GetParrentDetails?n_EmployeeId=${n_Employee}`,
    );
    if (data) {
      // eslint-disable-next-line react/no-did-mount-set-state
      await this.setState({Menu: data});
      return this.state.Menu;
    }
  }

  // Function to get sub Menu List
  getSubMenu = async id => {
    if (this.state.subMenu.length !== 0) {
      this.setState({subMenu: []});
    } else {
      const n_Employee = await getData('UserId');
      const data = await GET(
        `CorporateRecruitment/ApplicationManagement/GetMenuDetails?n_ModuleId=${id}&n_EmployeeId=${n_Employee}`,
      );
      await this.setState({subMenu: data});
    }
  };

  // Function to handle navigation to submenu screen
  handleSubMenuNavigation = name => {
    alert('this will navigate to the pressed screen');
    // this.props.navigation.navigate(name);
  };
  render() {
    return (
      <SafeAreaView>
        <View style={styles.MainMenuWraper}>
          <Image source={require('../static/logo_IIRIS.png')} />
        </View>
        <ScrollView>
          {this.state.Menu.map((e, i) => {
            return (
              <View style={{flexDirection: 'column'}} key={i + 1}>
                <TouchableOpacity
                  style={styles.MainMenu}
                  onPress={() => this.getSubMenu(e.a_MenuID)}>
                  <Text key={e.a_MenuID} style={styles.MainMenuText}>
                    {e.t_MenuTitle}
                  </Text>

                  <Icon name="angle-down" size={27} color="#fff" />
                </TouchableOpacity>

                <View style={{backgroundColor: '#fff'}}>
                  {this.state.subMenu.map((evt, item) => {
                    if (e.a_MenuID === evt.n_ModuleID) {
                      return (
                        <Text
                          style={styles.subMenuText}
                          key={evt.a_MenuID}
                          onPress={() =>
                            this.handleSubMenuNavigation(evt.t_MenuTitle)
                          }>
                          {evt.t_MenuTitle}
                        </Text>
                      );
                    }
                  })}
                </View>
              </View>
            );
          })}
        </ScrollView>
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
          minSwipeDistance={100}
          drawerStyle={styles.drawerStyle}>
          <Drawer.Screen name="Login" component={Login} />
          <Drawer.Screen name="Dashboard" component={Dashboard} />
          <Drawer.Screen name="AttendencePage" component={AttendencePage} />
          <Drawer.Screen name="Organization" component={Organization} />
          <Drawer.Screen name="Employee" component={Employee} />
          <Drawer.Screen name="Leave Master" component={LeaveMaster} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  MainMenuWraper: {
    width: '100%',
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'rgb(120, 172, 249)',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  MainMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  drawerStyle: {
    backgroundColor: 'rgb(120, 172, 249)',
  },
  subMenuText: {
    padding: 7,
    marginLeft: 4,
  },
  MainMenuText: {
    color: '#fff',
    lineHeight: 30,
  },
});
