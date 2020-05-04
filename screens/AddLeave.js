/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  TextInput,
  ScrollView,
} from 'react-native';
// import {SearchBar} from 'react-native-elements';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/Feather';
import {Col, Grid} from 'react-native-easy-grid';
import {
  Srnumber,
  Tasklist1,
  Taskboder,
  Buttontext,
  ButtonMedium,
  AddTask,
  AddTaskText,
} from '../css/TaskList.css';

import { Searchbox} from '../css/AddLeave.css';

export default class AddLeave extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <>
        <ImageBackground
          style={{flex: 1, paddingBottom: 10}}
          source={require('../static/background2.png')}>
          <Header title={'AddLeave'} />
          <SafeAreaView
            style={{
              paddingRight: 10,
              paddingBottom: 20,
              paddingLeft: 10,

              paddingTop: 10,
            }}>
            <View>
              <AddTask onPress={()=> this.props.navigation.navigate('ApplyLeave')}>
                <AddTaskText>Apply Leave</AddTaskText>
              </AddTask>
            </View>
            <Grid style={{marginBottom: 60}}>
              <Col style={{width: '80%'}}>
                <View>
                  <TextInput
                    style={{
                      height: 45,
                      backgroundColor: '#fff',
                      borderWidth: 1,
                      borderColor: '#d0d0d0',
                      borderRadius: 4,
                      marginBottom: 40,
                      marginTop: 15,
                    }}
                    placeholder="Search"
                  />
                </View>
              </Col>
              <Col>
                <View style={{marginTop: 25, marginLeft: 10}}>
                  <Searchbox>
                  <Text>
                    <Icon name="search1" size={25} />
                  </Text>
                  </Searchbox>
                </View>
              </Col>
            </Grid>
            <ScrollView>
              <View>
                <Srnumber>
                  <Text>Sr No 1 </Text>
                </Srnumber>
                <Tasklist1>
                  <Taskboder>
                    <Grid>
                      <Col>
                        <Text style={{fontWeight: 'bold'}}>Applier Name</Text>
                      </Col>
                      <Col style={{width: '60%'}}>
                        <Text style={{alignSelf: 'center', fontSize: 14}}>
                          Manoj
                        </Text>
                      </Col>
                    </Grid>
                  </Taskboder>
                  <Taskboder>
                    <Grid>
                      <Col>
                        <Text style={{fontWeight: 'bold'}}>
                          Reporting Manager Status
                        </Text>
                      </Col>
                      <Col style={{width: '60%'}}>
                        <Text style={{alignSelf: 'center', fontSize: 14}}>
                          Pending
                        </Text>
                      </Col>
                    </Grid>
                  </Taskboder>
                  <Taskboder>
                    <Grid>
                      <Col>
                        <Text style={{fontWeight: 'bold'}}>USer Name</Text>
                      </Col>
                      <Col style={{width: '60%'}}>
                        <Text style={{alignSelf: 'center', fontSize: 14}}>
                          Manoj
                        </Text>
                      </Col>
                    </Grid>
                  </Taskboder>

                  <Taskboder>
                    <Grid>
                      <Col>
                        <Text style={{fontWeight: 'bold'}}>Leave Date</Text>
                      </Col>
                      <Col style={{width: '60%'}}>
                        <Text style={{alignSelf: 'center', fontSize: 14}}>
                          26/3/2020 to 27/3/2020
                        </Text>
                      </Col>
                    </Grid>
                  </Taskboder>

                  <Taskboder>
                    <Grid>
                      <Col>
                        <Text style={{fontWeight: 'bold'}}>Status</Text>
                      </Col>
                      <Col style={{width: '60%'}}>
                        <Text style={{alignSelf: 'center', fontSize: 14}}>
                          Active
                        </Text>
                      </Col>
                    </Grid>
                  </Taskboder>

                  <Taskboder>
                    <Grid>
                      <Col>
                        <Text style={{fontWeight: 'bold'}}>Actions</Text>
                      </Col>
                      <Col style={{width: '50%'}}>
                        <Grid>
                          <Col>
                            <View style={{alignSelf: 'center'}}>
                              <Icon2 name="eye" size={25} color="#000" />
                            </View>
                          </Col>
                          <Col>
                            <View style={{alignSelf: 'center'}}>
                              <Icon3 name="edit" size={25} color="#ed0631" />
                            </View>
                          </Col>
                          <Col />
                        </Grid>
                      </Col>
                    </Grid>
                  </Taskboder>
                </Tasklist1>

                <Srnumber>
                  <Text>Sr No 2 </Text>
                </Srnumber>
                <Tasklist1>
                  <Taskboder>
                    <Grid>
                      <Col>
                        <Text style={{fontWeight: 'bold'}}>Applier Name</Text>
                      </Col>
                      <Col style={{width: '60%'}}>
                        <Text style={{alignSelf: 'center', fontSize: 14}}>
                          Manoj
                        </Text>
                      </Col>
                    </Grid>
                  </Taskboder>
                  <Taskboder>
                    <Grid>
                      <Col>
                        <Text style={{fontWeight: 'bold'}}>
                          Reporting Manager Status
                        </Text>
                      </Col>
                      <Col style={{width: '60%'}}>
                        <Text style={{alignSelf: 'center', fontSize: 14}}>
                          Pending
                        </Text>
                      </Col>
                    </Grid>
                  </Taskboder>
                  <Taskboder>
                    <Grid>
                      <Col>
                        <Text style={{fontWeight: 'bold'}}>USer Name</Text>
                      </Col>
                      <Col style={{width: '60%'}}>
                        <Text style={{alignSelf: 'center', fontSize: 14}}>
                          Manoj
                        </Text>
                      </Col>
                    </Grid>
                  </Taskboder>

                  <Taskboder>
                    <Grid>
                      <Col>
                        <Text style={{fontWeight: 'bold'}}>Leave Date</Text>
                      </Col>
                      <Col style={{width: '60%'}}>
                        <Text style={{alignSelf: 'center', fontSize: 14}}>
                          26/3/2020 to 27/3/2020
                        </Text>
                      </Col>
                    </Grid>
                  </Taskboder>

                  <Taskboder>
                    <Grid>
                      <Col>
                        <Text style={{fontWeight: 'bold'}}>Status</Text>
                      </Col>
                      <Col style={{width: '60%'}}>
                        <Text style={{alignSelf: 'center', fontSize: 14}}>
                          Active
                        </Text>
                      </Col>
                    </Grid>
                  </Taskboder>

                  <Taskboder>
                    <Grid>
                      <Col>
                        <Text style={{fontWeight: 'bold'}}>Actions</Text>
                      </Col>
                      <Col style={{width: '50%'}}>
                        <Grid>
                          <Col>
                            <View style={{alignSelf: 'center'}}>
                              <Icon2 name="eye" size={25} color="#000" />
                            </View>
                          </Col>
                          <Col>
                            <View style={{alignSelf: 'center'}}>
                              <Icon3 name="edit" size={25} color="#ed0631" />
                            </View>
                          </Col>
                          <Col />
                        </Grid>
                      </Col>
                    </Grid>
                  </Taskboder>
                </Tasklist1>

                <Srnumber>
                  <Text>Sr No 1 </Text>
                </Srnumber>
                <Tasklist1>
                  <Taskboder>
                    <Grid>
                      <Col>
                        <Text style={{fontWeight: 'bold'}}>Applier Name</Text>
                      </Col>
                      <Col style={{width: '60%'}}>
                        <Text style={{alignSelf: 'center', fontSize: 14}}>
                          Manoj
                        </Text>
                      </Col>
                    </Grid>
                  </Taskboder>
                  <Taskboder>
                    <Grid>
                      <Col>
                        <Text style={{fontWeight: 'bold'}}>
                          Reporting Manager Status
                        </Text>
                      </Col>
                      <Col style={{width: '60%'}}>
                        <Text style={{alignSelf: 'center', fontSize: 14}}>
                          Pending
                        </Text>
                      </Col>
                    </Grid>
                  </Taskboder>
                  <Taskboder>
                    <Grid>
                      <Col>
                        <Text style={{fontWeight: 'bold'}}>USer Name</Text>
                      </Col>
                      <Col style={{width: '60%'}}>
                        <Text style={{alignSelf: 'center', fontSize: 14}}>
                          Manoj
                        </Text>
                      </Col>
                    </Grid>
                  </Taskboder>

                  <Taskboder>
                    <Grid>
                      <Col>
                        <Text style={{fontWeight: 'bold'}}>Leave Date</Text>
                      </Col>
                      <Col style={{width: '60%'}}>
                        <Text style={{alignSelf: 'center', fontSize: 14}}>
                          26/3/2020 to 27/3/2020
                        </Text>
                      </Col>
                    </Grid>
                  </Taskboder>

                  <Taskboder>
                    <Grid>
                      <Col>
                        <Text style={{fontWeight: 'bold'}}>Status</Text>
                      </Col>
                      <Col style={{width: '60%'}}>
                        <Text style={{alignSelf: 'center', fontSize: 14}}>
                          Active
                        </Text>
                      </Col>
                    </Grid>
                  </Taskboder>

                  <Taskboder>
                    <Grid>
                      <Col>
                        <Text style={{fontWeight: 'bold'}}>Actions</Text>
                      </Col>
                      <Col style={{width: '50%'}}>
                        <Grid>
                          <Col>
                            <View style={{alignSelf: 'center'}}>
                              <Icon2 name="eye" size={25} color="#000" />
                            </View>
                          </Col>
                          <Col>
                            <View style={{alignSelf: 'center'}}>
                              <Icon3 name="edit" size={25} color="#ed0631" />
                            </View>
                          </Col>
                          <Col />
                        </Grid>
                      </Col>
                    </Grid>
                  </Taskboder>
                </Tasklist1>
              </View>
            </ScrollView>
          </SafeAreaView>
        </ImageBackground>
      </>
    );
  }
}
