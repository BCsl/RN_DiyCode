/**
 * Created by chensuilun on 2017/9/7.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableNativeFeedback,
    Image,
} from 'react-native';
import PropTypes from 'prop-types';
import {Colors, Images} from '../../../res';
import Icon from 'react-native-vector-icons/Octicons';

export default class NewsItem extends Component {

    constructor() {
        super();
    }

    componentDidMount() {
        console.log('NewsItem=>componentDidMount');
    }

    componentWillUnmount() {
        console.log('NewsItem=>componentWillUnmount',);
    }

    getHost(url) {
        var reg = /^http(s)?:\/\/(.*?)\//;
        return reg && reg.exec(url)[2];
    }

    render() {
        let {pressedListener, index, item} =this.props;
        let address = this.getHost(item.address);
        return (
            <TouchableNativeFeedback
                onPress={()=>pressedListener(index, item)}
                background={TouchableNativeFeedback.SelectableBackground()}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Image style={styles.thumb}
                               source={{uri: item.user.avatar_url}}>
                            <Image
                                style={[styles.thumb, {zIndex: -1}]}
                                source={Images.common.ic_default_avatar}/>
                        </Image>
                        <Text style={styles.author}>
                            {item.user.name ? item.user.name : item.user.login}
                        </Text>
                        <Text style={styles.category}>
                            {`·\t${item.node_name}`}
                        </Text>
                        <View style={styles.headerTime}>
                            <Text style={styles.time}>
                                {item.updated_at.substring(0, 10)}
                            </Text>
                        </View>
                    </View>
                    <Text style={styles.title}>
                        {item.title}
                    </Text>
                    <View style={styles.address}>
                        <Icon name="link" size={16}/>
                        <Text style={styles.addressText}
                              ellipsizeMode={"tail"}
                              numberOfLines={1}>
                            {address}
                        </Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
        )
    }
}

NewsItem.propTypes = {
    pressedListener: PropTypes.func,
    index: PropTypes.number,
    item: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        created_at: PropTypes.string,
        updated_at: PropTypes.string,
        node_id: PropTypes.number,
        node_name: PropTypes.string,
        user: PropTypes.shape({
            id: PropTypes.number,
            login: PropTypes.string,
            name: PropTypes.string,
            avatar_url: PropTypes.string,
        }),
        address: PropTypes.string,
    }),
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 16,
        justifyContent: 'center',
        paddingRight: 16,
        flexDirection: 'column',
        flex: 1,
        backgroundColor: '#ffffff',
    },

    header: {
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 12,
    },

    headerTime: {
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-end',
    },
    thumb: {
        width: 25,
        height: 25,
        borderRadius: 13,
    },
    title: {
        fontSize: 14,
        color: Colors.primaryTextDark,
        textAlign: 'left',
    },
    address: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: Colors.divider,
        marginTop: 16,
        paddingLeft: 9,
        paddingRight: 9,
        paddingTop: 6,
        paddingBottom: 6,
    },
    addressText: {
        fontSize: 12,
        color: Colors.secondaryTextDark,
        textAlign: 'left',
        marginLeft: 8,
    },
    author: {
        marginLeft: 6,
        marginRight: 6,
        fontSize: 12,
        color: Colors.secondaryTextDark,
        fontWeight: `bold`,
    },
    time: {
        fontSize: 12,
        color: Colors.textGray,
    },
    category: {
        fontSize: 12,
        color: Colors.textGray,
    },
});