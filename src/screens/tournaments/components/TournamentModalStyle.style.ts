import { StyleSheet } from 'react-native';

const button = {
  borderRadius: 20,
  padding: 10,
  elevation: 2,
};

export const TournamentModalStyle = StyleSheet.create({
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
  buttonConfirm: {
    backgroundColor: '#F194FF',
    ...button,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    ...button,
  },
});
