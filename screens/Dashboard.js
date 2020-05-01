/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {
  CustomText,
  ModuleBG,
  CustomText2,
  ModuleBG2,
  Loader,
} from '../css/Dashboard.css';

import Header from '../components/Header';
import {Col, Grid} from 'react-native-easy-grid';

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
    const {loading} = this.props;
    return (
      <>
        <ImageBackground
          style={{flex: 1}}
          source={require('../static/background2.png')}>
          {loading && (
            <Loader>
              <ActivityIndicator size="large" color="#3875c3" />
            </Loader>
          )}
          <SafeAreaView style={{flex: 1}}>
            <Header title={'Dashboard'} />
            <View style={{flex: 1}}>
              <View
                style={{
                  flex: 1,
                }}>
                <View>
                  <Text
                    style={{
                      fontSize: 25,
                      textAlign: 'center',
                      fontWeight: 'bold',
                      marginTop: 10,
                    }}>
                    Leaves
                  </Text>
                </View>
                <Grid style={{marginTop: 10}}>
                  <Col>
                    <TouchableOpacity>
                      <ModuleBG
                        style={{
                          shadowColor: '#000',
                          shadowOffset: {width: 0, height: 1},
                          shadowOpacity: 0.8,
                          shadowRadius: 2,
                          elevation: 5,

                          borderRadius: 8 / 1,
                          overflow: 'hidden',
                          borderWidth: 1,
                          borderColor: '#ffffff03',
                        }}
                        source={require('../static/balance_bg.png')}>
                        <View>
                          <CustomText fw={900} fs={'40px'}>
                            40
                          </CustomText>
                          <CustomText fs={'18px'} style={{fontWeight: '100'}}>
                            Balance Leaves
                          </CustomText>
                        </View>
                      </ModuleBG>
                    </TouchableOpacity>
                  </Col>
                  <Col>
                    <TouchableOpacity
                      style={{
                        borderRadius: 5,
                      }}>
                      <ModuleBG
                        style={{
                          shadowColor: '#000',
                          shadowOffset: {width: 0, height: 1},
                          shadowOpacity: 0.8,
                          shadowRadius: 2,
                          elevation: 5,

                          borderRadius: 8 / 1,
                          overflow: 'hidden',
                          borderWidth: 1,
                          borderColor: '#ffffff03',
                        }}
                        source={require('../static/Reimbursements_Approval_bg.png')}>
                        <View>
                          <CustomText style={{alignSelf: 'center'}} fs={'40px'}>
                            3
                          </CustomText>
                          <CustomText
                            style={{alignSelf: 'center', fontWeight: '100'}}
                            fs={'17px'}>
                            Pending Approval
                          </CustomText>
                        </View>
                      </ModuleBG>
                    </TouchableOpacity>
                  </Col>
                </Grid>
                <Grid>
                  <Col>
                    <TouchableOpacity
                      style={{
                        borderRadius: 5,
                      }}>
                      <ModuleBG2
                        style={{
                          shadowColor: '#000',
                          shadowOffset: {width: 0, height: 1},
                          shadowOpacity: 0.8,
                          shadowRadius: 2,
                          elevation: 5,

                          borderRadius: 8 / 1,
                          overflow: 'hidden',
                          borderWidth: 1,
                          borderColor: '#ffffff03',
                        }}
                        source={require('../static/balance_bg.png')}>
                        <Grid>
                          <Col>
                            <View>
                              <CustomText
                                style={{
                                  alignSelf: 'center',
                                  marginTop: 4,
                                  fontWeight: '100',
                                }}
                                fs={'17px'}>
                                Approve Leaves
                              </CustomText>
                            </View>
                          </Col>
                          <Col>
                            <View style={{marginTop:-7,}}>
                              <CustomText
                                style={{alignSelf: 'center'}}
                                fs={'30px'}>
                                20
                              </CustomText>
                            </View>
                          </Col>
                        </Grid>
                      </ModuleBG2>
                    </TouchableOpacity>
                  </Col>
                </Grid>
              </View>

              <View
                style={{
                  flex: 1,
                }}>
                <View
                  style={{
                    flex: 1,
                  }}>
                  <View>
                    <Text
                      style={{
                        fontSize: 25,
                        textAlign: 'center',
                        fontWeight: 'bold',
                        marginBottom: 10,
                        marginTop: -70,
                      }}>
                      Expenses
                    </Text>
                  </View>
                  <Grid>
                    <Col>
                      <TouchableOpacity
                        style={{
                          borderRadius: 5,
                          marginTop:-25,
                        }}>
                        <ModuleBG
                          style={{
                            shadowColor: '#000',
                            shadowOffset: {width: 0, height: 1},
                            shadowOpacity: 0.8,
                            shadowRadius: 2,
                            elevation: 5,

                            borderRadius: 8 / 1,
                            overflow: 'hidden',
                            borderWidth: 1,
                            borderColor: '#ffffff03',
                          }}
                          source={require('../static/Markbg.png')}>
                          <View>
                            <CustomText fw={900} fs={'40px'}>
                              3
                            </CustomText>
                            <CustomText fs={'17px'} style={{fontWeight: '100'}}>
                              Pending Approval
                            </CustomText>
                          </View>
                        </ModuleBG>
                      </TouchableOpacity>
                    </Col>
                    <Col>
                      <TouchableOpacity
                        style={{
                          borderRadius: 5,
                          marginTop: -25,
                        }}>
                        <ModuleBG
                          style={{
                            shadowColor: '#000',
                            shadowOffset: {width: 0, height: 1},
                            shadowOpacity: 0.8,
                            shadowRadius: 2,
                            elevation: 5,

                            borderRadius: 8 / 1,
                            overflow: 'hidden',
                            borderWidth: 1,
                            borderColor: '#ffffff03',
                          }}
                          source={require('../static/Tasks_bg.png')}>
                          <View>
                            <CustomText
                              style={{alignSelf: 'center'}}
                              fs={'40px'}>
                              2
                            </CustomText>
                            <CustomText
                              style={{alignSelf: 'center', fontWeight: '100'}}
                              fs={'20px'}>
                              Approval
                            </CustomText>
                          </View>
                        </ModuleBG>
                      </TouchableOpacity>
                    </Col>
                  </Grid>
                </View>
                <View
                  style={{
                    flex: 1,
                  }}>
                  <Grid style={{marginTop:5}}>
                    <Col>
                      <TouchableOpacity
                        style={{
                          borderRadius: 5,
                        }}>
                        <ModuleBG2
                          style={{
                            shadowColor: '#000',
                            shadowOffset: {width: 0, height: 1},
                            shadowOpacity: 0.8,
                            shadowRadius: 2,
                            elevation: 5,

                            borderRadius: 8 / 1,
                            overflow: 'hidden',
                            borderWidth: 1,
                            borderColor: '#ffffff03',
                          }}
                          source={require('../static/balance_bg.png')}>
                          <Grid>
                            <Col>
                              <View>
                                <CustomText
                                  style={{
                                    alignSelf: 'center',
                                    marginTop: 0,
                                    fontWeight: '100',
                                  }}
                                  fs={'17px'}>
                                  Approve Expenses
                                </CustomText>
                              </View>
                            </Col>
                            <Col>
                              <View style={{marginTop:-5,}}>
                                <CustomText
                                  style={{alignSelf: 'center'}}
                                  fs={'30px'}>
                                  20
                                </CustomText>
                              </View>
                            </Col>
                          </Grid>
                        </ModuleBG2>
                      </TouchableOpacity>
                    </Col>
                  </Grid>
                </View>

                <View
                  style={{
                    flex: 1,
               
                  }}>
                  <Grid>
                    <Col>
                      <TouchableOpacity
                        style={{
                          borderRadius: 5,
                          marginTop: -30,
                        }}>
                        <ModuleBG
                          style={{
                            shadowColor: '#000',
                            shadowOffset: {width: 0, height: 1},
                            shadowOpacity: 0.8,
                            shadowRadius: 2,
                            elevation: 5,

                            borderRadius: 8 / 1,
                            overflow: 'hidden',
                            borderWidth: 1,
                            borderColor: '#ffffff03',
                          }}
                          source={require('../static/approval_bg.png')}>
                          <View>
                            <CustomText fw={900} fs={'40px'}>
                              30
                            </CustomText>
                            <CustomText style={{fontWeight: '100'}} fs={'20px'}>
                              Tasks Progress
                            </CustomText>
                          </View>
                        </ModuleBG>
                      </TouchableOpacity>
                    </Col>
                    <Col>
                      <TouchableOpacity
                        style={{
                          borderRadius: 5,
                          marginTop: -30,
                        }}
                        onPress={() =>
                          this.props.navigation.navigate('AttendencePage')
                        }>
                        <ModuleBG
                          style={{
                            shadowColor: '#000',
                            shadowOffset: {width: 0, height: 1},
                            shadowOpacity: 0.8,
                            shadowRadius: 2,
                            elevation: 5,

                            borderRadius: 8 / 1,
                            overflow: 'hidden',
                            borderWidth: 1,
                            borderColor: '#ffffff03',
                          }}
                          source={require('../static/reapppbg.png')}>
                          <View style={{width: '100%', alignSelf: 'center'}}>
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
                    </Col>
                  </Grid>
                </View>
              </View>
            </View>
          </SafeAreaView>
        </ImageBackground>
      </>
    );
  }
}

const mapStateToProps = state => {
  const loading = state.CommonReducer.loading;
  return {loading};
};

export default connect(
  mapStateToProps,
  {},
)(Dashboard);
