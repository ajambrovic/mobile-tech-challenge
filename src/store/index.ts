import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer, { RootState } from '../reducers';
import createSagaMiddleware from 'redux-saga';
import { spawn } from 'typed-redux-saga';
import { fetchTournamentsSaga } from '../domain/tournaments/tournamentsSaga';

function* rootSaga() {
  yield* spawn(fetchTournamentsSaga);
}

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
