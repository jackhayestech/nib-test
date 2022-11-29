import { loadData } from './utils'

// Loads data from the json file
const orderManagement = loadData()

// Uncomment these to check stock/order status prior to run
// orderManagement.displayOrdersStatuses()
// orderManagement.displayProductStockLevels()

// Preforms order run
const unfulfilledOrders = orderManagement.processOrders()
console.log('Orders unfulfilled: ', unfulfilledOrders)

// Uncomment these to check updated stock/order status
// orderManagement.displayOrdersStatuses()
// orderManagement.displayProductStockLevels()