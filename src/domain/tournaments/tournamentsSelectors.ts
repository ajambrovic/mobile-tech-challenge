import { RootState } from '../../reducers';

export const getTournamentsNetworkStatus = (state: RootState) => {
  return getTournamentsData(state).networkRequestStatus;
};

const getTournamentsData = (state: RootState) => {
  return state.tournaments;
};
