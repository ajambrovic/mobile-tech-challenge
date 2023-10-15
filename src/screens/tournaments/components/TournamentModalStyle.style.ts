import { StyleSheet } from 'react-native';
import theme from 'src/theme';

export const TournamentModalStyle = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
  },
  modalView: {
    backgroundColor: theme.palette.background.body,
    padding: theme.contentPadding * 4,
    borderColor: theme.palette.background.alt2,
    borderWidth: 1,
  },
  buttonContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    columnGap: 10,
    margin: 10,
  },
});
