import { useState } from 'react';
import { createContainer } from 'unstated-next';
import { submitIssue } from '../../@core/submitIssue';
import { GitHubIssueTemplateContainer } from './useTemplate';

function useSubmitIssueState (){
  const { issueBody, setIssueBody, issueTitle, setIssueTitle } = GitHubIssueTemplateContainer.useContainer();
  const [toastrMessage, setToastrMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = issueTitle.trim();
    const body = issueBody.trim();
    
    if (!title || !body) {
      setToastrMessage('Issue Title and Body cannot be empty.');
      return;
    }
    
      const data = { title, body };

      const response = await submitIssue(data);
      console.log('Issue submitted:', response);
      setIssueTitle('');
      setIssueBody('');
      
      const issueTicketUrl = response.issue.html_url;
      const issueNumber = response.issue.number;
      
      setToastrMessage(
        `${response.message} Follow your issue ticket's progress here: <a target="_blank" href="${issueTicketUrl}">Issue ticket #${issueNumber}</a>`
      );
  };

  return {
    toastrMessage,
    handleSubmit,
  };
}
export const SubmitIssueContainer = createContainer(useSubmitIssueState);