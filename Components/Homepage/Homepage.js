import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput, Keyboard } from 'react-native';
import {  ContextForAllTask, ContextForCurrentTask, ContextForHomePageOrNot, ContextForUpdatingTaskAndTime } from '../../App';
import {addImageUrl, defaultTime, logoUrl, removeImageUrl} from '../Default Values/DefaultValues';

const Homepage = () => {

    const HomePageContext = useContext(ContextForHomePageOrNot)
    const currentTask = useContext(ContextForCurrentTask)
    const allTask = useContext(ContextForAllTask)
    const UpdatingTaskAndTime = useContext(ContextForUpdatingTaskAndTime)

    const [inputText, setInputText] = useState('')
    const [keyboardStatus, setKeyboardStatus] = useState(false)
    const [shouldFloatOrNot, setShouldFloatOrNot] = useState(false)
    
    const _keyboardDidShow = () => {
      setKeyboardStatus(true)
      if(allTask[0].length > 0) {
        setShouldFloatOrNot(true)
      } else {
        setShouldFloatOrNot(false)
      }
    }
    const _keyboardDidHide = () => {
      setKeyboardStatus(false)
      setShouldFloatOrNot(false)
    }

    useEffect(() => {
      Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
      // cleanup function
      return () => {
        Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
      };
    }, []);

    const toggleBetweenHomeAndTimer = () => {
        if(UpdatingTaskAndTime[0].length > 0) {
          for(let i=0; i<allTask[0].length; i++) {
            if(allTask[i].name === UpdatingTaskAndTime[0].name && allTask[i].key === UpdatingTaskAndTime[0].key) {
              allTask[i].currentTimeRemainingInSec = UpdatingTaskAndTime[0].timeRemaining
            }
          }
        }
        
        HomePageContext[1]( ! HomePageContext[0] )
    }

    const generateUniqueKey = () => {
        const d = new Date
        return d.getMilliseconds()
    }

    const addToCurrentTask = ( task ) => {
        currentTask[1](task)
        toggleBetweenHomeAndTimer()
    }

    const addToAllTask = () => {

        if(inputText === null || inputText === undefined || inputText.trim().length <= 0) {
          // pop modal
          alert('please insert a valid task to focus')
          return;
        }

        const TASK = {
            name : inputText,
            totalTime : defaultTime,
            currentTimeRemainingInSec : defaultTime * 60,
            key : generateUniqueKey()
        }
        allTask[1]( [  TASK  , ...allTask[0] ] )
        currentTask[1](TASK)
        toggleBetweenHomeAndTimer()
    }

    const removeTask = (key) => {
        const newTaskArray = allTask[0].filter(task => task.key !== key)
        allTask[1](newTaskArray)
    }

    return (
        <View style={styles.homeMainContainer}>
            <Image 
                source={{
                    uri : logoUrl
                }} 
                style={styles.logo}
            />
            <View style={styles.heroTextSection}>
                <Text style={styles.header}>FocusTime</Text>
                <Text style={styles.sideLine}>The App lets you focus on your tasks</Text>
            </View>
            {
                allTask[0].length > 0 ? 
                    <View style={styles.allFocusTasksSection}>
                        <Text style={styles.allFocusSectionText}>Tasks that demand your focus</Text>
                        <ScrollView style={styles.allFocusScroll}>
                            {
                                allTask[0].map(task =>
                                    <TouchableOpacity key={task.key} onPress={()=>{addToCurrentTask(task)}}>
                                        <View style={styles.singleTask}>
                                            <Text style={styles.singleTaskName}>{task.name}</Text>
                                            <TouchableOpacity onPress={()=>{removeTask(task.key)}}>
                                                <Image 
                                                    source={{
                                                        uri : removeImageUrl
                                                    }} 
                                                    style={styles.removeImage}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }
                        </ScrollView>
                    </View>
                    :
                    <View style={styles.noTasksView}>
                      <Text style={styles.noTasksText}>No tasks set yet!</Text>
                    </View>
            }

            <View style={shouldFloatOrNot === false ? styles.inputView : styles.inputViewFloat}>
                <Text style={styles.addingText}>Add the task to focus on</Text>
                <View style={styles.inputSection}>
                    <TextInput 
                        placeholder="Type your task!"
                        style={styles.inputBox}
                        onChangeText={setInputText}
                    />
                    <TouchableOpacity onPress={()=>{addToAllTask()}}>
                        <Image 
                            source={{
                                uri : addImageUrl
                            }} 
                            style={styles.addImage}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default Homepage;

const styles = StyleSheet.create({
  homeMainContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
  },
  heroTextSection: {
    alignItems: 'center',
  },
  header: {
    color: '#A73489',
    fontSize: 22,
    marginTop: 10,
  },
  sideLine: {
    color: '#512D6D',
    fontSize: 16,
    marginTop: 6,
  },
  allFocusTasksSection: {
    marginTop: 70,
    marginBottom: 60 ,
    alignItems: 'center',
  },
  singleTask: {
    backgroundColor: 'mintcream',
    minWidth: '80%',
    alignItems: 'center',
    margin: 4,
    borderRadius: 8,
    padding: 6,
    display: 'flex',
    flexDirection: 'row'
  },
  singleTaskName: {
    color: 'tomato',
    fontWeight: 'bold',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 16,
  },
  allFocusSectionText: {
    color: '#035397',
    fontSize: 20,
  },
  allFocusScroll: {
    maxHeight: '60%',
    marginTop: 10,
  },
  removeImage: {
    width: 15,
    height: 15,
    margin: 4,
  },
  addImage: {
    width: 25,
    height: 25,
    marginLeft: 10
  },
  inputSection: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputBox: {
    padding: 4,
    backgroundColor: 'white',
    borderRadius: 8,
    fontSize: 15,
    maxWidth: '70%',
    minWidth: '50%',
  },
  inputView: {
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    marginBottom: 'auto', 
  },
  inputViewFloat: {
    marginTop: 10,
    position: 'relative',
    bottom: 140,
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
  },
  addingText: {
    color: '#368B85',
    fontSize: 18,
  },
  noTasksView: {
    marginTop: 60,
    marginBottom: 60,
  },
  noTasksText: {
    fontSize: 16,
    color: 'gray',
  },
});