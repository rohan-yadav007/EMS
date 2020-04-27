/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Header from '../components/Header';
import { Col, Grid } from 'react-native-easy-grid';
import { Loader} from '../css/Projectlist.css';
import Icon from 'react-native-vector-icons/AntDesign';
import { Basiccontent, Basictext, Boxborders, Nextbutton } from '../css/ViewProjects.css';
import {connect} from 'react-redux';
import { viewProjectDetail } from '../redux/Action/Projects.action';

 class ViewProjects extends Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount(){
    console.log("projet id ", this.props.route.params.ProjectId)
    const ProjectId = this.props.route.params.ProjectId;
    await this.props.viewProjectDetail(ProjectId);
    console.log("prjdetail",this.props.projectDetail)
    console.log("info",this.props.projectDetail?.t_Location?.t_FirstName)
  }
  render() {
    const {loading,projectDetail} = this.props;
    return (
      <>
        <ImageBackground
          style={{flex: 1}}
          source={require('../static/background2.png')}>
          <Header />
          <SafeAreaView style={{ paddingLeft: 10, paddingRight: 10, paddingBottom: 40, }}>
          {loading && <Loader >
          <ActivityIndicator size="large" color="#3875c3" />
        </Loader>}
            <ScrollView>
              <Basiccontent>
                <Basictext>
                  <Text>Basic Project Details</Text>
                </Basictext>

                <Grid style={{margin: 15}}>
                  <Col>
                    <View>
                      <Text style={{fontWeight: 'bold', alignSelf: 'center',}}>
                        Project Title
                      </Text>
                    </View>
                  </Col>
                  <Col>
                    <View>
                       <Text style={{ alignSelf: 'center' }}>{projectDetail?.t_ProjectTitle} </Text> 
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
                       <Text style={{ alignSelf: 'center' }}>{projectDetail?.t_ProjectRefNo}</Text> 
                    </View>
                  </Col>
                </Grid>

                <Boxborders
                  style={{
                    borderBottomColor: '#d7dadb',
                    borderBottomWidth: 1,
                  }}
                />

                {/* <Grid style={{ margin: 15 }}>
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
                </Grid> */}
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
                       <Text style={{ alignSelf: 'center' }}>{projectDetail?.n_status}In Progress</Text> 
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
                      <Text style={{ alignSelf: 'center' }}>
                        {projectDetail?.t_AttachamentLOEFile}
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
                       <Text style={{ alignSelf: 'center' }}>{projectDetail?.t_ClientInfo}</Text> 
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
                      <Text style={{ alignSelf: 'center' }}>
                       {projectDetail?.t_ClientInfo} 
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
                      <Text style={{ alignSelf: 'center' }}>
                       {projectDetail?.d_StartDate3} 
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
                      <Text style={{ alignSelf: 'center' }}>
                       {projectDetail?.d_EndDate} 
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
                       <Text style={{ alignSelf: 'center' }}>{projectDetail?.t_ClientInfo}</Text> 
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
                       <Text style={{ alignSelf: 'center' }}>{projectDetail?.t_FirstName} {projectDetail?.t_LastName}</Text> 
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
                       <Text style={{ alignSelf: 'center' }}>{projectDetail?.t_Mobile}</Text> 
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
                      <Text style={{ alignSelf: 'center', textAlign: 'center' }}>
                       {projectDetail?.t_EmailId} 
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
                      <Text style={{ alignSelf: 'center' }} >
                       {projectDetail?.t_Pincode} 
                      </Text>
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
                       <Text style={{ alignSelf: 'center' }}>{projectDetail?.XmlClientContactDetails}</Text> 
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
                       <Text style={{ alignSelf: 'center' }}>{projectDetail?.t_Mobile}</Text> 
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
                      <Text style={{ alignSelf: 'center', textAlign: 'center' }}>
                       {projectDetail?.t_EmailId}       
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
                      <Text style={{ alignSelf: 'center' }} >
                       {projectDetail?.t_Location2}       
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
                        Address
                      </Text>
                    </View>
                  </Col>
                  <Col>
                    <View>
                      <Text style={{ alignSelf: 'center' }} >
                      {projectDetail?.t_CompleteAddress}       
                       </Text>
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
                      <Text style={{ alignSelf: 'center' }} >
                      {projectDetail?.t_Pincode}      
                       </Text>
                    </View>
                  </Col>
                </Grid>
              </Basiccontent>
              <Nextbutton>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 20,
                    textTransform: 'uppercase',
                    textAlign: 'center',
                  }}>
                  Next
                </Text>
              </Nextbutton>
            </ScrollView>
          </SafeAreaView>
        </ImageBackground>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const projectDetail = state.ProjectsReducer.projectDetail;
  const loading = state.CommonReducer.loading;
    return {projectDetail,loading};
}

export default connect(mapStateToProps,{viewProjectDetail})(ViewProjects)