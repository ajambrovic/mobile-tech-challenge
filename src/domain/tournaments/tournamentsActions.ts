import { AnyAction } from 'redux';
import { TournamentModel, TournamentsServerModel } from './tournamentsModel';

export function updateTournamentsDataRetrievalAction(
  page: number,
  searchQuery: string
): AnyAction {
  return {
    type: UPDATE_TOURNAMENTS_DATA_RETRIEVAL_ACTION,
    data: { page, searchQuery },
  };
}

export function loadTournamentsDataAction(
  page: number,
  searchQuery: string
): AnyAction {
  return {
    type: LOAD_TOURNAMENTS_DATA_ACTION,
    payload: { page, searchQuery },
  };
}

export function loadTournamentsDataSuccessAction(
  tournaments: TournamentsServerModel,
  page: number,
  searchQuery: string
): AnyAction {
  return {
    type: LOAD_TOURNAMENTS_DATA_SUCCESS_ACTION,
    data: { tournaments, page, searchQuery },
  };
}

export function loadTournamentsDataFailAction(): AnyAction {
  return {
    type: LOAD_TOURNAMENTS_DATA_FAIL_ACTION,
  };
}

export function loadTournamentsListEndAction(): AnyAction {
  return {
    type: LOAD_TOURNAMENTS_LIST_END_ACTION,
  };
}
export function editTournamentAction(
  data: Pick<TournamentModel, 'id' | 'name'>
): AnyAction {
  return {
    type: EDIT_TOURNAMENT_ACTION,
    data,
  };
}

export function updateTournamentAction(
  data: Pick<TournamentModel, 'id' | 'name'>
): AnyAction {
  return {
    type: UPDATE_TOURNAMENT_ACTION,
    data,
  };
}

export function deleteTournamentAction(id: TournamentModel['id']): AnyAction {
  return {
    type: DELETE_TOURNAMENT_ACTION,
    data: id,
  };
}

export function removeTournamentAction(id: TournamentModel['id']): AnyAction {
  return {
    type: REMOVE_TOURNAMENT_ACTION,
    data: id,
  };
}

export function revertTournamentDeletionAction(tournamentData: {
  tournament: TournamentModel;
  tournamentIndex: number;
}): AnyAction {
  return {
    type: REVERT_TOURNAMENT_DELETION_ACTION,
    data: tournamentData,
  };
}

export function createTournamentAction(name: string): AnyAction {
  return {
    type: CREATE_TOURNAMENT_ACTION,
    data: name,
  };
}

export function addTournamentAction(data: TournamentModel): AnyAction {
  return {
    type: ADD_TOURNAMENT_ACTION,
    data,
  };
}

export const LOAD_TOURNAMENTS_DATA_ACTION = 'tournaments/LOAD_DATA';
export const LOAD_TOURNAMENTS_DATA_SUCCESS_ACTION =
  'tournaments/LOAD_DATA_SUCCESS';
export const LOAD_TOURNAMENTS_DATA_FAIL_ACTION = 'tournaments/LOAD_DATA_FAIL';
export const LOAD_TOURNAMENTS_LIST_END_ACTION = 'tournaments/LOAD_LIST_END';
export const UPDATE_TOURNAMENTS_DATA_RETRIEVAL_ACTION =
  'tournaments/UPDATE_TOURNAMENTS_DATA__RETRIEVAL_ACTION';

export const EDIT_TOURNAMENT_ACTION = 'tournament/EDIT_TOURNAMENT_ACTION';
export const UPDATE_TOURNAMENT_ACTION = 'tournament/UPDATE_TOURNAMENT_ACTION';
export const DELETE_TOURNAMENT_ACTION = 'tournament/DELETE_TOURNAMENT_ACTION';
export const REMOVE_TOURNAMENT_ACTION = 'tournament/REMOVE_TOURNAMENT_ACTION';
export const REVERT_TOURNAMENT_DELETION_ACTION =
  'tournament/REVERT_TOURNAMENT_DELETION_ACTION';
export const CREATE_TOURNAMENT_ACTION = 'tournament/CREATE_TOURNAMENT_ACTION';
export const ADD_TOURNAMENT_ACTION = 'tournament/ADD_TOURNAMENT_ACTION';
