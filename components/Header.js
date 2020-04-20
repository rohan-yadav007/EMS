import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Foundation';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {handleLogout} from '../redux/Action/login.action';

const Header = props => {
  const navigation = useNavigation();
  console.log(props);
  return (
    <>
      <View style={styles.headerWrapper}>
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={styles.hamburger}>
          <Icon name="indent-more" size={35} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => props.handleLogout()}>
          <View style={styles.logoutButton}>
            <Text style={styles.logoutText}>LogOut</Text>
          </View>
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
    backgroundColor: 'rgb(120, 172, 249)',
    borderBottomColor: '#53a8bf',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  hamburger: {
    marginLeft: 10,
    marginTop: 10,
  },
  logoutText: {
    lineHeight: 30,
    color: '#fff',
    fontSize: 16,
  },
  logoutButton: {
    padding: 12,
  },
});
