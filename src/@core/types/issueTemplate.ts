export interface IssueTemplate {
  title: string;
  metadata: string;
  content: string;
}

export interface IssueTemplateResponse {
  templates: IssueTemplate[];
}