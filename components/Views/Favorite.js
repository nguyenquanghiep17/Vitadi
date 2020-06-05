import React, { Component } from 'react';
import { View, FlatList, StyleSheet, Text, Dimensions } from 'react-native';
import Search from '../Layout/Search';
import Word from '../Common/Word';

var SQLite = require('react-native-sqlite-storage');
var db = SQLite.openDatabase({name: 'favoriteInstance', createFromLocation: '~favorite.db'});
export default class Favorite extends Component  {

    constructor(props) {
        super(props);
    }
    state = {
        data: [],
        isFetching: false,
        
        
    };
    componentDidMount() {
        this.isPress();
        
    }

    
    onRefresh() {
        this.setState({ isFetching: true });
        this.isPress()
     }
     

    isPress = () => {

        db.transaction((tx) => {
            this.state.data = [];

            var query = 'SELECT * FROM word';
            tx.executeSql(query, [], (tx, results) => {
                var len = results.rows.length;
    
                for (let i = 0; i < len; i++) {
                    let row = results.rows.item(i);
                    this.state.data.push(row);
                    var newStateArray = this.state.data.slice();
                    this.setState({data: newStateArray});
                }
        
            });
            this.setState({ isFetching: false });
        });

    }

    empty() {
        return({
            position: 'absolute', 
            left: Dimensions.get('window').width / 3.5, 
            top: Dimensions.get('window').height / 3,
            opacity: this.state.data.length > 0 ? 0 : 1
        })
    }
    
    render() {
        
        return (
            <View style={styles.container}>
                <View>
                    <Search  navigation = {this.props.navigation} />
                </View>

                <View style={{paddingTop: 1}}></View>
                <View style={{flex: 1}}>
                    <View style={this.empty()}>
                        <Text>Your favorites list is empty</Text>
                    </View>
                    <View style={{paddingTop: 5}}></View>
                    <FlatList
                        data={this.state.data}
                        renderItem={({ item }) => <Word navigation = {this.props.navigation} item={item}/>}
                        keyExtractor={item => item.id + ''}
                        onRefresh={()=>this.onRefresh()}
                        refreshing={this.state.isFetching}
                       
                    />
                
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

