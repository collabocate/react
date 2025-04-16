export interface Issue_POST_RequestBody {
  title: string;
  body: string;
}

export interface IssueResponse {
  message: string;
  issue: {
    url:string;
    number: number;
};
}