/**
 * Created by chensuilun on 2017/9/7.
 */
import {
    getNewsListFromCache,
    getNewsList,
} from '../model/API';

import {
    TYPE_NEWS_REFRESH_SUC,
    TYPE_NEWS_REFRESH_ERR,
    TYPE_NEWS_REFRESHING,
    TYPE_NEWS_LOADING_MORE,
    TYPE_NEWS_LOAD_MORE_ERR,
    TYPE_NEWS_LOAD_MORE_SUC,
}from './ActionTypes';

export const OFFSET = 20;

/**
 * 新闻页更新 Action
 * @returns {Function}
 */
export const newsRefreshAction = function () {
    return function (dispatch) {
        console.log('topicsRefreshAction starting');
        dispatch({type: TYPE_NEWS_REFRESHING, result: "Loading..."});
        getNewsListFromCache(0, OFFSET).then(result => dispatch({
            type: TYPE_NEWS_REFRESH_SUC,
            result: result,
        })).catch(err => dispatch({
            type: TYPE_NEWS_REFRESH_ERR,
            result: err,
        }));
    }
}
/**
 * 新闻列表加载更多
 * @param page
 * @returns {Function}
 */
export const newsLoadMoreAction = function (page = 1) {
    return function (dispatch) {
        dispatch({type: TYPE_NEWS_LOADING_MORE, result: "Loading more..."});
        const start = page * OFFSET;
        getNewsList(start, OFFSET).then(result => dispatch({
            type: TYPE_NEWS_LOAD_MORE_SUC,
            result: result,
        })).catch(err => dispatch({
            type: TYPE_NEWS_LOAD_MORE_ERR,
            result: err,
        }));
    }
}