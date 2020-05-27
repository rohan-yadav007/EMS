/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
    Text,
    View,
    SafeAreaView,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';
import Header from '../../components/Header';

import Expense from './Expense';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-community/picker';


const Handle = ({ selected, SetFromProp }) => {
    if (selected === 1) {
        
        return (
            <Expense selected={selected} SetFromProp={SetFromProp} />
        )
    }
    if (selected === 2) {
        return (
            <Expense selected={selected} SetFromProp={SetFromProp}  />
        )
    }
    if (selected === 3) {
        return (
            <Expense selected={selected} SetFromProp={SetFromProp} />
        )
    }
    if (selected === 4) {
        return (
            <Expense selected={selected} SetFromProp={SetFromProp} />
        )
    }
}

class ApproveExpense extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ProjectList: [],
            EmployeeList: [],
            refreshing: false,
            selected: 1,
            selectedLeave: '',
            selectedEmployee: null,
            DatePickerEnabled: false,
            show: false,
            fromDate: null,
            toDate: null,
            selectedDateType: '',
            selectedProject: null,

        }
    }
    // async componentDidMount() {
    //     const { navigation } = this.props;
    //     this._unsubscribe = navigation.addListener('focus', async () => {
    //         await this._onRefresh();
    //     });
    // }
    // componentWillUnmount() {
    //     this._unsubscribe();
    // }
    // _onRefresh = async () => {
    //     this.setState({ refreshing: true });
    //     await this.props.getEmployeeList();
    //     await this.props.getProjectList();
    //     if (this.props.AllProjectList.length !== 0 && this.props.AllEmployeeList.length !== 0) {

    //         await this.setState({ ProjectList: this.props.AllProjectList, EmployeeList: this.props.AllEmployeeList });
    //         await this.setState({ refreshing: false })
    //     }
    // }

    
    // SetFromProp = (Name, leaveId) => {
    //     this.setState({ selected: Name, selectedLeave: leaveId });
    //     setTimeout(() => this.setState({ selectedLeave: null }), 1500)
    // }
    // handleSelect = (value, name) => {
    //     this.setState({ [name]: value });
    // }
    // handleDateSelect = (name) => {
    //     this.setState({ DatePickerEnabled: true, selectedDateType: name })
    // }
    // onChange = (date) => {
    //     const parseDate = JSON.stringify(date)?.split('"')[1]?.split('T')[0];
    //     const { selectedDateType } = this.state;
    //     if (selectedDateType !== 'fromDate') {
    //         this.setState({ DatePickerEnabled: false, fromDate: parseDate })
    //     }
    //     else {
    //         this.setState({ DatePickerEnabled: false, toDate: parseDate })
    //     }

    // }
    // static getDerivedStateFromProps(props, state) {

    //     if (props.AllEmployeeList !== state.EmployeeList) {
    //         return {
    //             EmployeeList: props.AllEmployeeList
    //         }
    //     }
    //     if (props.AllProjectList !== state.ProjectList) {
    //         return {
    //             ProjectList: props.AllProjectList
    //         }
    //     }

    //     return null;
    // }

    render() {
        const { selected, selectedInput, selectedEmployee, selectedProject, DatePickerEnabled, show, ProjectList, EmployeeList } = this.state;
        const EmployeeNameArr = EmployeeList?.map(e => {
            return e.t_First_Name;
        })
        const ProjectNameArr = ProjectList?.map(e => {
            return e.t_ProjectCode;
        })
        const filterData = [this.state.selectedProject, this.state.selectedEmployee, this.state.fromDate,this.state.toDate];

        return (
            <>
                {DatePickerEnabled ? <DateTimePicker
                    style={{ width: '100%', height: 55 }}
                    // mode={mode}
                    value={new Date()}
                    // display={'date'}
                    onChange={(event, date) => this.onChange(date)}

                /> : null}
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
{/* 
                        <View style={{ flexDirection: 'row', position: 'relative' }}>

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
                        </View> */}
                        
                        {/* <View style={{marginBottom:100}}> */}
                        <Handle SetFromProp={this.SetFromProp} _onRefresh={this._onRefresh}  selected={selected} />
                        {/* </View> */}


                    </SafeAreaView>
                </ImageBackground>
            </>
        );
    }
}

export default ApproveExpense;