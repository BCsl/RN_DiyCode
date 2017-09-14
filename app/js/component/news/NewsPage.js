/**
 * 新闻列表页
 * Created by chensuilun on 2017/8/10.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import ListFooter from '../common/ListFooter';
import NewsItem from '../news/NewsItem';
import BaseList from '../common/BaseList';

export default class NewsPage extends Component {

    constructor() {
        super();
        this._loadMoreNews = this._loadMoreNews.bind(this);
        this._separator = this._separator.bind(this);
        this._renderHeader = this._renderHeader.bind(this);
        this._onRefresh = this._onRefresh.bind(this);
        this._renderItem = this._renderItem.bind(this);
        this._renderEmpty = this._renderEmpty.bind(this);
    }

    componentDidMount() {
        console.log('NewsPage=>componentDidMount');
        this._onRefresh();
    }


    componentWillUnmount() {
        console.log('NewsPage=>componentWillUnmount',);
    }

    render() {
        let {result, isRefreshing, isLoading, isError, hasMore, message}= this.props;
        return (
            <View style={styles.container}>
                <BaseList
                    loadMoreEnable={true}
                    refreshEnable={true}
                    isRefreshing={isRefreshing}
                    isError={isError}
                    hasMore={hasMore}
                    result={result}
                    refreshData={()=>this._onRefresh(true)}
                    loadMoreData={()=>this._loadMoreNews()}
                    renderItem={this._renderItem}
                    separator={this._separator}
                    header={this._renderHeader}
                >
                </BaseList>
            </View>
        )
    }

    _renderEmpty() {
        return null;
    }

    _renderItem({item, index}) {
        return (
            <NewsItem item={item}
                      pressedListener={(index, item)=>this.props.onNewsClickListener(index, item)}
                      index={index}/>);
    }

    _onRefresh(forceUpdate = false) {
        let {isRefreshing, fetchNews} = this.props;
        if (!isRefreshing) {
            fetchNews(0, forceUpdate);
        }
    }

    _separator() {
        return (<View style={styles.separator }/>);
    }

    _renderHeader() {
        return (<View style={styles.header }/>);
    }

    _loadMoreNews() {
        let {curPage, fetchNews, isLoading} = this.props;
        if (!isLoading && fetchNews) {
            fetchNews(curPage + 1);
        }
    }
}

NewsPage.propTypes = {
    isRefreshing: PropTypes.bool,
    isLoading: PropTypes.bool,
    isError: PropTypes.bool,
    hasMore: PropTypes.bool,
    curPage: PropTypes.number,
    result: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
    ]),
    fetchNews: PropTypes.func,
    onNewsClickListener: PropTypes.func,
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    separator: {
        height: 5,
        backgroundColor: '#00000000'
    },
    header: {
        height: 10,
        backgroundColor: '#00000000'
    },
    footer: {
        flex: 1,
        height: 30,
        backgroundColor: '#00000000',
        justifyContent: 'center',
        alignItems: 'center',
    },
});


