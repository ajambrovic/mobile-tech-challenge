import React, { useState } from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import Button from '../../../components/Button';
import { useDispatch } from 'react-redux';
import { FAB } from '@rneui/themed';
import Input from '../../../components/Input';
import { createTournamentAction } from '../../../domain/tournaments/tournamentsActions';

export const AddTournament = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, onChangeText] = useState('');
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
            <Input onChangeText={onChangeText} value={name} />
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
  }

  function createTournament() {
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
