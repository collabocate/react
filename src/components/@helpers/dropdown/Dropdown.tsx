import React, { useEffect, useState } from 'react';
import { Container } from '../Container';
import { api_dummy_response } from './dummy_api';
import { useDropdown } from './useDropdown';
import { getApiIssueTemplates } from '../../../@core/templates';
import { IssueTemplate } from '../../../@core/types/issueTemplate';

// TODO: Decide later - should this file/functionality be moved to the external library?

export interface DropdownProps {
  setIssueBody: (body: string) => void;
  setIssueTitle: (body: string) => void;
}

export const Dropdown: React.FunctionComponent<DropdownProps> = ({ setIssueBody,setIssueTitle }) => {
  const {isOpen, setIsOpen, dropdownContainerRef } = useDropdown();
  const [templates, setTemplates] = useState<IssueTemplate[]>([]);

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

  return (
    <>
      <Container 
        bb_function={'position'}
        bb_function_class={'bb-pos-relative'}
        bb_class={''}
        ref={dropdownContainerRef}
      >
        <button 
          className="bb-content-group_toggle bb-toggle"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          -- Select issue template --
        </button>
        {isOpen && (
          <Container 
            bb_function={'position'}
            bb_function_class={'bb-pos-absolute'}
            bb_class={'bb-toggle_option-container'}
          >
            {templates.map((option, index) => {
              return (
                <>
                  <button 
                    key={option.name}
                    className="bb-content-group_toggle" type="button"
                    onClick={() => fetchTemplateContent(option.download_url)}
                  >
                    {option.name.replace('.md', '').split('-').join(' ').replace(/^./, char => char.toUpperCase())}
                  </button>
                  {index !== templates.length - 1 && <hr className="bb-toggle_hr" />}
                </>
              );
            })}
          </Container>
        )}
      </Container>
    </>
  );
};
