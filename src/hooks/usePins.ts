import { useState, useEffect } from 'react';
import { Pin, PinType } from '../types';
import { useAuth } from '../contexts/AuthContext';

export const usePins = () => {
  const [pins, setPins] = useState<Pin[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    // Fetch pins from MongoDB
    // This is a placeholder
    setPins([]);
  }, []);

  const addPin = async (location: { latitude: number; longitude: number }, type: PinType, details: string) => {
    if (!user) return;

    const newPin: Pin = {
      _id: Date.now().toString(),
      location,
      type,
      details,
      createdBy: user._id,
      createdAt: new Date(),
    };

    // Add to MongoDB
    setPins([...pins, newPin]);
  };

  const updatePin = async (pin: Pin) => {
    if (!user?.isAdmin) return;

    const updatedPins = pins.map((p) => {
      if (p._id === pin._id) {
        return {
          ...p,
          type: getDowngradedType(p.type),
        };
      }
      return p;
    });

    // Update in MongoDB
    setPins(updatedPins);
  };

  const getDowngradedType = (type: PinType): PinType => {
    switch (type) {
      case 'danger':
        return 'caution';
      case 'caution':
        return 'safe';
      default:
        return 'safe';
    }
  };

  return { pins, addPin, updatePin };
};