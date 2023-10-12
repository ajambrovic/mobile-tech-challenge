import { NetworkRequestStatus } from '../../store/networkRequestModel';
import { TournamentsReduxModel } from './tournamentsModel';
import {
  LOAD_TOURNAMENTS_DATA_ACTION,
  LOAD_TOURNAMENTS_DATA_FAIL_ACTION,
  LOAD_TOURNAMENTS_DATA_SUCCESS_ACTION,
  LOAD_TOURNAMENTS_LIST_END_ACTION,
  UPDATE_TOURNAMENT_ACTION,
} from './tournamentsActions';
import { AnyAction } from 'redux';
import { produce } from 'immer';

const initialState: TournamentsReduxModel = {
  networkRequestStatus: NetworkRequestStatus.InProgress,
  initialLoad: false,
  tournaments: [],
  listEnd: false,
};

export default function tournaments(
  state = initialState,
  action: AnyAction
): TournamentsReduxModel {
  switch (action.type) {
    case LOAD_TOURNAMENTS_DATA_ACTION:
      if (action.payload === 1) {
        return {
          ...state,
          tournaments: [],
          initialLoad: true,
          listEnd: false,
        };
      } else {
        return {
          ...state,
          networkRequestStatus: NetworkRequestStatus.InProgress,
        };
      }

    case LOAD_TOURNAMENTS_DATA_SUCCESS_ACTION:
      return {
        ...state,
        tournaments: [...state.tournaments, ...action.data],
        networkRequestStatus: NetworkRequestStatus.Success,
        initialLoad: false,
      };

    case LOAD_TOURNAMENTS_LIST_END_ACTION:
      return {
        ...state,
        networkRequestStatus: NetworkRequestStatus.Success,
        initialLoad: false,
        listEnd: true,
      };

    case LOAD_TOURNAMENTS_DATA_FAIL_ACTION:
      return {
        ...state,
        networkRequestStatus: NetworkRequestStatus.Fail,
        initialLoad: false,
      };

    default:
      return tournament(state, action);
  }
}

function tournament(
  state = initialState,
  action: AnyAction
): TournamentsReduxModel {
  if (action.type === UPDATE_TOURNAMENT_ACTION) {
    return produce(state, (draftState) => {
      const index = draftState.tournaments.findIndex(
        (tournamentData) => tournamentData.id === action.data.id
      );
      if (index !== -1) {
        draftState.tournaments[index].name = action.data.name;
      }
    });
  }

  return state;
}
