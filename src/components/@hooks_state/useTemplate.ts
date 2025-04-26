import { useEffect, useState } from 'react';
import { createContainer } from 'unstated-next';
import { IssueTemplate } from '../../@core/types/issueTemplate';
import { getApiIssueTemplates } from '../../@core/templates';
  
const dropdownButtonText = '-- Select issue template --';
function useTemplateState() {
const [issueBody, setIssueBody] = useState<string>('');
const [issueTitle, setIssueTitle] = useState<string>('');
const [templates, setTemplates] = useState<IssueTemplate[]>([]);
const [buttonTitle, setButtonTitle] = useState<string>(dropdownButtonText);

useEffect(() => {
    getApiIssueTemplates().then(setTemplates);
  }, []);

const fetchTemplateContent = (content: string, title:string) => {
      setIssueTitle('');
      setIssueBody(content);
      setButtonTitle(title)
  };

    return {
      issueBody,
      setIssueBody,
      issueTitle,
      setIssueTitle,
      buttonTitle,
      setButtonTitle,
      templates,
      fetchTemplateContent,
      dropdownButtonText
    };
  }
  export const GitHubIssueTemplateContainer = createContainer(useTemplateState);