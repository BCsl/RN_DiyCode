/**
 * Created by chensuilun on 2017/8/18.
 */
import {connect} from  'react-redux';
import TopicDetail from '../component/topic/TopicDetailPager';
import {getTopicDetailAction, getTopicRepliesAction} from '../action/TopicAction';

const mapStateToProps = (state, ownProps) => {
    let {cruDetail, postDetail, reply} =state.topic;
    let users = state.user;
    let nodes = state.node;
    let detail = null;
    let replyArray = null;
    if (cruDetail.topicId) {
        console.log('TopicDetailContainer id', cruDetail.topicId);
        detail = postDetail[cruDetail.topicId];
        detail['user'] = users[detail.user_id];
        detail['node_name'] = nodes[detail.node_id].name;
        let repliesId = detail['repliesId'];
        if (repliesId) {
            replyArray = repliesId.map(function (id) {
                let r = reply[id];
                r['user'] = users[r.userId];
                return r;
            });
        }
    }
    return {
        ...state.topic.cruDetail,
        result: detail,
        replyArray: replyArray,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDetail: (id) => {
            "use strict";
            dispatch(getTopicDetailAction(id));
        },
        getRelies: (id, page) => {
            "use strict";
            dispatch(getTopicRepliesAction(id, page));
        }
    }
}


const DetailContainer = connect(mapStateToProps, mapDispatchToProps)(TopicDetail);
export default DetailContainer;