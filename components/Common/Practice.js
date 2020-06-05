import React, { Component } from 'react';
import { View, Text, TouchableOpacity , StyleSheet, Dimensions, Image, FlatList, Alert } from 'react-native';
import {Icon} from 'native-base';
import Tts from 'react-native-tts';
var SQLite = require('react-native-sqlite-storage');
var db = SQLite.openDatabase({name: 'vocal_v1Instance', createFromLocation: '~vocal_v1.db'});
export default class LessonContent extends Component {

    constructor(props) {
        super(props);


    }
    state = {
        index: 1,
        data: [],
        picker: -1,
        arr: [],
        processing: 5,
        seconds: 0,
        minutes: 0,
        next: 'CHECK',
        correct: 0

        
    };
    pad(d) {
        return (d < 10) ? '0' + d.toString() : d.toString();
    }
    componentDidMount() {
        this.isPress();
        var interval = setInterval(()=> {
            
            if (this.state.minutes == 2) {
                clearInterval(interval);
                this.props.navigation.goBack();
            }
            if (this.state.seconds < 59) {
                var nextTime = this.state.seconds + 1;
                this.setState({seconds: nextTime});
            }
            else {
                this.nextMinutes = this.state.minutes + 1;
                this.setState({seconds: 0, minutes: this.nextMinutes})
            }
            
            
        }, 1000) 
        
    }

     
    isPress = () => {

        var id = this.props.route.params.content.id;
        db.transaction((tx) => {
            this.state.data = [];

            var query = 'SELECT word.* FROM word inner join lesson_word on word.id = lesson_word.word_id WHERE lesson_word.lesson_id =' + id;
            tx.executeSql(query, [], (tx, results) => {
                var len = results.rows.length;

                var arr = [];

                for (let i = 0; i < len; i++) {
                    let row = results.rows.item(i);
                    arr.push(row);
                }
                this.setState({data: arr});
               
                
            });
            
            
        });
    
       
        

    }

    next = () => {

        if (this.state.index < this.state.data.length) {
            var next = this.state.index + 1;
            var temp = this.state.processing + 100 / this.state.data.length;
            this.setState({index: next, arr: [], picker: -1, processing: temp, next: 'CHECK', check: false});
        }
 


    }

    check = () => {

        var nextCorrect = this.state.correct + 1;
        if (this.state.index === this.state.picker) {
            this.setState({check: true, next: 'NEXT', correct: nextCorrect})

        } else {
            if (this.state.picker != -1) {
                this.setState({check: true, next: 'NEXT'})
            }
                
        }
        if (this.state.index == this.state.data.length) {
            this.setState({next: 'QUIT'})
        }
    }
    
    


