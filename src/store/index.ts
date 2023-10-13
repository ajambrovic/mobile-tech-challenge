import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import {
  createTournamentSaga,
  deleteTournamentSaga,
  editTournamentSaga,
  fetchTournamentsSaga,
} from 'src/domain/tournaments/tournamentsSaga';
import rootReducer, { RootState } from 'src/reducers';
import { spawn } from 'typed-redux-saga';

function* rootSaga() {
  yield* spawn(fetchTournamentsSaga);
  yield* spawn(editTournamentSaga);
  yield* spawn(deleteTournamentSaga);
  yield* spawn(createTournamentSaga);
}

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
