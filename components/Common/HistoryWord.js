import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

import Swipeout from 'react-native-swipeout';
import Tts from 'react-native-tts';
var SQLite = require('react-native-sqlite-storage');
var db = SQLite.openDatabase({name: 'historyInstance', createFromLocation: '~history.db'});
export default class Word extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeKey: null,
        }
    }
    
    



    isPress = () => {

        const content = this.props.item;



    
        

        db.transaction((tx) => {

            var query = 'SELECT * FROM word WHERE word.word = "' + this.props.item.word +'"';

            tx.executeSql(query, [], (tx, results) => {

                var len = results.rows.length;
                if (len == 1) {
                    tx.executeSql(
                        'DELETE FROM  word where id=?',
                        [content.id],
                        (tx, results) => {
                            this.props.parentFlatList.refreshFlatList()
    
                        }
                      );


                      

                }
        
            });
        });


    }

    speech() {
        Tts.speak(this.props.item.word, {
            androidParams: {
              KEY_PARAM_PAN: -1,
              KEY_PARAM_VOLUME: 0.5,
              KEY_PARAM_STREAM: 'STREAM_MUSIC',
            },
          });
    }

    render() {
       
        var mean = JSON.parse(this.props.item.mean);
        const swipeSettings = {
            autoClose: true,
            onClose: (secID, rowID, direction) => {
                if (this.state.activeKey != null)
                    this.setState({activeKey: null})
            },
            onOpen: (secID, rowID, direction) => {
                this.setState({activeKey: this.props.item.word})
            },
            right: [
                {
                    onPress: this.isPress,
                    text: 'Delete',
                    type: 'delete',
                    
                }
            ],
            rowId: this.props.index,
            sectionId: 1
        };
        return (
            
           
            // <View style={{flex: 1, padding: 5}}>
                <Swipeout {...swipeSettings} style={{flex: 1}}>
                    <View style={{flex: 1}}>
                        
                        <TouchableOpacity style={{flex: 1}} onPress={() => {this.props.navigation.navigate('Translate', {content: this.props.item})}}>
                            <View style={{ padding: 20, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', paddingLeft: 10, justifyContent: 'space-between'}}>
                                <View style={{flexDirection: 'row', alignContent: 'center', alignItems: 'center'}}>
                                    <View>
                                        <Image
                                            style={{height: 25, width: 25}}
                                            source={require('../../assets/Image/historyIcon.png')}
                                        />
                                    </View>
                                    <View>
                                        <Text style={styles.text}>{this.props.item.word}</Text>
                                        <Text style={{paddingLeft: 20, fontSize: 12}}>{mean.type1.type}</Text>
                                    </View>
                                </View>
                                
                                <View style={{paddingRight: 20}}>
                                    <TouchableOpacity  onPress={() => {this.speech()}}>
                                        <Image
                                            style={{height: 25, width: 25}}
                                            source={require('../../assets/Image/text-to-speech-icon.png')}
                                        />
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Swipeout>
            // </View>
        );
    }
}


const styles = StyleSheet.create({

    text: {
        paddingLeft: 20,
        paddingBottom: 5,
        color: '#0080e8',
        fontSize: 16
    }
})

