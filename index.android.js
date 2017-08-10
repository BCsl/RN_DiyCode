/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import './app/js/utils/Cacher'
import {Provider} from 'react-redux'
import Home from './app/js/component/Home'
import store from './app/js/store/index'

export default class DiyCodeApp extends Component {
    render() {
        return (
            <Provider store={store}>
                <Home/>
            </Provider>
        );
    }
}


AppRegistry.registerComponent('RN_DiyCode', () => DiyCodeApp);
