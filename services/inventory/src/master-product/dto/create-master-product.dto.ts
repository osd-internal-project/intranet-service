export class CreateMasterProductDto {}

export type ProductOption = {
  label: string;
  value: number | string; // depending on your prdId type
  unit: string;
  balance: number;
};
