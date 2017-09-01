/**
 * 主题详情页状态管理
 *
 * Created by chensuilun on 2017/9/1.
 */


import {
    TYPE_TOPIC_DETAIL_LOADING,
    TYPE_TOPIC_DETAIL_ERROR,
    TYPE_TOPIC_DETAIL_SUC,
    TYPE_TOPIC_RELIES_LOADING,
    TYPE_TOPIC_RELIES_ERROR,
    TYPE_TOPIC_RELIES_SUC,
} from '../../action/ActionTypes';

import {OFFSET_RELY} from '../../action/TopicAction'

const initState = {
    isTopicLoading: true,
    message: '',
    loadTopicError: false,
    topicId: undefined, //id
    reliesId: [],    //id数组
    isReliesLoading: false,
    isLoadReliesError: false,
    curPage: 0,
    hasMore: true,
};

function getReliesId(result = []) {
    let ids = [];
    for (let rely of result) {
        ids.push(rely.id);
    }
    console.log('TopicDetailReducer TopicDetailReducer ', ids);
    return ids;
}
export default function topicDetailReducer(state = initState, action) {
    switch (action.type) {
        case TYPE_TOPIC_DETAIL_LOADING:
            return Object.assign({}, state, {
                isTopicLoading: true,
                message: 'loading...',
                loadTopicError: false,
            });
        case TYPE_TOPIC_DETAIL_ERROR:
            return Object.assign({}, state, {
                isTopicLoading: false,
                loadTopicError: true,
                message: action.result.message,
            });
        case TYPE_TOPIC_DETAIL_SUC:
            return Object.assign({}, state, {
                isTopicLoading: false,
                loadTopicError: false,
                message: 'success',
                topicId: action.result.id
            });
        case TYPE_TOPIC_RELIES_LOADING:
            return Object.assign({}, state, {
                isReliesLoading: true,
                isLoadReliesError: false,
            });
        case TYPE_TOPIC_RELIES_ERROR:
            return Object.assign({}, state, {
                isReliesLoading: false,
                isLoadReliesError: true,
            });
        case TYPE_TOPIC_RELIES_SUC:
            return Object.assign({}, state, {
                isReliesLoading: false,
                isLoadReliesError: false,
                curPage: state.curPage + 1,
                hasMore: action.result && action.result.length >= OFFSET_RELY,
                reliesId: getReliesId(action.result),
            });
        default :
            return state;
    }
}
