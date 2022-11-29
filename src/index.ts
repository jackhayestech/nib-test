import { loadData } from './utils'

const orderManagement = loadData()
const unfulfilledOrders = orderManagement.processOrders()
console.log('Orders unfulfilled: ', unfulfilledOrders)