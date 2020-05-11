import React, { Component } from 'react';
import { Text, View, FlatList, ImageBackground, StyleSheet, RefreshControl } from 'react-native';
import Header from '../components/Header';
import { Srnumber, Tasklist1, Taskboder, Buttontext, ButtonMedium, AddTask, AddTaskText } from '../css/TaskList.css';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconEdit from 'react-native-vector-icons/Feather';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Col, Grid } from 'react-native-easy-grid';
import { getTaskList } from '../redux/Action/CreateTask.action';
import { connect } from 'react-redux';

const RenderTask = (props) => {
  const Task = props?.item
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
                <Text style={{ fontWeight: 'bold' }}>Task Name</Text>
              </Col>
              <Col style={{ width: '60%' }}>
                <Text style={{ alignSelf: 'center', fontSize: 14 }}>{Task?.t_TaskTitle}</Text>
              </Col>
            </Grid>
          </Taskboder>

          <Taskboder>
            <Grid>
              <Col style={styles.ColKey}>
                <Text style={{ fontWeight: 'bold' }}>Assignee</Text>
              </Col>
              <Col style={{ width: '60%' }}>
                <Text style={{ alignSelf: 'center', fontSize: 14 }}>{Task?.AssigneeName} </Text>
              </Col>
            </Grid>
          </Taskboder>

          <Taskboder>
            <Grid>
              <Col style={styles.ColKey}>
                <Text style={{ fontWeight: 'bold' }}>Department</Text>
              </Col>
              <Col style={{ width: '60%' }}>
                <Text style={{ alignSelf: 'center', fontSize: 14 }}> {Task?.DepartmentName} </Text>
              </Col>
            </Grid>
          </Taskboder>

          <Taskboder>
            <Grid>
              <Col style={styles.ColKey}>
                <Text style={{ fontWeight: 'bold' }}>Create Date</Text>
              </Col>
              <Col style={{ width: '60%' }}>
                <Text style={{ alignSelf: 'center', fontSize: 14 }}>{Task?.d_ReportSubmissionDate}</Text>
              </Col>
            </Grid>
          </Taskboder>

          <Taskboder>
            <Grid>
              <Col style={styles.ColKey}>

                <Text style={{ fontWeight: 'bold' }}>Task Priority</Text>

              </Col>
              <Col style={{ width: '60%' }}>
                <ButtonMedium>
                  <Text
                    style={{
                      alignSelf: 'center',
                      color: '#fff',
                      fontSize: 14,
                    }}>
                    {Task?.TaskPriority}
                  </Text>
                </ButtonMedium>
              </Col>
            </Grid>
          </Taskboder>

          <Taskboder>
            <Grid>
              <Col style={styles.ColKey}>
                <View>
                  <Text style={{ fontWeight: 'bold' }}>Task Status</Text>
                </View>
              </Col>
              <Col style={{ width: '60%' }}>
                <Buttontext>
                  <Text style={{ alignSelf: 'center', fontSize: 14 }}>
                    {Task?.TaskStatus}
                  </Text>
                </Buttontext>
              </Col>
            </Grid>
          </Taskboder>
        </Tasklist1>
      </View>

    </>
  )

}

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TaskList: [],
      refreshing: false,
    }
  }
  componentDidMount() {
    const {navigation} = this.props;
    this._unsubscribe = navigation.addListener('focus', async () => {
      await this._onRefresh()
    });

  }

  componentWillUnmount() {
    this._unsubscribe();
  }
  _onRefresh = async () => {
    this.setState({ refreshing: true })
    const params = await this.props.route.params;
    if (params) {
      const obj = { GroupId: params.GroupId, ProjectId: params.ProjectId };
      await this.props.getTaskList(obj);
    }
    await this.setState({ TaskList: this.props.TaskList, refreshing: false });
  }

  handleCreateTask = () => {
    const groupId = this.props.route?.params?.GroupId;
    const projectId = this.props.route?.params?.ProjectId;
    this.props.navigation.navigate('CreateTask', { GroupId: groupId, ProjectId: projectId });
  };
  getItemCount = () => {
    return 1;
  }
  render() {
    const { refreshing } = this.state;

    return (
      <>
        <ImageBackground
          style={{ flex: 1, paddingBottom: 10, }}
          source={require('../static/background2.png')}>
          <Header title={"Task List"} />
          <SafeAreaView
            style={{
              paddingLeft: 10,
              paddingRight: 10,
              flex: 1
            }}
          >
            <View >
              <AddTask onPress={() => this.handleCreateTask()} >
                <Icon name="add-circle" size={25} color="#fff" />
                <AddTaskText>
                  Add Task
              </AddTaskText>
              </AddTask>
            </View>
            {this.state.TaskList?.length !== 0 &&
              (<FlatList
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this._onRefresh} />}
                data={this.state.TaskList}
                renderItem={({ item, index }) => <RenderTask item={item} index={index} />}
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
  const TaskList = state.CreateTaskReducer.TaskList;
  return { TaskList };
}
export default connect(mapStateToProps, { getTaskList })(TaskList)


const styles = StyleSheet.create({
  ColKey: { width: '40%' }
})