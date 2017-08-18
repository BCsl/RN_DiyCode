/**
 * Created by chensuilun on 2017/8/18.
 */
import {connect} from  'react-redux';
import TopicDetail from '../component/topic/TopicDetail';
import {getTopicDetailAction, getTopicRepliesAction} from '../action/HomeAction';

const mapStateToProps = (state, ownProps) => {
    return {
        ...state.detail,
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