import styled from 'styled-components/native';

export const Module = styled.View`
  flex-direction: column;
`;
export const Module2 = styled.Text`
  color: #fff;
  font-size: 18px;
`;

export const CustomText = styled.Text`
  font-size: ${props => props.fs || 20};
  align-self: center;
  font-weight: ${props => props.fw || 900};
  color: #fff;
 


`;
export const CustomText2 = styled.Text`

  align-self: center;

  color: #fff;
  margin-top:35px;
  font-size:15px;

 


`;

export const ModuleBG = styled.ImageBackground`
  flex: 1;
  height: 100px;
  min-width: 170px;
  padding: 15px;
  border-radius: 40px;
`;
