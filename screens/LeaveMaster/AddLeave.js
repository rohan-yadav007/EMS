import React, { Component, useState } from 'react';
import { Text, View, RefreshControl, Button, Modal, TouchableOpacity, } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/Feather';
import Icon4 from "react-native-vector-icons/MaterialCommunityIcons";
import { Col, Grid } from 'react-native-easy-grid';
import { connect } from 'react-redux';
import { getApplierList, getLeaveDataById } from '../../redux/Action/Leave.action';
import { Srnumber, Tasklist1, Taskboder, } from '../../css/TaskList.css';

import { Searchbox, CustomInput } from '../../css/AddLeave.css';
import { FlatList } from 'react-native-gesture-handler';

const ViewAppliedLeave = ({ item, changeLeaveStatus, HandleModalClose }) => {
  const formDate = (date) => {
    return new Date(date).getFullYear() + '-' + ((new Date(date)).getMonth() + 1) + '-' + (new Date(date)).getDate()
  };
  return (
    <>

      <View >
        <Text style={{ fontSize: 20,  fontFamily:'RobotoSlab-Bold', color: 'red', alignSelf: 'center' }}>Applied Leave</Text>
        <View style={{ flexDirection: 'row', padding: 15, justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 15,  fontFamily:'RobotoSlab-Bold' }}>Employee Name</Text>
          <Text style={{ width: '60%', textAlign: 'center', fontSize: 15, fontFamily:'RobotoSlab-Regular' }}>{item?.ApplierName}</Text>
        </View>
        <View style={{ flexDirection: 'row', padding: 15, justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 15, fontFamily:'RobotoSlab-Bold' }}>Username</Text>
          <Text style={{ width: '60%', textAlign: 'center', fontSize: 15 , fontFamily:'RobotoSlab-Regular'}}>{item?.UserName}</Text>
        </View>
        <View style={{ flexDirection: 'row', padding: 15, justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 15,  fontFamily:'RobotoSlab-Bold' }} >From Date</Text>
          <Text style={{ width: '60%', textAlign: 'center', fontSize: 15, fontFamily:'RobotoSlab-Regular' }}>{formDate(item?.d_FromDate)}</Text>
        </View>
        <View style={{ flexDirection: 'row', padding: 15, justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 15,  fontFamily:'RobotoSlab-Bold' }}>To Date</Text>
          <Text style={{ width: '60%', textAlign: 'center', fontSize: 15, fontFamily:'RobotoSlab-Regular' }}>{formDate(item?.d_ToDate)}</Text>
        </View>
        <View style={{ flexDirection: 'row', padding: 15, justifyContent: 'space-between' }}>
          <Text style={{ width: '40%', fontSize: 15,  fontFamily:'RobotoSlab-Bold' }}>Total Days</Text>
          <Text style={{ width: '60%', textAlign: 'center', fontSize: 15, fontFamily:'RobotoSlab-Regular' }}>{item?.n_TotalDays}</Text>
        </View>
        <View style={{ flexDirection: 'row', padding: 15, justifyContent: 'space-between' }}>
          <Text style={{ width: '40%', fontSize: 15,  fontFamily:'RobotoSlab-Bold' }}>Reason</Text>
          <Text style={{ width: '60%', textAlign: 'center', fontSize: 15, fontFamily:'RobotoSlab-Regular' }}>{item?.t_Reason}</Text>
        </View>
        <View style={{ flexDirection: 'row', padding: 15, justifyContent: 'space-between' }}>
          <Text style={{ width: '40%', fontSize: 15,  fontFamily:'RobotoSlab-Bold' }}>Status</Text>
          <Text style={{ width: '60%', textAlign: 'center', fontSize: 15, fontFamily:'RobotoSlab-Regular' }}>{item?.t_StatusRM}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Button title='Close' onPress={() => HandleModalClose()} />
        </View>

      </View>
    </>
  )
}


