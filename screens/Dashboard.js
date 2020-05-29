/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import {
  CustomText,
  ModuleBG,
  CustomText2,
  ModuleBG2,
  Loader,
} from '../css/Dashboard.css';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Header from '../components/Header';
import { Col, Grid } from 'react-native-easy-grid';
import {getPendingLeave,getApprovedLeave} from '../redux/Action/Leave.action';
import {getData} from '../utils/AsyncStorage'

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [{ name: 'rohan' }],
    };
  }
async componentDidMount(){
  const UserInfo = JSON.parse(await getData('UserInfo'));
  console.log(UserInfo)
}
  toggler = () => {
    this.props.navigation.toggleDrawer();
  };
  render() {
    const { loading } = this.props;
    
    return (
      <>
        <ImageBackground
          style={{ flex: 1 }}
          source={require('../static/background2.png')}>
          
          <SafeAreaView style={{ flex: 1 }}>
            <Header title={'Dashboard'} />
            <View style={{ flex: 1 }}>
              <View style={{flex: 1,}}>
                <View>
                  <Text
                    style={{
                      fontSize: 25,
                      textAlign: 'center',
                      marginTop: 10,
                      fontFamily:'RobotoSlab-Bold'
                    }}>
                    Leaves
                  </Text>
                </View>
                <Grid style={{ marginTop: 10 }}>
                  <Col>
                    <TouchableOpacity
                      activeOpacity={0.6}
                      style={{
                        borderRadius: 5,
                        marginLeft: 5,
                        marginRight: 5,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.8,
                        shadowRadius: 2,
                        elevation: 5,
                      }}
                    >
                      <ModuleBG

                        source={require('../static/balance_bg.png')}>
                        <View>
                          <CustomText fw={900} fs={'35px'}>
                            40
                          </CustomText>
                          <CustomText fs={'15px'}>
                            Balance Leaves
                          </CustomText>
                        </View>
                      </ModuleBG>
                    </TouchableOpacity>
                  </Col>
                  <Col>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={{
                        borderRadius: 5,
                        marginLeft: 5,
                        marginRight: 5,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.8,
                        shadowRadius: 2,
                        elevation: 5,
                      }}>
                      <ModuleBG

                        source={require('../static/Reimbursements_Approval_bg.png')}>
                        <View>
                          <CustomText style={{ alignSelf: 'center' }} fs={'35px'}>
                            3
                          </CustomText>
                          <CustomText fs={'15px'}>
                            Pending for Approval
                          </CustomText>
                        </View>
                      </ModuleBG>
                    </TouchableOpacity>
                  </Col>
                </Grid>
                <Grid>
                  <Col>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={{
                        borderRadius: 5,
                        margin: 5,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.8,
                        shadowRadius: 2,
                        elevation: 5,
                      }}>
                      <ModuleBG2

                        source={require('../static/balance_bg.png')}>
                        <Grid>
                          <Col>
                            <View>
                              <CustomText
                               
                                fs={'15px'}>
                                Approve Leaves
                              </CustomText>
                            </View>
                          </Col>
                          <Col>
                            <View style={{ marginTop: -10, }}>
                              <CustomText
                                style={{ alignSelf: 'center' }}
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
                       
                        marginBottom: 10,
                        marginTop: -70,
                        fontFamily:'RobotoSlab-Bold'
                      }}>
                      Expenses
                    </Text>
                  </View>
                  <Grid>
                    <Col>
                      <TouchableOpacity
                        activeOpacity={0.6}
                        style={{
                          borderRadius: 5,
                          marginTop: -25,
                          marginLeft: 5,
                          marginRight: 5,
                          shadowColor: '#000',
                          shadowOffset: { width: 0, height: 1 },
                          shadowOpacity: 0.8,
                          shadowRadius: 2,
                          elevation: 5,
                        }}>
                        <ModuleBG

                          source={require('../static/Markbg.png')}>
                          <View>
                            <CustomText fw={900} fs={'35px'}>
                              3
                            </CustomText>
                            <CustomText fs={'15px'}>
                              Pending for Approval
                            </CustomText>
                          </View>
                        </ModuleBG>
                      </TouchableOpacity>
                    </Col>
                    <Col>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        style={{
                          borderRadius: 5,
                          marginTop: -25,
                          marginLeft: 5,
                          marginRight: 5,
                          shadowColor: '#000',
                          shadowOffset: { width: 0, height: 1 },
                          shadowOpacity: 0.8,
                          shadowRadius: 2,
                          elevation: 5,
                        }}>
                        <ModuleBG

                          source={require('../static/Tasks_bg.png')}>
                          <View>
                            <CustomText fs={'35px'}>
                              2
                            </CustomText>
                            <CustomText fs={'15px'}>
                              Approved
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
                  <Grid style={{ marginTop: 5 }}>
                    <Col>
                      <TouchableOpacity
                        activeOpacity={0.6}
                        style={{
                          borderRadius: 5,
                          marginLeft: 5,
                          marginRight: 5,
                          shadowColor: '#000',
                          shadowOffset: { width: 0, height: 1 },
                          shadowOpacity: 0.8,
                          shadowRadius: 2,
                          elevation: 5,
                        }}>
                        <ModuleBG2
                          source={require('../static/balance_bg.png')}>
                          <Grid>
                            <Col>
                              <View >
                                <CustomText
                                  fs={'15px'}
                                 
                                >
                                  Approve Expenses
                                </CustomText>
                              </View>
                            </Col>
                            <Col>
                              <View style={{ marginTop: -10, }}>
                                <CustomText

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
                        activeOpacity={0.6}
                        style={{
                          borderRadius: 5,
                          marginLeft: 5,
                          marginRight: 5,
                          marginTop: -30,
                          shadowColor: '#000',
                          shadowOffset: { width: 0, height: 1 },
                          shadowOpacity: 0.8,
                          shadowRadius: 2,
                          elevation: 5,
                        }}>
                        <ModuleBG source={require('../static/approval_bg.png')}>
                          <View>
                            <CustomText fw={900} fs={'35px'}>
                              30
                            </CustomText>
                            <CustomText fs={'15px'}>
                              Tasks in Progress
                            </CustomText>
                          </View>
                        </ModuleBG>
                      </TouchableOpacity>
                    </Col>
                    <Col>
                      <TouchableOpacity
                        activeOpacity={0.6}
                        style={{
                          borderRadius: 5,
                          marginLeft: 5,
                          marginRight: 5,
                          marginTop: -30,
                          shadowColor: '#000',
                          shadowOffset: { width: 0, height: 1 },
                          shadowOpacity: 0.8,
                          shadowRadius: 2,
                          elevation: 5,
                        }}
                        onPress={() =>
                          this.props.navigation.navigate('AttendencePage')
                        }>
                        <ModuleBG source={require('../static/reapppbg.png')}>
                          <View style={{ width: '100%', alignSelf: 'center' }}>
                            <Icon style={{ padding: 11, alignSelf: 'center' }} name="fingerprint" size={30} color="#fff" />
                            <CustomText fs="15px">
                              Mark Attendance
                          </CustomText>
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
  return { loading };
};

export default connect(
  mapStateToProps,
  {getPendingLeave,getApprovedLeave},
)(Dashboard);
