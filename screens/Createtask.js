/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
// import DateTimePicker  from '@react-native-community/datetimepicker';
import DateTimePicker from 'react-native-datepicker';
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
      department: '',
      asignee: '',
      date: new Date(),
      toDate: '',
      taskAsignDate: '',
      taskAsignTime: '',
      taskSummary: '',
      taskPriority: '',
      taskSummary: '',
      show: false,
      mode: 'date',
      isDateTimePickerVisible: false,
    };
  }
  handleChange = async (text, name) => {
    await this.setState({ [name]: text });
  };

  onChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.date;
    console.log('Platform:', Platform.OS);
    this.setState({
      show: Platform.OS === 'android' ? true : false,
      date: currentDate,
    });
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
                  <Picker style={{ height: 55, width: '100%' }}>
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
                  <Picker>
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
                  }}>
                  <DateTimePicker
                    style={{ width: '100%', height: 55 }}
                    value={new Date()}
                    customStyles={myPickerTheme}
                  />
                </InputGroup>

                <Text style={{ marginTop: 15 }}>To Date</Text>
                <InputGroup
                  style={{
                    backgroundColor: '#fff',
                    height: 45,
                    borderRadius: 4,
                    marginTop: 10,
                  }}>
                  <DateTimePicker value={new Date()} style={{ width: '100%' }} customStyles={myPickerTheme} />
                </InputGroup>
                <Text style={{ marginTop: 15 }}>Task Assign Date</Text>
                <InputGroup
                  style={{
                    backgroundColor: '#fff',
                    height: 45,
                    borderRadius: 4,
                    marginTop: 10,
                  }}>
                  <DateTimePicker value={new Date()} style={{ width: '100%' }} customStyles={myPickerTheme} />
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
