/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  ActivityIndicator,
  ScrollView,
  RefreshControl
} from 'react-native';
import Header from '../components/Header';
import { Col, Grid } from 'react-native-easy-grid';
import { Loader } from '../css/Projectlist.css';
import Icon from 'react-native-vector-icons/AntDesign';
import { Basiccontent, Basictext, Boxborders, Nextbutton } from '../css/ViewProjects.css';
import { connect } from 'react-redux';
import {
  viewProjectDetail, getCountry, getStates, getCity, getDepartment,
  getCleint, getSegment, getService, getDesignation, getSpoc, getContactData, getLocationData
} from '../redux/Action/Projects.action';



class ViewProjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryData: [],
      stateData: [],
      cityData: [],
      projectDetail: {},
      country: null,
      stateName: null,
      city: null,
      deparmentData: [],
      department: null,
      clientData: [],
      client: null,
      segmentData: [],
      segment: null,
      serviceData: [],
      service: null,
      designationData: [],
      designation: null,
      finalData: {},
      spocData: [],
      spoc: null,
      contactData: [],
      locationData: [],
      basicDetail: {},
      assign: {},
      contact: {},
      clientDetail: {},
      refreshing: false,
    }
  }
  async componentDidMount() {
    await this._onRefresh();


  }

  _onRefresh = async () => {
    this.setState({ refreshing: true });
    const ProjectId = this.props.route.params.ProjectId;
    await this.props.viewProjectDetail(ProjectId);
    await this.setState({ projectDetail: this.props.projectDetail })
    await this.props.getCountry();
    await this.setState({ countryData: this.props.countryData })
    await this.props.getStates();
    await this.setState({ stateData: this.props.stateData })
    await this.props.getCity();
    await this.setState({ cityData: this.props.cityData })
    await this.props.getDepartment();
    await this.setState({ deparmentData: this.props.deparmentData });
    await this.props.getCleint();
    await this.setState({ clientData: this.props.clientData });
    await this.props.getSegment();
    await this.setState({ segmentData: this.props.segmentData })
    await this.props.getService();
    await this.setState({ serviceData: this.props.serviceData })
    await this.props.getDesignation();
    await this.setState({ designationData: this.props.designationData })
    await this.getFinalData();
    await this.setState({ refreshing: false });
  }

  async getFinalData() {
    const projectDetail = this.state.projectDetail
    const country = this.state.countryData.filter((country) => country.a_CountryId === projectDetail.n_CountryId)
    if (country.length !== 0) {
      const presentcountry = country[0]
      this.setState({ country: presentcountry.t_CountryName })
    }
    const states = this.state.stateData.filter((state) => state.a_StateId === projectDetail.n_StateId)
    if (states.length !== 0) {
      const presentState = states[0]
      this.setState({ stateName: presentState.t_StateName })
    }
    const city = this.state.cityData.filter((city) => city.a_CityId === projectDetail.n_CityId
      && city.n_CountryId === projectDetail.n_CountryId
      && city.n_StateId === projectDetail.n_StateId)
      if (city.length !== 0) {
        const presentcity = city[0]
        this.setState({ city: presentcity.t_CityName })
      }
    const departmentData = this.state.deparmentData.filter((department) => department.a_DepartmentId === projectDetail.n_DepartmentId)
    if (departmentData.length !== 0) {
      const department = departmentData[0]
      this.setState({ department: department.t_DepartmentName })
    }
    const clientData = this.state.clientData.filter((client) => client.a_LeadCompanyId === projectDetail.n_LeadCompanyId)
    if (clientData.length !== 0) {
      const client = clientData[0]
      this.setState({ client: client.t_CompanyName })
    }
    const segmentData = this.state.segmentData.filter((segment) => segment.a_SegmentId === projectDetail.n_SegmentID)
    if (segmentData.length !== 0) {
      const segment = segmentData[0]
      this.setState({ segment: segment.t_SegmentName })
    }
    const serviceData = this.state.serviceData.filter((service) => service.a_ServiceId === projectDetail.n_ServiceID
      && service.n_SegmentId === projectDetail.n_SegmentID)
    if (serviceData.length !== 0) {
      const service = serviceData[0]
      this.setState({ service: service.t_ServiceName })
    }
    const designationData = this.state.designationData.filter((designation) => designation.n_DepartmentId === projectDetail.n_DepartmentId
      && designation.n_GroupId === projectDetail.n_GroupId)
    if (designationData.length !== 0) {
      const designation = designationData[0]
      let postObj = { n_GroupId: projectDetail.n_GroupId, n_DesignationId: designation.a_DesignationId }
      await this.props.getSpoc(postObj);
      await this.setState({ spocData: this.props.spocData })
      this.setState({ designation: designation.Designation })
    }
    const spocData = this.state.spocData.filter((spoc) => spoc.a_EmployeeId === projectDetail.n_SpocId)
    if (spocData.length != 0) {
      const spoc = spocData[0]
      this.setState({ spoc: spoc.t_First_Name })
    }
    if (projectDetail.n_LeadCompanyId != null) {
      await this.props.getContactData(projectDetail.n_LeadCompanyId)
      await this.setState({ contactData: this.props.contactData })
    }
    if (projectDetail.a_ProjectId != null) {
      await this.props.getLocationData(projectDetail.a_ProjectId)
      await this.setState({ locationData: this.props.locationData })
    }
    const basicDetail = {
      "ProjectTitle": projectDetail?.t_ProjectTitle, "ProjectRefNo": projectDetail?.t_ProjectRefNo,
      "Status": projectDetail.n_status == 1 ? "In Progress" : projectDetail.n_status == 2 ? "Hold"
              : projectDetail.n_status == 3 ? "Completed" : projectDetail.n_status == 4 ? "Insufficient"
              : "Delay",
      "LOE Attachment": projectDetail.t_AttachamentLOEFile, "Remarks": projectDetail.t_ClientInfo
    }
    const assign = {
      "Department": this.state.department, "Designation": this.state.designation,
      "Spoc Person": this.state.spoc, "Duration From": projectDetail?.d_StartDate3,
      "To": projectDetail?.d_EndDate
    }
    const clientDetail = {
      "Client": this.state.client,
      "Segment": this.state.segment, "Service": this.state.service,
      "Client SPOC Name": projectDetail?.t_FirstName,
      "Client SPOC Contact": projectDetail?.t_Mobile,
      "Client SPOC Email": projectDetail?.t_EmailId
    }
  await this.setState({ basicDetail: basicDetail, clientDetail: clientDetail, assign: assign })
  }
 
 renderData = (obj, headerName) => {
    return (
     <View>
        <Basiccontent>
          <Basictext>
            <Text>{headerName}</Text>
          </Basictext>
          {Object.keys(obj).map((data, i) => {
            return (
              <View key={i}>
                <Grid style={{ margin: 15 }}>
                  <Col>
                    <View>
                      <Text style={{ fontWeight: 'bold', alignSelf: 'center' }}>
                        {data}
                      </Text>
                    </View>
                  </Col>
                  {data == "LOE Attachment"?
                   <Col>
                    <View>
                      <Text style={{ alignSelf: 'center' }}>
                          {obj[data]}}
                        <Icon name="clouddownload" size={27} color="#06b136" />
                      </Text>
                    </View>
                  </Col>
                  : <Col>
                    <View>
                      <Text style={{ alignSelf: 'center' }}>  {obj[data]} </Text>
                    </View>
                  </Col>
                  }
                 
                </Grid>
                <Boxborders
                  style={{
                    borderBottomColor: '#d7dadb',
                    borderBottomWidth: 1,
                  }}
                />
              </View>
            )
          }
          )}
        </Basiccontent>
      </View>
    )
  }
  changeKeyObjects = (item, replaceKeys) => {
    const newItem = {};
    Object.keys(item).forEach(key => {
      newItem[replaceKeys[key]] = item[key];
    });
    return newItem;
  };
  render(){
    const { loading } = this.props;
    const {refreshing} = this.state;
    const contactDetail = {};
    const locationDetail = {};
    this.state.contactData.map((data, i) =>
      Object.assign(contactDetail, data)
    )
    this.state.locationData.map((data, i) =>
      Object.assign(locationDetail, data)
    )
    const replaceContactKeys = { t_ContectName: "Contact name", t_ContectNo: "Contact No",t_EmailId:"Email Id" };
    const finalContactDetail = this.changeKeyObjects(contactDetail, replaceContactKeys);
    const replaceLocationKeys = {t_Adress:"Address",t_Location:"Location",t_PinCode:"Pincode"}
    const finalLocationDetail = this.changeKeyObjects(locationDetail,replaceLocationKeys)
    return (
      <>
        <ImageBackground
          style={{ flex: 1 }}
          source={require('../static/background2.png')}>
          <Header />
          <SafeAreaView style={{ paddingLeft: 10, paddingRight: 10, paddingBottom: 40, }}>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this._onRefresh} />} >
              {this.renderData(this.state.basicDetail, "Basic Project ")}
              {this.renderData(this.state.assign, "Assign")}
              {this.renderData(this.state.clientDetail, "Client Detail")}
              {this.renderData(finalContactDetail, "Client Contact")}
              {this.renderData(finalLocationDetail, "Client Location")}
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
  const countryData = state.ProjectsReducer.countryData;
  const loading = state.CommonReducer.loading;
  const stateData = state.ProjectsReducer.stateData;
  const cityData = state.ProjectsReducer.cityData;
  const deparmentData = state.ProjectsReducer.deparmentData;
  const clientData = state.ProjectsReducer.clientData;
  const segmentData = state.ProjectsReducer.segmentData;
  const serviceData = state.ProjectsReducer.serviceData;
  const designationData = state.ProjectsReducer.designationData;
  const spocData = state.ProjectsReducer.spocData;
  const contactData = state.ProjectsReducer.contactData;
  const locationData = state.ProjectsReducer.locationData;
  return {
    projectDetail, loading, countryData, stateData, cityData, deparmentData,
    clientData, segmentData, serviceData, designationData, spocData, contactData, locationData
  };
}

export default connect(mapStateToProps, {
  viewProjectDetail, getCountry, getStates, getCity, getLocationData,
  getDepartment, getCleint, getSegment, getService, getDesignation, getSpoc, getContactData
})(ViewProjects);