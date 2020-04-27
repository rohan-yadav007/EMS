/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
// import DateTimePicker  from '@react-native-community/datetimepicker';
import DateTimePicker from 'react-native-datepicker';
import { View, Text, SafeAreaView, Picker, ScrollView } from 'react-native';
import { Input, InputGroup, } from '../css/CreateTask.css'
import Header from '../components/Header';
import { connect } from "react-redux";
import { handlechangetask } from '../redux/Action/CreateTask.action';

const myPickerTheme = {
  dateIcon: {
    position: 'relative',

  },
  dateInput: {
    width: 100
  }
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
      isDateTimePickerVisible: false
    };

  }
  handleChange = async (text, name) => {
    await this.setState({ [name]: text });
  }

  onChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.date;
    console.log("Platform:", Platform.OS);
    this.setState({ show: Platform.OS === 'android' ? true : false, date: currentDate })
  };

  showMode = currentMode => {
    this.setState({ show: true, mode: currentMode })
  };

  showDatepicker = () => {
    this.showMode('date');
  };

  showTimepicker = () => {
    this.showMode('time');
    console.log("Platform:", Platform.OS);
  };
  render() {
    return (
      <>

        <SafeAreaView style={{ flex: 1, flexDirection: 'column' }}>
          <ScrollView>
            <Header title={"Create Task"} />

            <View style={{ padding: 20 }}>
              <InputGroup>
                <Text>Task Name</Text>
                <Input placeholder="Task Name"
                  value={this.state.taskName}
                  onChangeText={(text) => this.handleChange(text, 'taskName')}
                />
              </InputGroup>

              <InputGroup>
                <Text>Department</Text>
                <Picker
                  // selectedValue={selectedValue}
                  style={{ height: 50, width: 150 }}
                // onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                >
                  <Picker.Item label="IT" value="IT" />
                  <Picker.Item label="HR" value="HR" />
                </Picker>
              </InputGroup>

              <InputGroup>
                <Text>Assignee</Text>
                <Picker
                  // selectedValue={selectedValue}
                  style={{ height: 50, width: 150 }}
                // onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                >
                  <Picker.Item label="simran" value="simran" />
                  <Picker.Item label="rohan" value="rohan" />
                  <Picker.Item label="vipul" value="vipul" />
                </Picker>
              </InputGroup>

              <InputGroup>
                <Text>From Date</Text>
                <DateTimePicker
                  value={new Date()}
                  customStyles={myPickerTheme}
                />
              </InputGroup>

              <InputGroup>
                <Text>To Date</Text>
                <DateTimePicker value={new Date()} />
              </InputGroup>

              <InputGroup>
                <Text>Task Assign Date</Text>
                <DateTimePicker value={new Date()} />
              </InputGroup>

              <InputGroup>
                <Input placeholder="Task Assign Time"
                  value={this.state.taskName}
                  onChangeText={(text) => this.handleChange(text, 'Task Assign Time')}
                />
              </InputGroup>

              <InputGroup>
                <Input placeholder="Task Summary"
                  value={this.state.taskName}
                  onChangeText={(text) => this.handleChange(text, 'Task Summary')}
                />
              </InputGroup>

              <InputGroup>
                <Text>Task Priority</Text>
                <Picker
                  // selectedValue={selectedValue}
                  style={{ height: 50, width: 150 }}
                // onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                >
                  <Picker.Item label="Low" value="Low" />
                  <Picker.Item label="Medium" value="Medium" />
                  <Picker.Item label="High" value="High" />
                </Picker>
              </InputGroup>

              <InputGroup>
                <Text>Task Status</Text>
                <Picker
                  // selectedValue={selectedValue}
                  style={{ height: 50, width: 150 }}
                // onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                >
                  <Picker.Item label="To do" value="To do" />
                  <Picker.Item label="Progress" value="Progress" />
                  <Picker.Item label="Done" value="Done" />
                </Picker>
              </InputGroup>

              <InputGroup>
                <Input placeholder="Attachment"
                  value={this.state.taskName}
                  onChangeText={(text) => this.handleChange(text, 'Attachment')}
                />
              </InputGroup>

            </View>

          </ScrollView>
        </SafeAreaView>

      </>
    );
  }
}


const mapStateToProps = (state) => {
  const taskName = state.CreateTaskReducer.taskName;
  return { taskName };
};

export default connect(mapStateToProps, { handlechangetask })(CreateTask);
