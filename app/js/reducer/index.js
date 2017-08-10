/**
 * Created by chensuilun on 2017/8/10.
 */
import {combineReducers} from 'redux'

const homeInitState = {}

const homeReducer = function (state = homeInitState, action) {
    switch (action.type) {
        default:
            return state;
    }
    return state;

}

export default  combineReducers({
    home: homeReducer,
})