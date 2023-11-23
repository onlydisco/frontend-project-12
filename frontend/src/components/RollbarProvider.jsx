import React from 'react';
import { Provider, ErrorBoundary } from '@rollbar/react';

const rollbarConfig = {
  accessToken: '4262bb6db71f427cbd7c077f08f196df',
  environment: 'production',
};

const RollbarProvider = ({ children }) => (
  <Provider config={rollbarConfig}>
    <ErrorBoundary>{children}</ErrorBoundary>
  </Provider>
);

export default RollbarProvider;
