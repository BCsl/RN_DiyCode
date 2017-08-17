/**
 * Created by chensuilun on 2017/8/10.
 */

import React, {Component, Children} from 'react';
import {
    StyleSheet,
    TouchableNativeFeedback,
    Image,
    View,
} from 'react-native';
import PropTypes from 'prop-types';

export default class BarIconContainer extends Component {

    constructor() {
        super();
    }

    render() {
        return (
            <TouchableNativeFeedback
                style={styles.container}
                onPress={this.props.onPressListener}
                background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
            >
                <View
                    style={styles.container}>
                    {Children.only(this.props.children)}
                </View>
            </TouchableNativeFeedback>
        )
    }

    static image() {
        return {
            width: 24,
            height: 24,
        }
    }
}

BarIconContainer.propTypes = {
    children: PropTypes.element.isRequired,
    onPressListener: PropTypes.func,
}

const styles = StyleSheet.create({
    container: {
        width: 56,
        height: 56,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 24,
        height: 24,
    }
});

