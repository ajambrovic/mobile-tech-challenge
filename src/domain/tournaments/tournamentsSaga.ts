import {
  loadTournamentsListEndAction,
  loadTournamentsDataFailAction,
  loadTournamentsDataSuccessAction,
  updateTournamentAction,
  removeTournamentAction,
  revertTournamentDeletionAction,
  addTournamentAction,
  TOURNAMENTS_ACTIONS,
  TOURNAMENT_ACTIONS,
} from './tournamentsActions';
import { TournamentModel, TournamentsServerModel } from './tournamentsModel';
import { call, put, select, takeEvery } from 'typed-redux-saga';
import { getTournament, getTournamentName } from './tournamentsSelectors';

const FETCH_BASE_URL = 'http://localhost:4000/tournaments';

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
      `${FETCH_BASE_URL}?_page=${payload.page}&q=${payload.searchQuery}`
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
    yield* put(removeTournamentAction(data));
    yield* call(fetch, `${FETCH_BASE_URL}?${data}`, {
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
    const response = yield* call(fetch, `${FETCH_BASE_URL}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        name: data,
      }),
    });
    const newTournament: TournamentModel = yield response.json();
    yield* put(addTournamentAction(newTournament));
  } catch (error) {
    console.log(error);
  }
}
