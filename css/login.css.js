import styled from 'styled-components/native';

export const Loader = styled.View`
  position: absolute;
  top: ${props => props.top || '50%'};
  left: ${props => props.left || '50%'};
  z-index: 11;
`;

export const WebsiteWrapper = styled.View`
  margin-top: 10%;
`;

export const WebsiteLogo = styled.Image`
  align-self: center;
  position: absolute;
`;

export const CustomText = styled.Text`
  text-align: ${props => props.ta || 'left'};
  color: ${props => props.color || 'transparent'};
`;

export const LoginForm = styled.View`
  padding: 20px;
`;

export const InputGroup = styled.View`
  top: 10%;
  display: flex;
  margin-top: 30px;
  flex-direction: row;
`;
export const Input = styled.TextInput`
  padding: 5px;
  /* border-bottom-width: 1px;
  border-bottom-color: #fff; */
  flex: 8;
`;
export const InputBox = styled.View`
  border-bottom-width: 1px;
  display: flex;
  flex-direction: row;
  border-bottom-color: #fff;
  flex: 7;
`;
export const InputLogo = styled.Image`
  margin-top: 10px;
  margin-right: 5px;
`;

export const LoginButton = styled.TouchableOpacity`
  position: relative;
  margin-top: 12%;
  height: 50px;
  border-radius: 100px;
  width: 100%;
  justify-content: center;
  background-color: #3875c3;
`;
export const ForgotLink = styled.View`
  position: relative;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 15%;
  width: 100%;
`;

export const ErrorText = styled.Text`
  flex: 2;
  color: red;
  margin-top: 11px;
`;
