/**
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
} from 'react-native';
import {Colors, Images} from '../../../res';
import PropTypes from 'prop-types';
import BarIconContainer from './BarIconContainer';

export default class WebPager extends Component {

    webView = null;

    constructor() {
        super();
        this.state = {backEnabled: false};
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
        title: '新闻',
        gesturesEnabled: true,
        headerRight: WebPager.moreAction(navigation),
    });

    static moreAction = (navigation) => {
        let {uri} = navigation.state.params;
        return (
            <BarIconContainer onPressListener={()=>Linking.openURL(uri)}>
                <Image style={BarIconContainer.image()}
                       source={Images.common.ic_settings_black}
                ></Image>
            </BarIconContainer>)
    };


    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.backPressHandler);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backPressHandler);
    }


    render() {
        let {uri} = this.props.navigation.state.params;
        return (
            <View style={styles.container}>
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
        console.log('WebPager _onLoadStart',);
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
    }
});
