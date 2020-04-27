import styled from 'styled-components/native';

export const Customborder = styled.View`
  margin-top: 10px;
`;

export const Customtext = styled.Text`
  color: #fff;
  font-size: 15px;
  min-width: 296px;
`;
export const TouchableOpacity = styled.View`
  position: absolute;
  top: 0;
`;
export const Loader = styled.View`
  position: absolute;
  top: ${props => props.top || '50%'};
  left: ${props => props.left || '50%'};
  z-index: 11;
`;

export const ModalTopContent = styled.View`
  background-color: #fff;
  margin: 30px;
  padding: 40px;
  border-radius: 10px;
  margin-top: 280px;
`; 
export const ModalBottomContent = styled.View`
  background-color: #fff;
  margin: 30px;
  padding: 30px;
  border-radius: 10px;
  margin-top: 280px;
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