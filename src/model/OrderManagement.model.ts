import { IOrder, Order } from "./Order.model";
import { Product, IProduct } from "./Product.model";

// Interface defining the product object
export interface OrderManagementData {
  products: IProduct[];
  orders: IOrder[];
}

export class OrderManagement {
  private products: Product[];
  private orders: Order[];

  constructor(data: OrderManagementData) {
    this.products = data.products.map((p) => new Product(p));
    this.orders = data.orders.map((o) => new Order(o));
  }

  /**
   * Processes the orders that are out standing.
   */
  processOrders = (): number[] => {
    const unfulfilled: number[] = [];
    this.orders.forEach((o) => {
      // An order needs to be processed
      if (o.status !== "Fulfilled") {
        const isFulfilled = o.processOrder(this.products)
        // The order cannot be processed
        if (!isFulfilled) {
          o.updateStatus('Unfulfillable')
          unfulfilled.push(o.orderId)
        }
      }
    });
    return unfulfilled;
  };
}
