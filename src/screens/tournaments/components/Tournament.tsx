import React from 'react';

import { View } from 'react-native';
import { TournamentModel } from 'src/domain/tournaments/tournamentsModel';
import { DeleteTournament } from './DeleteTournament';
import { EditTournament } from './EditTournament';
import { TournamentStyle } from './Tournament.style';
import { Text } from 'src/components/Text';
import H6 from 'src/components/H6';
import { formatDate } from './tournamentUtil';

export const Tournament = ({
  tournamentData,
}: {
  tournamentData: TournamentModel;
}) => {
  return (
    <View style={TournamentStyle.container}>
      <H6>Name: {tournamentData.name}</H6>
      <Text>Game: {tournamentData.game}</Text>
      <Text>Organizer: {tournamentData.organizer}</Text>
      <Text>Current participants: {tournamentData.participants.current}</Text>
      <Text>Max participants: {tournamentData.participants.max}</Text>
      <Text>Start date: {formatDate(tournamentData.startDate)}</Text>
      <View style={TournamentStyle.buttonContainer}>
        <EditTournament id={tournamentData.id} />
        <DeleteTournament id={tournamentData.id} />
      </View>
    </View>
  );
};
