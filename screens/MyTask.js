import React, { Component } from 'react';
import { Text, View, FlatList, TouchableOpacity, Modal, ImageBackground, StyleSheet, RefreshControl } from 'react-native';
import Header from '../components/Header';
import { Srnumber,TaskStatus, Tasklist1, Taskboder, ButtonMedium, } from '../css/TaskList.css';
import IconEdit from 'react-native-vector-icons/Feather';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Col, Grid } from 'react-native-easy-grid';
import { getMyTaskList, handleTaskStatus } from '../redux/Action/CreateTask.action';
import { connect } from 'react-redux';
import { Picker } from '@react-native-community/picker';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const RenderTask = (props) => {
  const Task = props?.item;
  const d_ReportSubmissionDate = Task?.d_ReportSubmissionDate;
  let createdDate = '';
  if (d_ReportSubmissionDate) {
    createdDate = d_ReportSubmissionDate.split('T')[0];
  }
  return (
    <>
      <View>
        <Srnumber >
          <Text>Sr No {props.index + 1}  </Text>
          <IconEdit name="edit" size={20} color="#fff" />
        </Srnumber>
        <Tasklist1>
          <Taskboder>
            <Grid>
              <Col style={styles.ColKey}>
                <Text style={{ fontWeight: 'bold' }}>Project Name</Text>
              </Col>
              <Col style={{ width: '60%' }}>
                <Text style={{ alignSelf: 'center', fontSize: 14 }}>{Task.t_ProjectTitle} ({Task.t_ProjectCode})</Text>
              </Col>
            </Grid>
          </Taskboder>

          <Taskboder>
            <Grid>
              <Col style={styles.ColKey}>
                <Text style={{ fontWeight: 'bold' }}>Task Name</Text>
              </Col>
              <Col style={{ width: '60%' }}>
                <Text style={{ alignSelf: 'center', fontSize: 14 }}>{Task.t_TaskTitle}</Text>
              </Col>
            </Grid>
          </Taskboder>

          <Taskboder>
            <Grid>
              <Col style={styles.ColKey}>
                <Text style={{ fontWeight: 'bold' }}>Assignee</Text>
              </Col>
              <Col style={{ width: '60%' }}>
                <Text style={{ alignSelf: 'center', fontSize: 14 }}>{Task.t_First_Name} </Text>
              </Col>
            </Grid>
          </Taskboder>

          <Taskboder>
            <Grid>
              <Col style={styles.ColKey}>
                <Text style={{ fontWeight: 'bold' }}>Created Date</Text>
              </Col>
              <Col style={{ width: '60%' }}>
                <Text style={{ alignSelf: 'center', fontSize: 14 }}>{createdDate}</Text>
              </Col>
            </Grid>
          </Taskboder>

          <Taskboder>
            <Grid>
              <Col style={styles.ColKey}>

                <Text style={{ fontWeight: 'bold', paddingTop: 14 }}>Task Priority</Text>

              </Col>
              <Col style={{ width: '60%' }}>
                <ButtonMedium>
                  <Text
                    style={{
                      alignSelf: 'center',
                      color: '#fff',
                      fontSize: 14,
                    }}>
                    {Task.TaskPriority}
                  </Text>
                </ButtonMedium>
              </Col>
            </Grid>
          </Taskboder>

          <Taskboder>
            <Grid>
              <Col style={styles.ColKey}>
                <View>
                  <Text style={{ fontWeight: 'bold', paddingTop: 14 }}>Task Status</Text>
                </View>
              </Col>
              <Col style={{ width: '60%' }}>
                <TaskStatus>
                  <Picker
                    selectedValue={Task?.n_TaskStatusID}
                    onValueChange={(itemValue, itemIndex) =>
                      props.handleTask(Task.a_TaskId, itemValue)
                    }>
                    <Picker.Item label="To do" value={1} />
                    <Picker.Item label="In Progress" value={2} />
                    <Picker.Item label="Done" value={3} />
                  </Picker>
                </TaskStatus>
              </Col>
            </Grid>
          </Taskboder>
        </Tasklist1>
      </View>

    </>
  )

}

class MyTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      MyTaskList: [],
      refreshing: false,
      PopupShow: false,
      PopupAutoClose: false,
      message: ''
    }
  }
  componentDidMount() {
    const { navigation } = this.props;
    this._unsubscribe = navigation.addListener('focus', async () => {
      await this._onRefresh()
    });

  }

  componentWillUnmount() {
    this._unsubscribe();
  }
  _onRefresh = async () => {
    this.setState({ refreshing: true })
    await this.props.getMyTaskList();
    await this.setState({ MyTaskList: this.props.MyTaskList, refreshing: false });
  }
  static getDerivedStateFromProps(props,state){
    if(props.MyTaskList !== state.MyTaskList){
      return{
        MyTaskList : props.MyTaskList
      }
    }
    return null;
  }
  handleTask = async (id, value) => {
    const postObj = {
      a_TaskId: id,
      n_TaskStatusID: value
    }

    await this.props.handleTaskStatus(postObj);

    if (this.props.taskUpdate) {
      const MyTaskList = this.state.MyTaskList[0];
      MyTaskList.n_TaskStatusID = this.props.taskUpdate?.n_TaskStatusID;
      this.setState({ PopupShow: true, PopupAutoClose: true, message: this.props.message, });
      setTimeout(() => this.setState({ PopupShow: false }), 1500);
    }
  }
  HandleModalClose = () => {
    this.setState({ PopupShow: false, PopupAutoClose: false });
  }
  render() {
    const { refreshing, PopupShow, PopupAutoClose } = this.state;

    return (
      <>
        <Modal animationType="fade" transparent={true} visible={PopupShow}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: "center", }}>
            <View style={{ paddingBottom: 25, width: '80%', borderRadius: 10, backgroundColor: '#0d76d5', }}>
              <TouchableOpacity style={{ alignSelf: 'flex-end', padding: 5 }} onPress={() => this.HandleModalClose()}>
                {!PopupAutoClose ? <Icon name="close-circle" size={20} color="#fff" /> : null}
              </TouchableOpacity>
              <Text style={{ color: '#fff', alignSelf: 'center', paddingTop: 10 }}>
                {this.state.message}
              </Text>
            </View>
          </View>
        </Modal>
        
        <ImageBackground
          style={{ flex: 1, paddingBottom: 10, }}
          source={require('../static/background2.png')}>
          <Header title={"My Task"} />
          <SafeAreaView
            style={{
              paddingLeft: 10,
              paddingRight: 10,
              flex: 1
            }} >
            {this.state.MyTaskList?.length !== 0 &&
              (<FlatList
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this._onRefresh} />}
                data={this.state.MyTaskList}
                renderItem={({ item, index }) => <RenderTask item={item} index={index} handleTask={this.handleTask} />}
                keyExtractor={item => `${item?.a_TaskId}`}
              />)
            }

          </SafeAreaView>
        </ImageBackground>
      </>
    );
  }
}
const mapStateToProps = state => {
  const MyTaskList = state.CreateTaskReducer.MyTaskList;
  const message = state.CreateTaskReducer.message;
  const taskUpdate = state.CreateTaskReducer.taskUpdate;
  return { MyTaskList, message, taskUpdate };
}
export default connect(mapStateToProps, { getMyTaskList, handleTaskStatus })(MyTask)


const styles = StyleSheet.create({
  ColKey: { width: '40%' }
})