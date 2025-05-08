import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import driversReducer from './driversSlice';
import racesReducer from './racesSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['drivers', 'races'],
};

const persistedDriversReducer = persistReducer(persistConfig, driversReducer);
const persistedRacesReducer = persistReducer(persistConfig, racesReducer);

export const store = configureStore({
  reducer: {
    drivers: persistedDriversReducer,
    races: persistedRacesReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
