import { RootState } from '../../reducers';

export const getTournamentName = (state: RootState, id: string) => {
  const tournamentData = getTournament(state, id);
  if (tournamentData) {
    return tournamentData.tournament.name;
  }

  return '';
};

export const getTournament = (state: RootState, id: string) => {
  const tournamentIndex = getTournamentsData(state).findIndex(
    (tournamentData) => tournamentData.id === id
  );
  if (tournamentIndex) {
    return {
      tournament: getTournamentsData(state)[tournamentIndex],
      tournamentIndex,
    };
  }
};

export const getTournamentsInitialLoad = (state: RootState) => {
  return getTournaments(state).initialLoad;
};

export const getTournamentsNetworkStatus = (state: RootState) => {
  return getTournaments(state).networkRequestStatus;
};

export const getTournamentsData = (state: RootState) => {
  return getTournaments(state).tournaments;
};

export const getIsListEnd = (state: RootState) => {
  return getTournaments(state).listEnd;
};

const getTournaments = (state: RootState) => {
  return state.tournaments;
};
