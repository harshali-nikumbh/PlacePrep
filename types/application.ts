export type Application = {
  id: number;
  user_id: string;

  company_name: string;
  role: string;
  package: string;
  status: string;

  applied_date: string | null;
  oa_date: string | null;
  interview_date: string | null;

  notes: string | null;

  created_at: string;
};