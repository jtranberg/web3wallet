import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import MapComponent from '../components/Map';
import PinDetails from '../components/PinDetails';
import FilterButtons from '../components/FilterButtons';
import AddPinModal from '../components/AddPinModal';
import { Pin, PinType } from '../types';
import { usePins } from '../hooks/usePins';

const MapScreen = () => {
  const [selectedPin, setSelectedPin] = useState<Pin | null>(null);
  const [visibleTypes, setVisibleTypes] = useState<PinType[]>(['safe', 'caution', 'danger']);
  const [isAddingPin, setIsAddingPin] = useState(false);
  const [tempLocation, setTempLocation] = useState(null);
  
  const { pins, addPin, updatePin } = usePins();

  const handleMapLongPress = (event: any) => {
    setTempLocation(event.nativeEvent.coordinate);
    setIsAddingPin(true);
  };

  const handlePinPress = (pin: Pin) => {
    setSelectedPin(pin);
  };

  const togglePinType = (type: PinType) => {
    setVisibleTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  return (
    <View style={styles.container}>
      <MapComponent
        pins={pins}
        visibleTypes={visibleTypes}
        onPinPress={handlePinPress}
        onMapLongPress={handleMapLongPress}
      />
      
      <FilterButtons
        visibleTypes={visibleTypes}
        onToggle={togglePinType}
      />

      <PinDetails
        pin={selectedPin}
        visible={!!selectedPin}
        onClose={() => setSelectedPin(null)}
        onDowngrade={updatePin}
      />

      <AddPinModal
        visible={isAddingPin}
        location={tempLocation}
        onClose={() => {
          setIsAddingPin(false);
          setTempLocation(null);
        }}
        onSubmit={addPin}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MapScreen;