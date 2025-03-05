import { useEffect, useState } from "react";
import { createContainer } from 'unstated-next';
import { IssueTemplate } from "../../@core/types/issueTemplate";
import { getApiIssueTemplates } from "../../@core/templates";
import { useDropdown } from "../@helpers/dropdown/useDropdown";
  
function useTemplateState() {
const [issueBody, setIssueBody] = useState<string>('');
const [issueTitle, setIssueTitle] = useState<string>('');
const [templates, setTemplates] = useState<IssueTemplate[]>([]);
const {setIsOpen} = useDropdown();

useEffect(() => {
    getApiIssueTemplates().then(setTemplates);
  }, []);

const fetchTemplateContent = async (url: string) => {
    try {
      setIssueTitle('');
      const response = await fetch(url);
      const content = await response.text();
      setIssueBody(content);
      setIsOpen(false)
    } catch (error) {
      console.log('Error fetching template content:', error);
    }
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