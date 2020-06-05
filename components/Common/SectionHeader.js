import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Icon} from 'native-base';
export default class PackageItem extends Component {

    constructor(props) {
        super(props);
    }


    render() {
       
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{this.props.section.title}</Text>
        
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        height: 40,
        justifyContent: 'center'
    },
    text: {
        paddingLeft: 10,
        paddingBottom: 5,
        color: 'black',
        fontSize: 20,
        // fontFamily: 'Arial'

    }
})

