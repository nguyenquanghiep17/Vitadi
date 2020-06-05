import React, { Component } from 'react';
import { View, Text, TouchableOpacity , StyleSheet, Image, TouchableWithoutFeedback, Animated, Dimensions, ScrollView } from 'react-native';
import {Icon} from 'native-base';
// import Speech from 'react-native-speech'
var SQLite = require('react-native-sqlite-storage');

var settings = SQLite.openDatabase({name: 'settingsInstance', createFromLocation: '~settings.db'});
var db = SQLite.openDatabase({name: 'favoriteInstance', createFromLocation: '~favorite.db'});
import Tts from 'react-native-tts';

export default class TranslateScreen extends Component {

    constructor(props) {
        super(props);


    }

    state =  {
        heart: require('../../assets/Image/heart_off.png'),
        addWord: new Animated.Value(0),
        removeWord: new Animated.Value(0),
    }
    loopItem(item) {

        var arr = [];
        let count = 1;
        for (let i in item) {
 
            if (typeof item[i].txt != 'undefined' && item[i].tag ==='m') {
                arr.push(<Text key={count}>{count}. {item[i].txt}</Text>);
                count++;
            }
        }
        return arr;
    }

    loop() {

        var content = this.props.route.params.content;
        var mean = JSON.parse(content.mean);
        let arr = [];
        for (let i in mean) {
            if (typeof mean[i] === 'object')
                arr.push(mean[i]);
        }
       
        

        return arr.map((element, index) => <View style={{paddingLeft: 15}} key={element.type + index}>
                                    <Text style = {{color: '#0080e8'}}>> {element.type}</Text>
                                    <View style={{paddingLeft: 10}}>{this.loopItem(element)}</View>
                                    <Text style={{paddingBottom: 10}}></Text>
                                </View>);

    }

    componentDidMount() {
        settings.transaction((tx) => {

            var query = 'SELECT * FROM state';
  
            tx.executeSql(query, [], (tx, results) => {
  
                this.setState({autoPronun: (results.rows.item(1).value == 1) ? true : false})
                console.log(results.rows.item(1))
                if (results.rows.item(1).value == 1) {
                    this.speech();
                }
            });
        });

        db.transaction((tx) => {

            var query = 'SELECT * FROM word WHERE word.word = "' + this.props.route.params.content.word +'"';
  
            tx.executeSql(query, [], (tx, results) => {

                var len = results.rows.length;

                if(len == 0) {
                    this.setState({heart: require('../../assets/Image/heart_off.png')})
                } else if (len == 1) {
                    this.setState({heart: require('../../assets/Image/heart_on.png')})
                }
        
            });

        });
        
    }
    isPress = () => {

        const content = this.props.route.params.content;

        db.transaction((tx) => {

            var query = 'SELECT * FROM word WHERE word.word = "' + this.props.route.params.content.word +'"';
  
            tx.executeSql(query, [], (tx, results) => {

                var len = results.rows.length;
        
                if(len == 0) {
                    tx.executeSql(
                        'INSERT INTO word (id, word, mean, pronunciation, word_type, content) VALUES (?,?,?,?,?,?)',
                        [content.id, content.word, content.mean, content.pronunciation, content.word_type, content.content],
                        (tx, results) => {

                            if (results.rowsAffected > 0) {
                                this.setState({heart: require('../../assets/Image/heart_on.png')})
                                this.show(1);
                            }
                        }
                    );
                } else if (len == 1) {
                    tx.executeSql(
                        'DELETE FROM  word where id=?',
                        [content.id],
                        (tx, results) => {
                          
                            if (results.rowsAffected > 0) {
                                this.setState({heart: require('../../assets/Image/heart_off.png')})
                                this.show(0);
                            }
                        }
                      );
                }
        
            });
        });
    }
    show(key) {
    

        if (key) {
            Animated.timing(
                this.state.addWord,
                {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true
                }
                ).start(({ finished }) => {
        
                    this.hidden(key);
                });
        } else {

            Animated.timing(
                this.state.removeWord,
                {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true
                }
                ).start(({ finished }) => {
        
                    this.hidden(key);
                });
        }


    }

    hidden(key) {
        if (key) {
            Animated.timing(
                this.state.addWord,
                {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true
                }
            ).start()
        } else {
            Animated.timing(
                this.state.removeWord,
                {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true
                }
                ).start();
        }

    }

