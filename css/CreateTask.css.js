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
  display: flex;
  margin-top: 30px;
  flex-direction: column;
`;
export const Input = styled.TextInput`
  padding: 5px;
  flex: 8;
  border-bottom-width:1px;
  border-bottom-color:#aaaaaa;
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
