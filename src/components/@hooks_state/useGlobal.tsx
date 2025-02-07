import React, { useState } from 'react';
import { createContainer } from 'unstated-next';

function useGlobalState() {
  const [instanceId, setInstanceId] = useState('');

  return {
    instanceId,
    setInstanceId
  };
}

export const GlobalContainer = createContainer(useGlobalState);
