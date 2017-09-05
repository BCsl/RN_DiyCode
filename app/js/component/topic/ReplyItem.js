/**
 * Created by chensuilun on 2017/9/1.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native';
import PropTypes from 'prop-types';
import {Colors} from '../../../res';
import HTMLView from 'react-native-htmlview';

export default class ReplyItem extends Component {

    constructor() {
        super();
    }

    componentDidMount() {
        console.log('ReplyItem=>componentDidMount');
    }

    componentWillUnmount() {
        console.log('ReplyItem=>componentWillUnmount',);
    }

    render() {
        let {reply, floorIndex, pressIconListener} = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image style={styles.thumb}
                           onPress={()=>pressIconListener(reply.user.id)}
                           source={{uri: reply.user.avatar_url}}>
                    </Image>
                    <Text style={styles.author}>{reply.user.name}</Text>
                    <Text style={styles.time}>{`·\t\t${floorIndex + 1}楼`}</Text>
                    <View style={styles.headerTime}>
                        <Text style={styles.time}>
                            {reply.updated_at.substring(0, 10)}
                        </Text>
                    </View>
                </View>
                <HTMLView
                    value={reply.body_html}
                    style={styles.content}
                />
            </View>
        )
    }
}

ReplyItem.propTypes = {
    pressIconListener: PropTypes.func,
    floorIndex: PropTypes.number,
    reply: PropTypes.shape({
        id: PropTypes.number,
        body_html: PropTypes.string,
        topic_id: PropTypes.number,
        likes_count: PropTypes.number,
        created_at: PropTypes.string,
        updated_at: PropTypes.string,
        user: PropTypes.shape({
            id: PropTypes.number,
            login: PropTypes.string,
            name: PropTypes.string,
            avatar_url: PropTypes.string,
        }),
    }),
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 8,
    },
    header: {
        flexDirection: 'row',
        flex: 1,
        marginBottom: 9,
        alignItems: 'center',
    },
    author: {
        fontSize: 12,
        color: Colors.secondaryTextDark,
        fontWeight: `bold`,
        marginLeft: 8,
        marginRight: 8,
    },
    time: {
        fontSize: 12,
        color: Colors.textGray,
    },
    thumb: {
        width: 25,
        height: 25,
    },
    content: {
        fontSize: 14,
        color: Colors.primaryTextDark,
        marginLeft: 33,
    },
    headerTime: {
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-end',
    },

});
