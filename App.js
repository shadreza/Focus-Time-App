import React, { useState, createContext, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import Homepage from './Components/Homepage/Homepage';
import TimerPage from './Components/TimerPage/TimerPage';
import LandingPage from './Components/LandingPage/LandingPage';

export const ContextForHomePageOrNot = createContext([])
export const ContextForCurrentTask = createContext([])
export const ContextForAllTask = createContext([])
export const ContextForUpdatingTaskAndTime = createContext([])

const App = () => {

  const [onHomePageOrNot, setOnHomePageOrNot] = useState(true)
  const [onLandingPageOrNot, setOnLandingPageOrNot] = useState(true)
  const [currentTask, setCurrentTask] = useState({})
  const [updatingTaskAndTime, setUpdatingTaskAndTime] = useState({})
  const [allTask, setAllTask] = useState([])

  useEffect(() =>{
    setTimeout(() => {
      setOnLandingPageOrNot( ! onLandingPageOrNot )
    }, 4000)
  },[])

  return (
    <ContextForHomePageOrNot.Provider value={[onHomePageOrNot, setOnHomePageOrNot]}>
    <ContextForCurrentTask.Provider value={[currentTask, setCurrentTask]}>
    <ContextForAllTask.Provider value={[allTask, setAllTask]}>
    <ContextForUpdatingTaskAndTime.Provider value={[updatingTaskAndTime, setUpdatingTaskAndTime]}>
      <View style={styles.appContainer}>
        {
          onLandingPageOrNot === true ? 
            <LandingPage /> 
            : 
            onHomePageOrNot === true ? 
              <Homepage />
              :
              <TimerPage/>
        }
        <StatusBar style="auto" />
      </View>
    </ContextForUpdatingTaskAndTime.Provider>
    </ContextForAllTask.Provider>
    </ContextForCurrentTask.Provider>
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