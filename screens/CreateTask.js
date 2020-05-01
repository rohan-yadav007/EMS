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
      t_TaskTitle: null,
      n_DepartmentId: null,
      n_AssigneeEmployeeId: null,
      d_CreatedOn: new Date(),
      d_FromDate: null,
      d_ToDate: null,
      d_ReportSubmissionDate: null,
      d_ReportSubmissionTime: null,
      t_TaskSummay: null,
      n_TaskPriorityId: null,
      n_TaskStatusID: null,
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
    console.log(this.props.route);
    const { GroupId } = this.props.route?.params;
    await this.props.getTaskDepartment(GroupId);

    await this.props.getTaskPriority();
    await this.props.getTaskStatus();
  }
  handleDepartment = async (itemValue) => {
    await this.setState({ n_DepartmentId: itemValue, n_DepartmentIdError: false })
    await this.props.getTaskAssignee(itemValue);
  }
  handleSelect = async (itemValue, name) => {
    await this.setState({ [name]: itemValue, [`${name}Error`]: false })
  }
  handleChange = async (text, name) => {
    console.log(name, typeof (text));
    await this.setState(prevState => { return ({ ...prevState, [name]: text, [`${name}Error`]: false }) });
  };
  submitHandler = async (mode) => {

    const n_CreatedBy = await getData('UserId');
    const t_CreatedIP = await GetIP;
    const { t_TaskTitle, d_FromDate, n_DepartmentId, d_ReportSubmissionTime, n_AssigneeEmployeeId, avatarSource, n_TaskPriorityId, d_ReportSubmissionDate, t_TaskSummay,
      n_TaskStatusID, d_ToDate, d_CreatedOn } = this.state;
    const { GroupId, ProjectId } = this.props.route?.params;
    const t_AttachmentFile = avatarSource?.uri
    const postObj = {
      a_TaskId: 0,
      mode: mode,
      n_ProjectId: ProjectId,
      t_TaskTitle: t_TaskTitle,
      t_TaskSummay: t_TaskSummay,
      n_TaskPriorityId: n_TaskPriorityId,
      n_DepartmentId: n_DepartmentId,
      n_AssigneeEmployeeId: n_AssigneeEmployeeId,
      d_FromDate: d_FromDate,
      d_ToDate: d_ToDate,
      d_ReportSubmissionDate: d_ReportSubmissionDate,
      d_ReportSubmissionTime: d_ReportSubmissionTime,
      n_TaskStatusID: n_TaskStatusID,
      n_GroupID: GroupId,
      b_Deleted: 0,
      n_CreatedBy: n_CreatedBy,
      d_CreatedOn: d_CreatedOn,
      t_CreatedIP: t_CreatedIP,
      t_AttachmentFile: t_AttachmentFile
    };
    const valArray = Object.entries(postObj);
    const nullArr = valArray.filter(e => e.includes(null) || e.includes(''));
    const errorField = [];
    nullArr.map(e => errorField.push(e[0]));
    this.setState(prevState => {
      let errorState = {};
      errorField.forEach(e => errorState[`${e}Error`] = "Required");
      console.log("error state", errorState);
      return {
        ...prevState, ...errorState
      }
    })
    if (nullArr.length === 0) {
      await this.props.createUpdateTask(postObj);
      this.props.navigation.goBack()
    }
    console.log('postObj :>> ', postObj);

  }
  onChange = (event, selectedDate, name) => {
    const currentDate = selectedDate || this.state.d_CreatedOn;
    if (name) {
      if (name === "d_ReportSubmissionTime") {
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
            [`${name}Error`]: false
          })
        });
      }
      else {
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
            [`${name}Error`]: false
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
    const { show, mode, d_FromDate, d_ReportSubmissionTime, avatarSource, selectedInput, d_ReportSubmissionDate, t_TaskSummay, d_ToDate, d_CreatedOn } = this.state;
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
                    value={this.state.t_TaskTitle}
                    onChangeText={text => this.handleChange(text, 't_TaskTitle')}
                  />
                </InputGroup>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ marginTop: 15 }}>Department</Text>
                  {this.state.n_DepartmentIdError ? <Text style={{ marginTop: 15, color: 'red' }}>{this.state.n_DepartmentIdError}</Text> : null}
                </View>
                <InputGroup>
                  <Picker style={{ height: 55, width: '100%' }}
                    selectedValue={this.state.n_DepartmentId}
                    onValueChange={(itemValue, itemIndex) => this.handleDepartment(itemValue)}
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
                    selectedValue={this.state.n_AssigneeEmployeeId}
                    onValueChange={(itemValue, itemIndex) => this.handleSelect(itemValue, 'n_AssigneeEmployeeId')}
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
                    value={d_FromDate}
                    onFocus={() => { this.setState({ show: true, mode: "date", selectedInput: "d_FromDate" }) }}
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
                    value={d_ToDate}
                    onFocus={() => { this.setState({ ...dateObj, selectedInput: "d_ToDate" }) }}
                  />

                  <Icon style={{ width: '13%', padding: 4, right: 0 }} name="calendar-edit" size={35} color="#2696f2" />
                </InputGroup>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ marginTop: 15 }}>Task Assign Date</Text>
                  {this.state.d_ReportSubmissionDateError ? <Text style={{ marginTop: 15, color: 'red' }}>{this.state.d_ReportSubmissionDateError}</Text> : null}
                </View>

                <InputGroup>
                  <TextInput style={{ width: '87%' }}
                    value={d_ReportSubmissionDate}
                    onFocus={() => { this.setState({ ...dateObj, selectedInput: "d_ReportSubmissionDate" }) }}
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
                  <TextInput style={{ width: '87%' }} value={d_ReportSubmissionTime}
                    onFocus={() => { this.setState({ ...timeObj, selectedInput: "d_ReportSubmissionTime", }) }}
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
                    value={t_TaskSummay}
                    onChangeText={text =>
                      this.handleChange(text, 't_TaskSummay')
                    }
                  />
                </InputGroup>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ marginTop: 15 }}>Task Priority</Text>
                  {this.state.n_TaskPriorityIdError ? <Text style={{ marginTop: 15, color: 'red' }}>{this.state.n_TaskPriorityIdError}</Text> : null}
                </View>

                <InputGroup>
                  <Picker
                    selectedValue={this.state.n_TaskPriorityId}
                    onValueChange={(itemValue, itemIndex) => this.handleSelect(itemValue, 'n_TaskPriorityId')}
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
                    selectedValue={this.state.n_TaskStatusID}
                    onValueChange={(itemValue, itemIndex) => this.handleSelect(itemValue, 'n_TaskStatusID')}
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
