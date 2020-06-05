import React, { Component } from 'react';
import {
    ImageBackground,
    View,
    StyleSheet,
    Image,
    Dimensions
  } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center"
  }
});
  
export default class Splash extends Component {
    render() {
      let sreenWidth = Dimensions.get('window').width;
      return (
        <View style={styles.container}>
          <ImageBackground source={require('../assets/ic_launcher_bg.png')} style={styles.background}>
            <Image
              style={{width: sreenWidth / 4, height: sreenWidth / 4}}
              source={require('../assets/ic_launcher.png')}
            />
          </ImageBackground>

        </View>
        );
    }
}

