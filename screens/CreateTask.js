/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import RNDateTimePicker  from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-datepicker';
import { 
  View,
  Text,
  Button,
  ImageBackground,
  TouchableOpacity,
  BackHandler,
  StyleSheet,
  SafeAreaView,
  ScrollView
} from 'react-native';
// import {
//   BalanceLeaves,
//   Module,
//   CustomText,
//   ModuleBG,
//   Module2,
//   CustomText2,
// } from '../css/Dashboard.css';
import {
    CustomText,
    Input,
    InputBox,
    InputGroup,
    Select
} from '../css/CreateTask.css'
import Header from '../components/Header';
import { connect } from "react-redux";
import { handlechangetask } from '../redux/Action/CreateTask.action';


class CreateTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
    taskName:'',
    department : '',
    asignee :'',
    date : new Date(),
    toDate : '',
    taskAsignDate : '',
    taskAsignTime:'',
    taskSummary : '',
    taskPriority:'',
    taskSummary : '',
    show :false,
    mode: 'date',
    isDateTimePickerVisible: false
    };
    
  }
  handleChange = async(text,name) =>{
    await this.setState({[name]: text});
 }
 
 onChange = (event, selectedDate) => {
  const currentDate = selectedDate || this.state.date;
  console.log("Platform:", Platform.OS);
  this.setState({show:Platform.OS === 'android'?true:false,date:currentDate})
};

 showMode = currentMode => {
  this.setState({show:true, mode:currentMode})
};

 showDatepicker = () => {
  this.showMode('date');
};

 showTimepicker = () => {
  this.showMode('time');
  console.log("Platform:", Platform.OS);
};
  render() {
    return (
      <>
       
          <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>
              <ScrollView>
            <Header openMenu={this.props.navigation.openDrawer} />
            <View style={{backgroundColor:'blue',padding:10}}>
            <CustomText ta="center" color="#fff"> Task Details</CustomText> 
            </View>
            <View>
               <InputGroup>
               <InputBox>
               <Input type="text" placeholder="Task Name" 
                      value={this.state.taskName} 
                      onChangeText={(text) => this.handleChange(text, 'taskName')}
                />
               </InputBox>
               </InputGroup>
                
                <Select 
                         selectedValue={this.state.department}
                         onValueChange={(itemValue, itemIndex) =>
                            this.setState({department: itemValue})}
                 >
                <Select.Item label="select department" value="java" />
                 <Select.Item label="JavaScript" value="js" /> 
              </Select>
              <Select 
                // selectedValue={selectedValue}
                // onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                 >
                <Select.Item label="select Employee" value="java" />
                {/* <Select.Item label="JavaScript" value="js" /> */}
              </Select>
             
        <View>
        <Button onPress={this.showDatepicker} title="Show date picker!" />
      </View>
      <View>
        <Button onPress={this.showTimepicker} title="Show time picker!" />
      </View> 
      
      {this.state.show &&
      //   <RNDateTimePicker 
      //   testID="dateTimePicker"
      //   timeZoneOffsetInMinutes={0}
      //   value={this.state.date}
      //   mode={this.state.mode}
      //   is24Hour={true}
      //   display="default"
      //   onChange={this.onChange}
      // />
      <DatePicker
          style={{ width: 200 }}
          date={this.state.date} //initial date from state
          mode="date" //The enum of date, datetime and time
          placeholder="select date"
          format="DD-MM-YYYY"
          minDate="01-01-2016"
          maxDate="01-01-2019"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
          }}
          onDateChange={date => {
            this.setState({ date: date });
          }}
        />
       }
         <CustomText ta="center" color="black" >From Date</CustomText>
              <CustomText ta="center" color="black" > To Date</CustomText>
              <CustomText ta="center" color="black" > Task Assign Date</CustomText>
              <CustomText ta="center" color="black" > Task Assign time</CustomText>
               <InputGroup>
               <InputBox>
               <Input placeholder="Task Summary" 
                      multiline={true}
                     value={this.state.taskSummary} 
                    onChangeText={(text) => this.handleChange(text, 'taskSummary')}
                />
               </InputBox>
               </InputGroup>
               <Select 
                // selectedValue={selectedValue}
                // onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                 >
                <Select.Item label="Task Priority" value="java" />
                {/* <Select.Item label="JavaScript" value="js" /> */}
              </Select>
              <Select 
                // selectedValue={selectedValue}
                // onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                 >
                <Select.Item label="Task Status" value="java" />
                {/* <Select.Item label="JavaScript" value="js" /> */}
              </Select>
               <InputGroup>
               <InputBox>
               <Input placeholder="Choose file" 
                    //   value={taskName} 
                    //   onChangeText={(text) => this.handleChange(text, 'password')}
                />
               </InputBox>
               </InputGroup> 
            </View>
           
            </ScrollView>
          </SafeAreaView>
     
      </>
    );
  }
}

  
const mapStateToProps = (state) => {
    const taskName = state.CreateTaskReducer.taskName;
    return { taskName };
};

export default connect(mapStateToProps, { handlechangetask })(CreateTask);
