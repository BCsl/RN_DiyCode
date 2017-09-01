/**
 * Created by chensuilun on 2017/8/30.
 */
import {combineReducers} from 'redux';
import  TopicListReducer from './TopicListReducer';
import  TopicPostReducer from './TopicPostReducer';
import  TopicRepliesReducer from './TopicRepliesReducer';
import  TopicDetailReducer from './TopicDetailReducer';

export default combineReducers({
    list: TopicListReducer,
    cruDetail: TopicDetailReducer,
    postDetail: TopicPostReducer,
    reply: TopicRepliesReducer,
})