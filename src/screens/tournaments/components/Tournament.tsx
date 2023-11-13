import React, { useState } from 'react';
import { Modal, TouchableHighlight, View } from 'react-native';
import Button from 'src/components/Button';
import { TournamentModel } from 'src/domain/tournaments/tournamentsModel';
import { DeleteTournament } from './DeleteTournament';
import { EditTournament } from './EditTournament';
import { TournamentDetails } from './TournamentDetails';
import { TournamentDetailsStyle } from './TournamentDetails.style';
import { TournamentModalStyle } from './TournamentModalStyle.style';

export const Tournament = ({ id }: Pick<TournamentModel, 'id'>) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={TournamentDetailsStyle.container}>
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={openModal}
      >
        <TournamentDetails id={id} />
      </TouchableHighlight>
      <View style={TournamentDetailsStyle.buttonContainer}>
        <EditTournament id={id} />
        <DeleteTournament id={id} />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={TournamentModalStyle.centeredView}>
          <View style={TournamentModalStyle.modalView}>
            <TournamentDetails id={id} />
            <View style={TournamentModalStyle.buttonContainer}>
              <Button onPress={closeModal}>Close</Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );

  function openModal() {
    setModalVisible(true);
  }

  function closeModal() {
    setModalVisible(false);
  }
};
