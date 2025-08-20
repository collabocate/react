import { useEffect, useState } from 'react';
import { createContainer } from 'unstated-next';
import { submitIssue, submitAnonymousIssue } from '../../@core/submitIssue';
import { GitHubIssueTemplateContainer } from './useTemplate';

function useSubmitIssueState (){
  const { issueBody, setIssueBody, issueTitle, setIssueTitle, setDropdownButtonTitle, dropdownButtonText } = GitHubIssueTemplateContainer.useContainer();
  const [toastrMessage, setToastrMessage] = useState<{ message: string; issueURL?: string; issueNumber?: number } | null>(null);
  const [showButton, setShowButton] = useState<boolean>(false);
  const [showGithubLoginButton, setShowGithubLoginButton] = useState<boolean>(false);


  const handleButtonClick = () => {
    setShowButton(!showButton);
  }

  // Shared submission logic
  const handleSubmission = async (data: { title: string; body: string }, isAnonymous: boolean) => {
    try {
      const response = isAnonymous ? await submitAnonymousIssue(data) : await submitIssue(data);

      setIssueTitle('');
      setIssueBody('');
      setToastrMessage({
        message: response.message,
        issueURL: response.data.url,
        issueNumber: response.data.number,
      });
      setDropdownButtonTitle(dropdownButtonText);

      return response;
    } catch (error: any) {
      console.log('Error submitting issue:', error);
      if (error?.status === 401) {
        setShowGithubLoginButton(true);
        setToastrMessage({message: 'Please Login as a GitHub User to submit an issue ticket'});
      }
    }
  };

  // Common validation and submission handler
  const validateAndSubmit = async (isAnonymous: boolean) => {
    const title = issueTitle.trim();
    const body = issueBody.trim();

    if (!title || !body) {
      setToastrMessage({ message: 'Issue Title and Body cannot be empty.' });
      return;
    }

    return handleSubmission({ title, body }, isAnonymous);
  };
  // Public handlers
  const handleSubmit = () => validateAndSubmit(false);

  const handleSubmitAnonymous = () => validateAndSubmit(true);

  return {
    toastrMessage,
    handleSubmit,
    handleSubmitAnonymous,
    handleButtonClick,
    showButton,
    showGithubLoginButton
  };
}
export const SubmitIssueContainer = createContainer(useSubmitIssueState);