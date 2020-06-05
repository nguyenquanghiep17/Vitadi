import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {Icon} from 'native-base';

var SQLite = require('react-native-sqlite-storage');
var db = SQLite.openDatabase({name: 'historyInstance', createFromLocation: '~history.db'});
export default class Word extends Component {

    constructor(props) {
        super(props);
    }
    
    isPress = () => {

        const content = this.props.item;

        db.transaction((tx) => {

            var query = 'SELECT * FROM word WHERE word.word = "' + this.props.item.word +'"';
  
            tx.executeSql(query, [], (tx, results) => {

                var len = results.rows.length;
        
                if(len == 0) {
                    tx.executeSql(
                        'INSERT INTO word (id, word, mean, pronunciation, word_type, content) VALUES (?,?,?,?,?,?)',
                        [content.id, content.word, content.mean, content.pronunciation, content.word_type, content.content],
                        (tx, results) => {

                            // if (results.rowsAffected > 0) {
                            //     this.setState({heart: require('../../assets/Image/heart_on.png')})
                            //     this.show(1);
                            // }
                        }
                    );
                }
        
            });
        });
    }

    render() {
       
        var mean = JSON.parse(this.props.item.mean);
        return (
            <View style={{}}>
                <TouchableOpacity  onPress={() => {this.props.navigation.navigate('Translate', {content: this.props.item}), this.isPress()}}>
                    <View style={{...this.props.style, height: 70, backgroundColor: 'white', flexDirection: 'row', alignContent: 'center', alignItems: 'center'}}>
                        <View>
                            <Icon style={{marginLeft: 10}} name="ios-search"  />
                        </View>
                        <View>
                            <Text style={styles.text}>{this.props.item.word}</Text>
                            <Text style={{paddingLeft: 20, fontSize: 10}}>{mean.type1.type}</Text>
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
        color: '#0080e8'
    }
})

