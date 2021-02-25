import React from 'react';
import { ChallengeProvider } from './modules/ChallengeContext';
import { CountDownProvider } from './modules/CountDownContext';

const AppProvider: React.FC = ({ children }) => (
  <ChallengeProvider>
    <CountDownProvider>{children}</CountDownProvider>
  </ChallengeProvider>
);

export default AppProvider;
