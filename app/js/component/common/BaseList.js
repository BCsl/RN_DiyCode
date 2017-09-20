/**
 * Created by chensuilun on 2017/9/8.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    FlatList,
    View,
} from 'react-native';
import PropTypes from 'prop-types';
import ListFooter from '../common/ListFooter';

export default class BaseList extends Component {

    constructor() {
        super();
        this._renderFooter = this._renderFooter.bind(this);
        this._renderEmpty = this._renderEmpty.bind(this);
        this._loadMore = this._loadMore.bind(this);
    }

    componentDidMount() {
        console.log('BaseList=>componentDidMount');
    }

    componentWillUnmount() {
        console.log('BaseList=>componentWillUnmount',);
    }

    render() {
        let {result, isRefreshing, isError, renderItem, header, refreshEnable, refreshData, separator}= this.props;
        if (isError && result.length <= 0) {
            return (<Text style={{textAlign: "center", color: 'red', flex: 1}}>{message}</Text>);
        }
        refreshData = refreshEnable ? refreshData : null;
        isRefreshing = ( refreshEnable && refreshData) ? isRefreshing : false;
        return (
            <FlatList
                style={styles.container}
                keyExtractor={(item, index)=>index}
                data={result}
                renderItem={renderItem}
                onRefresh={refreshData ? ()=>refreshData() : null}
                refreshing={isRefreshing}
                ListHeaderComponent={header}
                ListFooterComponent={this._renderFooter}
                ListEmptyComponent={this._renderEmpty}
                ItemSeparatorComponent={separator}
                onEndReachedThreshold={0.1}
                onEndReached={()=>this._loadMore()}
            >
            </FlatList>
        )
    }

    _renderFooter() {
        let {loadMoreEnable, isRefreshing, isError, hasMore, footer} =this.props;
        let footerComponent = null;
        if (loadMoreEnable) {
            footerComponent = isRefreshing ? null : (<ListFooter state={'Loading'}/>);
            if (isError) {
                footerComponent = (<ListFooter state={'Error'} retryListener={()=>this._loadMore()}/>);
            } else if (!hasMore) {
                footerComponent = (<ListFooter state={'HasMore'}/>);
            }
        }
        return (<View style={styles.footer}>
            {footerComponent}
            {footer}
        </View>);
    }

    _renderEmpty() {
        return null;
    }

    _loadMore() {
        let {loadMoreEnable, loadMoreData} =this.props;
        if (loadMoreEnable && loadMoreData) {
            loadMoreData();
        }
    }
}

BaseList.propTypes = {
    loadMoreEnable: PropTypes.bool,
    refreshEnable: PropTypes.bool,
    isRefreshing: PropTypes.bool,
    isError: PropTypes.bool,
    hasMore: PropTypes.bool,
    result: PropTypes.array,
    refreshData: PropTypes.func,
    loadMoreData: PropTypes.func,
    renderItem: PropTypes.func,
    separator: PropTypes.func,
    header: PropTypes.func,
    footer: PropTypes.func,
}

BaseList.defaultProps = {
    result: [],
    loadMoreEnable: false,
    refreshEnable: false,
    isError: false,
    hasMore: true,
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    footer: {
        flex: 1
    }
});
