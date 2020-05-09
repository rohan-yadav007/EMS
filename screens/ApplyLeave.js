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
  Modal,
  TouchableOpacity
} from 'react-native';
import {
  LeaveTab,
  Form,
  Savebut,
  InputGroup,
  Input,
  CustomText
} from '../css/ApplyLeave.css';
import { getLeaveType, getClubLeave, saveLeaveApply } from '../redux/Action/Leave.action';
import { Col, Grid } from 'react-native-easy-grid';
import Header from '../components/Header';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DateTimePicker from '@react-native-community/datetimepicker';
import { connect } from 'react-redux';
import { getData } from '../utils/AsyncStorage';
import { GetIP } from '../utils/deviceInfo';



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
      halfCheck: [],
      reason: '',
      leaveTypeObj: [],
      leaveTypeCount: 0,
      clubLeaveCount: 0,
      clubRequired: false,
      PopupShow: false,
      PLeaveClub: 0,
      DatePickerEnabled: false,
      totalCount: 0,
      PLeaveId: null,
      message: '',
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
      this.setState({ fromDate: fromDate, toDate: toDate, clubLeaveCount: null });
      const toDateMill = Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate());
      const fromDateMill = Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate());

      const result = Math.floor((toDateMill - fromDateMill) / (1000 * 60 * 60 * 24));

      let result1 = 0;
      let dayArr = [];
      const dayNameArr = [];
      for (let i = fromDate[2]; i <= toDate[2]; i++) {

        const resultMil = Math.floor((toDateMill - fromDateMill) / (result + 1));
        result1 = resultMil + result1;
        const dayIterate = JSON.stringify((new Date(fromDateMill + result1)));
        const temp = new Date(fromDateMill + result1);

        const dayData = temp.toDateString().slice(0, 3);
        dayNameArr.push([dayData, (JSON.parse(dayIterate)).split('T')[0]]);
      }

      if (this.state.PLeaveId !== 1) {
        const newData = dayNameArr.filter(e => !e.includes("Sun") && !e.includes("Sat"))
        newData.map(e => dayArr.push(e[1]));
        this.setState({ dayArr: dayArr, totalCount: dayArr.length });
      }
      if (this.state.PLeaveId === 1) {
        const newData = dayNameArr;
        newData.map(e => dayArr.push(e[1]));
        this.setState({ dayArr: dayArr, totalCount: dayArr.length });
      }

      const tempArr = [];
      await this.state.dayArr.map(e => {
        tempArr.push({ 'tDate': e, 'HalfdayId': false })
      })
      this.setState({ halfCheck: tempArr });

    }
    if (this.state.totalCount > this.state.leaveTypeCount) {
      this.setState({ message: ` You have remain only ${ this.state.leaveTypeCount} in this leave. Please club another leave with this or Select Leave without pay`,
      PopupShow: true })
    }
  };

  handleClub = () => {
    const { totalCount, leaveTypeCount, clubLeaveCount } = this.state;
    if (totalCount > leaveTypeCount) {
      const PLeaveClub = totalCount - leaveTypeCount;
      if (PLeaveClub <= clubLeaveCount) {
        this.setState({ PLeaveClub: PLeaveClub });
      }
    } else {
      this.setState({ PLeaveClub: 0 });
    }
  }


  markHalf = async (item, index) => {
    const { halfCheck, dayArr } = this.state;
    const uncheck = !this.state.halfCheck[index]?.HalfdayId;
    const obj = { 'tDate': item, 'HalfdayId': uncheck }
    const data = halfCheck.map(e => {
      if (e.tDate === obj.tDate) {
        const evt = Object.assign(e, obj);
        return evt;
      }
      else {
        return e;
      }

    });
    await this.setState(prevState => { return ({ ...prevState, halfCheck: [...data] }) });

    const Count = this.state.halfCheck;

    const halfCount = Count.filter(e => e.HalfdayId === true);

    const TotalCount = (dayArr.length) - (halfCount.length / 2)
    await this.setState({ totalCount: TotalCount });
    this.handleClub();
  };


  handleReason = (text) => {
    this.setState({ reason: text })
  };

  handleSelect = async (Value, name) => {
    await this.setState({ [name]: Value, });
    const { typeList } = this.props;
    if (name === 'leaveType') {
      await this.props.getClubLeave(Value);

      const selectedType = typeList.filter(e => e.n_LeaveId === Value)[0];
      if (selectedType) {
        this.setState({ PLeaveId: selectedType?.n_LeaveId, leaveTypeCount: selectedType?.n_LeaveCount, DatePickerEnabled: true, d_FromDate: '', d_ToDate: '', dayArr: [], totalCount: 0 });
      }
      else {
        this.setState({ PLeaveId: 0?.n_LeaveId, leaveTypeCount: 0, d_FromDate: '', d_ToDate: '', totalCount: 0, dayArr: [] });
      }
    }
    else {
      await this.setState({ clubLeaveCount: Value });
      this.handleClub();

    }


  }

  handleSave = async () => {
    const { totalCount, leaveTypeCount, halfCheck, PLeaveId, PLeaveClub } = this.state;
    if (totalCount > leaveTypeCount) {
      this.setState({  message: ` You have remain only ${ this.state.leaveTypeCount} in this leave. Please club another leave with this or Select Leave without pay`,
       PopupShow: true })
    }
    const n_EmpId = JSON.parse(await getData('UserInfo')).a_EmployeeID;
    const UserInfo = JSON.parse(await getData('UserInfo'));
    const t_CreatedIP = await GetIP;
    const n_CreatedBy = await getData('UserId');
    const xmlHalfday = JSON.stringify(halfCheck.map(e => { return (e) }));
    const t_ApplyLeaveMapXml = `[{ PLeaveId: ${PLeaveId}, PDays: ${leaveTypeCount}, PLeaveClub: ${PLeaveClub} }]`;
    const data = {
      'a_ApplyLeaveId': this.state.PLeaveId,
      'n_EmployeeId': n_EmpId,
      'd_FromDate': this.state.d_FromDate,
      'd_ToDate': this.state.d_ToDate,
      'n_TotalDays': this.state.totalCount,
      'n_Status': 0,
      'n_StatusByHr': 0,
      'n_CreatedBy': n_CreatedBy,
      't_CreatedIP': t_CreatedIP,
      't_Mode': "SAVE",
      't_ApplyLeaveMapXml': t_ApplyLeaveMapXml,
      'xmlHalfday': xmlHalfday,
      't_Reason': this.state.reason,
      'n_GroupId': 2,
      't_AttachmentFile': "Image.jpg",
    }
    console.log('data1', data);
    await this.props.saveLeaveApply(data);
    if (this.props.message) {
      this.setState({ message: this.props.message, PopupShow: true });
    }
  }
  HandleModalClose = () => {
    this.setState({ PopupShow: false })
  }
  render() {
    const { typeList, clubLeave } = this.props;
    const { leaveType, PLeaveClub, DatePickerEnabled, PopupShow, show, d_ToDate, leaveTypeCount, clubRequired, totalCount, d_FromDate, clubLeaveCount, selectedInput, dayArr, reason } = this.state;

    return (
      <>
        <Modal
          animationType="fade"
          transparent={true}
          visible={PopupShow}
        // onRequestClose={() => {
        //   Alert.alert("Modal has been closed.");
        // }}
        >

          <View style={{ flex: 1, justifyContent: 'center', alignItems: "center", }}>

            <View style={{ paddingBottom: 25, width: '80%', borderRadius: 10, backgroundColor: 'green', }}>
              <TouchableOpacity style={{ alignSelf: 'flex-end', padding: 5 }} onPress={() => this.HandleModalClose()}>
                <Icon name="close-circle" size={20} color="#fff" />
              </TouchableOpacity>
              <Text style={{ color: '#fff', alignSelf: 'center' }}>
                {this.state.message}
                {/* You have remain only {leaveTypeCount} in this leave. Please club another leave with this or Select Leave without pay */}
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
                          caretHidden={true}
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
                          editable={DatePickerEnabled}
                        />
                        <Icon
                          style={{ width: '13%', padding: 4, right: 0 }}
                          name="calendar-edit" size={35} color="#2696f2"
                        />
                        {show && DatePickerEnabled ? <DateTimePicker
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
                          editable={DatePickerEnabled}
                        />
                        <Icon
                          style={{ width: '13%', padding: 4, right: 0 }}
                          name="calendar-edit" size={35} color="#2696f2"
                        />
                        {show && DatePickerEnabled ? <DateTimePicker
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
                              value={this.state.halfCheck[index]?.HalfdayId}
                              onValueChange={() => this.markHalf(item, index)}
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
                          <Text>Available: {clubLeaveCount || 0}</Text>
                          <Text>Clubbed: {PLeaveClub || 0}</Text>
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
  const message = state.LeaveReducer.message;
  return {
    typeList, clubLeave, message
  }
}
export default connect(mapStateToProps, { getLeaveType, saveLeaveApply, getClubLeave })(ApplyLeave)