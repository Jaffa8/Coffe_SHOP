import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

// importing the navigation
import { NavigationContainer } from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import TabNavigator from './src/navigators/TabNavigator'

// importing the screens

import DetailScreen from './src/screens/DetailScreen'
import PaymentScreen from './src/screens/PaymentScreen'
import { useEffect } from 'react'

// importing splash screen
import SplashScreen from 'react-native-splash-screen'

const Stack = createNativeStackNavigator();


const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  },[])

  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{headerShown:false}}  >
      <Stack.Screen name="Tab" component={TabNavigator}
        options={{animation:'slide_from_bottom'}} /> 

        <Stack.Screen name="Details" component={DetailScreen}
        options={{animation:'slide_from_bottom'}} />  

<Stack.Screen name="Payment" component={PaymentScreen}
        options={{animation:'slide_from_bottom'}} />  
      </Stack.Navigator>
    </NavigationContainer>
  )
}



const styles = StyleSheet.create({})

export default App