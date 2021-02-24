import React from 'react';
import { ChallengeProvider } from './modules/ChallengeContext';

const AppProvider: React.FC = ({ children }) => (
  <ChallengeProvider>{children}</ChallengeProvider>
);

export default AppProvider;
