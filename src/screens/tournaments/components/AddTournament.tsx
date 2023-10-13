import { FAB } from '@rneui/base';
import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import Button from 'src/components/Button';
import Input from 'src/components/Input';
import { createTournamentAction } from 'src/domain/tournaments/tournamentsActions';
import { TournamentModalStyle } from './TournamentModalStyle.style';

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
        style={styles.fab}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={TournamentModalStyle.centeredView}>
          <View style={TournamentModalStyle.modalView}>
            <Input onChangeText={updateTournamentName} value={name} />
            <Button
              onPress={closeModal}
              style={TournamentModalStyle.buttonClose}
            >
              Cancel
            </Button>
            <Button
              onPress={createTournament}
              style={TournamentModalStyle.buttonConfirm}
            >
              OK
            </Button>
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

const styles = StyleSheet.create({
  fab: {
    marginBottom: ' 10%',
  },
});
