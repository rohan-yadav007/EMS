//

import * as React from 'react';
import CustomNavigator from './utils/ScreenNavigator';
import {Provider} from 'react-redux';
import store from './Store';

export default function App() {
  return (
    <Provider store={store}>
      <CustomNavigator />
    </Provider>
  );
}
