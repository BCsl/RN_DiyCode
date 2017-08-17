/**
 * Created by chensuilun on 2017/8/14.
 */
import {
    TYPE_TOPIC_REFRESH_SUC,
    TYPE_TOPIC_REFRESH_ERR,
    TYPE_TOPIC_REFRESHING,
    TYPE_TOPIC_LOADING_MORE,
    TYPE_TOPIC_LOAD_MORE_ERR,
    TYPE_TOPIC_LOAD_MORE_SUC,
    OFFSET,
}from '../action/HomeAction';

const homeInitState = {
    topics: {
        hasMore: true,
        isError: false,
        isLoading: false,
        isRefreshing: false,
        curPage: 0,
        result: null,
    },
    news: {
        hasMore: true,
        isError: false,
        isLoading: false,
        isRefreshing: false,
        curPage: 0,
        result: null,
    },
    sites: {}
}


const _topicsReducer = function (state, action) {
    switch (action.type) {
        case TYPE_TOPIC_REFRESH_SUC:
            return Object.assign({}, state, {
                isLoading: false,
                isRefreshing: false,
                isError: false,
                result: action.result,
                curPage: 1,
                hasMore: action.result.length >= OFFSET,
            });
            break;
        case TYPE_TOPIC_REFRESH_ERR :
            return Object.assign({}, state, {
                isLoading: false,
                isRefreshing: false,
                isError: true,
                result: action.result.message
            });
            break;
        case TYPE_TOPIC_REFRESHING :
            return Object.assign({}, state, {
                isLoading: false,
                isRefreshing: true,
                isError: false,
                result: action.result
            });
            break;
        case TYPE_TOPIC_LOADING_MORE :
            return Object.assign({}, state, {
                isLoading: true,
                isRefreshing: false,
                isError: false,
            });
            break;
        case TYPE_TOPIC_LOAD_MORE_ERR :
            return Object.assign({}, state, {
                isLoading: false,
                isRefreshing: false,
                isError: true,
            });
            break;
        case TYPE_TOPIC_LOAD_MORE_SUC :
            return Object.assign({}, state, {
                isLoading: false,
                isRefreshing: false,
                isError: false,
                result: state.result.slice().concat(action.result),
                curPage: state.curPage + 1,
                hasMore: action.result.length >= OFFSET,
            });
            break;
        default:
            return state;
    }
}

export default homeReducer = function (state = homeInitState, action) {
    switch (action.type) {
        case TYPE_TOPIC_REFRESH_SUC:
        case TYPE_TOPIC_REFRESH_ERR :
        case TYPE_TOPIC_REFRESHING :
        case TYPE_TOPIC_LOADING_MORE :
        case TYPE_TOPIC_LOAD_MORE_ERR :
        case TYPE_TOPIC_LOAD_MORE_SUC :
            return Object.assign({}, state, {topics: _topicsReducer(state.topics, action)});
            break;
        default:
            return state;
    }
    return state;
}


