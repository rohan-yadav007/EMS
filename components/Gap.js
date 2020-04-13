import React, {Component} from 'react';
import {Dimensions, View} from 'react-native';

const window = Dimensions.get('window');
const screen = Dimensions.get('screen');

class Gap extends Component {
  state = {
    dimensions: {
      window,
      screen,
    },
  };
  onChange = ({window, screen}) => {
    this.setState({dimensions: {window, screen}});
  };

  componentDidMount() {
    Dimensions.addEventListener('change', this.onChange);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.onChange);
  }
  getMargin = () => {
    const {dimensions} = this.state;
    if (dimensions.window.width > dimensions.window.height) {
      return {
        marginTop: 40,
      };
    } else {
      return {
        marginTop: 130,
      };
    }
  };
  render() {
    return <View style={this.getMargin()} />;
  }
}
export default Gap;
