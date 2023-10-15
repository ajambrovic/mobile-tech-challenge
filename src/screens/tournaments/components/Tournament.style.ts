import { StyleSheet } from 'react-native';
import theme from 'src/theme';

export const TournamentStyle = StyleSheet.create({
  container: {
    borderRadius: theme.borderRadius,
    borderColor: theme.palette.background.alt2,
    borderWidth: 1,
    marginHorizontal: 16,
    marginVertical: 12,
    padding: theme.contentPadding * 4,
  },
  buttonContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    columnGap: 10,
    margin: 10,
  },
});
