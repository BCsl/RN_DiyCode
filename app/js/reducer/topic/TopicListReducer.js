/**
 * Created by chensuilun on 2017/8/30.
 */
import {
    TYPE_TOPIC_REFRESH_SUC,
    TYPE_TOPIC_REFRESH_ERR,
    TYPE_TOPIC_REFRESHING,
    TYPE_TOPIC_LOADING_MORE,
    TYPE_TOPIC_LOAD_MORE_ERR,
    TYPE_TOPIC_LOAD_MORE_SUC,
}from '../../action/ActionTypes';

import {
    OFFSET,
}from '../../action/TopicAction';

const listState = {
    hasMore: true,
    isError: false,
    isLoading: false,
    isRefreshing: false,
    curPage: 0,
    result: [],//topic id 数组
};

function getIds(result = []) {
    let ids = [];
    for (topic of result) {
        ids.push(topic.id);
    }
    console.log('TopicListReducer', ids);
    return ids;
}
/**
 * 首页的主题列表状态
 * @param state
 * @param action
 * @returns {*}
 */
const topicsListReducer = function (state = listState, action) {
    switch (action.type) {
        case TYPE_TOPIC_REFRESH_SUC:
            return Object.assign({}, state, {
                isLoading: false,
                isRefreshing: false,
                isError: false,
                message: "suc",
                result: getIds(action.result),
                curPage: 1,
                hasMore: action.result.length >= OFFSET,
            });
            break;
        case TYPE_TOPIC_REFRESH_ERR :
            return Object.assign({}, state, {
                isLoading: false,
                isRefreshing: false,
                isError: true,
                message: action.result.message,
            });
            break;
        case TYPE_TOPIC_REFRESHING :
            return Object.assign({}, state, {
                isLoading: false,
                isRefreshing: true,
                isError: false,
                message: action.result
            });
            break;
        case TYPE_TOPIC_LOADING_MORE :
            return Object.assign({}, state, {
                isLoading: true,
                isRefreshing: false,
                isError: false,
                message: 'loading more',
            });
            break;
        case TYPE_TOPIC_LOAD_MORE_ERR :
            return Object.assign({}, state, {
                isLoading: false,
                isRefreshing: false,
                isError: true,
                message: 'load more error',
            });
            break;
        case TYPE_TOPIC_LOAD_MORE_SUC :
            return Object.assign({}, state, {
                isLoading: false,
                isRefreshing: false,
                isError: false,
                message: 'loading more suc',
                result: state.result.slice().concat(getIds(action.result)),
                curPage: state.curPage + 1,
                hasMore: action.result.length >= OFFSET,
            });
            break;
        default:
            return state;
    }
}

export default topicsListReducer;