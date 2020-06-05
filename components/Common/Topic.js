import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {Icon} from 'native-base';
export default class Topic extends Component {

    constructor(props) {
        super(props);
    }


    render() {

       

        return (
            <View>
                <TouchableOpacity onPress={() => {this.props.navigation.navigate('TopicScreen', {content: this.props.item})}}>
                    <View style={{height: 70, backgroundColor: 'white', flexDirection: 'row', alignContent: 'center', alignItems: 'center'}}>
                        <View>
                            <Text style={styles.text}>{this.props.item}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={styles.separate}></View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    separate: {
        padding: 1,
        color: "#000000",
        borderTopColor: '#CFCFCF',
        
    },
    text: {
        paddingLeft: 20,
        paddingBottom: 5,
        color: '#0080e8',
        fontWeight: 'bold',
        fontSize: 18,
    }
})

