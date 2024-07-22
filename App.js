import React from 'react'
import { Provider } from 'react-redux';

import MainApp from './src/screens/mainApp/MainApp'
import { PersistGate } from 'redux-persist/integration/react'
import {persistor,store} from './src/redux/store/store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const App = () => {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={{flex: 1}}>
      <MainApp />
      </GestureHandlerRootView>
      </PersistGate>
      
    </Provider>

  )
}

export default App