const Item = ({ item, index, SetTabFromProp, getLeaveDataById, leaveData }) => {
  const fromDate = item?.d_FromDate.split('T')[0];
  const toDate = item?.d_ToDate.split('T')[0];
  const [PopupShow, setPopupShow] = useState(false);


  const HandleModalClose = () => {
    setPopupShow(false)
  }
  const HandleModalOpen = async (leaveId) => {
    await getLeaveDataById(leaveId);
    setPopupShow(true)
  }
  return (
    <>
      <Modal animationType="fade" transparent={true} visible={PopupShow}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: "center", }}>
          <View style={{ paddingBottom: 25, marginTop: '15%', width: '95%', borderRadius: 10, backgroundColor: '#fff', borderWidth: 1 }}>
            <TouchableOpacity style={{ alignSelf: 'flex-end', padding: 5 }} onPress={() => HandleModalClose()}>
              <Icon4 name="close-circle" size={20} color="#000" />
            </TouchableOpacity>
            <ViewAppliedLeave HandleModalClose={HandleModalClose} item={{ ...item, ...leaveData }} />
          </View>
        </View>
      </Modal>
      <View>
        <Srnumber>
          <Text>Sr No {index + 1} </Text>
        </Srnumber>
        <Tasklist1>
          <Taskboder>
            <Grid>
              <Col>
                <Text style={{ fontFamily:'RobotoSlab-Bold' }}>Applier Name</Text>
              </Col>
              <Col style={{ width: '60%' }}>
                <Text style={{ alignSelf: 'center', fontSize: 14 , fontFamily:'RobotoSlab-Regular'}}>
                  {item?.ApplierName}
                </Text>
              </Col>
            </Grid>
          </Taskboder>
          <Taskboder>
            <Grid>
              <Col>
                <Text style={{ fontFamily:'RobotoSlab-Bold' }}>
                  Reporting Manager Status
          </Text>
              </Col>
              <Col style={{ width: '60%' }}>
                <Text style={{ alignSelf: 'center', fontSize: 14 , fontFamily:'RobotoSlab-Regular'}}>
                  {item?.t_StatusRM}
                </Text>
              </Col>
            </Grid>
          </Taskboder>
          <Taskboder>
            <Grid>
              <Col>
                <Text style={{ fontFamily:'RobotoSlab-Bold' }}>User Name</Text>
              </Col>
              <Col style={{ width: '60%' }}>
                <Text style={{ alignSelf: 'center', fontSize: 14, fontFamily:'RobotoSlab-Regular' }}>
                  {item?.UserName}
                </Text>
              </Col>
            </Grid>
          </Taskboder>

          <Taskboder>
            <Grid>
              <Col>
                <Text style={{  fontFamily:'RobotoSlab-Bold' }}>Leave Date</Text>
              </Col>
              <Col style={{ width: '60%' }}>
                <Text style={{ alignSelf: 'center', fontSize: 14, fontFamily:'RobotoSlab-Regular' }}>
                  {fromDate} to {toDate}
                </Text>
              </Col>
            </Grid>
          </Taskboder>

          <Taskboder>
            <Grid>
              <Col>
                <Text style={{ fontFamily:'RobotoSlab-Bold' }}>Status</Text>
              </Col>
              <Col style={{ width: '60%' }}>
                <Text style={{ alignSelf: 'center', fontSize: 14 , fontFamily:'RobotoSlab-Regular'}}>
                  Active
          </Text>
              </Col>
            </Grid>
          </Taskboder>

          <Taskboder>
            <Grid style={{ alignContent: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ width: '40%' }}>
                <Text style={{ fontFamily:'RobotoSlab-Bold' }}>Actions</Text>
              </View>
              <View style={{ width: '60%', justifyContent: 'space-around', flexDirection: 'row', }}>
                <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => HandleModalOpen(item?.a_ApplyLeaveId)}>
                  <Icon2 name="eye" size={25} color="#000" />
                </TouchableOpacity>

                {item?.t_StatusRM !== 'Approved' ?
                  <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => SetTabFromProp('tab2', item.a_ApplyLeaveId)}>
                    <Icon3 name="edit" size={25} color="#ed0631" />
                  </TouchableOpacity>
                  : null}
              </View>
            </Grid>
          </Taskboder>
        </Tasklist1>
      </View>
    </>
  )
}

class AddLeave extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ApplierList: [],
      refreshing: false,
      PopupShow: false,
      PopupAutoClose: false,
    }
  }
  async componentDidMount() {
    await this._onRefresh();
  }
  _onRefresh = async () => {
    this.setState({ refreshing: true });
    await this.props.getApplierList();
    await this.setState({ ApplierList: this.props.ApplierList });
    this.setState({ refreshing: false })
  }
  render() {
    const { ApplierList } = this.props;
    const { refreshing } = this.state;
    return (
      <>

        <View style={{ marginBottom: 100, paddingTop: 10, }}>
          <View style={{ height: 50 }}>
            <Grid >
              <Col style={{ width: '80%' }}>
                <View>
                  <CustomInput placeholder="Search" />
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
          </View>
          <View style={{ marginBottom: '40%' }}>
            {ApplierList ?
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={this._onRefresh}
                  />}
                data={ApplierList}
                renderItem={({ item, index }) =>
                  <Item
                    item={item}
                    index={index}
                    SetTabFromProp={this.props.SetTabFromProp}
                    getLeaveDataById={this.props.getLeaveDataById}
                    leaveData={this.props.leaveData}
                  />}
                keyExtractor={item => `${item?.a_ApplyLeaveId}`}
              />
              : null}
          </View>
        </View>
      </>
    );
  }
}
const mapStateToProps = state => {
  const ApplierList = state.LeaveReducer.ApplierList;
  const leaveData = state.LeaveReducer.leaveData;
  return { ApplierList, leaveData }
}
export default connect(mapStateToProps, { getApplierList, getLeaveDataById })(AddLeave)