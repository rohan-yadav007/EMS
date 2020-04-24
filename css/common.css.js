import styled from 'styled-components/native';
export const Loader = styled.View`
  position: absolute;
  top: ${props => props.top || '50%'};
  left: ${props => props.left || '50%'};
  z-index: 11;
`;