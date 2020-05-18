import styled from 'styled-components/native';


export const LeaveTab = styled.View`
  background: ${props=>props.bg ||'#efdc04'};
  color: #fff;
  text-align: center;
  margin: 4px;
  line-height: 27px;
  border-radius: 4px;
  font-size: 15px;
  flex-direction:column;
`;
export const CustomText = styled.Text`
align-self:center;
color:#fff;
font-family:${props=>props.fw ? 'RobotoSlab-Bold' : 'RobotoSlab-Regular'};
font-size: 14px;
`;


export const Form = styled.View`
  margin-top: 15px;
  flex: 1 ;
  /* margin-bottom: 10px; */
`;

export const Savebut = styled.TouchableOpacity`
  background-color: #00a34d;
  padding: 15px;
  color: #fff;
  text-align: center;
  font-size: 15px;
  text-transform: uppercase;
  border-radius:5px;
  margin:5px;
  margin-top:20px;
`;

export const InputGroup = styled.View`
  display: flex;
  margin-top: 5px;
  flex-direction: column;
  background-color: #fff;
  height:${props=>props.h || '50px'} ;
  border-radius: 4px;
  flex-direction:row;
`;
export const Input = styled.TextInput`
  padding: 5px;
  flex: 8;
`;