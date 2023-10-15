import { FAB } from '@rneui/base';
import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import Button from 'src/components/Button';
import Input from 'src/components/Input';
import { postTournamentToServerAction } from 'src/domain/tournaments/tournamentsActions';
import { TournamentModalStyle } from './TournamentModalStyle.style';
import { isTournamentNameValid } from './tournamentUtil';
import theme from 'src/theme';
import H6 from 'src/components/H6';

export const AddTournament = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, updateTournamentName] = useState('');
  const dispatch = useDispatch();

  return (
    <>
      <FAB
        visible={true}
        icon={{ name: 'add', color: theme.palette.text.primary }}
        onPress={openModal}
        color={theme.palette.primary.main}
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
            <H6>Add tournament</H6>
            <Input onChangeText={updateTournamentName} value={name} />
            <View style={TournamentModalStyle.buttonContainer}>
              <Button onPress={closeModal}>Cancel</Button>
              <Button onPress={createTournament}>OK</Button>
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
    updateTournamentName('');
  }

  function createTournament() {
    const errorMessage = isTournamentNameValid(name);
    if (errorMessage !== undefined) {
      Alert.alert(errorMessage);
      return;
    }
    dispatch(postTournamentToServerAction(name));
    closeModal();
  }
};

const styles = StyleSheet.create({
  fab: {
    marginBottom: '10%',
  },
});
