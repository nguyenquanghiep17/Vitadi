import React, { Component } from 'react';
import { View, Text, TouchableOpacity , StyleSheet, FlatList, ScrollView } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import {Icon} from 'native-base';
// import Collapsible from 'react-native-collapsible';
// import {AccordionList} from "accordion-collapse-react-native";


var SQLite = require('react-native-sqlite-storage');
var db = SQLite.openDatabase({name: 'vocal_v1Instance', createFromLocation: '~vocal_v1.db'});
export default class TranslateScreen extends Component {

    constructor(props) {
        super(props);

    }
    state = {
        lesson: [],
        activeSections: [],
    }
    SECTIONS = [
        {
          title: 'First',
          content: 'Lorem ipsum...',
        },
        {
          title: 'Second',
          content: 'Lorem ipsum...',
        },
      ];

    componentDidMount() {
        
        db.transaction((tx) => {
            var parent_id = this.props.route.params.content.id
            var query = 'SELECT * FROM lesson WHERE parent_id = "'+ parent_id +'"';


            tx.executeSql(query, [], (tx, results) => {
                var arr = []
                for(let i = 0; i < results.rows.length; i++) {
                    arr.push(results.rows.item(i));
                }
                this.setState({lesson: arr});
            });
            
        });
    }
    _renderHeader = section => {
        return (
            <View style={styles.container}>
                
                    <View style={{paddingTop: 10, backgroundColor: '#f2f0eb'}}></View>
                    <View style={{ height: 80, backgroundColor: 'white', flexDirection: 'row', alignContent: 'center', alignItems: 'center', }}>

                        <View >
                            <Text style={styles.text}>{section.name}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20, alignItems: 'center', width: '81%'}}>
                                <View style={{ width: "50%", height: 10, backgroundColor: '#f2f0eb', borderRadius: 3}}></View>
                                <Text style={{ fontSize: 14, }}>Learnt 0/{section.num_words}</Text>
                            </View>
                        </View>
                    </View>
                

            </View>

        );
      };
    
      _renderContent = section => {
        return (
          <View style={{paddingLeft: 20, backgroundColor: 'white', flexDirection: 'row', paddingBottom: 10}}>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('LessonContent', {content: section})}}>
                <Text style={styles.learn}>Learn</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('Practice', {content: section})}}>
                <Text style={styles.practice}>Practice</Text>
            </TouchableOpacity>
          </View>
        );
      };

      _updateSections = activeSections => {
        this.setState({ activeSections });
      };

      title() {
        return {


        }
    }
    render() {
        

        return (
            <View style={{flex: 1}}>
                
                <View style={{height: 70, backgroundColor: '#1E90FF', flexDirection: 'row', alignContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity  onPress={()=> {this.props.navigation.goBack()}}>
                        <Icon style={{margin: 20}} name="md-arrow-round-back" size={35} color="#900" />
                    </TouchableOpacity>
                    <Text style={{color: 'white', fontSize: 20}}>{this.props.route.params.content.name}</Text>
                </View>


                <ScrollView>
                    <Accordion
                        sections={this.state.lesson}
                        activeSections={this.state.activeSections}
                        renderHeader={this._renderHeader}
                        renderContent={this._renderContent}
                        onChange={this._updateSections}
                    />
                </ScrollView>
                

      
            </View>

        );
    }
}


const styles = StyleSheet.create({

    list: {
        flex: 1
    },
    container: {
        
    },
    text: {
        paddingLeft: 20,
        paddingBottom: 10,
        color: '#0080e8',
        fontWeight: 'bold',
        fontSize: 18,
    },
    foot: {
        flexDirection: 'row',
        paddingLeft: 20,
        paddingTop: 10
    },
    learn: {
        backgroundColor: '#0080e8',
        borderRadius: 10,
        paddingTop: 5, 
        paddingBottom: 5,
        paddingLeft: 20, 
        paddingRight: 20

        
    },
    practice: {
        backgroundColor: '#0080e8',
        borderRadius: 10,
        paddingTop: 5, 
        paddingBottom: 5,
        paddingLeft: 20, 
        paddingRight: 20,
        marginLeft: 10,
       
    }

})

