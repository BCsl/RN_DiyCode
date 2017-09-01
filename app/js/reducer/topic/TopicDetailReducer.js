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

const initState = {
    isTopicLoading: true,
    message: '',
    loadTopicError: false,
    topicId: undefined, //id
    reliesId: undefined,    //id数组
};

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
            break;
        case TYPE_TOPIC_RELIES_ERROR:
            break;
        case TYPE_TOPIC_RELIES_SUC:
            break;
        default :
            return state;
    }
}
