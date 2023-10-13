import React, { useState } from 'react';
import { View, StyleSheet, Modal, Alert } from 'react-native';
import Button from '../../../components/Button';
import { useDispatch } from 'react-redux';
import { FAB } from '@rneui/themed';
import Input from '../../../components/Input';
import { createTournamentAction } from '../../../domain/tournaments/tournamentsActions';

export const AddTournament = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, updateTournamentName] = useState('');
  const dispatch = useDispatch();

  return (
    <>
      <FAB
        visible={true}
        icon={{ name: 'add', color: 'white' }}
        onPress={openModal}
        color="green"
        placement="right"
        style={{ marginBottom: '10%' }}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={stylesModal.centeredView}>
          <View style={stylesModal.modalView}>
            <Input onChangeText={updateTournamentName} value={name} />
            <Button onPress={closeModal}>Cancel</Button>
            <Button onPress={createTournament}>OK</Button>
          </View>
        </View>
      </Modal>
    </>
  );

  function openModal() {
    setModalVisible(true);
  }

  function closeModal() {
    setModalVisible(false);
    updateTournamentName('');
  }

  function createTournament() {
    if (name.trim().length === 0) {
      Alert.alert("Name can't be empty");
      return;
    }

    if (name.match('[a-zA-Z0-9 ]') === null) {
      Alert.alert(
        'Invalid character found, only latin characters, numbers and spaces can be used'
      );
      return;
    }
    dispatch(createTournamentAction(name));
    closeModal();
  }
};

const stylesModal = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'black',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
