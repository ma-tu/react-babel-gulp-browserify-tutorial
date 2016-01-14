import {createStore,  applyMiddleware} from 'redux';
import commentReducer from '../reducers/commentReducer'
import createLogger from 'redux-logger';

export default function configureStore() {
  const logger = createLogger({logger:console});
  const createStoreWithMiddleware = applyMiddleware(
    logger
  )(createStore);
  const store = createStoreWithMiddleware(commentReducer);
  return store;
}
