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
  align-self: center;
  font-weight: bold;
`;
export const CustomText2 = styled.Text`
  align-self: center;
  color: #fff;
  margin-top: 45px;
  font-size: 15px;
`;

export const ModuleBG = styled.ImageBackground`
  border-radius: 40px;
  width: 100%;
  text-align: center;
  height: 123px;
  padding: 15px;
  box-shadow: 2px 3px 4px #000;
  border-radius: 8px;
  overflow: hidden;
`;

export const ModuleBG2 = styled.ImageBackground`
  width: 100%;
  text-align: center;
  padding: 10px;
  box-shadow: 2px 3px 4px #000;
  height:50px;
  border-radius: 8px;
  overflow: hidden;
`;

export const Loader = styled.View`
  position: absolute;
  top: ${props => props.top || '50%'};
  left: ${props => props.left || '45%'};
  z-index: 11;
`;
