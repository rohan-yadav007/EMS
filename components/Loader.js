import React, {Component} from 'react';
import {ActivityIndicator} from 'react-native';
import styled from 'styled-components';

const Loading = styled.ActivityIndicator`
  position: absolute;
  top: ${props => props.top || '50%'};
  left: ${props => props.left || '50%'};
  z-index: 1;
`;

const Loader = props => {
  return (
    <Loading top={props.top} left={props.left}>
      <ActivityIndicator size="large" color="#3875c3" />
    </Loading>
  );
};
//   async componentDidMount() {
//     const {top, left} = this.props;
//     if (top && left) {
//       await this.setState({
//         top: top,
//         left: left,
//       });
//     }
//   }

export default Loader;
