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
        if (isError && result.length <= 0) {
            return (<Text style={{textAlign: "center", color: 'red', flex: 1}}>{message}</Text>);
        }
        let footerComponent = isRefreshing ? null : (<ListFooter state={'Loading'}/>);
        if (isError) {
            footerComponent = (<ListFooter state={'Error'} retryListener={()=>this._loadMoreNews()}/>);
        } else if (!hasMore) {
            footerComponent = (<ListFooter state={'HasMore'}/>);
        }
        return (
            <View style={styles.container}>
                <FlatList
                    style={styles.container}
                    keyExtractor={(item, index)=>index}
                    data={result}
                    renderItem={this._renderItem}
                    onRefresh={this._onRefresh}
                    refreshing={isRefreshing}
                    ListHeaderComponent={this._renderHeader}
                    ListFooterComponent={footerComponent}
                    ListEmptyComponent={this._renderEmpty}
                    ItemSeparatorComponent={this._separator}
                    onEndReachedThreshold={0.1}
                    onEndReached={()=>this._loadMoreNews()}
                >
                </FlatList>
            </View>
        )
    }

    _renderEmpty() {
        return null;
    }

    _renderItem({item, index}) {
        return (<NewsItem item={item} pressedListener={()=>log.d('click')} index={index}/>);
    }

    _onRefresh() {
        let {isRefreshing, fetchNews} = this.props;
        if (!isRefreshing) {
            fetchNews(0);
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


