/**
 * Created by chensuilun on 2017/7/19.
 */
import React, {Component} from 'react';
import{
    FlatList,
    ToastAndroid,
    Text,
    View,
    StyleSheet,
}from 'react-native';
import TopicItem  from './TopicsItem';
import ListFooter from '../common/ListFooter';

export default class NewsList extends Component {

    constructor() {
        super();
        this._renderItem = this._renderItem.bind(this);
        this._onPressItem = this._onPressItem.bind(this);
        this._separator = this._separator.bind(this);
        this._renderEmpty = this._renderEmpty.bind(this);
        this._renderHeader = this._renderHeader.bind(this);
        this._renderLoadingFooter = this._renderLoadingFooter.bind(this);
        this._renderErrorFooter = this._renderErrorFooter.bind(this);
    }

    _onEndReached() {
        console.log('_onEndReached:', arguments);
        this.props.loadMore();
    }

    render() {
        let {onRefresh, isRefreshing, isLoading, isError, message, hasMore} = this.props;
        let footerComponent = this._renderLoadingFooter;
        if (isError) {
            footerComponent = (<ListFooter state={'Error'} retryListener={()=>this._loadMoreNews()}/>);
        } else if (!hasMore) {
            footerComponent = (<ListFooter state={'HasMore'}/>);
        }
        return (
            <FlatList
                keyExtractor={(item, index)=>index}
                data={this.props.list}
                renderItem={this._renderItem}
                onRefresh={onRefresh}
                refreshing={isRefreshing}
                ListHeaderComponent={this._renderHeader}
                ListFooterComponent={footerComponent}
                ListEmptyComponent={this._renderEmpty}
                ItemSeparatorComponent={this._separator}
                onEndReachedThreshold={0.1}
                onEndReached={()=>this._onEndReached(arguments)}
            >
            </FlatList>
        )
    }


    _renderEmpty() {
        return (
            <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={{color: 'black', textAlign: 'center'}}>Empty</Text>
            </View>);
    }

    _separator() {
        return (<View style={styles.separator }/>);
    }

    _renderHeader() {
        return (<View style={styles.header }/>);
    }

    _renderLoadingFooter() {
        return <ListFooter state={"Loading"}/>;
    }

    _renderErrorFooter() {
        return <ListFooter state={"Error"} retryListener={()=>this.props.loadMore()}/>;
    }

    _onPressItem(index, item) {
        this.props.onTopicClick(index, item);
    }

    _renderItem({item, index}) {
        if (false) {
            console.log('index:' + index + ",title:" + item.title);
        }
        return (<TopicItem item={item} pressedListener={this._onPressItem} index={index}/>);
    }

}

const styles = StyleSheet.create({
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
    footerText: {
        color: 'black',
        textAlign: 'center'
    },
});
