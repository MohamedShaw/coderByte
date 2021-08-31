import * as React from 'react';
import {QueryClientProvider} from 'react-query';

import {Stack} from './stack';
import {queryClient} from '@src/utils/const';

export function Entry() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack />
    </QueryClientProvider>
  );
}
