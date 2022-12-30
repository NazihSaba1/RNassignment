import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import AuthScreen, {
  screenOptions as authScreenOptions,
} from './screens/users/AuthScreen';
import {store} from './redux/store';
import {Provider, useSelector} from 'react-redux';
import Colors from './constants/Colors';
import ArticlesScreen, {
  screenOptions as articlesScreenOptions,
} from './screens/dashboard/ArticlesScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
            },
            headerTitleStyle: {
              fontFamily: 'open-sans-bold',
            },
            headerBackTitleStyle: {
              fontFamily: 'open-sans',
            },
            headerTitleAlign: 'center',
            headerTintColor:
              Platform.OS === 'android' ? 'white' : Colors.primary,
          }}>
          <Stack.Screen
            name="Auth"
            component={AuthScreen}
            options={authScreenOptions}
          />
          <Stack.Screen
            name="Articles"
            component={ArticlesScreen}
            options={articlesScreenOptions}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
