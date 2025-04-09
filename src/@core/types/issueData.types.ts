export interface Issue_POST_RequestBody {
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