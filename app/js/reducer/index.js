/**
 * Created by chensuilun on 2017/8/10.
 */
import {combineReducers} from 'redux';
import  NavigatorReducer from './NavigatorReducer';
import  Topics from './topic';
import  UserReducer from './UserReducer';
import  NodeReducer from './NodeReducer';
import  NewsReducer from './news';
import SiteReducer from './site'

export default combineReducers({
    nav: NavigatorReducer,
    topic: Topics,
    user: UserReducer,
    node: NodeReducer,
    news: NewsReducer,
    site: SiteReducer,
})
