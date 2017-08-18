/**
 * Created by chensuilun on 2017/8/15.
 */
import {connect} from 'react-redux';
import TopicsPage from '../component/topic/TopicsPager';
import {topicsRefreshAction, topicsLoadMoreAction} from '../action/HomeAction';
import {NavigationActions} from 'react-navigation';

const mapStateToProps = (state, ownProps) => {
    return {
        ...state.home.topics,
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