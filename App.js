import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Text } from 'react-native';
import Homepage from './Components/Homepage/Homepage';
import TimerPage from './Components/TimerPage/TimerPage';

const App = () => {

  const [onHomePageOrNot, setOnHomePageOrNot] = useState(true)

  return (
    <View style={styles.appContainer}>
      {
        onHomePageOrNot === true ? 
          <Homepage />
          :
          <TimerPage />
      }
      <StatusBar style="auto" />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  appContainer : {
    flex:1,
    backgroundColor: '#003638',
    color: '#F3F2C9',
    paddingTop: 50,
  },
});