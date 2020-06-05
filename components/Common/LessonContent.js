import React, { Component } from 'react';
import { View, Text, TouchableOpacity , StyleSheet, Dimensions, Image } from 'react-native';
import {Icon} from 'native-base';

var SQLite = require('react-native-sqlite-storage');
var db = SQLite.openDatabase({name: 'vocal_v1Instance', createFromLocation: '~vocal_v1.db'});
export default class LessonContent extends Component {

    constructor(props) {
        super(props);


    }
    state = {
        index: 1,
        data: [],
        
        
    };
    componentDidMount() {
        this.isPress();
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

            this.setState({index: next});

        }


    }

    pre = () => {

        if (this.state.index > 1) {
            var pre = this.state.index - 1;
            this.setState({index: pre});
        }
    }

    loop(arr) {
        var results = [];

        if (arr !== null) {
            results.push(<Text style={{color: '#0080e8'}} key={'example'}>Example: </Text>)
            arr.forEach((element, index) => results.push(
                <View key={index} style={{paddingLeft: 10}}>
                    <Text>- {element.sentence}</Text>
                    <Text style={{paddingLeft: 10, color: '#1f92de'}}> > {element.translate}</Text>
                </View>
            ));
        }




        return results;

    }
    renderData(index) {
        if (this.state.data[index] !== undefined) {
            // if (this.state.data[index].example !=)
            var a = this.state.data[index].example;

            
            return (
            <View style={{paddingLeft: 20}}>
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
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.type}>Type: </Text>
                    <Text>{this.state.data[index].type}</Text>
                </View>
                
                <Text style={{color: '#0080e8'}}>Vietnamese mean:</Text>
                <Text style={styles.vietnamese_mean}>{this.state.data[index].vietnamese_mean}</Text>
                <Text style={{color: '#0080e8'}}>English mean:</Text>
                <Text style={styles.english_mean}>{this.state.data[index].english_mean}</Text>
                
                {this.loop(JSON.parse(this.state.data[index].example))}

            </View>);
        }
            
    }



    speech() {

    }
        

    render() {
        

        

        
        return (
            <View style={styles.container}>

                <View style={{height: 70, backgroundColor: '#1E90FF', flexDirection: 'row', alignContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity  onPress={()=> {this.props.navigation.goBack()}}>
                        <Icon style={{margin: 20}} name="md-arrow-round-back" size={35} color="#900" />
                    </TouchableOpacity>

                    <Text style={{color: 'white', fontSize: 20}}>{this.props.route.params.content.name}</Text>
     
                    
                </View>


                <View>
                    {this.renderData(this.state.index - 1)}
                </View>


                <View style={styles.footerWrap}>
                    <View style={styles.footer}>
                        <TouchableOpacity onPress={this.pre}>
                            <Icon style={{margin: 20}} name="ios-arrow-dropleft" size={35} color="#900" />
                        </TouchableOpacity>
                        <View style={styles.process}>
                            <Text style={{color: 'white'}}>{this.state.index} / {this.state.data.length}</Text>
                        </View>
                        <TouchableOpacity onPress={this.next}>
                            <Icon style={{margin: 20}} name="ios-arrow-dropright" size={35} color="#900" />
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
        
        flexDirection: 'row', 
        justifyContent: 'space-evenly',
        backgroundColor: 'white',
        alignItems: 'center'
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

