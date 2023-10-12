import { TournamentsServerModel } from './tournamentsModel';

export function loadTournamentsDataAction(page = 1) {
  return {
    type: LOAD_TOURNAMENTS_DATA_ACTION,
    payload: page,
  };
}

export function loadTournamentsDataSuccessAction(
  tournaments: TournamentsServerModel
) {
  return {
    type: LOAD_TOURNAMENTS_DATA_SUCCESS_ACTION,
    data: tournaments,
  };
}

export function loadTournamentsDataFailAction() {
  return {
    type: LOAD_TOURNAMENTS_DATA_FAIL_ACTION,
  };
}

export function loadTournamentsListEndAction() {
  return {
    type: LOAD_TOURNAMENTS_LIST_END_ACTION,
  };
}

export const LOAD_TOURNAMENTS_DATA_ACTION = 'tournaments/LOAD_DATA';
export const LOAD_TOURNAMENTS_DATA_SUCCESS_ACTION =
  'tournaments/LOAD_DATA_SUCCESS';
export const LOAD_TOURNAMENTS_DATA_FAIL_ACTION = 'tournaments/LOAD_DATA_FAIL';
export const LOAD_TOURNAMENTS_LIST_END_ACTION = 'tournaments/LOAD_LIST_END';
