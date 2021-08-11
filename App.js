import React, { useState, createContext, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import Homepage from './Components/Homepage/Homepage';
import TimerPage from './Components/TimerPage/TimerPage';
import LandingPage from './Components/LandingPage/LandingPage';

export const ContextForHomePageOrNot = createContext(null)

export const logoUrl = 'https://image.flaticon.com/icons/png/512/3622/3622040.png'
export const removeImageUrl = 'https://image.flaticon.com/icons/png/128/189/189690.png'

const App = () => {

  const [onHomePageOrNot, setOnHomePageOrNot] = useState(true)
  const [onLandingPageOrNot, setOnLandingPageOrNot] = useState(true)

  useEffect(() =>{
    setTimeout(() => {
      setOnLandingPageOrNot( ! onLandingPageOrNot )
    }, 4000)
  },[])

  return (
    <ContextForHomePageOrNot.Provider value={[onHomePageOrNot, setOnHomePageOrNot]}>
      <View style={styles.appContainer}>
        {
          onLandingPageOrNot === true ? 
            <LandingPage /> 
            : 
            onHomePageOrNot === true ? 
              <Homepage />
              :
              <TimerPage />
        }
        <StatusBar style="auto" />
      </View>
    </ContextForHomePageOrNot.Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  appContainer : {
    flex:1,
    backgroundColor: '#FAAD80',
    paddingTop: 50,
  },
});