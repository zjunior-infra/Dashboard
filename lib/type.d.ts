type CrawledOpportunity = {
  id: string;
  title: string;
  company: string;
  type: $Enums.opportunityType;
  logo: string;
  skills: string | null;
  link: string | null;
  description: string;
}