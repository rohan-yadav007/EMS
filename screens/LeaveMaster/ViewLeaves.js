/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
    Text,
    View,
    SafeAreaView,
    ImageBackground,
    RefreshControl,
    TouchableOpacity,
} from 'react-native';
// import {SearchBar} from 'react-native-elements';
import Header from '../../components/Header';
import { connect } from 'react-redux';
import { getApplierList ,getPendingLeave,getApprovedLeave} from '../../redux/Action/Leave.action';
import ApplyLeave from './ApplyLeaveForm';
import LeaveList from './LeaveList';


const HandleTab = ({ selected, SetTabFromProp,selectedLeave,_onRefresh }) => {
    if (selected === 'Pending') {
       
        return (
            <LeaveList SetTabFromProp={SetTabFromProp} selected={selected} />
        )
    } 
    if(selected === 'Approved'){

        return (
            <LeaveList SetTabFromProp={SetTabFromProp} selected={selected} />
        )
    }
    if(selected === 'Rejected'){
        return (
            <LeaveList SetTabFromProp={SetTabFromProp} selected={selected} />
        )
    }
}

class ViewLeaves extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ApplierList: [],
            refreshing: false,
            selected: 'Pending',
            selectedLeave:''
        }
    }
    async componentDidMount() {
        const { navigation } = this.props;
        this._unsubscribe = navigation.addListener('focus', async () => {
            await this._onRefresh();
        });
    }
    componentWillUnmount() {
        this._unsubscribe();
    }
    _onRefresh = async () => {
        this.setState({ refreshing: true });
        await this.props.getApplierList();
        await this.setState({ ApplierList: this.props.ApplierList });
        this.setState({ refreshing: false })
    }
    SetTabFromProp = (tabName,leaveId) => {
        this.setState({ selected: tabName, selectedLeave: leaveId });
        setTimeout(()=> this.setState({ selectedLeave: null }),1500)
    }
    render() {
        const { selected, selectedLeave } = this.state;
        return (
            <>
                <ImageBackground
                    style={{ flex: 1, paddingBottom: 10 }}
                    source={require('../../static/background2.png')}>
                    <Header title={'Approve Leave'} />
                    <SafeAreaView
                        style={{
                            paddingRight: 10,
                            paddingBottom: 20,
                            paddingLeft: 10,
                            paddingTop: 10,
                        }}>
                        <View style={{ flexDirection: 'row', position: 'relative'}}>

                            <TouchableOpacity
                                onPress={() => this.setState({ selected: 'Pending' })}
                                activeOpacity={0.8}
                                style={{
                                    flex: 1,
                                    backgroundColor: selected === 'Pending' ? 'red' : '#fff',
                                    fontFamily:'RobotoSlab-Bold'
                                }}>
                                <Text style={{
                                    alignSelf: 'center', padding: 10,
                                    color: selected !== 'Pending' ? '#000' : '#fff',
                                    fontFamily:'RobotoSlab-Bold'
                                }}>Pending</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => this.setState({ selected: 'Approved' })}
                                activeOpacity={0.8}
                                style={{
                                    flex: 1,
                                    backgroundColor: selected === 'Approved' ? 'red' : '#fff',
                                    fontFamily:'RobotoSlab-Bold'
                                }}>
                                <Text style={{
                                    alignSelf: 'center', padding: 10,
                                    color: selected !== 'Approved' ? '#000' : '#fff',
                                    fontFamily:'RobotoSlab-Bold'
                                }}>Approved</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => this.setState({ selected: 'Rejected' })}
                                style={{
                                    flex: 1,
                                    backgroundColor: selected === 'Rejected' ? 'red' : '#fff',
                                }}>
                                <Text
                                    style={{
                                        alignSelf: 'center', padding: 10,
                                        color: selected !== 'Rejected' ? '#000' : '#fff',
                                        fontFamily:'RobotoSlab-Bold'
                                    }}>Rejected</Text>
                            </TouchableOpacity>
                        </View>
                        {/* <View style={{marginBottom:100}}> */}
                        <HandleTab SetTabFromProp={this.SetTabFromProp} props={this.props}  selected={selected} />
                        {/* </View> */}


                    </SafeAreaView>
                </ImageBackground>
            </>
        );
    }
}
const mapStateToProps = state => {
    const ApplierList = state.LeaveReducer.ApplierList;
    const approvedList = state.LeaveReducer.approvedList;
    const pendingList = state.LeaveReducer.pendingList;
    return { ApplierList ,pendingList,approvedList}
}
export default connect(mapStateToProps, { getApplierList,getPendingLeave,getApprovedLeave })(ViewLeaves)