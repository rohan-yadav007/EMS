/* eslint-disable react-native/no-inline-styles */
import React, {Component, useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Modal,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Entypo';
import {Customborder, Customtext, Loader} from '../css/Projectlist.css';
import Header from '../components/Header';
import {getProjectList} from '../redux/Action/Projects.action';
import {connect} from 'react-redux';
import {getData} from '../utils/AsyncStorage';

const Item = ({item,props}) => {
  const [showPopup, setShowPopup] = useState(false);
  return (
    <>
      <Modal transparent={true} visible={showPopup}>
        <View style={{backgroundColor: '#000000aa', flex: 1}}>
          <View
            style={{
              backgroundColor: '#fff',
              margin: 30,
              padding: 20,
              borderRadius: 10,
              marginTop: 280,
            }}>
            <View style={{flexDirection: 'column'}} />
            <View
              style={{
                flexDirection: 'row',

                justifyContent: 'space-evenly',
              }}
            />
            <View
              style={{
                backgroundColor: '#0072e6',
                borderRadius: 4,
                padding: 12,
                marginBottom: 15,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#fff',
                  fontSize: 15,
                  textTransform: 'uppercase',
                }}
                onPress = {()=> props.navigation.navigate('ViewProjects',{ProjectId:item.a_ProjectId})}>
                Project View
              </Text>
            </View>
            <View
              style={{
                backgroundColor: '#246cb5',
                borderRadius: 4,
                padding: 12,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#fff',
                  fontSize: 15,
                  textTransform: 'uppercase',
                }}>
                Test List (4)
              </Text>
            </View>
          </View>
        </View>
      </Modal>
      <SafeAreaView style={{padding: 12}}>
        <TouchableOpacity onPress={() => setShowPopup(!showPopup)}>
          <LinearGradient
            style={{
              paddingTop: 8,
              paddingBottom: 14,
              borderRadius: 4,
              paddingLeft: 10,
              paddingRight: 10,
            }}
            colors={['#448be9', '#448be9', 'rgba(0,212,255,1)']}>
            <Customborder>
              <View style={{flexDirection: 'row'}}>
                <View style={{flexDirection: 'row'}}>
                  <Customtext>
                    <Text>
                      {item.t_ProjectCode} ({item.t_ProjectTitle})
                    </Text>
                  </Customtext>
                </View>
                <View>
                  <Text>
                    <Icon name="popup" size={20} color="#fff" />
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
  }
  async componentDidMount() {
   await this.props.getProjectList()
  }

  render() {
  const {loading} = this.props;
    return (
      <SafeAreaView style={{flex: 1}}>
        {loading && (
          <Loader>
            <ActivityIndicator size="large" color="#3875c3" />
          </Loader>
        )}
        <Header title={'Projects'} />
        <View style={{marginBottom: 50}}>
          <FlatList
            data={this.props.projectData}
            renderItem={({ item }) => <Item item={item} props = {this.props}/>}
            keyExtractor={item => item.t_ProjectCode}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  // const userData = state.LoginReducer.userData;
  const projectData = state.ProjectsReducer.projectData;
  const loading = state.CommonReducer.loading;
  return {projectData, loading};
};

export default connect(
  mapStateToProps,
  {getProjectList},
)(ProjectList);
