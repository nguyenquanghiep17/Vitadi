import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
var SQLite = require('react-native-sqlite-storage');
var db = SQLite.openDatabase({name: 'en_vi_1', createFromLocation: '~en_vi_full_json.db'});
export default class WordTopic extends Component {

    constructor(props) {
        super(props);
    }
    state = {
        data: [],
    };


    open() {


        db.transaction((tx) => {
            var query = 'SELECT * FROM word WHERE word.word = "' + this.props.item + '"' ;
            tx.executeSql(query, [], (tx, results) => {
                var len = results.rows.length;
                
                for (let i = 0; i < len; i++) {
                    let row = results.rows.item(i);
                //this.state.data.push(row);
                    var newStateArray = this.state.data.slice();
                    newStateArray.push(row);
                    this.setState({data: newStateArray});
                }
                this.props.navigation.navigate('Translate', {content: results.rows.item(0)});
                
        
            });
        });

    }


    render() {
       

        return (
            <View>
                   
                <TouchableOpacity  onPress={() => {this.open()}}>
                    <View style={{height: 50, backgroundColor: 'white', flexDirection: 'row', alignContent: 'center', alignItems: 'center'}}>

                            <Text style={styles.text}>{this.props.item}</Text>

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
        color: '#0080e8'
    }
})

