import React from 'react';
import axios from 'axios';

export default function Appointments({data}) {
  return (
    <Name>
      {data.item.userOnDesk} {'\n'}({data.item.userLogin})
    </Name>
  );
}
