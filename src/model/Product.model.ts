// Interface defining the product object
export interface IProduct {
  description: string;
  quantityOnHand: number;
  reorderThreshold: number;
  reorderAmount: number;
  deliveryLeadTime: number;
  productId: number;
}

export class Product {
  productId: number;
  description: string;
  quantityOnHand: number;
  reorderThreshold: number;
  reorderAmount: number;
  deliveryLeadTime: number;

  constructor(data: IProduct) {
    this.productId = data.productId;
    this.description = data.description;
    this.quantityOnHand = data.quantityOnHand;
    this.reorderThreshold = data.reorderThreshold;
    this.reorderAmount = data.reorderAmount;
    this.deliveryLeadTime = data.deliveryLeadTime;
  }
}
