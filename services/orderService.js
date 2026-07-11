import {readOrders, writeOrder} from '../repositories/orderRepo.js'

export async function getAllOrders (){
    return await readOrders()
}
export async function ordersOfCustomer(customerId){
    const allOrders = await getAllOrders()
    const ordersCustomer = allOrders.filter(o=>o.customerId === +customerId)
    return ordersCustomer
}
export async function editOrder(orders){
    return await writeOrder(orders)
}