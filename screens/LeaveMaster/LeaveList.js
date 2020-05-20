import React, { Component, useState, useEffect } from 'react';
import { Modal, Text, View, RefreshControl, TouchableOpacity, TextInput, Button } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/Feather';
import { Col, Grid } from 'react-native-easy-grid';
import { connect } from 'react-redux';
import { getPendingLeave, changeLeaveStatus, getApprovedLeave, getLeaveStatus } from '../../redux/Action/Leave.action';
import { Srnumber, Tasklist1, Taskboder, } from '../../css/TaskList.css';
import { Searchbox, CustomInput } from '../../css/AddLeave.css';
import { FlatList } from 'react-native-gesture-handler';
import Icon4 from "react-native-vector-icons/MaterialCommunityIcons"
import { Picker } from '@react-native-community/picker';
import { GetIP } from '../../utils/deviceInfo';
import { getData } from '../../utils/AsyncStorage';

const ViewAppliedLeave = ({ item, changeLeaveStatus, HandleModalClose }) => {
    const formDate = (date) => {
        return new Date(date).getFullYear() + '-' + ((new Date(date)).getMonth() + 1) + '-' + (new Date(date)).getDate()
    };
    return (
        <>

            <View >
                <Text style={{ fontSize: 20, fontFamily:'RobotoSlab-Bold', color: 'red', alignSelf: 'center' }}>Approved Leave</Text>
                <View style={{ flexDirection: 'row', padding: 15, justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 15, fontFamily:'RobotoSlab-Bold' }}>Employee Name</Text>
                    <Text style={{ width: '60%', textAlign: 'center', fontFamily:'RobotoSlab-Regular', fontSize: 15 }}>{item?.t_EmployeeName}</Text>
                </View>
               
                <View style={{ flexDirection: 'row', padding: 15, justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 15, fontFamily:'RobotoSlab-Bold' }} >From Date</Text>
                    <Text style={{ width: '60%', textAlign: 'center', fontFamily:'RobotoSlab-Regular', fontSize: 15 }}>{formDate(item?.d_FromDate)}</Text>
                </View>
                <View style={{ flexDirection: 'row', padding: 15, justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 15, fontFamily:'RobotoSlab-Bold' }}>To Date</Text>
                    <Text style={{ width: '60%', textAlign: 'center', fontFamily:'RobotoSlab-Regular', fontSize: 15 }}>{formDate(item?.d_ToDate)}</Text>
                </View>
                <View style={{ flexDirection: 'row', padding: 15, justifyContent: 'space-between' }}>
                    <Text style={{ width: '40%', fontSize: 15, fontFamily:'RobotoSlab-Bold' }}>Total Days</Text>
                    <Text style={{ width: '60%', textAlign: 'center', fontFamily:'RobotoSlab-Regular', fontSize: 15 }}>{item?.n_TotalDays}</Text>
                </View>
                <View style={{ flexDirection: 'row', padding: 15, justifyContent: 'space-between' }}>
                    <Text style={{ width: '40%', fontSize: 15, fontFamily:'RobotoSlab-Bold' }}>Status</Text>
                    <Text style={{ width: '60%', textAlign: 'center', fontFamily:'RobotoSlab-Regular', fontSize: 15 }}>{item?.t_StatusRM}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Button title='Close' onPress={() => HandleModalClose()} />
                </View>

            </View>
        </>
    )
}
const UpdateLeaveStatus = ({ item, changeLeaveStatus, HandleModalClose }) => {
    const [statusItem, setStatusItem] = useState(item);
    const [remark, setRemark] = useState('');
    const [leaveStatus, setLeaveStatus] = useState(null)
    useEffect(() => setStatusItem(item));
    const date = ((new Date).getFullYear()) + '-' + ((new Date).getMonth() + 1) + '-' + ((new Date).getDate());
    const formDate = (date) => { return new Date(date).getFullYear() + '-' + ((new Date(date)).getMonth() + 1) + '-' + (new Date(date)).getDate() };


    const postObj = {
        "n_ApplyLeaveId": item[0]?.a_ApplyLeaveId,
        "n_EmployeeId": item[0]?.n_EmployeeId,
        "t_Remarks": remark,
        "n_ApprovedBy": '',
        "n_Status": leaveStatus,
        "n_ApproveDays": item[0]?.n_TotalDays,
        "d_ApproveDate": date,
        "n_CreatedBy": '',
        "t_CreatedIP": "",
        "d_LeaveFrom": formDate(item[0]?.FromDate),
        "d_LeaveTo": formDate(item[0]?.ToDate),
        "n_GroupId": ''
    };
    return (
        <View >
            <Text style={{ fontSize: 20, fontFamily:'RobotoSlab-Bold', color: 'red', alignSelf: 'center' }}>Approve Leave</Text>
            <View style={{ flexDirection: 'row', padding: 15, justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 15, fontFamily:'RobotoSlab-Bold' }}>Employee Name</Text>
                <Text style={{ width: '60%', textAlign: 'center', fontFamily:'RobotoSlab-Regular', fontSize: 15 }}>{statusItem[0]?.t_EmployeeName}</Text>
            </View>
            <View style={{ flexDirection: 'row', padding: 15, justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 15, fontFamily:'RobotoSlab-Bold' }} >From Date</Text>
                <Text style={{ width: '60%', textAlign: 'center', fontFamily:'RobotoSlab-Regular', fontSize: 15 }}>{statusItem[0]?.FromDate}</Text>
            </View>
            <View style={{ flexDirection: 'row', padding: 15, justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 15, fontFamily:'RobotoSlab-Bold' }}>To Date</Text>
                <Text style={{ width: '60%', textAlign: 'center', fontFamily:'RobotoSlab-Regular', fontSize: 15 }}>{statusItem[0]?.ToDate}</Text>
            </View>
            <View style={{ flexDirection: 'row', padding: 15, justifyContent: 'space-between' }}>
                <Text style={{ width: '40%', fontSize: 15, fontFamily:'RobotoSlab-Bold' }}>Total Days</Text>
                <Text style={{ width: '60%', textAlign: 'center', fontFamily:'RobotoSlab-Regular', fontSize: 15 }}>{statusItem[0]?.n_TotalDays}</Text>
            </View>
            <View style={{ flexDirection: 'row', padding: 15, justifyContent: 'space-between' }}>
                <Text style={{ width: '40%', paddingTop: 10, fontFamily:'RobotoSlab-Bold', fontSize: 15 }}>Status</Text>
                <Picker style={{ width: '40%', textAlign: 'center', fontFamily:'RobotoSlab-Regular', height: 40 }}
                    selectedValue={leaveStatus}
                    onValueChange={(itemValue, itemIndex) => setLeaveStatus(itemValue)}
                >
                    <Picker.Item label="Select" value={null} />
                    <Picker.Item label="Approve" value={1} />
                    <Picker.Item label="Reject" value={0} />
                </Picker>
            </View>
            <View style={{ flexDirection: 'row', padding: 15, justifyContent: 'space-between' }}>
                <Text style={{ width: '30%', paddingTop: 10, fontFamily:'RobotoSlab-Bold', fontSize: 15 }}>Remarks</Text>
                <TextInput style={{ width: '70%', borderRadius: 10, height: 100, fontFamily:'RobotoSlab-Regular', textAlign: 'center', borderWidth: 1, borderColor: '#d3d3d3' }}
                    multiline={true}
                    onChangeText={(text) => setRemark(text)}
                />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <Button title='Submit' onPress={() => changeLeaveStatus(postObj)} />
                <Button title='Cancel' onPress={() => HandleModalClose()} />
            </View>

        </View>
    )
}


