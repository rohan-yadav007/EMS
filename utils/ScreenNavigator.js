import 'react-native-gesture-handler';
import React, {Component} from 'react';
// eslint-disable-next-line prettier/prettier
import { View, ScrollView, Text, TouchableOpacity, SafeAreaView, Image, StyleSheet } from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import Login from '../screens/Login';
import Dashboard from '../screens/Dashboard';
import AttendencePage from '../screens/AttendencePage';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Entypo';
import {GET} from './responseHelper';
import {getData} from './AsyncStorage';
import {loginStatus} from '../redux/Action/login.action';
import {connect} from 'react-redux';
import CreateTask from '../screens/CreateTask';
import ProjectList from '../screens/Projects';
import ViewProjects from '../screens/ViewProjects';
import TaskList from '../screens/TaskList';
import ApplyLeave from '../screens/ApplyLeave';

const Drawer = createDrawerNavigator();

class CustomDrawerContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Menu: [],
      subMenu: [],
      isLoggedIn: false,
      drawerData: {},
    };
  }
  getMenu = async () => {
    const n_Employee = await getData('UserId');
    try {
      const data = await GET(
        `CorporateRecruitment/ApplicationManagement/GetParrentDetails?n_EmployeeId=${n_Employee}`,
      );
      if (data) {
        // eslint-disable-next-line react/no-did-mount-set-state
        await this.setState({Menu: data});
      }
    } catch (error) {
      // console.log(error);
    }
  };
  static getDerivedStateFromProps(props, state) {
    if (props.isLoggedIn !== state.isLoggedIn) {
      return {
        isLoggedIn: props.isLoggedIn,
        drawerData: props.drawerData,
      };
    }
    return null;
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
      //  console.log("gh",data)
      await this.setState({subMenu: data});
    }
  };

  // Function to handle navigation to submenu screen
  handleSubMenuNavigation = name => {
    let SubMenuName = name.split(' ').join('');
    this.props.navigation.navigate(`${SubMenuName}`);
  };

  render() {
    if (this.props.isLoggedIn) {
      this.getMenu();
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
    } else {
      return (
        <SafeAreaView style={{flex: 1}}>
          <View style={styles.LoginMenuWraper}>
            <View style={styles.Emoji}>
              <Icon2 name="emoji-sad" size={27} color="#000" />
            </View>

            <Text style={styles.LoginInstruction}>You are not logged in!</Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Login')}
              style={styles.LoginButton}>
              <View>
                <Text style={styles.LoginButtonText}>Login</Text>
              </View>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      );
    }
  }
}

connect(mapStateToProps)(CustomDrawerContent);

class CustomNavigator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: this.props.isLoggedIn,
      drawerData: this.props.userData,
    };
  }
  async componentDidMount() {
    await this.props.loginStatus();
    await this.setState({isLoggedIn: this.props.isLoggedIn});
  }
  static getDerivedStateFromProps(props, state) {
    if (props.isLoggedIn !== state.isLoggedIn) {
      return {
        isLoggedIn: props.isLoggedIn,
        drawerData: props.userData,
      };
    }
    return null;
  }

  render() {
    return (
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Dashboard"
          headerMode="screen"
          // drawerContent={props => (
          //   <CustomDrawerContent
          //     {...props}
          //     drawerData={this.state.drawerData}
          //     isLoggedIn={this.state.isLoggedIn}
          //   />
          // )}
          minSwipeDistance={100}
          drawerStyle={styles.drawerStyle}>
          {this.state.isLoggedIn === true ? (
            <>
              <Drawer.Screen name="Dashboard" component={Dashboard} />
              <Drawer.Screen name="AttendencePage" component={AttendencePage} />
              <Drawer.Screen name="CreateTask" component={CreateTask} />
              <Drawer.Screen name="Projects" component={ProjectList} />
              <Drawer.Screen name="ViewProjects" component={ViewProjects} />
              <Drawer.Screen name="TaskList" component={TaskList} />
              <Drawer.Screen name="ApplyLeave" component={ApplyLeave} />
            </>
          ) : (
            <>
              <Drawer.Screen name="Login" component={Login} />
            </>
          )}
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}
const mapStateToProps = state => {
  const isLoggedIn = state.LoginReducer.login;
  const userData = state.LoginReducer.userData;
  return {isLoggedIn, userData};
};
export default connect(
  mapStateToProps,
  {loginStatus},
)(CustomNavigator);

const styles = StyleSheet.create({
  MainMenuWraper: {
    width: '100%',
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'rgb(120, 172, 249)',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  LoginButton: {
    backgroundColor: '#3875c3',
    padding: 10,
    borderRadius: 20,
  },
  LoginButtonText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
  },
  LoginInstruction: {
    alignSelf: 'center',
    padding: 5,
  },
  Emoji: {
    alignSelf: 'center',
  },
  LoginMenuWraper: {
    flex: 1,
    width: '70%',
    justifyContent: 'center',
    alignSelf: 'center',
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
    backgroundColor: '#3875c3',
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
