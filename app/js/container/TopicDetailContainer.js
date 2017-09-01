/**
 * Created by chensuilun on 2017/8/18.
 */
import {connect} from  'react-redux';
import TopicDetail from '../component/topic/TopicDetail';
import {getTopicDetailAction, getTopicRepliesAction} from '../action/TopicAction';

const mapStateToProps = (state, ownProps) => {
    let {cruDetail, postDetail} =state.topic;
    let users = state.user;
    let nodes = state.node;
    let detail = null;
    if (cruDetail.topicId) {
        console.log('TopicDetailContainer id', cruDetail.topicId);
        detail = postDetail[cruDetail.topicId];
        detail["user"] = users[detail.user_id];
        detail["node_name"] = nodes[detail.node_id].name;
    }
    return {
        ...state.topic.cruDetail,
        result: detail,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDetail: (id) => {
            "use strict";
            dispatch(getTopicDetailAction(id));
        },
        getReplies: (id) => {
            "use strict";
            dispatch(getTopicRepliesAction(id));
        }
    }
}


const DetailContainer = connect(mapStateToProps, mapDispatchToProps)(TopicDetail);
export default DetailContainer;