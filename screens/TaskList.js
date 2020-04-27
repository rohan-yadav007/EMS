import React, { Component } from 'react';
import { Text, View, FlatList, ImageBackground,StyleSheet, StyleSheetScrollView, Button, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import {
  Srnumber,
  Tasklist1,
  Taskboder,
  Buttontext,
  ButtonMedium,
} from '../css/TaskList.css';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Col, Grid } from 'react-native-easy-grid';
import { getTaskList } from '../redux/Action/CreateTask.action';
import { connect } from 'react-redux';

const RenderTask = (props) => {
const Task = props?.item
  return (
    <>
      <Srnumber>
        <Text>Sr No  </Text>
      </Srnumber>
      <Tasklist1>
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
              <Text style={{ alignSelf: 'center', fontSize: 14 }}>{Task.AssigneeName} </Text>
            </Col>
          </Grid>
        </Taskboder>

        <Taskboder>
          <Grid>
            <Col style={styles.ColKey}>
              <Text style={{ fontWeight: 'bold' }}>Department</Text>
            </Col>
            <Col style={{ width: '60%' }}>
              <Text style={{ alignSelf: 'center', fontSize: 14 }}> {Task.DepartmentName} </Text>
            </Col>
          </Grid>
        </Taskboder>

        <Taskboder>
          <Grid>
            <Col style={styles.ColKey}>
              <Text style={{ fontWeight: 'bold' }}>Create Date</Text>
            </Col>
            <Col style={{ width: '60%' }}>
              <Text style={{ alignSelf: 'center', fontSize: 14 }}>{Task.d_ReportSubmissionDate}</Text>
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
                <Text style={{ fontWeight: 'bold' }}>Task Status</Text>
              </View>
            </Col>
            <Col style={{ width: '60%' }}>
              <Buttontext>
                <Text style={{ alignSelf: 'center', fontSize: 14 }}>
                  {Task.TaskStatus}
                </Text>
              </Buttontext>
            </Col>
          </Grid>
        </Taskboder>
      </Tasklist1>
    </>
  )

}

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TaskList: []
    }
  }
  async componentDidMount() {
    await this._onRefresh();
  }
  _onRefresh = async () => {
    const params = await this.props.route.params;
    if (params) {
      const obj = { GroupId: params.GroupId, ProjectId: params.ProjectId };
      await this.props.getTaskList(obj);
    }
    await this.setState({ TaskList: this.props.TaskList });
  }

  handleCreateTask = () => {
    this.props.navigation.navigate('CreateTask');
  };
  getItemCount = () => {
    return 1;
  }
  render() {
    console.log("rohan", this.state.TaskList);
    return (
      <>
        <ImageBackground
          style={{ flex: 1, paddingBottom: 10, }}
          source={require('../static/background2.png')}>
          <Header title={TaskList} />
          <SafeAreaView
            style={{
              paddingLeft: 10,
              paddingRight: 10,
              flex: 1
            }}
          >
            <View >
              <TouchableOpacity
                style={{
                  backgroundColor: '#000000b0',
                  padding: 5,
                  flexDirection: 'row',
                  borderRadius: 4,
                  width: '100%',
                  marginTop: 5,
                  justifyContent: 'center'
                }}
                onPress={() => this.handleCreateTask()}
              >
                <Icon name="add-circle" size={30} color="#fff" />
                <Text style={{ textAlignVertical: 'center', fontSize: 17, color: '#fff', textTransform: 'uppercase' }}>
                  Add Task
              </Text>
              </TouchableOpacity>
            </View>
            {this.state.TaskList.length !== 0 &&
              (<FlatList
                data={this.state.TaskList}
                renderItem={({ item },i) => <RenderTask item={item} index={i} />}
                keyExtractor={item => item?.a_TaskId}

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


const styles= StyleSheet.create({
  ColKey:{width: '40%'}
})