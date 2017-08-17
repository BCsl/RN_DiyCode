/**
 * Created by chensuilun on 2017/8/10.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    ToolbarAndroid,
    View,
    StatusBar,
    ColorPropType,
} from 'react-native';
import Colors from  '../../../res/Colors'
import PropTypes from 'prop-types';

export default class ActionBar extends Component {

    render() {
        return (
            <View>
                <StatusBar backgroundColor={this.props.statusBarColor}
                           hidden={false}
                />
                <ToolbarAndroid
                    style={{height: 56, backgroundColor: this.props.toolbarColor}}
                    navIcon={this.props.icon}
                    onIconClicked={this.props.onIconClicked}
                    logo={this.props.logo}
                    actions={this.props.actions}
                    onActionSelected={this.props.onActionSelected}
                    titleColor={this.props.titleColor}
                    title={this.props.title}/>
            </View>
        );
    }
}

ActionBar.defaultProps = {
    title: undefined,
    titleColor: Colors.primaryTextDrak,
    icon: require('../../../res/image/ic_arrow_back_black_24dp.png'),
    logo: undefined,
    onIconClicked: undefined,
    actions: [],
    onActionSelected: undefined,
    toolbarColor: Colors.colorPrimary,
    statusBarColor: Colors.colorPrimaryDark,
};

ActionBar.propTypes = {
    title: PropTypes.string,
    icon: PropTypes.number,
    logo: PropTypes.number,
    onIconClicked: PropTypes.func,
    actions: PropTypes.array,
    onActionSelected: PropTypes.func,
    titleColor: ColorPropType,
    toolbarColor: ColorPropType,
    statusBarColor: ColorPropType,
}
