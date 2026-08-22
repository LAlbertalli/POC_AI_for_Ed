import React from 'react';
import { WorkspaceProvider } from './context/WorkspaceContext.jsx';
import AppLayout from './components/layout/AppLayout.jsx';

export default function App() {
  return (
    <WorkspaceProvider>
      <AppLayout />
    </WorkspaceProvider>
  );
}
