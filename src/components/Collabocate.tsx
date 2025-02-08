import React from 'react';
import '../css/@library_external/bb-styles.css';
import '../css/bb-styles.css';
import { FloatingActionControls } from './@section_controls/FloatingActionControls';
import { ModalPopup } from './@section_modal/ModalPopup';
import { Container } from './@helpers/Container';
import { Debugger } from './@helpers/Debugger';
import { GlobalContainer } from './@hooks_state/useGlobal';

export interface CollabocateProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  instance_id: string;
}

export const Collabocate: React.FunctionComponent<CollabocateProps> = ({ instance_id }) => {
  console.log('instance_id: ', instance_id);
  if (!instance_id.length) {
    return (
      <>
        <Debugger 
          message="DEBUGGER: Supply instance_id prop to the Collabocate Component, for plugin to show up on the UI. See docs..."
          bb_function="position"
          bb_function_class="bb-pos-fixed bb-pos-r30-b20" 
          bb_class="bb-collabocate_container" 
        />;
      </>
    );
  }
  return (
    <GlobalContainer.Provider initialState={{ instanceId: instance_id }}>
    <Container 
      bb_function="position" 
      bb_function_class="bb-pos-fixed bb-pos-r30-b20" 
      bb_class='bb-collabocate_container'
    >
      <ModalPopup />
      <FloatingActionControls />
    </Container>
    </GlobalContainer.Provider>
  );
};
