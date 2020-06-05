import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, FlatList} from 'react-native';

import {Icon} from 'native-base';
import Search from '../Layout/Search';

import HistoryWord from '../Common/HistoryWord'
import OneSignal from 'react-native-onesignal';
var SQLite = require('react-native-sqlite-storage');
var db = SQLite.openDatabase({name: 'historyInstance', createFromLocation: '~history.db'});


export default class Home extends Component {


    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isFetching: false,
            deletedRowKey: null
        };
        //OneSignal.setLogLevel(0, 6);
        OneSignal.init("6b0c1705-13e1-4520-aa4c-5e3691bb51c4");
        OneSignal.inFocusDisplaying(2);
    }
    
    
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
    refreshFlatList = (newData) => {
        this.onRefresh()

    }

    render() {
        
        
        return (
            <View style={{flex: 1}}>
                <Search  navigation = {this.props.navigation} />
                <View style={styles.main}>
                    <View style={styles.separate}></View>
                    <View style={styles.container}>
                        <TouchableOpacity onPress={() => {this.props.navigation.navigate('TranslateOnline')}}>
                            <View style={styles.translate}>
                                <Icon style={styles.icon} name="md-globe" size={35} color="#900" />
                                <Text>DỊCH ONLINE</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.separate}></View>
                    <View>
                        <Text>Tìm kiếm gần đây</Text>
                    </View>
                    <View style={styles.separate}></View>
                </View>
                
                
                <View style={{flex: 1}}>

                    <FlatList
                        data={this.state.data}
                        renderItem={({ item, index }) => <HistoryWord navigation = {this.props.navigation} item={item} index={index} parentFlatList = {this}/>}
                        keyExtractor={item => item.id + ''}
                        onRefresh={()=>this.onRefresh()}
                        refreshing={this.state.isFetching}
                        // numColumns={2}
                    />
                
                </View>
            </View>
        );
    }
    
    
}


const styles = StyleSheet.create({
    main: {
        alignItems: 'center'
    },
    container: {
        backgroundColor: '#1E90FF',
        width: 150,
        borderRadius: 5
    },
    separate: {
        paddingTop: 10
    },
    translate: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        
        
    },
    icon: {
        paddingRight: 10
    },
})

function myiOSPromptCallback(permission){
    // do something with permission value
  }