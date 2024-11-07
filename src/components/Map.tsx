import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Pin, PinType } from '../types';
import { useAuth } from '../contexts/AuthContext';
import PinDetails from './PinDetails';

interface MapComponentProps {
  pins: Pin[];
  visibleTypes: PinType[];
  onPinPress: (pin: Pin) => void;
  onMapLongPress: (event: any) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({
  pins,
  visibleTypes,
  onPinPress,
  onMapLongPress,
}) => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    })();
  }, []);

  const getPinColor = (type: PinType) => {
    switch (type) {
      case 'safe':
        return 'green';
      case 'caution':
        return 'yellow';
      case 'danger':
        return 'red';
      default:
        return 'blue';
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location?.coords.latitude || 0,
          longitude: location?.coords.longitude || 0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onLongPress={onMapLongPress}
      >
        {pins
          .filter((pin) => visibleTypes.includes(pin.type))
          .map((pin) => (
            <Marker
              key={pin._id}
              coordinate={pin.location}
              pinColor={getPinColor(pin.type)}
              onPress={() => onPinPress(pin)}
            />
          ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default MapComponent;