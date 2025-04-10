export interface Issue_POST_RequestBody {
  title: string;
  body: string;
}

export interface IssueDetails {
  repository_url: string;
  html_url:string;
  number: number;
  id: number;
  user: object;
  assignee: any;
  assignees: any[];
  created_at: string;
  updated_at: string;
  closed_at: any,
  author_association: string;
  body:string;
}

export interface IssueResponse {
  message: string;
  issue: IssueDetails;
}