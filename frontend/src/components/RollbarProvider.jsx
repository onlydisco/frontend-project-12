import React from 'react';
import { Provider, ErrorBoundary } from '@rollbar/react'; // Provider imports 'rollbar'

const rollbarConfig = {
  accessToken: '4262bb6db71f427cbd7c077f08f196df',
  environment: 'production',
};

function TestError() {
  const a = null;
  return a.hello();
}

const RollbarProvider = ({ children }) => (
  <Provider config={rollbarConfig}>
    <ErrorBoundary>
      <TestError />
      {children}
    </ErrorBoundary>
  </Provider>
);

export default RollbarProvider;
