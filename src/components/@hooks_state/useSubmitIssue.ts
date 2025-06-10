import { useState } from 'react';
import { createContainer } from 'unstated-next';
import { submitIssue } from '../../@core/submitIssue';
import { GitHubIssueTemplateContainer } from './useTemplate';

function useSubmitIssueState (){
  const { issueBody, setIssueBody, issueTitle, setIssueTitle, setDropdownButtonTitle, dropdownButtonText} = GitHubIssueTemplateContainer.useContainer();
  const [toastrMessage, setToastrMessage] = useState<{message: string; issueURL?: string; 
    issueNumber?: number;} | null>(null);
    
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = issueTitle.trim();
    const body = issueBody.trim();
    
    if (!title || !body) {
      setToastrMessage({message:'Issue Title and Body cannot be empty.'});
      return;
    }
    
      const data = { title, body };

      const response = await submitIssue(data);
      setIssueTitle('');
      setIssueBody('');
      setToastrMessage({
        message: response.message,
        issueURL: response.data.url,
        issueNumber: response.data.number,
      });
      setDropdownButtonTitle(dropdownButtonText);
  };

  return {
    toastrMessage,
    handleSubmit,
  };
}
export const SubmitIssueContainer = createContainer(useSubmitIssueState);