export type TCreateCycleForm = {
  round: number;
  paymentDate: Date;
  netPrice: number;
  status: 'pending';
};
export type TUpdateCycleForm = {
  round: number;
  paymentDate: Date;
  netPrice: number;
  actualPrice?: number;
  status?: string;
};
