import { IOrder, Order } from "./Order.model";
import { Product, IProduct } from "./Product.model";
import { OrderItem } from "./OrderItem.model";

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
      if (o.status === "Pending") {
        const isFulfilled = this.processOrder(o)
        if (!isFulfilled) {
          unfulfilled.push(o.orderId)
        }
      }
    });
    return unfulfilled;
  };


  /**
   * Processes the orders
   * @param order 
   */
  private processOrder = (order: Order): boolean => {
    let isAllOrderItemsFulfilled = true;

    order.items.forEach((i) => {
      const res = this.processOrderItem(i);
      // If an order item cannot be processed update order status otherwise leave as is
      isAllOrderItemsFulfilled = res ? isAllOrderItemsFulfilled : res;
    });

    if (isAllOrderItemsFulfilled) {
      order.updateStatus('Fulfilled')
    }

    return isAllOrderItemsFulfilled
  };

  /**
   * Processes and individual order item.
   * @param orderItem
   * @returns
   */
  private processOrderItem = (orderItem: OrderItem): boolean => {
    const product = this.products.find(
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
