import { orderProduct } from "../utils";

// Interface defining the product object
export interface IProduct {
  description: string;
  quantityOnHand: number;
  reorderThreshold: number;
  reorderAmount: number;
  deliveryLeadTime: number;
  productId: number;
}

export class Product {
  productId: number;
  description: string;
  quantityOnHand: number;
  reorderThreshold: number;
  reorderAmount: number;
  deliveryLeadTime: number;

  constructor(data: IProduct) {
    this.productId = data.productId;
    this.description = data.description;
    this.quantityOnHand = data.quantityOnHand;
    this.reorderThreshold = data.reorderThreshold;
    this.reorderAmount = data.reorderAmount;
    this.deliveryLeadTime = data.deliveryLeadTime;
  }

  /**
   * Checks if the products stock can be filled.
   * @param numRequired
   * @returns
   */
  checkProductStockLevels = (numRequired: number): boolean => {
    // Checks if the number required of a product falls below the order threshold.
    // We do this check here because if we get an order greater than the order threshold we could run into a situation where an order can never be fulfilled.
    if (this.quantityOnHand - numRequired < this.reorderThreshold) {
      // Again this checks if the number required is greater than the default order amount so we can order the right amount of stock
      const orderAmount =
        numRequired > this.reorderAmount ? numRequired : this.reorderAmount;

      orderProduct(this.productId, orderAmount);
    }

    // There is enough stock on hand to process the order.
    if (this.quantityOnHand - numRequired >= 0) {
      return true;
    }

    return false;
  };

  updateStockLevel = (orderAmount: number): void => {
    this.quantityOnHand -= orderAmount;
  };
}
