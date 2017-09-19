/**
 * 内部 webview 组件
 * Created by chensuilun on 2017/9/14.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    WebView,
    BackHandler,
    Image,
    Linking,
    ActivityIndicator,
    ToolbarAndroid,
    Dimensions,
} from 'react-native';
import {Colors, Images} from '../../../res';
import PropTypes from 'prop-types';

export default class WebPager extends Component {

    webView = null;

    constructor() {
        super();
        this.state = {backEnabled: false};
        this._renderToolbar = this._renderToolbar.bind(this);
        this.backPressHandler = ()=> {
            if (this.state.backEnabled) {
                this.webView.goBack();
                return true;
            }
            this.props.navigation.goBack();
            return true;
        };
    }

    static navigationOptions = ({navigation}) => ({
        gesturesEnabled: true,
        header: null,
    });

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.backPressHandler);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backPressHandler);
    }


    render() {
        let {uri} = this.props.navigation.state.params;
        const {width} = Dimensions.get('window')
        return (
            <View style={styles.container}>
                {this._renderToolbar()}
                <View style={{width: width, height: 1, backgroundColor: Colors.divider, opacity: 0.2}}/>
                <WebView
                    ref={webview => {
                        this.webView = webview;
                    }}
                    style={styles.webView}
                    contentInset={{top: 16, left: 16, bottom: 16, right: 16}}
                    automaticallyAdjustContentInsets={true}
                    renderError={this._onLoadError}
                    renderLoading={this._onLoadStart.bind(this)}
                    scalesPageToFit={true}
                    startInLoadingState={true}
                    onNavigationStateChange={this._onNavigationStateChange.bind(this)}
                    source={{
                        uri: uri,
                    }
                    }
                />
            </View>
        )
    }

    _renderToolbar() {
        let {uri} = this.props.navigation.state.params;
        return (<ToolbarAndroid
            title={"新闻"}
            style={styles.toolbar}
            navIcon={Images.common.ic_close}
            onActionSelected={ (position)=> {
                switch (position) {
                    case 0:
                        Linking.openURL(uri);
                        break;
                    default:
                        break;
                }
            }}
            onIconClicked={()=> {
                this.props.navigation.goBack();
            }}
            actions={[{title: 'Open in browser', icon: Images.common.ic_open_in_browser, show: 'never'}]}
        />);
    }


    _onNavigationStateChange(navState) {
        console.log('WebPager  _onNavigationStateChange', navState);
        this.setState({
            backEnabled: navState.canGoBack,
            forwardEnabled: navState.canGoForward,
            url: navState.url,
            status: navState.title,
            loading: navState.loading,
        });
    };


    _onLoadError() {
        return (
            <View style={[styles.container, {justifyContent: 'center', alignItems: 'center'}]}>
                <Text
                    color="red"
                    size="small"
                >Something error</Text>
            </View>
        );
    }

    _onLoadStart() {
        return (
            <View style={[styles.container, {justifyContent: 'center', alignItems: 'center'}]}>
                <ActivityIndicator
                    color={Colors.colorAccent}
                    animating={true}
                    size="large"
                />
            </View>
        );
    }

}

WebPager.propTypes = {
    uri: PropTypes.string,
    title: PropTypes.string,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    webView: {
        flex: 1,
        height: 200,
    },
    toolbar: {
        backgroundColor: Colors.colorPrimary,
        height: 56,
    },
});
