import * as React from 'react';
import {QueryClientProvider} from 'react-query';
import {PersistGate} from 'redux-persist/integration/react';

import {Stack} from './stack';
import {queryClient} from '@src/utils/const';
import {persistor, store} from '@src/store';
import {Provider} from 'react-redux';

export function Entry() {
  return (
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Stack />
        </QueryClientProvider>
      </Provider>
    </PersistGate>
  );
}
