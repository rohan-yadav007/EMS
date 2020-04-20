/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  ImageBackground,
  TouchableOpacity,
  BackHandler,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {BalanceLeaves, Module, CustomText, Module2} from '../css/Dashboard.css';

import Header from '../components/Header';

class Dashboard extends Component {
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
        <ImageBackground
          style={{flex: 1}}
          source={require('../static/background2.png')}>
          <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>
            <Header openMenu={this.props.navigation.openDrawer} />
            <View style={{flex: 1, flexDirection: 'column'}}>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  marginTop: '12%',
                  justifyContent: 'space-evenly',
                }}>
                <View>
                  <ImageBackground
                    source={require('../static/balance_bg.png')}
                    style={{
                      flex: 1,
                      height: 123,
                      width: 180,
                      padding: 15,
                      borderRadius: 10,
                      borderRadius: 30,
                    }}>
                    <View style={{width: '100%'}}>
                      <CustomText style={{alignSelf: 'center'}} fs={'40px'}>
                        40
                      </CustomText>
                      <CustomText style={{alignSelf: 'center'}} fs={'20px'}>
                        Balance Leaves
                      </CustomText>
                      {/* <Module2>
                          <Text>Balance Leaves</Text>
                        </Module2> */}
                    </View>
                  </ImageBackground>
                </View>
                <View>
                  <ImageBackground
                    source={require('../static/reapppbg.png')}
                    style={{
                      flex: 1,
                      height: 123,
                      width: 180,
                      padding: 15,
                      borderRadius: 10,
                      borderRadius: 30,
                    }}>
                    <View style={{width: '100%'}}>
                      <CustomText style={{alignSelf: 'center'}} fs={'40px'}>
                        40
                      </CustomText>
                      <CustomText style={{alignSelf: 'center'}} fs={'20px'}>
                        Balance Leaves
                      </CustomText>
                      {/* <Module2>
                       <Text>Balance Leaves</Text>
                     </Module2> */}
                    </View>
                  </ImageBackground>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  flex: 3,
                  backgroundColor: 'yellow',
                  justifyContent: 'space-around',
                }}>
                <View>
                  <Text>First333</Text>
                </View>
                <View>
                  <Text>scecond333</Text>
                </View>
              </View>
            </View>

            {/*
            <View style={{ flex: 1 }}>
              <View style={{ flex: 1 }}>
                <View>
                  <BalanceLeaves>
                    <View>
                      <ImageBackground
                        source={require('../static/balance_bg.png')}
                        style={{ width: '100%' }}>
                        <Text>xjshjs</Text>
                      </ImageBackground>
                    </View>
                    <View>
                      <ImageBackground
                        source={require('../static/balance_bg.png')}
                        style={{ width: '100%' }}>
                        <Text>xjshjs</Text>
                      </ImageBackground>
                    </View>
                  </BalanceLeaves>
                </View>
                <View>
                  <Text />
                </View>
              </View>
            </View> */}
          </SafeAreaView>
        </ImageBackground>
      </>
    );
  }
}

export default Dashboard;
