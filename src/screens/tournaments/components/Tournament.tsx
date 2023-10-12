import React, { useState } from 'react';
import { TournamentModel } from '../../../domain/tournaments/tournamentsModel';
import { View, Text, StyleSheet, Modal, Alert } from 'react-native';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { useDispatch } from 'react-redux';
import { editTournamentAction } from '../../../domain/tournaments/tournamentsActions';

const styles = StyleSheet.create({
  container: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    flexDirection: 'row',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flexWrap: 'wrap',
    marginHorizontal: 10,
  },
});

export const Tournament = ({
  tournamentData,
}: {
  tournamentData: TournamentModel;
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Name: {tournamentData.name}</Text>
        <Text style={styles.title}>Game: {tournamentData.game}</Text>
        <Text style={styles.title}>Organizer: {tournamentData.organizer}</Text>
        <Text style={styles.title}>
          Current participants: {tournamentData.participants.current}
        </Text>
        <Text style={styles.title}>
          Max participants: {tournamentData.participants.max}
        </Text>
        <Text style={styles.title}>Start date: {tournamentData.startDate}</Text>
        <EditTournament name={tournamentData.name} id={tournamentData.id} />
      </View>
    </View>
  );
};

const EditTournament = ({ id, name }: Pick<TournamentModel, 'id' | 'name'>) => {
  const [updatedName, onChangeText] = useState(name);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      <Button onPress={() => setModalVisible(true)}>Edit Tournament</Button>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={stylesModal.centeredView}>
          <View style={stylesModal.modalView}>
            <Input onChangeText={onChangeText} value={updatedName} />
            <Button onPress={closeModal}>Cancel</Button>
            <Button onPress={updateTournamentData}>Update</Button>
          </View>
        </View>
      </Modal>
    </>
  );

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

const stylesModal = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
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
