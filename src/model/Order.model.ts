import { OrderItem, IOrderItem } from "./OrderItem.model";
import { OrderStatus } from '../interfaces'

// Interface defining the order item object
export interface IOrder {
  orderId: number;
  status: OrderStatus;
  dateCreated: string;
  items: IOrderItem[];
}

export class Order {
  orderId: number;
  status: OrderStatus;
  dateCreated: Date;
  items: OrderItem[];

  constructor(data: IOrder) {
    this.orderId = data.orderId;
    this.status = data.status;
    this.dateCreated = new Date(data.dateCreated);
    this.items = data.items.map((d) => new OrderItem(d));
  }

  /**
   * Updates the orders status
   */
  updateStatus = (status: OrderStatus) => {
    this.status = status
  }    
}
