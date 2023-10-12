import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import Container from '../components/Container';
import H4 from '../components/H4';
import Input from '../components/Input';
import {
  getTournamentsData,
  getTournamentsInitialLoad,
  getTournamentsNetworkStatus,
} from '../domain/tournaments/tournamentsSelectors';
import { useTypedSelector } from '../store';
import { NetworkRequestStatus } from '../store/networkRequestModel';
import { TournamentModel } from '../domain/tournaments/tournamentsModel';
import { useDispatch } from 'react-redux';
import { fetchTournamentsByPage } from '../domain/tournaments/tournamentsReducers';

const Tournaments = () => {
  return (
    <Container>
      <H4>Faceit Tournaments</H4>
      <TournamentsData />
    </Container>
  );
};

const TournamentsData = () => {
  const [page, _setPage] = useState(1);
  const loading = useTypedSelector((state) =>
    getTournamentsNetworkStatus(state)
  );
  const initialLoad = useTypedSelector((state) =>
    getTournamentsInitialLoad(state)
  );
  const tournamentsData = useTypedSelector((state) =>
    getTournamentsData(state)
  );
  const dispatch = useDispatch();
  useEffect(() => {
    fetchTournamentsByPage(page)(dispatch);
  }, [dispatch, page]);

  if (initialLoad) {
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

  if (tournamentsData.length === 0) {
    return <Input> No tournaments found.</Input>;
  }

  return (
    <FlatList
      data={tournamentsData}
      renderItem={(tournament) => <Input>{tournament.index}</Input>}
      keyExtractor={keyExtractor}
      initialNumToRender={NUMBER_OF_TOURNAMENTS_TO_FETCH}
    />
  );
};

const NUMBER_OF_TOURNAMENTS_TO_FETCH = 10;

function keyExtractor(item: TournamentModel) {
  return item.id;
}

export default Tournaments;
