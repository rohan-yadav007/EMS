/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  ImageBackground,
  StyleSheet,
  StatusBar,
} from 'react-native';
import Login from './screens/Login';

const App = () => {
  return (
    <>
      <ImageBackground
        style={styles.body}
        source={require('./static/background.png')}>
        <StatusBar barStyle="dark-content" />

        <SafeAreaView>
          <View>
            <ScrollView>
              <Login />
            </ScrollView>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </>
  );
};
const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#8ec0f7',
  },
});
export default App;
