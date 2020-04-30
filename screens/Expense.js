import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  TextInput,
  ScrollView,
} from 'react-native';
import Header from '../components/Header';
import {Searchbox} from '../css/AddLeave.css';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/AntDesign';
import Icon4 from 'react-native-vector-icons/Feather';
import {
  Srnumber,
  Tasklist1,
  Taskboder,
  Buttontext,
  ButtonMedium,
  AddTask,
  AddTaskText,
} from '../css/TaskList.css';
import {Tablelist1} from '../css/Expense.css';
import {Col, Grid} from 'react-native-easy-grid';

export default class Expense extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <>
        <ImageBackground
          style={{flex: 1, paddingBottom: 10}}
          source={require('../static/background2.png')}>
          <Header title={'Expense'} />
          <SafeAreaView
            style={{
              paddingRight: 10,
              paddingBottom: 20,
              paddingLeft: 10,

              paddingTop: 10,
            }}>
            <View>
              <AddTask>
                <Icon2 name="add-circle" size={25} color="#fff" />
                <AddTaskText>ADD</AddTaskText>
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

            <ScrollView
              style={{marginTop: 20, marginBottom: 20, paddingBottom: 40}}>
              <View>
                <ImageBackground
                  style={{padding: 12}}
                  source={require('../static/approval_bg.png')}>
                  <Tablelist1>So No (1)</Tablelist1>
                </ImageBackground>

                <Tasklist1>
                  <Taskboder>
                    <Grid>
                      <Col>
                        <Text style={{fontWeight: 'bold'}}>Employee Name</Text>
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
                        <Text style={{fontWeight: 'bold'}}>Project Name</Text>
                      </Col>
                      <Col style={{width: '60%'}}>
                        <Text style={{alignSelf: 'center', fontSize: 14}}>
                          Technical Support
                        </Text>
                      </Col>
                    </Grid>
                  </Taskboder>
                  <Taskboder>
                    <Grid>
                      <Col>
                        <Text style={{fontWeight: 'bold'}}>Task Name</Text>
                      </Col>
                      <Col style={{width: '60%'}}>
                        <Text style={{alignSelf: 'center', fontSize: 14}}>
                          New task
                        </Text>
                      </Col>
                    </Grid>
                  </Taskboder>

                  <Taskboder>
                    <Grid>
                      <Col>
                        <Text style={{fontWeight: 'bold'}}>Total Expense</Text>
                      </Col>
                      <Col style={{width: '60%'}}>
                        <Text style={{alignSelf: 'center', fontSize: 14}}>
                          18302
                        </Text>
                      </Col>
                    </Grid>
                  </Taskboder>

                  <Taskboder>
                    <Grid>
                      <Col>
                        <Text style={{fontWeight: 'bold'}}>Approved Amt</Text>
                      </Col>
                      <Col style={{width: '60%'}}>
                        <Text style={{alignSelf: 'center', fontSize: 14}}>
                          1836
                        </Text>
                      </Col>
                    </Grid>
                  </Taskboder>

                  <Taskboder>
                    <Grid>
                      <Col>
                        <Text style={{fontWeight: 'bold'}}>padding Amt</Text>
                      </Col>
                      <Col style={{width: '60%'}}>
                        <Text style={{alignSelf: 'center', fontSize: 14}}>
                          0
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
                          Approved
                        </Text>
                      </Col>
                    </Grid>
                  </Taskboder>

                  <Taskboder>
                    <Grid>
                      <Col>
                        <Text style={{fontWeight: 'bold'}}>Actions</Text>
                      </Col>
                      <Col style={{width: '60%'}}>
                        <View style={{alignSelf: 'center'}}>
                          <Icon3 name="eye" size={25} color="#000" />
                        </View>

                        <Col />
                      </Col>
                    </Grid>
                  </Taskboder>
                </Tasklist1>
              </View>

              <View style={{marginTop: 20,}}>
                <ImageBackground
                  style={{padding: 12}}
                  source={require('../static/approval_bg.png')}>
                  <Tablelist1>So No (2)</Tablelist1>
                </ImageBackground>

                <Tasklist1>
                  <Taskboder>
                    <Grid>
                      <Col>
                        <Text style={{fontWeight: 'bold'}}>Employee Name</Text>
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
                        <Text style={{fontWeight: 'bold'}}>Project Name</Text>
                      </Col>
                      <Col style={{width: '60%'}}>
                        <Text style={{alignSelf: 'center', fontSize: 14}}>
                          Technical Support
                        </Text>
                      </Col>
                    </Grid>
                  </Taskboder>
                  <Taskboder>
                    <Grid>
                      <Col>
                        <Text style={{fontWeight: 'bold'}}>Task Name</Text>
                      </Col>
                      <Col style={{width: '60%'}}>
                        <Text style={{alignSelf: 'center', fontSize: 14}}>
                          New task
                        </Text>
                      </Col>
                    </Grid>
                  </Taskboder>

                  <Taskboder>
                    <Grid>
                      <Col>
                        <Text style={{fontWeight: 'bold'}}>Total Expense</Text>
                      </Col>
                      <Col style={{width: '60%'}}>
                        <Text style={{alignSelf: 'center', fontSize: 14}}>
                          18302
                        </Text>
                      </Col>
                    </Grid>
                  </Taskboder>

                  <Taskboder>
                    <Grid>
                      <Col>
                        <Text style={{fontWeight: 'bold'}}>Approved Amt</Text>
                      </Col>
                      <Col style={{width: '60%'}}>
                        <Text style={{alignSelf: 'center', fontSize: 14}}>
                          1836
                        </Text>
                      </Col>
                    </Grid>
                  </Taskboder>

                  <Taskboder>
                    <Grid>
                      <Col>
                        <Text style={{fontWeight: 'bold'}}>padding Amt</Text>
                      </Col>
                      <Col style={{width: '60%'}}>
                        <Text style={{alignSelf: 'center', fontSize: 14}}>
                          0
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
                          Approved
                        </Text>
                      </Col>
                    </Grid>
                  </Taskboder>

                  <Taskboder>
                    <Grid>
                      <Col>
                        <Text style={{fontWeight: 'bold'}}>Actions</Text>
                      </Col>
                      <Col style={{width: '60%'}}>
                        <View style={{alignSelf: 'center'}}>
                          <Icon3 name="eye" size={25} color="#000" />
                        </View>

                        <Col />
                      </Col>
                    </Grid>
                  </Taskboder>
                </Tasklist1>
              </View>

              <View style={{marginTop: 20, paddingBottom: 90}}>
                <ImageBackground
                  style={{padding: 12}}
                  source={require('../static/approval_bg.png')}>
                  <Tablelist1>So No (3)</Tablelist1>
                </ImageBackground>

                <Tasklist1>
                  <Taskboder>
                    <Grid>
                      <Col>
                        <Text style={{fontWeight: 'bold'}}>Employee Name</Text>
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
                        <Text style={{fontWeight: 'bold'}}>Project Name</Text>
                      </Col>
                      <Col style={{width: '60%'}}>
                        <Text style={{alignSelf: 'center', fontSize: 14}}>
                          Technical Support
                        </Text>
                      </Col>
                    </Grid>
                  </Taskboder>
                  <Taskboder>
                    <Grid>
                      <Col>
                        <Text style={{fontWeight: 'bold'}}>Task Name</Text>
                      </Col>
                      <Col style={{width: '60%'}}>
                        <Text style={{alignSelf: 'center', fontSize: 14}}>
                          New task
                        </Text>
                      </Col>
                    </Grid>
                  </Taskboder>

                  <Taskboder>
                    <Grid>
                      <Col>
                        <Text style={{fontWeight: 'bold'}}>Total Expense</Text>
                      </Col>
                      <Col style={{width: '60%'}}>
                        <Text style={{alignSelf: 'center', fontSize: 14}}>
                          18302
                        </Text>
                      </Col>
                    </Grid>
                  </Taskboder>

                  <Taskboder>
                    <Grid>
                      <Col>
                        <Text style={{fontWeight: 'bold'}}>Approved Amt</Text>
                      </Col>
                      <Col style={{width: '60%'}}>
                        <Text style={{alignSelf: 'center', fontSize: 14}}>
                          1836
                        </Text>
                      </Col>
                    </Grid>
                  </Taskboder>

                  <Taskboder>
                    <Grid>
                      <Col>
                        <Text style={{fontWeight: 'bold'}}>padding Amt</Text>
                      </Col>
                      <Col style={{width: '60%'}}>
                        <Text style={{alignSelf: 'center', fontSize: 14}}>
                          0
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
                          Approved
                        </Text>
                      </Col>
                    </Grid>
                  </Taskboder>

                  <Taskboder>
                    <Grid>
                      <Col>
                        <Text style={{fontWeight: 'bold'}}>Actions</Text>
                      </Col>
                      <Col style={{width: '60%'}}>
                        <View style={{alignSelf: 'center'}}>
                          <Icon3 name="eye" size={25} color="#000" />
                        </View>

                        <Col />
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