    getData() {
        if (this.state.data.length != 0 && this.state.arr.length != 4) {

            var length = this.state.data.length;
            
    
    
            this.state.arr.push(this.state.index);
            while(this.state.arr.length < 4) {
                var temp = Math.floor(Math.random() * length) + 1;
                
                if (this.state.arr.indexOf(temp) == -1) {
                    this.state.arr.push(temp);
                }
                
            }
            this.state.arr.sort();
            
        }
    }



   
    renderData(index) {
        if (this.state.data[index] !== undefined) {
            
            return (
            <View style={{paddingLeft: 20, paddingTop: 20}}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between',  alignItems: 'center', paddingBottom: 10}}>
                    <View style={{ width: "80%", height: 10, backgroundColor: 'white', borderRadius: 3}}>
                        <View style={{ width: this.state.processing + '%', height: 10, backgroundColor: '#32a84a', borderRadius: 3}}></View>
                    </View>
                    <Text style={{color: 'black', paddingRight: 10}}>{this.state.index} / {this.state.data.length}</Text>
                </View>

                <View style={{paddingBottom: 10, flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                        style={{height: 25, width: 25}}
                        source={require('../../assets/Image/clock.png')}
                    />
                    <Text style={{paddingLeft: 10}}>{this.pad(this.state.minutes)} : {this.pad(this.state.seconds)}</Text>
                    <View style={{paddingLeft: 70}}></View>
                    <Image
                        style={{height: 25, width: 25}}
                        source={require('../../assets/Image/ticker.png')}
                    />
                    <Text style={{paddingLeft: 10}}>{this.state.correct}</Text>

                </View>

                <View style={{borderWidth: 1,backgroundColor: 'white', borderColor: '#0080e8', borderRadius: 10, padding: 10, marginRight: 20}}>
                    <Text style={styles.text}>{this.state.data[index].word}</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center', paddingBottom: 10}}>
                        <TouchableOpacity  onPress={()=> {this.speech()}}>
                            <Image
                                style={{height: 25, width: 25}}
                                source={require('../../assets/Image/text-to-speech-icon.png')}
                            />
                        </TouchableOpacity>
                        
                        <Text style={styles.pronunciation}>{this.state.data[index].pronunciation}</Text>
                    </View>
                    
                </View>
 
                <Text style={{fontSize: 20, padding: 10}}>Choose the correct meaning</Text>
                <View style={{ elevation: 1, backgroundColor: 'white', marginRight: 20, borderColor: '#0080e8', borderRadius: 10, padding: 20}}>
                {this.getData()}
                <FlatList
                    data={this.state.arr}
                    renderItem={({ item }) => 
                                            <TouchableOpacity onPress={(this.state.next == 'NEXT')? ()=>{} : ()=>{this.setState({picker: item})}}>
                                                <View style={{flexDirection: 'row', padding: 10, alignItems: 'center'}}>
                                                    <Image
                                                        style={{height: 25, width: 25}}
                                                        source={(item !== this.state.picker) ? require('../../assets/Image/white.png') : require('../../assets/Image/black.png')}
                                                    />
                                                    <Text style={{paddingLeft: 20, color: (item == this.state.index && this.state.check) ? '#32a84a' : (item == this.state.picker && this.state.check) ? '#ff3300' : 'black'}}>{this.state.data[item-1].vietnamese_mean}</Text>
                                                </View>
                                            </TouchableOpacity>}
                    keyExtractor={item => item + ''}
                />
                </View>

            </View>);
        }
            
    }

    quit = () => {
        this.props.navigation.goBack()
    }
    speech() {
        Tts.speak(this.state.data[this.state.index - 1].word, {
            androidParams: {
              KEY_PARAM_PAN: -1,
              KEY_PARAM_VOLUME: 0.5,
              KEY_PARAM_STREAM: 'STREAM_MUSIC',
            },
          });
    }

    back = () => {
        Alert.alert(
            "Warning",
            "You ara not finish yet. Are you sure you want to quit?",
            [
              {
                text: "Cancel",
                //onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => this.props.navigation.goBack() }
            ],
            { cancelable: false }
          );
    }


        

    render() {
        

        

        
        return (
            <View style={styles.container}>

                <View style={{height: 70, backgroundColor: '#1E90FF', flexDirection: 'row', alignContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity  onPress={this.back}>
                        <Icon style={{margin: 20}} name="md-arrow-round-back" size={35} color="#900" />
                    </TouchableOpacity>

                    <Text style={{color: 'white', fontSize: 20}}>Practice</Text>
     
                    
                </View>


                <View>
                    {this.renderData(this.state.index - 1)}
                </View>


                <View style={styles.footerWrap}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: 'white', alignItems: 'center', backgroundColor: (this.state.next == 'NEXT') ? '#0080e8' : (this.state.picker != -1) ? '#ffbf00'  : 'gray'  }}>
                        <TouchableOpacity onPress={(this.state.next == 'QUIT') ? this.quit : (this.state.next == 'NEXT') ? this.next : this.check}>
                            <Text style={{color: 'white', fontSize: 20, padding: 10}}>{this.state.next}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                






      
            </View>

        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    pronunciation: {
        paddingLeft: 10
    },
    separate: {
        padding: 1
    },
    text: {
        color: '#0080e8', 
        fontWeight: 'bold', 
        fontSize: 30,
        paddingBottom: 10
    },


    footer: {
        
        
    },
    footerWrap: {
        width: Dimensions.get('window').width,
        position: 'absolute', 
        bottom: 0,
    },
    process: {
        // flex: 1,
        backgroundColor: '#0080e8',
        paddingBottom: 15,
        paddingTop: 15,
        paddingLeft: 40,
        paddingRight: 40,
        borderRadius: 15
        
    },
    type: {
        paddingBottom: 10,
        color: '#0080e8'
    },
    vietnamese_mean: {
        paddingBottom: 10,
        paddingLeft: 10
    },
    english_mean: {
        paddingBottom: 10,
        paddingLeft: 10
    }

})

