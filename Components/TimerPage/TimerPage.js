import React, { useContext, useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { ContextForHomePageOrNot, ContextForCurrentTask, ContextForUpdatingTaskAndTime} from '../../App';    
import {ProgressBar , Colors} from 'react-native-paper';

const TimerPage = ({isPaused}) => {

    const HomePageContext = useContext(ContextForHomePageOrNot)
    const CurrentTaskContext = useContext(ContextForCurrentTask)
    const UpdatingTaskAndTime = useContext(ContextForUpdatingTaskAndTime)
    
    const task = CurrentTaskContext[0]

    const interval = useRef(null)

    let time = task.currentTimeRemainingInSec
    let defaultTime = task.totalTime
    let progress = time / (defaultTime * 60)

    const [minute, setMinute] = useState(Math.floor(time/60))
    const [second, setSecond] = useState(time%60)

    const setTimer = () => {
        if(time <= 0 ) {
            setSecond(parseInt('00'))
            setMinute(parseInt('00'))
            return
        }
        if(second<10) {
            setSecond(parseInt('0'+`${time%60}`))
        } else {
            setSecond(time%60)
        }

        if(minute<10) {
            setMinute(parseInt('0'+`${Math.floor(time/60)}`))
        } else {
            setMinute(Math.floor(time/60))
        }
        
        time = time - 1
        if(time < 0) {
            return
        }
        task.currentTimeRemainingInSec = time 
        CurrentTaskContext[1](task)
    }

    useEffect(() => {

        if (isPaused) {
            return ;
        }

        interval.current = setInterval(setTimer , 1000)
        progress = time / (defaultTime * 60)

        return () => clearInterval(interval.current)

    }, [isPaused])

    const toggleBetweenHomeAndTimer = () => {

        const currentTaskAndTime = {
            task : task.name,
            key  : task.key,
            timeRemaining : task.currentTimeRemainingInSec,
            totalTime : defaultTime,
        }
        UpdatingTaskAndTime[1](currentTaskAndTime)
        HomePageContext[1](!HomePageContext[0])
    }

    return (
        <View style={styles.timerMainContainer}>

            <View style={styles.timerBody}>
                <Text style={styles.time}>
                    <Text style={ minute<5 ? styles.redTime : styles.blackTime}>
                        {minute < 10 ? `0${minute}` : `${minute}`} <Text style={styles.small}>min</Text>
                    </Text>
                    <Text style={styles.colon}>  :  </Text>
                    <Text style={ second < 10 ? styles.redTime : styles.blackTime }>
                        {second < 10 ? `0${second}` : `${second}`} <Text style={styles.small}>sec</Text>
                    </Text>
                </Text>
            </View>

            <View style={styles.progressBarContainer}>
                <ProgressBar style={styles.progressBar} progress={progress} visible={true}  color={progress > 0.6 ? Colors.green800 : progress > 0.3 ? Colors.blue800 : Colors.red800} />
            </View>
            
            <Text style={styles.textFoot}>Focusing on ...</Text>
            <Text style={styles.textHead}>{task.name}</Text>
            <TouchableOpacity onPress={toggleBetweenHomeAndTimer}>
                <Text>Toggle</Text>
            </TouchableOpacity>
        </View>
    );
};

export default TimerPage;

const styles = StyleSheet.create({
    timerMainContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    textHead: {
        marginTop: 5,
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 40,
        fontWeight: 'bold',
    },
    textFoot: {
        marginTop: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#5EAAA8'
    },
    timerBody: {
        marginTop: 100,
        marginBottom: 60,
    },
    time: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    redTime: {
        fontSize: 60,
        fontWeight: 'bold',
        color : 'red',
    },
    blackTime: {
        fontSize: 60,
        fontWeight: 'bold',
        color : 'black',
    },
    small: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    colon: {
        fontSize: 60,
        fontWeight: 'bold',
        padding: 20
    },
    progressBarContainer: {
        width : 310,
        height: 30,
        padding: 10,
        margin: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
    },
    progressBar: {
        width : 300,
        height: 20,
        borderRadius: 8,
    },
});