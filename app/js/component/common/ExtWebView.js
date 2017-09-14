/**
 * Custom WebView with autoHeight feature
 *
 * @prop source: Same as WebView
 * @prop autoHeight: true|false
 * @prop defaultHeight: 100
 * @prop width: device Width
 * @prop ...props
 *
 * Modify from https://github.com/scazzy/react-native-webview-autoheight
 */

import React, {Component} from 'react';
import {
    View,
    Dimensions,
    WebView,
    PixelRatio,
} from 'react-native';
import PropTypes from 'prop-types';

const PREFIX_HEIGHT = "view_height@";

const injectedScript = function () {
    function waitForBridge() {
        let height = document.documentElement.offsetHeight;
        postMessage(String('view_height@' + height));
    }

    waitForBridge();
};

export default class ExtWebView extends Component {
    extWebView = null;

    state = {
        webViewHeight: Number
    };

    constructor(props) {
        super(props);
        this._onMessage = this._onMessage.bind(this);
        this._calculateHeight = this._calculateHeight.bind(this);
        this._contentSizeChange = this._contentSizeChange.bind(this);
        this._onLoadEnd = this._onLoadEnd.bind(this);
        this.state = {
            webViewHeight: this.props.defaultHeight
        }
    }

    _onMessage(e) {
        console.log('ExtWebView_onMessage==>', e.nativeEvent.data);
        let result = e.nativeEvent.data;
        if (result.startsWith(PREFIX_HEIGHT)) {
            try {
                let height = parseInt(result.slice(PREFIX_HEIGHT.length));
                this.setState({
                    webViewHeight: height
                });
            } catch (err) {
                console.log('ExtWebView_onMessage:', err);
            }
        }
        if (this.props.onMessage != undefined) {
            this.props.onMessage(e);
        }
    }

    _onLoadEnd() {
        if (this.props.onLoadEnd != undefined) {
            this.props.onLoadEnd();
        }
    }

    _calculateHeight() {
        console.log('ExtWebView start inject JS',);
        let calculateHeight = '(' + String(injectedScript) + ')();';
        this.extWebView.injectJavaScript(calculateHeight);
    }

    _contentSizeChange() {
        console.log('ExtWebView _contentSizeChange',);
        this.extWebView && this._calculateHeight();
    }


    injectJavaScript = (data) => {
        console.log('ExtWebView injectJavaScript call with:', data);
        this.extWebView.injectJavaScript(data);
    };

    render() {
        let _h = this.props.autoHeight ? this.state.webViewHeight : this.props.defaultHeight;
        return (
            <WebView
                ref={webview => {
                    this.extWebView = webview;
                }}
                contentInset={{top: 16, left: 16, bottom: 16, right: 16}}
                scrollEnabled={this.props.scrollEnabled || false}
                {...this.props}
                javaScriptEnabled={true}
                style={[this.props.style, {height: _h}]}
                onMessage={this._onMessage}
                automaticallyAdjustContentInsets={true}
                onContentSizeChange={this._contentSizeChange}
                onLoadEnd={this._onLoadEnd}
            />
        )
    }
}
ExtWebView.propTypes = {
    ...WebView.propTypes,
    autoHeight: PropTypes.bool,
}

ExtWebView.defaultProps = {
    autoHeight: true,
}
