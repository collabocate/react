import { useState } from 'react';
import { createContainer } from 'unstated-next';
import { submitIssue, submitAnonymousIssue } from '../../@core/submitIssue';
import { GitHubIssueTemplateContainer } from './useTemplate';
import { signInWithGithub } from '../../@core/auth';

function useSubmitIssueState (){
  const { issueBody, setIssueBody, issueTitle, setIssueTitle, setDropdownButtonTitle, dropdownButtonText } = GitHubIssueTemplateContainer.useContainer();
  const [toastrMessage, setToastrMessage] = useState<{ message: string; issueURL?: string; issueNumber?: number } | null>(null);
  const [showButton, setShowButton] = useState<boolean>(false);
  const [showGithubLoginButton, setShowGithubLoginButton] = useState<boolean>(false);


  const handleButtonClick = () => {
    setShowButton(!showButton);
  }

  const loginWithGithub = () => {
    signInWithGithub()
  }

  // Shared submission logic
  const handleSubmission = async (data: { title: string; body: string }, isAnonymous: boolean) => {
    try {
      // If the user is not authenticated, prompt them to log in
      if (!isAnonymous) {
        setToastrMessage({ message: 'Please log in to submit an issue.' });
        setShowGithubLoginButton(true);
        return;
      }
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
    } catch (error) {
      setToastrMessage({
        message: 'Failed to submit issue'
      });
      throw error;
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
    loginWithGithub,
    showGithubLoginButton
  };
}
export const SubmitIssueContainer = createContainer(useSubmitIssueState);