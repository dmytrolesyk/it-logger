import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const inialState = {};

const middleWare = [thunk];

const store = createStore(
  rootReducer,
  inialState,
  composeWithDevTools(applyMiddleware(...middleWare)),
);

export default store;