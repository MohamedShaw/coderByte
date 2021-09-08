import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from '@reduxjs/toolkit';
import {FilterReducer, ProductReducer} from '@src/slices';
import {PersistConfig, persistReducer} from 'redux-persist';

const reducers = combineReducers({
  product: ProductReducer,
  filter: FilterReducer,
});

export type RootState = ReturnType<typeof reducers>;

const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['product'],
};

export const rootReducer = persistReducer(persistConfig, reducers);

export type RootStore = ReturnType<typeof reducers>;
