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
import App from './app/js/component/App'
import store from './app/js/store/index'

export default class DiyCodeApp extends Component {
    render() {
        return (
            //让所有容器组件都可以访问 store
            <Provider store={store}>
                <App/>
            </Provider>
        );
    }
}


AppRegistry.registerComponent('RN_DiyCode', () => DiyCodeApp);
