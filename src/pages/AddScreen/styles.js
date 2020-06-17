import styled from 'styled-components/native';
import {Platform} from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  padding: 0 30px;
  margin-top: 50px;
`;

export const FormInput = styled(Input)`
  margin-top: 10px;
  width: 300px;
  height: 200px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
`;
export const Text = styled.Text`
  color: #1a73e8;
  font-weight: bold;
  font-size: 16px;
`;