    addWord() {
        return {
            position: 'absolute',
            justifyContent: 'flex-end',
            left: Dimensions.get('window').width / 2 - 135 / 2,
            bottom: 20 ,
            opacity: this.state.addWord,
            zIndex: 1,
            backgroundColor: 'white',
            borderRadius: 30,
            padding: 10,
        }
    }
    removeWord() {
        return {
            position: 'absolute',
            justifyContent: 'flex-end',
            left: Dimensions.get('window').width / 2 - 171 / 2,
            bottom: 20 ,
            opacity: this.state.removeWord,
            zIndex: 1,
            backgroundColor: 'white',
            borderRadius: 30,
            padding: 10,
        }
    }
    // _startHandler() {
    //     Speech.speak({
    //       text: 'Aujourd\'hui, Maman est morte. Ou peut-être hier, je ne sais pas.',
    //       voice: 'fr-FR'
    //     })
    //     .then(started => {
    //       console.log('Speech started');
    //     })
    //     .catch(error => {
    //       console.log('You\'ve already started a speech instance.');
    //     });
    //   }
     
    //   _pauseHandler() {
    //     Speech.pause();
    //   }
     
    //   _resumeHandler() {
    //     Speech.resume();
    //   }
     
    //   _stopHandler() {
    //     Speech.stop();
    //   }
     
        
    speech() {
        Tts.speak(this.props.route.params.content.word, {
            androidParams: {
              KEY_PARAM_PAN: -1,
              KEY_PARAM_VOLUME: 0.5,
              KEY_PARAM_STREAM: 'STREAM_MUSIC',
            },
          });
    }

    render() {
        const content = this.props.route.params.content;


 

        var pronunciation = content.pronunciation;
        var arrayPronunciation = pronunciation.split(';');
        var pronunciationUS = arrayPronunciation[0];
        var pronunciationUK = arrayPronunciation[0];
        if (arrayPronunciation.length == 2) {
            pronunciationUK = arrayPronunciation[0] + '/';
        }
        if (arrayPronunciation.length == 2) {
            pronunciationUS= '/' + arrayPronunciation[1].slice(5, arrayPronunciation[1].length).trim();
        } 

        return (
            <View style={styles.container}>
            <ScrollView >
                <View style={{height: 70, backgroundColor: '#1E90FF', flexDirection: 'row', alignContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity  onPress={()=> {this.props.navigation.goBack()}}>
                        <Icon style={{margin: 20}} name="md-arrow-round-back" size={35} color="#900" />
                    </TouchableOpacity>
                    <Text style={{color: 'white', fontSize: 20}}>{this.props.route.params.content.word}</Text>
                </View>
                <View style={{padding: 10}}></View>
                <View style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 10}}>
                    <TouchableOpacity  onPress={() => {this.speech()}}>
                         <Image
                            style={{height: 25, width: 25}}
                            source={require('../../assets/Image/text-to-speech-icon.png')}
                        />
                    </TouchableOpacity>
                    
                    <Text style={styles.pronunciation}>US: {pronunciationUS}</Text>
                </View>
                <View style={{padding: 5}}></View>
                <View style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 10}}>
                    <TouchableOpacity  onPress={() => {this.speech()}}>
                         <Image
                            style={{height: 25, width: 25}}
                            source={require('../../assets/Image/text-to-speech-icon.png')}
                        />
                    </TouchableOpacity>
                    <Text style={styles.pronunciation}>UK: {pronunciationUK}</Text>
                </View>
                
                <View style={{padding: 10}}></View>

                {this.loop()}

                <View style={{paddingBottom: 70}}></View>
                


            </ScrollView>
            <TouchableWithoutFeedback  onPress={()=> {this.isPress()}}>
                    <Image
                        style={styles.heart}
                        source={this.state.heart}
                    />
                </TouchableWithoutFeedback>

                <View>
                    <Animated.View style={this.addWord()}>
                        <Text>Added to favorites</Text>
                    </Animated.View>
                </View>
                <View>
                    <Animated.View  style={this.removeWord()}>
                        <Text>Removed from favorites</Text>
                    </Animated.View>
                </View>

      
            </View>

        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    pronunciation: {
        paddingLeft: 20,
        paddingTop: 2,
        color: "#0080e8"
    },
    separate: {
        padding: 1
    },
    text: {
        paddingLeft: 20
    },
    heart: {
        height: 40,
        width: 40,
        position: 'absolute',
        bottom: 20,
        right: 20,
        zIndex: 1
    },


})

