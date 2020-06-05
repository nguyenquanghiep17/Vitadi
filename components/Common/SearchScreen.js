import React, { Component } from 'react';
import { FlatList, View, Text, TouchableOpacity , StyleSheet, TextInput, ScrollView  } from 'react-native';
import {Icon} from 'native-base';
import Word from './Word';
var SQLite = require('react-native-sqlite-storage');
var db = SQLite.openDatabase({name: 'en_vi', createFromLocation: '~en_vi_full_json.db'});
export default class SearchScreen extends Component {

    constructor(props) {
        super(props);
    }
    state = {
        search: '',
        data: [],
    };

    updateSearch = search => {
        this.setState({ search });
        this.setState({ data: [] });
        this.isPress();

    };

    isExist = function(arr, key) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].word === key) return true;
        }
        return false;
    }


    isPress = () => {

        db.transaction((tx) => {
            if (this.state.search === '') return;
            var query = 'SELECT * FROM word WHERE word.word LIKE "'+ this.state.search.trim() +'%" LIMIT 10';
            tx.executeSql(query, [], (tx, results) => {
                
                var len = results.rows.length;
                for (let i = 0; i < len; i++) {
                    let row = results.rows.item(i);
                //this.state.data.push(row);
                    var newStateArray = this.state.data.slice();
                    if (!this.isExist(newStateArray, row.word)) 
                        newStateArray.push(row);
                    this.setState({data: newStateArray});
                }

                
        
            });
        });
        }

    render() {

        const { search } = this.state;
        
        return (
            <View>
                <View style={{height: 70, backgroundColor: '#1E90FF', flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity  onPress={()=> {this.props.navigation.goBack()}}>
                        <Icon style={{marginLeft: 20, marginRight: 20}} name="md-arrow-round-back" size={35} color="#900" />
                    </TouchableOpacity>
 
                    <Icon style={{ height: "80%", backgroundColor: 'white', borderTopLeftRadius: 15, borderBottomLeftRadius: 15, paddingTop: 14, paddingLeft: 5}} name="ios-search"  />
                    <TextInput
                        style={{ width: "75%", height: "80%", borderColor: 'gray', backgroundColor: 'white', justifyContent: 'center', borderTopRightRadius: 15, borderBottomRightRadius: 15, paddingRight: 30 }}
                        placeholder="Type a word to look up"
                        value={search}
                        onChangeText={this.updateSearch}
                        autoFocus={true}
                    />
                </View>

                <View style={{paddingTop: 1}}></View>

                <View>

                    <FlatList
                        data={this.state.data}
                        renderItem={({ item }) => <Word navigation = {this.props.navigation} item={item}/>}
                        keyExtractor={item => item.id + ''}
                        
                    />
                
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    separate: {
        paddingTop: 10
    }
})

