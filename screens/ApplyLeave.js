import React, { Component, useState } from 'react';
import { Text, View, SafeAreaView, ImageBackground, TextInput, RefreshControl, ScrollView, CheckBox, Modal, TouchableOpacity } from 'react-native';
import { LeaveTab, Form, Savebut, InputGroup, Input, CustomText } from '../css/ApplyLeave.css';
import { getLeaveType, getClubLeave, getLeaveDataById, getLeaveTypeId, getHalfdayLeave, saveLeaveApply, getRepoManagerStatus } from '../redux/Action/Leave.action';
import { Col, Grid } from 'react-native-easy-grid';
import Header from '../components/Header';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DateTimePicker from '@react-native-community/datetimepicker';
import { connect } from 'react-redux';
import { getData } from '../utils/AsyncStorage';
import { GetIP } from '../utils/deviceInfo';
import { Picker } from '@react-native-community/picker';



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
      PopupShow: false,
      PLeaveClub: 0,
      DatePickerEnabled: false,
      totalCount: 0,
      PLeaveId: null,
      message: '',
      refreshing: false,
      repoManager: [],
      mode: null,
      submitMode:'SAVE',
      formSubmitName:'Save'
    }
  }
  async componentDidMount() {
    // const { navigation } = this.props;
    // this._unsubscribe = navigation.addListener('focus', async () => {
    await this._onRefresh()
    // });
    // console.log(this.props)
  }
  // componentWillUnmount() {
  //   this._unsubscribe();
  // }
  _onRefresh = async () => {
    await this.setState({ refreshing: true });
    if (this.props.selectedLeave) {
 
      const { selectedLeave } = this.props;
      await this.props.getLeaveDataById(selectedLeave);
      await this.props.getLeaveTypeId(selectedLeave);
      await this.props.getHalfdayLeave(selectedLeave);
      await this.handleUpdate(selectedLeave);

    }
    await this.props.getRepoManagerStatus();
    await this.props.getLeaveType();


    await this.setState({ refreshing: false, repoManager: this.props.repoManager });
    // console.log(this.props.leaveData,this.props.leaveTypeById,this.props.halfDayData)
  };

  handleUpdate = async (selectedLeave) => {

    if (this.props.leaveData && this.props.leaveTypeById && this.props.halfDayData) {
      const leaveType = this.props.leaveTypeById[0]?.n_LeaveId;
      const leaveTypeCount = this.props.leaveTypeById[0]?.n_Days;
      const d_FromDate = this.props.leaveData?.d_FromDate?.split('T')[0];
      const d_ToDate = this.props.leaveData?.d_ToDate?.split('T')[0];
      const n_TotalDays = this.props.leaveData?.n_TotalDays;
      const reason = this.props.leaveData?.t_Reason;

      this.setState({
        leaveType: leaveType, PLeaveId: selectedLeave, DatePickerEnabled: true, d_FromDate: d_FromDate, leaveTypeCount: leaveTypeCount,
        d_ToDate: d_ToDate, totalCount: n_TotalDays, reason: reason, submitMode: 'UPDATE',formSubmitName:'Update'
      });
      await this.onChange();
      await this.props.getClubLeave(leaveType);
    }
    this.props.halfDayData.map((e, i) => { if (e.b_halfday === true) { this.markHalf((e.d_date.split('T')[0]), i) } });
    await this.handleClub();

  }

  onChange = async (selectedDate, name) => {

    const currentDate = selectedDate || this.state.d_CreatedOn;
    if (name) {
      let day = currentDate?.getDate();
      let month = currentDate?.getMonth();
      let year = currentDate?.getFullYear();

      let d_CreatedOn = '';
      if((month < 10) || (day<10)){
        if (month < 10) {
        month = "0" + (month + 1).toString();
      }
      if(day<10){
        day = "0" + day.toString();
      }
      d_CreatedOn = year + "-" + month + "-" + day;
      }
      else{
        d_CreatedOn = year + "-" + (month+1) + "-" + day;
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
      // let newfromDate = fromDate;
      // if (newfromDate[2] < 10) {
      //   newfromDate[2] = '0' + `${newfromDate[2]}`;
      //   newfromDate = newfromDate.join('-');
      // }
      // if (newfromDate[2] > 9) {
      //   newfromDate = newfromDate.join('-');
      // }
      const toDate = (this.state.d_ToDate).split('-');
      // let newtoDate = toDate;
      // if (newtoDate[2] < 10) {
      //   newtoDate[2] = '0' + `${newtoDate[2]}`;
      //   newtoDate = newtoDate.join('-');
      // }
      // if (newtoDate[2] > 9) {
      //   newtoDate = newtoDate.join('-');
      // }
      const newfromDate = this.state.d_FromDate;
      const newtoDate = this.state.d_ToDate;

      const dt1 = new Date(newfromDate);
      const dt2 = new Date(newtoDate);
      this.setState({ fromDate: fromDate, toDate: toDate, clubLeaveCount: null });
      const toDateMill = Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate());
      const fromDateMill = Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate());

      const result = Math.floor((toDateMill - fromDateMill) / (1000 * 60 * 60 * 24));

      let result1 = 0;
      let dayArr = [];
      const dayNameArr = [];
      //for showing dates between selected date
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
      this.setState({
        message: ` You have remain only ${this.state.leaveTypeCount} in this leave. Please club another leave with this or Select Leave without pay`,
        PopupShow: true
      })
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

      const selectedType = typeList?.filter(e => e.n_LeaveId === Value)[0];
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
    const { totalCount, leaveTypeCount, halfCheck, PLeaveId, PLeaveClub, clubLeaveCount, submitMode } = this.state;
    if (totalCount > (leaveTypeCount + clubLeaveCount)) {
      this.setState({
        message: ` You have remain only ${this.state.leaveTypeCount} in this leave. Please club another leave with this or Select Leave without pay`,
        PopupShow: true
      })
    }
    else {
      const n_EmpId = JSON.parse(await getData('UserInfo')).a_EmployeeID;
      const UserInfo = JSON.parse(await getData('UserInfo'));
      const t_CreatedIP = await GetIP;
      const n_CreatedBy = await getData('UserId');
      const xmlHalfday = JSON.stringify(halfCheck.map(e => { return (e) }));
      const t_ApplyLeaveMapXml = `[{ PLeaveId: ${PLeaveId}, PDays: ${leaveTypeCount}, PLeaveClub: ${PLeaveClub} }]`;
      const data = {
        a_ApplyLeaveId: this.state.PLeaveId,
        n_EmployeeId: n_EmpId,
        d_FromDate: this.state.d_FromDate,
        d_ToDate: this.state.d_ToDate,
        n_TotalDays: this.state.totalCount,
        n_Status: 0,
        n_StatusByHr: 0,
        n_CreatedBy: UserInfo?.n_UserId,
        t_CreatedIP: t_CreatedIP,
        t_Mode: submitMode,
        t_ApplyLeaveMapXml: t_ApplyLeaveMapXml,
        xmlHalfday: xmlHalfday,
        t_Reason: this.state.reason,
        n_GroupId: UserInfo.n_GroupId,
        t_AttachmentFile: "Image.jpg",
      }

      const checkNull = Object.values(data).includes(null || '');
      if (checkNull) {
        this.setState({ message: 'Form Contains Error!', PopupShow: true, });
      }
      else {
        await this.setState({ message: '' });
        await this.props.saveLeaveApply(data);
        if (this.props.message) {
          this.setState({ message: 'Success', PopupShow: true, PopupAutoClose: true });
          await setTimeout(() => this.setState({ PopupShow: false, message: '' }), 2000);
          await setTimeout(() => this.props.SetTabFromProp('tab1'), 2000);
        }
      }
    }

  }

  HandleModalClose = () => {
    this.setState({ PopupShow: false, PopupAutoClose: false, message: '' })
  }

  render() {
    const { typeList, clubLeave, navigation } = this.props;
    const { leaveType, PLeaveClub, DatePickerEnabled, PopupShow, show, d_ToDate, PopupAutoClose, refreshing,formSubmitName,
      leaveTypeCount, totalCount, d_FromDate, clubLeaveCount, selectedInput, repoManager, dayArr, reason } = this.state;

    if (repoManager.length === 0) {
      if (this.props.repoManager.length === 0) {
        return (
          <View style={{ paddingBottom: 100, flex: 1, }}>
            <View style={{ alignItems: 'center', flex: 1, marginTop: '60%' }}>
              <Icon name="emoticon-sad-outline" size={40} color="green" />
              <Text>Unable to apply leave!</Text>
              <Text>Please update your Reporting Manager</Text>
            </View>

          </View>
        )
      }
      else {
        return (
          null
        )
      }
    }
    if (repoManager.length !== 0) {
      return (
        <View style={{ paddingBottom: 100 }}>
          <Modal animationType="fade" transparent={true} visible={PopupShow}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: "center", }}>
              <View style={{ paddingBottom: 25, width: '80%', borderRadius: 10, backgroundColor: '#0d76d5', }}>
                <TouchableOpacity style={{ alignSelf: 'flex-end', padding: 5 }} onPress={() => this.HandleModalClose()}>
                  {!PopupAutoClose ? <Icon name="close-circle" size={20} color="#fff" /> : null}
                </TouchableOpacity>
                <Text style={{ color: '#fff', alignSelf: 'center', paddingTop: 10, paddingLeft: 5, paddingRight: 5 }}>
                  {this.state.message}
                </Text>
              </View>
            </View>
          </Modal>

          <ScrollView
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this._onRefresh} />}
            style={{ marginTop: 10, }}
          >

            <Grid>
              <Col>
                <LeaveTab bg='#70be15'>
                  <CustomText fw='bold'>Sick</CustomText>
                  <CustomText >{typeList && typeList[0]?.n_LeaveCount}</CustomText>
                </LeaveTab>
              </Col>
              <Col>
                <LeaveTab bg='#c304aa'>
                  <CustomText fw='bold'>Casual </CustomText>
                  <CustomText >{typeList && typeList[1]?.n_LeaveCount}</CustomText>
                </LeaveTab>
              </Col>
              <Col>
                <LeaveTab bg='#efdc04'>
                  <CustomText fw='bold'>Earned</CustomText>
                  <CustomText >{typeList && typeList[2]?.n_LeaveCount}</CustomText>
                </LeaveTab>
              </Col>
              <Col>
                <LeaveTab bg='#e301b6'>
                  <CustomText fw='bold'>Paternity</CustomText>
                  <CustomText >{typeList && typeList[3]?.n_LeaveCount}</CustomText>
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

            <Form style={{ flex: 1 }}>
              <Grid>
                <Col>
                  <View>
                    <Text >Total Count</Text>
                    <InputGroup>
                      <TextInput
                        style={{
                          color: '#000',
                          height: 45,
                          borderRadius: 4,
                        }}
                        value={`${totalCount}` || 0}
                        editable={false}
                      />
                    </InputGroup>
                  </View>
                </Col>
              </Grid>
            </Form>


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
                        onChange={(event, date) => this.onChange(date, selectedInput)}
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
                      <Icon style={{ width: '13%', padding: 4, right: 0 }} name="calendar-edit" size={35} color="#2696f2" />
                      {show && DatePickerEnabled ? <DateTimePicker
                        style={{ width: '100%', height: 55 }}
                        // mode={mode}
                        value={new Date()}
                        // display={'date'}
                        onChange={(event, date) => this.onChange(date, selectedInput)}

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
                      <Text style={{ color: '#fff', fontSize: 16, alignSelf: 'center' }}>{formSubmitName}</Text>
                    </Savebut>
                  </View>
                </Col>
                <Col>
                  <View>
                    <Savebut style={{ backgroundColor: '#e50000' }} onPress={() => this.props.SetTabFromProp('tab1')}>
                      <Text style={{ color: '#fff', fontSize: 16, alignSelf: 'center' }}>Cancel</Text>
                    </Savebut>
                  </View>
                </Col>
              </Grid>
            </Form>
          </ScrollView>
        </View>
      );
    }

  }
}
const mapStateToProps = state => {
  const typeList = state.LeaveReducer.LeaveType;
  const clubLeave = state.LeaveReducer.ClubLeave;
  const message = state.LeaveReducer.message;
  const repoManager = state.LeaveReducer.ReportingManagerStatus;
  const leaveData = state.LeaveReducer.leaveData;
  const leaveTypeById = state.LeaveReducer.leaveTypeById;
  const halfDayData = state.LeaveReducer.halfDayData;
  return {
    typeList, clubLeave, message, repoManager, leaveData, leaveTypeById, halfDayData
  }
}
export default connect(mapStateToProps, { getLeaveType, getLeaveDataById, getLeaveTypeId, getHalfdayLeave, saveLeaveApply, getRepoManagerStatus, getClubLeave })(ApplyLeave)