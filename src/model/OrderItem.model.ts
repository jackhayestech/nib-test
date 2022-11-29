import { OrderItemStatus } from '../interfaces'
import { Product } from './Product.model'

// Interface defining the order item object
export interface IOrderItem {
  orderId: number;
  productId: number;
  quantity: number;
  costPerItem: number;
}

export class OrderItem {
  orderId: number;
  productId: number;
  quantity: number;
  costPerItem: number;
  status: OrderItemStatus

  constructor(data: IOrderItem) {
    this.orderId = data.orderId;
    this.productId = data.productId;
    this.quantity = data.quantity;
    this.costPerItem = data.costPerItem;
    this.status = 'Pending'
  }

  /**
   * Updates the items order status
   * @param newStatus 
   */
  setStatus = (newStatus: OrderItemStatus) => {
    this.status = newStatus
  }

  /**
   * Checks if the order item can be updated and updates status accordingly
   * @param orderItem 
   * @param orderId 
   * @returns 
   */
   fulfillOrderItem = (
    product: Product
  ): boolean => {
    const isItemAvailable = product.checkProductStockLevels(product, this.quantity)
    
    if (isItemAvailable) {
      this.setStatus('Fulfilled')
    }

    return isItemAvailable;
  };
}
