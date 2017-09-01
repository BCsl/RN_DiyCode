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
function getRelies(result = []) {
    let relyMap = {};
    for (let rely of result) {
        relyMap[rely.id] = {
            id: rely.id,
            body_html: rely.body_html,
            created_at: rely.created_at,
            updated_at: rely.updated_at,
            topic_id: rely.topic_id,
            likes_count: rely.likes_count,
            userId: rely.user.id,
        };
    }
    console.log('TopicReliesReducer', relyMap);
    return relyMap;

}
export default function topicRelies(state = {}, action) {
    switch (action.type) {
        case TYPE_TOPIC_RELIES_SUC:
            return Object.assign({}, state, getRelies(action.result));
        default:
            return state;
    }
}