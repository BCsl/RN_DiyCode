/**
 * Created by chensuilun on 2017/8/18.
 */
import {
    TYPE_TOPIC_DETAIL_LOADING,
    TYPE_TOPIC_DETAIL_ERROR,
    TYPE_TOPIC_DETAIL_SUC,
    TYPE_TOPIC_RELIES_LOADING,
    TYPE_TOPIC_RELIES_ERROR,
    TYPE_TOPIC_RELIES_SUC,
} from '../action/HomeAction';

const initState = {
    isLoading: true,
    result: null,
    isError: false,
};

export default detailReducer = function (state = initState, action) {
    switch (action.type) {
        case TYPE_TOPIC_DETAIL_LOADING:
            return Object.assign({}, state, {isLoading: true, result: null});
        case TYPE_TOPIC_DETAIL_ERROR:
            return Object.assign({}, state, {isLoading: false, isError: true, result: action.result.message});
        case TYPE_TOPIC_DETAIL_SUC:
            return Object.assign({}, state, {isLoading: false, isError: false, result: action.result});
        default:
            return state;
    }
    return state;
}
