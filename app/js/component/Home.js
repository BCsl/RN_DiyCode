/**
 * Created by chensuilun on 2017/8/10.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native';
import ScrollableTabView, {ScrollableTabBar,} from 'react-native-scrollable-tab-view';

import {StackNavigator, TabNavigator, DrawerNavigator, TabBarTop} from 'react-navigation';
import TopicsPage from './TopicsPage';
import NewsPage from './NewsPage';
import SitesPage from './SitesPage';
import DrawerPage from './DrawerPage';

import {connect} from 'react-redux';
import Color from '../../res/Colors';
import BarIconContainer from './common/BarIconContainer';

const toolbarStyles = StyleSheet.create({
    container: {
        flexDirection: "row",
        height: 56,
        backgroundColor: Color.colorPrimary,
        alignItems: 'center'
    },

});

class Home extends Component {

    // Nav options can be defined as a function of the screen's props:
    static navigationOptions = ({navigation}) => {
        console.log('Navigation=>', navigation);
        return ({
            header: Home.toolbar(navigation),
        });
    }

    constructor() {
        super();
    }

    static toolbar(navigation) {
        return (
            <View style={{
                flexDirection: "row",
                height: 56,
                backgroundColor: Color.colorPrimary,
                alignItems: 'center'
            }}>
                <BarIconContainer onPressListener={()=> {
                    navigation.navigate('DrawerOpen');
                }}>
                    <Image style={BarIconContainer.image()}
                           source={require('../../res/image/ic_menu_black_24dp_2x.png')}
                    ></Image>
                </BarIconContainer>
                <Image style={{width:100, height:24 , marginLeft: 16, resizeMode: 'contain'}}
                       source={require('../../res/image/ic_logo.png')}
                ></Image>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <MainTab/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});


//------------------redux--------------------------
const mapStateToProps = (state, ownProps) => {
    return {
        ...state,
    }
}

const HomeContainer = connect(mapStateToProps)(Home);

//---------------------Navigator-----------------------

TopicsPage.navigationOptions = ({navigation}) => ({
    tabBarLabel: 'TOPICS',
});

NewsPage.navigationOptions = ({navigation}) => ({
    tabBarLabel: 'NEWS',
});

SitesPage.navigationOptions = ({navigation}) => ({
    tabBarLabel: 'SITES',
});

const MainTab = TabNavigator({
    Topics: {
        screen: TopicsPage,
    },
    News: {
        screen: NewsPage,
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


const AppStack = StackNavigator({
    Home: {
        screen: HomeContainer,
    },
}, {
    initialRouteName: 'Home',
});

const SettingDrawer = DrawerNavigator({
    Setting: {
        screen: AppStack,
    }
}, {
    drawerWidth: 250,
    drawerPosition: 'left',
    contentComponent: props =>(<DrawerPage/>),
});

export default SettingDrawer;

