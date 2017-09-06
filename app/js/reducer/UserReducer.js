/**
 * Created by chensuilun on 2017/8/31.
 */
import {
    TYPE_TOPIC_REFRESH_SUC,
    TYPE_TOPIC_LOAD_MORE_SUC,
    TYPE_TOPIC_DETAIL_SUC,
    TYPE_TOPIC_RELIES_SUC,
    TYPE_TOPIC_RELIES_LOAD_MORE_SUC,
}from '../action/ActionTypes';

//
// {
// userId: {
//     "id": 1,
//     "login": "jixiaohua",
//     "name": "寂小桦",
//     "avatar_url": "https://diycode.b0.upaiyun.com/user/large_avatar/2.jpg"
//  }
// }

function getUsersFromPost(posts = []) {
    let userMap = {};
    for (let post of posts) {
        //https://www.diycode.cc/topics/411 fix avatar not show
        if (post.user.avatar_url) {
            post.user.avatar_url = post.user.avatar_url.replace('large_avatar','avatar');
        }
        userMap[post.user.id] = post.user;
    }
    console.log('UserReducer getUsersFromPost ', userMap);
    return userMap;
}

export default function userReducer(state = {}, action) {
    switch (action.type) {
        case TYPE_TOPIC_REFRESH_SUC:
            return Object.assign({}, state, getUsersFromPost(action.result));
        case TYPE_TOPIC_LOAD_MORE_SUC :
            return Object.assign({}, state, getUsersFromPost(action.result));
        case TYPE_TOPIC_RELIES_SUC:
        case TYPE_TOPIC_RELIES_LOAD_MORE_SUC:
            //记录主题回复中的用户列表
            return Object.assign({}, state, getUsersFromPost(action.result));
        default:
            return state;
    }
}