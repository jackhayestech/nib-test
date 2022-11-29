import { OrderItem, IOrderItem } from "./OrderItem.model";
import { Product } from "./Product.model";
import { OrderStatus } from "../interfaces";

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
   * @param status
   */
  updateStatus = (status: OrderStatus) => {
    this.status = status;
  };

  /**
   * Finds a product from a list of products
   * @param products
   * @param productId
   * @returns
   */
  findProduct = (products: Product[], productId: number) =>
    products.find((p) => p.productId === productId);

  /**
   * Processes the orders
   * @param order
   */
  processOrder = (products: Product[]): boolean => {
    let isAllOrderItemsFulfilled = true;

    // Checks if the order items can be fulfilled
    this.items.forEach((i) => {
      const res = this.checkProductStock(products, i);
      // If an order item cannot be processed update order status otherwise leave as is
      isAllOrderItemsFulfilled = res ? isAllOrderItemsFulfilled : res;
    });

    // If possible fulfill the order
    if (isAllOrderItemsFulfilled) {
      this.items.forEach((i) => {
        this.fulfillOrderItem(products, i);
      });
      this.updateStatus("Fulfilled");
    } else {
      this.updateStatus("Unfulfillable");
    }

    return isAllOrderItemsFulfilled;
  };

  /**
   * Checks if the stock on an order item can be fulfilled.
   * @param products
   * @param orderItem
   * @returns
   */
  checkProductStock = (products: Product[], orderItem: OrderItem) => {
    const product = this.findProduct(products, orderItem.productId);

    // The product does not exist in our system
    if (!product) {
      console.error(
        `order id: ${orderItem.orderId} has tried to order product id: ${orderItem.productId} which does not exist on our system.`
      );
      return false;
    }

    return product.checkProductStockLevels(orderItem.quantity);
  };

  /**
   * Fulfills the order item
   * @param products
   * @param orderItem
   * @returns
   */
  fulfillOrderItem = (products: Product[], orderItem: OrderItem) => {
    const product = this.findProduct(products, orderItem.productId);

    // It is safe to assume the product exists since we have done a check just prior this may need to be changed if we run this function elsewhere
    product?.updateStockLevel(orderItem.quantity);
  };
}
