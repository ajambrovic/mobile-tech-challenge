import React from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import Container from '../components/Container';
import H4 from '../components/H4';
import Input from '../components/Input';
import {
  getTournamentsNetworkStatus,
  getTournamentsNumber,
} from '../domain/tournaments/tournamentsSelectors';
import { useTypedSelector } from '../store';
import { NetworkRequestStatus } from '../store/networkRequestModel';

const Tournaments = () => {
  return (
    <Container>
      <H4>Faceit Tournaments</H4>
      <TournamentsData />
    </Container>
  );
};

const TournamentsData = () => {
  const loading = useTypedSelector((state) =>
    getTournamentsNetworkStatus(state)
  );
  const tournamentsNumber = useTypedSelector((state) =>
    getTournamentsNumber(state)
  );

  if (loading === NetworkRequestStatus.InProgress) {
    return (
      <>
        <ActivityIndicator />
        <Input>Loading tournaments ...</Input>
      </>
    );
  }

  if (loading === NetworkRequestStatus.Fail) {
    return <Input>Something went wrong.</Input>;
  }

  if (tournamentsNumber === 0) {
    return <Input> No tournaments found.</Input>;
  }

  return <FlatList data={[]} renderItem={() => <></>} />;
};

export default Tournaments;
