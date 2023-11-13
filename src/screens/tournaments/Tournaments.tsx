import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
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
  getTournamentIds,
  getTournamentsInitialLoad,
  getTournamentsNetworkStatus,
} from 'src/domain/tournaments/tournamentsSelectors';
import { useTypedSelector } from 'src/store';
import { Tournament } from './components/Tournament';
import { TournamentDetailsStyle } from './components/TournamentDetails.style';
import { TournamentsInitialLoader } from './components/TournamentsInitialLoader';
import { TournamentsLoadingFailed } from './components/TournamentsLoadingFailed';

export const Tournaments = () => {
  const [userPulledToRefresh, setUserPulledToRefresh] = useState(false);
  const loading = useTypedSelector(getTournamentsNetworkStatus);
  const initialLoad = useTypedSelector(getTournamentsInitialLoad);
  const tournamentsIds = useTypedSelector(getTournamentIds);
  const isListEnd = useTypedSelector(getIsListEnd);
  const page = useTypedSelector(getCurrentTournamentPage);
  const searchQuery = useTypedSelector(getCurrentTournamentSearchQuery);

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
    tournamentsIds.length === 0 && !userPulledToRefresh;
  if (weDidNotClearTheDataWithPullOnRefresh) {
    return (
      <View style={TournamentDetailsStyle.container}>
        <H6> No tournaments found.</H6>
        {searchQuery.length > 0 ? <H6>Try to refine your search </H6> : null}
      </View>
    );
  }

  return (
    <FlatList
      data={tournamentsIds}
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

function renderItem({ item }: { item: TournamentModel['id'] }) {
  return <Tournament id={item} />;
}

function keyExtractor(id: TournamentModel['id']) {
  return id;
}

export default Tournaments;
