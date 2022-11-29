// Interface defining the order item object
export interface IOrderItem {
  orderId: number;
  productId: number;
  quantity: number;
  costPerItem: number;
}

export class OrderItem {
  orderId: number;
  productId: number;
  quantity: number;
  costPerItem: number;

  constructor(data: IOrderItem) {
    this.orderId = data.orderId;
    this.productId = data.productId;
    this.quantity = data.quantity;
    this.costPerItem = data.costPerItem;
  }
}
