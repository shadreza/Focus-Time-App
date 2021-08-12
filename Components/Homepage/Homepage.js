import React, { useContext, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput  } from 'react-native';
import { addImageUrl, ContextForAllTask, ContextForCurrentTask, ContextForHomePageOrNot, defaultTime, logoUrl, removeImageUrl } from '../../App';

const Homepage = () => {

    const HomePageContext = useContext(ContextForHomePageOrNot)
    const currentTask = useContext(ContextForCurrentTask)
    const allTask = useContext(ContextForAllTask)

    const inputRef = useRef(null)

    const toggleBetweenHomeAndTimer = () => {
        HomePageContext[1]( ! HomePageContext[0] )
    }

    const generateUniqueKey = () => {
        const d = new Date
        return d.getMilliseconds()
    }

    const addToCurrentTask = ( task ) => {
        currentTask[1](task)
        setTimeout(() => {
            toggleBetweenHomeAndTimer()
        }, 1000);
    }

    const addToAllTask = () => {
        const name = inputRef.current.value
        const TASK = {
            name : name,
            totalTime : defaultTime,
            timeSpent : 0,
            key : generateUniqueKey()
        }
        allTask[1]( [  TASK  , ...allTask[0] ] )
        currentTask[1](TASK)
        setTimeout(() => {
            toggleBetweenHomeAndTimer()
        }, 1000);
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
                allTask[0].length > 0 && 
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
            }
            <View style={styles.inputView}>
                <Text style={styles.addingText}>Add the task to focus on</Text>
                <View style={styles.inputSection}>
                    <TextInput 
                        placeholder="Type your task!"
                        style={styles.inputBox}
                        ref={inputRef}
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
    marginTop: 50,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
  },
  addingText: {
    color: '#368B85',
    fontSize: 18,
  },
});