/**
 * Created by chensuilun on 2017/8/14.
 */
import React, {Component} from 'react';
import {StackNavigator} from 'react-navigation';
import SettingPage from '../component/SettingPage';
import Home from '../component/Home';
import DetailContainer from '../container/TopicDetailContainer';
import WebPager from '../component/common/WebPager';

export default AppStack = StackNavigator({
    Home: {
        screen: Home,
    },
    Setting: {
        screen: SettingPage,
    },
    TopicDetail: {
        screen: DetailContainer,
    },
    WebPager: {
        screen: WebPager,
    }
});

