import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Foundation';
import {View, Image, TouchableOpacity} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView from 'react-native-maps';
import Icon2 from 'react-native-vector-icons/AntDesign';
import api from '../../services/api';
import images from '../../assets/images';

class MapComponent extends Component {
  componentDidMount() {
    this.fetchMarkerData();
  }

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      markers: [],
    };
  }

  async fetchMarkerData() {
    const response = await api.get('/list');
    this.setState({
      isLoading: false,
      markers: response.data,
    });
  }

  render() {
    Geolocation.getCurrentPosition(info =>
      this.setState({
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
      }),
    );

    const {latitude} = this.state;
    const {longitude} = this.state;
    return (
      <View style={{flex: 1}}>
        <MapView
          style={{flex: 1}}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}>
          {this.state.isLoading
            ? null
            : this.state.markers.map((marker, index) => {
                const coords = {
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                };

                return (
                  <MapView.Marker
                    key={index}
                    coordinate={coords}
                    title={marker.title}
                    description={marker.subtitle}>
                    <Image
                      style={{width: 30, height: 30}}
                      source={images[marker.type]}
                    />
                  </MapView.Marker>
                );
              })}
        </MapView>
        <View
          style={{
            width: 70,
            position: 'absolute', // use absolute position to show button on top of the map
            top: '90%', // for center align
            alignSelf: 'flex-end', // for align to right
          }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('AddScreen')}>
            <Icon2 name="pluscircle" size={50} color="#1A73E8" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

MapComponent.navigationOptions = {
  tabBarLabel: 'Mapa',
  tabBarIcon: ({tintColor}) => <Icon name="map" size={20} color={tintColor} />,
};
export default MapComponent;
