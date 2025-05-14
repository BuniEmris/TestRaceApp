/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/store';
import CurrencyConverterScreen from './src/screens/CurrencyConverterScreen/CurrencyConverterScreen';
import CurrencySelectScreen from './src/screens/CurrencySelectScreen/CurrencySelectScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="CurrencyConverter"
              component={CurrencyConverterScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="CurrencySelect"
              component={CurrencySelectScreen}
              options={{title: 'Currency Select'}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
