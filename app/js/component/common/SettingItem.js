/**
 * Created by chensuilun on 2017/9/20.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ColorPropType,
    TouchableNativeFeedback,
} from 'react-native';
import PropTypes from 'prop-types';

import {Images, Colors} from '../../../res'

export default class SettingItem extends Component {

    constructor() {
        super();
    }

    render() {
        let {index, title, titleColor, icon, onClickListener} = this.props;
        return (
            <TouchableNativeFeedback
                onPress={()=>onClickListener && onClickListener(index)}
                background={TouchableNativeFeedback.SelectableBackground()}>
                <View style={styles.container}>
                    <Image
                        style={styles.icon}
                        source={icon}/>
                    <Text style={[styles.title, {color: titleColor}]} ellipsizeMode={"tail"}> {title} </Text>
                </View>
            </TouchableNativeFeedback>
        )
    }
}
SettingItem.propTypes = {
    index: PropTypes.number,
    title: PropTypes.string.isRequired,
    titleColor: ColorPropType,
    icon: Image.propTypes.source.isRequired,
    onClickListener: PropTypes.func,
}

SettingItem.defaultProps = {
    index: 0,
    title: "Test",
    titleColor: Colors.primaryTextDark,
    icon: Images.common.ic_settings_black,
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 48,
    },
    icon: {
        height: 24,
        width: 24,
        margin: 16,
    },
    title: {
        fontSize: 14,
        color: Colors.primaryTextDark,
        marginRight: 16,
        marginLeft: 16,
    }
});
