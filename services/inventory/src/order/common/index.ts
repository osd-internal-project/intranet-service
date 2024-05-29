// export type ITypeCreateOrderLots = {
//   stockid: number;
//   productName: string[];
//   casNo: string;
//   groupName: string;
//   expiredStatus: string;
//   balance: string;
//   unit: string;
//   qty: number;
// };

export type ITypeCreateOrderLots = {
  stockid: string;
  masterProductDetails: {
    name: string;
  }[];
  casNo: string;
  expiredStatus: boolean;
  unit: string;
  qty: number;
  balance: number;
  orderPrice: number;
  inventoryLotId: number;
  price: number;
  groupId?: number;
  groupName?: string;
  chemicalFormula?: string;
  brand?: string;
  vender?: string;
  updatedById?: string;
  updatedByName?: string;
  lotNo?: string;
  detailLot: string;
};

export type ITypeRestoreInventoryLots = {
  id: number;
  qty: number;
  inventoryLot: { id: number; remain: number };
};
