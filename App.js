import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef } from 'react';
import { SafeAreaView, StyleSheet, TextInput, Text, View, Image, TouchableOpacity  } from 'react-native';
 
export default function App() {

  // refs
  const inputFieldRef = useRef()

  // states
  const [key, setKey] = useState(0);
  const [focusingArray, setFocusingArray] = useState([]);
  const [inputField, setInputField] = useState('');

  // variables
  const defaultTimer = 20;

  // functions

  const clearTheInput = () => {
    if (inputFieldRef !== undefined) {
      inputFieldRef.current.clear();
    }
  }

  const addToArray = () => {
    if(inputField.trim() === '') {
      return
    } else {
      setFocusingArray(
        [
          ...focusingArray, 
          {
            name       : inputField,
            timer      : defaultTimer,
            isFinished : false,
            key        : key
          }
        ]
      )
      setInputField('')
      setKey(key+1)
      clearTheInput()
    }
  }

  return (
    <View style={styles.container}>
      <Text style={{marginBottom:'10%'}}>What would you like to focus on?</Text>
      <SafeAreaView style={styles.inputSection}>
        <TextInput
          style={styles.input}
          placeholder="input"
          onChangeText = {(text) =>setInputField(text)}
          ref={inputFieldRef}
        />
        <TouchableOpacity style={styles.inputIconView} onPress={() => addToArray()}>
          <Image
            source={{ uri: 'https://icons-for-free.com/iconfiles/png/512/add+board+new+plus+icon-1320186882821780394.png' }}
            style={styles.inputIcon}
          />
        </TouchableOpacity>
      </SafeAreaView>
      <View style={styles.focusedArrayView}>
        <Text style={{marginBottom:10}}>Things you have focused on...</Text>
        {
          focusingArray.length > 0 ? 
            (
              <View>
                {
                  focusingArray.map(item => (<Text key={item.key}>{item?.name}</Text>))
                }
              </View>
            )
            :
            (
              <Text>Nothing Yet</Text>
            )
        }
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: '70%',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    textAlign: 'center'
  },
  inputSection: {
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  inputIcon: {
    height: 70,
    width: 70,
    borderRadius: 100,
  },
  inputIconView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  focusedArrayView: {
    marginTop: '5%',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  }
});
