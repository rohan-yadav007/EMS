/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import { Calendar } from 'react-native-calendars';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  BackHandler,
  SafeAreaView,
} from 'react-native';
import Header from '../components/Header';

class AttendencePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>
          <Header openMenu={this.props.navigation.openDrawer} />

          <View>
            <Calendar
              // Initially visible month. Default = Date()
              current={new Date()}
              // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
              minDate={new Date()}
              // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
              maxDate={new Date()}
              // Handler which gets executed on day press. Default = undefined
              onDayPress={day => {
                console.log('selected day', day);
              }}
              // Handler which gets executed on day long press. Default = undefined
              onDayLongPress={day => {
                console.log('selected day', day);
              }}
         
             
              // Hide month navigation arrows. Default = false
              hideArrows={true}
              // Replace default arrows with custom ones (direction can be 'left' or 'right')
              renderArrow={direction => <Arrow />}
              // Do not show days of other months in month page. Default = false
              hideExtraDays={true}
              // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
              // day from another month that is visible in calendar page. Default = false
              disableMonthChange={false}
              // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
              firstDay={1}
              // Hide day names. Default = false
              hideDayNames={false}
              // Show week numbers to the left. Default = false
              showWeekNumbers={false}
              // Handler which gets executed when press arrow icon left. It receive a callback can go back month
              onPressArrowLeft={substractMonth => substractMonth()}
              // Handler which gets executed when press arrow icon right. It receive a callback can go next month
              onPressArrowRight={addMonth => addMonth()}
              // Disable left arrow. Default = false
              disableArrowLeft={true}
              // Disable right arrow. Default = false
              disableArrowRight={true}
            />
          </View>
        </SafeAreaView>
      </>
    );
  }
}

export default AttendencePage;
