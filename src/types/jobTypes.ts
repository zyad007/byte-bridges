export interface JobType {
  id: number;
  amount?: number | string;
  clientLocation?: string;
  clientRate?: number;
  clientSpent?: number;
  createdAt?: string;
  description?: string;
  favourite: boolean;
  hourlyRateRange?: string;
  ignore: boolean;
  paymentVerified: boolean;
  postedAt?: null;
  proposalsNumber?: string;
  tags?: string;
  title?: string;
  type?: string;
  updatedAt?: string;
  url?: string;
  workerId?: number;
}
