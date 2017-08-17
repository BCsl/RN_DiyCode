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

export default class NewsItem extends Component {

    constructor() {
        super();
    }

    componentDidMount() {
    }

    render() {
        return (
            <TouchableNativeFeedback
                onPress={()=>this.props.pressedListener(this.props.index, this.props.item)}
                background={TouchableNativeFeedback.SelectableBackground()}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Image style={styles.thumb}
                               source={{uri: this.props.item.user.avatar_url}}>
                        </Image>
                        <Text style={styles.author}>
                            {this.props.item.user.name}
                        </Text>
                        <Text style={styles.category}>
                            {this.props.item.node_name}
                        </Text>
                        <View style={styles.headerTime}>
                            <Text style={styles.time}>
                                {this.props.item.updated_at.substring(0, 10)}
                            </Text>
                        </View>
                    </View>
                    <Text style={styles.title}>
                        {this.props.item.title}
                    </Text>
                </View>
            </TouchableNativeFeedback>
        )
    }

}


const
    styles = StyleSheet.create({
        container: {
            paddingTop: 21,
            paddingBottom: 21,
            paddingLeft: 16,
            justifyContent: 'center',
            paddingRight: 16,
            flexDirection: 'column',
            flex: 1,
            backgroundColor:'#ffffff',
        },

        header: {
            alignItems: 'center',
            flexDirection: 'row',
            marginBottom: 9,
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
            color: '#212121',
            textAlign: 'left',
        },
        author: {
            marginLeft: 6,
            marginRight: 6,
            fontSize: 14,
            color: '#b6b7ba',
        },
        time: {
            fontSize: 14,
            color: '#b6b7ba',
        },
        category: {
            fontSize: 14,
            color: '#b6b7ba',
        },
    });
