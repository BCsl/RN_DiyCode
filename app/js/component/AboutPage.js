/**
 * Created by chensuilun on 2017/9/20.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

export default class AboutPage extends Component {

    constructor() {
        super();
    }

    componentDidMount() {
        console.log('AboutPage=>componentDidMount');
    }

    componentWillUnmount() {
        console.log('AboutPage=>componentWillUnmount',);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text> AboutPage </Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});