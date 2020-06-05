import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {Icon} from 'native-base';
export default class Word extends Component {

    constructor(props) {
        super(props);
    }
    


    render() {
       
 
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => {this.props.navigation.navigate('LessonContent', {content: this.props.item})}}>
                    <View style={{height: 80, backgroundColor: 'white', flexDirection: 'row', alignContent: 'center', alignItems: 'center', borderRadius: 10}}>

                        <View>
                            <Text style={styles.text}>{this.props.item.name}</Text>
                            <Text style={{paddingLeft: 20, fontSize: 10}}>Total word: {this.props.item.num_words}</Text>
                        </View>
                    </View>
                </TouchableOpacity>

            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        borderRadius: 60,
        padding: 5
    },
    text: {
        paddingLeft: 20,
        paddingBottom: 5,
        color: '#0080e8',
        fontWeight: 'bold',
        fontSize: 18,
    }
})

