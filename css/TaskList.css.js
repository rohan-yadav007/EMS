import styled from 'styled-components/native';

export const Srnumber = styled.Text`
  font-size: 14px;
  background-color: #06adcb;
  border-top-right-radius: 5px;
  text-transform: uppercase;
  text-align: center;
  font-weight: bold;
  padding: 15px;
  color: #fff;
  margin-top:20px;
  width:100%;
`;

export const Tasklist1 = styled.View`
  background-color: #f1f1f1;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 20px;
  padding-bottom: 20px;
`;

export const Taskboder = styled.View`
  border: 1px solid #ebebeb;
  margin-bottom: 10px;
  border-radius: 4px;
  padding-bottom: 15px;
  padding-top: 15px;
  padding-left: 10px;
  padding-right: 10px;
  background-color:#fff;  
`;

export const Buttontext = styled.View`
  background: #f9cd00;
  padding: 10px;
  border-radius: 5px;
  padding-bottom: 15px;
  margin-top: 0px;
  border:1px solid #f1f1f1;
`;
export const TaskStatus = styled.View`
  background: #f9cd00;
  /* padding: 10px; */
  border-radius: 5px;
  /* padding-bottom: 15px; */
  margin-top: 0px;
  border:1px solid #f1f1f1;
`;
export const ButtonMedium = styled.View`
  background: #09b90d;
  padding: 10px;
  border-radius: 5px;
  padding-bottom: 15px;
  margin-top: 0px;
  border:1px solid #f1f1f1;
`;

export const AddTask = styled.TouchableOpacity`
  background-color: #000000b0;
  padding: 10px;
  flex-direction: row;
  border-radius: 4px;
  width: 100%;
  margin-top: 5px;
  justify-content: center;
`;

export const AddTaskText = styled.Text`
  text-align: center;
  font-size: 17px;
  margin-left:5px;
  color: #fff;
  text-transform: uppercase;
`;