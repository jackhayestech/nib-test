import { loadData } from './utils'

const orderManagement = loadData()

console.log(JSON.stringify(orderManagement,null,2))