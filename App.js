import React from 'react'
import { Provider } from 'react-redux';

import MainApp from './src/screens/mainApp/MainApp'
import { PersistGate } from 'redux-persist/integration/react'
import {persistor,store} from './src/redux/store/store';
const App = () => {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <MainApp />
      </PersistGate>
      
    </Provider>

  )
}

export default App