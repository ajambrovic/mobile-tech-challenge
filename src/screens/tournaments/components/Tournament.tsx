import React from 'react';

import { Text, View } from 'react-native';
import { TournamentModel } from 'src/domain/tournaments/tournamentsModel';
import { DeleteTournament } from './DeleteTournament';
import { EditTournament } from './EditTournament';
import { TournamentStyle } from './Tournament.style';

export const Tournament = ({
  tournamentData,
}: {
  tournamentData: TournamentModel;
}) => {
  return (
    <View style={TournamentStyle.container}>
      <View style={TournamentStyle.titleContainer}>
        <Text style={TournamentStyle.title}>Name: {tournamentData.name}</Text>
        <Text style={TournamentStyle.title}>Game: {tournamentData.game}</Text>
        <Text style={TournamentStyle.title}>
          Organizer: {tournamentData.organizer}
        </Text>
        <Text style={TournamentStyle.title}>
          Current participants: {tournamentData.participants.current}
        </Text>
        <Text style={TournamentStyle.title}>
          Max participants: {tournamentData.participants.max}
        </Text>
        <Text style={TournamentStyle.title}>
          Start date: {tournamentData.startDate}
        </Text>
        <View style={TournamentStyle.buttonContainer}>
          <EditTournament id={tournamentData.id} />
          <DeleteTournament id={tournamentData.id} />
        </View>
      </View>
    </View>
  );
};
