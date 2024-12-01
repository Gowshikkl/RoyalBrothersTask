import { signInWithEmailAndPassword } from '@react-native-firebase/auth';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, StatusBar, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { auth } from '../utils/firebaseConfig';
import { loginAction } from '../redux/authAction';
import { useDispatch } from 'react-redux';
import { validateEmail } from '../utils/utils';
import { CommonActions, useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validation, setValidation] = useState({ emailValidation: false, passwordValidation: false })
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const handleLogin = () => {
    if (validateEmail(email) && password.trim().length > 0) {
      loginAction(dispatch, email, password, () => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,  
            routes: [{ name: 'Home' }], 
          })
        );

      })
    } else {
      if (!validateEmail(email)) {
        setValidation({ emailValidation: true })
      }
      else {
        setValidation({ passwordValidation: true })
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Please login to continue</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {validation.emailValidation && <Text style={styles.errorText}>Please enter a valid email</Text>}

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {validation.passwordValidation && <Text style={styles.errorText}>Password cannot be empty</Text>}

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.signupText}>
          Don't have an account?{' '}
          <Text onPress={() => navigation.navigate('SignUp')} style={styles.signupLink}>
            Sign up
          </Text>
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingLeft: 16,
    fontSize: 16,
    marginTop: 16,
    marginBottom: 0,
    backgroundColor: '#fff',
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    borderRadius: 8,
    marginVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupText: {
    color: '#333',
    fontSize: 14,
  },
  signupLink: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
    textAlign: 'left',
    width: '100%',
  },
});

export default LoginScreen;
