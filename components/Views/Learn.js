import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, SectionList } from 'react-native';

import LearnItem from '../Common/LearnItem';
import Search from '../Layout/Search';
import SectionHeader from '../Common/SectionHeader'


var SQLite = require('react-native-sqlite-storage');
var db = SQLite.openDatabase({name: 'vocal_v1Instance', createFromLocation: '~vocal_v1.db'});
export default class Learn extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        general: [],
        school: [],
        specialization: [],
        test_of_english: []
    }
    componentDidMount() {

        db.transaction((tx) => {
            var general = 'SELECT * FROM package WHERE group_1 = "general"';
            var school = 'SELECT * FROM package WHERE group_1 = "school"';
            var specialization = 'SELECT * FROM package WHERE group_1 = "specialization"';
            var test_of_english = 'SELECT * FROM package WHERE group_1 = "test_of_english"';

            tx.executeSql(general, [], (tx, results) => {
                var arr = [];
                for (let i = 0; i < results.rows.length; i++) {
                    arr.push(results.rows.item(i));

                }
                this.setState({general: arr});
            });
            tx.executeSql(school, [], (tx, results) => {
                var arr = [];
                for (let i = 0; i < results.rows.length; i++) {
                    arr.push(results.rows.item(i));
                }
                this.setState({school: arr});
            });
            tx.executeSql(specialization, [], (tx, results) => {
                var arr = [];
                for (let i = 0; i < results.rows.length; i++) {
                    arr.push(results.rows.item(i));
                }
                this.setState({specialization: arr});
            });
            tx.executeSql(test_of_english, [], (tx, results) => {
                var arr = [];
                for (let i = 0; i < results.rows.length; i++) {
                    arr.push(results.rows.item(i));
                }
                this.setState({test_of_english: arr});
                
            });
        });
    }
    render() {
        var packages = [
                            {
                                data: this.state.specialization,
                                title: 'Specialization'
                            },
                            {
                                data: this.state.test_of_english,
                                title: 'Testing'
                            },
                            {
                                data: this.state.general,
                                title: 'General'
                            },
                            {
                                data: this.state.school,
                                title: 'Student'
                            }
                            
                            
                        ];
        return (
            <View style={styles.container}>
                <View>
                    <Search  navigation = {this.props.navigation} />
                </View>
                <View style={styles.list}>
                    <SectionList
                        sections={packages}
                        renderItem={({item}) => <LearnItem navigation={this.props.navigation} item={item}/>}
                        keyExtractor={(item, index) => item.name}
                        renderSectionHeader={({section}) => <SectionHeader section={section}/>}
                    />
                </View>
                    


                
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    list: {
        flex: 1
    }
});