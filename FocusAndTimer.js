import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, StyleSheet, TextInput, Text, View, Image, TouchableOpacity  } from 'react-native';

export const FocusAndTimer = (props) => {

    const {name, timer} = props.info;

    let totalMinutes = timer, totalSeconds = ( totalMinutes * 60 );
    const [ currentMinute, setCurrentMinute ] = useState(totalMinutes)
    const [ currentSecond, setCurrentSecond ] = useState(totalSeconds)
    const [ isFocusing, setIsFocusing ] = useState(true)

 
    // // const updateTimer = (time) => {

    //     totalMinutes = timer;
    //     totalSeconds = ( timer * 60 ) ;
    //     setCurrentMinute(timer);
    //     setCurrentSecond(0);

        
    // // }

    // useEffect(() =>{
    //     setTimeout(() =>{
    //         if(currentSecond < 0) {
    //             return;
    //         }
    //         setCurrentMinute(Math.floor(currentSecond/60))
    //         setCurrentSecond(currentSecond-1)
    //     }, 1000)
    // }, [isFocusing])

    return (
        <View style={styles.mainContainer}>
            <View style={styles.heading}>
                <View style={styles.timer}>
                    <Text>
                        {currentMinute} : {currentSecond % 60}
                    </Text>
                </View>
                <Text>Focusing on...</Text>
                <Text>{name}</Text>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
    },
    timer: {
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        padding: 20,
        borderWidth: 4,
        borderRadius: 10,
    },
    heading: {
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
    }
})
