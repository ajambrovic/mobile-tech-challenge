import { StyleSheet } from 'react-native';
import theme, { SCREEN_WIDTH } from 'src/theme';

export const TournamentDetailsStyle = StyleSheet.create({
  container: {
    borderRadius: theme.borderRadius,
    borderColor: theme.palette.background.alt2,
    borderWidth: 1,
    marginHorizontal: 16,
    marginVertical: 12,
    padding: theme.contentPadding * 4,
  },
  buttonContainer: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    columnGap: SCREEN_WIDTH / 42,
    marginTop: SCREEN_WIDTH / 42,
    marginBottom: SCREEN_WIDTH / 42,
  },
});
