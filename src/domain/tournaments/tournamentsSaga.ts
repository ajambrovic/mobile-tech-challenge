import { API_TOURNAMENTS_URL } from 'src/constants/api';
import { call, put, select, takeEvery } from 'typed-redux-saga';
import {
  TOURNAMENTS_ACTIONS,
  TOURNAMENT_ACTIONS,
  addTournamentLocallyAction,
  loadTournamentsDataFailAction,
  loadTournamentsDataSuccessAction,
  loadTournamentsListEndAction,
  removeTournamentLocallyAction,
  revertTournamentDeletionAction,
  updateTournamentLocallyAction,
} from './tournamentsActions';
import { TournamentModel, TournamentsServerModel } from './tournamentsModel';
import { getTournament, getTournamentName } from './tournamentsSelectors';

export function* fetchTournamentsSaga() {
  yield* takeEvery(TOURNAMENTS_ACTIONS.load, doFetchTournamentsSaga);
}

export function* editTournamentSaga() {
  yield* takeEvery(TOURNAMENT_ACTIONS.edit, doEditTournamentSaga);
}

export function* deleteTournamentSaga() {
  yield* takeEvery(TOURNAMENT_ACTIONS.delete, doDeleteTournamentSaga);
}

export function* createTournamentSaga() {
  yield* takeEvery(TOURNAMENT_ACTIONS.create, doCreateTournamentSaga);
}

function* doFetchTournamentsSaga({
  payload,
}: {
  type: string;
  payload: { page: number; searchQuery: string };
}) {
  try {
    const response = yield* call(
      fetch,
      `${API_TOURNAMENTS_URL}?_page=${payload.page}&q=${payload.searchQuery}`
    );
    const tournamentsData: TournamentsServerModel = yield response.json();
    if (tournamentsData.length > 0) {
      yield* put(
        loadTournamentsDataSuccessAction(
          tournamentsData,
          payload.page,
          payload.searchQuery
        )
      );
      return;
    }
    yield* put(loadTournamentsListEndAction(payload.searchQuery));
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
    yield* put(updateTournamentLocallyAction(data));
    yield* call(fetch, `${API_TOURNAMENTS_URL}?${data.id}`, {
      ...DEFAULT_HEADERS,
      method: 'PATCH',
      body: JSON.stringify({
        name: data.name,
      }),
    });
  } catch (error) {
    yield* put(updateTournamentLocallyAction({ ...data, name: currentName }));
  }
}

function* doDeleteTournamentSaga({
  data,
}: {
  type: string;
  data: TournamentModel['id'];
}) {
  const currentTournament = yield* select(getTournament, data);
  if (!currentTournament) {
    return;
  }

  try {
    yield* put(removeTournamentLocallyAction(data));
    yield* call(fetch, `${API_TOURNAMENTS_URL}?${data}`, {
      method: 'DELETE',
    });
  } catch (error) {
    yield* put(revertTournamentDeletionAction(currentTournament));
  }
}

function* doCreateTournamentSaga({
  data,
}: {
  type: string;
  data: TournamentModel['name'];
}) {
  try {
    const response = yield* call(fetch, `${API_TOURNAMENTS_URL}`, {
      method: 'POST',
      ...DEFAULT_HEADERS,
      body: JSON.stringify({
        name: data,
      }),
    });
    const newTournament: TournamentModel = yield response.json();
    yield* put(addTournamentLocallyAction(newTournament));
  } catch (error) {
    console.log(error);
  }
}

const DEFAULT_HEADERS = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};
