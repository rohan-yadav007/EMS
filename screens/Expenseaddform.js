/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  View,
  Image,
  Text,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  Picker,
  Modal,
  ScrollView,
  TextInput,
} from 'react-native';
import { Input, InputGroup } from '../css/CreateTask.css';
import {ModalTopContent,NavButton, CloseButton} from '../css/Expense.css';
import Header from '../components/Header';
import { connect } from 'react-redux';
import { handlechangetask } from '../redux/Action/CreateTask.action';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Close from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker';
import { Col, Grid } from 'react-native-easy-grid';

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
      Popup:false
    };
  }
  handleChange = async (text, name) => {
    await this.setState({ [name]: text });
  };
  handleView = () => {

  }
  render() {
    const {Popup} = this.state;
    return (
      <>
      <Modal transparent={true} visible={Popup}>
        <View style={{ backgroundColor: '#000000aa', flex: 1 }}>
          <ModalTopContent>
            <CloseButton onPress={() => this.setState({Popup:false})}>
              <Close name="close-circle" color='#0072e6' size={30} />
            </CloseButton>

            <NavButton >
              <Text style={{textAlign: 'center', color: '#fff', fontSize: 15, textTransform: 'uppercase', }}>
                Project View
              </Text>
           
              <Text style={{textAlign: 'center',color: '#fff',fontSize: 15, textTransform: 'uppercase', }}>
               Task List
              </Text>
            </NavButton>
            
          </ModalTopContent>
        </View>
      </Modal>
        <SafeAreaView style={{ flex: 1, flexDirection: 'column' }}>
          <Header title={'Add Form'} />
          <ImageBackground
            style={{ flex: 1 }}
            source={require('../static/background2.png')}>
            <ScrollView>
              <View style={{ paddingLeft: 10, marginTop: 20, paddingRight: 10 }}>
                <Text style={{ marginTop: 15 }}>Employee Name</Text>
                <InputGroup>
                  <Input
                    placeholder="Super"
                    value={this.state.taskName}
                    onChangeText={text => this.handleChange(text, 'Supre')}
                  />
                </InputGroup>

                <Text style={{ marginTop: 15 }}>Department</Text>
                <InputGroup>
                  <Input
                    placeholder="Sales & Marketing"
                    value={this.state.taskName}
                    onChangeText={text =>
                      this.handleChange(text, 'Sales & Marketing')
                    }
                  />
                </InputGroup>

                <Text style={{ marginTop: 15 }}>Designation</Text>
                <InputGroup>
                  <Input
                    placeholder="Sale Head"
                    value={this.state.taskName}
                    onChangeText={text => this.handleChange(text, 'Sale Head')}
                  />
                </InputGroup>

                <Text style={{ marginTop: 15 }}>Employee ID</Text>
                <InputGroup>
                  <Input
                    placeholder="111"
                    value={this.state.taskName}
                    onChangeText={text => this.handleChange(text, '111')}
                  />
                </InputGroup>

                <Text style={{ marginTop: 15 }}>Project</Text>
                <InputGroup>
                  <Picker
                    style={{ height: 55, width: '100%' }}
                    selectedValue={this.state.department}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({ department: itemValue,Popup:true })
                    }>
                    <Picker.Item label="Non Project" value="Non Project"/>
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
  return { taskName };
};

export default connect(
  mapStateToProps,
  { handlechangetask },
)(Expenseaddform);
