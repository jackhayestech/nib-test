import { IOrder, Order } from "./Order.model";
import { Product, IProduct } from "./Product.model";
import { OrderStatus } from '../interfaces'

// Interface defining the product object
export interface OrderManagementData {
  products: IProduct[]
  orders: IOrder[]
}

interface OrderDisplay {
  orderId: number
  status: OrderStatus
}

interface ProductStockLevels {
  productId: number
  quantityOnHand: number
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

  /**
   * Displays all the orders statuses
   */
  displayOrdersStatuses = (): void => {
    const orders: OrderDisplay[] = this.orders.map(({orderId, status}) => ({orderId, status }));

    console.log('Order Statuses')
    console.log(JSON.stringify(orders,null,2))
  }

  /**
   * Displays all the products stock levels
   */
   displayProductStockLevels = (): void => {
    const productStock: ProductStockLevels[] = this.products.map(({productId, quantityOnHand}) => ({productId, quantityOnHand }));

    console.log('Product stock levels');
    console.log(JSON.stringify(productStock,null,2))
  }
}
