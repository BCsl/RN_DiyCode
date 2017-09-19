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
import {Colors, Images} from '../../res';
import BarIconContainer from './common/BarIconContainer';
import HomeTab from '../navigators/HomeTab';
import DrawerPage from './DrawerPage';

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
                    backgroundColor: Colors.colorPrimary,
                    alignItems: 'center'
                }}>
                    <BarIconContainer onPressListener={()=> {
                        this.refs['homeDrawer'].openDrawer();
                    }}>
                        <Image style={BarIconContainer.image()}
                               source={Images.common.ic_menu_black}
                        ></Image>
                    </BarIconContainer>
                    <Image style={{width: 100, height: 24, resizeMode: 'contain'}}
                           source={Images.common.ic_logo}
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
        rootNavigator: state.nav,
    }
}

const HomeContainer = connect(mapStateToProps)(Home);

export default HomeContainer;

