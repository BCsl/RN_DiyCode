/**
 * Created by chensuilun on 2017/8/18.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    BackHandler,
    ScrollView,
    ActivityIndicator,
    WebView,
    FlatList,
} from 'react-native';
import {Colors} from '../../../res';
import ExtWebView from '../common/ExtWebView';
import ReplyItem from '../topic/ReplyItem';

import marked from 'marked';

const VIEW_URL = 'file:///android_asset/html/markdown.html';


export default class TopicDetail extends Component {

    constructor() {
        super();
        this._onLoadEnd = this._onLoadEnd.bind(this);
        this._renderHeader = this._renderHeader.bind(this);
        this._renderRelies = this._renderRelies.bind(this);
        this._separator = this._separator.bind(this);
        this._renderReplyItem = this._renderReplyItem.bind(this);
        this._renderReplyEmpty = this._renderReplyEmpty.bind(this);
        this._renderReplyFooter = this._renderReplyFooter.bind(this);
        this._renderReplyHeader = this._renderReplyHeader.bind(this);
        this._renderTopic = this._renderTopic.bind(this);
        this.backPressHandler = ()=> {
            this.props.navigation.goBack();
            return true;
        };
        marked.setOptions({
            renderer: new marked.Renderer(),
            gfm: true,
            tables: true,
            breaks: true,
            pedantic: false,
            sanitize: true,
            smartLists: true,
            smartypants: true
        });
    }

    static navigationOptions = ({navigation}) => ({
        title: '话题',
    });

    componentDidMount() {
        console.log('TopicDetail=>componentDidMount', this.props);
        let {id} = this.props.navigation.state.params;
        BackHandler.addEventListener('hardwareBackPress', this.backPressHandler);
        this.props.getDetail(id);
        this.props.getRelies(id, 0);
    }

    componentWillUnmount() {
        console.log('TopicDetail=>componentWillUnmount',);
        BackHandler.removeEventListener('hardwareBackPress', this.backPressHandler);
    }

    render() {
        let {isTopicLoading, loadTopicError} = this.props;
        if (isTopicLoading) {
            return this._renderLoading();
        } else if (loadTopicError) {
            return this._renderError();
        } else {
            return this._renderContent();
        }
    }

    _renderLoading() {
        return (
            <View style={styles.indicatorContainer}>
                <ActivityIndicator
                    color={Colors.colorAccent}
                    animating={true}
                    style={styles.indicator}
                    size="large"
                />
            </View>
        );
    }

    _onLoadEnd() {
        let {result} = this.props;
        // let markdownText = result.body.replace(/\r\n/g, "\n");// \r\n 转成 \n
        // let setBody = `setMarkdown(String('${markdownText}'));`;
        let htmlText = marked(result.body).replace(/\r\n/g, "\\n").replace(/\n/g, "\\n"); //换成显式的\n,方便 debug
        let setBody = `setBody(String('${htmlText}'));`;
        this.refs.webView.injectJavaScript(setBody);
    }

    _renderHeader() {
        let {result} = this.props;
        return (
            <View style={styles.header}>
                <Image style={styles.thumb}
                       source={{uri: result.user.avatar_url}}>
                </Image>
                <Text style={styles.author}>
                    {result.user.name}
                </Text>
                <Text style={styles.category}>
                    {`·\t${result.node_name}`}
                </Text>
                <View style={styles.headerTime}>
                    <Text style={styles.time}>
                        {result.updated_at.substring(0, 10)}
                    </Text>
                </View>
            </View>
        );
    }

    /**
     * 渲染评论列表
     * @returns {XML}
     * @private
     */
    _renderRelies() {
        console.log('TopicDetail_renderRelies ', this.props);
        let {replyArray, isReliesLoading, isLoadReliesError}=this.props;
        return (
            <View style={styles.container}>
                <FlatList
                    keyExtractor={(item, index)=>index}
                    data={replyArray}
                    renderItem={this._renderReplyItem}
                    ListFooterComponent={this._renderReplyFooter}
                    ListEmptyComponent={this._renderReplyEmpty}
                    ListHeaderComponent={this._renderReplyHeader}
                    ItemSeparatorComponent={this._separator}
                >
                </FlatList>
            </View>
        );
    }

    _renderReplyFooter() {
        let {isReliesLoading, isLoadReliesError, hasMore}=this.props;
        if (isReliesLoading) {
            //todo 2017/9/1
            return null;
        } else if (isLoadReliesError) {
            //todo 2017/9/1
            return null;
        } else if (hasMore) {
            return <View style={styles.footer}
                         onPress={()=>console.log('TopicDetailPager load more')}>
                <Text style={styles.author}>点击显示更多</Text>
            </View>
        } else {
            <View style={styles.footer}
                  onPress={()=>console.log('TopicDetailPager not any more')}>
                <Text style={styles.author}>没有更多评论了</Text>
            </View>
        }
        return null;
    }

    _renderReplyHeader() {
        return this._renderTopic();
    }


    _renderReplyEmpty() {
        return (
            <View style={styles.footer}>
                <Text style={styles.author}>暂无评论</Text>
            </View>
        );
    }

    _renderReplyItem({item, index}) {
        return (<ReplyItem
                rely={item}
                pressIconListener={(id)=> {
                    console.log('TopicDetailPager click user ', id);
                }}
                floorIndex={index}/>
        );
    }

    _separator() {
        return (<View style={styles.separator }/>);
    }

    _renderTopic() {
        return (
            <View style={styles.container}>
                {this._renderHeader()}
                <ExtWebView
                    ref="webView"
                    style={styles.webView}
                    javaScriptEnabled={true}
                    onMessage={this._onMessage}
                    automaticallyAdjustContentInsets={true}
                    domStorageEnabled={true}
                    scalesPageToFit={true}
                    onLoadEnd={this._onLoadEnd}
                    source={
                    {
                        uri: VIEW_URL,
                    }
                    }
                />
            </View>
        );
    }

    _renderContent() {
        // return (
        //     <ScrollView style={styles.container}>
        //         <View style={styles.container}>
        //             {this._renderHeader()}
        //             <ExtWebView
        //                 ref="webView"
        //                 style={styles.webView}
        //                 javaScriptEnabled={true}
        //                 onMessage={this._onMessage}
        //                 automaticallyAdjustContentInsets={true}
        //                 domStorageEnabled={true}
        //                 scalesPageToFit={true}
        //                 onLoadEnd={this._onLoadEnd}
        //                 source={
        //                 {
        //                     uri: VIEW_URL,
        //                 }
        //                 }
        //             />
        //             {this._renderRelies()}
        //         </View>
        //     </ScrollView>
        // );
        return this._renderRelies();
    }

    _renderError() {
        return (<Text> Error </Text>);
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    indicatorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    indicator: {
        height: 80,
    },
    webView: {
        flex: 1,
        padding: 16,
    },
    header: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingTop: 16,
        paddingLeft: 8,
        paddingRight: 8,
        backgroundColor: '#ffffff',
    },
    author: {
        marginLeft: 6,
        marginRight: 6,
        fontSize: 12,
        color: '#b6b7ba',
        fontWeight: `bold`,
    },
    headerTime: {
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-end',
    },
    category: {
        fontSize: 12,
        color: '#b6b7ba',
    },
    thumb: {
        width: 25,
        height: 25,
    },
    separator: {
        height: 5,
        backgroundColor: '#00000000'
    },
    footer: {
        flex: 1,
        height: 60,
        backgroundColor: '#00000000',
        justifyContent: 'center',
        alignItems: 'center',
    },
});