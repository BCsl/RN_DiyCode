/**
 * Created by chensuilun on 2017/7/18.
 */
import React, {Component} from 'react';
import{
    View,
    StyleSheet,
    FlatList,
    Text,
    RefreshControl,
}from 'react-native'
import TopicsList from './TopicsList';

export default class TopicsPager extends Component {

    constructor() {
        super();
        this._onRefresh = this._onRefresh.bind(this);
        this._onLoadMore = this._onLoadMore.bind(this);
    }

    componentDidMount() {
        console.log('TopicsPager componentDidMount=>:', this.props);
        this._onRefresh();
    }

    componentWillReceiveProps(nextProps) {
        console.log('TopicsPager componentWillReceiveProps=>', nextProps);
    }


    _onRefresh() {
        console.log('TopicsPager onRefresh');
        if (!this.props.isRefreshing) {
            this.props.refresh();
        }
    }

    _onLoadMore() {
        console.log('TopicsPager _onLoadMore,cur page:', this.props.curPage);
        if (!this.props.isLoading) {
            this.props.loadMore(this.props.curPage + 1);
        }
    }

    render() {
        console.log('TopicsPager render:', this.props);
        if (this.props.isRefreshing && typeof this.props.result != 'object') {
            console.log('loading');
            return this._renderLoading('Loading...');
        } else if (this.props.isError) {
            return this._renderError(this.props.result);
        } else {
            console.log('list:', this.props.result);
            return this._renderList();
        }
    }

    _renderList() {
        let {isRefreshing, isLoading} = this.props;
        return (
            <View style={styles.container}>
                <TopicsList
                    onRefresh={this._onRefresh}
                    isRefreshing={isRefreshing}
                    iaLoading={isLoading}
                    loadMore={this._onLoadMore}
                    onTopicClick={(index, item)=>this.props.onTopicClick(index, item)}
                    list={this.props.result}/>
            </View>
        )
    }

    _renderLoading(message) {
        return (
            <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={{color: 'black', textAlign: 'center'}}>{message}</Text>
            </View>)
    }

    _renderError(errMsg) {
        console.log(errMsg);
        return (
            <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={{color: 'red', textAlign: 'center'}}>{errMsg}</Text>
            </View>)
    }
}

var styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'flex-start',
    },
    newsList: {
        flex: 1,
    },
});