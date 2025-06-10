export interface Issue_POST_RequestBody {
  title: string;
  body: string;
}

export interface IssueResponse {
  success: boolean;
  message: string;
  data: {
    url: string;
    number: number;
};
}