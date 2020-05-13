/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
    Text,
    View,
    RefreshControl,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/Feather';
import { Col, Grid } from 'react-native-easy-grid';
import { connect } from 'react-redux';
import { getPendingLeave, getApprovedLeave } from '../redux/Action/Leave.action';
import { Srnumber, Tasklist1, Taskboder, } from '../css/TaskList.css';
import { Searchbox, CustomInput } from '../css/AddLeave.css';
import { FlatList } from 'react-native-gesture-handler';

const Item = ({ item, index, selected }) => {

    console.log(item)
    return (
        <View>
            <Srnumber>
                <Text>Sr No {index + 1} </Text>
            </Srnumber>
            <Tasklist1>
                <Taskboder>
                    <Grid>
                        <Col>
                            <Text style={{ fontWeight: 'bold' }}>Employee Name</Text>
                        </Col>
                        <Col style={{ width: '60%' }}>
                            <Text style={{ alignSelf: 'center', fontSize: 14 }}>
                                {item?.t_EmployeeName}
                            </Text>
                        </Col>
                    </Grid>
                </Taskboder>
                <Taskboder>
                    <Grid>
                        <Col>
                            <Text style={{ fontWeight: 'bold' }}>
                                From Date
                            </Text>
                        </Col>
                        <Col style={{ width: '60%' }}>
                            <Text style={{ alignSelf: 'center', fontSize: 14 }}>
                                {item?.d_FromDate}
                            </Text>
                        </Col>
                    </Grid>
                </Taskboder>
                <Taskboder>
                    <Grid>
                        <Col>
                            <Text style={{ fontWeight: 'bold' }}>To Date</Text>
                        </Col>
                        <Col style={{ width: '60%' }}>
                            <Text style={{ alignSelf: 'center', fontSize: 14 }}>
                                {item?.d_ToDate}
                            </Text>
                        </Col>
                    </Grid>
                </Taskboder>

                <Taskboder>
                    <Grid>
                        <Col>
                            <Text style={{ fontWeight: 'bold' }}>Total Days</Text>
                        </Col>
                        <Col style={{ width: '60%' }}>
                            <Text style={{ alignSelf: 'center', fontSize: 14 }}>
                                {item?.n_TotalDays}
                            </Text>
                        </Col>
                    </Grid>
                </Taskboder>
                
                {selected === 'Pending' ? <Taskboder>
                    <Grid>
                        <Col>
                            <Text style={{ fontWeight: 'bold' }}>Actions</Text>
                        </Col>
                        <Col style={{ width: '60%' }}>

                            <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => () => console.log('pp')}>
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
                                    <Text style={{ fontWeight: 'bold' }}>Reporting Manager Status</Text>
                                </Col>
                                <Col style={{ width: '60%' }}>
                                    <Text style={{ alignSelf: 'center', fontSize: 14 }}>
                                        {item?.t_StatusRM}
                                    </Text>
                                </Col>
                            </Grid>
                        </Taskboder>
                        <Taskboder>
                            <Grid>
                                <Col>
                                    <Text style={{ fontWeight: 'bold' }}>Actions</Text>
                                </Col>
                                <Col style={{ width: '60%', }}>
                                    <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => console.log('jj')}>
                                        <Icon2 name="eye" size={25} color="#000" />
                                    </TouchableOpacity>
                                </Col>
                            </Grid>
                        </Taskboder>
                    </>
                    : null}

            </Tasklist1>
        </View>
    )
}

class LeaveList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            LeaveData: [],
            selected: this.props.selected,
            refreshing: false
        }
    }
    async componentDidMount() {
        await this._onRefresh();
    }
    _onRefresh = async () => {

        this.setState({ refreshing: true });
        if (this.state.selected === 'Pending') {
            console.log('Pending')
            await this.props.getPendingLeave();
            await this.setState({ LeaveData: this.props.PendingList })
        }
        if (this.state.selected === 'Approved') {
            console.log('Approved')
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
            this.setState({ selected: this.props.selected });
            this._onRefresh();
        }
    }
    render() {
        const { LeaveData } = this.state;
        const { refreshing } = this.state;
        console.log('selected', this.props.selected, this.props.PendingList)
        return (
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
                    {console.log(LeaveData)}
                    {LeaveData ?
                        <FlatList
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={this._onRefresh}
                                />}
                            data={LeaveData}
                            renderItem={({ item, index }) => <Item item={item} index={index} selected={this.state.selected} />}
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
    return {  ApprovedList, PendingList }
}
export default connect(mapStateToProps, { getPendingLeave, getApprovedLeave })(LeaveList)