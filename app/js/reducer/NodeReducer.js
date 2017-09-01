/**
 * Created by chensuilun on 2017/8/31.
 */

import {
    TYPE_TOPIC_REFRESH_SUC,
    TYPE_TOPIC_LOAD_MORE_SUC,
}from '../action/ActionTypes';

//{node_id:
// {
// "node_name": "分享发现",
// "node_id": 27,
// }
//}

function getNodesFromPost(posts = []) {
    let nodeMap = {};
    for (let post of posts) {
        nodeMap[post.node_id] = {id: post.node_id, name: post.node_name};
    }
    console.log('NodeReducer:', nodeMap);
    return nodeMap;
}

export default function nodeReducer(state = {}, action) {
    switch (action.type) {
        case TYPE_TOPIC_REFRESH_SUC:
            return Object.assign({}, state, getNodesFromPost(action.result));
        case TYPE_TOPIC_LOAD_MORE_SUC :
            return Object.assign({}, state, getNodesFromPost(action.result));
        default:
            return state;
    }
}
