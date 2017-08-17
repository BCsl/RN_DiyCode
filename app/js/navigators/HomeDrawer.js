/**
 * Created by chensuilun on 2017/8/14.
 */
import React, {Component} from 'react';
import {DrawerNavigator} from 'react-navigation';
import DrawerPage from '../component/DrawerPage';
import Home from '../component/Home';

const HomeDrawer = DrawerNavigator({
    Setting: {
        screen: Home,
    }
}, {
    drawerWidth: 250,
    drawerPosition: 'left',
    contentComponent: props =>(<DrawerPage/>),
});

HomeDrawer.navigationOptions = ({ navigation }) => ({
    header: null,
});

export default HomeDrawer;
