/**
 * Created by chensuilun on 2017/9/11.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableNativeFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import {Colors, Images} from '../../../res/';

export default class SiteItem extends Component {

    constructor() {
        super();
    }


    render() {
        let {name, url, avatar_url} = this.props.item;
        let {pressedListener} = this.props;
        return (
            <TouchableNativeFeedback
                onPress={()=>pressedListener && pressedListener(url)}
                background={TouchableNativeFeedback.SelectableBackground()}>
                <View style={styles.container}>
                    <Image style={styles.thumb}
                           source={{uri: avatar_url}}>
                        <Image
                            style={[styles.thumb, {zIndex: -1}]}
                            source={Images.common.ic_default_avatar}/>
                    </Image>
                    <Text style={styles.title} ellipsizeMode={'tail'} numberOfLines={1}>{name}</Text>
                </View>
            </TouchableNativeFeedback>
        )
    }
}

SiteItem.propTypes = {
    item: PropTypes.shape({
        name: PropTypes.string,
        url: PropTypes.string,
        avatar_url: PropTypes.string,
    }),
    pressedListener: PropTypes.func,
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        paddingRight: 16,
        paddingLeft: 16,
        paddingBottom: 8,
        paddingTop: 8,
        backgroundColor: '#ffffff',
        alignItems: 'center',
    },
    thumb: {
        height: 30,
        width: 30,
    },
    title: {
        fontSize: 14,
        marginLeft: 9,
        color: Colors.primaryTextDark,
    }
});