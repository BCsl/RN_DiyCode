/**
 * Created by chensuilun on 2017/8/15.
 */
import {connect} from 'react-redux'
import TopicsPage from '../component/topic/TopicsPager'
import {homeRefreshAction, homeLoadMoreAction}from '../action/HomeAction'

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
            dispatch(homeRefreshAction());
        },
        loadMore: (page)=> {
            "use strict";
            dispatch(homeLoadMoreAction(page));
        },
        onTopicClick: (index, item) => {
            console.log('onTopicClick');
        }
    }
}


const TopicsContainer = connect(mapStateToProps, mapDispatchToProps)(TopicsPage);

export default TopicsContainer;