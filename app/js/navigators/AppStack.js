/**
 * Created by chensuilun on 2017/8/14.
 */
import React, {Component} from 'react';
import HomeDrawer from './HomeDrawer';
import SettingPage from '../component/SettingPage';
import {StackNavigator} from 'react-navigation';
import Home from '../component/Home';

export default AppStack = StackNavigator({
    Home: {
        screen: Home,
    },
    Setting: {
        screen: SettingPage,
    }
});

