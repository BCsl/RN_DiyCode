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
        this._renderItem = this._renderItem.bind(this);
    }


    render() {
        let items = this.props.item;
        let {pressedListener} = this.props;
        return (
            <View style={styles.container}>
                {this._renderItem(items[0], pressedListener)}
                {this._renderItem(items[1], pressedListener)}
            </View>
        )
    }

    _renderItem(item, pressedListener) {
        if (item == null) {
            return null;
        }
        let {name, url, avatar_url} =item;
        return (
            <TouchableNativeFeedback
                onPress={()=>pressedListener && pressedListener(url)}
                background={TouchableNativeFeedback.SelectableBackground()}>
                <View style={styles.itemContainer}>
                    <Image style={styles.thumb}
                           source={{uri: avatar_url}}>
                        <Image
                            style={[styles.thumb, {zIndex: -1}]}
                            source={Images.common.ic_default_avatar}/>
                    </Image>
                    <Text style={styles.title} ellipsizeMode={'tail'} numberOfLines={1}>{name}</Text>
                </View>
            </TouchableNativeFeedback>
        );
    }
}

SiteItem.propTypes = {
    item: PropTypes.arrayOf(PropTypes.shape(
        {
            name: PropTypes.string,
            url: PropTypes.string,
            avatar_url: PropTypes.string,
        })),
    pressedListener: PropTypes.func,
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        paddingRight: 14,
        paddingLeft: 14,
        paddingBottom: 6,
        paddingTop: 6,
        backgroundColor: '#ffffff',
    },
    itemContainer: {
        flex: 0.5,
        padding: 2,
        flexDirection: 'row',
        alignItems: 'center',
    },
    thumb: {
        height: 25,
        width: 25,
    },
    title: {
        fontSize: 12,
        marginLeft: 9,
        color: Colors.primaryTextDark,
    }
});