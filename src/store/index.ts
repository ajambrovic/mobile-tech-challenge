import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer, { RootState } from '../reducers';

const store = createStore(rootReducer, applyMiddleware(thunk));

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
