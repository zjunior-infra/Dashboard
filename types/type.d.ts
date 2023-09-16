type CrawledOpportunity = {
  id: string;
  title: string;
  company: string;
  level: $Enums.opportunityType;
  logo: string;
  skills: string | null;
  link: string | null;
  role: string;
  description: string;
}


type Result<T, E> = {
  result?: T;
  error?: E;
};

interface ApiResponseError {
  message: string,
  statusCode: number
}
