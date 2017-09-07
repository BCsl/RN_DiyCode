/**
 * Created by chensuilun on 2017/9/7.
 */
import {
    TYPE_NEWS_REFRESH_SUC,
    TYPE_NEWS_REFRESH_ERR,
    TYPE_NEWS_REFRESHING,
    TYPE_NEWS_LOADING_MORE,
    TYPE_NEWS_LOAD_MORE_ERR,
    TYPE_NEWS_LOAD_MORE_SUC,
} from '../../action/ActionTypes';

import {
    OFFSET,
} from  '../../action/NewsAction';

const initState = {
    isRefreshing: true,
    isLoading: false,
    isError: false,
    hasMore: true,
    curPage: 0,
    result: [],//news 数组
};

function getNewsArray(result = []) {
    let newsArray = [];
    for (let news of result) {
        newsArray.push(getNews(news));
    }
    return newsArray;
}

function getNews(news) {
    return {
        "id": news.id,
        "title": news.title,
        "created_at": news.created_at,
        "updated_at": news.updated_at,
        "user_id": news.user.id,
        "node_id": news.node_id,
        "address": news.address,
    };
}

export default newsReducer = function (state = initState, action) {
    switch (action.type) {
        case TYPE_NEWS_REFRESH_SUC :
            return Object.assign({}, state, {
                isLoading: false,
                isRefreshing: false,
                isError: false,
                message: "suc",
                result: getNewsArray(action.result),
                curPage: 1,
                hasMore: action.result && action.result.length >= OFFSET,
            });
            break;
        case TYPE_NEWS_REFRESH_ERR :
            return Object.assign({}, state, {
                isLoading: false,
                isRefreshing: false,
                isError: true,
                message: action.result.message,
            });
            break;
        case TYPE_NEWS_REFRESHING :
            return Object.assign({}, state, {
                isLoading: false,
                isRefreshing: true,
                isError: false,
                message: action.result
            });
            break;
        case TYPE_NEWS_LOADING_MORE :
            return Object.assign({}, state, {
                isLoading: true,
                isRefreshing: false,
                isError: false,
                message: 'loading more',
            });
            break;
        case TYPE_NEWS_LOAD_MORE_ERR :
            return Object.assign({}, state, {
                isLoading: false,
                isRefreshing: false,
                isError: true,
                message: 'load more error',
            });
            break;
        case TYPE_NEWS_LOAD_MORE_SUC :
            return Object.assign({}, state, {
                isLoading: false,
                isRefreshing: false,
                isError: false,
                message: 'loading more suc',
                result: state.result.slice().concat(getNewsArray(action.result)),
                curPage: state.curPage + 1,
                hasMore: action.result.length >= OFFSET,
            });
            break;
        default:
            return state;
    }
}