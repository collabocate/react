import React, { useState } from 'react';
import { createContainer } from 'unstated-next';

function useGlobalState(initialState: { instanceId: string } | undefined) {
  const [instanceId, setInstanceId] = useState(initialState?.instanceId);

  const updateInstanceId = (id: string) => {
    setInstanceId(id);
  };

  return {
    instanceId,
    updateInstanceId
  };
}
export const GlobalContainer = createContainer(useGlobalState);