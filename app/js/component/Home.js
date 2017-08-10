/**
 * Created by chensuilun on 2017/8/10.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native'

import {connect} from 'react-redux'

class Home extends Component {

    constructor() {
        super();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text> Home </Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

const mapStateToProps = (state, ownProps) => {
    return {
        ...state,
    }
}

const HomeContainer = connect(mapStateToProps)(Home);

export default HomeContainer;

