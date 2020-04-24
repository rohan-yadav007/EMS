import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Header from '../components/Header';
import {Calendar} from 'react-native-calendars';
import {Loader} from '../css/common.css';
import {MonthlyAttendence} from '../redux/Action/attendence.action';
import {connect} from 'react-redux';

class AttendencePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: {},
      showPunch: false,
      selectedDate: '',
      d_InTime: '',
      d_OutTime: '',
      AttendenceData: [],
    };
  }
  async componentDidMount() {
    const date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear();
    const obj = {month: month + 1, year: year};
    await this.props.MonthlyAttendence(obj);
    await this.setState({AttendenceData: this.props.AttendenceData});
  }
  loadAttendenceData = async month => {
    await this.props.MonthlyAttendence(month);
  };

  punchTime = day => {
    const {AttendenceData} = this.state;
    const Filter = AttendenceData.filter(e => e.d_Date === day.dateString);
    if (Filter.length !== 0) {
      const presentFilter = AttendenceData.filter(
        e => e.d_Date === day.dateString,
      )[0];
      return this.setState({
        showPunch: true,
        d_InTime: presentFilter.d_InTime,
        d_OutTime: presentFilter.d_OutTime,
        selectedDate: day.dateString,
      });
    } else {
      return this.setState({
        showPunch: true,
        d_InTime: 'N/A',
        d_OutTime: 'N/A',
        selectedDate: day.dateString,
      });
    }
  };

  render() {
    const {
      showPunch,
      selectedDate,
      AttendenceData,
      d_InTime,
      d_OutTime,
    } = this.state;
    const {loading} = this.props;
    const date = {};
    const presentFilter = AttendenceData.filter(e => e.n_Attendence === 1);
    const absentFilter = AttendenceData.filter(e => e.n_Attendence !== 1);
    presentFilter.map(
      e => (date[e.d_Date] = {marked: true, dotColor: 'green'}),
    );
    absentFilter.map(e => (date[e.d_Date] = {marked: true, dotColor: 'red'}));

    return (
      <SafeAreaView style={{flex: 1}}>
        <Header title={'Attendence'} />

        <ScrollView>
          {loading && (
            <Loader top="55%" left="45%">
              <ActivityIndicator size="large" color="#3875c3" />
            </Loader>
          )}
          <Calendar
            onMonthChange={month => this.loadAttendenceData(month)}
            style={{marginTop: '10%'}}
            markedDates={date}
            maxDate={new Date()}
            onDayPress={day => this.punchTime(day)}
          />
          {showPunch === true && (
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                margin: 20,
                flex: 1,
              }}>
              <Text>{selectedDate}</Text>
              <View
                style={{
                  backgroundColor: '#58b61c',
                  marginTop: 5,
                  borderRadius: 15,
                  marginBottom: 5,
                  padding: 30,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={{color: '#fff', fontSize: 18}}>Punch In</Text>
                <Text style={{color: '#fff', fontSize: 18}}>{d_InTime}</Text>
              </View>
              <View
                style={{
                  backgroundColor: '#ee3030',
                  marginTop: 5,
                  borderRadius: 15,
                  marginBottom: 5,
                  padding: 30,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={{color: '#fff', fontSize: 18}}>Punch Out</Text>
                <Text style={{color: '#fff', fontSize: 18}}>{d_OutTime}</Text>
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => {
  const AttendenceData = state.AttendenceReducer.data;
  const loading = state.CommonReducer.loading;
  return {AttendenceData, loading};
};
export default connect(
  mapStateToProps,
  {MonthlyAttendence},
)(AttendencePage);
