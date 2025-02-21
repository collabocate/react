export interface ApiHomeResponse {
  name: string;
  description: string;
  built_at: string;
  github: {
    repository: string;
  };
  contributors: {
    count: number;
    list: string[];
  };
}