const Item = (props) => {
    const { item, index, selected, handleLeaveStatus, statusData, changeLeaveStatus } = props;
    const [PopupShow, setPopupShow] = useState(false);
    const [PopupAutoClose, setPopupAutoClose] = useState(false);
    const [leaveStatus, setLeaveStatus] = useState(statusData);
    const [modalMode, setModalMode] = useState(null);
    
    const HandleModalClose = () => {
        setPopupShow(false)
    }
    const HandleEdit = (LeaveId) => {
        setPopupShow(true);
        setModalMode('edit');
        handleLeaveStatus(LeaveId)
    }
    const HandleView = () => {
        setPopupShow(true);
        setModalMode('view');
    }
    useEffect(() => setLeaveStatus(statusData))

    return (
        <>
            <Modal animationType="fade" transparent={true} visible={PopupShow}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: "center", }}>
                    <View style={{ paddingBottom: 25, width: '95%', borderWidth: 1, borderRadius: 10, backgroundColor: '#fff', }}>
                        <TouchableOpacity style={{ alignSelf: 'flex-end', padding: 5 }} onPress={() => HandleModalClose()}>
                            {!PopupAutoClose ? <Icon4 name="close-circle" size={20} color="#000" /> : null}
                        </TouchableOpacity>
                        {modalMode === 'edit' ? <UpdateLeaveStatus
                            item={leaveStatus}
                            changeLeaveStatus={changeLeaveStatus}
                            HandleModalClose={HandleModalClose}
                        /> : null}
                        {modalMode === 'view' ? <ViewAppliedLeave 
                        item={item} 
                        HandleModalClose={HandleModalClose}
                        /> 
                        : null}
                        
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
                                <Text style={{ fontFamily:'RobotoSlab-Bold' }}>Employee Name</Text>
                            </Col>
                            <Col style={{ width: '60%' }}>
                                <Text style={{ alignSelf: 'center', fontSize: 14, fontFamily:'RobotoSlab-Regular' }}>
                                    {item?.t_EmployeeName}
                                </Text>
                            </Col>
                        </Grid>
                    </Taskboder>
                    <Taskboder>
                        <Grid>
                            <Col>
                                <Text style={{ fontFamily:'RobotoSlab-Bold' }}>
                                    From Date
                            </Text>
                            </Col>
                            <Col style={{ width: '60%' }}>
                                <Text style={{ alignSelf: 'center', fontSize: 14, fontFamily:'RobotoSlab-Regular' }}>
                                    {item?.d_FromDate}
                                </Text>
                            </Col>
                        </Grid>
                    </Taskboder>
                    <Taskboder>
                        <Grid>
                            <Col>
                                <Text style={{ fontFamily:'RobotoSlab-Bold' }}>To Date</Text>
                            </Col>
                            <Col style={{ width: '60%' }}>
                                <Text style={{ alignSelf: 'center', fontSize: 14, fontFamily:'RobotoSlab-Regular' }}>
                                    {item?.d_ToDate}
                                </Text>
                            </Col>
                        </Grid>
                    </Taskboder>

                    <Taskboder>
                        <Grid>
                            <Col>
                                <Text style={{ fontFamily:'RobotoSlab-Bold' }}>Total Days</Text>
                            </Col>
                            <Col style={{ width: '60%' }}>
                                <Text style={{ alignSelf: 'center', fontSize: 14, fontFamily:'RobotoSlab-Regular' }}>
                                    {item?.n_TotalDays}
                                </Text>
                            </Col>
                        </Grid>
                    </Taskboder>

                    {selected === 'Pending' ? <Taskboder>
                        <Grid>
                            <Col>
                                <Text style={{ fontFamily:'RobotoSlab-Bold' }}>Actions</Text>
                            </Col>
                            <Col style={{ width: '60%' }}>

                                <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => HandleEdit(item.a_ApplyLeaveId)}>
                                    <Icon3 name="edit" size={25} color="#ed0631" />
                                </TouchableOpacity>

                            </Col>
                        </Grid>
                    </Taskboder> : null}
                    {selected === 'Approved' ?
                        <>
                            <Taskboder>
                                <Grid>
                                    <Col>
                                        <Text style={{ fontFamily:'RobotoSlab-Bold' }}>Reporting Manager Status</Text>
                                    </Col>
                                    <Col style={{ width: '60%' }}>
                                        <Text style={{ alignSelf: 'center', fontSize: 14, fontFamily:'RobotoSlab-Regular' }}>
                                            {item?.t_StatusRM}
                                        </Text>
                                    </Col>
                                </Grid>
                            </Taskboder>
                            <Taskboder>
                                <Grid>
                                    <Col>
                                        <Text style={{ fontFamily:'RobotoSlab-Bold' }}>Actions</Text>
                                    </Col>
                                    <Col style={{ width: '60%', }}>
                                        <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => HandleView()}>
                                            <Icon2 name="eye" size={25} color="#000" />
                                        </TouchableOpacity>
                                    </Col>
                                </Grid>
                            </Taskboder>
                        </>
                        : null}

                </Tasklist1>
            </View>
        </>
    )
}



