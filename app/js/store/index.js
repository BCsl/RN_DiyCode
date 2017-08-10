/**
 * Created by chensuilun on 2017/8/10.
 */
import {createStore, applyMiddleware} from 'redux'
import reducers from '../reducer/index'
import ReduxThunk from 'redux-thunk'
import Logger from '../utils/middlewave/Logger'

const finalCreateStore = applyMiddleware(ReduxThunk, Logger)(createStore);
const store = finalCreateStore(reducers);
export default store;
