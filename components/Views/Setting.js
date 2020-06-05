import React, { Component } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import Search from '../Layout/Search';
var SQLite = require('react-native-sqlite-storage');
var db = SQLite.openDatabase({name: 'settingsInstance', createFromLocation: '~settings.db'});
export default class Setting extends Component {
    constructor(props) {
        super(props);
        
    }
    state = {

    }

    componentDidMount() {
        db.transaction((tx) => {

            var query = 'SELECT * FROM state';
  
            tx.executeSql(query, [], (tx, results) => {
  
                this.setState({quickSearch: (results.rows.item(0).value == 1) ? true : false})
                this.setState({autoPronun: (results.rows.item(1).value == 1) ? true : false})
                this.setState({reminder: (results.rows.item(2).value == 1) ? true : false})
                this.setState({notification: (results.rows.item(3).value == 1) ? true : false})
                
        
            });
        });
    }
    updateState(state, value) {
        
        var isTrue = value ? 1 : 0;

        db.transaction((tx) => {

            var query = 'UPDATE state SET value=' + isTrue + ' WHERE state="' + state + '"';


  
            tx.executeSql(query, [], (tx, results) => {


        
            });
        });
    }
    quickSearchSwitch = (value) => {

        this.setState({quickSearch: value})
        this.updateState('quick', value)

    }
    autoPronunSwitch = (value) => {

        this.setState({autoPronun: value})
        this.updateState('auto', value)
    }
    notificationSwitch = (value) => {

        this.setState({notification: value})
       
        this.updateState('notification', value)
    }
    reminderSwitch = (value) => {

        this.setState({reminder: value})
        this.updateState('reminder', value)
    }
    render() {
        return (
            <View>
                <View>
                    <Search  navigation = {this.props.navigation} />
                </View>

                <View>
                    <Text style={styles.label}>Dictionary</Text>
                    <View>
                        <View style={styles.element}>
                            
                            <View>
                                <Text style={styles.content}>Quick Search</Text>
                                <Text style={{paddingLeft: 20,paddingBottom: 20 ,opacity: 0.8, fontSize: 12}}>Show a quick search popup</Text>
                            </View>
                            <Switch
                                style={{bottom: 5}}
                                onValueChange = {this.quickSearchSwitch}
                                value = {this.state.quickSearch}
                            />
                        </View>
                       
                        
                    </View>
                    
                </View>

                <View style={styles.separate}></View>

                <View>
                    <Text style={styles.label} >Sound</Text>
                    <View >
                        <View style={styles.element}>
                            <Text style={styles.content}>Play pronunciation automatically</Text>
                            <Switch
                                style={{bottom: 5}}
                                onValueChange = {this.autoPronunSwitch}
                                value = {this.state.autoPronun}
                        />
                        </View>
                        
                        <Text style={{paddingBottom: 20, paddingLeft: 20}}>Voice setting</Text>
                    </View>
                </View>

                <View style={styles.separate}></View>

                <View>
                    <Text style={styles.label}>Notification</Text>
                    <View>
                        <View style={styles.element}>
                            <Text style={styles.content}>Daily learning reminder</Text>
                            <Switch
                                style={{bottom: 5}}
                                onValueChange = {this.reminderSwitch}
                                value = {this.state.reminder}
                            />
                        </View>
                        <View style={styles.element}>
                            <Text style={{paddingBottom: 20, paddingLeft: 20}}>Daily word notification</Text>
                            <Switch
                                style={{bottom: 5}}
                                onValueChange = {this.notificationSwitch}
                                value = {this.state.notification}
                        />
                        </View>
                        
   
                    </View>
                </View>

                <View style={styles.separate}></View>

                <View>
                    <Text style={{padding: 20}}>Love Vitadi Dictionary? Rate us 5 stars!</Text>
                </View>
            </View>
        );
    }
    
}

const styles = StyleSheet.create({
    separate: {
        //padding: 1,
        color: "#000000",
        borderTopColor: '#CFCFCF',
        borderWidth: 1
    },
    label: {
        color: '#1E90FF',
        padding: 20
    },
    content: {
        paddingLeft: 20,

    },
    padding: {
        padding: 20
    },
    element: {
        flexDirection: 'row', 
        justifyContent: 'space-between'
    }
});