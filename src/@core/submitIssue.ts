import { apiClient } from "./api-client";
import { IssueData, IssueResponse } from "./types/issueData.types";

export const submitIssue = async (issueData: IssueData): Promise<IssueResponse> => {
    const response = await apiClient<IssueResponse>('/external/github/issues', {
      method: 'POST',
      body: JSON.stringify(issueData),
    });
    console.log('Issue submitted successfully:', response);
    return response;
};