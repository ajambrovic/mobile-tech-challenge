import React, { useEffect, useState } from 'react';
import { Alert, Modal, View } from 'react-native';
import { useDispatch } from 'react-redux';
import Button from 'src/components/Button';
import Input from 'src/components/Input';
import { editTournamentAction } from 'src/domain/tournaments/tournamentsActions';
import { TournamentModel } from 'src/domain/tournaments/tournamentsModel';
import { getTournamentName } from 'src/domain/tournaments/tournamentsSelectors';
import { useTypedSelector } from 'src/store';
import { TournamentModalStyle } from './TournamentModalStyle.style';
import { isTournamentNameValid } from './tournamentUtil';

export const EditTournament = ({ id }: Pick<TournamentModel, 'id'>) => {
  const tournamentName = useTypedSelector((state) =>
    getTournamentName(state, id)
  );
  const [updatedName, onChangeText] = useState(tournamentName);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    onChangeText(tournamentName);
  }, [tournamentName]);

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
            <Input
              onChangeText={onChangeText}
              value={updatedName}
              style={TournamentModalStyle.input}
            />
            <View style={TournamentModalStyle.buttonContainer}>
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
    const errorMessage = isTournamentNameValid(updatedName);
    if (errorMessage !== undefined) {
      Alert.alert(errorMessage);
      return;
    }

    dispatch(editTournamentAction({ id, name: updatedName }));
    closeModal();
  }
};
