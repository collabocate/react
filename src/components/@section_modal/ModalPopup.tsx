import React from 'react';
import { Dropdown } from '../@helpers/dropdown/Dropdown';
import { GlobalContainer } from '../@hooks_state/useGlobal';

export interface ModalPopupProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}

export const ModalPopup: React.FunctionComponent<ModalPopupProps> = (props: ModalPopupProps) => {
  const { instanceId, updateInstanceId } = GlobalContainer.useContainer();
  console.log('ModalPopup instance_id:', instanceId);
  return (
    <>
      <div className="bb-collabocate_body">
        <header className="bb-collabocate_header"> 
            <div className="bb-content-group__collabocate_plugin bb-collabocate_header-inner">
                <h4>Report Issue</h4>
                {/* <div className="bb-collabocate_font-zero">
                    <button className="bb-collabocate_close-btn">
                        <img src="../assets/close-icon.png" alt="Exit icon" />
                    </button>
                </div> */}
            </div>
            <p className="bb-content-group__collabocate_plugin">Collabocate | GitHub Sync</p>
        </header>
        <form className="bb-content-group__collabocate_plugin bb-collabocate_form" id="submitIssueForm">
          <div>
            <label className="bb-collabocate_label" htmlFor="issueTemplates">Choose Report Type</label>
            <br />
            <Dropdown />
          </div>
          <div>
            <label className="bb-collabocate_label" htmlFor="issueTitle">Issue Title</label>
            <br />
            <input className="bb-content-group__collabocate_form-inner bb-collabocate_input" type="text" id="issueTitle" />
          </div>
          <div>
            <label className="bb-collabocate_label" htmlFor="issueBody">Issue Body</label>
            <br />
            <textarea className="bb-content-group__collabocate_form-inner bb-collabocate_input bb-collabocate_textarea" id="issueBody"></textarea>
          </div>
          <button className="bb-content-group__collabocate_form-inner bb-collabocate_submit-form-button" id="submitIssueButton">Submit Issue Ticket</button>
          <div id="displayToastrMessage"></div>
        </form>
      </div>
    </>
  );
};
