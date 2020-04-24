/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ImageBackground,

  ScrollView,
} from 'react-native';
import Header from '../components/Header';
import {Col, Grid} from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/AntDesign';
import { Basiccontent, Basictext, Boxborders, Nextbutton} from '../css/ViewProjects.css';

export default class ViewProjects extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <ImageBackground
          style={{flex: 1}}
          source={require('../static/background2.png')}>
          <Header />
          <SafeAreaView style={{paddingLeft: 10, paddingRight: 10, paddingBottom:40,}}>
            <ScrollView>
              <Basiccontent>
                <Basictext>
                  <Text>Basic Project Details</Text>
                </Basictext>

                <Grid style={{margin: 15}}>
                  <Col>
                    <View>
                      <Text style={{fontWeight: 'bold', alignSelf: 'center'}}>
                        Project Title
                      </Text>
                    </View>
                  </Col>
                  <Col>
                    <View>
                      <Text style={{alignSelf: 'center'}}>Covid-19</Text>
                    </View>
                  </Col>
                </Grid>
                <Boxborders
                  style={{
                    borderBottomColor: '#d7dadb',
                    borderBottomWidth: 1,
                  }}
                />

                <Grid style={{margin: 15}}>
                  <Col>
                    <View>
                      <Text style={{fontWeight: 'bold', alignSelf: 'center'}}>
                        Project Ref No
                      </Text>
                    </View>
                  </Col>
                  <Col>
                    <View>
                      <Text style={{alignSelf: 'center'}}>C01</Text>
                    </View>
                  </Col>
                </Grid>

                <Boxborders
                  style={{
                    borderBottomColor: '#d7dadb',
                    borderBottomWidth: 1,
                  }}
                />

                <Grid style={{margin: 15}}>
                  <Col>
                    <View>
                      <Text style={{fontWeight: 'bold', alignSelf: 'center'}}>
                        Project Ref No
                      </Text>
                    </View>
                  </Col>
                  <Col>
                    <View>
                      <Text style={{alignSelf: 'center'}}>C01</Text>
                    </View>
                  </Col>
                </Grid>
                <Boxborders
                  style={{
                    borderBottomColor: '#d7dadb',
                    borderBottomWidth: 1,
                  }}
                />

                <Grid style={{margin: 15}}>
                  <Col>
                    <View>
                      <Text style={{fontWeight: 'bold', alignSelf: 'center'}}>
                        Status
                      </Text>
                    </View>
                  </Col>
                  <Col>
                    <View>
                      <Text style={{alignSelf: 'center'}}>In Progress</Text>
                    </View>
                  </Col>
                </Grid>

                <Boxborders
                  style={{
                    borderBottomColor: '#d7dadb',
                    borderBottomWidth: 1,
                  }}
                />

                <Grid style={{margin: 15}}>
                  <Col>
                    <View>
                      <Text style={{fontWeight: 'bold', alignSelf: 'center'}}>
                        LOE Attachment
                      </Text>
                    </View>
                  </Col>
                  <Col>
                    <View>
                      <Text style={{alignSelf: 'center'}}>
                        <Icon name="clouddownload" size={27} color="#06b136" />
                      </Text>
                    </View>
                  </Col>
                </Grid>

                <Boxborders
                  style={{
                    borderBottomColor: '#d7dadb',
                    borderBottomWidth: 1,
                  }}
                />

                <Grid style={{margin: 15}}>
                  <Col>
                    <View>
                      <Text style={{fontWeight: 'bold', alignSelf: 'center'}}>
                        Remarks
                      </Text>
                    </View>
                  </Col>
                  <Col>
                    <View>
                      <Text style={{alignSelf: 'center'}}>Coronaviruse</Text>
                    </View>
                  </Col>
                </Grid>
              </Basiccontent>

              <Basiccontent>
                <Basictext>
                  <Text>Assign</Text>
                </Basictext>

                <Grid style={{margin: 15}}>
                  <Col>
                    <View>
                      <Text style={{fontWeight: 'bold', alignSelf: 'center'}}>
                        Department
                      </Text>
                    </View>
                  </Col>
                  <Col>
                    <View>
                      <Text style={{alignSelf: 'center'}}>
                        Sales & Marketing
                      </Text>
                    </View>
                  </Col>
                </Grid>
                <Boxborders
                  style={{
                    borderBottomColor: '#d7dadb',
                    borderBottomWidth: 1,
                  }}
                />

                <Grid style={{margin: 15}}>
                  <Col>
                    <View>
                      <Text style={{fontWeight: 'bold', alignSelf: 'center'}}>
                        Designation
                      </Text>
                    </View>
                  </Col>
                  <Col>
                    <View>
                      <Text style={{alignSelf: 'center'}}>Sale Head</Text>
                    </View>
                  </Col>
                </Grid>

                <Boxborders
                  style={{
                    borderBottomColor: '#d7dadb',
                    borderBottomWidth: 1,
                  }}
                />

                <Grid style={{margin: 15}}>
                  <Col>
                    <View>
                      <Text style={{fontWeight: 'bold', alignSelf: 'center'}}>
                        Spoc Person
                      </Text>
                    </View>
                  </Col>
                  <Col>
                    <View>
                      <Text style={{alignSelf: 'center'}}>C01</Text>
                    </View>
                  </Col>
                </Grid>
                <Boxborders
                  style={{
                    borderBottomColor: '#d7dadb',
                    borderBottomWidth: 1,
                  }}
                />

                <Grid style={{margin: 15}}>
                  <Col>
                    <View>
                      <Text style={{fontWeight: 'bold', alignSelf: 'center'}}>
                        Duration From
                      </Text>
                    </View>
                  </Col>
                  <Col>
                    <View>
                      <Text style={{alignSelf: 'center'}}>
                        3/1/2020 12:00:00 AM
                      </Text>
                    </View>
                  </Col>
                </Grid>

                <Boxborders
                  style={{
                    borderBottomColor: '#d7dadb',
                    borderBottomWidth: 1,
                  }}
                />

                <Grid style={{margin: 15}}>
                  <Col>
                    <View>
                      <Text style={{fontWeight: 'bold', alignSelf: 'center'}}>
                        To
                      </Text>
                    </View>
                  </Col>
                  <Col>
                    <View>
                      <Text style={{alignSelf: 'center'}}>
                        3/31/2020 12:00:00 AM
                      </Text>
                    </View>
                  </Col>
                </Grid>
              </Basiccontent>

              <Basiccontent>
                <Basictext>
                  <Text>Client Detail</Text>
                </Basictext>

                <Grid style={{margin: 15}}>
                  <Col>
                    <View>
                      <Text style={{fontWeight: 'bold', alignSelf: 'center'}}>
                        Client
                      </Text>
                    </View>
                  </Col>
                  <Col>
                    <View>
                      <Text style={{alignSelf: 'center'}}>EliteMindz</Text>
                    </View>
                  </Col>
                </Grid>
                <Boxborders
                  style={{
                    borderBottomColor: '#d7dadb',
                    borderBottomWidth: 1,
                  }}
                />

                <Grid style={{margin: 15}}>
                  <Col>
                    <View>
                      <Text style={{fontWeight: 'bold', alignSelf: 'center'}}>
                        Segment
                      </Text>
                    </View>
                  </Col>
                  <Col>
                    <View>
                      <Text style={{alignSelf: 'center'}}>Intellirisk</Text>
                    </View>
                  </Col>
                </Grid>

                <Boxborders
                  style={{
                    borderBottomColor: '#d7dadb',
                    borderBottomWidth: 1,
                  }}
                />

                <Grid style={{margin: 15}}>
                  <Col>
                    <View>
                      <Text style={{fontWeight: 'bold', alignSelf: 'center'}}>
                        Service
                      </Text>
                    </View>
                  </Col>
                  <Col>
                    <View>
                      <Text style={{alignSelf: 'center'}}>Risk</Text>
                    </View>
                  </Col>
                </Grid>
                <Boxborders
                  style={{
                    borderBottomColor: '#d7dadb',
                    borderBottomWidth: 1,
                  }}
                />

                <Grid style={{margin: 15}}>
                  <Col>
                    <View>
                      <Text style={{fontWeight: 'bold', alignSelf: 'center'}}>
                        Client SPOC Name
                      </Text>
                    </View>
                  </Col>
                  <Col>
                    <View>
                      <Text style={{alignSelf: 'center'}}>PremPrakash</Text>
                    </View>
                  </Col>
                </Grid>

                <Boxborders
                  style={{
                    borderBottomColor: '#d7dadb',
                    borderBottomWidth: 1,
                  }}
                />

                <Grid style={{margin: 15}}>
                  <Col>
                    <View>
                      <Text style={{fontWeight: 'bold', alignSelf: 'center'}}>
                        Client SPOC Contact
                      </Text>
                    </View>
                  </Col>
                  <Col>
                    <View>
                      <Text style={{alignSelf: 'center'}}>7894561230</Text>
                    </View>
                  </Col>
                </Grid>

                <Boxborders
                  style={{
                    borderBottomColor: '#d7dadb',
                    borderBottomWidth: 1,
                  }}
                />

                <Grid style={{margin: 15}}>
                  <Col>
                    <View>
                      <Text style={{fontWeight: 'bold', alignSelf: 'center'}}>
                        Client SPOC Email
                      </Text>
                    </View>
                  </Col>
                  <Col>
                    <View>
                      <Text style={{alignSelf: 'center', textAlign: 'center'}}>
                        PremPrakash@gmail.com
                      </Text>
                    </View>
                  </Col>
                </Grid>
              </Basiccontent>

              <Basiccontent>
                <Basictext>
                  <Text>Client Address Details</Text>
                </Basictext>

                <Grid style={{margin: 15}}>
                  <Col>
                    <View>
                      <Text style={{fontWeight: 'bold', alignSelf: 'center'}}>
                        Country
                      </Text>
                    </View>
                  </Col>
                  <Col>
                    <View>
                      <Text style={{alignSelf: 'center'}}>India</Text>
                    </View>
                  </Col>
                </Grid>
                <Boxborders
                  style={{
                    borderBottomColor: '#d7dadb',
                    borderBottomWidth: 1,
                  }}
                />

                <Grid style={{margin: 15}}>
                  <Col>
                    <View>
                      <Text style={{fontWeight: 'bold', alignSelf: 'center'}}>
                        State
                      </Text>
                    </View>
                  </Col>
                  <Col>
                    <View>
                      <Text style={{alignSelf: 'center'}}>Delhi</Text>
                    </View>
                  </Col>
                </Grid>

                <Boxborders
                  style={{
                    borderBottomColor: '#d7dadb',
                    borderBottomWidth: 1,
                  }}
                />

                <Grid style={{margin: 15}}>
                  <Col>
                    <View>
                      <Text style={{fontWeight: 'bold', alignSelf: 'center'}}>
                        City
                      </Text>
                    </View>
                  </Col>
                  <Col>
                    <View>
                      <Text style={{alignSelf: 'center'}}>delhi</Text>
                    </View>
                  </Col>
                </Grid>
                <Boxborders
                  style={{
                    borderBottomColor: '#d7dadb',
                    borderBottomWidth: 1,
                  }}
                />

                <Grid style={{margin: 15}}>
                  <Col>
                    <View>
                      <Text style={{fontWeight: 'bold', alignSelf: 'center'}}>
                        Address
                      </Text>
                    </View>
                  </Col>
                  <Col>
                    <View>
                      <Text style={{alignSelf: 'center'}} />
                    </View>
                  </Col>
                </Grid>

                <Boxborders
                  style={{
                    borderBottomColor: '#d7dadb',
                    borderBottomWidth: 1,
                  }}
                />

                <Grid style={{margin: 15}}>
                  <Col>
                    <View>
                      <Text style={{fontWeight: 'bold', alignSelf: 'center'}}>
                        Pin Code
                      </Text>
                    </View>
                  </Col>
                  <Col>
                    <View>
                      <Text style={{alignSelf: 'center'}} />
                    </View>
                  </Col>
                </Grid>
              </Basiccontent>

              <Basiccontent>
                <Grid style={{margin: 15}}>
                  <Col>
                    <View>
                      <Text style={{fontWeight: 'bold', alignSelf: 'center'}}>
                        Contact Name
                      </Text>
                    </View>
                  </Col>
                  <Col>
                    <View>
                      <Text style={{alignSelf: 'center'}}>Layba</Text>
                    </View>
                  </Col>
                </Grid>
                <Boxborders
                  style={{
                    borderBottomColor: '#d7dadb',
                    borderBottomWidth: 1,
                  }}
                />

                <Grid style={{margin: 15}}>
                  <Col>
                    <View>
                      <Text style={{fontWeight: 'bold', alignSelf: 'center'}}>
                        Contact No
                      </Text>
                    </View>
                  </Col>
                  <Col>
                    <View>
                      <Text style={{alignSelf: 'center'}}>9205629660</Text>
                    </View>
                  </Col>
                </Grid>

                <Boxborders
                  style={{
                    borderBottomColor: '#d7dadb',
                    borderBottomWidth: 1,
                  }}
                />

                <Grid style={{margin: 15}}>
                  <Col>
                    <View>
                      <Text style={{fontWeight: 'bold', alignSelf: 'center'}}>
                        Email Id
                      </Text>
                    </View>
                  </Col>
                  <Col>
                    <View>
                      <Text style={{alignSelf: 'center', textAlign: 'center'}}>
                        mohdabidtab75@gmail.com
                      </Text>
                    </View>
                  </Col>
                </Grid>
                <Boxborders
                  style={{
                    borderBottomColor: '#d7dadb',
                    borderBottomWidth: 1,
                  }}
                />

                <Grid style={{margin: 15}}>
                  <Col>
                    <View>
                      <Text style={{fontWeight: 'bold', alignSelf: 'center'}}>
                        Location Name
                      </Text>
                    </View>
                  </Col>
                  <Col>
                    <View>
                      <Text style={{alignSelf: 'center'}} />
                    </View>
                  </Col>
                </Grid>

                <Boxborders
                  style={{
                    borderBottomColor: '#d7dadb',
                    borderBottomWidth: 1,
                  }}
                />

                <Grid style={{margin: 15}}>
                  <Col>
                    <View>
                      <Text style={{fontWeight: 'bold', alignSelf: 'center'}}>
                        Address
                      </Text>
                    </View>
                  </Col>
                  <Col>
                    <View>
                      <Text style={{alignSelf: 'center'}} />
                    </View>
                  </Col>
                </Grid>

                <Grid style={{margin: 15}}>
                  <Col>
                    <View>
                      <Text style={{fontWeight: 'bold', alignSelf: 'center'}}>
                        Pin Code
                      </Text>
                    </View>
                  </Col>
                  <Col>
                    <View>
                      <Text style={{alignSelf: 'center'}} />
                    </View>
                  </Col>
                </Grid>
              </Basiccontent>
              <Nextbutton><Text style={{color:"#fff", fontSize:20, textTransform:"uppercase", textAlign:"center",}}>Next</Text></Nextbutton>
            </ScrollView>
          </SafeAreaView>
        </ImageBackground>
      </>
    );
  }
}
