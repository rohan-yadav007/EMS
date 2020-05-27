import styled from 'styled-components/native';

export const Tablelist1 = styled.Text`
  text-align: center;
  color: #fff;
  font-size: 15px;
  text-transform: uppercase;
  font-weight: bold;
  font-family: 'RobotoSlab-Regular';
`;

export const ModalTopContent = styled.View`
  background-color: #fff;
  height:100%;
  width:100%;
  padding-left: 30px;
  padding-right: 30px;
`; 

export const CloseButton = styled.TouchableOpacity`
 position:absolute;
 right:0PX;
 margin:10px;
`; 

export const NavButton = styled.TouchableOpacity`
  background-color: #0072e6;
  border-radius: 4px;
  padding: 12px;
  margin: 15px;
`;

export const Customborder = styled.TouchableOpacity`
 padding:5px;
 margin-top:5px;
  border-left-width:5px;
  border-color:#2196f3;
  background-color:#bfebffb8;
`;

export const Customtext = styled.Text`
  color: #000;
  font-size: 15px;
  padding:5px;
  font-family: 'RobotoSlab-Regular';
`;
export const Srnumber = styled.Text`
  font-size: 14px;
  background-color: red;
  border-top-right-radius: 5px;
  text-align: center;
  font-weight: bold;
  padding: 15px;
  color: #fff;
  margin-top:20px;
  width:100%;
  font-family: 'RobotoSlab-Regular';
`;

export const Tasklist1 = styled.View`
  background-color: #f1f1f1;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  padding-top: 10px;
`;

export const Taskborder = styled.View`
  padding:10px;
`;

export const InputGroup = styled.View`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  height:${props=>props.h || '50px'} ;
  border-radius: 4px;
  flex-direction:row;
`;
export const Input = styled.TextInput`
  padding: 5px;
  flex: 8;
  color:#000;
`;

export const ExpenseText = styled.Text`
margin-top:15px;
margin-bottom:5px;
font-family: 'RobotoSlab-Bold';
`;

export const TaskTitle = styled.Text`
font-family: 'RobotoSlab-Bold';
font-size:18px;
align-self:center;
border-bottom-width:2px;
border-bottom-color:#fff;
padding:10px;
color:#fff;
border-radius:5px;
margin-bottom:5px;
`;