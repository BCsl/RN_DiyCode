/**
 * Created by chensuilun on 2017/8/14.
 */
import React, {Component} from 'react';
import {TabNavigator, TabBarTop} from 'react-navigation';
import TopicsPagerContainer from '../container/TopicsContainer';
import NewsContainer from '../container/NewsContainer';
import SitesPage from '../component/SitesPage';
import Color from '../../res/Colors';

const HomeTab = TabNavigator({
    Topics: {
        screen: TopicsPagerContainer,
    },
    News: {
        screen: NewsContainer,
    },
    Sites: {
        screen: SitesPage,
    },
}, {
    tabBarComponent: TabBarTop,
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: true,
    lazy: true,
    backBehavior: 'initialRoute',
    initialRouteName: 'Topics',
    tabBarOptions: {
        activeTintColor: Color.colorAccent,
        inactiveTintColor: Color.colorInactive,
        showLabel: true,
        labelStyle: {
            fontSize: 14,
            fontWeight: 'bold'
        },
        tabStyle: {
            height: 50,
        },
        style: {
            backgroundColor: Color.colorPrimary,
        },
        indicatorStyle: {
            height: 1.5,
            backgroundColor: Color.colorAccent,
        }
    }
});

export default HomeTab;

