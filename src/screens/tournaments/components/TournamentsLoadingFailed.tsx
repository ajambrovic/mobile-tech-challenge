import React from 'react';
import { View } from 'react-native';
import Button from 'src/components/Button';
import H6 from 'src/components/H6';
import { TournamentDetailsStyle } from './TournamentDetails.style';

export const TournamentsLoadingFailed = ({
  retryFetchData,
}: {
  retryFetchData: () => void;
}) => {
  return (
    <View style={TournamentDetailsStyle.container}>
      <H6>Something went wrong.</H6>
      <Button onPress={retryFetchData}>Retry</Button>
    </View>
  );
};
