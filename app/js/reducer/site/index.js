/**
 * Created by chensuilun on 2017/9/11.
 */

import {
    TYPE_SITE_REFRESH_SUC,
    TYPE_SITE_REFRESH_ERR,
    TYPE_SITE_REFRESHING,
} from '../../action/ActionTypes';

const initState = {
    isRefreshing: false,
    isError: false,
    message: null,
    result: null,
};
//
// 原始数据格式:
// {[
//     "sites": [
//     {
//         "name": "Gratisography",
//         "url": "http://www.gratisography.com",
//         "avatar_url": "https://favicon.b0.upaiyun.com/ip2/www.gratisography.com.ico"
//     },
//     //...
//     ],
//     "name": "Free high-resolution pictures WebSites － 免费高清无版权图片素材网站",
//     "id": 21
// },
// ...
// ]
// }
//
//
//
//

export default siteReducer = function (state = initState, action) {
    switch (action.type) {
        case TYPE_SITE_REFRESH_SUC:
            return Object.assign({}, state, {
                isError: false,
                isRefreshing: false,
                message: 'Success',
                result: action.result
            });
        case TYPE_SITE_REFRESH_ERR:
            return Object.assign({}, state, {isError: true, isRefreshing: false, message: action.result.message});
        case TYPE_SITE_REFRESHING:
            return Object.assign({}, state, {isError: false, isRefreshing: true, message: 'Loading'});
        default:
            return state;
    }
}
