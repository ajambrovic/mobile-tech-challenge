import { NetworkRequestStatus } from '../networkRequest/networkRequestModel';
import { TournamentsReduxModel } from './tournamentsModel';
import { TOURNAMENTS_ACTIONS, TOURNAMENT_ACTIONS } from './tournamentsActions';
import { AnyAction } from 'redux';
import { produce } from 'immer';

const initialState: TournamentsReduxModel = {
  networkRequestStatus: NetworkRequestStatus.InProgress,
  initialLoad: false,
  tournaments: [],
  listEnd: false,
  page: 1,
  searchQuery: '',
};

export default function tournaments(
  state = initialState,
  action: AnyAction
): TournamentsReduxModel {
  switch (action.type) {
    case TOURNAMENTS_ACTIONS.load:
      if (action.payload.page === 1) {
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

    case TOURNAMENTS_ACTIONS.updateDataRetrieval: {
      return {
        ...state,
        page: action.data.page,
        searchQuery: action.data.searchQuery,
      };
    }

    case TOURNAMENTS_ACTIONS.success:
      return {
        ...state,
        tournaments: [...state.tournaments, ...action.data.tournaments],
        page: action.data.page,
        searchQuery: action.data.searchQuery,
        networkRequestStatus: NetworkRequestStatus.Success,
        initialLoad: false,
      };

    case TOURNAMENTS_ACTIONS.listEnd:
      return {
        ...state,
        networkRequestStatus: NetworkRequestStatus.Success,
        initialLoad: false,
        listEnd: true,
      };

    case TOURNAMENTS_ACTIONS.fail:
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
  switch (action.type) {
    case TOURNAMENT_ACTIONS.update:
      return produce(state, (draftState) => {
        const index = draftState.tournaments.findIndex(
          (tournamentData) => tournamentData.id === action.data.id
        );
        if (index !== -1) {
          draftState.tournaments[index].name = action.data.name;
        }
      });

    case TOURNAMENT_ACTIONS.remove:
      return produce(state, (draftState) => {
        const index = draftState.tournaments.findIndex(
          (tournamentData) => tournamentData.id === action.data
        );
        if (index !== -1) {
          draftState.tournaments.splice(index, 1);
        }
      });

    case TOURNAMENT_ACTIONS.revertRemoval:
      return produce(state, (draftState) => {
        draftState.tournaments.splice(
          action.data.tournamentIndex,
          0,
          action.data.tournament
        );
      });

    case TOURNAMENT_ACTIONS.add:
      return produce(state, (draftState) => {
        draftState.tournaments.splice(0, 0, action.data);
      });

    default:
      return state;
  }
}
