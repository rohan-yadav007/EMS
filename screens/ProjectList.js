import React, {Component} from 'react';
import {View, SafeAreaView, Text, FlatList} from 'react-native';

const DATA = [
  {
    Project_code: ' IIRIS/IR//0025',
    Project_title: 'Covid-19',
  },
  {
    Project_code: ' IIRIS/IR//0026',
    Project_title: 'Covid-17',
  },
];

const Item = ({item}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <Text>{item.Project_code}</Text>
      <Text>{item.Project_title}</Text>
    </View>
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
