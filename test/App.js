/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import LoginScreen from './src/screens/user/loginScreen'
import HomeScreen from './src/screens/dashboard/homeScreen'
import MainNavigator from './src/navigation/mainNavigation'
const App: () => React$Node = () => {
  return (
    <MainNavigator />
  )
};



export default App;
