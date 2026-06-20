export type Company = { id: string; name: string };

export type Location = {
  id: string;
  company_id: string;
  name: string;
  code: string | null;
  is_parent: boolean;
  is_training: boolean;
  job_number_prefix: string | null;
  sort_order: number;
  is_active: boolean;
};

export type Role = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
};

export type AppUser = {
  id: string;
  company_id: string | null;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  is_active: boolean;
};

export type UserContext = {
  user: AppUser;
  company: Company | null;
  locations: Location[];
  activeLocation: Location | null;
  roleSlugs: string[];
  isAdmin: boolean;
};

export type WorkType = {
  id: string;
  name: string;
  slug: string;
  is_system: boolean;
  sort_order: number;
};

export type ChecklistItem = { id: string; label: string; sort_order: number };

export type Status = {
  id: string;
  name: string;
  sort_order: number;
  milestone_id: string;
  workTypeSlugs: string[];
  checklist: ChecklistItem[];
};

export type Milestone = {
  id: string;
  name: string;
  slug: string;
  sort_order: number;
  kind: "pipeline" | "closed" | "canceled" | "dead";
  is_terminal: boolean;
  statuses: Status[];
};
