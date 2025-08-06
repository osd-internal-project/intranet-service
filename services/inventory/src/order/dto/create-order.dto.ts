export class CreateOrderDto {
  prdId: string;
  prdName: string;
  price: number;
  totalQty: number;
  unit: string;
  totalPrice: number;
  expiredAt: Date;
  updatedBy: string;
  cost?: number;
  avgCost?: number;
  orderLot: {
    prdName: string;
    unit: string;
    price: number;
    qty: number;
    barcode: string;
    expiredAt: Date;
  }[];
}
