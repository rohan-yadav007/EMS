import React from 'react';
import {ActivityIndicator} from 'react-native';
import styled from 'styled-components';

const Loading = styled.ActivityIndicator`
  position: absolute;
  top: ${props => props.top || '50%'};
  left: ${props => props.left || '50%'};
  z-index: 1;
`;

const LoaderModule = props => {
  return (
    <Loading top={props.top} left={props.left}>
      <ActivityIndicator size="large" color="#3875c3" />
    </Loading>
  );
};

export default LoaderModule;
