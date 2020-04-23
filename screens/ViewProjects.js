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

const DATA = [
  {
    Project_code: ' IIRIS/IR//0025',
    Project_title: 'Covid-19',
  },
  // {
  //   Project_code: ' IIRIS/IR//0026',
  //   Project_title: 'Covid-17',
  // },
];

const Item = ({item}) => {
  const [showPopup, setShowPopup] = useState(false);
  return (
    <>
      <Header />
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
              tyle={{
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
                    <Text>IIRIS/IR//0025 ( Covid-19 ) </Text>
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

        <TouchableOpacity onPress={() => setShowPopup(!showPopup)}>
          <LinearGradient
            style={{
              paddingTop: 8,
              paddingBottom: 14,
              borderRadius: 4,
              paddingLeft: 10,
              paddingRight: 10,
              marginTop: 25,
            }}
            colors={['#448be9', '#448be9', 'rgba(0,212,255,1)']}>
            <Customborder>
              <View style={{flexDirection: 'row'}}>
                <View style={{flexDirection: 'row'}}>
                  <Customtext>
                    <Text>IIRIS/IR//0025 ( Covid-19 ) </Text>
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
        <LinearGradient
          style={{
            paddingTop: 8,
            paddingBottom: 14,
            borderRadius: 4,
            paddingLeft: 10,
            paddingRight: 10,
            marginTop: 25,
          }}
          colors={['#448be9', '#448be9', 'rgba(0,212,255,1)']}>
          <Customborder>
            <View style={{flexDirection: 'row'}}>
              <View style={{flexDirection: 'row'}}>
                <Customtext>
                  <Text>IIRIS/IR//0025 ( Covid-19 ) </Text>
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

        <LinearGradient
          style={{
            paddingTop: 8,
            paddingBottom: 14,
            borderRadius: 4,
            paddingLeft: 10,
            paddingRight: 10,
            marginTop: 25,
          }}
          colors={['#448be9', '#448be9', 'rgba(0,212,255,1)']}>
          <Customborder>
            <View style={{flexDirection: 'row'}}>
              <View style={{flexDirection: 'row'}}>
                <Customtext>
                  <Text>IIRIS/IR//0025 ( Covid-19 ) </Text>
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

        <LinearGradient
          style={{
            paddingTop: 8,
            paddingBottom: 14,
            borderRadius: 4,
            paddingLeft: 10,
            paddingRight: 10,
            marginTop: 25,
          }}
          colors={['#448be9', '#448be9', 'rgba(0,212,255,1)']}>
          <Customborder>
            <View style={{flexDirection: 'row'}}>
              <View style={{flexDirection: 'row'}}>
                <Customtext>
                  <Text>IIRIS/IR//0025 ( Covid-19 ) </Text>
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

        <LinearGradient
          style={{
            paddingTop: 8,
            paddingBottom: 14,
            borderRadius: 4,
            paddingLeft: 10,
            paddingRight: 10,
            marginTop: 25,
          }}
          colors={['#448be9', '#448be9', 'rgba(0,212,255,1)']}>
          <Customborder>
            <View style={{flexDirection: 'row'}}>
              <View style={{flexDirection: 'row'}}>
                <Customtext>
                  <Text>IIRIS/IR//0025 ( Covid-19 ) </Text>
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

        <LinearGradient
          style={{
            paddingTop: 8,
            paddingBottom: 14,
            borderRadius: 4,
            paddingLeft: 10,
            paddingRight: 10,
            marginTop: 25,
          }}
          colors={['#448be9', '#448be9', 'rgba(0,212,255,1)']}>
          <Customborder>
            <View style={{flexDirection: 'row'}}>
              <View style={{flexDirection: 'row'}}>
                <Customtext>
                  <Text>IIRIS/IR//0025 ( Covid-19 ) </Text>
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

        <LinearGradient
          style={{
            paddingTop: 8,
            paddingBottom: 14,
            borderRadius: 4,
            paddingLeft: 10,
            paddingRight: 10,
            marginTop: 25,
          }}
          colors={['#448be9', '#448be9', 'rgba(0,212,255,1)']}>
          <Customborder>
            <View style={{flexDirection: 'row'}}>
              <View style={{flexDirection: 'row'}}>
                <Customtext>
                  <Text>IIRIS/IR//0025 ( Covid-19 ) </Text>
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
        <LinearGradient
          style={{
            paddingTop: 8,
            paddingBottom: 14,
            borderRadius: 4,
            paddingLeft: 10,
            paddingRight: 10,
            marginTop: 25,
          }}
          colors={['#448be9', '#448be9', 'rgba(0,212,255,1)']}>
          <Customborder>
            <View style={{flexDirection: 'row'}}>
              <View style={{flexDirection: 'row'}}>
                <Customtext>
                  <Text>IIRIS/IR//0025 ( Covid-19 ) </Text>
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
      </SafeAreaView>
    </>
  );
};

export default class ProjectList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <SafeAreaView>
        <View>
          <FlatList
            data={DATA}
            renderItem={({item}) => <Item item={item} />}
            keyExtractor={item => item.Project_code}
          />
        </View>
      </SafeAreaView>
    );
  }
}
