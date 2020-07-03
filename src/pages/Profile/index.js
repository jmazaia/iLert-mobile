import React, {useRef, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity, Modal} from 'react-native';
import Background from '../../components/Background';
import History from '../../components/History';
import api from '../../services/api';

import {
  Container,
  Title,
  Form,
  FormInput,
  SubmitButton,
  List,
  Separator,
} from './styles';
import {updateProfileRequest} from '../../store/modules/user/actions';

export default function Profile({navigation}) {
  const dispatch = useDispatch();

  const profile = useSelector(state => state.user.profile);
  const emailRef = useRef();
  const oldPasswordRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [response, setResponse] = useState('');

  async function list() {
    const res = await api.get(`/listId/${profile.id}`);
    setResponse(res.data);
    console.log(response);
  }
  function handleSubmit() {
    dispatch(
      updateProfileRequest({
        name,
        email,
        oldPassword,
        password,
        confirmPassword,
      }),
    );
  }
  return (
    <Background>
      <Container>
        <Title>Meu perfil</Title>
        <Form>
          <FormInput
            icon="person-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Nome completo"
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
            value={name}
            onChangeText={setName}
          />
          <FormInput
            icon="mail-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu e-mail"
            ref={emailRef}
            returnKeyType="next"
            onSubmitEditing={() => oldPasswordRef.current.focus()}
            value={email}
            onChangeText={setEmail}
          />
          <Separator />

          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Sua senha atual"
            ref={oldPasswordRef}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            value={oldPassword}
            onChangeText={setOldPassword}
          />
          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Sua nova senha"
            ref={passwordRef}
            returnKeyType="next"
            onSubmitEditing={() => confirmPasswordRef.current.focus()}
            value={password}
            onChangeText={setPassword}
          />
          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Confirmação de senha"
            ref={confirmPasswordRef}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </Form>
        <SubmitButton onPress={handleSubmit}>Atualiza perfil</SubmitButton>
        <SubmitButton
          onPress={() => {
            list();
            setIsVisible(true);
          }}>
          Histórico
        </SubmitButton>
        <Modal animationType={'slide'} transparent={false} visible={isVisible}>
          <Background>
            <Container>
              <Title>Histórico</Title>
              <TouchableOpacity
                style={{marginLeft: 15, marginTop: -28, marginBottom: 100}}
                onPress={() => setIsVisible(false)}>
                <Icon2 name="arrowleft" size={30} color="#fff" />
              </TouchableOpacity>
              <List
                data={response}
                renderItem={({item}) => <History data={item} />}
              />
            </Container>
          </Background>
        </Modal>
      </Container>
    </Background>
  );
}
Profile.navigationOptions = {
  tabBarLabel: 'Meu Perfil',
  tabBarIcon: ({tintColor}) => (
    <Icon name="person" size={20} color={tintColor} />
  ),
};
