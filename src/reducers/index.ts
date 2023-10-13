import { combineReducers } from 'redux';
import tournaments from 'src/domain/tournaments/tournamentsReducers';

const rootReducer = combineReducers({
  tournaments,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
