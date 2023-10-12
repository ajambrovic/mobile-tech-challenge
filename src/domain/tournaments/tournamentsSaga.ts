import {
  loadTournamentsListEndAction,
  loadTournamentsDataFailAction,
  LOAD_TOURNAMENTS_DATA_ACTION,
  loadTournamentsDataSuccessAction,
  EDIT_TOURNAMENT_ACTION,
  updateTournamentAction,
} from './tournamentsActions';
import { TournamentModel, TournamentsServerModel } from './tournamentsModel';
import { call, put, select, takeEvery } from 'typed-redux-saga';
import { getTournamentName } from './tournamentsSelectors';

const FETCH_BASE_URL = 'http://localhost:4000/tournaments';

export function* fetchTournamentsSaga() {
  yield* takeEvery(LOAD_TOURNAMENTS_DATA_ACTION, doFetchTournamentsSaga);
}

export function* editTournamentSaga() {
  yield* takeEvery(EDIT_TOURNAMENT_ACTION, doEditTournamentSaga);
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
    yield* put(loadTournamentsDataFailAction());
  }
}

function* doEditTournamentSaga({
  data,
}: {
  type: string;
  data: Pick<TournamentModel, 'id' | 'name'>;
}) {
  const currentName = yield* select(getTournamentName, data.id);
  if (currentName.trim() === data.name.trim()) {
    return;
  }

  try {
    yield* put(updateTournamentAction(data));
    yield* call(fetch, `${FETCH_BASE_URL}?${data.id}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify({
        name: data.name,
      }),
    });
  } catch (error) {
    yield* put(updateTournamentAction({ ...data, name: currentName }));
  }
}
