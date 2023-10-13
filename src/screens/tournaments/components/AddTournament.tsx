import React, { useState } from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import Button from '../../../components/Button';
// import { useDispatch } from 'react-redux';
import H6 from '../../../components/H6';
import { FAB } from '@rneui/themed';

export const AddTournament = () => {
  const [modalVisible, setModalVisible] = useState(false);
  //  const dispatch = useDispatch();

  return (
    <>
      <FAB
        visible={true}
        icon={{ name: 'add' }}
        onPress={openModal}
        color="green"
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={stylesModal.centeredView}>
          <View style={stylesModal.modalView}>
            <H6>Do you really want to delete this tournament?</H6>
            <Button onPress={closeModal}>Cancel</Button>
            <Button onPress={deleteTournament}>Confirm</Button>
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

  function deleteTournament() {
    // dispatch(deleteTournamentAction(id));
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
