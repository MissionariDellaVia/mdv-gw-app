import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SplashScreen from './src/components/SplashScreen';
import {useEffect, useState} from 'react';
import {Dimensions, Image} from 'react-native'
import HomeScreen from './src/screens/HomeScreen.js';
import GospelWayScreen from "./src/screens/GospelWayScreen";
import {GlobalStyles} from "./src/constants/styles";
import AboutUs from "./src/screens/AboutUs";
import Events from "./src/screens/Events";

createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeImage = require('./assets/home_app.png');
const GospelImage = require('./assets/gospel.png');
const AboutUsImage = require('./assets/about_us.png');
const EventsImage = require('./assets/events.png');

const GospelIcon = ({ size, color }) => (
    <Image source={GospelImage} style={{ width: 25, height: 30, tintColor: color }} />
);
const HomeIcon = ({ size, color }) => (
    <Image source={HomeImage} style={{ width: size, height: size, tintColor: color }} />
);
const AboutUsIcon = ({ size, color }) => (
    <Image source={AboutUsImage} style={{ width: size, height: size, tintColor: color }} />
);
const EventsIcon = ({ size, color }) => (
    <Image source={EventsImage} style={{ width: size, height: size, tintColor: color }} />
);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    // Simulate loading process
    setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Adjust the time as needed
  }, []);

  const globalOptions = {
    headerShown: false,
    navigationBarHidden: true,
    headerTransparent: true,
    headerBackTitleVisible: false,
    headerBackVisible: false,
  };

  return (
      <NavigationContainer>
        {isLoading ? <SplashScreen/> :
            <Tab.Navigator initialRouteName="Home" screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.principal50 },
              headerTintColor: GlobalStyles.colors.text350,
              tabBarStyle: { backgroundColor: GlobalStyles.colors.principal50, height: 90 },
              tabBarActiveTintColor: GlobalStyles.colors.principal550,
              tabBarInactiveTintColor: GlobalStyles.colors.principal450,
            }}>
              <Tab.Screen
                  name="Home"
                  component={HomeScreen}
                  options={{
                    title: 'Home',
                    tabBarIcon: ({ color, size }) => <HomeIcon size={size} color={color} />,
                    headerShown: false,
                    headerBackTitleVisible: false,
                  }}
              />
              <Tab.Screen
                  name="AboutUs"
                  component={AboutUs}
                  options={{
                    title: 'Chi siamo',
                    headerShown: false,
                    headerBackTitleVisible: false,
                    tabBarIcon: ({ color, size }) => <AboutUsIcon size={size} color={color} />,
                  }}
              />

              <Tab.Screen
                  name="GospelWay"
                  component={GospelWayScreen}
                  options={{
                    title: 'Vangelo del Giorno',
                    tabBarIcon: ({ color, size }) => <GospelIcon size={size} color={color} />,
                    headerShown: false,
                    headerBackTitleVisible: false,
                  }}
              />

              <Tab.Screen
                  name="Events"
                  component={Events}
                  options={{
                    title: 'Appuntamenti',
                    tabBarIcon: ({ color, size }) => <EventsIcon size={size} color={color} />,
                    headerShown: false,
                    headerBackTitleVisible: false,
                  }}
              />
            </Tab.Navigator>}

      </NavigationContainer>
  );
}
