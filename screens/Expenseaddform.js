/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  View,
  Image,
  Text,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  Picker,
  ScrollView,
  TextInput,
} from 'react-native';
import {Input, InputGroup} from '../css/CreateTask.css';
import Header from '../components/Header';
import {connect} from 'react-redux';
import {handlechangetask} from '../redux/Action/CreateTask.action';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker';
import {Col, Grid} from 'react-native-easy-grid';

// More info on all the options is below in the API Reference... just some common use cases shown here
const options = {
  title: 'Select',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
const myPickerTheme = {
  dateIcon: {
    position: 'relative',
  },
  dateInput: {
    width: 100,
    borderWidth: 0,
  },
};

class Expenseaddform extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskName: '',
      department: 'IT',
      assignee: 'simran',
      date: new Date(),
      fromDate: '',
      toDate: '',
      taskAssignDate: '',
      taskAssignTime: '',
      taskSummary: '',
      taskPriority: '',
      show: false,
      mode: '',
      isDateTimePickerVisible: false,
      selectedInput: '',
      avatarSource: null,
    };
  }
  handleChange = async (text, name) => {
    await this.setState({[name]: text});
  };

  onChange = (event, selectedDate, name) => {
    const currentDate = selectedDate || this.state.date;
    if (name) {
      console.log(selectedDate, name);
      if (name === 'taskAssignTime') {
        let timeHour = currentDate.getHours();
        if (timeHour < 10) {
          timeHour = '0' + timeHour;
        }
        let timeMinute = currentDate.getMinutes();
        if (timeMinute < 10) {
          timeMinute = '0' + timeMinute;
        }
        const time = timeHour + ':' + timeMinute;
        this.setState(prevState => {
          return {
            ...prevState,
            show: false,
            [name]: `${time}`,
          };
        });
      } else {
        const day = currentDate.getDate();
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();

        let date = '';
        if (month < 10) {
          const getmonth = '0' + (month + 1).toString();
          date = day + '-' + getmonth + '-' + year;
        }
        this.setState(prevState => {
          return {
            ...prevState,
            show: false,
            [name]: `${date}`,
          };
        });
      }
    }
  };

  handleImage = async () => {
    ImagePicker.showImagePicker(options, async response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('cancelled');
      } else if (response.error) {
        console.log('Error: ', response.error);
      } else {
        const source = {uri: 'data:image/jpeg;base64,' + response.data};
        this.setState({
          avatarSource: source,
        });
      }
    });
  };

  render() {
    const {
      show,
      mode,
      fromDate,
      taskAssignTime,
      avatarSource,
      selectedInput,
      taskAssignDate,
      taskSummary,
      toDate,
      date,
    } = this.state;
    const dateObj = {mode: 'date', show: true};
    const timeObj = {mode: 'time', show: true};
    return (
      <>
        <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>
          <Header title={'Add Form'} />
          <ImageBackground
            style={{flex: 1}}
            source={require('../static/background2.png')}>
            <ScrollView>
              <View style={{paddingLeft: 10, marginTop: 20, paddingRight: 10}}>
                <Text style={{marginTop: 15}}>Employee Name</Text>
                <InputGroup>
                  <Input
                    placeholder="Super"
                    value={this.state.taskName}
                    onChangeText={text => this.handleChange(text, 'Supre')}
                  />
                </InputGroup>

                <Text style={{marginTop: 15}}>Department</Text>
                <InputGroup>
                  <Input
                    placeholder="Sales & Marketing"
                    value={this.state.taskName}
                    onChangeText={text =>
                      this.handleChange(text, 'Sales & Marketing')
                    }
                  />
                </InputGroup>

                <Text style={{marginTop: 15}}>Designation</Text>
                <InputGroup>
                  <Input
                    placeholder="Sale Head"
                    value={this.state.taskName}
                    onChangeText={text => this.handleChange(text, 'Sale Head')}
                  />
                </InputGroup>

                <Text style={{marginTop: 15}}>Employee ID</Text>
                <InputGroup>
                  <Input
                    placeholder="111"
                    value={this.state.taskName}
                    onChangeText={text => this.handleChange(text, '111')}
                  />
                </InputGroup>

                <Text style={{marginTop: 15}}>Project</Text>
                <InputGroup>
                  <Picker
                    style={{height: 55, width: '100%'}}
                    selectedValue={this.state.department}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({department: itemValue})
                    }>
                    <Picker.Item label="Non Project" value="Non Project" />
                    <Picker.Item label="EliteMindz" value="EliteMindz" />
                  </Picker>
                </InputGroup>

                <Grid>
                  <Col>
                    <TouchableOpacity
                      style={{
                        marginTop: 30,
                        marginBottom: 20,
                        borderRadius: 15,
                      }}>
                      <LinearGradient
                        colors={['#26a903', '#1b6108', '#0c3601']}>
                        <Text
                          style={{
                            width: '100%',
                            padding: 13,
                            textAlign: 'center',
                            color: '#fff',
                            fontSize: 18,
                          }}>
                          Save
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </Col>
                  <Col>
                    <TouchableOpacity
                      style={{
                        marginTop: 30,
                        marginBottom: 20,
                        borderRadius: 15,
                        marginLeft: 10,
                      }}>
                      <LinearGradient
                        colors={['#d71d1d', '#ff5959', '#d71d1d']}>
                        <Text
                          style={{
                            width: '100%',
                            padding: 13,
                            textAlign: 'center',
                            color: '#fff',
                            fontSize: 18,
                          }}>
                          Submit
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </Col>
                </Grid>
              </View>
            </ScrollView>
          </ImageBackground>
        </SafeAreaView>
      </>
    );
  }
}

const mapStateToProps = state => {
  const taskName = state.CreateTaskReducer.taskName;
  return {taskName};
};

export default connect(
  mapStateToProps,
  {handlechangetask},
)(Expenseaddform);
