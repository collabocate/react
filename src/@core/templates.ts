import { apiClient } from './api-client';
import { IssueTemplateResponse, IssueTemplate} from './types/issueTemplate';

export const getApiIssueTemplates = async (): Promise<IssueTemplate[]> => {
    const response = await apiClient<IssueTemplateResponse>('/external/github/issue-templates', { method: 'GET' });
    console.log('Issue Templates Data:', response.templates);
    return response.templates;
};