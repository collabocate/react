import React from 'react';
import { Dropdown } from '../@helpers/dropdown/Dropdown';
import { GlobalContainer } from '../@hooks_state/useGlobal';
import { GitHubIssueTemplateContainer } from '../@hooks_state/useTemplate';
import { SubmitIssueContainer } from '../@hooks_state/useSubmitIssue';

export interface ModalPopupProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}

export const ModalPopup: React.FunctionComponent<ModalPopupProps> = (props: ModalPopupProps) => {
  const { instanceId, updateInstanceId } = GlobalContainer.useContainer();
  console.log('ModalPopup instance_id:', instanceId);
  const { issueBody, setIssueBody, issueTitle, setIssueTitle } = GitHubIssueTemplateContainer.useContainer();
  const { toastrMessage, handleSubmit, showButton, handleButtonClick, handleSubmitAnonymous, loginWithGithub, showGithubLoginButton } = SubmitIssueContainer.useContainer();

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
        <div className="bb-content-group__collabocate_plugin bb-collabocate_form" id="submitIssueForm">
          <div>
            <label className="bb-collabocate_label" htmlFor="issueTemplates">Choose Report Type</label>
            <br />
            <Dropdown />
          </div>
          <div>
            <label className="bb-collabocate_label" htmlFor="issueTitle">Issue Title</label>
            <br />
            <input className="bb-content-group__collabocate_form-inner bb-collabocate_input" type="text" id="issueTitle" onChange={(e) => setIssueTitle(e.target.value)} value={issueTitle}/>
          </div>
          <div>
            <label className="bb-collabocate_label" htmlFor="issueBody">Issue Body</label>
            <br />
            <textarea className="bb-content-group__collabocate_form-inner bb-collabocate_input bb-collabocate_textarea" id="issueBody" onChange={(e) =>setIssueBody(e.target.value)} value={issueBody}></textarea>
          </div>
          <button className="bb-content-group__collabocate_form-inner bb-collabocate_submit-form-button" id="submitIssueButton" onClick={handleButtonClick}>Submit Issue Ticket</button>
           {showButton && (
            <div className="bb-collabocate_auth-options">
              <button className="bb-content-group__collabocate_form-inner bb-collabocate_submit-form-button bb-collabocate_margin-vertical" onClick={handleSubmitAnonymous}>
                Continue as Anonymous User
              </button>
              <button className="bb-content-group__collabocate_form-inner bb-collabocate_submit-form-button" onClick={handleSubmit}>Continue as GitHub User</button>
            </div>
          )}
          {toastrMessage && (
            <div>
              <div>{toastrMessage.message}</div>
              <div>
                {toastrMessage.issueURL && toastrMessage.issueNumber && (
                  <>
                    Follow your issue ticket's progress here:{" "}
                    <a href={toastrMessage.issueURL} target="_blank" rel="noopener noreferrer">
                      Issue ticket #{toastrMessage.issueNumber}
                    </a>
                  </>
                )}
              </div>
            </div>
          )}
          {showGithubLoginButton && (
            <button className="bb-collabocate_github-button" onClick={loginWithGithub}>Login with Github</button>
          )}
        </div>
      </div>
    </>
  );
};
