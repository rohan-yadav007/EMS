/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Image, Text, ImageBackground, SafeAreaView, TouchableOpacity, Picker, ScrollView, TextInput, } from 'react-native';
import { Input, InputGroup, } from '../css/CreateTask.css';
import Header from '../components/Header';
import { connect } from 'react-redux';
import { handlechangetask } from '../redux/Action/CreateTask.action';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker';

// More info on all the options is below in the API Reference... just some common use cases shown here
const options = {
  title: 'Select',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
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
      taskAssignDate: '',
      taskAssignTime: '',
      taskSummary: '',
      taskPriority: '',
      show: false,
      mode: '',
      isDateTimePickerVisible: false,
      selectedInput: '',
      avatarSource: null
    };
  }
  handleChange = async (text, name) => {
    await this.setState({ [name]: text });
  };

  onChange = (event, selectedDate, name) => {
    const currentDate = selectedDate || this.state.date;
    if (name) {
      console.log(selectedDate, name);
      if (name === "taskAssignTime") {
        let timeHour = currentDate.getHours();
        if (timeHour < 10) {
          timeHour = "0" + timeHour;
        }
        let timeMinute = currentDate.getMinutes();
        if (timeMinute < 10) {
          timeMinute = "0" + timeMinute;
        }
        const time = timeHour + ":" + timeMinute;
        this.setState(prevState => {
          return ({
            ...prevState,
            show: false,
            [name]: `${time}`,
          })
        });
      }
      else {
        const day = currentDate.getDate();
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();

        let date = '';
        if (month < 10) {
          const getmonth = "0" + (month + 1).toString();
          date = day + "-" + getmonth + "-" + year;
        }
        this.setState(prevState => {
          return ({
            ...prevState,
            show: false,
            [name]: `${date}`,
          })
        });
      }
    }
  };

  handleImage = async () => {
    ImagePicker.showImagePicker(options, async (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('cancelled');
      } else if (response.error) {
        console.log('Error: ', response.error);
      } else {
        const source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          avatarSource: source,
        });
      }
    });
  }

  render() {
    const { show, mode, fromDate, taskAssignTime, avatarSource, selectedInput, taskAssignDate, taskSummary, toDate, date } = this.state;
    const dateObj = { mode: "date", show: true, };
    const timeObj = { mode: "time", show: true, };
    return (
      <>
        <SafeAreaView style={{ flex: 1, flexDirection: 'column' }}>
          <Header title={'Create Task'} />
          <ImageBackground
            style={{ flex: 1 }}
            source={require('../static/background2.png')}>
            <ScrollView>
              <View style={{ paddingLeft: 10, marginTop: 20, paddingRight: 10 }}>

                <Text style={{ marginTop: 15 }}>Task Name</Text>
                <InputGroup>
                  <Input
                    placeholder="Task Name"
                    value={this.state.taskName}
                    onChangeText={text => this.handleChange(text, 'taskName')}
                  />
                </InputGroup>

                <Text style={{ marginTop: 15 }}>Department</Text>
                <InputGroup>
                  <Picker style={{ height: 55, width: '100%' }}
                    selectedValue={this.state.department}
                    onValueChange={(itemValue, itemIndex) => this.setState({ department: itemValue })}
                  >
                    <Picker.Item label="IT" value="IT" />
                    <Picker.Item label="HR" value="HR" />
                  </Picker>
                </InputGroup>

                <Text style={{ marginTop: 15 }}>Assignee</Text>
                <InputGroup>
                  <Picker style={{ height: 55, width: '100%' }}
                    selectedValue={this.state.assignee}
                    onValueChange={(itemValue, itemIndex) => this.setState({ department: itemValue })}
                  >
                    <Picker.Item label="simran" value="simran" />
                    <Picker.Item label="rohan" value="rohan" />
                    <Picker.Item label="vipul" value="vipul" />
                  </Picker>
                </InputGroup>

                <Text style={{ marginTop: 15 }}>From Date</Text>
                <InputGroup>
                  <TextInput style={{ width: '87%' }}
                    value={fromDate}
                    onFocus={() => { this.setState({ show: true, mode: "date", selectedInput: "fromDate" }) }}
                  />
                  <Icon style={{ width: '13%', padding: 4, right: 0 }} name="calendar-edit" size={35} color="#2696f2" />
                  {show && mode === "date" ? <DateTimePicker
                    style={{ width: '100%', height: 55 }}
                    mode={mode}
                    value={new Date()}
                    display={'calendar'}
                    onChange={(event, date) => this.onChange(event, date, selectedInput)}
                    customStyles={myPickerTheme}
                  /> : null}
                </InputGroup>

                <Text style={{ marginTop: 15 }}>To Date</Text>
                <InputGroup>
                  <TextInput
                    style={{ width: '87%' }}
                    value={toDate}
                    onFocus={() => { this.setState({ ...dateObj, selectedInput: "toDate" }) }}
                  />

                  <Icon style={{ width: '13%', padding: 4, right: 0 }} name="calendar-edit" size={35} color="#2696f2" />
                </InputGroup>

                <Text style={{ marginTop: 15 }}>Task Assign Date</Text>
                <InputGroup>
                  <TextInput style={{ width: '87%' }}
                    value={taskAssignDate}
                    onFocus={() => { this.setState({ ...dateObj, selectedInput: "taskAssignDate" }) }}
                  />
                  <Icon style={{ width: '13%', padding: 4, right: 0 }} name="calendar-edit" size={35} color="#2696f2" />
                  {show && mode === "time" ? <DateTimePicker
                    style={{ width: '100%', height: 55 }}
                    mode={mode}
                    value={new Date()}
                    display={'clock'}
                    onChange={(event, date) => this.onChange(event, date, selectedInput)}
                    customStyles={myPickerTheme}
                  /> : null}
                </InputGroup>

                <Text style={{ marginTop: 15 }}>Task Assign Time</Text>
                <InputGroup>
                  <TextInput style={{ width: '87%' }} value={taskAssignTime}
                    onFocus={() => { this.setState({ ...timeObj, selectedInput: "taskAssignTime", }) }}
                  />
                  <Icon style={{ width: '13%', padding: 4, right: 0 }} name="calendar-clock" size={35} color="#2696f2" />
                </InputGroup>

                <Text style={{ marginTop: 15 }}>Task Summary</Text>
                <InputGroup h='100px'>
                  <Input
                    multiline={true}
                    numberOfLines={5}
                    value={taskSummary}
                    onChangeText={text =>
                      this.handleChange(text, 'taskSummary')
                    }
                  />
                </InputGroup>

                <Text style={{ marginTop: 15 }}>Task Priority</Text>
                <InputGroup>
                  <Picker
                    selectedValue={this.state.taskPriority}
                    onValueChange={(itemValue, itemIndex) => this.setState({ taskPriority: itemValue })}
                    style={{ height: 50, width: '100%' }}>
                    <Picker.Item label="Low" value="Low" />
                    <Picker.Item label="Medium" value="Medium" />
                    <Picker.Item label="High" value="High" />
                  </Picker>
                </InputGroup>

                <Text style={{ marginTop: 15 }}>Task Status</Text>
                <InputGroup>
                  <Picker
                    selectedValue={this.state.taskStatus}
                    onValueChange={(itemValue, itemIndex) => this.setState({ taskStatus: itemValue })}
                    style={{ width: '100%' }}
                  >
                    <Picker.Item label="To do" value="Todo" />
                    <Picker.Item label="Progress" value="Progress" />
                    <Picker.Item label="Done" value="Done" />
                  </Picker>
                </InputGroup>

                <Text style={{ marginTop: 15 }}>Attachment</Text>
                <InputGroup h="auto" style={{ justifyContent: 'center', padding: 10, flexDirection: 'column' }}>
                  {avatarSource ?
                    <View style={{ alignSelf: 'center', padding: 5 }}>
                      <TouchableOpacity
                        onPress={() => this.setState({ avatarSource: null })}
                        style={{ position: 'absolute', right: 0, zIndex: 1, backgroundColor: '#fff', borderRadius: 10 }}>
                        <Icon name="close-circle" size={20} color="red" />
                      </TouchableOpacity>

                      <Image style={{ width: 100, height: 100, marginTop: 5 }} source={avatarSource} /></View>
                    : null
                  }
                  <TouchableOpacity
                    style={{ backgroundColor: '#e1e1e1', height: 30,width:'50%', padding: 5, borderRadius: 5, alignSelf: 'center', justifyContent: 'center' }}
                    onPress={() => this.handleImage()}
                  >
                    <Text style={{alignSelf:'center'}}>Choose File</Text>
                  </TouchableOpacity>
                </InputGroup>

                 <TouchableOpacity style={{marginTop:10,marginBottom:20,borderRadius:15}}>
                <LinearGradient colors={['#d71d1d', '#ff5959', '#d71d1d']}>
               
                <Text style={{width:'100%',padding:15,textAlign:'center',color:'#fff',fontSize:18}}>Submit</Text>
               
                </LinearGradient>
                </TouchableOpacity>
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
