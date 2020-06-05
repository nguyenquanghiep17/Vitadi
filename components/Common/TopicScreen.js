import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ScrollView, SafeAreaView } from 'react-native';
import {Icon} from 'native-base';
import WordTopic from './WordTopic';

export default class TopicScreen extends Component {

    constructor(props) {
        super(props);
        this.content = this.props.route.params.content;
        
        this.contentDB = this.content.replace(/ /g,"_");
        var SQLite = require('react-native-sqlite-storage');
        db = SQLite.openDatabase({name: this.contentDB + '_instance', createFromLocation: '~'+ this.contentDB + '.db'});
        
    }
    state = {
        data: [],
    };

    componentDidMount() {
        this.open();

    }

    open() {
        db.transaction((tx) => {
            var query = 'SELECT * FROM word LIMIT 30';
            
            tx.executeSql(query, [], (tx, results) => {
                var len = results.rows.length;
                var newStateArray = [];
                for (let i = 0; i < len; i++) {
                    let row = results.rows.item(i);
                    newStateArray.push(row.word);
                }
                this.setState({data: newStateArray});
 
                
            });
            
        });
        
    }

    render() {

  
        return (

            <SafeAreaView>

                    <View>
                        <View style={{height: 70, backgroundColor: '#1E90FF', flexDirection: 'row', alignContent: 'center', alignItems: 'center'}}>
                            <TouchableOpacity  onPress={()=> {this.props.navigation.goBack()}}>
                                <Icon style={{margin: 20}} name="md-arrow-round-back" size={35} color="#900" />
                            </TouchableOpacity>
                            <Text style={{color: 'white', fontSize: 20}}>{this.content}</Text>
                        </View>

                        <View style={{paddingTop: 1}}></View>

                        <View>
                            <FlatList
                                data={this.state.data}
                                renderItem={({ item }) => <WordTopic navigation={this.props.navigation} item={item}/>}
                                keyExtractor={item => item}
                            />
                        </View>
                    </View>

            </SafeAreaView>
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

