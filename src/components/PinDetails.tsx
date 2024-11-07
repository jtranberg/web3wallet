import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Pin } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface PinDetailsProps {
  pin: Pin | null;
  visible: boolean;
  onClose: () => void;
  onDowngrade?: (pin: Pin) => void;
}

const PinDetails: React.FC<PinDetailsProps> = ({
  pin,
  visible,
  onClose,
  onDowngrade,
}) => {
  const { user } = useAuth();

  if (!pin) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Location Details</Text>
          <Text style={styles.type}>Status: {pin.type}</Text>
          <Text style={styles.details}>{pin.details}</Text>
          <Text style={styles.date}>
            Reported: {new Date(pin.createdAt).toLocaleDateString()}
          </Text>

          {user?.isAdmin && onDowngrade && (
            <TouchableOpacity
              style={styles.downgradeButton}
              onPress={() => onDowngrade(pin)}
            >
              <Text style={styles.buttonText}>Downgrade Status</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  type: {
    fontSize: 16,
    marginBottom: 5,
  },
  details: {
    fontSize: 16,
    marginBottom: 10,
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  downgradeButton: {
    backgroundColor: '#ff9800',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default PinDetails;