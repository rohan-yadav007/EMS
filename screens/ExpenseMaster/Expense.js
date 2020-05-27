import React, { Component, useEffect, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  FlatList,
  RefreshControl,
  Button,
} from 'react-native';
import Header from '../../components/Header';
import { Searchbox } from '../../css/AddLeave.css';
import { NavigationContext } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/AntDesign';
import Icon4 from 'react-native-vector-icons/Feather';
import { Tasklist1, Taskboder, } from '../../css/TaskList.css';
import { Tablelist1 } from '../../css/Expense.css';
import { Picker } from '@react-native-community/picker';
import { Col, Grid } from 'react-native-easy-grid';
import { connect } from 'react-redux';
import { getExpenseList, getEmployeeList, getProjectList } from '../../redux/Action/Expense.action';
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
              <Text style={{ fontWeight: 'bold' }}>Status</Text>
            </Col>
            <Col style={{ width: '60%' }}>
              <Text style={{ alignSelf: 'center', fontSize: 14 }}>
                {renderItem.t_status}
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
                <Icon3 name="eye" size={25} color="#000" />
              </TouchableOpacity>

              <Col />
            </Col>
          </Grid>
        </Taskboder>
      </Tasklist1>
    </View>
  )
}

const ClaimRefItem = ({ item, index }) => {

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
                {renderItem?.t_ProjectName}
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
              <Text style={{ fontWeight: 'bold' }}>Project Name</Text>
            </Col>
            <Col style={{ width: '60%' }}>
              <Text style={{ alignSelf: 'center', fontSize: 14 }}>
                {renderItem?.t_ProjectName}
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
                {renderItem?.t_TaskName}
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
                {renderItem?.t_TotalExpense}
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
                {renderItem?.t_ApprovedAmount}
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
                {renderItem?.t_PendingAmount}
              </Text>
            </Col>
          </Grid>
        </Taskboder>

        <Taskboder>
          <Grid>
            <Col>
              <Text style={{ fontWeight: 'bold' }}>Status</Text>
            </Col>
            <Col style={{ width: '60%' }}>
              <Text style={{ alignSelf: 'center', fontSize: 14 }}>
                {renderItem?.t_status}
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
              <View style={{ alignSelf: 'center' }}>
                <Icon3 name="eye" size={25} color="#000" />
              </View>

              <Col />
            </Col>
          </Grid>
        </Taskboder>
      </Tasklist1>
      <Button title='Back' />
    </View>)
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
    console.log(itemData)
    await this.setState({ ShowClaimRef: itemData })
  }
  // static getDerivedStateFromProps(props, state) {
  //   if (props.ExpenseList !== state.ExpenseList) {
  //     return {
  //       ExpenseList: props.ExpenseList
  //     }
  //   }

  //   return null
  // }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.ExpenseList !== this.props.ExpenseList) {

      this.setState({ ExpenseList: this.props.ExpenseList });
    }
    if (prevState.selected !== this.state.selected) {

      await this.setState({  selectedProject: null, selectedEmployee: null, fromDate: null, toDate: null, });
      this._onRefresh()
    }
  }
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

          {ShowClaimRef ? <ClaimRefItem item={ShowClaimRef} /> : null}
          {!ShowClaimRef ? <FlatList
          style={{marginBottom:260}}
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
  const AllProjectList = state.ExpenseReducer.AllProjectList
  return { ExpenseList, AllEmployeeList, AllProjectList }
}
export default connect(mapStateToProps, { getExpenseList, getEmployeeList, getProjectList })(Expense)