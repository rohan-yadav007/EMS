import React, { Component } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  TextInput,
  Picker,
  ScrollView,
} from 'react-native';
import {
  LeaveTab,
  Form,
  Savebut,
  InputGroup,
  Input,
  CustomText
} from '../css/ApplyLeave.css';
import {getLeaveType} from '../redux/Action/Leave.action';
import { Col, Grid } from 'react-native-easy-grid';
import Header from '../components/Header';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DateTimePicker from '@react-native-community/datetimepicker';
import {connect} from 'react-redux';

const InputBox = ({ text, placeHolder, value }) => {
  return (
    <Form style={{ flex: 1 }}>
      <Grid>
        <Col>
          <View>
            <Text >{text}</Text>
            <InputGroup>
             <TextInput
              style={{
                color:'#000',
                height: 45,
                borderRadius: 4,
              }}
             value={`${value}`}
             editable={false}
            />
            </InputGroup>
          </View>
        </Col>
      </Grid>
    </Form>
  )
}

const SelectBox = ({ text }) => {
  return (
    <Form>
      <Grid>
        <Col>
          <View>
            <Text>{text}</Text>
            <InputGroup>
              <TextInput style={{ width: '87%' }}
                value={'place'}
              // onFocus={() => { this.setState({ ...dateObj, selectedInput: "d_ReportSubmissionDate" }) }}
              />
              <Icon
                style={{ width: '13%', padding: 4, right: 0 }}
                name="calendar-edit" size={35} color="#2696f2"
              />
              <DateTimePicker
                style={{ width: '100%', height: 55 }}
                // mode={mode}
                value={new Date()}
                // display={'date'}
                onChange={(event, date) => console.log(date)}
             
              />
            </InputGroup>
          </View>
        </Col>
      </Grid>
    </Form>
  )
}

class ApplyLeave extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leaveType: '',
      d_FromDate: '',
      d_ToDate: ''
    }
  }
  async componentDidMount() {
    const { navigation } = this.props;
    this._unsubscribe = navigation.addListener('focus', async () => {
      await this._onRefresh()
    });
  }
  componentWillUnmount() {
    this._unsubscribe();
  }
  _onRefresh = async () => {
    await this.props.getLeaveType();
  }
  handleSelect = (Value, name) => {
    console.log(Value,name);
    this.setState({[name]:Value});
  }
  render() {
    const {typeList} = this.props;
    const {leaveType} = this.state;
    return (
      <>
        <ImageBackground
          style={{ flex: 1 }}
          source={require('../static/background2.png')}>
          <Header title={"Apply Leave"} />

          <SafeAreaView
            style={{
              paddingTop: 5,
              paddingLeft: 10,
              paddingRight: 10,
              paddingBottom: 60,
            }}>
            <ScrollView>
              <Grid>
                <Col>
                    <LeaveTab bg='#70be15'>
                      <CustomText fs='16px'>Sick</CustomText>
                      <CustomText fs='18px'>{typeList && typeList[0]?.n_LeaveCount}</CustomText>
                    </LeaveTab>
                </Col>
                <Col>
                    <LeaveTab bg='#c304aa'>
                      <CustomText fs='16px'>Casual </CustomText>
                      <CustomText fs='18px'>{typeList && typeList[1]?.n_LeaveCount}</CustomText>
                    </LeaveTab>
                </Col>
                <Col>
                    <LeaveTab bg='#efdc04'>
                      <CustomText fs='16px'>Earned</CustomText>
                      <CustomText fs='18px'>{typeList && typeList[2]?.n_LeaveCount}</CustomText>
                    </LeaveTab>
                </Col>
                <Col>
                    <LeaveTab bg='#e301b6'>
                      <CustomText fs='16px'>Paternity</CustomText>
                      <CustomText fs='18px'>{typeList && typeList[3]?.n_LeaveCount}</CustomText>
                    </LeaveTab>
                </Col>
              </Grid>

              <Form style={{ flex: 1 }}>
                <Grid>
                  <Col>
                    <View>
                      <Text style={{ marginTop: 10, marginBottom: 10 }}>
                        Leave Type{' '}
                      </Text>

                      <Picker
                        selectedValue={leaveType}
                        onValueChange={(itemValue, itemIndex) => this.handleSelect(itemValue, 'leaveType')}
                        style={{ height: 50, width: '100%' }}>
                        <Picker.Item label="Select" value={null} />
                        {typeList?.map((e, i) => {
                      return (
                        <Picker.Item key={i} label={e.t_LeaveName} value={e.n_RemainingLeave} />
                      )
                    })}
                      </Picker>
                    </View>

                  </Col>
                </Grid>
              </Form>

              <InputBox value={leaveType} text={'Leave Count'} placeHolder={'Leave Count'} />
              <SelectBox text='Start Date' />
              <SelectBox text='End Date' />

              <Form >
                <Grid>
                  <Col>
                    <View>
                      <Text style={{ marginTop: 10, marginBottom: 10 }}>
                        Club Leave
                    </Text>
                      <TextInput
                        style={{
                          height: 45,
                          backgroundColor: '#fff',
                          borderWidth: 1,
                          borderColor: '#d0d0d0',
                          borderRadius: 4,
                        }}
                        
                        placeholder="Type here to translate!"
                      />
                    </View>
                  </Col>
                </Grid>
              </Form>

              <Form >
                <Grid>
                  <Col>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text style={{ marginTop: 15 }}>Reason</Text>
                    </View>

                    <InputGroup h='100px'>
                      <Input
                        multiline={true}
                        numberOfLines={5}
                        value={'hiii'}
                        onChangeText={text =>
                          console.log(text)
                        }
                      />
                    </InputGroup>

                  </Col>
                </Grid>
              </Form>

              <Form>
                <Grid>
                  <Col>
                    <View>
                      <Savebut>
                        <Text>Save</Text>
                      </Savebut>
                    </View>
                  </Col>
                  <Col>
                    <View>
                      <Savebut style={{ backgroundColor: '#e50000' }}>
                        <Text>Cancel</Text>
                      </Savebut>
                    </View>
                  </Col>
                </Grid>
              </Form>
            </ScrollView>
          </SafeAreaView>
        </ImageBackground>
      </>
    );
  }
}
const mapStateToProps = state => {
  const typeList = state.LeaveReducer.LeaveType;
  return {
    typeList,
  }
}
export default connect(mapStateToProps,{getLeaveType})(ApplyLeave)