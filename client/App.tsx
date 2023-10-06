import { FC } from 'react';
import { Provider } from 'react-redux';

import { store } from './src/store/store';
import Root from './src/screens/Root';


const App: FC = () => {
  return (
    <Provider store={store}>
      <Root/>
    </Provider>
  );
};

export default App;
