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
import { getApplierList } from '../../redux/Action/Leave.action';
import ApplyLeave from '../LeaveMaster/ApplyLeaveForm';
import AddLeave from '../LeaveMaster/AddLeave';
import Expense from './Expense';
import Expenseaddform from './Expenseaddform';

const HandleTab = ({ selected, SetTabFromProp,selectedLeave,_onRefresh }) => {
    if (selected === 'tab1') {
        // _onRefresh();
        return (
            <Expense SetTabFromProp={SetTabFromProp} />
        )
    } 
    if(selected === 'tab2'){
        return (
            <Expense SetTabFromProp={SetTabFromProp} />
        ) 
    }
    else {
        return (
            <Expense SetTabFromProp={SetTabFromProp} />
        )
    }
}

class ViewExpense extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ApplierList: [],
            refreshing: false,
            selected: 'tab1',
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
                    <Header title={'View Expense'} />
                    <SafeAreaView
                        style={{
                            paddingRight: 10,
                            paddingBottom: 20,
                            paddingLeft: 10,
                            paddingTop: 10,
                        }}>
                        <View style={{ flexDirection: 'row', position: 'relative'}}>

                            <TouchableOpacity
                                onPress={() => this.setState({ selected: 'tab1' })}
                                activeOpacity={0.8}
                                style={{
                                    flex: 1,
                                    backgroundColor: selected === 'tab1' ? 'red' : '#fff',
                                }}>
                                <Text style={{
                                    alignSelf: 'center', padding: 10,
                                    color: selected !== 'tab1' ? '#000' : '#fff',
                                }}>Pending</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => this.setState({ selected: 'tab2' })}
                                style={{
                                    flex: 1,
                                    backgroundColor: selected === 'tab2' ? 'red' : '#fff',
                                }}>
                                <Text
                                    style={{
                                        alignSelf: 'center', padding: 10,
                                        color: selected !== 'tab2' ? '#000' : '#fff',
                                    }}>Approved</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => this.setState({ selected: 'tab3' })}
                                style={{
                                    flex: 1,
                                    backgroundColor: selected === 'tab3' ? 'red' : '#fff',
                                }}>
                                <Text
                                    style={{
                                        alignSelf: 'center', padding: 10,
                                        color: selected !== 'tab3' ? '#000' : '#fff',
                                    }}>Rejected</Text>
                            </TouchableOpacity>
                        </View>
                        {/* <View style={{marginBottom:100}}> */}
                        <HandleTab SetTabFromProp={this.SetTabFromProp} _onRefresh={this._onRefresh} selectedLeave={selectedLeave} selected={selected} />
                        {/* </View> */}


                    </SafeAreaView>
                </ImageBackground>
            </>
        );
    }
}
const mapStateToProps = state => {
    const ApplierList = state.LeaveReducer.ApplierList;
    return { ApplierList }
}
export default connect(mapStateToProps, { getApplierList })(ViewExpense)