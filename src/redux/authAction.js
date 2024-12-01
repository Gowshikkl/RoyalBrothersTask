import React from 'react'
import { addBodyValue, addError, addloading, addTitle } from './commonReducer';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebaseConfig';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loginAction = async (dispatch, email, password, callBack) => {
  dispatch(addloading(true))
  try {
    await signInWithEmailAndPassword(auth, email, password);
    await AsyncStorage.setItem("isLoggedIn", "true")
    dispatch(addloading(false))
    callBack()
  } catch (error) {
    dispatch(addloading(false))
    Alert.alert(error.message)
  }

}