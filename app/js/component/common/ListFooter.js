/**
 * Created by chensuilun on 2017/9/6.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
    TouchableNativeFeedback,
} from 'react-native';
import {Colors} from '../../../res';
import PropTypes from 'prop-types';

export default class ListFooter extends Component {

    constructor() {
        super();
        this._renderLoading = this._renderLoading.bind(this);
        this._renderError = this._renderError.bind(this);
        this._renderNoMore = this._renderNoMore.bind(this);
        this._renderLoadingMore = this._renderLoadingMore.bind(this);
    }

    componentDidMount() {
        console.log('LoadingItem=>componentDidMount');
    }

    componentWillUnmount() {
        console.log('LoadingItem=>componentWillUnmount',);
    }

    render() {
        let {state}  =this.props;
        if (state === 'None') {
            return null;
        } else if (state === 'Loading') {
            return this._renderLoading();
        } else if (state === 'NoMore') {
            return this._renderNoMore();
        } else if (state === 'Error') {
            return this._renderError();
        } else {
            return this._renderLoadingMore();
        }

    }

    _renderLoading() {
        return (
            <View style={styles.container}>
                <ActivityIndicator
                    color={Colors.colorAccent}
                    animating={true}
                    size="small"
                />
            </View>
        );
    }

    _renderError() {
        let {retryListener} = this.props;
        return ( <TouchableNativeFeedback
                onPress={retryListener && retryListener()}
                background={TouchableNativeFeedback.SelectableBackground()}>
                <View style={styles.container}>
                    <Text style={styles.message}>加载出错,点击重试</Text>
                </View>
            </TouchableNativeFeedback>
        );
    }

    _renderLoadingMore() {
        let {loadMoreListener} = this.props;
        return (
            <TouchableNativeFeedback
                onPress={loadMoreListener && loadMoreListener()}
                background={TouchableNativeFeedback.SelectableBackground()}>
                <View style={styles.container}>
                    <Text style={styles.message}>点击显示更多</Text>
                </View>
            </TouchableNativeFeedback>
        );
    }

    _renderNoMore() {
        return (<View style={styles.container}>
                <Text style={styles.message}>没有更多内容</Text>
            </View>
        );
    }
}

ListFooter.propTypes = {
    retryListener: PropTypes.func,
    loadMoreListener: PropTypes.func,
    state: PropTypes.oneOf(['Loading', 'NoMore', 'Error', 'HasMore', 'None']),
}
ListFooter.defaultProps = {
    state: 'None',
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 60,
        backgroundColor: Colors.divider,
        justifyContent: 'center',
        alignItems: 'center',
    },
    message: {
        marginLeft: 6,
        marginRight: 6,
        fontSize: 12,
        color: '#b6b7ba',
        fontWeight: `bold`,
    },
});