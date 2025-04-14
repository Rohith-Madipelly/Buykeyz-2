import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { setToken } from '../../redux/actions/LoginAction';
// import { deleteUserData, setToken } from './yourActions'; // replace with your actual imports

const DeleteConfirmationModal = ({ visible, onClose }) => {
  const [isDeleteDisabled, setIsDeleteDisabled] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (visible) {
      setIsDeleteDisabled(true);
      const timer = setTimeout(() => setIsDeleteDisabled(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  const handleDelete = () => {
    // dispatch(deleteUserData());
    dispatch(setToken(""));
    onClose();
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Delete Account?</Text>
          <Text style={styles.message}>
            If you click Delete, your data will be permanently deleted and you won’t be able to log in again.
          </Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleDelete}
              style={[styles.deleteButton, isDeleteDisabled && styles.disabledButton]}
              disabled={isDeleteDisabled}
            >
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center'
  },
  modal: {
    width: 300, backgroundColor: 'white', borderRadius: 10, padding: 20
  },
  title: {
    fontSize: 18, fontWeight: 'bold', marginBottom: 10
  },
  message: {
    fontSize: 14, marginBottom: 20
  },
  buttonRow: {
    flexDirection: 'row', justifyContent: 'flex-end'
  },
  cancelButton: {
    marginRight: 10
  },
  cancelText: {
    color: '#666'
  },
  deleteButton: {
    backgroundColor: 'red', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 5
  },
  deleteText: {
    color: 'white'
  },
  disabledButton: {
    backgroundColor: '#ccc'
  }
});

export default DeleteConfirmationModal;
