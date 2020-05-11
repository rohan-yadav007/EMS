import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {handleLogout} from '../redux/Action/login.action';

const Header = props => {
  const navigation = useNavigation();
  const title = props.title;
  return (
    <>
      <View style={styles.headerWrapper}>
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={styles.hamburger}>
          <Icon name="menufold" size={30} color="#fff" />
        </TouchableOpacity>

        <View style={styles.logoutButton}>
          {title ? <Text style={styles.headerText}>{title}</Text> : null}
        </View>

        <TouchableOpacity onPress={() => props.handleLogout()}>
          <Icon1 name="login" size={25} style={{marginTop: 12}} color="#fff" />
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
  {handleLogout},
)(Header);

const styles = StyleSheet.create({
  headerWrapper: {
    borderBottomWidth: 1,
    backgroundColor: '#077cff',
    borderBottomColor: '#53a8bf',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight:10,
    // alignContent:'center'
  },
  hamburger: {
    position: 'absolute',
    left: 10,
    marginTop: 10,
  },
  headerText: {
    lineHeight: 27,
    color: '#fff',
    fontSize: 22,
  },
  logoutButton: {
    padding: 12,
    marginLeft: '33%',
  },
});
