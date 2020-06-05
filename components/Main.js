import React, { Component } from 'react';

import { Image } from "react-native";


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import homeImage from '../assets/Image/book-inactive.png';
import homeImageActive from '../assets/Image/book-active.png';
import favoriteImage from '../assets/Image/heart-inactive.png';
import favoriteImageActive from '../assets/Image/heart-active.png';
import lookUpImage from '../assets/Image/look-up-inactive.png';
import lookUpImageActive from '../assets/Image/look-up-active.png';
import learnImage from '../assets/Image/learn-inactive.png';
import learnImageActive from '../assets/Image/learn-active.png';
import settingImage from '../assets/Image/settings-inactive.png';
import settingImageActive from '../assets/Image/settings-active.png';


import Home from './Views/Home';
import Favorite from './Views/Favorite';
import Learn from './Views/Learn';
import LookUp from './Views/LookUp';
import Setting from './Views/Setting';


import SearchScreen from './Common/SearchScreen';
import TranslateScreen from './Common/TranslateScreen';
import TopicScreen from './Common/TopicScreen';
import TranslateOnline from './Common/TranslateOnline';
import SelectLesson from './Common/SelectLesson';
import LessonContent from './Common/LessonContent';
import Practice  from './Common/Practice'


const HomeStack = createStackNavigator();
const FavoriteStack = createStackNavigator();
const LearnStack = createStackNavigator();
const LookUpStack = createStackNavigator();
const SettingStack = createStackNavigator();


function HomeStackScreen({navigation, route}) {
  
    if (route.state && route.state.index > 0) {
        navigation.setOptions({tabBarVisible: false}) 
    } else {
        navigation.setOptions({tabBarVisible: true}) 
    }
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={Home} options={{header: () => null}}/>
            <HomeStack.Screen name="Search" component={SearchScreen} options={{header: () => null}}/>
            <HomeStack.Screen name="Translate" component={TranslateScreen} options={{header: () => null}}/>
            <HomeStack.Screen name="TranslateOnline" component={TranslateOnline} options={{header: () => null}}/>
        </HomeStack.Navigator>
    )
  
    
}



function FavoriteStackScreen({navigation, route}) {
    if (route.state && route.state.index > 0) {
        navigation.setOptions({tabBarVisible: false}) 
    } else {
        navigation.setOptions({tabBarVisible: true}) 
    }
    return (
        <FavoriteStack.Navigator>
            <FavoriteStack.Screen name="Favorite" component={Favorite} options={{header: () => null}}/>
            <FavoriteStack.Screen name="Search" component={SearchScreen} options={{header: () => null}}/>
            <FavoriteStack.Screen name="Translate" component={TranslateScreen} options={{header: () => null}}/>
        </FavoriteStack.Navigator>
    )

  
    
}

function LearnStackScreen({navigation, route}) {
    if (route.state && route.state.index > 0) {
        navigation.setOptions({tabBarVisible: false}) 
    } else {
        navigation.setOptions({tabBarVisible: true}) 
    }
    return (
        <LearnStack.Navigator>
            <LearnStack.Screen name="Learn" component={Learn} options={{header: () => null}}/>
            <LearnStack.Screen name="Search" component={SearchScreen} options={{header: () => null}}/>
            <LearnStack.Screen name="Translate" component={TranslateScreen} options={{header: () => null}}/>
            <LearnStack.Screen name="SelectLesson" component={SelectLesson} options={{header: () => null}}/>
            <LearnStack.Screen name="LessonContent" component={LessonContent} options={{header: () => null}}/>
            <LearnStack.Screen name="Practice" component={Practice} options={{header: () => null}}/>

        </LearnStack.Navigator>
    )
  
    
}

function LookUpStackScreen({navigation, route}) {
    if (route.state && route.state.index > 0) {
        navigation.setOptions({tabBarVisible: false}) 
    } else {
        navigation.setOptions({tabBarVisible: true}) 
    }
    return (
        <LookUpStack.Navigator>
            <LookUpStack.Screen name="Look Up" component={LookUp} options={{header: () => null}}/>
            <LookUpStack.Screen name="TopicScreen" component={TopicScreen} options={{header: () => null}}/>
            <LookUpStack.Screen name="Search" component={SearchScreen} options={{header: () => null}}/>
            <LookUpStack.Screen name="Translate" component={TranslateScreen} options={{header: () => null}}/>
            
            
            
        </LookUpStack.Navigator>
    )
  
    
}

function SettingStackScreen({navigation, route}) {
    if (route.state && route.state.index > 0) {
        navigation.setOptions({tabBarVisible: false}) 
    } else {
        navigation.setOptions({tabBarVisible: true}) 
    }
    return (
        <SettingStack.Navigator>
            <SettingStack.Screen name="Setting" component={Setting} options={{header: () => null}}/>
            <SettingStack.Screen name="Translate" component={TranslateScreen} options={{header: () => null}}/>
            <SettingStack.Screen name="Search" component={SearchScreen} options={{header: () => null}}/>
            
        </SettingStack.Navigator>
    )
    
}

const Tab = createBottomTabNavigator();
  
export default class Main extends Component {
  
    render() {
        return (

            <NavigationContainer >
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let image;

                            if (route.name === 'Home') {
                                image = focused ? homeImageActive : homeImage
                            } else if (route.name === 'Favorite') {
                                image = focused ? favoriteImageActive : favoriteImage
                            } else if (route.name === 'Learn') {
                                image = focused ? learnImageActive : learnImage
                            } else if (route.name === 'Look Up') {
                                image = focused ? lookUpImageActive : lookUpImage
                            } else if (route.name === 'Settings') {
                                image = focused ? settingImageActive : settingImage
                            }

                        // You can return any component that you like here!
                            return <Image source={image} />
                        }
                    })}

                    tabBarOptions={{
                        activeTintColor: '#00BFFF',
                        inactiveTintColor: 'black',
                    }}
                >
                    <Tab.Screen name="Home" component={HomeStackScreen} />
                    <Tab.Screen name="Favorite" component={FavoriteStackScreen} />
                    <Tab.Screen name="Learn" component={LearnStackScreen} />
                    <Tab.Screen name="Look Up" component={LookUpStackScreen} />
                    <Tab.Screen name="Settings" component={SettingStackScreen} />
                </Tab.Navigator>
            </NavigationContainer>


        );
    }
}

