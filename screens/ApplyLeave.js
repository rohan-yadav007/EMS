import React, { Component, useState } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  TextInput,
  Picker,
  ScrollView,
  CheckBox,
  Modal
} from 'react-native';
import {
  LeaveTab,
  Form,
  Savebut,
  InputGroup,
  Input,
  CustomText
} from '../css/ApplyLeave.css';
import { getLeaveType, getClubLeave } from '../redux/Action/Leave.action';
import { Col, Grid } from 'react-native-easy-grid';
import Header from '../components/Header';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DateTimePicker from '@react-native-community/datetimepicker';
import { connect } from 'react-redux';

const InputBox = ({ text, placeHolder, value }) => {
  return (
    <Form style={{ flex: 1 }}>
      <Grid>
        <Col>
          <View>
            <Text >{text}</Text>
            <InputGroup>
              <TextInput
                style={{
                  color: '#000',
                  height: 45,
                  borderRadius: 4,
                }}
                value={`${value}`}
                editable={false}
              />
            </InputGroup>
          </View>
        </Col>
      </Grid>
    </Form>
  )
}



class ApplyLeave extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leaveType: '',
      d_FromDate: '',
      d_ToDate: '',
      show: false,
      selectedInput: null,
      fromDate: null,
      toDate: null,
      dayArr: [],
      halfCheck: {},
      reason: '',
      leaveTypeObj: [],
      leaveTypeCount: 0,
      clubLeaveCount: 0,
      clubRequired: false,
      PLeaveClub: 0
    }
  }
  async componentDidMount() {
    const { navigation } = this.props;
    this._unsubscribe = navigation.addListener('focus', async () => {
      await this._onRefresh()
    });
  }
  componentWillUnmount() {
    this._unsubscribe();
  }
  _onRefresh = async () => {
    await this.props.getLeaveType();
  }
  onChange = async (event, selectedDate, name) => {

    const currentDate = selectedDate || this.state.d_CreatedOn;
    if (name) {
      const day = currentDate.getDate();
      const month = currentDate.getMonth();
      const year = currentDate.getFullYear();

      let d_CreatedOn = '';
      if (month < 10) {
        const getmonth = "0" + (month + 1).toString();
        d_CreatedOn = year + "-" + getmonth + "-" + day;
      }

      this.setState(prevState => {
        return ({
          ...prevState,
          show: false,
          [name]: `${d_CreatedOn}`,
          [`${name}Error`]: false,
        })
      });
    }

    if (this.state.d_FromDate && this.state.d_ToDate) {

      const fromDate = (this.state.d_FromDate).split('-');
      let newfromDate = fromDate;
      if (newfromDate[2] < 10) {
        newfromDate[2] = '0' + `${newfromDate[2]}`;
        newfromDate = newfromDate.join('-');
      }
      if (newfromDate[2] > 9) {
        newfromDate = newfromDate.join('-');
      }
      const toDate = (this.state.d_ToDate).split('-');
      let newtoDate = toDate;
      if (newtoDate[2] < 10) {
        newtoDate[2] = '0' + `${newtoDate[2]}`;
        newtoDate = newtoDate.join('-');
      }
      if (newtoDate[2] > 9) {
        newtoDate = newtoDate.join('-');
      }
      const dt1 = new Date(newfromDate);
      const dt2 = new Date(newtoDate);
      this.setState({ fromDate: fromDate, toDate: toDate });
      const toDateMill = Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate());
      const fromDateMill = Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate());

      const result = Math.floor((toDateMill - fromDateMill) / (1000 * 60 * 60 * 24));

      let result1 = 0;
      let dayArr = [];
      for (let i = fromDate[2]; i <= toDate[2]; i++) {

        const resultMil = Math.floor((toDateMill - fromDateMill) / (result + 1));
        result1 = resultMil + result1;
        const dayIterate = JSON.stringify((new Date(fromDateMill + result1)));

        dayArr.push((JSON.parse(dayIterate)).split('T')[0]);
      }
      this.setState({ dayArr: dayArr, totalCount: dayArr.length })
    }
    if (this.state.totalCount > this.state.leaveTypeCount) {
      this.setState({ clubRequired: true })
      setTimeout(() => { this.setState({ clubRequired: false }) }, 5000)
    }
  };
  handleClub = () => {
    const { totalCount, leaveTypeCount, clubLeaveCount } = this.state;
    if (totalCount > leaveTypeCount) {
      const PLeaveClub = totalCount - leaveTypeCount;
      console.log('PLeaveClub', PLeaveClub, clubLeaveCount);
      if (PLeaveClub <= clubLeaveCount) {
        this.setState({ PLeaveClub: PLeaveClub });
      }
    }else{
      this.setState({ PLeaveClub: 0 });
    }
  }
  markHalf = async (index) => {
    const { halfCheck, dayArr} = this.state;
    const uncheck = !this.state.halfCheck[index];
    await this.setState(prevState => { return ({ ...prevState, halfCheck: { ...halfCheck, [index]: uncheck } }) });
    const Count = this.state.halfCheck;
    const data = Object.entries(Count);
    const halfCount = data.filter(e => e.includes(true));
    const TotalCount = (dayArr.length) - (halfCount.length / 2)
    await this.setState({ totalCount: TotalCount });
    this.handleClub();
  }
  handleReason = (text) => {
    this.setState({ reason: text })
  }
  handleSelect = async (Value, name) => {
    console.log(name, Value);
    await this.setState({ [name]: Value });
    const { typeList } = this.props;
    const { totalCount, leaveTypeCount, clubLeaveCount } = this.state;
    if (name === 'leaveType') {
      await this.props.getClubLeave(Value);

      const selectedType = typeList.filter(e => e.n_LeaveId === Value)[0];
      if (selectedType) {
        this.setState({ leaveTypeCount: selectedType?.n_LeaveCount });
      }
      else {
        this.setState({ leaveTypeCount: 0 });
      }
    }
    else {
      await this.setState({ clubLeaveCount: Value });
      this.handleClub();
      
    }


  }
  handleSave = () => {
    if (this.state.totalCount > this.state.leaveTypeCount) {
      this.setState({ clubRequired: true })
      setTimeout(() => { this.setState({ clubRequired: false }) }, 4000)
    }
    const data = {

      a_ApplyLeaveId: 0,
      n_EmployeeId: 541,
      d_FromDate: "2020-05-05",
      d_ToDate: "2020-05-06",
      n_TotalDays: 2,
      n_Status: 0,
      n_StatusByHr: 0,
      n_CreatedBy: 10024,
      t_CreatedIP: "192.168.1.185",
      t_Mode: "SAVE",
      t_ApplyLeaveMapXml: "{'PLeaveId' : 2,'PDays':1.5,'PLeaveClub':0}",
      xmlHalfday: "{'tDate':'2020-05-05','HalfdayId':true},{'tDate':'2020-05-06','HalfdayId':false}",
      t_Reason: "sample string 8",
      n_GroupId: 2,
      t_AttachmentFile: "Image.jpg",
    }
  }
  render() {
    const { typeList, clubLeave } = this.props;
    const { leaveType, PLeaveClub, show, d_ToDate, leaveTypeCount, clubRequired, totalCount, d_FromDate, clubLeaveCount, selectedInput, dayArr, reason } = this.state;

    return (
      <>
        <Modal
          animationType="fade"
          transparent={true}
          visible={clubRequired}
        // onRequestClose={() => {
        //   Alert.alert("Modal has been closed.");
        // }}
        >

          <View style={{ flex: 1, justifyContent: 'center', alignItems: "center", }}>
            <View style={{ padding: 20, width: '80%', borderRadius: 10, backgroundColor: 'green', }}>
              <Text style={{ color: '#fff', alignSelf: 'center' }}>
                You have remain only {leaveTypeCount} in this leave. Please club another leave with this or Select Leave without pay
              </Text>

            </View>
          </View>

        </Modal>

        <ImageBackground
          style={{ flex: 1 }}
          source={require('../static/background2.png')}>
          <Header title={"Apply Leave"} />

          <SafeAreaView
            style={{
              paddingTop: 5,
              paddingLeft: 10,
              paddingRight: 10,
              paddingBottom: 60,
            }}>
            <ScrollView>
              <Grid>
                <Col>
                  <LeaveTab bg='#70be15'>
                    <CustomText fs='16px'>Sick</CustomText>
                    <CustomText fs='16px'>{typeList && typeList[0]?.n_LeaveCount}</CustomText>
                  </LeaveTab>
                </Col>
                <Col>
                  <LeaveTab bg='#c304aa'>
                    <CustomText fs='16px'>Casual </CustomText>
                    <CustomText fs='16px'>{typeList && typeList[1]?.n_LeaveCount}</CustomText>
                  </LeaveTab>
                </Col>
                <Col>
                  <LeaveTab bg='#efdc04'>
                    <CustomText fs='16px'>Earned</CustomText>
                    <CustomText fs='16px'>{typeList && typeList[2]?.n_LeaveCount}</CustomText>
                  </LeaveTab>
                </Col>
                <Col>
                  <LeaveTab bg='#e301b6'>
                    <CustomText fs='16px'>Paternity</CustomText>
                    <CustomText fs='16px'>{typeList && typeList[3]?.n_LeaveCount}</CustomText>
                  </LeaveTab>
                </Col>
              </Grid>

              <Form style={{ flex: 1 }}>
                <Grid>
                  <Col>
                    <View>
                      <Text style={{ marginTop: 10, marginBottom: 10 }}>
                        Leave Type{' '}
                      </Text>

                      <InputGroup>

                        <Picker
                          selectedValue={leaveType}
                          onValueChange={(itemValue, itemIndex) => this.handleSelect(itemValue, 'leaveType')}
                          style={{ height: 50, width: '100%' }}>
                          <Picker.Item label="Select" value={0} />
                          {typeList?.map((e, i) => {
                            return (
                              <Picker.Item key={i} label={e.t_LeaveName} value={e.n_LeaveId} />
                            )
                          })}
                        </Picker>
                      </InputGroup>
                    </View>

                  </Col>
                </Grid>
              </Form>

              {/* <InputBox 
              value={leaveType} 
              text={'Leave Count'} 
              typeList ={typeList || []}
              placeHolder={'Leave Count'} /> */}
              <Form style={{ flex: 1 }}>
                <Grid>
                  <Col>
                    <View>
                      <Text >Leave Count</Text>
                      <InputGroup>
                        <TextInput
                          style={{
                            color: '#000',
                            height: 45,
                            borderRadius: 4,
                          }}
                          value={`${leaveTypeCount}` || '0'}
                          editable={false}
                        />
                      </InputGroup>
                    </View>
                  </Col>
                </Grid>
              </Form>

              <InputBox value={totalCount ? totalCount : 0} text={'Total Count'} />
              <Form>
                <Grid>
                  <Col>
                    <View>
                      <Text>From Date</Text>
                      <InputGroup>
                        <TextInput style={{ width: '87%' }}
                          onFocus={() => this.setState({ show: true, mode: "date", selectedInput: "d_FromDate" })}
                          value={d_FromDate}
                        />
                        <Icon
                          style={{ width: '13%', padding: 4, right: 0 }}
                          name="calendar-edit" size={35} color="#2696f2"
                        />
                        {show ? <DateTimePicker
                          style={{ width: '100%', height: 55 }}
                          // mode={mode}
                          value={new Date()}
                          onChange={(event, date) => this.onChange(event, date, selectedInput)}
                        // display={'date'}

                        /> : null}
                      </InputGroup>
                    </View>
                  </Col>
                </Grid>
              </Form>


              <Form>
                <Grid>
                  <Col>
                    <View>
                      <Text>To Date</Text>
                      <InputGroup>
                        <TextInput style={{ width: '87%' }}
                          onFocus={() => this.setState({ show: true, mode: "date", selectedInput: "d_ToDate" })}
                          value={d_ToDate}
                        />
                        <Icon
                          style={{ width: '13%', padding: 4, right: 0 }}
                          name="calendar-edit" size={35} color="#2696f2"
                        />
                        {show ? <DateTimePicker
                          style={{ width: '100%', height: 55 }}
                          // mode={mode}
                          value={new Date()}
                          // display={'date'}
                          onChange={(event, date) => this.onChange(event, date, selectedInput)}

                        /> : null}
                      </InputGroup>
                    </View>
                  </Col>
                </Grid>
              </Form>

              {dayArr ? <Form>
                <Grid>
                  <Col>
                    {dayArr.map((item, index) => {
                      return (
                        <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                          <View><Text>{item}</Text></View>
                          <View style={{}}></View>
                          <View style={{ flexDirection: 'row' }}>
                            <Text>Half</Text>
                            <CheckBox
                              style={{ marginTop: -5 }}
                              value={this.state.halfCheck[index]}
                              onValueChange={() => this.markHalf(index)}
                            />
                          </View>
                        </View>
                      )
                    })}

                  </Col>
                </Grid>
              </Form> : null}

              <Form >
                <Grid>
                  <Col>
                    <View>
                      <Text style={{ marginTop: 10, marginBottom: 10 }}>
                        Club Leave
                    </Text>
                      <InputGroup>

                        <Picker
                          selectedValue={clubLeaveCount}
                          onValueChange={(itemValue, itemIndex) => this.handleSelect(itemValue, 'clubLeave')}
                          style={{ height: 50, width: '100%' }}>
                          <Picker.Item label="Select" value={0} />
                          {clubLeave?.map((e, i) => {
                            return (
                              <Picker.Item key={i} label={e.t_LeaveName} value={e.n_LeaveCount} />
                            )
                          })}
                        </Picker>
                      </InputGroup>
                      {clubLeaveCount !== 0 ?
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                          <Text>Available: {clubLeaveCount}</Text>
                          <Text>Clubbed: {PLeaveClub}</Text>
                        </View> : null
                      }
                    </View>
                  </Col>
                </Grid>
              </Form>

              <Form >
                <Grid>
                  <Col>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text style={{ marginTop: 15 }}>Reason</Text>
                    </View>

                    <InputGroup h='100px'>
                      <Input
                        multiline={true}
                        numberOfLines={5}
                        value={reason}
                        onChangeText={text =>
                          this.handleReason(text)
                        }
                      />
                    </InputGroup>

                  </Col>
                </Grid>
              </Form>

              <Form>
                <Grid>
                  <Col>
                    <View>
                      <Savebut onPress={() => this.handleSave()}>
                        <Text>Save</Text>
                      </Savebut>
                    </View>
                  </Col>
                  <Col>
                    <View>
                      <Savebut style={{ backgroundColor: '#e50000' }}>
                        <Text>Cancel</Text>
                      </Savebut>
                    </View>
                  </Col>
                </Grid>
              </Form>
            </ScrollView>
          </SafeAreaView>
        </ImageBackground>
      </>
    );
  }
}
const mapStateToProps = state => {
  const typeList = state.LeaveReducer.LeaveType;
  const clubLeave = state.LeaveReducer.ClubLeave;
  return {
    typeList, clubLeave,
  }
}
export default connect(mapStateToProps, { getLeaveType, getClubLeave })(ApplyLeave)