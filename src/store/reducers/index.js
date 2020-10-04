import { combineReducers } from 'redux';

// different reducer files
import initialState from './initialState';
import userReducer from './userReducer';
import topicReducer from './topicReducer';
import languageReducer from './languageReducer';

const rootReducer = (state, action) => {
  let newState = state;
  if (action.type === 'USER_LOGOUT') {
    sessionStorage.clear();
    newState = initialState;
  }

  return appReducer(newState, action);
};

const appReducer = combineReducers({
  user: userReducer,
  topic: topicReducer,
  language: languageReducer,
});

export default rootReducer;
