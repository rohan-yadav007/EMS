import styled from 'styled-components/native';

// export const CustomText = styled.Text`
//   text-align: ${props => props.ta || 'left'};
//   color: ${props => props.color || 'black'};
//   background-color:${props => props.bg || '#fff'}
// `;

export const CustomText = styled.Text`
text-align: ${props => props.ta || 'left'};
color: ${props => props.color || 'transparent'};
`;

export const InputGroup = styled.View`
  top: 10%;
  display: flex;
  margin-top: 30px;
  flex-direction: row;
`;
export const Input = styled.TextInput`
  padding: 5px;
  flex: 8;
`;
export const InputBox = styled.View`
  border-bottom-width: 1px;
  display: flex;
  flex-direction: row;
  border-bottom-color: #fff;
  flex: 7;
`;
export const Select = styled.Picker`
flex-direction:row;
display:flex;
margin-top: 20px;
`;
