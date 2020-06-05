import React, {Component} from 'react';
import { StyleSheet } from 'react-native';
import Splash from './components/SplashScreen';
import Main from './components/Main';


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = { isLoading: true };

    setTimeout(()=>{

      this.setState({ isLoading: false })
    }, 3000)
    

    // OneSignal.promptForPushNotificationsWithUserResponse(myiOSPromptCallback);
    // OneSignal.addEventListener('received', this.onReceived);
    // OneSignal.addEventListener('opened', this.onOpened);
    // OneSignal.addEventListener('ids', this.onIds);

  }
  // componentWillUnmount() {
  //   OneSignal.removeEventListener('received', this.onReceived);
  //   OneSignal.removeEventListener('opened', this.onOpened);
  //   OneSignal.removeEventListener('ids', this.onIds);
  // }

  // onReceived(notification) {
  //   console.log("Notification received: ", notification);
  // }

  // onOpened(openResult) {
  //   console.log('Message: ', openResult.notification.payload.body);
  //   console.log('Data: ', openResult.notification.payload.additionalData);
  //   console.log('isActive: ', openResult.notification.isAppInFocus);
  //   console.log('openResult: ', openResult);
  // }

  // onIds(device) {
  //   console.log('Device info: ', device);
  // }


  render() {
    if (this.state.isLoading) {
      return <Splash />;
    } else {
      return <Main />; 
    }
  };
}


function myiOSPromptCallback(permission){
  // do something with permission value
}