import styled from 'styled-components/native';

export const Taskboder = styled.View`
  margin-bottom: 10px;
  margin-top: 25px;
  padding-left: 20px;
  padding-right: 20px;
  flex-direction:column;
`;

export const Tasklist1 = styled.View`

  padding-left: 10px;
  padding-right: 10px;
  padding-top: 20px;
  padding-bottom: 20px;
`;

export const Content = styled.View`
flex-direction:row;
justify-content:space-between;
padding:15px;
`;

export const Input = styled.TextInput`
background-color: #fff;
flex: 5;
border-radius: 8px;
color:#000;
font-family:'RobotoSlab-Regular';
`;

export const CustomText = styled.Text`
flex: 2;
padding-bottom: 10px;
font-family:'RobotoSlab-Bold';
`;

export const ContentWrapper = styled.View`
/* flex-direction: row; */
/* justify-content: space-around; */
margin-top: 20px;
`;

export const TextValue = styled.Text`
font-size: 14px ;
width:60%;
font-family:'RobotoSlab-Regular';
align-self: center;
`;

export const TextHead = styled.Text`

width:40%;
font-family:'RobotoSlab-Bold';
/* font-weight: 900; */
`;