/**
 * Created by chensuilun on 2017/8/10.
 */
import {createStore, applyMiddleware} from 'redux';
import reducers from '../reducer/index';
import ReduxThunk from 'redux-thunk';
import Logger from '../utils/middlewave/Logger';
import { composeWithDevTools } from 'remote-redux-devtools';

// const finalCreateStore = applyMiddleware(ReduxThunk, Logger)(createStore);
// const store = finalCreateStore(reducers);
const store = createStore(reducers, composeWithDevTools(applyMiddleware(ReduxThunk, Logger)));
export default store;
