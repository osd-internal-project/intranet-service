export class CreateRequestOrderDto {}

export type RequestOrderType = {
  requester: string;
  requestDate: Date | string;
  object: string;
  createdBy: string;
  remark: string;
  requestList: [
    {
      masterProductId: string;
      qty: number;
      amount: number;
    },
  ];
};
