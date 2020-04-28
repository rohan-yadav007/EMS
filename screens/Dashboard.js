/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
  View,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import {
  CustomText,
  ModuleBG,
  CustomText2,
  Loader
} from '../css/Dashboard.css';

import Header from '../components/Header';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [{ name: 'rohan' }],
    };
  }

  toggler = () => {
    this.props.navigation.toggleDrawer();
  };
  render() {
    const {loading} = this.props;
    return (
      <>
        <ImageBackground
          style={{ flex: 1 }}
          source={require('../static/background2.png')}>
          {loading && <Loader >
            <ActivityIndicator size="large" color="#3875c3" />
          </Loader>}
          <SafeAreaView style={{ flex: 1, flexDirection: 'column' }}>
            <Header title={'Dashboard'} />
            <View style={{ flex: 1, flexDirection: 'column' }}>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'space-evenly',
                }}>
                <TouchableOpacity style={{ height: 123, alignSelf: 'center' }}>
                  <ModuleBG source={require('../static/balance_bg.png')}>
                    <View style={{ width: '100%' }}>
                      <CustomText fw={900} fs={'40px'}>
                        40
                      </CustomText>
                      <CustomText fs={'18px'}>Balance Leaves</CustomText>
                    </View>
                  </ModuleBG>
                </TouchableOpacity>

                <TouchableOpacity style={{ height: 123, alignSelf: 'center' }}>
                  <ModuleBG
                    source={require('../static/Reimbursements_Approval_bg.png')}>
                    <View style={{ width: '100%' }}>
                      <CustomText style={{ alignSelf: 'center' }} fs={'40px'}>
                        3
                      </CustomText>
                      <CustomText style={{ alignSelf: 'center' }} fs={'18px'}>
                        Pending Approval
                      </CustomText>
                    </View>
                  </ModuleBG>
                </TouchableOpacity>

              </View>

              <View
                style={{
                  flexDirection: 'column',
                  flex: 2,
                  justifyContent: 'space-around',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    marginTop: -160,
                    justifyContent: 'space-around',
                  }}>
                  <TouchableOpacity style={{ height: 123, alignSelf: 'center' }}>
                    <ModuleBG source={require('../static/Markbg.png')}>
                      <View style={{ width: '100%' }}>
                        <CustomText fw={900} fs={'40px'}>
                          3
                        </CustomText>
                        <CustomText fs={'18px'}>Pending Approval</CustomText>
                      </View>
                    </ModuleBG>
                  </TouchableOpacity>

                  <TouchableOpacity style={{ height: 123, alignSelf: 'center' }}>
                    <ModuleBG source={require('../static/Tasks_bg.png')}>
                      <View style={{ width: '100%' }}>
                        <CustomText style={{ alignSelf: 'center' }} fs={'40px'}>
                          2
                        </CustomText>
                        <CustomText style={{ alignSelf: 'center' }} fs={'20px'}>
                          Approval
                        </CustomText>
                      </View>
                    </ModuleBG>
                  </TouchableOpacity>

                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    marginTop: -250,
                    justifyContent: 'space-around',
                  }}>
                  <TouchableOpacity style={{ height: 123, alignSelf: 'center' }}>
                    <ModuleBG source={require('../static/approval_bg.png')}>
                      <View style={{ width: '100%' }}>
                        <CustomText fw={900} fs={'40px'}>
                          30
                        </CustomText>
                        <CustomText fs={'20px'}>Tasks Progress</CustomText>
                      </View>
                    </ModuleBG>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ height: 123, alignSelf: 'center' }}
                    onPress={() =>
                      this.props.navigation.navigate('AttendencePage')
                    }>
                    <ModuleBG source={require('../static/reapppbg.png')}>
                      <View style={{ width: '100%', alignSelf: 'center' }}>
                        <CustomText2
                          style={{
                            alignSelf: 'center',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                          }}>
                          Mark Attendance
                        </CustomText2>
                      </View>
                    </ModuleBG>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </SafeAreaView>
        </ImageBackground>
      </>
    );
  }
}


const mapStateToProps = (state) => {
  const loading = state.CommonReducer.loading;
  return { loading };
};

export default connect(mapStateToProps, {})(Dashboard);