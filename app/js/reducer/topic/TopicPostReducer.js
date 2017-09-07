/**
 * Created by chensuilun on 2017/8/30.
 */
import {
    TYPE_TOPIC_REFRESH_SUC,
    TYPE_TOPIC_LOAD_MORE_SUC,
    TYPE_TOPIC_DETAIL_SUC,
    TYPE_TOPIC_RELIES_SUC,
    TYPE_TOPIC_RELIES_LOAD_MORE_SUC,
}from '../../action/ActionTypes';

//
// topicPost: 格式
//
// {
//     "id": 922,
//     "title": "对生活说一句话，然后就可以拿走此图了！",
//     "created_at": "2017-08-09T12:24:06.697+08:00",
//     "updated_at": "2017-08-30T11:05:14.500+08:00",
//     "replied_at": "2017-08-30T11:05:14.477+08:00",
//     "replies_count": 19,
//     "node_id": 27,
//     "last_reply_user_id": 5534,
//     "last_reply_user_login": "geyingzhen",
//     "user_id": xxx,
//     "deleted": false,
//     "excellent": false,
//     "abilities": {
//     "update": false,
//         "destroy": false
//      "body": "左边是一往无前的我，右边是未知未来的恐惧\r\n\r\n![](https://diycode.b0.upaiyun.com/photo/2017/441c258bb27695595d1594cc46730dc3.jpg)\r\n",
//      "body_html": "<p>左边是一往无前的我，右边是未知未来的恐惧</p>\n\n<p><img src=\"https://diycode.b0.upaiyun.com/photo/2017/441c258bb27695595d1594cc46730dc3.jpg\" title=\"\" alt=\"\"></p>",
//     "hits": 1214,
//     "likes_count": 9,
//     "suggested_at": null,
//     "followed": null,
//     "liked": null,
//     "favorited": null
//      "repliesId":{id....}
// }
// },

//{id0 : post0 ,id1 : post1...idN : postN }
const initState = {repliesId: []};

function getPosts(result = []) {
    let postMap = {};
    //https://stackoverflow.com/questions/34698905/clone-a-js-object-except-for-one-key
    //这里过滤几个属性,不知道有没简洁的方法直接过滤掉特定属性?
    for (let topic of result) {
        postMap[topic.id] = getPost(topic);
    }
    console.log('TopicPostReducer getPosts ', postMap);
    return postMap;
}

function getPost(topic) {
    return {
        "id": topic.id,
        "title": topic.title,
        "created_at": topic.created_at,
        "updated_at": topic.updated_at,
        "replied_at": topic.replied_at,
        "replies_count": topic.replies_count,
        "node_id": topic.node_id,
        "user_id": topic.user.id,
        "deleted": topic.deleted,
        "excellent": topic.excellent,
        "body": topic.body,
        "body_html": topic.body_html,
        "hits": topic.hits,
        "likes_count": topic.likes_count,
    };
}


/**
 * 管理完整的文章列表,{id:post}
 * @param state
 * @param action
 * @returns {*}
 */
const topicPostReducer = function (state = initState, action) {
    switch (action.type) {
        case TYPE_TOPIC_REFRESH_SUC:
            let result = Object.assign({}, state, getPosts(action.result));
            console.log('TopicPostReducer result:', result);
            return result;
        case TYPE_TOPIC_LOAD_MORE_SUC :
            return Object.assign({}, state, getPosts(action.result));
        case TYPE_TOPIC_DETAIL_SUC:
            //主要是更新某个主题的详情
            let newState = Object.assign({}, state);
            let topic = newState[action.result.id];
            Object.assign(topic, getPost(action.result));
            return newState;
        case TYPE_TOPIC_RELIES_SUC:
        case TYPE_TOPIC_RELIES_LOAD_MORE_SUC:
            //更新主题的评论列表
            if (action.result && action.result.length > 0) {
                let relyState = Object.assign({}, state);
                for (let reply of action.result) {
                    let topic = relyState[reply.topic_id];
                    if (topic["repliesId"]) {
                        topic["repliesId"].push(reply.id);
                    } else {
                        topic["repliesId"] = [reply.id];
                    }
                }
                return relyState;
            }
            return state;
        default:
            return state;
    }
}

export default topicPostReducer;