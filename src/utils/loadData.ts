import rawData from '../data/data.json';
import { OrderManagement, OrderManagementData } from '../model'

export const loadData = (): OrderManagement => {
  return new OrderManagement(rawData as OrderManagementData)
}