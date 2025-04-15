import { useState } from 'react';
import { createContainer } from 'unstated-next';
import { submitIssue } from '../../@core/submitIssue';
import { GitHubIssueTemplateContainer } from './useTemplate';

function useSubmitIssueState (){
  const { issueBody, setIssueBody, issueTitle, setIssueTitle } = GitHubIssueTemplateContainer.useContainer();
  const [toastrSuccessMessage, setToastrSuccessMessage] = useState<{message: string} | null>(null);
  const [followIssueMessage, setFollowIssueMessage] = useState<{issueURL?: string; issueNumber?: number;} | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = issueTitle.trim();
    const body = issueBody.trim();
    
    if (!title || !body) {
      setToastrSuccessMessage({message:'Issue Title and Body cannot be empty.'});
      return;
    }
    
      const data = { title, body };

      const response = await submitIssue(data);
      setIssueTitle('');
      setIssueBody('');
      setToastrSuccessMessage({
        message: response.message,
      });
      setFollowIssueMessage({ 
        issueURL: response.issue.url,
        issueNumber: response.issue.number,
      })
  };

  return {
    toastrSuccessMessage,
    followIssueMessage,
    handleSubmit,
  };
}
export const SubmitIssueContainer = createContainer(useSubmitIssueState);