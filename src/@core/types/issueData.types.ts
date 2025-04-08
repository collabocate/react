export interface IssueData {
  title: string;
  body: string;
}

export interface IssueResponse {
  message: string;
  issue:{
    html_url:string;
    number: number;
    body:string;
  }
}