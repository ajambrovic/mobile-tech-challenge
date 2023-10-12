import { combineReducers } from 'redux';
import tournaments from '../domain/tournaments/tournamentsReducers';

const rootReducer = combineReducers({
  tournaments,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
