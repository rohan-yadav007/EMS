/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
import React, { Component, useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  View,
  Button,
  Text,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
} from 'react-native';
import { ExpenseText, TaskTitle, ModalTopContent, Input, NavButton, Srnumber, Tasklist1, Taskborder, CloseButton, Customborder, InputGroup, Customtext } from '../../css/Expense.css';
import Header from '../../components/Header';
import { connect } from 'react-redux';
import { handlechangetask } from '../../redux/Action/CreateTask.action';
import { getProfileData, getDepartment, getDesignation } from '../../redux/Action/MyProfile.action';
import { getEmployeeProjectList, getExpenseListByTask, saveExpenseListByProject, getEmployeeTaskListByProject, } from '../../redux/Action/Expense.action';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker';
import { Col, Grid } from 'react-native-easy-grid';
import { Picker } from '@react-native-community/picker';
import { getData } from '../../utils/AsyncStorage';

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
let ExpenseMapArray = [];
const ExpenseItem = ({ item, index, handleExpenseChange }) => {

  const [Popup, setPopup] = useState(false);
  const [expenseType, setExpenseType] = useState(item?.n_ExpenseTypeId || 0);
  const [amount, setAmount] = useState(`${item?.t_Amount || 0}`);
  const [expenseDate, setExpenseDate] = useState(item?.d_ExpenseDate || '');
  const [description, setDescription] = useState(item?.t_Description);
  const [attachment, setAttachment] = useState('');
  const [transportType, setTransportType] = useState(0);
  const [distance, setDistance] = useState('');
  const [rate, setRate] = useState('');
  const [transportAmount, setTransportAmount] = useState()
  const handleExpenseType = (type) => {
    if (type === 1) {
      setPopup(true);
      setExpenseType(type);
    }
    else {
      setExpenseType(type);
      setPopup(false)
    }
  }
  // 
  const xmlObject = {
    n_ExpenseType: expenseType,
    t_amount: amount,
    d_date: expenseDate,
    t_description: description,
    t_ExpenseAttachment: attachment,
    t_TransportType: transportType,
    t_Distance: distance,
    t_rate: rate,
    Status: item?.n_Status || 0,
    ExpenseMapId: item?.a_ReimbursementExpenseMapId || 0
  }
  ExpenseMapArray[index] = xmlObject;
  const handleTransportSave = () => {
    setAmount(`${distance * rate}`)
  }
  return (
    <>
      {/* <Modal animationType='fade' transparent={true} visible={Popup}>
        <View style={{ flex: 1 ,width:'80%',justifyContent:'center', backgroundColor:'#fff'}}>
        <TouchableOpacity
              onPress={() => {
                setPopup(false)
              }}
              style={{ position: 'absolute', bottom: 20, right: 20, zIndex: 2, padding: 18, backgroundColor: 'green', borderRadius: 100 }}>
              <View>
                <Icon name="plus" color="#fff" size={30} />
              </View>
            </TouchableOpacity>
          <View>
            <Text>Transport Detail</Text>
            <View>
            <Picker
                    style={{ height: 55, width: '100%' }}
                    selectedValue={transportType}
                    onValueChange={(itemValue, itemIndex) =>
                      setTransportType(itemValue)
                    }>
                    <Picker.Item label='Select' value={0} />
                    <Picker.Item label='Cab' value={1} />
                    <Picker.Item label='Auto' value={2} />
                    <Picker.Item label='Bike' value={3} />
                    <Picker.Item label='Car' value={4} />
                    <Picker.Item label='Others' value={5} />
                  </Picker>
            </View>
          </View>
        </View>
      </Modal> */}
      <Modal animationType="fade" transparent={true} visible={Popup}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: "center", }}>
          <View style={{ paddingBottom: 25, padding: 10, width: '90%', borderRadius: 10, backgroundColor: '#90d3f9', borderWidth: 1, borderColor: '#0d76d5' }}>
            <TouchableOpacity style={{ alignSelf: 'flex-end', padding: 5 }} onPress={() => setPopup(false)}>
              <Icon name="close-circle" size={20} color="#000" />
            </TouchableOpacity>
            <Text style={{ alignSelf: 'center', color: '#000', padding: 10, fontSize: 18, fontFamily: 'RobotoSlab-Regular' }}>Transport Detail</Text>
            <Text style={{ fontFamily: 'RobotoSlab-Regular', marginTop: 10, paddingBottom: 5 }}>Transport</Text>
            <InputGroup style={{ justifyContent: 'space-around' }}>
              <Picker
                style={{ height: 55, width: '100%' }}
                selectedValue={transportType}
                onValueChange={(itemValue, itemIndex) =>
                  setTransportType(itemValue)
                }>
                <Picker.Item label='Select' value={0} />
                <Picker.Item label='Cab' value={1} />
                <Picker.Item label='Auto' value={2} />
                <Picker.Item label='Bike' value={3} />
                <Picker.Item label='Car' value={4} />
                <Picker.Item label='Others' value={5} />
              </Picker>
            </InputGroup>

            <Text style={{ fontFamily: 'RobotoSlab-Regular', marginTop: 10, paddingBottom: 5 }}>Distance(KM)</Text>
            <InputGroup style={{ justifyContent: 'space-around' }}>
              <Input value={distance} onChangeText={(text) => setDistance(text)} />
            </InputGroup>

            <Text style={{ fontFamily: 'RobotoSlab-Regular', marginTop: 10, paddingBottom: 5 }}>Rate(Rs)</Text>
            <InputGroup style={{ justifyContent: 'space-around' }}>
              <Input value={rate} onChangeText={(text) => setRate(text)} />
            </InputGroup>

            <Text style={{ fontFamily: 'RobotoSlab-Regular', marginTop: 10, paddingBottom: 5 }}>Amount</Text>
            <InputGroup style={{ justifyContent: 'space-around' }}>
              <Input editable={false} value={`${distance * rate}`} />
            </InputGroup>

            <Button title='Save' onPress={handleTransportSave} />
            <View>


            </View>
          </View>
        </View>
      </Modal>
      <View key={index}>
        <Srnumber>
          <Icon name='trash-can' color='#fff' size={25} />
        </Srnumber>

        <Tasklist1>
          <Taskborder>
            <Grid>
              <Col>
                <ExpenseText >Expense Type</ExpenseText>
              </Col>
              <Col style={{ width: '60%' }}>
                <InputGroup>
                  <Picker
                    style={{ height: 55, width: '100%' }}
                    selectedValue={expenseType}
                    onValueChange={(itemValue, itemIndex) =>
                      handleExpenseType(itemValue)
                    }>
                    <Picker.Item label='Select' value={0} />
                    <Picker.Item label='Transport' value={1} />
                    <Picker.Item label='Hotel' value={2} />
                    <Picker.Item label='Fuel' value={3} />
                    <Picker.Item label='Meals' value={4} />
                    <Picker.Item label='Phone' value={5} />
                    <Picker.Item label='Entertainment' value={6} />
                    <Picker.Item label='Miscellaneous' value={7} />
                  </Picker>
                </InputGroup>
              </Col>
            </Grid>
          </Taskborder>
          <Taskborder>
            <Grid>
              <Col>
                <ExpenseText >
                  Amount
              </ExpenseText>
              </Col>
              <Col style={{ width: '60%' }}>
                <InputGroup>
                  <Input value={amount} style={{ alignSelf: 'center', fontSize: 14 }}
                    onChangeText={(text) => setAmount(text)} />
                </InputGroup>
              </Col>
            </Grid>
          </Taskborder>
          <Taskborder>
            <Grid>
              <Col>
                <ExpenseText >Expense Date	</ExpenseText>
              </Col>
              <Col style={{ width: '60%' }}>
                <InputGroup>
                  <Input value={expenseDate} style={{ alignSelf: 'center', fontSize: 14 }}
                    onChangeText={(text) => setExpenseDate(text, 'd_date')}
                  />
                </InputGroup>
              </Col>
            </Grid>
          </Taskborder>

          <Taskborder>
            <Grid>
              <Col>
                <ExpenseText >Description</ExpenseText>
              </Col>
              <Col style={{ width: '60%' }}>
                <InputGroup>
                  <Input value={description} style={{ alignSelf: 'center', fontSize: 14 }}
                    onChangeText={(text) => setDescription(text)}
                  />
                </InputGroup>
              </Col>
            </Grid>
          </Taskborder>

          <Taskborder>
            <Grid>
              <Col>
                <ExpenseText >Attachment</ExpenseText>
              </Col>
              <Col style={{ width: '60%' }}>
                <InputGroup>
                  <Input placeholder=' Choose File' style={{ alignSelf: 'center', fontSize: 14 }}
                    onChangeText={(text) => setAttachment(text)}
                  />
                </InputGroup>

              </Col>
            </Grid>
          </Taskborder>
        </Tasklist1>

      </View>
    </>
  )
}

