import React, { Component } from 'react';
import { Text, View, ImageBackground, ScrollView, Button, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import {
  Srnumber,
  Tasklist1,
  Taskboder,
  Buttontext,
  ButtonMedium,
} from '../css/TaskList.css';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Col, Grid } from 'react-native-easy-grid';

export default class TaskList extends Component {
  constructor(props) {
    super(props);
  }
  handleCreateTask = () => {
    this.props.navigation.navigate('CreateTask');
  };
  render() {
    return (
      <>
        <ImageBackground
          style={{ flex: 1, paddingBottom: 10, }}
          source={require('../static/background2.png')}>
          <Header title={TaskList} />
          <SafeAreaView
            style={{
              paddingLeft: 10,
              paddingRight: 10,
              flex: 1
            }}
          >
            <View >
              <TouchableOpacity
                style={{
                  backgroundColor: '#000000b0',
                  padding: 5,
                  flexDirection: 'row',
                  borderRadius: 4,
                  width: '100%',
                  marginTop: 5,
                  justifyContent: 'center'
                }}
                onPress={() => this.handleCreateTask()}
              >
                <Icon name="add-circle" size={30} color="#fff" />
                <Text style={{ textAlignVertical: 'center', fontSize: 17, color: '#fff', textTransform: 'uppercase' }}>
                  Add Task
              </Text>
              </TouchableOpacity>
            </View>
            <ScrollView>
              <Srnumber>
                <Text>Sr No 1</Text>
              </Srnumber>
              <Tasklist1>
                <Taskboder>
                  <Grid>
                    <Col style={{ width: '40%' }}>
                      <View>
                        <Text style={{ fontWeight: 'bold' }}>Task Name</Text>
                      </View>
                    </Col>
                    <Col style={{ width: '60%' }}>
                      <View>
                        <Text style={{ alignSelf: 'center', fontSize: 14 }}>
                          Windows Troubleshooting
                        </Text>
                      </View>
                    </Col>
                  </Grid>
                </Taskboder>

                <Taskboder>
                  <Grid>
                    <Col style={{ width: '40%' }}>
                      <View>
                        <Text style={{ fontWeight: 'bold' }}>Assignee</Text>
                      </View>
                    </Col>
                    <Col style={{ width: '60%' }}>
                      <View>
                        <Text style={{ alignSelf: 'center', fontSize: 14 }}>
                          Manoj Rawat (E1)
                        </Text>
                      </View>
                    </Col>
                  </Grid>
                </Taskboder>

                <Taskboder>
                  <Grid>
                    <Col style={{ width: '40%' }}>
                      <View>
                        <Text style={{ fontWeight: 'bold' }}>Department</Text>
                      </View>
                    </Col>
                    <Col style={{ width: '60%' }}>
                      <View>
                        <Text style={{ alignSelf: 'center', fontSize: 14 }}>
                          HR & Admin
                        </Text>
                      </View>
                    </Col>
                  </Grid>
                </Taskboder>

                <Taskboder>
                  <Grid>
                    <Col style={{ width: '40%' }}>
                      <View>
                        <Text style={{ fontWeight: 'bold' }}>Create Date</Text>
                      </View>
                    </Col>
                    <Col style={{ width: '60%' }}>
                      <View>
                        <Text style={{ alignSelf: 'center', fontSize: 14 }}>
                          21 Apr 2020
                        </Text>
                      </View>
                    </Col>
                  </Grid>
                </Taskboder>

                <Taskboder>
                  <Grid>
                    <Col style={{ width: '40%' }}>
                      <View>
                        <Text style={{ fontWeight: 'bold' }}>Task Priority</Text>
                      </View>
                    </Col>
                    <Col style={{ width: '60%' }}>
                      <View>
                        <ButtonMedium>
                          <Text
                            style={{
                              alignSelf: 'center',
                              color: '#fff',
                              fontSize: 14,
                            }}>
                            Medium
                          </Text>
                        </ButtonMedium>
                      </View>
                    </Col>
                  </Grid>
                </Taskboder>

                <Taskboder>
                  <Grid>
                    <Col style={{ width: '40%' }}>
                      <View>
                        <Text style={{ fontWeight: 'bold' }}>Task Status</Text>
                      </View>
                    </Col>
                    <Col style={{ width: '60%' }}>
                      <View>
                        <Buttontext>
                          <Text style={{ alignSelf: 'center', fontSize: 14 }}>
                            In Progress
                          </Text>
                        </Buttontext>
                      </View>
                    </Col>
                  </Grid>
                </Taskboder>
              </Tasklist1>

              <Srnumber>
                <Text>Sr No 2</Text>
              </Srnumber>
              <Tasklist1>
                <Taskboder>
                  <Grid>
                    <Col style={{ width: '40%' }}>
                      <View>
                        <Text style={{ fontWeight: 'bold' }}>Task Name</Text>
                      </View>
                    </Col>
                    <Col style={{ width: '60%' }}>
                      <View>
                        <Text style={{ alignSelf: 'center', fontSize: 14 }}>
                          Windows Troubleshooting
                        </Text>
                      </View>
                    </Col>
                  </Grid>
                </Taskboder>

                <Taskboder>
                  <Grid>
                    <Col style={{ width: '40%' }}>
                      <View>
                        <Text style={{ fontWeight: 'bold' }}>Assignee</Text>
                      </View>
                    </Col>
                    <Col style={{ width: '60%' }}>
                      <View>
                        <Text style={{ alignSelf: 'center', fontSize: 14 }}>
                          Manoj Rawat (E1)
                        </Text>
                      </View>
                    </Col>
                  </Grid>
                </Taskboder>

                <Taskboder>
                  <Grid>
                    <Col style={{ width: '40%' }}>
                      <View>
                        <Text style={{ fontWeight: 'bold' }}>Department</Text>
                      </View>
                    </Col>
                    <Col style={{ width: '60%' }}>
                      <View>
                        <Text style={{ alignSelf: 'center', fontSize: 14 }}>
                          HR & Admin
                        </Text>
                      </View>
                    </Col>
                  </Grid>
                </Taskboder>

                <Taskboder>
                  <Grid>
                    <Col style={{ width: '40%' }}>
                      <View>
                        <Text style={{ fontWeight: 'bold' }}>Create Date</Text>
                      </View>
                    </Col>
                    <Col style={{ width: '60%' }}>
                      <View>
                        <Text style={{ alignSelf: 'center', fontSize: 14 }}>
                          21 Apr 2020
                        </Text>
                      </View>
                    </Col>
                  </Grid>
                </Taskboder>

                <Taskboder>
                  <Grid>
                    <Col style={{ width: '40%' }}>
                      <View>
                        <Text style={{ fontWeight: 'bold' }}>Task Priority</Text>
                      </View>
                    </Col>
                    <Col style={{ width: '60%' }}>
                      <View>
                        <ButtonMedium>
                          <Text
                            style={{
                              alignSelf: 'center',
                              color: '#fff',
                              fontSize: 14,
                            }}>
                            Medium
                          </Text>
                        </ButtonMedium>
                      </View>
                    </Col>
                  </Grid>
                </Taskboder>

                <Taskboder>
                  <Grid>
                    <Col style={{ width: '40%' }}>
                      <View>
                        <Text style={{ fontWeight: 'bold' }}>Task Status</Text>
                      </View>
                    </Col>
                    <Col style={{ width: '60%' }}>
                      <View>
                        <Buttontext>
                          <Text style={{ alignSelf: 'center', fontSize: 14 }}>
                            In Progress
                          </Text>
                        </Buttontext>
                      </View>
                    </Col>
                  </Grid>
                </Taskboder>
              </Tasklist1>

              <Srnumber>
                <Text>Sr No 3</Text>
              </Srnumber>
              <Tasklist1>
                <Taskboder>
                  <Grid>
                    <Col style={{ width: '40%' }}>
                      <View>
                        <Text style={{ fontWeight: 'bold' }}>Task Name</Text>
                      </View>
                    </Col>
                    <Col style={{ width: '60%' }}>
                      <View>
                        <Text style={{ alignSelf: 'center', fontSize: 14 }}>
                          Windows Troubleshooting
                        </Text>
                      </View>
                    </Col>
                  </Grid>
                </Taskboder>

                <Taskboder>
                  <Grid>
                    <Col style={{ width: '40%' }}>
                      <View>
                        <Text style={{ fontWeight: 'bold' }}>Assignee</Text>
                      </View>
                    </Col>
                    <Col style={{ width: '60%' }}>
                      <View>
                        <Text style={{ alignSelf: 'center', fontSize: 14 }}>
                          Manoj Rawat (E1)
                        </Text>
                      </View>
                    </Col>
                  </Grid>
                </Taskboder>

                <Taskboder>
                  <Grid>
                    <Col style={{ width: '40%' }}>
                      <View>
                        <Text style={{ fontWeight: 'bold' }}>Department</Text>
                      </View>
                    </Col>
                    <Col style={{ width: '60%' }}>
                      <View>
                        <Text style={{ alignSelf: 'center', fontSize: 14 }}>
                          HR & Admin
                        </Text>
                      </View>
                    </Col>
                  </Grid>
                </Taskboder>

                <Taskboder>
                  <Grid>
                    <Col style={{ width: '40%' }}>
                      <View>
                        <Text style={{ fontWeight: 'bold' }}>Create Date</Text>
                      </View>
                    </Col>
                    <Col style={{ width: '60%' }}>
                      <View>
                        <Text style={{ alignSelf: 'center', fontSize: 14 }}>
                          21 Apr 2020
                        </Text>
                      </View>
                    </Col>
                  </Grid>
                </Taskboder>

                <Taskboder>
                  <Grid>
                    <Col style={{ width: '40%' }}>
                      <View>
                        <Text style={{ fontWeight: 'bold' }}>Task Priority</Text>
                      </View>
                    </Col>
                    <Col style={{ width: '60%' }}>
                      <View>
                        <ButtonMedium>
                          <Text
                            style={{
                              alignSelf: 'center',
                              color: '#fff',
                              fontSize: 14,
                            }}>
                            Medium
                          </Text>
                        </ButtonMedium>
                      </View>
                    </Col>
                  </Grid>
                </Taskboder>

                <Taskboder>
                  <Grid>
                    <Col style={{ width: '40%' }}>
                      <View>
                        <Text style={{ fontWeight: 'bold' }}>Task Status</Text>
                      </View>
                    </Col>
                    <Col style={{ width: '60%' }}>
                      <View>
                        <Buttontext>
                          <Text style={{ alignSelf: 'center', fontSize: 14 }}>
                            In Progress
                          </Text>
                        </Buttontext>
                      </View>
                    </Col>
                  </Grid>
                </Taskboder>
              </Tasklist1>
            </ScrollView>
          </SafeAreaView>

        </ImageBackground>
      </>
    );
  }
}
