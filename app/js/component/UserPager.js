/**
 * Created by chensuilun on 2017/9/20.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

export default class UserPager extends Component{

    constructor() {
        super();
    }

    componentDidMount() {
        console.log('UserPager=>componentDidMount');
    }

    componentWillUnmount() {
        console.log('UserPager=>componentWillUnmount',);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text> UserPager </Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});