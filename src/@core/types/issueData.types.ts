export interface Issue_POST_RequestBody {
  title: string;
  body: string;
}

export interface IssueDetails {
  url:string;
  number: number;
}

export interface IssueResponse {
  message: string;
  issue: IssueDetails;
}