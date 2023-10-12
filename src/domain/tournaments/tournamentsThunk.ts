import { Dispatch } from 'redux';
import {
  loadTournamentsDataAction,
  loadTournamentsDataSuccessAction,
  loadTournamentsListEndAction,
  loadTournamentsDataFailAction,
} from './tournamentsActions';
import { TournamentsServerModel } from './tournamentsModel';

const FETCH_BASE_URL = 'http://localhost:4000/tournaments';

export const fetchTournamentsByPage =
  (currentPage: number) => async (dispatch: Dispatch) => {
    dispatch(loadTournamentsDataAction());
    try {
      const response = await fetch(`${FETCH_BASE_URL}?_page=${currentPage}`);
      const tournamentsData: TournamentsServerModel = await response.json();
      if (tournamentsData.length > 0) {
        dispatch(loadTournamentsDataSuccessAction(tournamentsData));
        return;
      }
      dispatch(loadTournamentsListEndAction());
    } catch (error) {
      console.error(error);
      dispatch(loadTournamentsDataFailAction());
    }
  };
