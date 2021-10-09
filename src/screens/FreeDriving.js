import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import MapView, {
  Marker,
  AnimatedRegion,
  Polyline,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import haversine from 'haversine';
import FreeDrivingButton from '../components/FreeDrivingButton';
import ResultModal from '../components/ResultModal';
import {getData, storeData} from '../utils';

const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
//const LATITUDE = 37.78825;
//const LONGITUDE = -122.4324;

class FreeDriving extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: 0,
      longitude: 0,
      routeCoordinates: [],
      distanceTravelled: 0,
      prevLatLng: {},
      coordinate: new AnimatedRegion({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
      }),
      active: false,
      modalVisible: false,
      modalDistance: 0,
    };
  }

  componentDidMount() {
    this.positionListener();
  }

  positionListener = () => {
    const {coordinate} = this.state;

    this.watchID = Geolocation.watchPosition(
      position => {
        const {active, routeCoordinates, distanceTravelled} = this.state;
        const {latitude, longitude} = position.coords;

        const newCoordinate = {
          latitude,
          longitude,
        };

        coordinate.timing(newCoordinate).start();

        this.setState({
          latitude,
          longitude,
          routeCoordinates: active
            ? routeCoordinates.concat([newCoordinate])
            : [],
          distanceTravelled: active
            ? distanceTravelled + this.calcDistance(newCoordinate)
            : 0,
          prevLatLng: newCoordinate,
        });
      },
      error => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 10,
      },
    );
  };

  getMapRegion = () => {
    return {
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    };
  };

  calcDistance = newLatLng => {
    const {prevLatLng} = this.state;
    return haversine(prevLatLng, newLatLng) || 0;
  };

  onButtonPress = () => {
    if (this.state.active) {
      getData('totalDistance').then(data => {
        const prevData = isNaN(data) ? 0 : parseFloat(data);
        const val = prevData + this.state.distanceTravelled;
        storeData('totalDistance', val.toString());
      });
      this.setState({
        modalVisible: true,
        modalDistance: this.state.distanceTravelled,
      });
    }
    Geolocation.clearWatch(this.watchID);
    this.positionListener();
    this.setState({active: !this.state.active});
  };

  render() {
    console.log(this.state);
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          showUserLocation
          followUserLocation
          loadingEnabled
          region={this.getMapRegion()}>
          {this.state.routeCoordinates.length ? (
            <Polyline
              coordinates={this.state.routeCoordinates}
              strokeWidth={5}
            />
          ) : null}
          <Marker.Animated coordinate={this.state.coordinate} />
        </MapView>
        <FreeDrivingButton
          onPress={this.onButtonPress.bind(this)}
          isActive={this.state.active}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.bubble, styles.button]}>
            <Text style={styles.bottomBarContent}>
              {parseFloat(this.state.distanceTravelled).toFixed(2)} km
            </Text>
          </TouchableOpacity>
        </View>
        <ResultModal
          visible={this.state.modalVisible}
          distance={parseFloat(this.state.modalDistance).toFixed(2)}
          closeModal={() => this.setState({modalVisible: false})}
        />
      </View>
    );
  }
}

const styles = {
  container: {flex: 1},
  map: {flex: 1},
  bubble: {flex: 1},
  button: {alignItems: 'center'},
  buttonContainer: {flexDirection: 'row', marginVertical: 20},
};

export default FreeDriving;
