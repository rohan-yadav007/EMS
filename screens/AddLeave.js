/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  RefreshControl,
  ScrollView,
} from 'react-native';
// import {SearchBar} from 'react-native-elements';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/Feather';
import { Col, Grid } from 'react-native-easy-grid';
import { connect } from 'react-redux';
import { getApplierList } from '../redux/Action/Leave.action';
import {
  Srnumber,
  Tasklist1,
  Taskboder,
  Buttontext,
  ButtonMedium,
  AddTask,
  AddTaskText,
} from '../css/TaskList.css';

import { Searchbox, CustomInput } from '../css/AddLeave.css';
import { FlatList } from 'react-native-gesture-handler';

const Item = ({ item, index }) => {
  const fromDate = item?.d_FromDate.split('T')[0];
  const toDate = item?.d_ToDate.split('T')[0];
  
  return (
    <View>
      <Srnumber>
        <Text>Sr No {index + 1} </Text>
      </Srnumber>
      <Tasklist1>
        <Taskboder>
          <Grid>
            <Col>
              <Text style={{ fontWeight: 'bold' }}>Applier Name</Text>
            </Col>
            <Col style={{ width: '60%' }}>
              <Text style={{ alignSelf: 'center', fontSize: 14 }}>
                {item?.ApplierName}
              </Text>
            </Col>
          </Grid>
        </Taskboder>
        <Taskboder>
          <Grid>
            <Col>
              <Text style={{ fontWeight: 'bold' }}>
                Reporting Manager Status
          </Text>
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
              <Text style={{ fontWeight: 'bold' }}>USer Name</Text>
            </Col>
            <Col style={{ width: '60%' }}>
              <Text style={{ alignSelf: 'center', fontSize: 14 }}>
                {item?.UserName}
              </Text>
            </Col>
          </Grid>
        </Taskboder>

        <Taskboder>
          <Grid>
            <Col>
              <Text style={{ fontWeight: 'bold' }}>Leave Date</Text>
            </Col>
            <Col style={{ width: '60%' }}>
              <Text style={{ alignSelf: 'center', fontSize: 14 }}>
                {fromDate} to {toDate}
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
                Active
          </Text>
            </Col>
          </Grid>
        </Taskboder>

        <Taskboder>
          <Grid>
            <Col>
              <Text style={{ fontWeight: 'bold' }}>Actions</Text>
            </Col>
            <Col style={{ width: '50%' }}>
              <Grid>
                <Col>
                  <View style={{ alignSelf: 'center' }}>
                    <Icon2 name="eye" size={25} color="#000" />
                  </View>
                </Col>
                <Col>
                  <View style={{ alignSelf: 'center' }}>
                    <Icon3 name="edit" size={25} color="#ed0631" />
                  </View>
                </Col>
                <Col />
              </Grid>
            </Col>
          </Grid>
        </Taskboder>
      </Tasklist1>
    </View>
  )
}

class AddLeave extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ApplierList: [],
      refreshing: false
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
      <View style={{ marginBottom: 100,paddingTop: 10, }}>
        <View style={{height:50}}>
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
        <View style={{marginBottom:'40%'}}>
          {ApplierList ?
            <FlatList
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={this._onRefresh}
                />}
              data={ApplierList}
              renderItem={({ item, index }) => <Item item={item} index={index} />}
              keyExtractor={item => `${item?.a_ApplyLeaveId}`}
            />
            : null}
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => {
  const ApplierList = state.LeaveReducer.ApplierList;
  return { ApplierList }
}
export default connect(mapStateToProps, { getApplierList })(AddLeave)