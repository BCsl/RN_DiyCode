/**
 * Created by chensuilun on 2017/9/11.
 */
import {
    getSites,
    getSitesFromCache,
} from '../model/API';
import {
    TYPE_SITE_REFRESH_SUC,
    TYPE_SITE_REFRESH_ERR,
    TYPE_SITE_REFRESHING,
} from './ActionTypes';

export default getSitesAction = function (forceUpdate = false) {
    return function (dispatch) {
        console.log('sitesAction starting');
        dispatch({type: TYPE_SITE_REFRESHING, result: "Loading..."});
        let api = forceUpdate ? getSites : getSitesFromCache;
        api().then(result => dispatch({
            type: TYPE_SITE_REFRESH_SUC,
            result: result,
        })).catch(err => dispatch({
            type: TYPE_SITE_REFRESH_ERR,
            result: err,
        }));
    }
}
