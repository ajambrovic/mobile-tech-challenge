import React, { useState } from 'react';
import { Modal, TouchableHighlight, View } from 'react-native';
import Button from 'src/components/Button';
import { TournamentModel } from 'src/domain/tournaments/tournamentsModel';
import { DeleteTournament } from './DeleteTournament';
import { EditTournament } from './EditTournament';
import { TournamentDetails } from './TournamentDetails';
import { TournamentDetailsStyle } from './TournamentDetails.style';
import { TournamentModalStyle } from './TournamentModalStyle.style';
import { useTypedSelector } from 'src/store';
import { getTournamentData } from 'src/domain/tournaments/tournamentsSelectors';

export const Tournament = ({
  tournamentId,
}: {
  tournamentId: TournamentModel['id'];
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const tournamentData = useTypedSelector((state) =>
    getTournamentData(state, tournamentId)
  );

  return (
    <View style={TournamentDetailsStyle.container}>
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={openModal}
      >
        <TournamentDetails tournamentData={tournamentData} />
      </TouchableHighlight>
      <View style={TournamentDetailsStyle.buttonContainer}>
        <EditTournament id={tournamentData.id} />
        <DeleteTournament id={tournamentData.id} />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={TournamentModalStyle.centeredView}>
          <View style={TournamentModalStyle.modalView}>
            <TournamentDetails tournamentData={tournamentData} />
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
