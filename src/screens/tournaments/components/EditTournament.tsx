import React, { useEffect, useState } from 'react';
import { Alert, Modal, View } from 'react-native';
import { useDispatch } from 'react-redux';
import Button from 'src/components/Button';
import Input from 'src/components/Input';
import { editTournamentAction } from 'src/domain/tournaments/tournamentsActions';
import { TournamentModel } from 'src/domain/tournaments/tournamentsModel';
import { TournamentModalStyle } from './TournamentModalStyle.style';

export const EditTournament = ({
  id,
  name,
}: Pick<TournamentModel, 'id' | 'name'>) => {
  const [updatedName, onChangeText] = useState(name);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    onChangeText(name);
  }, [name]);

  return (
    <>
      <Button onPress={openModal}>Edit Tournament</Button>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={TournamentModalStyle.centeredView}>
          <View style={TournamentModalStyle.modalView}>
            <Input onChangeText={onChangeText} value={updatedName} />
            <Button
              onPress={closeModal}
              style={TournamentModalStyle.buttonClose}
            >
              Cancel
            </Button>
            <Button
              onPress={updateTournamentData}
              style={TournamentModalStyle.buttonConfirm}
            >
              Update
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
  }

  function updateTournamentData() {
    if (updatedName.trim().length === 0) {
      Alert.alert("Can't update to an empty string");
      closeModal();
      return;
    }

    if (updatedName.match('[a-zA-Z0-9 ]') === null) {
      Alert.alert(
        'Invalid character found, only latin characters, numbers and spaces can be used'
      );
      closeModal();
      return;
    }

    dispatch(editTournamentAction({ id, name: updatedName }));
    closeModal();
  }
};
