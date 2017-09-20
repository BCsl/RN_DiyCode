/**
 * Created by chensuilun on 2017/8/10.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    StatusBar,
    Image,
    Text,
} from 'react-native';
import  BaseList from "./common/BaseList";
import  SettingItem from "./common/SettingItem";
import {Images, Colors} from '../../res';
import {NavigationActions} from 'react-navigation';

export default class DrawerPage extends Component {

    settingItem = [
        {
            title: '设置',
            icon: Images.common.ic_settings_black,
            action: NavigationActions.navigate(
                {
                    routeName: 'Setting',
                })
        },
        {
            title: '关于',
            icon: Images.common.ic_info_outline,
            action: NavigationActions.navigate(
                {
                    routeName: 'About',
                })
        },
    ];

    constructor() {
        super();
        this._renderItem = this._renderItem.bind(this);
    }


    render() {
        console.log('DrawerPage', this.props);
        return (
            <View style={styles.container}>
                <BaseList
                    style={styles.container}
                    header={this._renderHeader}
                    result={this.settingItem}
                    renderItem={this._renderItem}/>
            </View>
        )
    }

    _renderHeader() {
        return (<View style={styles.banner}>
            <Image style={styles.bannerImage}
                   resizeMode={'cover'}
                   source={Images.common.banner}>
                <View
                    style={[styles.banner, {flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}]}>
                    <Image style={{
                        width: 100,
                        height: 24,
                        margin: 24,
                        resizeMode: 'contain'
                    }}
                           source={Images.common.ic_logo}/>
                </View>
            </Image>
        </View>);
    }

    _renderItem({item, index}) {
        let {title, icon, action} =item;
        let {dispatchAction} = this.props;
        return (<SettingItem
            index={index}
            title={title}
            icon={icon}
            onClickListener={(index)=> {
                dispatchAction(action);
            }}
        />);
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    banner: {
        height: 128,
    },
    bannerImage: {
        flex: 1,
        height: 128,
    }
});
