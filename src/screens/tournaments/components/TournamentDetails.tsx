import React from 'react';

import H6 from 'src/components/H6';
import { Text } from 'src/components/Text';
import { TournamentModel } from 'src/domain/tournaments/tournamentsModel';
import { formatDate } from './tournamentUtil';

export const TournamentDetails = ({
  tournamentData,
}: {
  tournamentData: TournamentModel;
}) => {
  return (
    <>
      <H6>Name: {tournamentData.name}</H6>
      <Text>Game: {tournamentData.game}</Text>
      <Text>Organizer: {tournamentData.organizer}</Text>
      <Text>Current participants: {tournamentData.participants.current}</Text>
      <Text>Max participants: {tournamentData.participants.max}</Text>
      <Text>Start date: {formatDate(tournamentData.startDate)}</Text>
    </>
  );
};