class Expenseaddform extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Popup: false,
      profileData: [],
      selectedProject: 0,
      EmpTaskListByProject: [],
      selectedTask: '',
      taskId: null,
      ExpenseListByTask: [],
      xmlArray: [],
      xmlObject: {}
    };
  }
  componentDidMount() {
    this._onRefresh();
  }
  _onRefresh = async () => {
    await this.props.getProfileData();

    this.setState({ profileData: this.props.profileData });
    await this.props.getDepartment();
    await this.props.getDesignation();
    await this.props.getEmployeeProjectList();
  }

  handleChange = async (text, name) => {
    await this.setState({ [name]: text });
  };
  handleTaskExpense = async (selectedTask, taskId, projectId) => {
    await this.props.getExpenseListByTask(projectId, taskId)
    this.setState({ Popup: true, selectedTask: selectedTask, selectedProject: projectId, taskId: taskId, ExpenseListByTask: this.props.ExpenseListByTask });
  };

  handleTaskList = async (ProjectId) => {

    await this.props.getEmployeeTaskListByProject(ProjectId);
    this.setState({ EmpTaskListByProject: this.props.EmpTaskListByProject, selectedProject: ProjectId, })
  }

  handleAddExpense = async () => {
    ExpenseMapArray = [];
    const expenseObj = {}
    const prevState = [];
    await this.state.ExpenseListByTask?.map(e => {
      prevState.push(e)
    })
    prevState.push(expenseObj)

    this.setState({ ExpenseListByTask: prevState })
  }


  handleExpenseSave = async (projectId, taskId, ReimbursementID) => {
    let mode = '';
    if (this.props.ExpenseListByTask?.length === 0) {
      mode = 'SUBMIT'
    }
    else {
      mode = 'UPDATE'
    }

    const objStr = JSON.stringify(ExpenseMapArray).toString();
    const userInfo = JSON.parse(await getData('UserInfo'));

    const postObj = {
      a_ReimbursementID: ReimbursementID || 0,
      n_Employees_Id: userInfo?.a_EmployeeID,
      n_CreatedBy: userInfo?.n_UserId,
      t_CreatedIP: '192.168.1.185',
      d_CreatedOn: '2020-05-25',
      n_ModifiedBy: userInfo?.n_UserId,
      t_ModifiedIP: '192.168.1.185',
      d_ModifiedOn: '2020-05-25',
      t_Mode: mode,
      n_ProjectId: projectId,
      n_TaskId: taskId,
      t_department: 2,
      t_designation: 2,
      t_reportingmanager: 544,
      XmlReimbursementMap: objStr,
      n_Total: 1000
    }

    console.log('postObj', postObj)
    await this.props.saveExpenseListByProject(postObj)
  }

  static getDerivedStateFromProps(Props, State) {
    if (State.EmpTaskListByProject !== Props.EmpTaskListByProject) {
      return {
        EmpTaskListByProject: Props.EmpTaskListByProject
      }
    }
    return null;
  }


  render() {
    const { Popup, profileData, selectedProject, taskId, EmpTaskListByProject, selectedTask, ExpenseListByTask } = this.state;
    const { EmpProjectList, } = this.props;
    let DepartmentName = '';
    let Designation = '';
    let totalAmount = '';
    const ReimbursementID = ExpenseListByTask.length && ExpenseListByTask[0]?.n_ReimbursementId;
    totalAmount = ExpenseListByTask?.map(e => { return (totalAmount + e.t_Amount) });

    if (this.props.departmentData?.length !== 0) {
      const GetDepartment = this.props.departmentData.filter(e => e.a_DepartmentId === profileData?.n_DepartmentId);
      DepartmentName = GetDepartment[0]?.t_DepartmentName;
    }
    if (this.props.designationData?.length !== 0) {
      const getDesignation = this.props.designationData.filter(e => e.a_DesignationId === profileData?.n_DesignationId);
      Designation = getDesignation[0]?.Designation;
    }
    return (
      <>
        <Modal animationType='slide' transparent={true} visible={Popup}>

          <View style={{ backgroundColor: '#000000aa', flex: 1, paddingBottom: 50 }}>
            <TouchableOpacity
              onPress={() => {
                this.handleAddExpense()
              }}
              style={{ position: 'absolute', bottom: 20, right: 20, zIndex: 2, padding: 18, backgroundColor: 'green', borderRadius: 100 }}>
              <View>
                <Icon name="plus" color="#fff" size={30} />
              </View>
            </TouchableOpacity>
            <View style={{ backgroundColor: '#0072e6' }}>
              <CloseButton
                style={{ marginTop: 5, marginRight: 5 }}
                onPress={() => this.setState({ Popup: false })}>
                <Icon name="close-circle" color="#fff" size={30} />
              </CloseButton>
              <TaskTitle>
                Task Name: {selectedTask}
              </TaskTitle>
            </View>
            <ModalTopContent>
              <ScrollView>
                {ExpenseListByTask?.map((item, index) => {
                  return (
                    <ExpenseItem key={index} item={item} index={index} handleExpenseChange={this.handleExpenseChange} />
                  )
                })}
                <Taskborder>
                  <Grid>
                    <Col>
                      <ExpenseText >Total Amount</ExpenseText>
                    </Col>
                    <Col style={{ width: '60%' }}>
                      <InputGroup>
                        <Input editable={false} value={totalAmount[0]} style={{ alignSelf: 'center', fontSize: 14 }} />
                      </InputGroup>
                    </Col>
                  </Grid>
                </Taskborder>

                {ExpenseListByTask.length && (<Grid >
                  <Col>
                    <TouchableOpacity
                      style={{
                        marginTop: 10,
                        marginBottom: 20,
                        borderRadius: 15,
                        backgroundColor: 'green',
                        marginLeft: 5,
                        marginRight: 5
                      }}
                      onPress={() => this.handleExpenseSave(selectedProject, taskId, ReimbursementID)}
                    >
                      <Text style={{ width: '100%', padding: 13, textAlign: 'center', color: '#fff', fontSize: 18, }}>
                        Save
                      </Text>

                    </TouchableOpacity>
                  </Col>
                  <Col>
                    <TouchableOpacity
                      style={{
                        marginTop: 10,
                        marginBottom: 20,
                        borderRadius: 15,
                        marginLeft: 5,
                        marginRight: 5,
                        backgroundColor: 'red'
                      }}
                      onPress={() => this.setState({ Popup: false })}
                    >

                      <Text style={{ width: '100%', padding: 13, textAlign: 'center', color: '#fff', fontSize: 18, }}>
                        Cancel
                    </Text>

                    </TouchableOpacity>
                  </Col>
                </Grid>)}
              </ScrollView>
            </ModalTopContent>
          </View>
        </Modal>

        <ScrollView style={{ marginBottom: 50 }}>
          <View style={{ paddingLeft: 10, marginTop: 5, paddingRight: 10 }}>
            <ExpenseText style={{ marginTop: 15 }}>Employee Name</ExpenseText>
            <InputGroup>
              <Input
                editable={false}
                value={`${profileData?.t_First_Name} ${profileData?.t_Last_Name}`}
                onChangeText={text => this.handleChange(text, 'Supre')}
              />
            </InputGroup>

            <ExpenseText style={{ marginTop: 15 }}>Department</ExpenseText>
            <InputGroup>
              <Input
                editable={false}
                value={DepartmentName}
                onChangeText={text =>
                  this.handleChange(text, 'Sales & Marketing')
                }
              />
            </InputGroup>

            <ExpenseText style={{ marginTop: 15 }}>Designation</ExpenseText>
            <InputGroup>
              <Input
                editable={false}
                value={Designation}
                onChangeText={text => this.handleChange(text, 'Sale Head')}
              />
            </InputGroup>

            <ExpenseText style={{ marginTop: 15 }}>Employee ID</ExpenseText>
            <InputGroup>
              <Input
                editable={false}
                value={`${profileData?.a_EmployeeId}`}
                onChangeText={text => this.handleChange(text, '111')}
              />
            </InputGroup>

            <ExpenseText style={{ marginTop: 15 }}>Reporting Manager Id</ExpenseText>
            <InputGroup>
              <Input
                editable={false}
                value={profileData?.n_ReportingManagerId !== null ? `${profileData?.n_ReportingManagerId}` : 'N/A'}
                onChangeText={text => this.handleChange(text, '111')}
              />
            </InputGroup>

            <ExpenseText style={{ marginTop: 15 }}>Project</ExpenseText>
            <InputGroup>
              <Picker
                style={{ height: 55, width: '100%' }}
                selectedValue={selectedProject}
                onValueChange={(itemValue, itemIndex) =>
                  this.handleTaskList(itemValue)

                }>
                <Picker.Item key={0} label='Select' value={0} />
                <Picker.Item key={1} label='Non Project' value={-1} />
                {EmpProjectList && EmpProjectList.map((e, i) => {
                  return (
                    <Picker.Item key={i + 2} label={e.t_ProjectTitle} value={e.a_ProjectId} />
                  )
                })}

              </Picker>
            </InputGroup>

            {EmpTaskListByProject.length ? (
              <>
                <ExpenseText style={{ marginTop: 15 }}>Tasks</ExpenseText>
                <View style={{ backgroundColor: '#fff', padding: 10, borderRadius: 5 }}>
                  {EmpTaskListByProject.map((e, i) => {
                    return (
                      <Customborder key={i} onPress={() => this.handleTaskExpense(e?.t_TaskTitle, e?.a_TaskId, e?.n_ProjectId)}>
                        <View style={{ flexDirection: 'row' }}>
                          <View style={{ flexDirection: 'row' }}>
                            <Customtext>
                              <Text style={{ color: '#000', fontFamily: 'RobotoSlab-Regular' }}>
                                {e?.t_TaskTitle}
                              </Text>
                            </Customtext>
                          </View>
                        </View>
                      </Customborder>
                    )
                  })}
                </View>
              </>
            ) : null}


          </View>
        </ScrollView>
      </>
    );
  }
}

const mapStateToProps = state => {
  const taskName = state.CreateTaskReducer.taskName;
  const profileData = state.MyProfileReducer.profileData;
  const departmentData = state.MyProfileReducer.departmentData;
  const designationData = state.MyProfileReducer.designationData;
  const EmpProjectList = state.ExpenseReducer.EmpProjectList;
  const EmpTaskListByProject = state.ExpenseReducer.EmpTaskListByProject;
  const ExpenseListByTask = state.ExpenseReducer.ExpenseListByTask;
  const SaveExpenseListByTask = state.ExpenseReducer.ExpenseListByTask;
  return { taskName, profileData, departmentData, designationData, saveExpenseListByProject, EmpProjectList, EmpTaskListByProject, ExpenseListByTask };
};

export default connect(
  mapStateToProps,
  {
    handlechangetask,
    getProfileData,
    getDepartment,
    getDesignation,
    getEmployeeProjectList,
    getExpenseListByTask,
    getEmployeeTaskListByProject
  },
)(Expenseaddform);
