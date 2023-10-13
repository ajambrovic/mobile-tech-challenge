import React, { useEffect, useState } from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
  Text,
} from 'react-native';
import Container from '../../components/Container';
import H4 from '../../components/H4';
import {
  getCurrentTournamentPage,
  getCurrentTournamentSearchQuery,
  getIsListEnd,
  getTournamentsData,
  getTournamentsInitialLoad,
  getTournamentsNetworkStatus,
} from '../../domain/tournaments/tournamentsSelectors';
import { useTypedSelector } from '../../store';
import { NetworkRequestStatus } from '../../store/networkRequestModel';
import { TournamentModel } from '../../domain/tournaments/tournamentsModel';
import { useDispatch } from 'react-redux';
import {
  loadTournamentsDataAction,
  updateTournamentsDataRetrievalAction,
} from '../../domain/tournaments/tournamentsActions';
import { TournamentsInitialLoader } from './components/TournamentsInitialLoader';
import { TournamentsLoadingFailed } from './components/TournamentsLoadingFailed';
import { Tournament } from './components/Tournament';
import H6 from '../../components/H6';
import { AddTournament } from './components/AddTournament';
import { Search } from './components/Search';

const Tournaments = () => {
  return (
    <>
      <Container>
        <Search />
        <H4>Faceit Tournaments</H4>
        <TournamentsData />
      </Container>
      <AddTournament />
    </>
  );
};

const TournamentsData = () => {
  const [userPulledToRefresh, setUserPulledToRefresh] = useState(false);
  const loading = useTypedSelector((state) =>
    getTournamentsNetworkStatus(state)
  );
  const initialLoad = useTypedSelector((state) =>
    getTournamentsInitialLoad(state)
  );
  const tournamentsData = useTypedSelector((state) =>
    getTournamentsData(state)
  );
  const isListEnd = useTypedSelector((state) => getIsListEnd(state));
  const page = useTypedSelector((state) => getCurrentTournamentPage(state));
  const searchQuery = useTypedSelector((state) =>
    getCurrentTournamentSearchQuery(state)
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTournamentsDataAction(page, searchQuery));
  }, [dispatch, page, searchQuery]);

  if (initialLoad && !userPulledToRefresh) {
    return <TournamentsInitialLoader />;
  }

  if (loading === NetworkRequestStatus.Fail) {
    return <TournamentsLoadingFailed retryFetchData={retryFetchData} />;
  }

  if (tournamentsData.length === 0 && !userPulledToRefresh) {
    return (
      <>
        <H6> No tournaments found.</H6>
        {searchQuery.length > 0 ? <H6>Try to refine your search </H6> : null}
      </>
    );
  }

  return (
    <FlatList
      data={tournamentsData}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onEndReached={fetchMoreData}
      refreshControl={
        <RefreshControl
          tintColor={'#FFF'}
          onRefresh={onPullToRefresh}
          refreshing={
            userPulledToRefresh && loading === NetworkRequestStatus.InProgress
          }
        />
      }
    />
  );

  function fetchMoreData() {
    if (!isListEnd && loading !== NetworkRequestStatus.InProgress) {
      dispatch(updateTournamentsDataRetrievalAction(page + 1, searchQuery));
    }
  }

  function retryFetchData() {
    setUserPulledToRefresh(false);
    dispatch(loadTournamentsDataAction(page, searchQuery));
  }

  function onPullToRefresh() {
    setUserPulledToRefresh(true);
    dispatch(updateTournamentsDataRetrievalAction(1, searchQuery));
  }
};

function renderItem(tournament: ListRenderItemInfo<TournamentModel>) {
  return <Tournament tournamentData={tournament.item} />;
}

function keyExtractor(item: TournamentModel) {
  return item.id;
}

export default Tournaments;
