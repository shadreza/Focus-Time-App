import React, { useContext, useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { ContextForHomePageOrNot, ContextForCurrentTask, ContextForUpdatingTaskAndTime} from '../../App';    

const TimerPage = ({isPaused}) => {

    const HomePageContext = useContext(ContextForHomePageOrNot)
    const CurrentTaskContext = useContext(ContextForCurrentTask)
    const UpdatingTaskAndTime = useContext(ContextForUpdatingTaskAndTime)
    
    const task = CurrentTaskContext[0]

    const interval = useRef(null)

    let time = task.currentTimeRemainingInSec

    const [minute, setMinute] = useState(Math.floor(time/60))
    const [second, setSecond] = useState(time%60)

    const setTimer = () => {
        if(time < 0 ) {
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
        task.currentTimeRemainingInSec = time 
        CurrentTaskContext[1](task)
    }

    useEffect(() => {

        if (isPaused) {
            return ;
        }

        interval.current = setInterval(setTimer , 1000)

        return () => clearInterval(interval.current)

        // if(time > 0) {
        //     setInterval( setTimer , 1000)
        // } else {
        //     return
        // }
    }, [isPaused])

    const toggleBetweenHomeAndTimer = () => {

        const currentTaskAndTime = {
            task : task.name,
            key  : task.key,
            timeRemaining : task.currentTimeRemainingInSec
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
});