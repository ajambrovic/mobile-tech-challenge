import React, { useEffect, useState } from 'react';
import { FlatList, ListRenderItemInfo, RefreshControl } from 'react-native';
import Container from '../../components/Container';
import H4 from '../../components/H4';
import {
  getIsListEnd,
  getTournamentsData,
  getTournamentsInitialLoad,
  getTournamentsNetworkStatus,
} from '../../domain/tournaments/tournamentsSelectors';
import { useTypedSelector } from '../../store';
import { NetworkRequestStatus } from '../../store/networkRequestModel';
import { TournamentModel } from '../../domain/tournaments/tournamentsModel';
import { useDispatch } from 'react-redux';
import { loadTournamentsDataAction } from '../../domain/tournaments/tournamentsActions';
import { TournamentsInitialLoader } from './components/TournamentsInitialLoader';
import { TournamentsLoadingFailed } from './components/TournamentsLoadingFailed';
import { Tournament } from './components/Tournament';
import H6 from '../../components/H6';

const Tournaments = () => {
  return (
    <Container>
      <H4>Faceit Tournaments</H4>
      <TournamentsData />
    </Container>
  );
};

const TournamentsData = () => {
  const [page, setPage] = useState(1);
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

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTournamentsDataAction(page));
  }, [dispatch, page]);

  if (initialLoad && !userPulledToRefresh) {
    return <TournamentsInitialLoader />;
  }

  if (loading === NetworkRequestStatus.Fail) {
    return <TournamentsLoadingFailed retryFetchData={retryFetchData} />;
  }

  if (tournamentsData.length === 0 && !userPulledToRefresh) {
    return <H6> No tournaments found.</H6>;
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
      setPage(page + 1);
    }
  }

  function retryFetchData() {
    setUserPulledToRefresh(false);
    dispatch(loadTournamentsDataAction(page));
  }

  function onPullToRefresh() {
    setUserPulledToRefresh(true);
    setPage(1);
  }
};

function renderItem(tournament: ListRenderItemInfo<TournamentModel>) {
  return <Tournament tournamentData={tournament.item} />;
}

function keyExtractor(item: TournamentModel) {
  return item.id;
}

export default Tournaments;
