import {
  loadTournamentsDataSuccessAction,
  loadTournamentsListEndAction,
  loadTournamentsDataFailAction,
  LOAD_TOURNAMENTS_DATA_ACTION,
} from './tournamentsActions';
import { TournamentsServerModel } from './tournamentsModel';
import { call, put, takeEvery } from 'typed-redux-saga';

const FETCH_BASE_URL = 'http://localhost:4000/tournaments';

export function* fetchTournamentsSaga() {
  yield* takeEvery(LOAD_TOURNAMENTS_DATA_ACTION, doFetchTournamentsSaga);
}

function* doFetchTournamentsSaga({
  payload,
}: {
  type: string;
  payload: number;
}) {
  try {
    const response = yield* call(fetch, `${FETCH_BASE_URL}?_page=${payload}`);

    const tournamentsData: TournamentsServerModel = yield response.json();
    if (tournamentsData.length > 0) {
      yield* put(loadTournamentsDataSuccessAction(tournamentsData));
      return;
    }
    yield* put(loadTournamentsListEndAction());
  } catch (error) {
    console.error(error);
    yield* put(loadTournamentsDataFailAction());
  }
}