class LeaveList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            LeaveData: [],
            selected: this.props.selected,
            refreshing: false,
            PopupAutoClose: false,
            PopupShow: false,
            LeaveStatus: [],
            message: ''
        }
    }
    async componentDidMount() {
        await this._onRefresh();
    }
    _onRefresh = async () => {

        this.setState({ refreshing: true });
        if (this.state.selected === 'Pending') {

            await this.props.getPendingLeave();
            await this.setState({ LeaveData: this.props.PendingList })
        }
        if (this.state.selected === 'Approved') {

            await this.props.getApprovedLeave();
            await this.setState({ LeaveData: this.props.ApprovedList })
        }
        if (this.state.selected === 'Rejected') {
            this.setState({ LeaveData: [] })
        }

        this.setState({ refreshing: false })
    }
    componentDidUpdate(prevProps, preState) {
        if (preState.selected !== this.props.selected) {
            // this.setState({ LeaveData: [] })
            this.setState({ selected: this.props.selected });
            this._onRefresh();
        }
        if (prevProps.leaveStatus !== this.props.leaveStatus) {
            this.setState({ LeaveStatus: this.props.leaveStatus })
        }
    }
    static getDerivedStateFromProps(props, state) {
        if (props.selected !== state.selected) {
            // this.setState({ LeaveData: [] })
            return {
                selected: props.selected
            }
        }
        if (props.leaveStatus !== state.leaveStatus) {
            return {
                LeaveStatus: props.leaveStatus
            }
        }
        //    this.setState({ selected: this.props.selected });
        // this._onRefresh();

        return null
    }
    HandleModalClose = () => {
        this.setState({ PopupShow: false })
    }
    changeLeaveStatus = async (postObj) => {
        const UserInfo = await getData('UserInfo');
        const n_CreatedBy = JSON.parse(UserInfo)?.n_UserId;
        const n_GroupId = JSON.parse(UserInfo)?.n_GroupId;
        const a_EmployeeID = JSON.parse(UserInfo)?.a_EmployeeID;
        const t_CreatedIP = await GetIP;
        const data = postObj;
        data.n_CreatedBy = n_CreatedBy;
        data.t_CreatedIP = t_CreatedIP;
        data.n_GroupId = n_GroupId;
        data.n_ApprovedBy = a_EmployeeID;
       
        await this.props.changeLeaveStatus(postObj);
       
        if (this.props.message) {
            this.setState({ message: this.props.message, PopupShow: true, PopupAutoClose: true })
            setTimeout(() => this.setState({ message: '', PopupShow: false, PopupAutoClose: false }), 2000)
            await this._onRefresh()
        }
    }
    render() {
        const { LeaveData, PopupShow, refreshing, PopupAutoClose } = this.state;


        return (
            <View style={{ marginBottom: 100, paddingTop: 10, }}>
                <Modal animationType="fade" transparent={true} visible={PopupShow}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: "center", }}>
                        <View style={{ paddingBottom: 25, width: '80%', borderRadius: 10, backgroundColor: '#0d76d5', }}>
                            <TouchableOpacity style={{ alignSelf: 'flex-end', padding: 5 }} onPress={() => this.HandleModalClose()}>
                                {!PopupAutoClose ? <Icon4 name="close-circle" size={20} color="#fff" /> : null}
                            </TouchableOpacity>
                            <Text style={{ color: '#fff', alignSelf: 'center', paddingTop: 10 }}>
                                {this.state.message}
                            </Text>
                        </View>
                    </View>
                </Modal>
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
                    
                    {LeaveData ?
                        <FlatList
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={this._onRefresh}
                                />}
                            data={LeaveData}
                            renderItem={
                                ({ item, index }) =>
                                    <Item item={item}
                                        statusData={this.props.leaveStatus}
                                        handleLeaveStatus={this.props.getLeaveStatus}
                                        index={index} selected={this.state.selected}
                                        changeLeaveStatus={this.changeLeaveStatus}
                                        onRefresh={this._onRefresh}
                                    />}
                            keyExtractor={item => `${item?.a_ApplyLeaveId}`}
                        />
                        : null}
                </View>
            </View>
        );
    }
}
const mapStateToProps = state => {

    const ApprovedList = state.LeaveReducer.approvedList;
    const PendingList = state.LeaveReducer.pendingList;
    const leaveStatus = state.LeaveReducer.leaveStatus;
    const message = state.LeaveReducer.message;
    return { ApprovedList, PendingList, leaveStatus, message }
}
export default connect(mapStateToProps, { getPendingLeave, getLeaveStatus, changeLeaveStatus, getApprovedLeave })(LeaveList)