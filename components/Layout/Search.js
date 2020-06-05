import React, { Component } from 'react';
import {Keyboard, View, TouchableWithoutFeedback, TextInput } from 'react-native';
import {Icon} from 'native-base';

export default class Search extends Component {


    render() {
        return (
            
            <TouchableWithoutFeedback onPress={() => {this.props.navigation.navigate('Search')}}>
                <View style={{height: 70, backgroundColor: '#1E90FF', flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'center', paddingLeft: 12, paddingRight: 10}}>
                    <Icon style={{ height: "80%", backgroundColor: 'white', borderTopLeftRadius: 15, borderBottomLeftRadius: 15, paddingTop: 14, paddingLeft: 5}} name="ios-search"  />
                    <TextInput
                        style={{ flex: 9, height: "80%", borderColor: 'gray',  backgroundColor: 'white', justifyContent: 'center', borderTopRightRadius: 15, borderBottomRightRadius: 15 }}
                        placeholder="Type a word to look up"
                        editable={false}
                        inlineImageLeft='heart-active'
                    />
                </View>
            </TouchableWithoutFeedback>
            
        );
    }
}