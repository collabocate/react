export interface IssueTemplate {
  title: string;
  metadata: string;
  content: string;
}

export interface IssueTemplateResponse {
  success: boolean;
  message: string;
  count: number;
  data: IssueTemplate[];
}