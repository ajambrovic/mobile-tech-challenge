import { Dispatch } from 'redux';
import { NetworkRequestStatus } from '../../store/networkRequestModel';
import {
  TournamentsReduxModel,
  TournamentsServerModel,
} from './tournamentsModel';
import {
  LOAD_TOURNAMENTS_DATA_ACTION,
  LOAD_TOURNAMENTS_DATA_FAIL_ACTION,
  LOAD_TOURNAMENTS_DATA_SUCCESS_ACTION,
  loadTournamentsDataAction,
  loadTournamentsDataFailAction,
  loadTournamentsDataSuccessAction,
} from './tournamentsActions';

const initialState: TournamentsReduxModel = {
  networkRequestStatus: NetworkRequestStatus.InProgress,
  initialLoad: false,
  tournaments: [],
};

export default function tournaments(
  state = initialState,
  action: any
): TournamentsReduxModel {
  switch (action.type) {
    case LOAD_TOURNAMENTS_DATA_ACTION:
      if (action.payload === 1) {
        return {
          ...state,
          initialLoad: true,
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

    case LOAD_TOURNAMENTS_DATA_FAIL_ACTION:
      return {
        ...state,
        networkRequestStatus: NetworkRequestStatus.Fail,
        initialLoad: false,
      };

    default:
      return state;
  }
}

const FETCH_BASE_URL = 'http://localhost:4000/tournaments';

export const fetchTournamentsByPage =
  (currentPage: number) => async (dispatch: Dispatch) => {
    dispatch(loadTournamentsDataAction());
    try {
      const response = await fetch(`${FETCH_BASE_URL}?_page=${currentPage}`);
      const json: TournamentsServerModel = await response.json();
      dispatch(loadTournamentsDataSuccessAction(json));
      return json;
    } catch (error) {
      console.error(error);
      dispatch(loadTournamentsDataFailAction());
    }
  };
