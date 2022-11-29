import { IOrder, Order } from './Order.model'
import { Product, IProduct } from './Product.model'

// Interface defining the product object
export interface OrderManagementData {
  products: IProduct[]
  orders: IOrder[]
}

export class OrderManagement {
  products: Product[];
  orders: Order[];

  constructor(data: OrderManagementData) {
    this.products = data.products.map((p) => new Product(p));
    this.orders = data.orders.map((o) => new Order(o));
  }
}
