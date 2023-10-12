import React from 'react';
import { TournamentModel } from '../../../domain/tournaments/tournamentsModel';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    flexDirection: 'row',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flexWrap: 'wrap',
    marginHorizontal: 10,
  },
});

export const Tournament = ({
  tournamentData,
}: {
  tournamentData: TournamentModel;
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Name: {tournamentData.name}</Text>
        <Text style={styles.title}>Game: {tournamentData.game}</Text>
        <Text style={styles.title}>Organizer: {tournamentData.organizer}</Text>
        <Text style={styles.title}>
          Current participants: {tournamentData.participants.current}
        </Text>
        <Text style={styles.title}>
          Max participants: {tournamentData.participants.max}
        </Text>
        <Text style={styles.title}>Start date: {tournamentData.startDate}</Text>
      </View>
    </View>
  );
};
