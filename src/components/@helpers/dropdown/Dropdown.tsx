import React from 'react';
import { Container } from '../Container';
import { api_dummy_response } from './dummy_api';
import { useDropdown } from './useDropdown';
import { GitHubIssueTemplateContainer } from '../../@hooks_state/useTemplate';

// TODO: Decide later - should this file/functionality be moved to the external library?

export interface DropdownProps {}

export const Dropdown: React.FunctionComponent<DropdownProps> = ({}) => {
  const {isOpen, setIsOpen, dropdownContainerRef } = useDropdown();
  const {dropdownButtonTitle,templates,fetchTemplateContent } = GitHubIssueTemplateContainer.useContainer();

  const templateContentHandler = (content: string, title: string) => {
        fetchTemplateContent(content, title);
        setIsOpen(false);
  }

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
          {dropdownButtonTitle}
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
                    key={index}
                    className="bb-content-group_toggle" type="button"
                    onClick={() =>templateContentHandler(option.content, option.title)}
                  >
                    {option.title}
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
