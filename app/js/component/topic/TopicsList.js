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
}from 'react-native'
import NewItems  from './TopicsItem'

export default class NewsList extends Component {

    constructor() {
        super();
        this._renderItem = this._renderItem.bind(this);
        this._onPressItem = this._onPressItem.bind(this);
        this._separator = this._separator.bind(this);
        this._renderEmpty = this._renderEmpty.bind(this);
        this._renderHeader = this._renderHeader.bind(this);
    }

    _onEndReached() {
        console.log('_onEndReached:', arguments);
        this.props.loadMore();
    }

    render() {
        let {onRefresh, isRefreshing, iaLoading} = this.props;
        let footerComponent = iaLoading ? this._renderFooter : this._renderFooter;
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

    _renderFooter() {
        return (<View style={styles.footer }>
            <Text style={styles.footerText}>Loading...</Text>
        </View>);
    }

    _onPressItem(index, item) {
        ToastAndroid.show('press item ' + index, ToastAndroid.SHORT);
        this.props.onTopicClick(index, item);
    }

    _renderItem({item, index}) {
        console.log('index:' + index + ",title:" + item.title);
        return (<NewItems item={item} pressedListener={this._onPressItem} index={index}/>);
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
