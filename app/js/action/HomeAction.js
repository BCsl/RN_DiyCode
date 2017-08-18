/**
 * Created by chensuilun on 2017/8/10.
 */

import {
    getNewListFromCache,
    getNewList,
    getTopicList,
    getTopicListFromCache,
    getTopicDetail,
    getTopicReplies,
} from '../model/API'

export const TYPE_TOPIC_REFRESH_SUC = 'TYPE_TOPIC_REFRESH_SUC';
export const TYPE_TOPIC_REFRESH_ERR = 'TYPE_TOPIC_REFRESH_ERR';
export const TYPE_TOPIC_REFRESHING = 'TYPE_TOPIC_REFRESHING';
export const TYPE_TOPIC_LOADING_MORE = 'TYPE_TOPIC_LOADING_MORE';
export const TYPE_TOPIC_LOAD_MORE_ERR = 'TYPE_TOPIC_LOAD_MORE_ERR';
export const TYPE_TOPIC_LOAD_MORE_SUC = 'TYPE_TOPIC_LOAD_MORE_SUC';

export const TYPE_TOPIC_DETAIL_LOADING = 'TYPE_TOPIC_DETAIL_LOADING';
export const TYPE_TOPIC_DETAIL_ERROR = 'TYPE_TOPIC_DETAIL_ERROR';
export const TYPE_TOPIC_DETAIL_SUC = 'TYPE_TOPIC_DETAIL_SUC';

export const TYPE_TOPIC_RELIES_LOADING = 'TYPE_TOPIC_RELIES_LOADING';
export const TYPE_TOPIC_RELIES_ERROR = 'TYPE_TOPIC_RELIES_ERROR';
export const TYPE_TOPIC_RELIES_SUC = 'TYPE_TOPIC_RELIES_SUC';

export const OFFSET = 20;


export const topicsRefreshAction = function () {
    return function (dispatch) {
        console.log('topicsRefreshAction starting');
        dispatch({type: TYPE_TOPIC_REFRESHING, result: "Loading..."});
        getTopicListFromCache(0, OFFSET).then(result => dispatch({
            type: TYPE_TOPIC_REFRESH_SUC,
            result: result,
        })).catch(err => dispatch({
            type: TYPE_TOPIC_REFRESH_ERR,
            result: err,
        }));
    }
}

export const topicsLoadMoreAction = function (page = 1) {
    return function (dispatch) {
        dispatch({type: TYPE_TOPIC_LOADING_MORE, result: "Loading more..."});
        const start = page * OFFSET;
        getTopicList(start, OFFSET).then(result => dispatch({
            type: TYPE_TOPIC_LOAD_MORE_SUC,
            result: result,
        })).catch(err => dispatch({
            type: TYPE_TOPIC_LOAD_MORE_ERR,
            result: err,
        }));
    }
}

export const getTopicDetailAction = function (id = -1) {
    return function (dispatch) {
        dispatch({type: TYPE_TOPIC_DETAIL_LOADING});
        getTopicDetail(id).then(result => dispatch({
                type: TYPE_TOPIC_DETAIL_SUC,
                result: result,
            })
        ).catch(err => dispatch({
            type: TYPE_TOPIC_DETAIL_ERROR,
            result: err,
        }));
    }
}


export const getTopicRepliesAction = function (id = -1) {
    return function (dispatch) {
        dispatch({type: TYPE_TOPIC_RELIES_LOADING});
        getTopicReplies(id).then(result => dispatch({
                type: TYPE_TOPIC_RELIES_SUC,
                result: result,
            })
        ).catch(err => dispatch({
            type: TYPE_TOPIC_RELIES_ERROR,
            result: err,
        }));
    }
}
