import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { handleLogout } from '../redux/Action/login.action';

const Header = props => {
  const navigation = useNavigation();
  const title = props.title;
  const [PopupShow, setPopupShow] = useState(false);
  const [PopupAutoClose, setPopupAutoClose] = useState(false);
  const [logout, SetLogout] = useState(false);

  const handleLogout = () => {
    setPopupShow(true)
  }
  const LogoutPress = () => {
    setPopupShow(false)
    props.handleLogout()
  }
  return (
    <>
      <Modal animationType="fade" transparent={true} visible={PopupShow}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: "center", }}>
          <View style={{ paddingBottom: 25, width: '80%', borderRadius: 10, borderWidth: 2, borderColor: '#34a7f8', backgroundColor: '#fff', }}>
            <Text style={{ color: '#000', alignSelf: 'center', paddingTop: 10 }}>
              Do you want to Logout?
              </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingTop: 20 }}>
              <TouchableOpacity activeOpacity={0.8} style={{backgroundColor:'#2196F3',width:40,alignItems:'center',borderRadius:5}} onPress={() => setPopupShow(false)} >
                <Text style={{fontFamily:'RobotoSlab-Bold',color:'#fff',padding:5}}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} style={{backgroundColor:'#2196F3',width:40,alignItems:'center',borderRadius:5}} onPress={() => LogoutPress()} >
                <Text style={{fontFamily:'RobotoSlab-Bold',color:'#fff',padding:5}}>Yes</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>
      <View style={styles.headerWrapper}>
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={styles.hamburger}>
          <Icon name="menufold" size={30} color="#fff" />
        </TouchableOpacity>

        <View style={styles.logoutButton}>
          {title ? <Text style={styles.headerText}>{title}</Text> : null}
        </View>

        <TouchableOpacity onPress={() => handleLogout()} >
          <Icon1 name="login" size={25} style={{ marginTop: 12 }} color="#fff" />
        </TouchableOpacity>
      </View>
    </>
  );
};
const mapStateToProps = state => {
  return state;
};
export default connect(
  mapStateToProps,
  { handleLogout },
)(Header);

const styles = StyleSheet.create({
  headerWrapper: {
    borderBottomWidth: 1,
    backgroundColor: '#077cff',
    borderBottomColor: '#53a8bf',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
  },
  hamburger: {
    marginTop: 10,

  },
  headerText: {
    lineHeight: 27,
    color: '#fff',
    fontSize: 22,
    alignSelf: 'center',
    fontFamily: 'RobotoSlab-Regular'
  },
  logoutButton: {

    padding: 12,

  },
});
