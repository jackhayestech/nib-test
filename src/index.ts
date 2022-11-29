import { loadData } from './utils'

const orderManagement = loadData()
orderManagement.displayOrdersStatuses()
orderManagement.displayProductStockLevels()
const unfulfilledOrders = orderManagement.processOrders()
console.log('Orders unfulfilled: ', unfulfilledOrders)
orderManagement.displayOrdersStatuses()
orderManagement.displayProductStockLevels()