/**
 * Created by chensuilun on 2017/8/30.
 */
import {combineReducers} from 'redux';
import  TopicListReducer from './TopicListReducer';
import  TopicPostReducer from './TopicPostReducer';
import  TopicReliesReducer from './TopicReliesReducer';
import  TopicDetailReducer from './TopicDetailReducer';

export default combineReducers({
    list: TopicListReducer,
    cruDetail: TopicDetailReducer,
    postDetail: TopicPostReducer,
    rely: TopicReliesReducer,
})