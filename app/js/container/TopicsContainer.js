/**
 * Created by chensuilun on 2017/8/15.
 */
import {connect} from 'react-redux';
import TopicsPage from '../component/topic/TopicsPager';
import {topicsRefreshAction, topicsLoadMoreAction} from '../action/TopicAction';
import {NavigationActions} from 'react-navigation';

const mapStateToProps = (state) => {
    let {list, postDetail} = state.topic;
    let users = state.user;
    let nodes = state.node;
    let topicList = [];
    if (list && list.result) {
        topicList = list.result.map(function (id) {
            let topic = postDetail[id];
            topic["user"] = users[topic.user_id];
            topic["node_name"] = nodes[topic.node_id].name;
            return topic;
        });
    }
    return {
        ...list,
        result: topicList,  //覆盖 result
        rootNavigator: state.nav,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        refresh: ()=> {
            "use strict";
            dispatch(topicsRefreshAction());
        },
        loadMore: (page)=> {
            "use strict";
            dispatch(topicsLoadMoreAction(page));
        },
        onTopicClick: (index, item) => {
            let action = NavigationActions.navigate(
                {
                    routeName: 'TopicDetail',
                    params: {id: item.id},
                });
            dispatch(action);
        },
    }
}


const TopicsContainer = connect(mapStateToProps, mapDispatchToProps)(TopicsPage);

export default TopicsContainer;