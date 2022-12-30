import React, {useState, useReducer, useCallback} from 'react';
import axios from 'axios';
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  ActivityIndicator,
  Alert,
  Pressable,
  Text,
  TextInput,
  RefreshControl,
} from 'react-native';

import {useDispatch} from 'react-redux';
import {SET_ARTICLES, SET_TOKEN} from '../../redux/actions';

import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const AuthScreen = ({navigation}, props) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      console.log('Ping');
      formState.inputValues.username = '';
      return () => console.log('return function');
    }, []),
  );
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      username: '',
      password: '',
    },
    inputValidities: {
      username: false,
      password: false,
    },
    formIsValid: false,
  });

  const authHandler = async () => {
    const username = formState.inputValues.username;
    const password = formState.inputValues.password;

    const body = {
      username: username,
      password: password,
    };
    console.log(body);

    setIsLoading(true);
    axios({
      method: 'post',
      url: 'http://34.245.213.76:3000/auth/signin',
      data: body,
    })
      .then(function (response) {
        const token = response.data.accessToken;
        dispatch({type: SET_TOKEN, token});
        navigation.navigate('Articles');
        setIsLoading(false);
      })
      .catch(function (error) {
        setIsLoading(false);
        Alert.alert('An Error Occurred!', 'Check username or password', [
          {text: 'Okay'},
        ]);
        console.log(error);
      });
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState],
  );

  return (
    <KeyboardAvoidingView
      behavior="height"
      keyboardVerticalOffset={50}
      style={styles.screen}>
      <View style={styles.logoContainer}>
        <View style={styles.artCont}>
          <Text style={styles.artText}>Art</Text>
        </View>
        <View>
          <Text style={styles.artText2}>icles</Text>
        </View>
      </View>
      <Card style={styles.authContainer}>
        <ScrollView>
          <Input
            id="username"
            label="Username"
            keyboardType="default"
            required
            autoCapitalize="none"
            errorText="Please enter a valid username."
            onInputChange={inputChangeHandler}
          />
          <Input
            id="password"
            label="Password"
            keyboardType="default"
            secureTextEntry
            required
            minLength={5}
            autoCapitalize="none"
            errorText="Please enter a valid password."
            onInputChange={inputChangeHandler}
          />
          <View style={styles.buttonContainer}>
            {isLoading ? (
              <ActivityIndicator size="small" color={Colors.primary} />
            ) : (
              <Button
                title="Login"
                color={Colors.primary}
                onPress={authHandler}
              />
            )}
          </View>
        </ScrollView>
      </Card>
    </KeyboardAvoidingView>
  );
};

export const screenOptions = {
  title: 'Login',
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.accent,
    marginBottom: 40,
    marginLeft: 20,
  },

  authContainer: {
    width: '80%',
    maxWidth: 400,
    padding: 20,
    height: 370,
    paddingTop: 40,
  },
  buttonContainer: {
    marginTop: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  logoContainer: {
    flexDirection: 'row',
    marginBottom: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginright: 100,
    justifyContent: 'center',
  },
  artCont: {
    backgroundColor: Colors.primary,
    height: 60,
    width: 70,
    borderTopLeftRadius: 10,
  },
  artText: {
    margin: 10,
    fontSize: 25,
    marginLeft: 16,
    fontFamily: 'serif',
    fontWeight: 'bold',
  },
  artText2: {
    margin: 10,
    fontSize: 25,
    marginLeft: 10,
    fontFamily: 'serif',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    textDecorationColor: Colors.primary,
  },
});

export default AuthScreen;
