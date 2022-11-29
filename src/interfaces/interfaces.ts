import { OrderStatus } from "./types";

export interface OrderDisplay {
  orderId: number;
  status: OrderStatus;
}

export interface ProductStockLevels {
  productId: number;
  quantityOnHand: number;
}
