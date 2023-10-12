import { AnyAction } from 'redux';
import { TournamentModel, TournamentsServerModel } from './tournamentsModel';

export function loadTournamentsDataAction(page = 1): AnyAction {
  return {
    type: LOAD_TOURNAMENTS_DATA_ACTION,
    payload: page,
  };
}

export function loadTournamentsDataSuccessAction(
  tournaments: TournamentsServerModel
): AnyAction {
  return {
    type: LOAD_TOURNAMENTS_DATA_SUCCESS_ACTION,
    data: tournaments,
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

export const LOAD_TOURNAMENTS_DATA_ACTION = 'tournaments/LOAD_DATA';
export const LOAD_TOURNAMENTS_DATA_SUCCESS_ACTION =
  'tournaments/LOAD_DATA_SUCCESS';
export const LOAD_TOURNAMENTS_DATA_FAIL_ACTION = 'tournaments/LOAD_DATA_FAIL';
export const LOAD_TOURNAMENTS_LIST_END_ACTION = 'tournaments/LOAD_LIST_END';

export const EDIT_TOURNAMENT_ACTION = 'tournament/EDIT_TOURNAMENT_ACTION';
