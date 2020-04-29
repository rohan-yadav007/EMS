import React, { Component } from 'react';
import { Text, SafeAreaView, RefreshControl, TouchableOpacity, ScrollView, ActivityIndicator, } from 'react-native';
import Header from '../components/Header';
import { Calendar } from 'react-native-calendars';
import { Status_Wrapper, Punch_status, CustomText } from '../css/AttendencePage.css';
import { MonthlyAttendence, MarkAttendence } from '../redux/Action/attendence.action';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { getAll } from "../utils/AsyncStorage";
// import { getUniqueId, getManufacturer } from 'react-native-device-info';

class AttendencePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: {},
      showPunch: false,
      selectedDate: '',
      d_InTime: null,
      d_OutTime: null,
      AttendenceData: [],
      PresentDate: '',
      month: {},
      refreshing: false,
    };
  }
  async componentDidMount() {
    await this._onRefresh();
    // const data = await getAll();
    // console.log(data);
  }

  _onRefresh = async () => {
    this.setState({ refreshing: true });
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const Monthobj = { month: month + 1, year: year };
    await this.props.MonthlyAttendence(Monthobj);
    let fullYear = '';
    if (month < 10) {
      const getmonth = "0" + (month + 1).toString();
      fullYear = year + '-' + getmonth + '-' + day;
    }
    if (this.props.AttendenceData) {
      await this.setState({ AttendenceData: this.props.AttendenceData, PresentDate: fullYear, month: Monthobj });
      setTimeout(() => { this.setState({ refreshing: false }) }, 2000)
    }
  }

  loadAttendenceData = async month => {
    await this.props.MonthlyAttendence(month);
    this.setState({ month: month, showPunch: false, })
  };

  punchTime = day => {
    const { AttendenceData } = this.state;
    const Filter = AttendenceData.filter(e => e.d_Date === day.dateString);
    if (Filter.length !== 0) {
      const presentFilter = AttendenceData.filter(e => e.d_Date === day.dateString)[0];

      return this.setState({
        showPunch: true,
        d_InTime: presentFilter.d_InTime,
        d_OutTime: presentFilter.d_OutTime,
        selectedDate: day.dateString,
      });
    } else {
      return this.setState({ showPunch: true, d_InTime: null, d_OutTime: null, selectedDate: day.dateString, });
    }
  };

  markAttendence = async () => {
    const d = new Date();
    const hour = d.getHours();
    const minute = d.getMinutes();
    const InTime = `${hour}:${minute}`;
    const { PresentDate, month } = this.state;
    const postObj = {
      "n_EmployeeId": 159,
      "d_Date": PresentDate,
      "d_InTime": InTime,
      "n_Attendence": 1,
      "n_CreatedBy": 159,
      "t_CreatedIP": "192.168.1.185"
    };
    await this.props.MarkAttendence(postObj);
    await this._onRefresh;
    await this.setState({d_InTime:this.props.getMarkResult?.d_InTime})
  }

  render() {
    const { showPunch, selectedDate, AttendenceData, d_InTime, d_OutTime, PresentDate, refreshing } = this.state;

    const date = {};
    const presentFilter = AttendenceData.filter(e => e.n_Attendence === 1);
    presentFilter.map(e => (date[e.d_Date] = { marked: true, dotColor: 'green' }));

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Header title={'Attendence'} />

        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this._onRefresh} />} >
          <Calendar
            onMonthChange={month => this.loadAttendenceData(month)}
            style={{ marginTop: '10%' }}
            markedDates={date}
            maxDate={new Date()}
            onDayPress={day => this.punchTime(day)}
          />
          {showPunch === true && (PresentDate !== selectedDate ?
            (<Status_Wrapper>
              <Text>{selectedDate}</Text>
              <Punch_status>
                <CustomText>Punch In</CustomText>
                <CustomText>{d_InTime === null ? "N/A" : d_InTime}</CustomText>
              </Punch_status>
              <Punch_status bg="#ee3030">
                <CustomText>Punch Out</CustomText>
                <CustomText>{d_OutTime === null ? "N/A" : d_OutTime}</CustomText>
              </Punch_status>
            </Status_Wrapper>
            ) : (
              <Status_Wrapper>
                <Text>{selectedDate}</Text>
                <TouchableOpacity onPress={this.markAttendence}>
                  {!d_InTime ?
                    (
                      <Punch_status >
                        <CustomText>Tap to Punch In</CustomText>
                        <Icon name="fingerprint" size={30} color="#fff" />
                      </Punch_status>
                    ) : (
                      <Punch_status bg="#ee3030">
                        <CustomText>Tap to Punch Out</CustomText>
                        <Icon name="fingerprint" size={30} color="#fff" />
                      </Punch_status>
                    )
                  }
                </TouchableOpacity>


                {d_InTime ? <Punch_status>
                  <CustomText>Punch In</CustomText>
                  <CustomText>{d_InTime}</CustomText>
                </Punch_status> : null}

                {PresentDate !== selectedDate ? (d_OutTime ? <Punch_status bg="#ee3030">
                  <CustomText>Punch Out</CustomText>
                  <CustomText>{d_OutTime}</CustomText>
                </Punch_status> : null) : null}
              </Status_Wrapper>)
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => {
  const AttendenceData = state.AttendenceReducer.data;
  const getMarkResult = state.AttendenceReducer.attendence;
  const loading = state.CommonReducer.loading;
  return { AttendenceData, loading, getMarkResult, };
};
export default connect(mapStateToProps, { MonthlyAttendence, MarkAttendence })(AttendencePage);
