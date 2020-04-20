import styled from 'styled-components/native';

export const Module = styled.View`
  flex-direction: column;
`;
export const Module2 = styled.Text`
color:#fff;
font-size:18px;
`;

export const CustomText = styled.Text`
  font-size: ${props => props.fs || '40px'};
  /* justify-content:'center'; */
  /* text-align: center; */
  font-weight: bold;
  color:#fff;
`;
