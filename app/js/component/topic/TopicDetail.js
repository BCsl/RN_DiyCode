/**
 * Created by chensuilun on 2017/8/18.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    BackHandler,
    ScrollView,
    ActivityIndicator,
    WebView,
} from 'react-native';
import Colors from '../../../res/Colors';
import ExtWebView from '../common/ExtWebView';

import marked from 'marked';

const VIEW_URL = 'file:///android_asset/html/markdown.html';


export default class TopicDetail extends Component {

    constructor() {
        super();
        this._onLoadEnd = this._onLoadEnd.bind(this);
        this.backPressHandler = ()=> {
            this.props.navigation.goBack();
            return true;
        };
        this.html1 = `<style>img{max-width: 100%;}</style><p><img src="https://diycode.b0.upaiyun.com/photo/2017/441c258bb27695595d1594cc46730dc3.jpg"/></p><p>Tags are great for describing the essence of your story in a single word or phrase, but stories are rarely about a single thing. <span>If I pen a story about moving across the country to start a new job in a car with my husband, two cats, a dog, and a tarantula, I wouldn’t only tag the piece with “moving”. I’d also use the tags “pets”, “marriage”, “career change”, and “travel tips”.</span></p>`;
        marked.setOptions({
            renderer: new marked.Renderer(),
            gfm: true,
            tables: true,
            breaks: true,
            pedantic: false,
            sanitize: false,
            smartLists: true,
            smartypants: false
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
    }

    componentWillUnmount() {
        console.log('TopicDetail=>componentWillUnmount',);
        BackHandler.removeEventListener('hardwareBackPress', this.backPressHandler);
    }

    render() {
        let {isLoading, result, isError} = this.props;
        if (isLoading) {
            return this._renderLoading();
        } else if (isError) {
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


    _renderContent() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.container}>
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
            </ScrollView>
        );
    }

    _renderError() {
        return (<Text> Error</Text>);
    }

}

const markdownStyles = {
    heading1: {
        fontSize: 24,
        color: 'purple',
    },
    text: {
        color: '#555555',
    },
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
    },
});