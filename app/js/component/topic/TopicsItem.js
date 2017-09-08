/**
 * Created by chensuilun on 2017/7/19.
 */
// const item = {
//     id: 2595,
//     title: "自定义 Drawable 实现灵动的红鲤鱼动画（上篇）",
//     created_at: "2017-07-17T22:19:02.495+08:00",
//     updated_at: "2017-07-17T22:19:02.495+08:00",
//     user: {
//         id: 4299,
//         login: "codexiaosheng",
//         name: "code小生",
//         avatar_url: "https://diycode.b0.upaiyun.com/user/large_avatar/4299_1490704624.jpg"
//     },
//     node_name: "Android",
//     node_id: 1,
//     last_reply_user_id: null,
//     last_reply_user_login: null,
//     replied_at: null,
//     address: "http://mp.weixin.qq.com/s/j5eW_jqvfA-WLJDFFRun7w",
//     replies_count: 0
// }
import React, {Component} from 'react';
import{
    View,
    StyleSheet,
    Text,
    Image,
    TouchableNativeFeedback,
}from 'react-native'
import PropTypes from 'prop-types';
import {Colors, Images} from '../../../res';

export default class TopicItem extends Component {

    constructor() {
        super();
        this._renderRely = this._renderRely.bind(this);
    }

    componentDidMount() {
    }

    _renderRely() {
        let {replies_count} =this.props.item;
        if (replies_count) {
            return (
                <View style={styles.replyContainer}>
                    <Text style={styles.reply}>
                        {`${replies_count} 条评论`}
                    </Text>
                </View>
            );
        } else {
            return null;
        }
    }

    render() {
        let {pressedListener, index, item} =this.props;
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
                    {this._renderRely()}
                </View>
            </TouchableNativeFeedback>
        )
    }
}


TopicItem.propTypes = {
    pressedListener: PropTypes.func,
    index: PropTypes.number,
    item: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        created_at: PropTypes.string,
        updated_at: PropTypes.string,
        replies_count: PropTypes.number,
        node_id: PropTypes.number,
        node_name: PropTypes.string,
        user: PropTypes.shape({
            id: PropTypes.number,
            login: PropTypes.string,
            name: PropTypes.string,
            avatar_url: PropTypes.string,
        }),
    }),
}


const
    styles = StyleSheet.create({
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
        },
        title: {
            fontSize: 16,
            color: Colors.primaryTextDark,
            textAlign: 'left',
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
        replyContainer: {
            marginTop: 6,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            flex: 1,
        },
        reply: {
            fontSize: 12,
            color: Colors.secondaryTextDark,
        }
    });
