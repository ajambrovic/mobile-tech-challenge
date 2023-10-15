import { AnyAction } from 'redux';
import { TournamentsServerModel, TournamentModel } from './tournamentsModel';

export function updateTournamentsDataRetrievalAction(
  page: number,
  searchQuery: string
): AnyAction {
  return {
    type: TOURNAMENTS_ACTIONS.updateDataRetrieval,
    data: { page, searchQuery },
  };
}

export function loadTournamentsDataAction(
  page: number,
  searchQuery: string
): AnyAction {
  return {
    type: TOURNAMENTS_ACTIONS.load,
    payload: { page, searchQuery },
  };
}

export function loadTournamentsDataSuccessAction(
  tournaments: TournamentsServerModel,
  page: number,
  searchQuery: string
): AnyAction {
  return {
    type: TOURNAMENTS_ACTIONS.success,
    data: { tournaments, page, searchQuery },
  };
}

export function loadTournamentsDataFailAction(): AnyAction {
  return {
    type: TOURNAMENTS_ACTIONS.fail,
  };
}

export function loadTournamentsListEndAction(searchQuery: string): AnyAction {
  return {
    type: TOURNAMENTS_ACTIONS.listEnd,
    data: searchQuery,
  };
}
export function postEditTournamentToServerAction(
  data: Pick<TournamentModel, 'id' | 'name'>
): AnyAction {
  return {
    type: TOURNAMENT_ACTIONS.edit,
    data,
  };
}

export function updateTournamentLocallyAction(
  data: Pick<TournamentModel, 'id' | 'name'>
): AnyAction {
  return {
    type: TOURNAMENT_ACTIONS.update,
    data,
  };
}

export function postDeleteTournamentToServerAction(
  id: TournamentModel['id']
): AnyAction {
  return {
    type: TOURNAMENT_ACTIONS.delete,
    data: id,
  };
}

export function removeTournamentLocallyAction(
  id: TournamentModel['id']
): AnyAction {
  return {
    type: TOURNAMENT_ACTIONS.remove,
    data: id,
  };
}

export function revertTournamentDeletionAction(tournamentData: {
  tournament: TournamentModel;
  tournamentIndex: number;
}): AnyAction {
  return {
    type: TOURNAMENT_ACTIONS.revertRemoval,
    data: tournamentData,
  };
}

export function postTournamentToServerAction(name: string): AnyAction {
  return {
    type: TOURNAMENT_ACTIONS.create,
    data: name,
  };
}

export function addTournamentLocallyAction(data: TournamentModel): AnyAction {
  return {
    type: TOURNAMENT_ACTIONS.add,
    data,
  };
}

export const TOURNAMENTS_ACTIONS = {
  load: 'tournaments/LOAD_DATA',
  success: 'tournaments/LOAD_DATA_SUCCESS',
  fail: 'tournaments/LOAD_DATA_FAIL',
  listEnd: 'tournaments/LOAD_LIST_END',
  updateDataRetrieval: 'tournaments/UPDATE_DATA_RETRIEVAL',
};

export const TOURNAMENT_ACTIONS = {
  edit: 'tournament/EDIT_TOURNAMENT',
  update: 'tournament/UPDATE_TOURNAMENT',
  delete: 'tournament/DELETE_TOURNAMENT',
  remove: 'tournament/REMOVE_TOURNAMENT',
  revertRemoval: 'tournament/REVERT_REMOVAL',
  create: 'tournament/CREATE_TOURNAMENT',
  add: 'tournament/ADD_TOURNAMENT',
};
