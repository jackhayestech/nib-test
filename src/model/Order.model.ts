import { OrderItem, IOrderItem } from "./OrderItem.model";
// Interface defining the order item object
type Status = "Pending"

export interface IOrder {
  orderId: number;
  status: Status;
  dateCreated: string;
  items: IOrderItem[];
}

export class Order {
  orderId: number;
  status: Status;
  dateCreated: Date;
  items: OrderItem[];

  constructor(data: IOrder) {
    this.orderId = data.orderId;
    this.status = data.status;
    this.dateCreated = new Date(data.dateCreated);
    this.items = data.items.map((d) => new OrderItem(d));
  }
    
}
