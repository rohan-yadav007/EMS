import React, { Component, useEffect, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  FlatList,
  RefreshControl,
  Modal,
} from 'react-native';
import Header from '../../components/Header';
import { Searchbox } from '../../css/AddLeave.css';
import { NavigationContext } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon4 from 'react-native-vector-icons/Feather';
import { Taskboder, } from '../../css/TaskList.css';
import { Tablelist1, ExpenseText, TaskTitle, ModalTopContent, Input, NavButton, Srnumber, Tasklist1, Taskborder, CloseButton, Customborder, InputGroup, Customtext } from '../../css/Expense.css';
import { Picker } from '@react-native-community/picker';
import { Col, Grid } from 'react-native-easy-grid';
import { connect } from 'react-redux';
import { getExpenseList, ExpenseListByReimbursementID, getEmployeeList, getProjectList } from '../../redux/Action/Expense.action';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ScrollView } from 'react-native-gesture-handler';

const Item = ({ item, index, handleClaimRef }) => {

  // const [renderItem, setRenderItem] = useState(item)
  // useEffect(() => setRenderItem(item));
  const renderItem = item;
  return (
    <View >
      <ImageBackground
        style={{ padding: 12 }}
        source={require('../../static/approval_bg.png')}>
        <Tablelist1>So No ({index + 1})</Tablelist1>
      </ImageBackground>

      <Tasklist1>
        <Taskboder>
          <Grid>
            <Col>
              <Text style={{ fontWeight: 'bold' }}>Claim Ref No</Text>
            </Col>
            <Col style={{ width: '60%' }}>
              <Text style={{ alignSelf: 'center', fontSize: 14 }}>
                {renderItem?.t_ClaimRefNumber}
              </Text>
            </Col>
          </Grid>
        </Taskboder>
        <Taskboder>
          <Grid>
            <Col>
              <Text style={{ fontWeight: 'bold' }}>Project Name</Text>
            </Col>
            <Col style={{ width: '60%' }}>
              <Text style={{ alignSelf: 'center', fontSize: 14 }}>
                {renderItem.t_ProjectName}
              </Text>
            </Col>
          </Grid>
        </Taskboder>
        <Taskboder>
          <Grid>
            <Col>
              <Text style={{ fontWeight: 'bold' }}>Employee Name</Text>
            </Col>
            <Col style={{ width: '60%' }}>
              <Text style={{ alignSelf: 'center', fontSize: 14 }}>
                {renderItem?.t_EmployeeName}
              </Text>
            </Col>
          </Grid>
        </Taskboder>

        <Taskboder>
          <Grid>
            <Col>
              <Text style={{ fontWeight: 'bold' }}>Task Name</Text>
            </Col>
            <Col style={{ width: '60%' }}>
              <Text style={{ alignSelf: 'center', fontSize: 14 }}>
                {renderItem.t_TaskName}
              </Text>
            </Col>
          </Grid>
        </Taskboder>

        <Taskboder>
          <Grid>
            <Col>
              <Text style={{ fontWeight: 'bold' }}>Total Expense</Text>
            </Col>
            <Col style={{ width: '60%' }}>
              <Text style={{ alignSelf: 'center', fontSize: 14 }}>
                {renderItem.t_TotalExpense}
              </Text>
            </Col>
          </Grid>
        </Taskboder>

        <Taskboder>
          <Grid>
            <Col>
              <Text style={{ fontWeight: 'bold' }}>Approved Amt</Text>
            </Col>
            <Col style={{ width: '60%' }}>
              <Text style={{ alignSelf: 'center', fontSize: 14 }}>
                {renderItem.t_ApprovedAmount}
              </Text>
            </Col>
          </Grid>
        </Taskboder>

        <Taskboder>
          <Grid>
            <Col>
              <Text style={{ fontWeight: 'bold' }}>Pending Amt</Text>
            </Col>
            <Col style={{ width: '60%' }}>
              <Text style={{ alignSelf: 'center', fontSize: 14 }}>
                {renderItem.t_PendingAmount}
              </Text>
            </Col>
          </Grid>
        </Taskboder>

        <Taskboder>
          <Grid>
            <Col>
              <Text style={{ fontWeight: 'bold' }}>Actions</Text>
            </Col>
            <Col style={{ width: '60%' }}>
              <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => handleClaimRef(renderItem)}>
                <Icon name="eye" size={25} color="#000" />
              </TouchableOpacity>

              <Col />
            </Col>
          </Grid>
        </Taskboder>
      </Tasklist1>
    </View>
  )
}

