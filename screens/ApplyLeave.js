import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  TextInput,
  ScrollView,
} from 'react-native';
import {
  SickLeave,
  CasualLeave,
  Earned,
  Paternity,
  Form,
  Savebut,
} from '../css/ApplyLeave.css';
import {Col, Grid} from 'react-native-easy-grid';
import Header from '../components/Header';

export default class ApplyLeave extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <>
        <ImageBackground
          style={{flex: 1}}
          source={require('../static/background2.png')}>
          <Header title={"Apply Leave"} />

          <SafeAreaView
            style={{
              paddingLeft: 10,
              paddingRight: 10,
              paddingBottom: 40,
              paddingTop: 20,
            }}>
            <Grid>
              <Col>
                <View>
                  <SickLeave>
                    <Text>Sick</Text>
                  </SickLeave>
                </View>
              </Col>
              <Col>
                <View>
                  <CasualLeave>
                    <Text>Casual </Text>
                  </CasualLeave>
                </View>
              </Col>
              <Col>
                <View>
                  <Earned>
                    <Text>Earned</Text>
                  </Earned>
                </View>
              </Col>
              <Col>
                <View>
                  <Paternity>
                    <Text>Paternity</Text>
                  </Paternity>
                </View>
              </Col>
            </Grid>

            <Form style={{flex: 1}}>
              <Grid>
                <Col>
                  <View>
                    <Text style={{marginTop: 10, marginBottom: 10}}>
                      Leave Type{' '}
                    </Text>
                    <TextInput
                      style={{
                        height: 45,
                        backgroundColor: '#fff',
                        borderWidth: 1,
                        borderColor: '#d0d0d0',
                        borderRadius: 4,
                        marginBottom: 40,
                      }}
                      placeholder="Type here to translate!"
                    />
                  </View>
                </Col>
              </Grid>
            </Form>

            <Form style={{flex: 1}}>
              <Grid>
                <Col>
                  <View>
                    <Text style={{marginTop: 10, marginBottom: 10}}>
                      Start Date
                    </Text>
                    <TextInput
                      style={{
                        height: 45,
                        backgroundColor: '#fff',
                        borderWidth: 1,
                        borderColor: '#d0d0d0',
                        borderRadius: 4,
                      }}
                      placeholder="Type here to translate!"
                    />
                  </View>
                </Col>
              </Grid>
            </Form>

            <Form style={{flex: 1}}>
              <Grid>
                <Col>
                  <View>
                    <Text style={{marginTop: 10, marginBottom: 10}}>
                      End Date
                    </Text>
                    <TextInput
                      style={{
                        height: 45,
                        backgroundColor: '#fff',
                        borderWidth: 1,
                        borderColor: '#d0d0d0',
                        borderRadius: 4,
                      }}
                      placeholder="Type here to translate!"
                    />
                  </View>
                </Col>
              </Grid>
            </Form>

            <Form style={{flex: 1}}>
              <Grid>
                <Col>
                  <View>
                    <Text style={{marginTop: 10, marginBottom: 10}}>
                      Club Leave
                    </Text>
                    <TextInput
                      style={{
                        height: 45,
                        backgroundColor: '#fff',
                        borderWidth: 1,
                        borderColor: '#d0d0d0',
                        borderRadius: 4,
                      }}
                      placeholder="Type here to translate!"
                    />
                  </View>
                </Col>
              </Grid>
            </Form>

            <Form style={{flex: 1}}>
              <Grid>
                <Col>
                  <View>
                    <Text style={{marginTop: 10, marginBottom: 10}}>
                      Reason
                    </Text>
                    <TextInput
                      style={{
                        height: 45,
                        backgroundColor: '#fff',
                        borderWidth: 1,
                        borderColor: '#d0d0d0',
                        borderRadius: 4,
                      }}
                      placeholder="Type here to translate!"
                    />
                  </View>
                </Col>
              </Grid>
            </Form>

            <Form>
              <Grid>
                <Col>
                  <View>
                    <Savebut>
                      <Text>Save</Text>
                    </Savebut>
                  </View>
                </Col>
                <Col>
                  <View>
                    <Savebut style={{backgroundColor: '#e50000'}}>
                      <Text>Cancel</Text>
                    </Savebut>
                  </View>
                </Col>
              </Grid>
            </Form>
          </SafeAreaView>
        </ImageBackground>
      </>
    );
  }
}
