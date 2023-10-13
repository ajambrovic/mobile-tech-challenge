import React, { useEffect, useState } from 'react';
import { FlatList, ListRenderItemInfo, RefreshControl } from 'react-native';
import { useDispatch } from 'react-redux';
import H6 from 'src/components/H6';
import { INITIAL_TOURNAMENTS_PAGE } from 'src/constants/api';
import { NetworkRequestStatus } from 'src/domain/networkRequest/networkRequestModel';
import {
  loadTournamentsDataAction,
  updateTournamentsDataRetrievalAction,
} from 'src/domain/tournaments/tournamentsActions';
import { TournamentModel } from 'src/domain/tournaments/tournamentsModel';
import {
  getCurrentTournamentPage,
  getCurrentTournamentSearchQuery,
  getIsListEnd,
  getTournamentsData,
  getTournamentsInitialLoad,
  getTournamentsNetworkStatus,
} from 'src/domain/tournaments/tournamentsSelectors';
import { useTypedSelector } from 'src/store';
import { Tournament } from './components/Tournament';
import { TournamentsInitialLoader } from './components/TournamentsInitialLoader';
import { TournamentsLoadingFailed } from './components/TournamentsLoadingFailed';

export const Tournaments = () => {
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

  const weDidNotClearTheDataWithPullOnRefreshOnInitialLoad =
    initialLoad && !userPulledToRefresh;
  if (weDidNotClearTheDataWithPullOnRefreshOnInitialLoad) {
    return <TournamentsInitialLoader />;
  }

  if (loading === NetworkRequestStatus.Fail) {
    return <TournamentsLoadingFailed retryFetchData={retryFetchData} />;
  }

  const weDidNotClearTheDataWithPullOnRefresh =
    tournamentsData.length === 0 && !userPulledToRefresh;
  if (weDidNotClearTheDataWithPullOnRefresh) {
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
    const thereAreMoreItemsToLoadAndWeAreNotAlreadyInTheFetchProcess =
      !isListEnd && loading !== NetworkRequestStatus.InProgress;
    if (thereAreMoreItemsToLoadAndWeAreNotAlreadyInTheFetchProcess) {
      dispatch(updateTournamentsDataRetrievalAction(page + 1, searchQuery));
    }
  }

  function retryFetchData() {
    setUserPulledToRefresh(false);
    dispatch(loadTournamentsDataAction(page, searchQuery));
  }

  function onPullToRefresh() {
    setUserPulledToRefresh(true);
    dispatch(
      updateTournamentsDataRetrievalAction(
        INITIAL_TOURNAMENTS_PAGE,
        searchQuery
      )
    );
  }
};

function renderItem(tournament: ListRenderItemInfo<TournamentModel>) {
  return <Tournament tournamentData={tournament.item} />;
}

function keyExtractor(item: TournamentModel) {
  return item.id;
}

export default Tournaments;
