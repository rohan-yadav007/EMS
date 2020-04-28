/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
// import DateTimePicker from 'react-native-datepicker';
import {
  View,
  Text,
  Button,
  ImageBackground,
  TouchableOpacity,
  BackHandler,
  StyleSheet,
  SafeAreaView,
  Picker,
  ScrollView,
  TextInput,
} from 'react-native';
import {
  CustomText,
  Input,
  InputBox,
  InputGroup,
  Select,
} from '../css/CreateTask.css';
import Header from '../components/Header';
import { connect } from 'react-redux';
import { handlechangetask } from '../redux/Action/CreateTask.action';
import CalendarIcon from "react-native-vector-icons/MaterialCommunityIcons"
const myPickerTheme = {
  dateIcon: {
    position: 'relative',
  },
  dateInput: {
    width: 100,
    borderWidth: 0,
  },
};

class CreateTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskName: '',
      department: 'IT',
      assignee: 'simran',
      date: new Date(),
      fromDate: '',
      toDate: '',
      taskAsignDate: '',
      taskAsignTime: '',
      taskSummary: '',
      taskPriority: '',
      show: false,
      mode: 'date',
      isDateTimePickerVisible: false,
    };
  }
  handleChange = async (text, name) => {
    await this.setState({ [name]: text });
  };

  onChange = (event, selectedDate, name) => {
    const currentDate = selectedDate || this.state.date;
  
    this.setState(prevState=>{ return ({
      ...prevState,
      show: false,
      [name]: `${currentDate}`,
    })});
  };

  showMode = currentMode => {
    this.setState({ show: true, mode: currentMode });
  };

  showDatepicker = () => {
    this.showMode('date');
  };

  showTimepicker = () => {
    this.showMode('time');
    console.log('Platform:', Platform.OS);
  };
  render() {
    const { show, mode, fromDate, toDate, date } = this.state;
    return (
      <>
        <SafeAreaView style={{ flex: 1, flexDirection: 'column' }}>
          <Header title={'Create Task'} />
          <ImageBackground
            style={{ flex: 1 }}
            source={require('../static/background2.png')}>
            <ScrollView>
              <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                <InputGroup>
                  <Text>Task Name</Text>
                  <Input
                    style={{
                      borderWidth: 0,
                      borderBottomColor: 0,
                      marginTop: 8,
                      backgroundColor: '#fff',
                      borderRadius: 4,
                      height: 50,
                    }}
                    placeholder="Task Name"
                    value={this.state.taskName}
                    onChangeText={text => this.handleChange(text, 'taskName')}
                  />
                </InputGroup>

                <Text style={{ marginTop: 15 }}>Department</Text>
                <InputGroup
                  style={{
                    marginTop: 13,
                    backgroundColor: '#fff',
                    borderRadius: 4,
                    height: 50,
                  }}>
                  <Picker style={{ height: 55, width: '100%' }}
                    selectedValue={this.state.department}
                    onValueChange={(itemValue, itemIndex) => this.setState({ department: itemValue })}
                  >
                    <Picker.Item label="IT" value="IT" />
                    <Picker.Item label="HR" value="HR" />
                  </Picker>
                </InputGroup>

                <Text style={{ marginTop: 15 }}>Assignee</Text>

                <InputGroup
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: 4,
                    height: 50,
                    marginTop: 10,
                  }}>
                  <Picker
                    selectedValue={this.state.assignee}
                    onValueChange={(itemValue, itemIndex) => this.setState({ assignee: itemValue })}
                  >
                    <Picker.Item label="simran" value="simran" />
                    <Picker.Item label="rohan" value="rohan" />
                    <Picker.Item label="vipul" value="vipul" />
                  </Picker>
                </InputGroup>

                <Text style={{ marginTop: 15 }}>From Date</Text>
                <InputGroup
                  style={{
                    backgroundColor: '#fff',
                    height: 45,
                    borderRadius: 4,
                    marginTop: 10,
                    flexDirection:'row'
                  }}>
                  <TextInput style={{width:'87%'}} value={fromDate} onFocus={() => { this.setState({ show: true }) }} />
                  <CalendarIcon style={{width:'13%',padding:4, right:0}} name="calendar-edit" size={35} color="#2696f2"  />
                  {show ? <DateTimePicker
                    style={{ width: '100%', height: 55 }}
                    mode="date"
                    value={this.state.date}
                    display={'calendar'}
                    onChange={(event, date) => this.onChange(event, date, "fromDate")}
                    customStyles={myPickerTheme}
                  /> : null}
                </InputGroup>

                <Text style={{ marginTop: 15 }}>To Date</Text>
                <InputGroup
                  style={{
                    backgroundColor: '#fff',
                    height: 45,
                    borderRadius: 4,
                    marginTop: 10,
                    flexDirection:'row'
                  }}>

                  <TextInput style={{width:'87%'}} value={toDate} onFocus={() => { this.setState({ show: true }) }} />
                  <CalendarIcon style={{width:'13%',padding:4, right:0}} name="calendar-edit" size={35} color="#2696f2"  />
                  {show ? <DateTimePicker
                    mode="date"
                    value={new Date()}
                    display={'default'}
                    onChange={(event, date) => this.onChange(event, date, "toDate")}
                  /> : null}
                </InputGroup>
                <Text style={{ marginTop: 15 }}>Task Assign Date</Text>
                <InputGroup
                  style={{
                    backgroundColor: '#fff',
                    height: 45,
                    borderRadius: 4,
                    marginTop: 10,
                  }}>
                  {/* <DateTimePicker value={new Date()} style={{ width: '100%' }} customStyles={myPickerTheme} /> */}
                  {show ? <DateTimePicker
                    mode="date"
                    value={new Date()}
                    display={'default'}
                    minimumDate={new Date()}
                    maximumDate={new Date()}
                    onChange={(event, date) => this.onChange(event, date, "fromDate")}
                  /> : null}
                </InputGroup>

                <InputGroup>
                  <InputGroup
                    placeholder="Task Assign Time"
                    value={this.state.taskName}
                    onChangeText={text =>
                      this.handleChange(text, 'Task Assign Time')
                    }
                  />
                </InputGroup>

                <InputGroup>
                  <Input
                    placeholder="Task Summary"
                    value={this.state.taskName}
                    onChangeText={text =>
                      this.handleChange(text, 'Task Summary')
                    }
                  />
                </InputGroup>
                <Text style={{ marginTop: 15 }}>Task Priority</Text>
                <InputGroup
                  style={{
                    marginTop: 13,
                    backgroundColor: '#fff',
                    borderRadius: 4,
                    height: 50,
                  }}>
                  <Picker
                    // selectedValue={selectedValue}
                    style={{ height: 50, width: '100%' }}
                  // onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                  >
                    <Picker.Item label="Low" value="Low" />
                    <Picker.Item label="Medium" value="Medium" />
                    <Picker.Item label="High" value="High" />
                  </Picker>
                </InputGroup>

                <Text style={{ marginTop: 15 }}>Task Status</Text>
                <InputGroup
                  style={{
                    marginTop: 13,
                    backgroundColor: '#fff',
                    borderRadius: 4,
                    height: 50,
                  }}>
                  <Picker
                    // selectedValue={selectedValue}
                    style={{ width: '100%' }}
                  // onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                  >
                    <Picker.Item label="To do" value="To do" />
                    <Picker.Item label="Progress" value="Progress" />
                    <Picker.Item label="Done" value="Done" />
                  </Picker>
                </InputGroup>

                <InputGroup style={{ backgroundColor: '#fff' }}>
                  <Input
                    placeholder="Attachment"
                    value={this.state.taskName}
                    onChangeText={text => this.handleChange(text, 'Attachment')}
                  />
                </InputGroup>
              </View>
            </ScrollView>
          </ImageBackground>
        </SafeAreaView>
      </>
    );
  }
}

const mapStateToProps = state => {
  const taskName = state.CreateTaskReducer.taskName;
  return { taskName };
};

export default connect(
  mapStateToProps,
  { handlechangetask },
)(CreateTask);
