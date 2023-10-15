import React, { useState } from 'react';
import { Modal, View } from 'react-native';
import { useDispatch } from 'react-redux';
import Button from 'src/components/Button';
import H6 from 'src/components/H6';
import { postDeleteTournamentToServerAction } from 'src/domain/tournaments/tournamentsActions';
import { TournamentModel } from 'src/domain/tournaments/tournamentsModel';
import { TournamentModalStyle } from './TournamentModalStyle.style';

export const DeleteTournament = ({ id }: Pick<TournamentModel, 'id'>) => {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      <Button onPress={openModal}>Delete Tournament</Button>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={TournamentModalStyle.centeredView}>
          <View style={TournamentModalStyle.modalView}>
            <H6>Do you really want to delete this tournament?</H6>
            <Button
              onPress={closeModal}
              style={TournamentModalStyle.buttonClose}
            >
              Cancel
            </Button>
            <Button
              onPress={deleteTournament}
              style={TournamentModalStyle.buttonConfirm}
            >
              Confirm
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

  function deleteTournament() {
    dispatch(postDeleteTournamentToServerAction(id));
    closeModal();
  }
};
