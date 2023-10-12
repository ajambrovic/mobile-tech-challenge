import { RootState } from '../../reducers';

export const getTournamentsNetworkStatus = (state: RootState) => {
  return getTournamentsData(state).networkRequestStatus;
};

export const getTournamentsNumber = (state: RootState) => {
  return getTournamentsData(state).tournaments.length;
};

const getTournamentsData = (state: RootState) => {
  return state.tournaments;
};
