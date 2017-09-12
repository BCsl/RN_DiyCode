/**
 * Created by chensuilun on 2017/9/7.
 */
import {connect} from 'react-redux';
import NewsPage from '../component/news/NewsPage';
import {newsRefreshAction, newsLoadMoreAction} from '../action/NewsAction';


const mapStateToProps = (state) => {
    let {result} = state.news;
    let users = state.user;
    let nodes = state.node;
    let newsList = [];
    let n = null;
    for (let news of result) {
        n = Object.assign({}, news);
        n["user"] = users[n.user_id];
        n["node_name"] = nodes[n.node_id].name;
        newsList.push(n);
    }

    return {
        ...state.news,
        result: newsList,  //覆盖 result
        rootNavigator: state.nav,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchNews: (page = 0, forceUpdate = false)=> {
            if (page === 0) {
                dispatch(newsRefreshAction(forceUpdate));
            } else {
                dispatch(newsLoadMoreAction(page));
            }
        },
        onNewsClickListener: (index, item) => {
            "use strict";
            console.log('NewsContainer click:', index);
        },
    }
}


const NewsContainer = connect(mapStateToProps, mapDispatchToProps)(NewsPage);

export default NewsContainer;