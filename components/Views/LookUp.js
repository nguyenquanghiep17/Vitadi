import React, { Component } from 'react';
import { View, FlatList, StyleSheet} from 'react-native';

import Topic from '../Common/Topic';
import Search from '../Layout/Search'; 



export default class LookUp extends Component {

    
    
    render() {
        var arr = ["Business English Vocabulary","Easy Vocabulary","GMAT Core English","GRE Core English","Hard Vocabulary","IELTS Core English","Middle Vocabulary","SAT Core English","TOEFL Core English"];
        return (


                    <View style={styles.container}>
                        <View>
                            <Search  navigation = {this.props.navigation} />
                        </View>
                        {/* <View style={{paddingTop: 1}}></View> */}
                        <View style={styles.list}>
                            <FlatList
                                data={arr}
                                renderItem={({ item }) => <Topic navigation={this.props.navigation} item={item}/>}
                                keyExtractor={item => item}
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