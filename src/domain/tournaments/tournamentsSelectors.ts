import { RootState } from '../../reducers';

export const getTournamentsInitialLoad = (state: RootState) => {
  return getTournaments(state).initialLoad;
};

export const getTournamentsNetworkStatus = (state: RootState) => {
  return getTournaments(state).networkRequestStatus;
};

export const getTournamentsData = (state: RootState) => {
  return getTournaments(state).tournaments;
};

const getTournaments = (state: RootState) => {
  return state.tournaments;
};
