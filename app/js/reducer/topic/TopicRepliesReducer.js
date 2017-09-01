/**
 * Created by chensuilun on 2017/8/31.
 */

import {
    TYPE_TOPIC_RELIES_SUC,
}from '../../action/ActionTypes';

//{id:
//  {
//     "id": 3858,
//     "body_html": "<p>最后这句自伤了，半年时间你可以轻松一些，分配多一点时间学习和玩，这样或许会过得开心些</p>",
//     "created_at": "2017-08-17T00:10:56.273+08:00",
//     "updated_at": "2017-08-17T00:10:56.273+08:00",
//     "topic_id": 927,
//     "userId": xxx,
//     "likes_count": 0,
//  }
//}
function getReplies(result = []) {
    let replyMap = {};
    for (let reply of result) {
        replyMap[reply.id] = {
            id: reply.id,
            body_html: reply.body_html,
            created_at: reply.created_at,
            updated_at: reply.updated_at,
            topic_id: reply.topic_id,
            likes_count: reply.likes_count,
            userId: reply.user.id,
        };
    }
    console.log('TopicReliesReducer getReplies ', replyMap);
    return replyMap;
}
export default function topicReplies(state = {}, action) {
    switch (action.type) {
        case TYPE_TOPIC_RELIES_SUC:
            return Object.assign({}, state, getReplies(action.result));
        default:
            return state;
    }
}