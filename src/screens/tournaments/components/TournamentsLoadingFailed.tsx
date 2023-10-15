import React from 'react';
import { View } from 'react-native';
import Button from 'src/components/Button';
import H6 from 'src/components/H6';
import { TournamentStyle } from './Tournament.style';

export const TournamentsLoadingFailed = ({
  retryFetchData,
}: {
  retryFetchData: () => void;
}) => {
  return (
    <View style={TournamentStyle.container}>
      <H6>Something went wrong.</H6>
      <Button onPress={retryFetchData}>Retry</Button>
    </View>
  );
};
