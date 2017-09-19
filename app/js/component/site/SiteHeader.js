/**
 * Created by chensuilun on 2017/9/11.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import PropTypes from 'prop-types';
import {Colors} from '../../../res/';

export default class SiteHeader extends Component {

    constructor() {
        super();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text ellipsizeMode={"tail"} numberOfLines={1}>{this.props.name}</Text>
            </View>
        )
    }
}

SiteHeader.propTypes = {
    name: PropTypes.string,
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 8,
        paddingBottom: 8,
        backgroundColor: Colors.divider,
        flexDirection: 'column',
        alignItems:'flex-start',
        justifyContent:'center'
    },
    title: {
        fontSize: 12,
        fontWeight: 'bold',
        color: Colors.colorPrimaryDark,
    }
});
