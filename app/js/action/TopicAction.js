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
} from '../model/API';

import {
    TYPE_TOPIC_REFRESH_SUC,
    TYPE_TOPIC_REFRESH_ERR,
    TYPE_TOPIC_REFRESHING,
    TYPE_TOPIC_LOADING_MORE,
    TYPE_TOPIC_LOAD_MORE_ERR,
    TYPE_TOPIC_LOAD_MORE_SUC,
    TYPE_TOPIC_DETAIL_LOADING,
    TYPE_TOPIC_DETAIL_ERROR,
    TYPE_TOPIC_DETAIL_SUC,
    TYPE_TOPIC_RELIES_LOADING,
    TYPE_TOPIC_RELIES_ERROR,
    TYPE_TOPIC_RELIES_SUC,
    TYPE_TOPIC_RELIES_LOAD_MORE_SUC

}from './ActionTypes';

export const OFFSET = 20;
export const OFFSET_RELY = 10;

/**
 * 主题页更新 Action
 * @returns {Function}
 */
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
/**
 * 主题列表加载更多
 * @param page
 * @returns {Function}
 */
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
/**
 * 获取主题详情
 * @param id
 * @returns {Function}
 */
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

/**
 * 获取主题回复
 * @param id
 * @param page 页数,默认0
 * @returns {Function}
 */
export const getTopicRepliesAction = function (id = -1, page = 0) {
    return function (dispatch) {
        dispatch({type: TYPE_TOPIC_RELIES_LOADING});
        const start = page * OFFSET_RELY;
        getTopicReplies(id, start, OFFSET_RELY).then(result => dispatch({
                type: page == 0 ? TYPE_TOPIC_RELIES_SUC : TYPE_TOPIC_RELIES_LOAD_MORE_SUC,
                result: result,
            })
        ).catch(err => dispatch({
            type: TYPE_TOPIC_RELIES_ERROR,
            result: err,
        }));
    }
}
