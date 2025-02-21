export interface WorkerType {
  id: number;
  name: string;
  description: string;
  status: string;
  notify: boolean;
  jobCount: number;
  query: string;
  jobType: string;
  fixedPrice: string;
  proposalsNumber: string;
  verifiedOnly: boolean;
  previousClientsOnly: boolean;
  updatedAt: string;
  createdAt: string;
  ip?: string | number;
}
