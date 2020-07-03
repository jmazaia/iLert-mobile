import {View, Alert, Picker, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Geolocation from '@react-native-community/geolocation';
import {Text, Container, FormInput} from './styles';
import api from '../../services/api';
import Background from '../../components/Background';

export default function AddScreen({navigation}) {
  const types = {
    1: 'Incêndio',
    2: 'Alagamento',
    3: 'Desastre Natural',
    4: 'Manifestação',
    5: 'Tiroteio',
  };
  const profile = useSelector(state => state.user.profile);
  const [selectedValue, setSelectedValue] = useState('select');
  const [position, setPosition] = useState({});
  const [description, setDescription] = useState('');
  Geolocation.getCurrentPosition(position => {
    setPosition(position);
  });
  const createAlert = async () => {
    if (selectedValue == 'select') {
      Alert.alert('Selecione um Tipo de Desastre');
    } else {
      api
        .post('/createAlert', {
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
          title: types[selectedValue],
          userCreated: profile.id,
          subtitle: description,
          type: selectedValue,
        })
        .then(response => {
          Alert.alert(`Alerta criado com sucesso!`);
        })
        .catch(error => {
          Alert.alert(`Erro: ${error}`);
        });
    }
  };

  return (
    <Background>
      <Container>
        <TouchableOpacity
          style={{marginBottom: 100}}
          onPress={() => navigation.navigate('Dashboard')}>
          <Icon2 name="arrowleft" size={30} color="#fff" />
        </TouchableOpacity>
        <Text> Tipo de Desastre:</Text>
        <Picker
          selectedValue={selectedValue}
          style={{color: 'white', marginBottom: 30, width: 200, height: 44}}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
          <Picker.Item label="Selecione o alerta..." value="select" />
          <Picker.Item label="Incêndio" value="1" />
          <Picker.Item label="Alagamento" value="2" />
          <Picker.Item label="Tiroteio" value="5" />
          <Picker.Item label="Desastre natural" value="3" />
          <Picker.Item label="Manifestação" value="4" />
        </Picker>
        <Text> Descrição:</Text>
        <FormInput
          maxLength={100}
          multiline
          placeholder="Descreva os detalhes sobre o alerta."
          value={description}
          onChangeText={setDescription}
        />
        <View
          style={{
            width: 70,
            position: 'absolute',
            top: '90%',
            alignSelf: 'flex-end',
          }}>
          <TouchableOpacity onPress={() => createAlert()}>
            <Icon2 name="checkcircle" size={50} color="#1A73E8" />
          </TouchableOpacity>
        </View>
      </Container>
    </Background>
  );
}
