import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback , StyleSheet, TextInput,  Keyboard, Animated, Easing, Dimensions  } from 'react-native';
import {Icon} from 'native-base';


 
var flexDirection = 'row';
export default class SearchScreen extends Component {

    constructor(props) {
        super(props);
        this.spinValue = new Animated.Value(0);
        
    }
   
    state = {
        EnglishText: '',
        VietnameseText: '',
        stopAnimation: false,
        opacity: 0
        
    }

    spin () {
        this.spinValue.setValue(0)
        Animated.timing(
          this.spinValue,
          {
            toValue: 1,
            duration: 2000,
            easing: Easing.linear,
            useNativeDriver: true,
          }
        ).start(() => {
            if(this.state.stopAnimation === true) {
                this.spin();
                
              }
        })
      }

    switchLanguage = () => {

        flexDirection = (flexDirection === 'row') ? 'row-reverse' : 'row';
        this.setState({flexDirection, EnglishText: '', VietnameseText: ''});
    }

    async sendData() {
        if (this.state.EnglishText !== '') {
            this.setState({opacity: 1});
            this.setState({stopAnimation: true})
            this.spin();
            Keyboard.dismiss();
            try {
                const data = encodeURIComponent(this.state.EnglishText);
                const searchUrl = 'http://103.127.207.84:3000/'+flexDirection+'/' + data;
                const response = await fetch(searchUrl);   // fetch page
                const htmlString = await response.json();  // get response text
                this.setState({VietnameseText: htmlString.word});
                this.setState({stopAnimation: false})
                this.setState({opacity: 0});
                
                
                
            } catch(e) {
                console.log(e);
            }    
        }
    }

    middle() {
        return {
            flexDirection: flexDirection,
            justifyContent: 'space-evenly',
            
        }
    }

    loading() {
        return {
            position: 'absolute',
            justifyContent: 'flex-end',
            left: Dimensions.get('window').width / 2 - 32,
            top: Dimensions.get('window').height / 2 - 80,
            opacity: this.state.opacity,
            zIndex: 1
        }
    }
    

   
    render() {
        const { EnglishText } = this.state;
        const { VietnameseText } = this.state;
  
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        })
   
        
        return (
            <View >
                <View style={{height: 70, backgroundColor: '#1E90FF', flexDirection: 'row', alignContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity  onPress={()=> {this.props.navigation.goBack()}}>
                        <Icon style={{margin: 20}} name="md-arrow-round-back" size={35} color="#900" />
                    </TouchableOpacity>
                    
                    <Text style={styles.title}>DỊCH ONLINE</Text>

                </View>
                

                <View style={{paddingTop: 1}}></View>
                <TouchableOpacity onPress={() => {Keyboard.dismiss()}}>
                    <View>
                        
                            <View >
                                <TextInput
                                    
                                    multiline
                                    returnKeyType='done'
                                    style={{ borderColor: 'gray', borderWidth: 1, borderRadius: 15, backgroundColor: 'white', margin: 10 }}
                                    numberOfLines={5}
                                    textAlignVertical='top'
                                    editable
                                    value={EnglishText}
                                    onChangeText={(EnglishText) => {this.setState({EnglishText})}}
                                    
                                />
                            </View>
                            
                            <View style={this.loading()}>
                                <Animated.Image
                                    style={{
                                    transform: [{rotate: spin}] }}
                                    source={require('../../assets/Image/load.png')}
                                />
                            </View>
                        
                            <View style={{paddingTop: 1}}></View>

                            <View style={this.middle()}>
                                    <Text style={{color: '#1E90FF'}}>Tiếng Anh</Text>
                                    <TouchableWithoutFeedback  onPress={this.switchLanguage}>
                                        <Icon name="md-sync" size={35} color="#900" />
                                    </TouchableWithoutFeedback>
                                    <Text style={{color: '#1E90FF'}}>Tiếng Việt</Text>
                            </View>
                  
                            <View style={styles.translate}>
                                <TouchableOpacity onPress={() => {this.sendData()}}>
                                    <Text style={styles.translateButton}>Translate</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{paddingTop: 1}}></View>
                        
                            <View >
                                <TextInput
                                    
                                    multiline
                                    returnKeyType='done'
                                    style={{ borderColor: 'gray', borderWidth: 1, borderRadius: 15, backgroundColor: 'white', margin: 10, color: 'black' }}
                                    numberOfLines={5}
                                    textAlignVertical='top'
                                    value={VietnameseText}
                                    editable={false}
                                    
                                    
                                />
                                
                            </View>
                            
                        
                    
                    </View>
                </TouchableOpacity>

            </View>
        );
    }
}


const styles = StyleSheet.create({
    separate: {
        paddingTop: 10
    },
    title: {
        color: 'white',
        fontSize: 20
    },
    translate: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    translateButton: {
        backgroundColor: '#1E90FF',
        borderRadius: 15,
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20
    },

})


