/**
 * Created by chensuilun on 2017/8/10.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native'

export default class DrawerPage extends Component{

    constructor() {
        super();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text> DrawerPage </Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
