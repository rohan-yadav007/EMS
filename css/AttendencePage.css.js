import styled from 'styled-components/native';
export const Status_Wrapper = styled.View`
flex-direction: column;
justify-content: center;
margin-left: 20px;
margin-right: 20px;
margin-top: 20px;
margin-bottom: 20px;
flex: 1;
`;

export const Punch_status = styled.View`
 background-color:${props=>props.bg || '#58b61c'};
margin-top: 5px;
border-radius: 15px;
margin-bottom: 5px;
padding: 30px;
flex-direction: row;
justify-content: space-between;
`;

export const CustomText = styled.Text`
color: #fff;
font-size: 18px;
`;