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