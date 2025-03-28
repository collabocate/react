import { useEffect, useState } from 'react';
import { createContainer } from 'unstated-next';
import { IssueTemplate } from '../../@core/types/issueTemplate';
import { getApiIssueTemplates } from '../../@core/templates';
  
function useTemplateState() {
const [issueBody, setIssueBody] = useState<string>('');
const [issueTitle, setIssueTitle] = useState<string>('');
const [templates, setTemplates] = useState<IssueTemplate[]>([]);

useEffect(() => {
    getApiIssueTemplates().then(setTemplates);
  }, []);

const fetchTemplateContent = (content: string) => {
      setIssueTitle('');
      setIssueBody(content);
  };

    return {
      issueBody,
      setIssueBody,
      issueTitle,
      setIssueTitle,
      templates,
      fetchTemplateContent
    };
  }
  export const GitHubIssueTemplateContainer = createContainer(useTemplateState);