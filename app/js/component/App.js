/**
 * Created by chensuilun on 2017/8/14.
 */

import React, {Component} from 'react';

import AppStack from '../navigators/AppStack';
import {addNavigationHelpers} from 'react-navigation';
import {connect} from 'react-redux';

class App extends Component {

    constructor() {
        super();
    }

    componentDidMount() {
        console.log('App=>componentDidMount', this.props);
    }

    componentWillUnmount() {
        console.log('App=>componentWillUnmount',);
    }

    render() {
        console.log('App=>render', this.props);
        return (
            <AppStack
                navigation={
                    addNavigationHelpers({
                        dispatch: this.props.dispatch,
                        state: this.props.navState,
                    })
                }
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        dispatch: state.dispatch,
        navState: state.nav,
    }
};

export default AppContainer = connect(mapStateToProps)(App);
