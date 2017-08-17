/**
 * Created by chensuilun on 2017/8/10.
 */
import {combineReducers} from 'redux';
import  NavigatorReducer from './NavigatorReducer';
import  HomeReducer from './HomeReducer';

export default  combineReducers({
    home: HomeReducer,
    nav: NavigatorReducer,
})
