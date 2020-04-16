//

import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import Dashboard from './screens/Dashboard';
import Login from './screens/Login';
import AttendencePage from './screens/AttendencePage';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Drawer.Navigator initialRouteName="Login">
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Dashboard" component={Dashboard} />
        <Drawer.Screen name="AttendencePage" component={AttendencePage} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const MyTheme = {
  dark: false,
  colors: {
    primary: 'rgb(255, 255, 255)',
    background: 'rgb(255, 255, 255)',
    card: 'rgb(120, 172, 249)',
    text: 'rgb(255, 255, 255)',
    border: 'rgb(199, 199, 204)',
  },
};
// import React, {Component} from 'react';
// // import {View, Text, StyleSheet, Button} from 'react-native';
// // import Icon from 'react-native-vector-icons/Ionicons';

// // import {
// //   createSwitchNavigator,
// //   createAppContainer,
// //   createDrawerNavigator,
// // } from 'react-navigation';
// // import {createStackNavigator} from '@react-navigation/stack';
// // export default class App extends Component {
// //   render() {
// //     return <AppContainer />;
// //   }
// // }

// // class WelcomeScreen extends Component {
// //   static navigationOptions = {
// //     title: 'Welcome',
// //   };
// //   render() {
// //     return (
// //       <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
// //         <Text>WelcomeScreen</Text>
// //         <Button
// //           title="Go to DashboardScreen"
// //           onPress={() => this.props.navigation.navigate('Dashboard')}
// //         />
// //       </View>
// //     );
// //   }
// // }

// // class DashboardScreen extends Component {
// //   static navigationOptions = {
// //     title: 'Dashboard',
// //   };

// //   render() {
// //     return (
// //       <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
// //         <Text>DashboardScreen</Text>
// //       </View>
// //     );
// //   }
// // }
// // const DashboardStackNavigator = createStackNavigator(
// //   {
// //     DashboardNavigator: DashboardScreen,
// //   },
// //   {
// //     defaultNavigationOptions: ({navigation}) => {
// //       return {
// //         headerLeft: (
// //           <Icon
// //             style={{paddingLeft: 10}}
// //             onPress={() => navigation.openDrawer()}
// //             name="md-menu"
// //             size={30}
// //           />
// //         ),
// //       };
// //     },
// //   },
// // );

// // const WelcomeStackNavigator = createStackNavigator(
// //   {
// //     WelcomeNavigator: WelcomeScreen,
// //   },
// //   {
// //     defaultNavigationOptions: ({navigation}) => {
// //       return {
// //         headerLeft: (
// //           <Icon
// //             style={{paddingLeft: 10}}
// //             onPress={() => navigation.openDrawer()}
// //             name="md-menu"
// //             size={30}
// //           />
// //         ),
// //       };
// //     },
// //   },
// // );
// // const AppDrawerNavigator = createDrawerNavigator({
// //   Dashboard: {
// //     screen: DashboardStackNavigator,
// //   },
// //   Welcome: {
// //     screen: WelcomeStackNavigator,
// //   },
// // });

// // const AppSwitchNavigator = createSwitchNavigator({
// //   Dashboard: {screen: AppDrawerNavigator},
// //   Welcome: {screen: WelcomeScreen},
// // });

// // const AppContainer = createAppContainer(AppSwitchNavigator);

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// // });

// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow strict-local
//  */

// import 'react-native-gesture-handler';
// import * as React from 'react';
// import Login from './screens/Login';
// import Dashboard from './screens/Dashboard';
// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';

// const Stack = createStackNavigator();

// const App = () => {
//   return (
//     <>
//       <NavigationContainer>
//         <Stack.Navigator screenOptions={{headerShown: false}}>
//           <Stack.Screen
//             name="Login"
//             component={Login}
//             options={{title: 'Login'}}
//           />
//           <Stack.Screen
//             name="Dashboard"
//             component={Dashboard}
//             options={{title: 'Dashboard'}}
//           />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </>
//   );
// };

// export default App;
