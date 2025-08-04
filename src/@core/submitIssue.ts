import { apiClient } from './api-client';
import { Issue_POST_RequestBody, IssueResponse } from './types/issueData.types';

export const submitIssue = async (issueData: Issue_POST_RequestBody): Promise<IssueResponse> => {
    const response = await apiClient<IssueResponse>('/external/github/issues', {
      method: 'POST',
      body: JSON.stringify(issueData),
    });
    console.log('Issue submitted successfully:', response);
    return response;
};

export const submitAnonymousIssue = async (issueData: Issue_POST_RequestBody): Promise<IssueResponse> => {
  const response = await apiClient<IssueResponse>('/external/github/issues-unauthenticated', {
    method: 'POST',
    body: JSON.stringify(issueData)
  });
  console.log('Issue submitted successfully:', response);
  return response;
};