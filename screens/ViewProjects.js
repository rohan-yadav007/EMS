/* eslint-disable react-native/no-inline-styles */
import React, {Component, useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Entypo';
import {Customborder, Customtext} from '../css/Projectlist.css';

import Header from '../components/Header';
import {getProjectList} from '../redux/Action/ViewProject.action';
import {connect} from 'react-redux';
import { getData} from '../utils/AsyncStorage';
// const DATA = [
//   {
//     Project_code: ' IIRIS/IR//0025',
//     Project_title: 'Covid-19',
//   },
  // {
  //   Project_code: ' IIRIS/IR//0026',
  //   Project_title: 'Covid-17',
  // },
// ];

const Item = ({item}) => {
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
                }}>
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
                    <Text>{item.t_ProjectTitle}</Text>
                    {/* <Text>{console.log("fffff",item.t_ProjectTitle)}</Text> */}
                  </Customtext>
                  {/* <Text>{item.Project_title}</Text> */}
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
    this.state ={
      userData : {},
      projectData:[]
    }
  }
  async componentDidMount() {
    const UserInfo = await getData('UserInfo');
    const userData = JSON.parse(UserInfo)
    // console.log("userinfo",JSON.parse(UserInfo))
    // await this.setState({userData:this.props.userData},()=>{
    //   // console.log("state userData ", this.state.userData)
    //   })
      // condn bz data not available after reload
    // if(this.props.userData && Object.keys(this.props.userData).length >0 ){
      const postObj = { n_GroupId: userData.n_GroupId, n_RoleId:userData.n_RoleId };
      await this.props.getProjectList(postObj);
      // console.log("obje user",Object.keys(this.props.userData).length )
    // }
    // else{
    //   await this.props.getProjectList({})
    // }
    this.setState({projectData:this.props.projectData},()=>{
       console.log("state",this.state.projectData)
    })
    // console.log("projectdata",this.state.projectData)
    // await this.props.getProjectList();
  }
 
  render() {

    return (
      <SafeAreaView>
        <Header />
        <View>
          <FlatList
            data={this.state.projectData}
            renderItem={({item}) => <Item item={item} />}
            keyExtractor={item => item.a_ProjectId}
          />
          {/* {this.state.projectData.map((item)=>(
            <Item item={item} key ={item.a_ProjectId} />
          ))} */}
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  const userData = state.LoginReducer.userData;
  const projectData = state.ViewProjectReducer.projectData;
  return {userData ,projectData};
}

export default connect(mapStateToProps, {getProjectList})(ProjectList);