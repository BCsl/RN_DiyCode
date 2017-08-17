/**
 * Created by chensuilun on 2017/8/10.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    DrawerLayoutAndroid,
} from 'react-native';

import {connect} from 'react-redux';
import Color from '../../res/Colors';
import BarIconContainer from './common/BarIconContainer';
import HomeTab from '../navigators/HomeTab';
import DrawerPage from './DrawerPage';
import {addNavigationHelpers, NavigationActions} from 'react-navigation';
import {homeRefreshAction, homeLoadMoreAction}from '../action/HomeAction'

class Home extends Component {

    constructor() {
        super();
    }

    static navigationOptions = ({navigation}) => ({
        header: null,
    });

    componentDidMount() {
        console.log('Home', this.props);
    }

    renderToolbar() {
        let {navigate} = this.props.navigation;
        return (
            <View>
                <View style={{
                    flexDirection: "row",
                    height: 56,
                    backgroundColor: Color.colorPrimary,
                    alignItems: 'center'
                }}>
                    <BarIconContainer onPressListener={()=> {
                        this.refs['homeDrawer'].openDrawer();
                    }}>
                        <Image style={BarIconContainer.image()}
                               source={require('../../res/image/ic_menu_black_24dp.png')}
                        ></Image>
                    </BarIconContainer>
                    <Image style={{width: 100, height: 24, resizeMode: 'contain'}}
                           source={require('../../res/image/ic_logo.png')}
                    ></Image>
                </View>
            </View>
        )
    }

    render() {
        let toolbar = this.renderToolbar();
        console.log('Home=>render', this.props);
        return (
            <DrawerLayoutAndroid
                ref="homeDrawer"
                drawerWidth={250}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={()=>(<DrawerPage/>)}>
                <View style={styles.container}>
                    {toolbar}
                    <HomeTab/>
                </View>
            </DrawerLayoutAndroid>
        )
    }

    // {/*navigation={*/}
    // {/*addNavigationHelpers({*/}
    // {/*dispatch: this.props.dispatch,*/}
    // {/*state: this.props.navigation.state,*/}
    // {/*})*/}
    // {/*}*/}


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
});


//------------------redux--------------------------
const mapStateToProps = (state, ownProps) => {
    return {
        topics: state.home.topics,
        news: state.home.news,
        sites: state.home.sites,
        rootNavigator: state.nav,
    }
}

const HomeContainer = connect(mapStateToProps)(Home);

export default HomeContainer;

