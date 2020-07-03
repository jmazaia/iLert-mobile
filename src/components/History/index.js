import React from 'react';
import Moment from 'moment';
import {Container, Name, Left, Avatar, Info, Time} from './styles';
import images from '../../assets/images';

export default function History({data}) {
  return (
    <Container>
      <Left>
        <Avatar source={images[data.type]} />
        <Info>
          <Name>{data.title}</Name>
          <Time>{Moment(data.createdAt).format('llll')}</Time>
        </Info>
      </Left>
    </Container>
  );
}
