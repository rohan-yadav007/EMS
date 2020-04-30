import React, { Component } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Image, Text, ImageBackground, SafeAreaView, TouchableOpacity, Picker, ScrollView, TextInput, } from 'react-native';
import { Input, InputGroup, } from '../css/CreateTask.css';
import Header from '../components/Header';
import { connect } from 'react-redux';
import { handlechangetask, createUpdateTask, getTaskDepartment, getTaskAssignee, getTaskPriority, getTaskStatus } from '../redux/Action/CreateTask.action';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker';
import { getData } from '../utils/AsyncStorage';
import { GetIP } from '../utils/deviceInfo';

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
      taskName: null,
      department: null,
      assignee: null,
      date: new Date(),
      fromDate: null,
      toDate: null,
      taskAssignDate: null,
      taskAssignTime: null,
      taskSummary: null,
      taskPriority: null,
      taskStatus: null,
      show: false,
      mode: null,
      isDateTimePickerVisible: false,
      selectedInput: null,
      avatarSource: null,
      departmentList: [],
      assineeList: [],
      priorityList: [],
      statusList: []
    };
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
    const { GroupId } = this.props.route?.params;
    await this.props.getTaskDepartment(GroupId);

    await this.props.getTaskPriority();
    await this.props.getTaskStatus();
  }
  handleAssignee = async (itemValue) => {
    await this.setState({ department: itemValue })
    await this.props.getTaskAssignee(itemValue);
  }
  handleChange = async (text, name) => {
    await this.setState({ [name]: text });
  };
  submitHandler = async (mode) => {

    const employeeId = await getData('UserId');
    const Get_IP = await GetIP;
    const { taskName, fromDate, department, taskAssignTime, assignee, avatarSource, taskPriority, taskAssignDate, taskSummary,
      taskStatus, toDate, date } = this.state;
    const { GroupId, ProjectId } = this.props.route?.params;
    const postObj = {
      a_TaskId: 0,
      mode: mode,
      n_ProjectId: ProjectId,
      t_TaskTitle: taskName,
      t_TaskSummay: taskSummary,
      n_TaskPriorityId: taskPriority,
      n_DepartmentId: department,
      n_AssigneeEmployeeId: assignee,
      d_FromDate: fromDate,
      d_ToDate: toDate,
      d_ReportSubmissionDate: taskAssignDate,
      d_ReportSubmissionTime: taskAssignTime,
      n_TaskStatusID: taskStatus,
      n_GroupID: GroupId,
      b_Deleted: 0,
      n_CreatedBy: employeeId,
      d_CreatedOn: date,
      t_CreatedIP: Get_IP,
      t_AttachmentFile: avatarSource?.uri
    };
    // const valArray = Object.entries(postObj);
    // const nullArr = valArray.filter(e => e.includes(null));
    // const errorField = [];
    // nullArr.map(e => errorField.push(e[0]));
    // this.setState(prevState => {
    //   let errorState = {};
    //   errorField.forEach(e => errorState[`${e}Error`] = "Required");
    //   return {
    //     ...prevState, ...errorState
    //   }
    // })
    console.log('postObj :>> ', postObj);
    await this.props.createUpdateTask(postObj);
    this.props.navigation.goBack()
  }
  onChange = (event, selectedDate, name) => {
    const currentDate = selectedDate || this.state.date;
    if (name) {
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
          date = year + "-" + getmonth + "-" + day;
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
    const source =
      ImagePicker.showImagePicker(options, async (response) => {

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
    const { departmentList, assineeList, priorityList, statusList } = this.props;

    return (
      <>
        <SafeAreaView style={{ flex: 1, flexDirection: 'column' }}>
          <Header title={'Create Task'} />
          <ImageBackground
            style={{ flex: 1 }}
            source={require('../static/background2.png')}>
            <ScrollView>

              <View style={{ paddingLeft: 10, marginTop: 20, paddingRight: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ marginTop: 15 }}>Task Name </Text>
                  {this.state.t_TaskTitleError ? <Text style={{ marginTop: 15, color: 'red' }}>{this.state.t_TaskTitleError}</Text> : null}
                </View>

                <InputGroup>
                  <Input
                    placeholder="Task Name"
                    value={this.state.taskName}
                    onChangeText={text => this.handleChange(text, 'taskName')}
                  />
                </InputGroup>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ marginTop: 15 }}>Department </Text>
                  {this.state.n_DepartmentIdError ? <Text style={{ marginTop: 15, color: 'red' }}>{this.state.n_DepartmentIdError}</Text> : null}
                </View>
                <InputGroup>
                  <Picker style={{ height: 55, width: '100%' }}
                    selectedValue={this.state.department}
                    onValueChange={(itemValue, itemIndex) => this.handleAssignee(itemValue)}
                  >
                    <Picker.Item label="Select" value={null} />
                    {departmentList?.map((e, i) => {
                      return (
                        <Picker.Item key={i} label={e?.t_DepartmentName} value={e?.a_DepartmentId} />
                      )
                    })}
                  </Picker>
                </InputGroup>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ marginTop: 15 }}>Assignee</Text>
                  {this.state.n_AssigneeEmployeeIdError ? <Text style={{ marginTop: 15, color: 'red' }}>{this.state.n_AssigneeEmployeeIdError}</Text> : null}
                </View>

                <InputGroup>
                  <Picker style={{ height: 55, width: '100%' }}
                    selectedValue={this.state.assignee}
                    onValueChange={(itemValue, itemIndex) => itemValue && this.setState({ assignee: itemValue })}
                  >
                    <Picker.Item label="Select" value={null} />
                    {assineeList?.map((e, i) => {
                      return (
                        <Picker.Item key={i} label={e.t_First_Name} value={e.a_EmployeeId} />
                      )
                    })}
                  </Picker>
                </InputGroup>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ marginTop: 15 }}>From Date</Text>
                  {this.state.d_FromDateError ? <Text style={{ marginTop: 15, color: 'red' }}>{this.state.d_FromDateError}</Text> : null}
                </View>

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

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ marginTop: 15 }}>To Date</Text>
                  {this.state.d_ToDateError ? <Text style={{ marginTop: 15, color: 'red' }}>{this.state.d_ToDateError}</Text> : null}
                </View>

                <InputGroup>
                  <TextInput
                    style={{ width: '87%' }}
                    value={toDate}
                    onFocus={() => { this.setState({ ...dateObj, selectedInput: "toDate" }) }}
                  />

                  <Icon style={{ width: '13%', padding: 4, right: 0 }} name="calendar-edit" size={35} color="#2696f2" />
                </InputGroup>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ marginTop: 15 }}>Task Assign Date</Text>
                  {this.state.d_ReportSubmissionDateError ? <Text style={{ marginTop: 15, color: 'red' }}>{this.state.d_ReportSubmissionDateError}</Text> : null}
                </View>

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
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ marginTop: 15 }}>Task Assign Time</Text>
                  {this.state.d_ReportSubmissionTimeError ? <Text style={{ marginTop: 15, color: 'red' }}>{this.state.d_ReportSubmissionTimeError}</Text> : null}
                </View>

                <InputGroup>
                  <TextInput style={{ width: '87%' }} value={taskAssignTime}
                    onFocus={() => { this.setState({ ...timeObj, selectedInput: "taskAssignTime", }) }}
                  />
                  <Icon style={{ width: '13%', padding: 4, right: 0 }} name="calendar-clock" size={35} color="#2696f2" />
                </InputGroup>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ marginTop: 15 }}>Task Summary</Text>
                  {this.state.t_TaskSummayError ? <Text style={{ marginTop: 15, color: 'red' }}>{this.state.t_TaskSummayError}</Text> : null}
                </View>

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
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ marginTop: 15 }}>Task Priority</Text>
                  {this.state.n_TaskPriorityIdError ? <Text style={{ marginTop: 15, color: 'red' }}>{this.state.n_TaskPriorityIdError}</Text> : null}
                </View>

                <InputGroup>
                  <Picker
                    selectedValue={this.state.taskPriority}
                    onValueChange={(itemValue, itemIndex) => itemValue && this.setState({ taskPriority: itemValue })}
                    style={{ height: 50, width: '100%' }}>
                    <Picker.Item label="Select" value={null} />
                    {priorityList?.map((e, i) => {
                      return (
                        <Picker.Item key={i} label={e.t_Name} value={e.a_PriorityId} />
                      )
                    })}
                  </Picker>
                </InputGroup>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ marginTop: 15 }}>Task Status</Text>
                  {this.state.n_TaskStatusIDError ? <Text style={{ marginTop: 15, color: 'red' }}>{this.state.n_TaskStatusIDError}</Text> : null}
                </View>

                <InputGroup>
                  <Picker
                    selectedValue={this.state.taskStatus}
                    onValueChange={(itemValue, itemIndex) => this.setState({ taskStatus: itemValue })}
                    style={{ width: '100%' }}
                  >
                    <Picker.Item label="Select" value={null} />
                    {statusList?.map((e, i) => {
                      return (
                        <Picker.Item key={i} label={e.t_Name} value={e.a_StatusId} />
                      )
                    })}
                  </Picker>
                </InputGroup>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ marginTop: 15 }}>Attachment</Text>
                  {this.state.t_AttachmentFileError ? <Text style={{ marginTop: 15, color: 'red' }}>{this.state.t_AttachmentFileError}</Text> : null}
                </View>

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
                    style={{ backgroundColor: '#e1e1e1', height: 30, width: '50%', padding: 5, borderRadius: 5, alignSelf: 'center', justifyContent: 'center' }}
                    onPress={() => this.handleImage()}
                  >
                    <Text style={{ alignSelf: 'center' }}>Choose File</Text>
                  </TouchableOpacity>
                </InputGroup>

                <TouchableOpacity onPress={() => this.submitHandler('SUBMIT')} style={{ marginTop: 10, marginBottom: 20, borderRadius: 15 }}>
                  <LinearGradient colors={['#d71d1d', '#ff5959', '#d71d1d']}>

                    <Text style={{ width: '100%', padding: 15, textAlign: 'center', color: '#fff', fontSize: 18 }}>Submit</Text>

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
  const departmentList = state.CreateTaskReducer.TaskDepartmentList;
  const assineeList = state.CreateTaskReducer.TaskAssigneeList;
  const priorityList = state.CreateTaskReducer.TaskPriorityList;
  const statusList = state.CreateTaskReducer.TaskStatusList;
  return { departmentList, assineeList, priorityList, statusList };
};

export default connect(
  mapStateToProps,
  { handlechangetask, createUpdateTask, getTaskDepartment, getTaskAssignee, getTaskPriority, getTaskStatus },
)(CreateTask);
