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
import Markdown from 'react-native-simple-markdown';
import MyWebView from 'react-native-webview-autoheight';

const customStyle = "<style>* {max-width: 100%;} body {font-family: sans-serif;} h1 {color: red;}</style>";

export default class TopicDetail extends Component {

    constructor() {
        super();
        this.backPressHandler = ()=> {
            this.props.navigation.goBack();
            return true;
        };
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


    _renderContent() {
        let {result} = this.props;
        return (
            <ScrollView style={styles.container}>
                <View style={styles.container}>
                    <MyWebView
                        style={styles.webView}
                        renderError={this._renderError}
                        mixedContentMode={"compatibility"}
                        scalesPageToFit={true}
                        scrollEnabled={false}
                        source={
                        {
                            html: customStyle + result.body_html
                        }
                        }
                    />
                </View>
            </ScrollView>
        );
    }

    _renderMarkdownContent() {
        let {result} = this.props;
        return (
            <ScrollView style={styles.container}>
                <View style={styles.container}>
                    <Markdown styles={markdownStyles}>{result.body}</Markdown>
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
        margin: 16,
        flex: 1,
    },
});