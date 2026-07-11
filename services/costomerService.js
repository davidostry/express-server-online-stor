
import { readCustomer, writeCustomer } from '../repositories/customerRepo.js'

export async function getAllCustomers(){
    return await readCustomer()
}

export async function editCustomers(customers){
    await writeCustomer(customers)

}