import { OrderItem, IOrderItem } from "./OrderItem.model";
import { Product } from './Product.model'
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
  
  /**
   * Processes the orders
   * @param order 
   */
  processOrder = (products: Product[]): boolean => {
    let isAllOrderItemsFulfilled = true;

    this.items.forEach((i) => {
      const res = this.processOrderItem(i, products);
      // If an order item cannot be processed update order status otherwise leave as is
      isAllOrderItemsFulfilled = res ? isAllOrderItemsFulfilled : res;
    });

    if (isAllOrderItemsFulfilled) {
      this.updateStatus('Fulfilled')
    }

    return isAllOrderItemsFulfilled
  };

  /**
   * Processes and individual order item.
   * @param orderItem
   * @returns
   */
   private processOrderItem = (orderItem: OrderItem, products: Product[]): boolean => {
    const product = products.find(
      (p) => p.productId === orderItem.productId
    );

    // The product does not exist in our system
    if (!product) {
      console.error(
        `order id: ${orderItem.orderId} has tried to order product id: ${orderItem.productId} which does not exist on our system.`
      );
      return false;
    }

    // If the order item is still outstanding
    if (orderItem.status === "Pending") {
      return orderItem.fulfillOrderItem(product);
    }

    // Additional logic may be required if other order item status are created.
    return true;
  };
}
