import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import H6 from 'src/components/H6';
import { TournamentDetailsStyle } from './TournamentDetails.style';

export const TournamentsInitialLoader = () => {
  return (
    <View style={TournamentDetailsStyle.container}>
      <ActivityIndicator size={'large'} />
      <H6>Loading tournaments ...</H6>
    </View>
  );
};