const ExpenseItem = ({ item, index, handleExpenseChange, handleDeleteExpense }) => {

  const [Popup, setPopup] = useState(false);
  const [expenseType, setExpenseType] = useState(item?.n_ExpenseTypeId || 0);
  const [amount, setAmount] = useState(`${item?.t_Amount || 0}`);
  const [expenseDate, setExpenseDate] = useState(item?.d_ExpenseDate || '');
  const [description, setDescription] = useState(item?.t_Description);
  const [attachment, setAttachment] = useState('');
  const [transportType, setTransportType] = useState(0);
  const [distance, setDistance] = useState('');
  const [rate, setRate] = useState('');
  const [transportAmount, setTransportAmount] = useState();
  let ExpenseStatus = '';
  if (item.t_ExpenseStatus === 1) {
    ExpenseStatus = 'Pending'
  }
  if (item.t_ExpenseStatus === 2) {
    ExpenseStatus = 'Approved'
  }
  if (item.t_ExpenseStatus === 3) {
    ExpenseStatus = 'Rejected'
  }
  if (item.t_ExpenseStatus === 4) {
    ExpenseStatus = 'Hold'
  }
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

  return (
    <>

      <View key={index} style={{padding:10}}>
        <ImageBackground
          style={{ padding: 12 }}
          source={require('../../static/approval_bg.png')}>
          <Tablelist1>So No ({index + 1})</Tablelist1>
        </ImageBackground>

        <Tasklist1>
          <Taskborder>
            <Grid>
              <Col>
                <ExpenseText >Status</ExpenseText>
              </Col>
              <Col style={{ width: '60%' }}>
                <InputGroup>
                  <Input value={ExpenseStatus} style={{ alignSelf: 'center', fontSize: 14 }}
                    editable={false}
                  />
                </InputGroup>
              </Col>
            </Grid>
          </Taskborder>
          <Taskborder>
            <Grid>
              <Col>
                <ExpenseText >Remark</ExpenseText>
              </Col>
              <Col style={{ width: '60%' }}>
                <InputGroup>
                  <Input value={item.t_Remarks} style={{ alignSelf: 'center', fontSize: 14 }}
                    editable={false}
                  />
                </InputGroup>
              </Col>
            </Grid>
          </Taskborder>
          <Taskborder>
            <Grid>
              <Col>
                <ExpenseText >Expense Type</ExpenseText>
              </Col>
              <Col style={{ width: '60%' }}>
                <InputGroup>
                  <Picker
                    enabled={false}
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
                    editable={false} />
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
                    editable={false}
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
                    editable={false}
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
                    editable={false}
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

class Expense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ProjectList: [],
      EmployeeList: [],
      filterData: [],
      ExpenseList: [],
      selectedEmployee: null,
      selectedProject: null,
      fromDate: null,
      toDate: null,
      selectedDateType: '',
      DatePickerEnabled: false,
      refreshing: false,
      selected: 1,
      ShowClaimRef: null,
    }

  }

  async componentDidMount() {

    await this._onRefresh()

  }

  _onRefresh = async () => {
    const { selectedProject, selectedEmployee, fromDate, toDate, selected } = this.state;
    this.setState({ refreshing: true })
    await this.props.getExpenseList(selectedEmployee, selectedProject, fromDate, toDate, selected);
    await this.setState({ ExpenseList: this.props.ExpenseList, });
    await this.props.getEmployeeList();
    await this.props.getProjectList();
    if (this.props.AllProjectList.length !== 0 && this.props.AllEmployeeList.length !== 0) {

      await this.setState({ ProjectList: this.props.AllProjectList, EmployeeList: this.props.AllEmployeeList });

    }
    this.setState({ refreshing: false, });

  }

  handleSelect = async (value, name) => {
    await this.setState({ [name]: value });
    const { selectedProject, selectedEmployee, fromDate, toDate, selected } = this.state;
    await this.props.getExpenseList(selectedEmployee, selectedProject, fromDate, toDate, selected);
    await this.setState({ ExpenseList: this.props.ExpenseList })
  }
  handleDateSelect = async (name) => {
    const { selectedProject, selectedEmployee, fromDate, toDate, selected } = this.state;
    await this.setState({ DatePickerEnabled: true, selectedDateType: name })
    await this.props.getExpenseList(selectedEmployee, selectedProject, fromDate, toDate, selected);
  }
  onChange = (date) => {
    const parseDate = JSON.stringify(date)?.split('"')[1]?.split('T')[0];
    const { selectedDateType } = this.state;
    if (selectedDateType !== 'fromDate') {
      this.setState({ DatePickerEnabled: false, fromDate: parseDate })
    }
    else {
      this.setState({ DatePickerEnabled: false, toDate: parseDate })
    }

  }
  handleClaimRef = async (itemData) => {
console.log('itemData',itemData)
    await this.props.ExpenseListByReimbursementID(itemData.a_ReimbursementID, this.state.selected)


    this.setState({ ShowClaimRef: this.props.ExpenseListByRemId });


  }


  async componentDidUpdate(prevProps, prevState) {
    if (prevState.ExpenseList !== this.props.ExpenseList) {

      this.setState({ ExpenseList: this.props.ExpenseList });
    }
    if (prevState.selected !== this.state.selected) {

      await this.setState({ selectedProject: null, selectedEmployee: null, fromDate: null, toDate: null, });
      this._onRefresh()
    }
  }

  // static getDerivedStateFromProps(props, state) {
  //   if (props.ExpenseListByRemId !== state.ShowClaimRef) {
  //     return {
  //       ShowClaimRef: props.ExpenseListByRemId
  //     }
  //   }
  //   return null;
  // }
  render() {

    const { ExpenseList, ShowClaimRef, selected, selectedProject, ProjectList, selectedEmployee, EmployeeList, DatePickerEnabled, refreshing } = this.state;


    return (
      <>
        {DatePickerEnabled ? <DateTimePicker
          style={{ width: '100%', height: 55 }}
          // mode={mode}
          value={new Date()}
          // display={'date'}
          onChange={(event, date) => this.onChange(date)}

        /> : null}

        <View style={{ flexDirection: 'row', position: 'relative', paddingTop: 10 }}>

          <TouchableOpacity
            onPress={() => this.setState({ selected: 1 })}
            activeOpacity={0.8}
            style={{
              flex: 1,
              backgroundColor: selected === 1 ? 'red' : '#fff',
            }}>
            <Text style={{
              alignSelf: 'center', padding: 10,
              color: selected !== 1 ? '#000' : '#fff',
              fontFamily: 'RobotoSlab-Regular'
            }}>Pending</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => this.setState({ selected: 2 })}
            style={{
              flex: 1,
              backgroundColor: selected === 2 ? 'red' : '#fff',
            }}>
            <Text
              style={{
                alignSelf: 'center', padding: 10,
                color: selected !== 2 ? '#000' : '#fff',
                fontFamily: 'RobotoSlab-Regular'
              }}>Approved</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => this.setState({ selected: 3 })}
            style={{
              flex: 1,
              backgroundColor: selected === 3 ? 'red' : '#fff',
            }}>
            <Text
              style={{
                alignSelf: 'center', padding: 10,
                color: selected !== 3 ? '#000' : '#fff',
                fontFamily: 'RobotoSlab-Regular'
              }}>Rejected</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => this.setState({ selected: 4 })}
            style={{
              flex: 1,
              backgroundColor: selected === 4 ? 'red' : '#fff',
            }}>
            <Text
              style={{
                alignSelf: 'center', padding: 10,
                color: selected !== 4 ? '#000' : '#fff',
                fontFamily: 'RobotoSlab-Regular'
              }}>Hold</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingTop: 20 }}>
          <View style={{ width: '25%' }}>
            <Text style={{ fontFamily: 'RobotoSlab-Regular', alignSelf: 'center' }}>Project</Text>

            <Picker

              mode={"dialog"}
              selectedValue={selectedProject}
              onValueChange={(itemValue, itemIndex) => this.handleSelect(itemValue, 'selectedProject')}
              style={{ height: 50, }}>

              <Picker.Item key={0} label="Select" value={null} />
              {ProjectList?.map((e, i) => {
                return (
                  <Picker.Item key={i + 1} label={e.t_ProjectTitle} value={e.a_ProjectId} />
                )
              })}
            </Picker>
          </View>
          <View style={{ width: '25%' }}>
            <Text style={{ fontFamily: 'RobotoSlab-Regular', alignSelf: 'center' }}>Employee</Text>
            <Picker

              mode={"dialog"}
              selectedValue={selectedEmployee}
              onValueChange={(itemValue, itemIndex) => this.handleSelect(itemValue, 'selectedEmployee')}
              style={{ height: 50, alignItems: 'center' }}>

              <Picker.Item key={0} label="Select" value={null} />
              {EmployeeList?.map((e, i) => {
                return (
                  <Picker.Item key={i + 1} label={`${e.t_First_Name} ${e.t_Last_Name || ''}`} value={e.a_EmployeeId} />
                )
              })}
            </Picker>
          </View>
          <View style={{ width: '25%' }}>
            <Text style={{ fontFamily: 'RobotoSlab-Regular', alignSelf: 'center' }}>From Date</Text>
            <TouchableOpacity onPress={() => this.handleDateSelect('fromDate')}>
              <Icon style={{ alignSelf: 'center', paddingTop: 15 }} name="calendar" size={20} color="#2696f2" />
            </TouchableOpacity>

          </View>

          <View style={{ width: '25%' }}>
            <Text style={{ fontFamily: 'RobotoSlab-Regular', alignSelf: 'center' }}>To Date</Text>

            <TouchableOpacity onPress={() => this.handleDateSelect('toDate')}>
              <Icon style={{ alignSelf: 'center', paddingTop: 15 }} name="calendar" size={20} color="#2696f2" />
            </TouchableOpacity>

          </View>

        </View>

        <Grid style={{ marginBottom: 60 }}>
          <Col style={{ width: '80%' }}>
            <View>
              <TextInput
                style={{
                  height: 45,
                  backgroundColor: '#fff',
                  borderWidth: 1,
                  borderColor: '#d0d0d0',
                  borderRadius: 4,
                  marginBottom: 40,

                }}
                placeholder="Search"
              />
            </View>
          </Col>
          <Col>
            <View style={{ marginTop: 10, marginLeft: 10 }}>
              <Searchbox>
                <Text>
                  <Icon name="search1" size={25} />
                </Text>
              </Searchbox>
            </View>
          </Col>
        </Grid>
        <Modal animationType="fade" transparent={true} visible={ShowClaimRef ? true : false}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: "center", }}>
            <View style={{ width: '100%', height: '100%',  backgroundColor: '#0072e6', borderWidth: 1, borderColor: '#0d76d5' }}>

              <TouchableOpacity style={{ alignSelf: 'flex-end', padding: 5 }} onPress={() => this.setState({ ShowClaimRef: null })}>
                <Icon3 name="close-circle" size={25} color="#fff" />
              </TouchableOpacity>
              <Text style={{ fontFamily: 'RobotoSlab-Regular',color:'#fff', fontSize: 20, alignSelf: 'center', margin: 10, paddingBottom: 5 }}>Reimbursement List</Text>
              <ScrollView style={{ backgroundColor: '#fff' }}>
                <View style={{ padding: 20 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                    <Text style={{ fontFamily: 'RobotoSlab-Bold', marginTop: 10, paddingBottom: 5 }}>Claim Ref No</Text>
                    <Text style={{ fontFamily: 'RobotoSlab-Regular', marginTop: 10, paddingBottom: 5 }}>IIRIS/TSK/Claim/0001</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                    <Text style={{ fontFamily: 'RobotoSlab-Bold', marginTop: 10, paddingBottom: 5 }}>Employee Name</Text>
                    <Text style={{ fontFamily: 'RobotoSlab-Regular', marginTop: 10, paddingBottom: 5 }}>Ramesh</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                    <Text style={{ fontFamily: 'RobotoSlab-Bold', marginTop: 10, paddingBottom: 5 }}>Department</Text>
                    <Text style={{ fontFamily: 'RobotoSlab-Regular', marginTop: 10, paddingBottom: 5 }}>IT</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                    <Text style={{ fontFamily: 'RobotoSlab-Bold', marginTop: 10, paddingBottom: 5 }}>Designation</Text>
                    <Text style={{ fontFamily: 'RobotoSlab-Regular', marginTop: 10, paddingBottom: 5 }}>Project Manager</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                    <Text style={{ fontFamily: 'RobotoSlab-Bold', marginTop: 10, paddingBottom: 5 }}>Reporting Manager</Text>
                    <Text style={{ fontFamily: 'RobotoSlab-Regular', marginTop: 10, paddingBottom: 5 }}>KunalBhogal</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                    <Text style={{ fontFamily: 'RobotoSlab-Bold', marginTop: 10, paddingBottom: 5 }}>Project Name</Text>
                    <Text style={{ fontFamily: 'RobotoSlab-Regular', marginTop: 10, paddingBottom: 5 }}>N/A</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                    <Text style={{ fontFamily: 'RobotoSlab-Bold', marginTop: 10, paddingBottom: 5 }}>Task Name</Text>
                    <Text style={{ fontFamily: 'RobotoSlab-Regular', marginTop: 10, paddingBottom: 5 }}>ASAS</Text>
                  </View>
                </View>
                {console.log('ShowClaimRef', ShowClaimRef?.filter(e => e.t_ExpenseStatus === selected))}
                {ShowClaimRef?.filter(e => e.t_ExpenseStatus === selected)?.map((item, index) => {
                  return (<ExpenseItem key={index} item={item} index={index} handleClaimRef={this.handleClaimRef} />)
                })}
                {/* <FlatList
                 refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this._onRefresh} />}
                 refreshing={refreshing}
                 data={ShowClaimRef}
                 renderItem={({ item, index }) => <ExpenseItem item={item} index={index} handleClaimRef={this.handleClaimRef} />}
                 keyExtractor={(item) => `${item.a_ReimbursementExpenseMapId}`}
               > */}
              </ScrollView>


            </View>

          </View>
        </Modal>

        {!ShowClaimRef ? <FlatList
          style={{ marginBottom: 260 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this._onRefresh} />}
          refreshing={refreshing}
          data={ExpenseList}
          renderItem={({ item, index }) => <Item item={item} index={index} handleClaimRef={this.handleClaimRef} />}
          keyExtractor={(item) => `${item.t_ClaimRefNumber}`}
        /> : null}

      </>
    );
  }
}
const mapStateToProps = state => {
  const ExpenseList = state.ExpenseReducer.ExpenseList;
  const AllEmployeeList = state.ExpenseReducer.AllEmployeeList;
  const AllProjectList = state.ExpenseReducer.AllProjectList;
  const ExpenseListByRemId = state.ExpenseReducer.ExpenseListByRemId;
  return { ExpenseList, AllEmployeeList, ExpenseListByRemId, AllProjectList }
}
export default connect(mapStateToProps, { getExpenseList, getEmployeeList, ExpenseListByReimbursementID, getProjectList })(Expense)