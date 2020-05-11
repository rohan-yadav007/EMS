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
import Header from '../components/Header';
import { connect } from 'react-redux';
import { getApplierList } from '../redux/Action/Leave.action';
import ApplyLeave from './ApplyLeave';
import AddLeave from './AddLeave';


const HandleTab = ({selected,SetTabFromProp}) => {
    if (selected === 'tab1') {
        return (
            <AddLeave SetTabFromProp={SetTabFromProp}/>
        )
    } else {
        return (
            <ApplyLeave SetTabFromProp={SetTabFromProp} />
        )
    }
}

class LeaveMaster extends Component {
    constructor() {
        super();
        this.state = {
            ApplierList: [],
            refreshing: false,
            selected: 'tab1',
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
    SetTabFromProp = (tabName) => {
        this.setState({selected:tabName})
    } 
    render() {
        const { selected } = this.state;
        return (
            <>
                <ImageBackground
                    style={{ flex: 1, paddingBottom: 10 }}
                    source={require('../static/background2.png')}>
                    <Header title={'Leave Master'} />
                    <SafeAreaView
                        style={{
                            paddingRight: 10,
                            paddingBottom: 20,
                            paddingLeft: 10,
                            paddingTop: 10,
                        }}>
                        <View style={{ flexDirection: 'row', position: 'relative', bottom: 0 }}>

                            <TouchableOpacity
                                onPress={() => this.setState({ selected: 'tab1' })}
                                activeOpacity={0.8}
                                style={{
                                    flex: 1,
                                    backgroundColor: selected === 'tab1' ? 'red' : '#fff',
                                }}>
                                <Text style={{
                                    alignSelf: 'center', padding: 10,
                                    color: selected === 'tab1' ? '#fff' : '#000',
                                }}>My Leave</Text>
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
                                        color: selected === 'tab2' ? '#fff' : '#000',
                                    }}>Apply</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{marginBottom:100}}>
                        <HandleTab SetTabFromProp={this.SetTabFromProp} selected={selected}  />
                        </View>
                       
                        
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
export default connect(mapStateToProps, { getApplierList })(LeaveMaster)