/**
 * Created by chensuilun on 2017/8/10.
 */

import {getNewListFromCache, getNewList} from '../model/API'

export const TYPE_TOPIC_REFRESH_SUC = 'TYPE_TOPIC_REFRESH_SUC';
export const TYPE_TOPIC_REFRESH_ERR = 'TYPE_TOPIC_REFRESH_ERR';
export const TYPE_TOPIC_REFRESHING = 'TYPE_TOPIC_REFRESHING';
export const TYPE_TOPIC_LOADING_MORE = 'TYPE_TOPIC_LOADING_MORE';
export const TYPE_TOPIC_LOAD_MORE_ERR = 'TYPE_TOPIC_LOAD_MORE_ERR';
export const TYPE_TOPIC_LOAD_MORE_SUC = 'TYPE_TOPIC_LOAD_MORE_SUC';

export const OFFSET = 20;


export const homeRefreshAction = function () {
    return function (dispatch) {
        console.log('homeRefreshAction starting');
        dispatch({type: TYPE_TOPIC_REFRESHING, result: "Loading..."});
        getNewListFromCache(0, OFFSET).then(result => dispatch({
            type: TYPE_TOPIC_REFRESH_SUC,
            result: result,
        })).catch(err => dispatch({
            type: TYPE_TOPIC_REFRESH_ERR,
            result: err,
        }));
    }
}

export const homeLoadMoreAction = function (page = 1) {
    return function (dispatch) {
        dispatch({type: TYPE_TOPIC_LOADING_MORE, result: "Loading more..."});
        const start = page * OFFSET;
        getNewList(start, OFFSET).then(result => dispatch({
            type: TYPE_TOPIC_LOAD_MORE_SUC,
            result: result,
        })).catch(err => dispatch({
            type: TYPE_TOPIC_LOAD_MORE_ERR,
            result: err,
        }));
    }
}
