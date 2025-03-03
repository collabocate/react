export interface IssueTemplate {
  name: string;
  path: string;
  download_url: string;
}

export interface IssueTemplateResponse {
  templates: IssueTemplate[];
}