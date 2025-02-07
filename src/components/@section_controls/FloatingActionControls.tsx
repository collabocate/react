import React from 'react';
import { Container } from '../@helpers/Container';
import { GlobalContainer } from '../@hooks_state/useGlobal';

export interface FloatingActionControlsProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}

export const FloatingActionControls: React.FunctionComponent<FloatingActionControlsProps> = (props: FloatingActionControlsProps) => {
  const { instanceId, updateInstanceId } = GlobalContainer.useContainer();
  console.log('FloatingActionControls instance_id:', instanceId);
  return (
    <>
      <Container bb_function="display" bb_function_class="bb-disp-inline-flex" bb_class="bb-floating-controls">
        <button className="bb-floating-controls_toggle_button" onClick={() => alert('Toggle: Open & Close Button')}>
          T
        </button>
        <Container bb_function="display" bb_function_class="bb-disp-flex" bb_class="bb-floating-controls_tab_button_container">
          <button className="bb-floating-controls_tab_button" onClick={() => alert('Report Tab Button')}>
            R
          </button>
          <button className="bb-floating-controls_tab_button" onClick={() => alert('Notification Tab Button')}>
            N
          </button>
          <button className="bb-floating-controls_tab_button" onClick={() => alert('Chat Tab Button')}>
            C
          </button>
        </Container>
      </Container>
    </>
  );
};
