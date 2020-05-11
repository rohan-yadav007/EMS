/* eslint-disable react-native/no-inline-styles */
import React, { Component, useState } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  ImageBackground,
  Modal,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Entypo';
import Close from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Customborder,
  Customtext,
  Loader,
  ModalTopContent,
  NavButton,
  CloseButton,
} from '../css/Projectlist.css';
import Header from '../components/Header';
import { getProjectList } from '../redux/Action/Projects.action';
import { connect } from 'react-redux';
import { getData } from '../utils/AsyncStorage';

const Item = ({ item, props }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleView = () => {
    setShowPopup(false);
    props.navigation.navigate('ViewProjects', { ProjectId: item.a_ProjectId });
  };
  const handleList = () => {
    setShowPopup(false);
    props.navigation.navigate('TaskList', {
      ProjectId: item.a_ProjectId,
      GroupId: item.n_GroupId,
    });
  };
  return (
    <>
      <Modal transparent={true} visible={showPopup}>
        <View style={{ backgroundColor: '#000000aa', flex: 1 }}>
          <ModalTopContent>
            <CloseButton onPress={() => setShowPopup(false)}>
              <Close name="close-circle" color="#1a78c3" size={30} />
            </CloseButton>

            <NavButton onPress={() => handleView()}>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#fff',
                  fontSize: 15,
                  textTransform: 'uppercase',
                }}>
                Project View
              </Text>
            </NavButton>
            <NavButton onPress={() => handleList()}>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#fff',
                  fontSize: 15,
                  textTransform: 'uppercase',
                }}>
                Task List
              </Text>
            </NavButton>
          </ModalTopContent>
        </View>
      </Modal>
      
        <SafeAreaView style={{ padding: 12,backgroundColor:'#fff' }}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => setShowPopup(!showPopup)}>

            <LinearGradient
              style={{
                paddingTop: 8,
                paddingBottom: 14,
                borderTopRightRadius: 4,
                borderBottomRightRadius: 4,
                paddingLeft: 10,
                paddingRight: 10,
                borderLeftWidth: 5,
                borderLeftColor: '#2196f3',
              }}
              colors={['#bfebffb8', '#bfebffb8', '#bfebffb8']}>
              <Customborder>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Customtext>
                      <Text style={{ color: '#000' }}>
                        {item.t_ProjectCode} ({item.t_ProjectTitle})
                    </Text>
                    </Customtext>
                  </View>
                  <View>
                    <Text>
                      <Icon name="popup" size={20} color="#1a78c3" />
                    </Text>
                  </View>
                </View>
              </Customborder>
            </LinearGradient>
          </TouchableOpacity>
        </SafeAreaView>
     
    </>
  );
};

class ProjectList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      projectData:[]
    };
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
    await this.props.getProjectList();
    this.setState({ refreshing: false,projectData:this.props.projectData });
  };

  render() {
    const { loading } = this.props;
    const { refreshing } = this.state;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Header title={'Projects'} />
        <View style={{ marginBottom: 50 }}>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={this._onRefresh}
              />
            }
            data={this.state.projectData}
            renderItem={({ item }) => <Item item={item} props={this.props} />}
            keyExtractor={item => item.t_ProjectCode}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  const projectData = state.ProjectsReducer.projectData;
  const loading = state.CommonReducer.loading;
  return { projectData, loading };
};

export default connect(
  mapStateToProps,
  { getProjectList },
)(ProjectList);
