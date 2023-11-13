import { RootState } from 'src/reducers';

export const getCurrentTournamentSearchQuery = (state: RootState) => {
  return getTournaments(state).searchQuery;
};

export const getCurrentTournamentPage = (state: RootState) => {
  return getTournaments(state).page;
};

export const getTournamentData = (state: RootState, id: string) => {
  return getTournamentsData(state)[id];
};

export const getTournamentIndex = (state: RootState, tournamentId: string) => {
  return getTournamentIds(state).findIndex((id) => id === tournamentId);
};

export const getTournamentName = (state: RootState, id: string) => {
  const tournamentData = getTournamentsData(state)[id];
  if (tournamentData) {
    return tournamentData.name;
  }

  return '';
};

export const getTournamentsInitialLoad = (state: RootState) => {
  return getTournaments(state).initialLoad;
};

export const getTournamentsNetworkStatus = (state: RootState) => {
  return getTournaments(state).networkRequestStatus;
};

export const getTournamentIds = (state: RootState) => {
  return getTournaments(state).ids;
};

export const getIsListEnd = (state: RootState) => {
  return getTournaments(state).listEnd;
};

const getTournamentsData = (state: RootState) => {
  return getTournaments(state).byId;
};

const getTournaments = (state: RootState) => {
  return state.tournaments;
};
